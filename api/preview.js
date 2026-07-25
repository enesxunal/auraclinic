/**
 * Aura Clinic — AI hair preview via Gemini image models.
 * Env: GEMINI_API_KEY, ALLOWED_ORIGINS, UPSTASH_REDIS_* (optional)
 */
var rateLimit = require("../lib/rate-limit");

var IMAGE_MODELS = ["gemini-2.5-flash-image", "gemini-3.1-flash-image"];
var MAX_BODY_BYTES = 6 * 1024 * 1024;
var ALLOWED_MIME = {
  "image/jpeg": true,
  "image/jpg": true,
  "image/png": true,
  "image/webp": true,
};

var HAIR_LENGTH_RULES =
  "HAIR LENGTH: Show natural grown-out hair after transplant — about 3–5 cm (1–2 inches), like a normal men's short haircut at a barber after 8–12 months. " +
  "Hair should have visible length and soft texture, combed neatly — NOT a buzz cut, NOT shaved, NOT stubble-only on top. " +
  "Full coverage on bald/thin areas with real short hair strands you can see. " +
  "If the BEFORE photo already has longer hair on the sides, keep similar length on top — only fill bald areas with matching natural length. " +
  "Avoid extremely short cropped scalp, mullet, long flowing hair, spiky mess, or wig-like helmet hair.";

var NATURAL_RULES =
  "STYLE: Realistic medical consultation preview — believable 8–12 months after transplant. " +
  "The AFTER must be VISIBLY fuller than the BEFORE: clearly improved coverage in thinning and bald areas. " +
  "Good visible density with natural short hair length — fuller than moderate, but still medically believable. " +
  "Match original hair color and texture. Soft age-appropriate hairline. " +
  "No plastic shine or celebrity volume. " +
  "Keep same face, expression, skin, clothes, pose, lighting and background. " +
  HAIR_LENGTH_RULES;

var TECHNIQUE_PROMPTS = {
  dhiPrecision:
    "Edit the BEFORE photo into an AFTER preview for DHI precision transplant. " +
    "Add good visible density at hairline and thinning zones — clearly fuller than BEFORE with natural short hair length (see length rules). " +
    NATURAL_RULES,
  fueMega:
    "Edit the BEFORE photo into an AFTER preview for a high-graft FUE session. " +
    "More grafts = noticeably better coverage on crown and top with natural 3–5 cm hair — clearly fuller than BEFORE. " +
    NATURAL_RULES,
  nonShavenDhi:
    "Edit the BEFORE photo into an AFTER preview for non-shaven DHI. " +
    "Keep the person's existing hair length from the photo; add visible density where thin — clearly improved coverage. " +
    "Match surrounding hair length naturally. " +
    NATURAL_RULES,
  individual:
    "Edit the BEFORE photo into an AFTER preview for a personalized FUE/DHI plan. " +
    "Balanced good visible coverage with a natural hairline — clearly fuller than BEFORE with natural short haircut length. " +
    NATURAL_RULES,
};

function readRawBody(req) {
  return new Promise(function (resolve, reject) {
    if (req.body !== undefined && req.body !== null) {
      if (Buffer.isBuffer(req.body)) {
        resolve(req.body.toString("utf8"));
        return;
      }
      if (typeof req.body === "string") {
        resolve(req.body);
        return;
      }
      if (typeof req.body === "object") {
        resolve(JSON.stringify(req.body));
        return;
      }
    }
    var chunks = [];
    var size = 0;
    req.on("data", function (chunk) {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("payload_too_large"));
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", function () {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    req.on("error", reject);
  });
}

function parseJsonBody(raw) {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function extractImageFromResponse(json) {
  var candidates = (json && json.candidates) || [];
  for (var i = 0; i < candidates.length; i++) {
    var parts = (candidates[i].content && candidates[i].content.parts) || [];
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j];
      if (part.inlineData && part.inlineData.data) {
        return {
          data: part.inlineData.data,
          mimeType: part.inlineData.mimeType || "image/png",
        };
      }
      if (part.inline_data && part.inline_data.data) {
        return {
          data: part.inline_data.data,
          mimeType: part.inline_data.mime_type || "image/png",
        };
      }
    }
  }
  return null;
}

function mapGeminiError(status, json) {
  var message = (json && json.error && json.error.message) || "";
  var code = json && json.error && json.error.code;
  // Never expose raw Gemini text to clients — only status codes
  if (status === 429 || code === 429 || message.indexOf("quota") !== -1) {
    return { ok: false, status: "quota_exceeded" };
  }
  if (status === 403 || code === 403) {
    if (message.indexOf("dunning") !== -1 || message.indexOf("billing") !== -1) {
      return { ok: false, status: "billing_suspended" };
    }
    if (message.indexOf("API key") !== -1 || message.indexOf("unregistered") !== -1) {
      return { ok: false, status: "invalid_key" };
    }
    return { ok: false, status: "forbidden" };
  }
  return { ok: false, status: "generation_failed" };
}

async function callGeminiImage(apiKey, model, mimeType, photoBase64, techniqueKey) {
  var prompt =
    (TECHNIQUE_PROMPTS[techniqueKey] || TECHNIQUE_PROMPTS.individual) +
    " This is an illustrative clinic preview only — not a medical guarantee.";

  var payload = {
    contents: [
      {
        parts: [
          {
            inline_data: {
              mime_type: mimeType || "image/jpeg",
              data: photoBase64,
            },
          },
          { text: prompt },
        ],
      },
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  };

  var url =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    model +
    ":generateContent";

  var response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": apiKey,
    },
    body: JSON.stringify(payload),
  });

  var json = await response.json().catch(function () {
    return {};
  });

  if (!response.ok) {
    return { error: mapGeminiError(response.status, json) };
  }

  var image = extractImageFromResponse(json);
  if (!image) {
    return { error: { ok: false, status: "no_image" } };
  }

  return { image: image, model: model };
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=UTF-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  if (!rateLimit.isAllowedOrigin(req)) {
    res.status(403).json({ ok: false, status: "forbidden" });
    return;
  }

  var rl = await rateLimit.checkRateLimit(
    rateLimit.clientKey(req, "preview"),
    parseInt(process.env.PREVIEW_RATE_LIMIT || "5", 10),
    60 * 1000
  );
  if (!rl.allowed) {
    res.status(429).json({ ok: false, status: "rate_limited" });
    return;
  }

  var apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    res.status(200).json({ ok: false, status: "not_configured" });
    return;
  }

  var raw;
  try {
    raw = await readRawBody(req);
  } catch (e) {
    res.status(413).json({ ok: false, status: "payload_too_large" });
    return;
  }

  var body = parseJsonBody(raw);
  if (!body) {
    res.status(400).json({ ok: false, status: "invalid_json" });
    return;
  }

  var photoBase64 = body.photoBase64 || body.imageBase64 || "";
  var mimeType = String(body.mimeType || body.mime_type || "image/jpeg").toLowerCase();
  var technique = body.technique || "individual";

  if (!ALLOWED_MIME[mimeType]) {
    res.status(400).json({ ok: false, status: "invalid_mime" });
    return;
  }

  if (!photoBase64) {
    res.status(400).json({ ok: false, status: "missing_photo" });
    return;
  }

  if (photoBase64.indexOf(",") !== -1) {
    photoBase64 = photoBase64.split(",")[1];
  }

  // Rough size check on base64
  if (photoBase64.length > 5.5 * 1024 * 1024) {
    res.status(413).json({ ok: false, status: "payload_too_large" });
    return;
  }

  if (!TECHNIQUE_PROMPTS[technique]) technique = "individual";

  var lastError = null;
  for (var i = 0; i < IMAGE_MODELS.length; i++) {
    var model = IMAGE_MODELS[i];
    try {
      var result = await callGeminiImage(apiKey, model, mimeType, photoBase64, technique);
      if (result.image) {
        res.status(200).json({
          ok: true,
          imageBase64: result.image.data,
          mimeType: result.image.mimeType,
          model: result.model,
        });
        return;
      }
      lastError = result.error;
      if (result.error && result.error.status !== "quota_exceeded") break;
    } catch (err) {
      lastError = { ok: false, status: "generation_failed" };
      break;
    }
  }

  res.status(200).json(lastError || { ok: false, status: "generation_failed" });
};

module.exports.config = { maxDuration: 60 };

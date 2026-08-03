/**
 * Aura Clinic — AI hair preview via Gemini image models.
 * Env: GEMINI_API_KEY, ALLOWED_ORIGINS, UPSTASH_REDIS_* (optional)
 */
var rateLimit = require("../lib/rate-limit");

// Prefer 3.1 first: stronger editing quality than 2.5 (less copy-paste / smear artifacts).
var IMAGE_MODELS = ["gemini-3.1-flash-image", "gemini-2.5-flash-image"];
var MAX_BODY_BYTES = 6 * 1024 * 1024;
var ALLOWED_MIME = {
  "image/jpeg": true,
  "image/jpg": true,
  "image/png": true,
  "image/webp": true,
};

var EDIT_SCOPE =
  "Using the provided photo, change ONLY the scalp hair: hairline, temples, crown, and thinning/bald zones. " +
  "Keep everything else exactly the same — face identity, age, skin texture, eyes, nose, mouth, ears, expression, beard (if any), glasses, clothes, pose, camera angle, framing, lighting, shadows, background, and aspect ratio. " +
  "Do not crop, zoom, mirror, or recolor the photo.";

var HAIR_REALISM =
  "HAIR REALISM: Grow real individual hair strands with natural direction, slight separation, and soft volume — not a flat color fill. " +
  "Match the person’s existing hair color, curl/wave pattern, and shine from the sides/back. " +
  "Blend new hair into the remaining hair so edges look photographic (sharp follicles at the hairline, not airbrushed). " +
  "Match the photo’s lighting: new hair must cast and receive the same light/shadow as the face and existing hair. " +
  "FORBIDDEN RESULTS: semi-transparent brown wash, soft smudge, painted blob, blurry helmet, wig plug, plastic shine, cartoon hair, or returning a near-identical copy of the BEFORE photo.";

var HAIR_LENGTH_RULES =
  "HAIR LENGTH: Show natural grown-out hair about 3–5 cm (1–2 inches), like a neat men’s short barber cut 8–12 months after transplant. " +
  "Visible strand length and soft texture — NOT buzz cut, NOT shaved, NOT stubble-only on top. " +
  "If side hair is already longer, match that length on the restored top; only fill missing areas. " +
  "Avoid mullet, long flowing hair, spiky mess, or helmet hair.";

var DENSITY_RULES =
  "RESULT MUST BE OBVIOUS: the AFTER must look clearly fuller than BEFORE at a glance — restored hairline/temples and filled thinning zones with good medical density (fuller than moderate, still believable). " +
  "Soft age-appropriate hairline with slight irregularity (not a ruler-straight line). " +
  "No celebrity volume or plastic shine.";

var NATURAL_RULES =
  "PURPOSE: photorealistic clinic consultation preview of successful hair transplant results after 8–12 months. " +
  DENSITY_RULES +
  " " +
  HAIR_REALISM +
  " " +
  HAIR_LENGTH_RULES;

var TECHNIQUE_PROMPTS = {
  dhiPrecision:
    EDIT_SCOPE +
    " Simulate a finished DHI precision transplant: restore the frontal hairline and temples with dense, natural short strands and fill thinning zones so coverage is clearly improved. " +
    NATURAL_RULES,
  fueMega:
    EDIT_SCOPE +
    " Simulate a high-graft FUE result: strongly improve coverage on the crown and top with natural 3–5 cm hair so the bald/thin areas are clearly filled. " +
    NATURAL_RULES,
  nonShavenDhi:
    EDIT_SCOPE +
    " Simulate a finished non-shaven DHI result: keep the person’s existing hair length from the photo; densify only thin/bald zones so the restored hair matches surrounding length, color, and texture with an obvious before/after difference. " +
    NATURAL_RULES,
  individual:
    EDIT_SCOPE +
    " Simulate a personalized FUE/DHI plan: balanced natural hairline with clearly fuller coverage on thinning and bald areas. " +
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
  // Prefer the last image part — higher-res outputs may arrive after a preview part.
  var found = null;
  var candidates = (json && json.candidates) || [];
  for (var i = 0; i < candidates.length; i++) {
    var parts = (candidates[i].content && candidates[i].content.parts) || [];
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j];
      if (part.inlineData && part.inlineData.data) {
        found = {
          data: part.inlineData.data,
          mimeType: part.inlineData.mimeType || "image/png",
        };
      } else if (part.inline_data && part.inline_data.data) {
        found = {
          data: part.inline_data.data,
          mimeType: part.inline_data.mime_type || "image/png",
        };
      }
    }
  }
  return found;
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
    " Output one photorealistic edited photo. Illustrative clinic preview only — not a medical guarantee.";

  var generationConfig = {
    responseModalities: ["TEXT", "IMAGE"],
    imageConfig: {
      imageSize: "2K",
    },
  };

  // 2.5 Flash Image does not reliably support imageSize — keep modalities only.
  if (model.indexOf("2.5") !== -1) {
    generationConfig = {
      responseModalities: ["TEXT", "IMAGE"],
    };
  }

  var payload = {
    contents: [
      {
        role: "user",
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
    generationConfig: generationConfig,
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
      // Retry next model on soft failures; stop on hard auth/billing blocks.
      var soft =
        result.error &&
        (result.error.status === "quota_exceeded" ||
          result.error.status === "no_image" ||
          result.error.status === "generation_failed");
      if (!soft) break;
    } catch (err) {
      lastError = { ok: false, status: "generation_failed" };
      // Try the next model if any remain.
    }
  }

  res.status(200).json(lastError || { ok: false, status: "generation_failed" });
};

module.exports.config = { maxDuration: 60 };

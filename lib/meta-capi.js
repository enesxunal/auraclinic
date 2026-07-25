/**
 * Meta Conversions API helpers (server-side).
 */
var crypto = require("crypto");

function sha256(value) {
  if (!value) return null;
  return crypto.createHash("sha256").update(String(value)).digest("hex");
}

function normEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function normPhone(phone) {
  return String(phone || "").replace(/\D/g, "");
}

function normText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z\u0080-\uFFFF\s]/gi, "");
}

function splitName(full) {
  var parts = String(full || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return { fn: "", ln: "" };
  if (parts.length === 1) return { fn: parts[0], ln: "" };
  return { fn: parts[0], ln: parts.slice(1).join(" ") };
}

function getClientIp(req) {
  var ip = req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "";
  if (Array.isArray(ip)) ip = ip[0] || "";
  if (typeof ip === "string" && ip.indexOf(",") !== -1) {
    ip = ip.split(",")[0].trim();
  }
  return ip || undefined;
}

function buildUserData(body, req) {
  var names = splitName(body.name);
  var userData = {};

  var em = sha256(normEmail(body.email));
  if (em) userData.em = em;

  var ph = body.phone ? sha256(normPhone(body.phone)) : null;
  if (ph) userData.ph = ph;

  var fn = names.fn ? sha256(normText(names.fn)) : null;
  if (fn) userData.fn = fn;

  var ln = names.ln ? sha256(normText(names.ln)) : null;
  if (ln) userData.ln = ln;

  userData.ct = sha256("batumi");
  userData.country = sha256("ge");

  var ip = getClientIp(req);
  if (ip) userData.client_ip_address = ip;

  var ua = req.headers["user-agent"];
  if (ua) userData.client_user_agent = ua;

  if (body.fbp) userData.fbp = String(body.fbp);
  if (body.fbc) userData.fbc = String(body.fbc);

  return userData;
}

function cleanObject(obj) {
  var out = {};
  Object.keys(obj || {}).forEach(function (key) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      out[key] = obj[key];
    }
  });
  return out;
}

async function sendEvents(events) {
  var pixelId = process.env.META_PIXEL_ID;
  var token = process.env.META_CAPI_TOKEN || process.env.META_ACCESS_TOKEN;
  if (!pixelId || !token || !events.length) return { ok: false, skipped: true };

  var url =
    "https://graph.facebook.com/v21.0/" +
    encodeURIComponent(pixelId) +
    "/events?access_token=" +
    encodeURIComponent(token);

  var response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: events }),
  });

  var json = await response.json().catch(function () {
    return {};
  });

  if (!response.ok) {
    return { ok: false, error: json.error || json };
  }

  return { ok: true, result: json };
}

async function sendLeadEvents(body, req) {
  var userData = buildUserData(body, req);
  var sourceUrl =
    body.event_source_url ||
    req.headers.referer ||
    req.headers.origin ||
    "https://auraclinicge.com/";
  var now = Math.floor(Date.now() / 1000);
  var leadEventId = body.lead_event_id || "lead-" + now;
  var regEventId = body.reg_event_id || "reg-" + now;

  var events = [
    cleanObject({
      event_name: "Lead",
      event_time: now,
      event_id: leadEventId,
      event_source_url: sourceUrl,
      action_source: "website",
      user_data: userData,
      custom_data: cleanObject({
        content_name: "Hair Analysis Form",
        protocol_id: body.protocol_id || "",
        language: body.lang || "en",
      }),
    }),
    cleanObject({
      event_name: "CompleteRegistration",
      event_time: now,
      event_id: regEventId,
      event_source_url: sourceUrl,
      action_source: "website",
      user_data: userData,
      custom_data: cleanObject({
        content_name: "Hair Analysis Form",
        protocol_id: body.protocol_id || "",
        language: body.lang || "en",
      }),
    }),
  ];

  return sendEvents(events);
}

module.exports = {
  sendLeadEvents: sendLeadEvents,
};

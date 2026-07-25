/**
 * Shared lead validation helpers (server).
 */
var ALLOWED_LANGS = ["en", "ka", "tr", "ru"];
var ALLOWED_SERVICES = [
  "hair_transplant",
  "hair_analysis",
  "botox_filler",
  "botox",
  "filler_lip",
  "filler_face",
  "jawline",
  "consultation",
  "other",
  "hydrafacial",
  "g5",
];

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizePhone(raw) {
  var s = String(raw || "").trim();
  if (!s) return "";
  var plus = s.charAt(0) === "+";
  var digits = s.replace(/\D/g, "");
  if (!digits) return "";
  return (plus ? "+" : "") + digits;
}

function isValidPhone(raw) {
  var digits = String(raw || "").replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

function isValidName(name) {
  var n = String(name || "").trim();
  return n.length >= 2 && n.length <= 80;
}

function validateLeadBody(body, options) {
  options = options || {};
  var errors = [];
  var name = String(body.name || "").trim();
  var email = String(body.email || "").trim();
  var phone = String(body.phone || "").trim();
  var lang = String(body.lang || body.language || "en")
    .toLowerCase()
    .replace(/[^a-z]/g, "")
    .slice(0, 5);
  var service = String(body.service || "hair_analysis").slice(0, 40);

  if (!isValidName(name)) errors.push("name");
  if (options.requirePhone !== false && !isValidPhone(phone)) errors.push("phone");
  if (email) {
    if (!isValidEmail(email)) errors.push("email");
  } else if (options.requireEmail) {
    errors.push("email");
  }
  // Analysis form historically required email — keep if provided OR required
  if (options.requireEmailOrPhone) {
    if (!isValidEmail(email) && !isValidPhone(phone)) errors.push("contact");
  }
  if (ALLOWED_LANGS.indexOf(lang) === -1) {
    lang = "en";
  }
  if (ALLOWED_SERVICES.indexOf(service) === -1) errors.push("service");

  if (options.requireConsent !== false && !body.consent) {
    errors.push("consent");
  }

  // Honeypot
  if (body.honeypot || body.website || body.company_url) {
    errors.push("honeypot");
  }

  // Minimum fill time (3s) if form_started_at provided
  if (body.form_started_at) {
    var started = Date.parse(body.form_started_at);
    if (!isNaN(started) && Date.now() - started < 3000) {
      errors.push("too_fast");
    }
  }

  return {
    ok: errors.length === 0,
    errors: errors,
    data: {
      name: name,
      email: email,
      phone: normalizePhone(phone),
      lang: lang,
      service: service,
      lead_id: String(body.lead_id || "").slice(0, 80),
      protocol_id: String(body.protocol_id || "").slice(0, 80),
      recommendation: String(body.recommendation || "").slice(0, 20000),
      graft_range: String(body.graft_range || "").slice(0, 80),
      recovery: String(body.recovery || "").slice(0, 200),
      answers_json: typeof body.answers_json === "string"
        ? body.answers_json.slice(0, 5000)
        : JSON.stringify(body.answers_json || {}).slice(0, 5000),
      marketing_consent: !!body.marketing_consent,
      consent: !!body.consent,
      age_range: String(body.age_range || "").slice(0, 40),
      timeline: String(body.timeline || "").slice(0, 80),
      country: String(body.country || "").slice(0, 80),
      interest: String(body.interest || "").slice(0, 80),
      preferred_time: String(body.preferred_time || "").slice(0, 80),
      message: String(body.message || "").slice(0, 1000),
      utm_source: String(body.utm_source || "").slice(0, 200),
      utm_medium: String(body.utm_medium || "").slice(0, 200),
      utm_campaign: String(body.utm_campaign || "").slice(0, 200),
      utm_content: String(body.utm_content || "").slice(0, 200),
      utm_term: String(body.utm_term || "").slice(0, 200),
      gclid: String(body.gclid || "").slice(0, 200),
      gbraid: String(body.gbraid || "").slice(0, 200),
      wbraid: String(body.wbraid || "").slice(0, 200),
      fbclid: String(body.fbclid || "").slice(0, 200),
      ttclid: String(body.ttclid || "").slice(0, 200),
      first_landing_page: String(body.first_landing_page || "").slice(0, 500),
      landing_page: String(body.landing_page || "").slice(0, 500),
      first_referrer: String(body.first_referrer || "").slice(0, 500),
      referrer: String(body.referrer || "").slice(0, 500),
      first_visit_at: String(body.first_visit_at || "").slice(0, 40),
      created_at: String(body.created_at || new Date().toISOString()).slice(0, 40),
      lead_event_id: String(body.lead_event_id || "").slice(0, 80),
      reg_event_id: String(body.reg_event_id || "").slice(0, 80),
      fbp: String(body.fbp || "").slice(0, 200),
      fbc: String(body.fbc || "").slice(0, 200),
      event_source_url: String(body.event_source_url || "").slice(0, 500),
    },
  };
}

module.exports = {
  esc: esc,
  validateLeadBody: validateLeadBody,
  ALLOWED_LANGS: ALLOWED_LANGS,
  ALLOWED_SERVICES: ALLOWED_SERVICES,
  isValidEmail: isValidEmail,
  isValidPhone: isValidPhone,
  isValidName: isValidName,
  normalizePhone: normalizePhone,
};

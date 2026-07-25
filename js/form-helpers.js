/**
 * Aura Clinic — shared form validation & lead submit helpers.
 */
window.AURA_FORMS = (function () {
  "use strict";

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

  function uuid() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return (
      "lead-" +
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).slice(2, 10) +
      Math.random().toString(36).slice(2, 6)
    );
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
    if (!email) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
  }

  function isValidName(name) {
    var n = String(name || "").trim();
    return n.length >= 2 && n.length <= 80;
  }

  function validateLead(fields, options) {
    options = options || {};
    var errors = [];
    var name = String(fields.name || "").trim();
    var phone = String(fields.phone || "").trim();
    var email = String(fields.email || "").trim();
    var lang = String(fields.lang || fields.language || "en").toLowerCase();
    var service = String(fields.service || "hair_analysis");

    if (!isValidName(name)) errors.push("name");
    if (options.requirePhone !== false && !isValidPhone(phone)) errors.push("phone");
    if (email && !isValidEmail(email)) errors.push("email");
    if (options.requireEmail && !isValidEmail(email)) errors.push("email");
    if (ALLOWED_LANGS.indexOf(lang) === -1) errors.push("lang");
    if (ALLOWED_SERVICES.indexOf(service) === -1) errors.push("service");
    if (options.requireConsent && !fields.consent) errors.push("consent");

    return {
      ok: errors.length === 0,
      errors: errors,
      normalized: {
        name: name,
        phone: normalizePhone(phone),
        email: email,
        lang: lang,
        language: lang,
        service: service,
        marketing_consent: !!fields.marketing_consent,
        consent: !!fields.consent,
      },
    };
  }

  function buildPayload(fields, extras) {
    extras = extras || {};
    var leadId = fields.lead_id || uuid();
    var attr =
      (window.AURA_ATTRIBUTION &&
        window.AURA_ATTRIBUTION.payloadExtras({
          service: fields.service,
          language: fields.lang || fields.language,
        })) ||
      {};

    var meta = window.AURA_META || {};
    var tracking = meta.getTrackingPayload ? meta.getTrackingPayload() : {};

    var payload = Object.assign(
      {},
      attr,
      {
        lead_id: leadId,
        name: fields.name || "",
        email: fields.email || "",
        phone: fields.phone || "",
        lang: fields.lang || fields.language || "en",
        language: fields.lang || fields.language || "en",
        service: fields.service || "hair_analysis",
        protocol_id: fields.protocol_id || "",
        recommendation: fields.recommendation || "",
        graft_range: fields.graft_range || "",
        recovery: fields.recovery || "",
        answers_json: fields.answers_json || "{}",
        marketing_consent: !!fields.marketing_consent,
        consent: !!fields.consent,
        form_started_at: fields.form_started_at || "",
        honeypot: fields.honeypot || "",
        fbp: tracking.fbp || "",
        fbc: tracking.fbc || "",
        event_source_url: tracking.event_source_url || window.location.href,
        lead_event_id: extras.leadEventId || "",
        reg_event_id: extras.regEventId || "",
        age_range: fields.age_range || "",
        timeline: fields.timeline || "",
        country: fields.country || "",
        interest: fields.interest || "",
        preferred_time: fields.preferred_time || "",
        message: fields.message || "",
      }
    );

    return payload;
  }

  function submitLead(payload, options) {
    options = options || {};
    var cfg = window.AURA_CLINIC_SITE || {};
    var url = options.url || cfg.leadSubmitUrl || "/api/lead";
    var timeoutMs = options.timeoutMs || 20000;

    var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = null;

    var fetchPromise = fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller ? controller.signal : undefined,
    })
      .then(function (res) {
        return res
          .json()
          .catch(function () {
            return { ok: false, error: "invalid_response" };
          })
          .then(function (data) {
            return {
              ok: !!(res.ok && data && data.ok),
              status: res.status,
              data: data || {},
            };
          });
      })
      .catch(function (err) {
        return {
          ok: false,
          status: 0,
          data: { ok: false, error: "network_error" },
          networkError: true,
        };
      });

    if (controller) {
      timer = window.setTimeout(function () {
        try {
          controller.abort();
        } catch (e) {}
      }, timeoutMs);
    }

    return fetchPromise.finally(function () {
      if (timer) window.clearTimeout(timer);
    });
  }

  return {
    uuid: uuid,
    normalizePhone: normalizePhone,
    isValidPhone: isValidPhone,
    isValidEmail: isValidEmail,
    isValidName: isValidName,
    validateLead: validateLead,
    buildPayload: buildPayload,
    submitLead: submitLead,
    ALLOWED_LANGS: ALLOWED_LANGS,
    ALLOWED_SERVICES: ALLOWED_SERVICES,
  };
})();

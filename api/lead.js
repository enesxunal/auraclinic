/**
 * Aura Clinic — lead form mail via Namecheap PrivateEmail SMTP.
 *
 * Env: SMTP_USER, SMTP_PASS, SMTP_HOST, SMTP_PORT, MAIL_TO, MAIL_FROM,
 *      META_PIXEL_ID, META_CAPI_TOKEN, ALLOWED_ORIGINS,
 *      UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN (optional)
 */
var nodemailer = require("nodemailer");
var metaCapi = require("../lib/meta-capi");
var mailTemplates = require("../lib/mail-templates");
var rateLimit = require("../lib/rate-limit");
var leadValidate = require("../lib/lead-validate");

var MAX_BODY_BYTES = 100 * 1024;
var recentLeads = Object.create(null);

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

function parseBody(raw) {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function getSmtpConfig() {
  var user = process.env.SMTP_USER || process.env.MAIL_USER || "info@auraclinicge.com";
  var pass = process.env.SMTP_PASS || process.env.MAIL_PASS || "";
  var host = process.env.SMTP_HOST || "mail.privateemail.com";
  var port = parseInt(process.env.SMTP_PORT || "465", 10);
  return {
    user: user,
    pass: pass,
    host: host,
    port: port,
    secure: port === 465,
    to: process.env.MAIL_TO || "info@auraclinicge.com",
    from: process.env.MAIL_FROM || user,
  };
}

function duplicateKey(data) {
  return (
    String(data.email || "").toLowerCase() +
    "|" +
    String(data.phone || "") +
    "|" +
    String(data.service || "")
  );
}

function isDuplicate(data) {
  var key = duplicateKey(data);
  var now = Date.now();
  Object.keys(recentLeads).forEach(function (k) {
    if (now - recentLeads[k] > 10 * 60 * 1000) delete recentLeads[k];
  });
  if (recentLeads[key] && now - recentLeads[key] < 2 * 60 * 1000) return true;
  recentLeads[key] = now;
  return false;
}

function safeLog(msg, extra) {
  try {
    console.log(
      "[lead]",
      msg,
      extra
        ? JSON.stringify({
            service: extra.service,
            lang: extra.lang,
            lead_id: extra.lead_id,
            has_email: !!extra.email,
            has_phone: !!extra.phone,
            utm_source: extra.utm_source || "",
            landing_page: (extra.landing_page || "").slice(0, 120),
          })
        : ""
    );
  } catch (e) {}
}

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=UTF-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  if (!rateLimit.isAllowedOrigin(req)) {
    res.status(403).json({ ok: false, error: "forbidden" });
    return;
  }

  var rl = await rateLimit.checkRateLimit(
    rateLimit.clientKey(req, "lead"),
    parseInt(process.env.LEAD_RATE_LIMIT || "8", 10),
    60 * 1000
  );
  if (!rl.allowed) {
    safeLog("rate_limited", {});
    res.status(429).json({ ok: false, error: "rate_limited" });
    return;
  }

  var raw;
  try {
    raw = await readRawBody(req);
  } catch (e) {
    var errMsg = e && e.message ? String(e.message) : "";
    if (errMsg === "payload_too_large") {
      res.status(413).json({ ok: false, error: "payload_too_large" });
    } else {
      res.status(400).json({ ok: false, error: "invalid_body" });
    }
    return;
  }

  if (raw && raw.length > MAX_BODY_BYTES) {
    res.status(413).json({ ok: false, error: "payload_too_large" });
    return;
  }

  var body = parseBody(raw);
  if (!body || typeof body !== "object") {
    res.status(400).json({ ok: false, error: "invalid_json" });
    return;
  }

  // Analysis form: email was historically required; phone now also required for ads quality
  var requireEmail =
    body.service === "hair_analysis" ||
    !!body.protocol_id ||
    !!body.recommendation;
  var validated = leadValidate.validateLeadBody(body, {
    requirePhone: true,
    requireEmail: requireEmail,
    requireConsent: true,
  });

  if (!validated.ok) {
    if (validated.errors.indexOf("honeypot") !== -1 || validated.errors.indexOf("too_fast") !== -1) {
      // Silent success for bots
      res.status(200).json({ ok: true, skipped: true });
      return;
    }
    safeLog("invalid_input", { errors: validated.errors.join(",") });
    res.status(400).json({ ok: false, error: "invalid_input" });
    return;
  }

  var data = validated.data;
  if (!data.lead_id) {
    data.lead_id =
      "AC-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
  }

  if (isDuplicate(data)) {
    safeLog("duplicate", data);
    res.status(200).json({ ok: true, duplicate: true });
    return;
  }

  var smtp = getSmtpConfig();
  if (!smtp.pass) {
    res.status(503).json({ ok: false, error: "mail_not_configured" });
    return;
  }

  var clinicMail = mailTemplates.buildClinicLeadEmail(data);
  var customerMail = data.email
    ? mailTemplates.buildCustomerConfirmationEmail(data)
    : null;

  try {
    var transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: { user: smtp.user, pass: smtp.pass },
    });

    await transporter.sendMail({
      from: '"Aura Clinic" <' + smtp.from + ">",
      to: smtp.to,
      replyTo: data.email
        ? '"' + data.name.replace(/"/g, "") + '" <' + data.email + ">"
        : undefined,
      subject: clinicMail.subject,
      html: clinicMail.html,
    });

    if (customerMail && data.email) {
      await transporter.sendMail({
        from: '"Aura Clinic" <' + smtp.from + ">",
        to: data.email,
        replyTo: "info@auraclinicge.com",
        subject: customerMail.subject,
        html: customerMail.html,
      });
    }

    try {
      await metaCapi.sendLeadEvents(data, req);
    } catch (metaErr) {
      safeLog("meta_capi_failed", data);
    }

    safeLog("ok", data);
    res.status(200).json({
      ok: true,
      lead_id: data.lead_id,
      customerMail: !!(customerMail && data.email),
    });
  } catch (err) {
    safeLog("mail_failed", data);
    res.status(500).json({ ok: false, error: "mail_failed" });
  }
};

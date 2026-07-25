/**
 * Server-to-server n8n lead webhook (optional).
 * Secrets stay in Vercel env — never expose to the frontend.
 *
 * Env:
 *   N8N_LEAD_WEBHOOK_URL
 *   N8N_LEAD_WEBHOOK_SECRET
 *   N8N_LEAD_WEBHOOK_TIMEOUT_MS (default 3000)
 */

function isConfigured() {
  return !!String(process.env.N8N_LEAD_WEBHOOK_URL || "").trim();
}

function getTimeoutMs() {
  var raw = parseInt(process.env.N8N_LEAD_WEBHOOK_TIMEOUT_MS || "3000", 10);
  if (!isFinite(raw) || raw < 500) return 3000;
  if (raw > 15000) return 15000;
  return raw;
}

function pick(value, max) {
  var s = value == null ? "" : String(value);
  return s.slice(0, max || 500);
}

function crmDefault(value, fallback) {
  var s = value == null ? "" : String(value).trim();
  return s || fallback;
}

/**
 * Normalize website lead into the CRM / n8n payload.
 * Never includes photos or AI preview images.
 */
function buildN8nPayload(data, options) {
  data = data || {};
  options = options || {};
  var isDuplicate = !!options.duplicate;

  return {
    lead_id: pick(data.lead_id, 80),
    created_at: pick(data.created_at || new Date().toISOString(), 40),
    source: pick(data.source || "website", 80),
    service: pick(data.service, 40),
    language: pick(data.lang || data.language || "en", 5),
    name: pick(data.name, 80),
    phone: pick(data.phone, 40),
    email: pick(data.email, 120),
    country: pick(data.country, 80),
    city: pick(data.city, 80),
    message: pick(data.message, 1000),
    utm_source: pick(data.utm_source, 200),
    utm_medium: pick(data.utm_medium, 200),
    utm_campaign: pick(data.utm_campaign, 200),
    utm_content: pick(data.utm_content, 200),
    utm_term: pick(data.utm_term, 200),
    gclid: pick(data.gclid, 200),
    gbraid: pick(data.gbraid, 200),
    wbraid: pick(data.wbraid, 200),
    fbclid: pick(data.fbclid, 200),
    ttclid: pick(data.ttclid, 200),
    first_landing_page: pick(data.first_landing_page, 500),
    landing_page: pick(data.landing_page, 500),
    first_referrer: pick(data.first_referrer, 500),
    referrer: pick(data.referrer, 500),
    status: crmDefault(data.status, "new"),
    qualified: crmDefault(data.qualified, "no"),
    appointment_date: pick(data.appointment_date, 40),
    deposit_received: crmDefault(data.deposit_received, "no"),
    procedure_completed: crmDefault(data.procedure_completed, "no"),
    revenue: pick(data.revenue, 40),
    assigned_to: pick(data.assigned_to, 80),
    follow_up_date: pick(data.follow_up_date, 40),
    notes: pick(data.notes, 2000),
    duplicate: isDuplicate ? "yes" : crmDefault(data.duplicate, "no"),
  };
}

function safeN8nLog(msg, meta) {
  try {
    console.log(
      "[n8n-lead]",
      msg,
      meta
        ? JSON.stringify({
            lead_id: meta.lead_id || "",
            status: meta.status || "",
            http_status: meta.http_status || "",
            reason: meta.reason || "",
          })
        : ""
    );
  } catch (e) {}
}

/**
 * POST normalized lead to n8n. Single attempt, no infinite retries.
 * @returns {{ skipped?: boolean, ok: boolean, sync: boolean, http_status?: number, reason?: string }}
 */
async function sendLeadToN8n(data, options) {
  options = options || {};
  var url = String(process.env.N8N_LEAD_WEBHOOK_URL || "").trim();
  if (!url) {
    return { skipped: true, ok: false, sync: false, reason: "not_configured" };
  }

  var payload = buildN8nPayload(data, options);
  var secret = String(process.env.N8N_LEAD_WEBHOOK_SECRET || "").trim();
  var timeoutMs = getTimeoutMs();
  var fetchFn = options.fetchImpl || fetch;
  var controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  var timer = null;

  try {
    if (controller) {
      timer = setTimeout(function () {
        try {
          controller.abort();
        } catch (e) {}
      }, timeoutMs);
    }

    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (secret) {
      headers["X-Aura-Webhook-Secret"] = secret;
    }

    var res = await fetchFn(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
      signal: controller ? controller.signal : undefined,
    });

    var httpStatus = res && typeof res.status === "number" ? res.status : 0;
    var ok = httpStatus >= 200 && httpStatus < 300;

    // Body shape is informational only — 2xx = success
    if (res && typeof res.text === "function") {
      try {
        await res.text();
      } catch (e) {}
    }

    if (!ok) {
      safeN8nLog("http_error", {
        lead_id: payload.lead_id,
        http_status: String(httpStatus),
        reason: "non_2xx",
      });
      return {
        ok: false,
        sync: false,
        http_status: httpStatus,
        reason: "non_2xx",
      };
    }

    return {
      ok: true,
      sync: true,
      http_status: httpStatus,
    };
  } catch (err) {
    var reason = "request_failed";
    var name = err && err.name ? String(err.name) : "";
    if (name === "AbortError") reason = "timeout";
    safeN8nLog("request_failed", {
      lead_id: payload.lead_id,
      reason: reason,
    });
    return {
      ok: false,
      sync: false,
      reason: reason,
    };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

module.exports = {
  isConfigured: isConfigured,
  buildN8nPayload: buildN8nPayload,
  sendLeadToN8n: sendLeadToN8n,
  getTimeoutMs: getTimeoutMs,
};

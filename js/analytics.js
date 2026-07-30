/**
 * Aura Clinic — unified analytics (dataLayer + Meta + Google Ads).
 * Never sends PII, photos, medical answers, or free-text.
 */
window.AURA_ANALYTICS = (function () {
  "use strict";

  var CONSENT_KEY = "aura_clinic_cookie_consent_v1";
  var CONSENT_PREFS_KEY = "aura_clinic_cookie_prefs_v1";

  function cfg() {
    return window.AURA_CLINIC_SITE || {};
  }

  function hasMarketingConsent() {
    try {
      var prefs = localStorage.getItem(CONSENT_PREFS_KEY);
      if (prefs) {
        var p = JSON.parse(prefs);
        return !!(p.analytics || p.marketing);
      }
      return !!localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return false;
    }
  }

  function ensureDataLayer() {
    window.dataLayer = window.dataLayer || [];
  }

  function safeParams(params) {
    var allowed = {
      page_type: true,
      service_category: true,
      language: true,
      form_name: true,
      step_number: true,
      traffic_source: true,
      campaign_name: true,
      content_id: true,
      error_type: true,
      event: true,
    };
    var out = {};
    Object.keys(params || {}).forEach(function (k) {
      if (!allowed[k]) return;
      var v = params[k];
      if (v === undefined || v === null || v === "") return;
      if (typeof v === "string") out[k] = v.slice(0, 200);
      else if (typeof v === "number" || typeof v === "boolean") out[k] = v;
    });
    if (window.AURA_ATTRIBUTION) {
      if (!out.traffic_source) out.traffic_source = window.AURA_ATTRIBUTION.trafficSource();
      var a = window.AURA_ATTRIBUTION.get();
      if (!out.campaign_name && a.utm_campaign) out.campaign_name = a.utm_campaign;
      if (!out.language && a.language) out.language = a.language;
    }
    return out;
  }

  function pushDataLayer(eventName, params) {
    ensureDataLayer();
    var payload = safeParams(params);
    payload.event = eventName;
    window.dataLayer.push(payload);
  }

  function track(eventName, params) {
    try {
      var p = safeParams(params);
      pushDataLayer(eventName, p);

      if (!hasMarketingConsent()) return;

      // Meta Pixel standard events for Lead/Contact are owned by
      // trackLeadConversion / AURA_META.bindContactTracking — do not re-fire here.
      if (window.AURA_META && window.AURA_META.trackCustom) {
        var metaMap = {
          preview_generate_success: "PreviewGenerate",
          view_hair_transplant_page: "ViewContent",
          view_botox_filler_page: "ViewContent",
        };
        if (metaMap[eventName] === "ViewContent" && window.AURA_META.viewContent) {
          window.AURA_META.viewContent(p.page_type || eventName);
        } else if (metaMap[eventName] === "PreviewGenerate") {
          window.AURA_META.trackCustom("PreviewGenerate", {
            technique: p.content_id || "",
          });
        }
      }

      if (window.gtag && typeof window.gtag === "function") {
        window.gtag("event", eventName, p);
      }
    } catch (e) {
      // Analytics must never break the site
    }
  }

  function trackLeadConversion(options) {
    options = options || {};
    if (!hasMarketingConsent()) return null;

    var leadEventId = options.leadEventId || null;

    if (window.AURA_META && window.AURA_META.track) {
      leadEventId =
        leadEventId ||
        (window.AURA_META.makeEventId && window.AURA_META.makeEventId("lead"));
      // Successful form → Lead only (no CompleteRegistration)
      window.AURA_META.track(
        "Lead",
        { content_name: options.contentName || "Lead Form" },
        { eventId: leadEventId }
      );
    }

    if (window.AURA_GOOGLE && window.AURA_GOOGLE.trackLead) {
      window.AURA_GOOGLE.trackLead();
    }

    track("lead_form_success", {
      page_type: options.pageType || "form",
      service_category: options.service || "hair_transplant",
      language: options.language || "en",
      form_name: options.formName || "lead",
    });

    return { leadEventId: leadEventId };
  }

  var clicksBound = false;

  function bindGlobalClicks() {
    if (clicksBound) return;
    clicksBound = true;
    document.addEventListener(
      "click",
      function (e) {
        var t = e.target.closest
          ? e.target.closest(
              "a[href*='wa.me'], a[href^='tel:'], a[href*='instagram.com'], a[href*='google.com/maps'], [data-analytics]"
            )
          : null;
        if (!t) return;
        var href = t.getAttribute("href") || "";
        var custom = t.getAttribute("data-analytics");
        if (custom) {
          track(custom, {
            page_type: t.getAttribute("data-page-type") || "",
            service_category: t.getAttribute("data-service") || "",
            language: t.getAttribute("data-lang") || "",
          });
          return;
        }
        if (href.indexOf("wa.me") !== -1) {
          // dataLayer / gtag only — Meta Contact is fired once in meta-pixel.js
          track("click_whatsapp", {
            page_type: document.body.getAttribute("data-page-type") || "",
            service_category: document.body.getAttribute("data-service") || "",
          });
        } else if (href.indexOf("tel:") === 0) {
          track("click_phone", {
            page_type: document.body.getAttribute("data-page-type") || "",
          });
        } else if (href.indexOf("instagram.com") !== -1) {
          track("click_instagram", {});
        } else if (href.indexOf("google.com/maps") !== -1) {
          track("click_map", {});
        }
      },
      true
    );
  }

  function init(options) {
    options = options || {};
    if (window.AURA_ATTRIBUTION) window.AURA_ATTRIBUTION.capture(options);
    bindGlobalClicks();
    if (options.pageViewEvent) {
      track(options.pageViewEvent, {
        page_type: options.pageType || "",
        service_category: options.service || "",
        language: options.language || "",
      });
    }
  }

  return {
    track: track,
    trackLeadConversion: trackLeadConversion,
    init: init,
    hasMarketingConsent: hasMarketingConsent,
    CONSENT_KEY: CONSENT_KEY,
    CONSENT_PREFS_KEY: CONSENT_PREFS_KEY,
  };
})();

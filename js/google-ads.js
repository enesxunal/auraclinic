/**
 * Aura Clinic — Google Ads + optional GA4 (Consent Mode).
 */
window.AURA_GOOGLE = (function () {
  "use strict";

  var CONSENT_KEY = "aura_clinic_cookie_consent_v1";
  var PREFS_KEY = "aura_clinic_cookie_prefs_v1";
  var ADS_ID = "AW-18301236806";
  var configured = false;
  var ga4Configured = false;

  function cfg() {
    return window.AURA_CLINIC_SITE || {};
  }

  function adsId() {
    return cfg().googleAdsId || ADS_ID;
  }

  function leadSendTo() {
    return String(cfg().googleAdsLeadSendTo || "").trim();
  }

  function ga4Id() {
    return String(cfg().ga4MeasurementId || "").trim();
  }

  function hasConsent() {
    try {
      var prefs = localStorage.getItem(PREFS_KEY);
      if (prefs) {
        var p = JSON.parse(prefs);
        return !!(p.analytics || p.marketing);
      }
      return !!localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return false;
    }
  }

  function ensureGtag() {
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
  }

  function grantConsent() {
    ensureGtag();
    window.gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });
  }

  function denyConsent() {
    ensureGtag();
    window.gtag("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  }

  function configureTag() {
    if (!hasConsent()) return false;
    ensureGtag();
    grantConsent();
    if (!configured) {
      window.gtag("js", new Date());
      window.gtag("config", adsId());
      configured = true;
    }
    var ga4 = ga4Id();
    if (ga4 && !ga4Configured) {
      window.gtag("config", ga4);
      ga4Configured = true;
    }
    return true;
  }

  function trackLead() {
    if (!configureTag()) return;
    var sendTo = leadSendTo();
    if (sendTo) {
      window.gtag("event", "conversion", { send_to: sendTo });
      return;
    }
    // No conversion label configured — fire a non-conversion custom event only
    window.gtag("event", "generate_lead", {
      event_category: "Lead",
      event_label: "Lead Form",
    });
  }

  function trackContact(method) {
    if (!configureTag()) return;
    window.gtag("event", "contact", {
      event_category: "Contact",
      event_label: method || "WhatsApp",
    });
  }

  function trackPreviewGenerate() {
    if (!configureTag()) return;
    window.gtag("event", "preview_generate", {
      event_category: "AI Preview",
      event_label: "Preview Generate",
    });
  }

  function bindContactTracking() {
    document.addEventListener(
      "click",
      function (e) {
        if (!hasConsent()) return;
        var wa = e.target.closest
          ? e.target.closest("#fab-whatsapp, a[href*='wa.me'], [data-whatsapp-consult], [data-whatsapp]")
          : null;
        if (wa) {
          trackContact(
            wa.getAttribute("data-whatsapp-consult") !== null ? "Consultation" : "WhatsApp"
          );
        }
      },
      true
    );
  }

  function initOnLoad() {
    bindContactTracking();
    if (hasConsent()) configureTag();
  }

  function onConsentAccepted() {
    configureTag();
  }

  function onConsentRejected() {
    denyConsent();
    configured = false;
    ga4Configured = false;
  }

  return {
    configureTag: configureTag,
    initOnLoad: initOnLoad,
    onConsentAccepted: onConsentAccepted,
    onConsentRejected: onConsentRejected,
    trackLead: trackLead,
    trackContact: trackContact,
    trackPreviewGenerate: trackPreviewGenerate,
    hasConsent: hasConsent,
  };
})();

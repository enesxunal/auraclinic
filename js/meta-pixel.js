/**
 * Aura Clinic — Meta Pixel (browser) with cookie consent.
 */
window.AURA_META = (function () {
  "use strict";

  var CONSENT_KEY = "aura_clinic_cookie_consent_v1";
  var loaded = false;

  function cfg() {
    return window.AURA_CLINIC_SITE || {};
  }

  function pixelId() {
    return cfg().metaPixelId || "";
  }

  function hasConsent() {
    try {
      var prefs = localStorage.getItem("aura_clinic_cookie_prefs_v1");
      if (prefs) {
        var p = JSON.parse(prefs);
        return !!(p.analytics || p.marketing);
      }
      return !!localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return false;
    }
  }

  function makeEventId(prefix) {
    return (
      String(prefix || "evt") +
      "-" +
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).slice(2, 10)
    );
  }

  function getCookie(name) {
    var match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : "";
  }

  function getFbp() {
    return getCookie("_fbp");
  }

  function getFbc() {
    return getCookie("_fbc");
  }

  function bootstrapPixel() {
    if (window.fbq) return;
    var n = (window.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!window._fbq) window._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    var first = document.getElementsByTagName("script")[0];
    first.parentNode.insertBefore(s, first);
  }

  function init() {
    if (loaded || !hasConsent()) return false;
    var id = pixelId();
    if (!id) return false;

    bootstrapPixel();
    window.fbq("init", id);
    window.fbq("track", "PageView");
    loaded = true;
    return true;
  }

  function track(eventName, params, options) {
    if (!loaded && !init()) return null;
    var eventId = (options && options.eventId) || makeEventId(eventName);
    window.fbq("track", eventName, params || {}, { eventID: eventId });
    return eventId;
  }

  function trackCustom(eventName, params, options) {
    if (!loaded && !init()) return null;
    var eventId = (options && options.eventId) || makeEventId(eventName);
    window.fbq("trackCustom", eventName, params || {}, { eventID: eventId });
    return eventId;
  }

  function viewContent(name) {
    return track("ViewContent", {
      content_name: name || document.title,
      content_category: "Aura Clinic",
    });
  }

  function contact(method) {
    return track("Contact", {
      content_name: method || "Contact",
    });
  }

  function getTrackingPayload() {
    return {
      fbp: getFbp(),
      fbc: getFbc(),
      event_source_url: window.location.href,
    };
  }

  function bindContactTracking() {
    document.addEventListener(
      "click",
      function (e) {
        if (!hasConsent()) return;
        var wa = e.target.closest ? e.target.closest("#fab-whatsapp, a[href*='wa.me']") : null;
        if (wa) {
          contact("WhatsApp");
          return;
        }
        var mail = e.target.closest ? e.target.closest("a[href^='mailto:']") : null;
        if (mail) contact("Email");
      },
      true
    );
  }

  function initOnLoad(pageName) {
    bindContactTracking();
    if (hasConsent()) {
      init();
      if (pageName) viewContent(pageName);
    }
  }

  function onConsentAccepted() {
    init();
  }

  return {
    init: init,
    initOnLoad: initOnLoad,
    onConsentAccepted: onConsentAccepted,
    track: track,
    trackCustom: trackCustom,
    viewContent: viewContent,
    contact: contact,
    makeEventId: makeEventId,
    getTrackingPayload: getTrackingPayload,
    hasConsent: hasConsent,
  };
})();

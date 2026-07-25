/**
 * Aura Clinic — first-party attribution (UTM + click IDs).
 * No health or PII in this object.
 */
window.AURA_ATTRIBUTION = (function () {
  "use strict";

  var STORAGE_KEY = "aura_clinic_attribution_v1";
  var TTL_MS = 90 * 24 * 60 * 60 * 1000;
  var PARAMS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "gbraid",
    "wbraid",
    "fbclid",
    "ttclid",
  ];

  function nowIso() {
    return new Date().toISOString();
  }

  function read() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || !data.first_visit_at) return null;
      var age = Date.now() - new Date(data.first_visit_at).getTime();
      if (age > TTL_MS) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return data;
    } catch (e) {
      return null;
    }
  }

  function write(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function queryParams() {
    var out = {};
    try {
      var sp = new URLSearchParams(window.location.search);
      PARAMS.forEach(function (k) {
        var v = sp.get(k);
        if (v) out[k] = String(v).slice(0, 500);
      });
    } catch (e) {}
    return out;
  }

  function capture(options) {
    options = options || {};
    var existing = read() || {};
    var qs = queryParams();
    var page = window.location.href.split("#")[0];
    var ref = document.referrer || "";
    var lang =
      options.language ||
      (window.AURA_CHROME && window.AURA_CHROME.getLang && window.AURA_CHROME.getLang()) ||
      "en";

    var data = {
      utm_source: qs.utm_source || existing.utm_source || "",
      utm_medium: qs.utm_medium || existing.utm_medium || "",
      utm_campaign: qs.utm_campaign || existing.utm_campaign || "",
      utm_content: qs.utm_content || existing.utm_content || "",
      utm_term: qs.utm_term || existing.utm_term || "",
      gclid: qs.gclid || existing.gclid || "",
      gbraid: qs.gbraid || existing.gbraid || "",
      wbraid: qs.wbraid || existing.wbraid || "",
      fbclid: qs.fbclid || existing.fbclid || "",
      ttclid: qs.ttclid || existing.ttclid || "",
      first_landing_page: existing.first_landing_page || page,
      landing_page: page,
      first_referrer: existing.first_referrer || ref || "",
      referrer: ref || existing.referrer || "",
      first_visit_at: existing.first_visit_at || nowIso(),
      last_visit_at: nowIso(),
      language: lang,
      service: options.service || existing.service || "",
    };

    PARAMS.forEach(function (k) {
      if (qs[k]) data[k] = qs[k];
    });

    write(data);
    return data;
  }

  function get() {
    return capture();
  }

  function payloadExtras(overrides) {
    var a = capture(overrides || {});
    return {
      utm_source: a.utm_source || "",
      utm_medium: a.utm_medium || "",
      utm_campaign: a.utm_campaign || "",
      utm_content: a.utm_content || "",
      utm_term: a.utm_term || "",
      gclid: a.gclid || "",
      gbraid: a.gbraid || "",
      wbraid: a.wbraid || "",
      fbclid: a.fbclid || "",
      ttclid: a.ttclid || "",
      first_landing_page: a.first_landing_page || "",
      landing_page: a.landing_page || "",
      first_referrer: a.first_referrer || "",
      referrer: a.referrer || "",
      first_visit_at: a.first_visit_at || "",
      created_at: nowIso(),
    };
  }

  function trafficSource() {
    var a = get();
    if (a.utm_source) return a.utm_source;
    if (a.gclid || a.gbraid || a.wbraid) return "google_ads";
    if (a.fbclid) return "meta";
    if (a.ttclid) return "tiktok";
    return "direct_or_organic";
  }

  return {
    capture: capture,
    get: get,
    payloadExtras: payloadExtras,
    trafficSource: trafficSource,
    STORAGE_KEY: STORAGE_KEY,
  };
})();

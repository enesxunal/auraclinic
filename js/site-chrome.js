/**
 * Aura Clinic — shared header chrome: i18n, mobile nav, cookie prefs.
 */
(function () {
  "use strict";

  var LANG_KEY = "aura_clinic_lang_v1";
  var CONSENT_KEY = "aura_clinic_cookie_consent_v1";
  var PREFS_KEY = "aura_clinic_cookie_prefs_v1";
  var I18N = window.AURA_I18N || { en: {} };
  var currentLang = "en";
  try {
    currentLang = localStorage.getItem(LANG_KEY) || "en";
  } catch (e) {}
  if (!I18N[currentLang]) currentLang = "en";
  var langCallbacks = [];

  function t(key) {
    var pack = I18N[currentLang] || I18N.en || {};
    return pack[key] !== undefined ? pack[key] : (I18N.en && I18N.en[key]) || key;
  }

  function syncNavToggleAria() {
    var toggle = document.getElementById("nav-toggle");
    var header = document.getElementById("site-header");
    if (!toggle || !header) return;
    var open = header.classList.contains("is-nav-open");
    toggle.setAttribute("aria-label", open ? t("nav.menuClose") : t("nav.menuOpen"));
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (key) el.setAttribute("placeholder", t(key));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (key) el.innerHTML = t(key);
    });
    syncNavToggleAria();
  }

  function closeMainNav() {
    var header = document.getElementById("site-header");
    var toggle = document.getElementById("nav-toggle");
    var backdrop = document.getElementById("nav-backdrop");
    if (!header || !toggle) return;
    header.classList.remove("is-nav-open");
    toggle.setAttribute("aria-expanded", "false");
    if (backdrop) backdrop.setAttribute("aria-hidden", "true");
    syncNavToggleAria();
  }

  function initMobileNav() {
    var header = document.getElementById("site-header");
    var toggle = document.getElementById("nav-toggle");
    var backdrop = document.getElementById("nav-backdrop");
    var nav = document.getElementById("main-nav");
    if (!toggle || !header || !nav) return;

    toggle.addEventListener("click", function () {
      if (header.classList.contains("is-nav-open")) closeMainNav();
      else {
        header.classList.add("is-nav-open");
        toggle.setAttribute("aria-expanded", "true");
        if (backdrop) backdrop.setAttribute("aria-hidden", "false");
        syncNavToggleAria();
      }
    });
    if (backdrop) backdrop.addEventListener("click", closeMainNav);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMainNav();
    });
    window.addEventListener(
      "resize",
      function () {
        if (window.innerWidth > 900) closeMainNav();
      },
      { passive: true }
    );
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 900) closeMainNav();
      });
    });
    syncNavToggleAria();
  }

  function savePrefs(prefs) {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
      if (prefs.analytics || prefs.marketing) {
        localStorage.setItem(CONSENT_KEY, "1");
      } else {
        localStorage.setItem(CONSENT_KEY, "0");
      }
    } catch (e) {}
  }

  function readPrefs() {
    try {
      var raw = localStorage.getItem(PREFS_KEY);
      if (raw) return JSON.parse(raw);
      var c = localStorage.getItem(CONSENT_KEY);
      if (c === "1") return { necessary: true, analytics: true, marketing: true };
      if (c === "0") return { necessary: true, analytics: false, marketing: false };
    } catch (e) {}
    return null;
  }

  function hideBanner() {
    var bar = document.getElementById("cookie-banner");
    if (bar) bar.hidden = true;
    document.body.classList.remove("cookie-banner-visible");
    var panel = document.getElementById("cookie-prefs-panel");
    if (panel) panel.hidden = true;
  }

  function applyConsentSideEffects(prefs) {
    if (prefs.analytics || prefs.marketing) {
      if (window.AURA_GOOGLE && window.AURA_GOOGLE.onConsentAccepted) {
        window.AURA_GOOGLE.onConsentAccepted();
      }
      if (window.AURA_META && window.AURA_META.onConsentAccepted) {
        window.AURA_META.onConsentAccepted();
      }
    } else {
      if (window.AURA_GOOGLE && window.AURA_GOOGLE.onConsentRejected) {
        window.AURA_GOOGLE.onConsentRejected();
      }
    }
  }

  function initCookieBanner() {
    var bar = document.getElementById("cookie-banner");
    if (!bar) return;

    var accept = document.getElementById("cookie-accept");
    var reject = document.getElementById("cookie-reject");
    var manage = document.getElementById("cookie-manage");
    var save = document.getElementById("cookie-save");
    var panel = document.getElementById("cookie-prefs-panel");
    var analyticsCb = document.getElementById("cookie-pref-analytics");

    var existing = readPrefs();
    if (existing) {
      hideBanner();
    } else {
      bar.hidden = false;
      document.body.classList.add("cookie-banner-visible");
    }

    if (accept) {
      accept.addEventListener("click", function () {
        var prefs = { necessary: true, analytics: true, marketing: true };
        savePrefs(prefs);
        hideBanner();
        applyConsentSideEffects(prefs);
      });
    }
    if (reject) {
      reject.addEventListener("click", function () {
        var prefs = { necessary: true, analytics: false, marketing: false };
        savePrefs(prefs);
        hideBanner();
        applyConsentSideEffects(prefs);
      });
    }
    if (manage && panel) {
      manage.addEventListener("click", function () {
        panel.hidden = !panel.hidden;
      });
    }
    if (save) {
      save.addEventListener("click", function () {
        var prefs = {
          necessary: true,
          analytics: analyticsCb ? !!analyticsCb.checked : false,
          marketing: analyticsCb ? !!analyticsCb.checked : false,
        };
        savePrefs(prefs);
        hideBanner();
        applyConsentSideEffects(prefs);
      });
    }

    var reopen = document.getElementById("cookie-reopen");
    if (reopen) {
      reopen.addEventListener("click", function (e) {
        e.preventDefault();
        bar.hidden = false;
        document.body.classList.add("cookie-banner-visible");
      });
    }
  }

  function bindLangButtons() {
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang");
        if (lang) setLanguage(lang);
      });
    });
  }

  function updateServiceCardLinks(lang) {
    var cfg = window.AURA_CLINIC_SITE || {};
    var hair = (cfg.hairLandingByLang && cfg.hairLandingByLang[lang]) || cfg.hairLandingByLang.en;
    var botox = (cfg.botoxLandingByLang && cfg.botoxLandingByLang[lang]) || cfg.botoxLandingByLang.en;
    document.querySelectorAll("[data-service-link='hair']").forEach(function (el) {
      if (hair) el.setAttribute("href", hair.replace(/^\//, ""));
    });
    document.querySelectorAll("[data-service-link='botox']").forEach(function (el) {
      if (botox) el.setAttribute("href", botox.replace(/^\//, ""));
    });
  }

  function setLanguage(lang, skipCallbacks) {
    if (!I18N[lang]) return;
    currentLang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {}
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var isSel = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", isSel);
      btn.setAttribute("aria-pressed", isSel ? "true" : "false");
    });
    applyTranslations();
    updateServiceCardLinks(lang);
    if (window.AURA_WHATSAPP && window.AURA_WHATSAPP.bindAll) {
      window.AURA_WHATSAPP.bindAll(lang);
    } else if (window.AURA_WHATSAPP && window.AURA_WHATSAPP.bindConsultationLinks) {
      window.AURA_WHATSAPP.bindConsultationLinks(lang);
    }
    if (window.AURA_ATTRIBUTION) {
      window.AURA_ATTRIBUTION.capture({ language: lang });
    }
    if (!skipCallbacks) {
      langCallbacks.forEach(function (cb) {
        cb(lang);
      });
    }
  }

  function onLanguageChange(cb) {
    langCallbacks.push(cb);
  }

  function init(options) {
    options = options || {};
    if (options.initialLang && I18N[options.initialLang]) {
      currentLang = options.initialLang;
    }
    bindLangButtons();
    initMobileNav();
    initCookieBanner();
    setLanguage(currentLang, true);
    if (options.langCallbacks) {
      options.langCallbacks.forEach(onLanguageChange);
    }
    if (window.AURA_ATTRIBUTION) {
      window.AURA_ATTRIBUTION.capture({
        language: currentLang,
        service: options.service || document.body.getAttribute("data-service") || "",
      });
    }
    if (window.AURA_GOOGLE && window.AURA_GOOGLE.initOnLoad) {
      window.AURA_GOOGLE.initOnLoad();
    }
    if (window.AURA_META && window.AURA_META.initOnLoad) {
      window.AURA_META.initOnLoad(options.metaPageName || "Aura Clinic");
    }
    if (window.AURA_ANALYTICS && window.AURA_ANALYTICS.init) {
      window.AURA_ANALYTICS.init({
        pageViewEvent: options.pageViewEvent || "",
        pageType: options.pageType || document.body.getAttribute("data-page-type") || "",
        service: options.service || document.body.getAttribute("data-service") || "",
        language: currentLang,
      });
    }
    langCallbacks.forEach(function (cb) {
      cb(currentLang);
    });
  }

  window.AURA_CHROME = {
    init: init,
    setLanguage: setLanguage,
    onLanguageChange: onLanguageChange,
    t: t,
    getLang: function () {
      return currentLang;
    },
    LANG_KEY: LANG_KEY,
    CONSENT_KEY: CONSENT_KEY,
    PREFS_KEY: PREFS_KEY,
  };
})();

/**
 * Aura Clinic — standalone preview page (preview.html)
 */
(function () {
  "use strict";

  var I18N = window.AURA_I18N || { en: {} };
  var currentLang = "en";
  var previewCtrl = null;

  function t(key) {
    var pack = I18N[currentLang] || I18N.en || {};
    return pack[key] !== undefined ? pack[key] : key;
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    document.title = t("preview.pageTitle") + " — Aura Clinic";
  }

  function setLanguage(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var isSel = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", isSel);
      btn.setAttribute("aria-pressed", isSel ? "true" : "false");
    });
    applyTranslations();
    if (previewCtrl) previewCtrl.setLanguage(lang);
  }

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-lang");
      if (lang) setLanguage(lang);
    });
  });

  var saved = null;
  try {
    var raw = sessionStorage.getItem("aura_clinic_report_v1");
    if (raw) saved = JSON.parse(raw);
  } catch (e) {}

  var defaultTech = "dhiPrecision";
  if (saved && saved.techniqueKey) defaultTech = saved.techniqueKey;

  previewCtrl = window.AURA_PREVIEW_UI.init({
    lang: currentLang,
    defaultTechnique: defaultTech,
    showRecommended: false,
    answers: saved ? saved.answers : null,
    protocolId: saved ? saved.protocolId : "",
  });

  setLanguage(currentLang);
})();

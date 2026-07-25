/**
 * Aura Clinic — standalone preview page (preview.html)
 */
(function () {
  "use strict";

  var previewCtrl = null;

  function updatePageTitle(lang) {
    var pack = (window.AURA_I18N && window.AURA_I18N[lang]) || window.AURA_I18N.en || {};
    var title = pack["preview.pageTitle"] || "AI Hair Preview";
    document.title = title + " — Aura Clinic";
  }

  var saved = null;
  try {
    var raw = sessionStorage.getItem("aura_clinic_report_v1");
    if (raw) saved = JSON.parse(raw);
  } catch (e) {}

  var defaultTech = "dhiPrecision";
  if (saved && saved.techniqueKey) defaultTech = saved.techniqueKey;

  function boot(lang) {
    if (!previewCtrl) {
      previewCtrl = window.AURA_PREVIEW_UI.init({
        lang: lang,
        defaultTechnique: defaultTech,
        showRecommended: false,
        answers: saved ? saved.answers : null,
        protocolId: saved ? saved.protocolId : "",
      });
    } else if (previewCtrl.setLanguage) {
      previewCtrl.setLanguage(lang);
    }
    updatePageTitle(lang);
  }

  if (window.AURA_CHROME) {
    window.AURA_CHROME.init({
      metaPageName: "AI Preview Page",
      langCallbacks: [boot],
    });
  } else {
    boot("en");
  }
})();

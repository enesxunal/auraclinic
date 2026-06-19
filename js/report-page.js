/**
 * Aura Clinic — analysis result page (report.html)
 */
(function () {
  "use strict";

  var STORAGE_KEY = "aura_clinic_report_v1";
  var currentLang = "en";
  var reportPayload = null;
  var previewCtrl = null;

  var core = window.AURA_ANALYSIS;
  var I18N = window.AURA_I18N || { en: {} };

  function t(key) {
    if (core && core.t) return core.t(key, currentLang);
    var pack = I18N[currentLang] || I18N.en || {};
    return pack[key] !== undefined ? pack[key] : key;
  }

  function loadPayload() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
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
    renderReport();
    if (previewCtrl) previewCtrl.setLanguage(lang);
  }

  function renderReport() {
    if (!reportPayload || !core) return;
    var proto = core.buildProtocol(
      reportPayload.answers,
      reportPayload.protocolId,
      currentLang
    );
    var body = document.getElementById("report-result-body");
    var idEl = document.getElementById("report-protocol-id");
    if (idEl) idEl.textContent = proto.protocolId;
    if (body) core.renderReportCard(body, reportPayload.answers, proto, currentLang);
    reportPayload._proto = proto;
    reportPayload.techniqueKey = proto.techniqueKey;
    if (previewCtrl) previewCtrl.setTechnique(proto.techniqueKey);
  }

  function showMailNotice() {
    if (!reportPayload || reportPayload.mailSent) return;
    var el = document.getElementById("report-mail-notice");
    if (!el) return;
    el.textContent = t("report.mailNotice");
    el.hidden = false;
  }

  reportPayload = loadPayload();
  if (!reportPayload || !reportPayload.answers) {
    window.location.replace("index.html#analysis");
    return;
  }

  currentLang = reportPayload.lang || "en";
  if (!I18N[currentLang]) currentLang = "en";

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-lang");
      if (lang) setLanguage(lang);
    });
  });

  var initialTech =
    reportPayload.techniqueKey ||
    (reportPayload._proto && reportPayload._proto.techniqueKey) ||
    "individual";

  previewCtrl = window.AURA_PREVIEW_UI.init({
    lang: currentLang,
    defaultTechnique: initialTech,
    showRecommended: true,
    answers: reportPayload.answers,
    protocolId: reportPayload.protocolId || "",
  });

  setLanguage(currentLang);
  showMailNotice();
})();

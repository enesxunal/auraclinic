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

  function bindConsultationLink() {
    var btn = document.getElementById("book-consultation-btn");
    if (!btn) return;
    var proto = (reportPayload && reportPayload.protocolId) || "";
    btn.setAttribute("data-protocol-id", proto);
    if (window.AURA_WHATSAPP && window.AURA_WHATSAPP.bindConsultationLinks) {
      window.AURA_WHATSAPP.bindConsultationLinks(currentLang);
    }
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

  function onLangChange(lang) {
    currentLang = lang;
    renderReport();
    if (previewCtrl && previewCtrl.setLanguage) previewCtrl.setLanguage(lang);
    showMailNotice();
    bindConsultationLink();
  }

  reportPayload = loadPayload();
  if (!reportPayload || !reportPayload.answers) {
    window.location.replace("index.html#analysis");
    return;
  }

  var startLang = reportPayload.lang || "en";
  if (!I18N[startLang]) startLang = "en";

  var initialTech =
    reportPayload.techniqueKey ||
    (reportPayload._proto && reportPayload._proto.techniqueKey) ||
    "individual";

  previewCtrl = window.AURA_PREVIEW_UI.init({
    lang: startLang,
    defaultTechnique: initialTech,
    showRecommended: true,
    answers: reportPayload.answers,
    protocolId: reportPayload.protocolId || "",
  });

  currentLang = startLang;

  if (window.AURA_CHROME) {
    window.AURA_CHROME.init({
      initialLang: startLang,
      metaPageName: "Analysis Report",
      langCallbacks: [onLangChange],
    });
    currentLang = window.AURA_CHROME.getLang();
  }

  renderReport();
  showMailNotice();
  bindConsultationLink();
})();

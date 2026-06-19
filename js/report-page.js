/**
 * Aura Clinic — dedicated analysis result page
 */
(function () {
  "use strict";

  var STORAGE_KEY = "aura_clinic_report_v1";
  var currentLang = "en";
  var reportPayload = null;
  var previewObjectUrl = null;

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
    refreshPreviewTechnique();
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
    refreshPreviewTechnique();
  }

  function refreshPreviewTechnique() {
    var el = document.getElementById("preview-technique-text");
    if (!el || !reportPayload || !reportPayload._proto) return;
    el.textContent = reportPayload._proto.technique + " · " + reportPayload._proto.grafts;
  }

  function initPhotoPreview() {
    var input = document.getElementById("preview-photo-input");
    var frame = document.getElementById("preview-frame");
    var img = document.getElementById("preview-user-photo");
    if (!input || !frame || !img) return;

    var MAX_BYTES = 8 * 1024 * 1024;

    input.addEventListener("change", function () {
      var file = input.files && input.files[0];
      if (!file) return;
      if (file.size > MAX_BYTES) {
        input.value = "";
        window.alert(t("preview.errorSize"));
        return;
      }
      if (previewObjectUrl) {
        URL.revokeObjectURL(previewObjectUrl);
        previewObjectUrl = null;
      }
      previewObjectUrl = URL.createObjectURL(file);
      img.src = previewObjectUrl;
      img.alt = t("preview.uploadLabel");
      frame.hidden = false;
    });
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

  setLanguage(currentLang);
  showMailNotice();
  initPhotoPreview();
})();

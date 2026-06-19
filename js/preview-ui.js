/**
 * Aura Clinic — shared visual preview UI (photo + technique + frame + AI stub)
 */
window.AURA_PREVIEW_UI = (function () {
  "use strict";

  var TECH_KEYS = ["dhiPrecision", "fueMega", "nonShavenDhi", "individual"];
  var MAX_BYTES = 8 * 1024 * 1024;

  function t(key, lang) {
    var core = window.AURA_ANALYSIS;
    if (core && core.t) return core.t(key, lang);
    var pack = (window.AURA_I18N || {}).en || {};
    return pack[key] || key;
  }

  function techLabel(key, lang) {
    var map = {
      dhiPrecision: "tech.dhiPrecision",
      fueMega: "tech.fueMega",
      nonShavenDhi: "tech.nonShavenDhi",
      individual: "tech.individual",
    };
    return t(map[key] || "tech.individual", lang);
  }

  function bindTechniquePicker(container, lang, initialKey, onChange) {
    if (!container) return;
    container.replaceChildren();
    container.setAttribute("role", "radiogroup");
    container.setAttribute("aria-label", t("preview.techniqueLabel", lang));

    TECH_KEYS.forEach(function (key) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "technique-chip";
      btn.setAttribute("data-technique", key);
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", key === initialKey ? "true" : "false");
      if (key === initialKey) btn.classList.add("is-selected");

      var label = document.createElement("span");
      label.className = "technique-chip__label";
      label.textContent = techLabel(key, lang);
      btn.appendChild(label);

      btn.addEventListener("click", function () {
        container.querySelectorAll(".technique-chip").forEach(function (el) {
          var on = el.getAttribute("data-technique") === key;
          el.classList.toggle("is-selected", on);
          el.setAttribute("aria-checked", on ? "true" : "false");
        });
        if (onChange) onChange(key);
      });

      container.appendChild(btn);
    });
  }

  function getSelectedTechnique(container) {
    var sel = container && container.querySelector(".technique-chip.is-selected");
    return (sel && sel.getAttribute("data-technique")) || "individual";
  }

  function updateFrameFooter(els, techniqueKey, lang, recommended) {
    if (!els.frameTechnique) return;
    var text = techLabel(techniqueKey, lang);
    if (recommended) {
      text = t("preview.recommendedPrefix", lang) + " " + text;
    }
    els.frameTechnique.textContent = text;
    if (els.frameBrand) {
      els.frameBrand.textContent = "Aura Clinic · Batumi";
    }
  }

  function showFrame(els, imageSrc) {
    if (!els.frame || !els.framePhoto) return;
    els.framePhoto.src = imageSrc;
    els.framePhoto.alt = t("preview.resultAlt", els.lang);
    els.frame.hidden = false;
  }

  function setStatus(els, message, isError) {
    if (!els.status) return;
    els.status.textContent = message || "";
    els.status.hidden = !message;
    els.status.classList.toggle("preview-status--error", !!isError);
    els.status.classList.toggle("preview-status--info", !isError && !!message);
  }

  function setGenerating(els, on) {
    if (els.generateBtn) {
      els.generateBtn.disabled = on;
      els.generateBtn.classList.toggle("is-loading", on);
      els.generateBtn.textContent = on
        ? t("preview.generating", els.lang)
        : t("preview.generate", els.lang);
    }
    if (els.frame) els.frame.classList.toggle("is-generating", on);
  }

  function runGenerate(els, state) {
    if (!state.file) {
      setStatus(els, t("preview.needPhoto", els.lang), true);
      return;
    }

    var techniqueKey = state.techniqueKey;
    var cfg = window.AURA_CLINIC_SITE || {};
    var url = cfg.previewApiUrl || "/api/preview";

    setStatus(els, "", false);
    setGenerating(els, true);

    var fd = new FormData();
    fd.append("photo", state.file);
    fd.append("technique", techniqueKey);
    fd.append("lang", els.lang);
    if (state.answers) fd.append("answers_json", JSON.stringify(state.answers));
    if (state.protocolId) fd.append("protocol_id", state.protocolId);

    fetch(url, { method: "POST", body: fd, headers: { Accept: "application/json" } })
      .then(function (res) {
        return res.json().catch(function () {
          return { ok: false };
        });
      })
      .then(function (data) {
        if (data.ok && data.imageBase64) {
          showFrame(els, "data:image/jpeg;base64," + data.imageBase64);
          setStatus(els, t("preview.aiSuccess", els.lang), false);
          return;
        }
        if (data.ok && data.imageUrl) {
          showFrame(els, data.imageUrl);
          setStatus(els, t("preview.aiSuccess", els.lang), false);
          return;
        }
        if (state.localPreviewUrl) {
          showFrame(els, state.localPreviewUrl);
        }
        setStatus(els, t("preview.aiSoon", els.lang), false);
      })
      .catch(function () {
        if (state.localPreviewUrl) {
          showFrame(els, state.localPreviewUrl);
        }
        setStatus(els, t("preview.aiSoon", els.lang), false);
      })
      .finally(function () {
        setGenerating(els, false);
      });
  }

  /**
   * @param {object} options
   * @param {string} options.lang
   * @param {string} options.defaultTechnique
   * @param {boolean} [options.showRecommended]
   * @param {object} [options.answers]
   * @param {string} [options.protocolId]
   */
  function init(options) {
    var els = {
      lang: options.lang || "en",
      photoInput: document.getElementById(options.photoInputId || "preview-photo-input"),
      techniquePicker: document.getElementById(
        options.techniquePickerId || "preview-technique-picker"
      ),
      generateBtn: document.getElementById(options.generateBtnId || "preview-generate-btn"),
      frame: document.getElementById(options.frameId || "preview-frame"),
      framePhoto: document.getElementById(options.framePhotoId || "preview-user-photo"),
      frameTechnique: document.getElementById(options.frameTechniqueId || "preview-technique-text"),
      frameBrand: document.getElementById(options.frameBrandId || "preview-frame-brand"),
      status: document.getElementById(options.statusId || "preview-status"),
    };

    var state = {
      file: null,
      localPreviewUrl: null,
      techniqueKey: options.defaultTechnique || "individual",
      answers: options.answers || null,
      protocolId: options.protocolId || "",
    };

    bindTechniquePicker(els.techniquePicker, els.lang, state.techniqueKey, function (key) {
      state.techniqueKey = key;
      updateFrameFooter(els, key, els.lang, options.showRecommended && key === options.defaultTechnique);
    });

    updateFrameFooter(
      els,
      state.techniqueKey,
      els.lang,
      !!options.showRecommended
    );

    if (els.photoInput) {
      els.photoInput.addEventListener("change", function () {
        var file = els.photoInput.files && els.photoInput.files[0];
        if (!file) return;
        if (file.size > MAX_BYTES) {
          els.photoInput.value = "";
          setStatus(els, t("preview.errorSize", els.lang), true);
          return;
        }
        if (state.localPreviewUrl) URL.revokeObjectURL(state.localPreviewUrl);
        state.file = file;
        state.localPreviewUrl = URL.createObjectURL(file);
        setStatus(els, "", false);
      });
    }

    if (els.generateBtn) {
      els.generateBtn.addEventListener("click", function () {
        runGenerate(els, state);
      });
    }

    return {
      setLanguage: function (lang) {
        els.lang = lang;
        bindTechniquePicker(els.techniquePicker, lang, state.techniqueKey, function (key) {
          state.techniqueKey = key;
          updateFrameFooter(els, key, lang, options.showRecommended && key === options.defaultTechnique);
        });
        updateFrameFooter(
          els,
          state.techniqueKey,
          lang,
          !!options.showRecommended
        );
        if (els.generateBtn && !els.generateBtn.classList.contains("is-loading")) {
          els.generateBtn.textContent = t("preview.generate", lang);
        }
      },
      setTechnique: function (key) {
        state.techniqueKey = key;
        bindTechniquePicker(els.techniquePicker, els.lang, key, function (k) {
          state.techniqueKey = k;
          updateFrameFooter(els, k, els.lang, options.showRecommended && k === options.defaultTechnique);
        });
        updateFrameFooter(els, key, els.lang, !!options.showRecommended);
      },
    };
  }

  return {
    TECH_KEYS: TECH_KEYS,
    techLabel: techLabel,
    init: init,
  };
})();

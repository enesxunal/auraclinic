/**
 * Aura Clinic — shared visual preview UI (photo + technique + frame + AI stub)
 */
window.AURA_PREVIEW_UI = (function () {
  "use strict";

  var TECH_KEYS = ["dhiPrecision", "fueMega", "nonShavenDhi", "individual"];
  var MAX_BYTES = 8 * 1024 * 1024;
  var UPLOAD_MAX_EDGE = 1536;
  var UPLOAD_JPEG_QUALITY = 0.82;

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

  function showCompare(els, beforeSrc, afterSrc) {
    if (!els.frame || !els.beforePhoto) return;

    els.beforePhoto.src = beforeSrc;
    els.beforePhoto.alt = t("preview.beforeAlt", els.lang);
    els.frame.hidden = false;

    if (afterSrc) {
      els.afterPhoto.src = afterSrc;
      els.afterPhoto.alt = t("preview.afterAlt", els.lang);
      els.afterPhoto.hidden = false;
      els.frame.classList.add("has-after");
      if (els.afterPlaceholder) els.afterPlaceholder.hidden = true;
    } else {
      els.afterPhoto.removeAttribute("src");
      els.afterPhoto.hidden = true;
      els.frame.classList.remove("has-after");
      if (els.afterPlaceholder) {
        els.afterPlaceholder.hidden = false;
        els.afterPlaceholder.textContent = t("preview.afterPending", els.lang);
      }
    }
  }

  function showBeforeOnly(els, beforeSrc) {
    showCompare(els, beforeSrc, null);
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
    if (on) {
      if (els.afterPhoto) {
        els.afterPhoto.removeAttribute("src");
        els.afterPhoto.hidden = true;
      }
      if (els.frame) els.frame.classList.remove("has-after");
      if (els.afterPlaceholder) {
        els.afterPlaceholder.hidden = false;
        els.afterPlaceholder.textContent = t("preview.generatingAfter", els.lang);
      }
    }
  }

  function preparePhotoPayload(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        URL.revokeObjectURL(url);
        var w = img.naturalWidth || img.width;
        var h = img.naturalHeight || img.height;
        var scale = Math.min(1, UPLOAD_MAX_EDGE / Math.max(w, h));
        var cw = Math.max(1, Math.round(w * scale));
        var ch = Math.max(1, Math.round(h * scale));
        var canvas = document.createElement("canvas");
        canvas.width = cw;
        canvas.height = ch;
        var ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("canvas"));
          return;
        }
        ctx.drawImage(img, 0, 0, cw, ch);
        canvas.toBlob(
          function (blob) {
            if (!blob) {
              reject(new Error("blob"));
              return;
            }
            var reader = new FileReader();
            reader.onload = function () {
              var dataUrl = String(reader.result || "");
              var base64 = dataUrl.indexOf(",") !== -1 ? dataUrl.split(",")[1] : dataUrl;
              resolve({ photoBase64: base64, mimeType: "image/jpeg" });
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          },
          "image/jpeg",
          UPLOAD_JPEG_QUALITY
        );
      };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error("image"));
      };
      img.src = url;
    });
  }

  function previewErrorMessage(data, lang) {
    // Never show raw Gemini/API messages to users
    var status = data && data.status;
    if (status === "quota_exceeded") return t("preview.aiQuota", lang);
    if (status === "billing_suspended") return t("preview.aiBilling", lang);
    if (status === "forbidden" || status === "invalid_key" || status === "not_configured") {
      return t("preview.aiUnavailable", lang);
    }
    if (status === "rate_limited") return t("preview.rateLimited", lang);
    if (status === "invalid_mime" || status === "payload_too_large") {
      return t("preview.errorSize", lang);
    }
    return t("preview.aiSoon", lang);
  }

  function showResultCtas(els, afterDataUrl) {
    var box = document.getElementById("preview-result-ctas");
    if (!box) return;
    box.hidden = false;
    var saveBtn = document.getElementById("preview-save-btn");
    if (saveBtn && afterDataUrl) {
      saveBtn.onclick = function () {
        var a = document.createElement("a");
        a.href = afterDataUrl;
        a.download = "aura-clinic-hair-preview.jpg";
        a.click();
      };
    }
    if (window.AURA_WHATSAPP && window.AURA_WHATSAPP.bindAll) {
      window.AURA_WHATSAPP.bindAll(els.lang);
    }
  }

  function runGenerate(els, state) {
    var consent = document.getElementById("preview-ai-consent");
    if (consent && !consent.checked) {
      setStatus(els, t("preview.consentRequired", els.lang), true);
      return;
    }
    if (!state.file) {
      setStatus(els, t("preview.needPhoto", els.lang), true);
      return;
    }

    var techniqueKey = state.techniqueKey;
    var cfg = window.AURA_CLINIC_SITE || {};
    var url = cfg.previewApiUrl || "/api/preview";

    setStatus(els, "", false);
    setGenerating(els, true);
    showBeforeOnly(els, state.localPreviewUrl);
    var ctaBox = document.getElementById("preview-result-ctas");
    if (ctaBox) ctaBox.hidden = true;

    if (window.AURA_ANALYTICS) {
      window.AURA_ANALYTICS.track("preview_upload_start", {
        page_type: "ai_preview",
        service_category: "hair_transplant",
        language: els.lang,
        content_id: techniqueKey,
      });
    }

    preparePhotoPayload(state.file)
      .then(function (payload) {
        var body = {
          photoBase64: payload.photoBase64,
          mimeType: payload.mimeType,
          technique: techniqueKey,
          lang: els.lang,
        };
        if (state.answers) body.answers = state.answers;
        if (state.protocolId) body.protocol_id = state.protocolId;

        return fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }).then(function (res) {
          return res
            .json()
            .catch(function () {
              return { ok: false, status: res.status === 429 ? "rate_limited" : "generation_failed" };
            })
            .then(function (data) {
              if (res.status === 429) data.status = "rate_limited";
              return data;
            });
        });
      })
      .then(function (data) {
        if (data.ok && data.imageBase64) {
          var mime = data.mimeType || "image/png";
          var afterUrl = "data:" + mime + ";base64," + data.imageBase64;
          showCompare(els, state.localPreviewUrl, afterUrl);
          showResultCtas(els, afterUrl);
          if (window.AURA_ANALYTICS) {
            window.AURA_ANALYTICS.track("preview_generate_success", {
              page_type: "ai_preview",
              service_category: "hair_transplant",
              language: els.lang,
              content_id: techniqueKey,
            });
          }
          if (window.AURA_META && window.AURA_META.trackCustom) {
            window.AURA_META.trackCustom("PreviewGenerate", {
              technique: techniqueKey,
            });
          }
          if (window.AURA_GOOGLE && window.AURA_GOOGLE.trackPreviewGenerate) {
            window.AURA_GOOGLE.trackPreviewGenerate();
          }
          setStatus(els, t("preview.aiSuccess", els.lang), false);
          return;
        }
        if (data.ok && data.imageUrl) {
          showCompare(els, state.localPreviewUrl, data.imageUrl);
          showResultCtas(els, data.imageUrl);
          setStatus(els, t("preview.aiSuccess", els.lang), false);
          return;
        }
        showBeforeOnly(els, state.localPreviewUrl);
        setStatus(els, previewErrorMessage(data, els.lang), true);
        if (window.AURA_ANALYTICS) {
          window.AURA_ANALYTICS.track("preview_generate_error", {
            page_type: "ai_preview",
            language: els.lang,
            error_type: (data && data.status) || "generation_failed",
          });
        }
      })
      .catch(function () {
        if (state.localPreviewUrl) {
          showBeforeOnly(els, state.localPreviewUrl);
        }
        setStatus(els, t("preview.aiSoon", els.lang), true);
        if (window.AURA_ANALYTICS) {
          window.AURA_ANALYTICS.track("preview_generate_error", {
            page_type: "ai_preview",
            language: els.lang,
            error_type: "network_error",
          });
        }
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
      beforePhoto: document.getElementById(options.beforePhotoId || "preview-before-photo"),
      afterPhoto: document.getElementById(options.afterPhotoId || "preview-after-photo"),
      afterPlaceholder: document.getElementById(
        options.afterPlaceholderId || "preview-after-placeholder"
      ),
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
        var consent = document.getElementById("preview-ai-consent");
        if (consent && !consent.checked) {
          els.photoInput.value = "";
          setStatus(els, t("preview.consentRequired", els.lang), true);
          return;
        }
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

/**
 * Aura Clinic — homepage: stepper, lead form → report.html (only after API success)
 */
(function () {
  "use strict";

  var STORAGE_KEY = "aura_clinic_report_v1";
  var I18N = window.AURA_I18N || { en: {} };
  var core = window.AURA_ANALYSIS;
  var currentLang = "en";
  var formStartedAt = new Date().toISOString();
  var submitting = false;

  function t(key) {
    if (core && core.t) return core.t(key, currentLang);
    var pack = I18N[currentLang] || I18N.en || {};
    return pack[key] !== undefined ? pack[key] : key;
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    var fieldLang = document.getElementById("field-lang");
    if (fieldLang) fieldLang.value = currentLang;
    var btnNext = document.getElementById("btn-next");
    if (btnNext) {
      var step = getCurrentStep();
      btnNext.textContent = step < 5 ? t("analysis.next") : t("analysis.finish");
    }
  }

  function refreshLeadHiddenFields() {
    var lead = document.getElementById("lead-gate");
    if (!lead || lead.hidden || !core) return;
    var answers = readAnswers();
    var idField = document.getElementById("field-protocol-id");
    var fixedId = idField && idField.value ? idField.value : null;
    var proto = core.buildProtocol(answers, fixedId, currentLang);
    document.getElementById("field-protocol-id").value = proto.protocolId;
    document.getElementById("field-recommendation").value = core.buildFullReportPlain(
      answers,
      proto,
      currentLang
    );
    document.getElementById("field-graft-range").value = proto.grafts;
    document.getElementById("field-recovery").value = proto.recovery;
  }

  function updateServiceLinks() {
    var cfg = window.AURA_CLINIC_SITE || {};
    var hair = cfg.hairLandingByLang && cfg.hairLandingByLang[currentLang];
    var botox = cfg.botoxLandingByLang && cfg.botoxLandingByLang[currentLang];
    document.querySelectorAll("[data-service-link='hair']").forEach(function (el) {
      if (hair) el.href = hair.replace(/^\//, "");
    });
    document.querySelectorAll("[data-service-link='botox']").forEach(function (el) {
      if (botox) el.href = botox.replace(/^\//, "");
    });
  }

  function setLanguage(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    try {
      localStorage.setItem(
        (window.AURA_CHROME && window.AURA_CHROME.LANG_KEY) || "aura_clinic_lang_v1",
        lang
      );
    } catch (e) {}
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var isSel = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", isSel);
      btn.setAttribute("aria-pressed", isSel ? "true" : "false");
    });
    applyTranslations();
    refreshLeadHiddenFields();
    syncNavToggleAria();
    updateServiceLinks();
    if (window.AURA_WHATSAPP && window.AURA_WHATSAPP.bindAll) {
      window.AURA_WHATSAPP.bindAll(lang);
    } else if (window.AURA_WHATSAPP && window.AURA_WHATSAPP.bindConsultationLinks) {
      window.AURA_WHATSAPP.bindConsultationLinks(lang);
    }
    if (window.AURA_ATTRIBUTION) {
      window.AURA_ATTRIBUTION.capture({ language: lang, service: "hair_analysis" });
    }
  }

  function syncNavToggleAria() {
    var toggle = document.getElementById("nav-toggle");
    var header = document.getElementById("site-header");
    if (!toggle || !header) return;
    var open = header.classList.contains("is-nav-open");
    toggle.setAttribute("aria-label", open ? t("nav.menuClose") : t("nav.menuOpen"));
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

  function initSmoothScroll() {
    document.addEventListener(
      "click",
      function (e) {
        if (e.defaultPrevented || e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        var a = e.target.closest ? e.target.closest("a[href^='#']") : null;
        if (!a) return;
        var href = a.getAttribute("href");
        if (!href || href === "#") return;
        var id = href.slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        closeMainNav();
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "", href);
        }
        var motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth";
        window.requestAnimationFrame(function () {
          window.setTimeout(function () {
            var header = document.getElementById("site-header");
            var offset = header ? header.getBoundingClientRect().height + 12 : 0;
            var top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: Math.max(0, top), behavior: motion });
          }, window.innerWidth <= 900 ? 80 : 0);
        });
      },
      false
    );
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
    syncNavToggleAria();
  }

  function getCurrentStep() {
    var active = document.querySelector(".step-panel.is-active");
    return active ? parseInt(active.getAttribute("data-step"), 10) : 1;
  }

  function setStep(n) {
    document.querySelectorAll(".step-panel").forEach(function (panel) {
      var sn = parseInt(panel.getAttribute("data-step"), 10);
      panel.classList.toggle("is-active", sn === n);
      panel.hidden = sn !== n;
    });
    var fill = document.getElementById("progress-fill");
    var stepNum = document.getElementById("step-num");
    var bar = document.querySelector(".progress-bar");
    if (fill) fill.style.width = (n / 5) * 100 + "%";
    if (stepNum) stepNum.textContent = String(n);
    if (bar) bar.setAttribute("aria-valuenow", String(n));
    var btnPrev = document.getElementById("btn-prev");
    var btnNext = document.getElementById("btn-next");
    if (btnPrev) btnPrev.disabled = n === 1;
    if (btnNext) btnNext.textContent = n < 5 ? t("analysis.next") : t("analysis.finish");
    if (window.AURA_ANALYTICS) {
      window.AURA_ANALYTICS.track("hair_analysis_step_complete", {
        page_type: "homepage",
        service_category: "hair_transplant",
        language: currentLang,
        form_name: "hair_analysis",
        step_number: n,
      });
    }
  }

  function getFieldName(step) {
    return { 1: "gender", 2: "age", 3: "area", 4: "severity", 5: "goal" }[step];
  }

  function currentStepHasValue() {
    var name = getFieldName(getCurrentStep());
    return !!document.querySelector('input[name="' + name + '"]:checked');
  }

  function readAnswers() {
    function val(name) {
      var el = document.querySelector('input[name="' + name + '"]:checked');
      return el ? el.value : "";
    }
    return {
      gender: val("gender"),
      age: val("age"),
      area: val("area"),
      severity: val("severity"),
      goal: val("goal"),
    };
  }

  function showFormError(msg) {
    var errorEl = document.getElementById("form-error");
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.hidden = false;
  }

  function initStepper() {
    var btnNext = document.getElementById("btn-next");
    var btnPrev = document.getElementById("btn-prev");
    if (!btnNext || !btnPrev || !core) return;

    btnNext.addEventListener("click", function () {
      if (!currentStepHasValue()) return;
      var step = getCurrentStep();
      if (step === 1) {
        if (window.AURA_ANALYTICS) {
          window.AURA_ANALYTICS.track("start_hair_analysis", {
            page_type: "homepage",
            service_category: "hair_transplant",
            language: currentLang,
            form_name: "hair_analysis",
            step_number: 1,
          });
        }
        if (window.AURA_META && window.AURA_META.trackCustom) {
          window.AURA_META.trackCustom("AnalysisStart", { step: 1 });
        }
      }
      if (step < 5) {
        setStep(step + 1);
        return;
      }
      var answers = readAnswers();
      var proto = core.buildProtocol(answers, null, currentLang);
      document.getElementById("field-protocol-id").value = proto.protocolId;
      document.getElementById("field-recommendation").value = core.buildFullReportPlain(
        answers,
        proto,
        currentLang
      );
      document.getElementById("field-graft-range").value = proto.grafts;
      document.getElementById("field-recovery").value = proto.recovery;
      document.getElementById("field-answers-json").value = JSON.stringify(answers);

      var stepper = document.getElementById("stepper-wrap");
      var lead = document.getElementById("lead-gate");
      if (stepper) stepper.hidden = true;
      if (lead) {
        lead.hidden = false;
        lead.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (window.AURA_ANALYTICS) {
        window.AURA_ANALYTICS.track("view_lead_form", {
          page_type: "homepage",
          service_category: "hair_transplant",
          language: currentLang,
          form_name: "hair_analysis",
        });
      }
      if (window.AURA_META && window.AURA_META.trackCustom) {
        window.AURA_META.trackCustom("AnalysisComplete", { step: 5 });
      }
    });

    btnPrev.addEventListener("click", function () {
      var step = getCurrentStep();
      if (step > 1) setStep(step - 1);
    });

    setStep(1);
  }

  function initForm() {
    var form = document.getElementById("lead-form");
    var errorEl = document.getElementById("form-error");
    var submitBtn = form && form.querySelector('button[type="submit"]');
    if (!form || !core || !window.AURA_FORMS) return;

    var started = document.getElementById("field-form-started");
    if (started) started.value = formStartedAt;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (submitting) return;
      if (errorEl) errorEl.hidden = true;

      var answers = readAnswers();
      if (!answers.gender || !answers.age || !answers.area || !answers.severity || !answers.goal) {
        showFormError(t("lead.errorIncomplete"));
        return;
      }

      var name = (document.getElementById("lead-name") || {}).value || "";
      var email = (document.getElementById("lead-email") || {}).value || "";
      var phone = (document.getElementById("lead-phone") || {}).value || "";
      var consentEl = document.getElementById("lead-consent");
      var marketingEl = document.getElementById("lead-marketing");
      var honeypot = (document.getElementById("lead-website") || {}).value || "";

      var validated = window.AURA_FORMS.validateLead(
        {
          name: name,
          email: email,
          phone: phone,
          lang: currentLang,
          service: "hair_analysis",
          consent: consentEl ? consentEl.checked : false,
          marketing_consent: marketingEl ? marketingEl.checked : false,
        },
        { requirePhone: true, requireEmail: true, requireConsent: true }
      );

      if (!validated.ok) {
        var err = validated.errors[0];
        var map = {
          name: "lead.errorName",
          phone: "lead.errorPhone",
          email: "lead.errorEmail",
          consent: "lead.errorConsent",
        };
        showFormError(t(map[err] || "lead.errorGeneric"));
        if (window.AURA_ANALYTICS) {
          window.AURA_ANALYTICS.track("lead_form_error", {
            page_type: "homepage",
            service_category: "hair_transplant",
            language: currentLang,
            form_name: "hair_analysis",
            error_type: err || "validation",
          });
        }
        return;
      }

      var idField = document.getElementById("field-protocol-id");
      var fixedId = idField && idField.value ? idField.value : null;
      var proto = core.buildProtocol(answers, fixedId, currentLang);
      if (idField) idField.value = proto.protocolId;
      document.getElementById("field-recommendation").value = core.buildFullReportPlain(
        answers,
        proto,
        currentLang
      );
      document.getElementById("field-graft-range").value = proto.grafts;
      document.getElementById("field-recovery").value = proto.recovery;
      document.getElementById("field-answers-json").value = JSON.stringify(answers);

      submitting = true;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = t("lead.sending");
      }

      if (window.AURA_ANALYTICS) {
        window.AURA_ANALYTICS.track("submit_lead_form", {
          page_type: "homepage",
          service_category: "hair_transplant",
          language: currentLang,
          form_name: "hair_analysis",
        });
      }

      // Prepare conversion event IDs but fire ONLY after API success
      var meta = window.AURA_META || {};
      var leadEventId = meta.makeEventId ? meta.makeEventId("lead") : "";
      var regEventId = meta.makeEventId ? meta.makeEventId("reg") : "";

      var payload = window.AURA_FORMS.buildPayload(
        {
          name: validated.normalized.name,
          email: validated.normalized.email,
          phone: validated.normalized.phone,
          lang: currentLang,
          service: "hair_analysis",
          protocol_id: proto.protocolId,
          recommendation: core.buildFullReportPlain(answers, proto, currentLang),
          graft_range: proto.grafts,
          recovery: proto.recovery,
          answers_json: JSON.stringify(answers),
          consent: true,
          marketing_consent: validated.normalized.marketing_consent,
          form_started_at: formStartedAt,
          honeypot: honeypot,
          website: honeypot,
        },
        { leadEventId: leadEventId, regEventId: regEventId }
      );

      window.AURA_FORMS.submitLead(payload, { timeoutMs: 20000 }).then(function (result) {
        if (!result.ok) {
          submitting = false;
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = t("lead.submit");
          }
          showFormError(t("lead.errorGeneric") + " — " + t("lead.retry"));
          if (window.AURA_ANALYTICS) {
            window.AURA_ANALYTICS.track("lead_form_error", {
              page_type: "homepage",
              service_category: "hair_transplant",
              language: currentLang,
              form_name: "hair_analysis",
              error_type: (result.data && result.data.error) || "api_error",
            });
          }
          return;
        }

        // Success — fire conversions once (skip duplicate retries)
        if (!(result.data && result.data.duplicate)) {
        if (window.AURA_ANALYTICS && window.AURA_ANALYTICS.trackLeadConversion) {
          window.AURA_ANALYTICS.trackLeadConversion({
            leadEventId: leadEventId,
            regEventId: regEventId,
            contentName: "Hair Analysis Form",
            pageType: "homepage",
            service: "hair_transplant",
            language: currentLang,
            formName: "hair_analysis",
          });
        } else {
          if (meta.track) {
            meta.track("Lead", { content_name: "Hair Analysis Form" }, { eventId: leadEventId });
            meta.track(
              "CompleteRegistration",
              { content_name: "Hair Analysis Form" },
              { eventId: regEventId }
            );
          }
          if (window.AURA_GOOGLE && window.AURA_GOOGLE.trackLead) {
            window.AURA_GOOGLE.trackLead();
          }
        }
        }

        var reportPayload = {
          lang: currentLang,
          answers: answers,
          protocolId: proto.protocolId,
          techniqueKey: proto.techniqueKey,
          name: validated.normalized.name,
          email: validated.normalized.email,
          phone: validated.normalized.phone,
          submittedAt: new Date().toISOString(),
          mailSent: true,
          leadId: payload.lead_id,
        };

        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(reportPayload));
        } catch (err) {
          submitting = false;
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = t("lead.submit");
          }
          showFormError(t("lead.errorStorage"));
          return;
        }
        window.location.href = "report.html";
      });
    });
  }

  function initCookieBanner() {
    var KEY = "aura_clinic_cookie_consent_v1";
    var PREFS = "aura_clinic_cookie_prefs_v1";
    var bar = document.getElementById("cookie-banner");
    var btn = document.getElementById("cookie-accept");
    var reject = document.getElementById("cookie-reject");
    var manage = document.getElementById("cookie-manage");
    var save = document.getElementById("cookie-save");
    var panel = document.getElementById("cookie-prefs-panel");
    var analyticsCb = document.getElementById("cookie-pref-analytics");
    if (!bar) return;

    function hideBar() {
      bar.hidden = true;
      document.body.classList.remove("cookie-banner-visible");
      if (panel) panel.hidden = true;
    }

    function hasDecision() {
      try {
        return localStorage.getItem(PREFS) || localStorage.getItem(KEY);
      } catch (e) {
        return null;
      }
    }

    if (hasDecision()) hideBar();
    else {
      bar.hidden = false;
      document.body.classList.add("cookie-banner-visible");
    }

    function savePrefs(prefs) {
      try {
        localStorage.setItem(PREFS, JSON.stringify(prefs));
        localStorage.setItem(KEY, prefs.analytics || prefs.marketing ? "1" : "0");
      } catch (e) {}
    }

    if (btn) {
      btn.addEventListener("click", function () {
        savePrefs({ necessary: true, analytics: true, marketing: true });
        hideBar();
        if (window.AURA_META && window.AURA_META.onConsentAccepted) {
          window.AURA_META.onConsentAccepted();
          window.AURA_META.viewContent("Homepage");
        }
        if (window.AURA_GOOGLE && window.AURA_GOOGLE.onConsentAccepted) {
          window.AURA_GOOGLE.onConsentAccepted();
        }
      });
    }
    if (reject) {
      reject.addEventListener("click", function () {
        savePrefs({ necessary: true, analytics: false, marketing: false });
        hideBar();
        if (window.AURA_GOOGLE && window.AURA_GOOGLE.onConsentRejected) {
          window.AURA_GOOGLE.onConsentRejected();
        }
      });
    }
    if (manage && panel) {
      manage.addEventListener("click", function () {
        panel.hidden = !panel.hidden;
      });
    }
    if (save) {
      save.addEventListener("click", function () {
        var on = analyticsCb ? !!analyticsCb.checked : false;
        savePrefs({ necessary: true, analytics: on, marketing: on });
        hideBar();
        if (on) {
          if (window.AURA_META && window.AURA_META.onConsentAccepted) {
            window.AURA_META.onConsentAccepted();
          }
          if (window.AURA_GOOGLE && window.AURA_GOOGLE.onConsentAccepted) {
            window.AURA_GOOGLE.onConsentAccepted();
          }
        } else if (window.AURA_GOOGLE && window.AURA_GOOGLE.onConsentRejected) {
          window.AURA_GOOGLE.onConsentRejected();
        }
      });
    }
  }

  function initSiteFloatingLinks() {
    if (window.AURA_WHATSAPP && window.AURA_WHATSAPP.bindAll) {
      window.AURA_WHATSAPP.bindAll(currentLang);
    }
    var ig = document.getElementById("fab-instagram");
    var cfg = window.AURA_CLINIC_SITE || {};
    if (ig && cfg.instagram) ig.href = cfg.instagram;
  }

  function initMeta() {
    if (window.AURA_ATTRIBUTION) {
      window.AURA_ATTRIBUTION.capture({ language: currentLang, service: "hair_analysis" });
    }
    if (window.AURA_GOOGLE && window.AURA_GOOGLE.initOnLoad) {
      window.AURA_GOOGLE.initOnLoad();
    }
    if (window.AURA_META && window.AURA_META.initOnLoad) {
      window.AURA_META.initOnLoad("Homepage");
    }
    if (window.AURA_ANALYTICS && window.AURA_ANALYTICS.init) {
      window.AURA_ANALYTICS.init({
        pageType: "homepage",
        service: "hair_analysis",
        language: currentLang,
      });
    }
  }

  var savedLang = "en";
  try {
    savedLang = localStorage.getItem("aura_clinic_lang_v1") || "en";
  } catch (e) {}
  if (!I18N[savedLang]) savedLang = "en";

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-lang");
      if (lang) setLanguage(lang);
    });
  });

  setLanguage(savedLang);
  if (window.location.hash === "#analysis") {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }
  initSiteFloatingLinks();
  initCookieBanner();
  initMeta();
  initSmoothScroll();
  initMobileNav();
  initStepper();
  initForm();
})();

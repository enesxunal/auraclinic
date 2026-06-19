/**
 * Aura Clinic — homepage: stepper, lead form → report.html
 */
(function () {
  "use strict";

  var STORAGE_KEY = "aura_clinic_report_v1";
  var I18N = window.AURA_I18N || { en: {} };
  var core = window.AURA_ANALYSIS;

  var currentLang = "en";

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

  function setLanguage(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var isSel = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", isSel);
      btn.setAttribute("aria-pressed", isSel ? "true" : "false");
    });
    applyTranslations();
    refreshLeadHiddenFields();
    syncNavToggleAria();
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
        } else {
          window.location.hash = href;
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

  function getLeadSubmitUrl(form) {
    var siteCfg = window.AURA_CLINIC_SITE || {};
    if (siteCfg.leadSubmitUrl && String(siteCfg.leadSubmitUrl).length > 0) {
      return siteCfg.leadSubmitUrl;
    }
    return form.getAttribute("action") || form.action || "send-mail.php";
  }

  function trySendLead(fd, submitUrl) {
    return fetch(submitUrl, {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" },
    })
      .then(function (res) {
        return res.json().catch(function () {
          return { ok: false };
        }).then(function (data) {
          return !!(res.ok && data.ok);
        });
      })
      .catch(function () {
        return false;
      });
  }

  function initStepper() {
    var btnNext = document.getElementById("btn-next");
    var btnPrev = document.getElementById("btn-prev");
    if (!btnNext || !btnPrev || !core) return;

    btnNext.addEventListener("click", function () {
      if (!currentStepHasValue()) return;
      var step = getCurrentStep();
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
    if (!form || !core) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (errorEl) errorEl.hidden = true;

      var answers = readAnswers();
      if (!answers.gender || !answers.age || !answers.area || !answers.severity || !answers.goal) {
        if (errorEl) {
          errorEl.textContent = t("lead.errorIncomplete");
          errorEl.hidden = false;
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

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = t("lead.sending");
      }

      var fd = new FormData(form);
      var submitUrl = getLeadSubmitUrl(form);
      var payload = {
        lang: currentLang,
        answers: answers,
        protocolId: proto.protocolId,
        techniqueKey: proto.techniqueKey,
        name: String(fd.get("name") || ""),
        email: String(fd.get("email") || ""),
        phone: String(fd.get("phone") || ""),
        submittedAt: new Date().toISOString(),
        mailSent: false,
      };

      var mailRace = Promise.race([
        trySendLead(fd, submitUrl),
        new Promise(function (resolve) {
          window.setTimeout(function () {
            resolve(false);
          }, 5000);
        }),
      ]);

      mailRace.then(function (ok) {
        payload.mailSent = ok;
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        } catch (err) {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = t("lead.submit");
          }
          if (errorEl) {
            errorEl.textContent = t("lead.errorStorage");
            errorEl.hidden = false;
          }
          return;
        }
        window.location.href = "report.html";
      });
    });
  }

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-lang");
      if (lang) setLanguage(lang);
    });
  });

  function initSiteFloatingLinks() {
    var cfg = window.AURA_CLINIC_SITE || {};
    var wa = document.getElementById("fab-whatsapp");
    if (wa && cfg.whatsappE164) {
      wa.href =
        "https://wa.me/" + String(cfg.whatsappE164).replace(/^\+/, "").replace(/\s/g, "");
    }
    var ig = document.getElementById("fab-instagram");
    if (ig && cfg.instagram) ig.href = cfg.instagram;
  }

  function initCookieBanner() {
    var KEY = "aura_clinic_cookie_consent_v1";
    var bar = document.getElementById("cookie-banner");
    var btn = document.getElementById("cookie-accept");
    if (!bar || !btn) return;
    function hideBar() {
      bar.hidden = true;
      document.body.classList.remove("cookie-banner-visible");
    }
    if (localStorage.getItem(KEY)) hideBar();
    else {
      bar.hidden = false;
      document.body.classList.add("cookie-banner-visible");
    }
    btn.addEventListener("click", function () {
      localStorage.setItem(KEY, "1");
      hideBar();
    });
  }

  setLanguage("en");
  if (window.location.hash === "#analysis") {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }
  initSiteFloatingLinks();
  initCookieBanner();
  initSmoothScroll();
  initMobileNav();
  initStepper();
  initForm();
})();

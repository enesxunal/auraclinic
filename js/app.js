/**
 * Aura Clinic — stepper, protocol engine, lead form
 * Ana dil: en
 */

(function () {
  "use strict";

  /** @type {Record<string, Record<string, string>>} */
  const I18N = window.AURA_I18N || { en: {} };

  let currentLang = "en";
  /** @type {{ answers: ReturnType<typeof readAnswers>; protocolId: string } | null} */
  let lastReportSnapshot = null;

  function t(key) {
    const pack = I18N[currentLang] || I18N.en;
    return pack[key] !== undefined ? pack[key] : I18N.en[key] || key;
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (key) el.textContent = t(key);
    });
    const fieldLang = document.getElementById("field-lang");
    if (fieldLang) fieldLang.value = currentLang;

    const btnNext = document.getElementById("btn-next");
    if (btnNext) {
      const step = getCurrentStep();
      if (step < 5) btnNext.textContent = t("analysis.next");
      else btnNext.textContent = t("analysis.finish");
    }
  }

  function refreshLeadHiddenFields() {
    const lead = document.getElementById("lead-gate");
    if (!lead || lead.hidden) return;
    const answers = readAnswers();
    const idField = document.getElementById("field-protocol-id");
    const fixedId = idField && idField.value ? idField.value : null;
    const proto = buildProtocol(answers, fixedId);
    document.getElementById("field-protocol-id").value = proto.protocolId;
    document.getElementById("field-recommendation").value = buildFullReportPlain(answers, proto);
    document.getElementById("field-graft-range").value = proto.grafts;
    document.getElementById("field-recovery").value = proto.recovery;
  }

  function refreshVisibleReport() {
    if (!lastReportSnapshot) return;
    const reportBox = document.getElementById("report-result");
    const reportBody = document.getElementById("report-result-body");
    if (!reportBox || reportBox.hidden || !reportBody) return;
    const proto = buildProtocol(lastReportSnapshot.answers, lastReportSnapshot.protocolId);
    renderReportCard(reportBody, lastReportSnapshot.answers, proto);
  }

  function setLanguage(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      const isSel = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", isSel);
      btn.setAttribute("aria-pressed", isSel ? "true" : "false");
    });
    applyTranslations();
    refreshLeadHiddenFields();
    syncNavToggleAria();
    refreshVisibleReport();
  }

  function syncNavToggleAria() {
    const toggle = document.getElementById("nav-toggle");
    const header = document.getElementById("site-header");
    if (!toggle || !header) return;
    const open = header.classList.contains("is-nav-open");
    toggle.setAttribute("aria-label", open ? t("nav.menuClose") : t("nav.menuOpen"));
  }

  function closeMainNav() {
    const header = document.getElementById("site-header");
    const toggle = document.getElementById("nav-toggle");
    const backdrop = document.getElementById("nav-backdrop");
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
        if (e.defaultPrevented) return;
        if (e.button !== 0) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const a = e.target.closest ? e.target.closest("a[href^='#']") : null;
        if (!a) return;
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        const id = href.slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        closeMainNav();
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "", href);
        } else {
          window.location.hash = href;
        }
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth";
        function doScroll() {
          const header = document.getElementById("site-header");
          const offset = header ? header.getBoundingClientRect().height + 12 : 0;
          const top =
            target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({
            top: Math.max(0, top),
            behavior: motion,
          });
        }
        window.requestAnimationFrame(function () {
          window.setTimeout(doScroll, window.innerWidth <= 900 ? 80 : 0);
        });
      },
      false
    );
  }

  function initMobileNav() {
    const header = document.getElementById("site-header");
    const toggle = document.getElementById("nav-toggle");
    const backdrop = document.getElementById("nav-backdrop");
    const nav = document.getElementById("main-nav");
    if (!toggle || !header || !nav) return;

    function openNav() {
      header.classList.add("is-nav-open");
      toggle.setAttribute("aria-expanded", "true");
      if (backdrop) backdrop.setAttribute("aria-hidden", "false");
      syncNavToggleAria();
    }

    toggle.addEventListener("click", function () {
      if (header.classList.contains("is-nav-open")) closeMainNav();
      else openNav();
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
    const active = document.querySelector(".step-panel.is-active");
    return active ? parseInt(active.getAttribute("data-step"), 10) : 1;
  }

  function setStep(n) {
    document.querySelectorAll(".step-panel").forEach(function (panel) {
      const sn = parseInt(panel.getAttribute("data-step"), 10);
      const on = sn === n;
      panel.classList.toggle("is-active", on);
      panel.hidden = !on;
    });
    const fill = document.getElementById("progress-fill");
    const stepNum = document.getElementById("step-num");
    const bar = document.querySelector(".progress-bar");
    if (fill) fill.style.width = (n / 5) * 100 + "%";
    if (stepNum) stepNum.textContent = String(n);
    if (bar) bar.setAttribute("aria-valuenow", String(n));

    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
    if (btnPrev) btnPrev.disabled = n === 1;
    if (btnNext) {
      btnNext.textContent = n < 5 ? t("analysis.next") : t("analysis.finish");
    }
  }

  function getFieldName(step) {
    const map = { 1: "gender", 2: "age", 3: "area", 4: "severity", 5: "goal" };
    return map[step];
  }

  function currentStepHasValue() {
    const step = getCurrentStep();
    const name = getFieldName(step);
    const el = document.querySelector('input[name="' + name + '"]:checked');
    return !!el;
  }

  /**
   * Protocol engine: Rule C → B → A → fallback
   * Grafts: Rule D by severity
   */
  function buildProtocol(answers, fixedProtocolId) {
    const g = answers.gender;
    const area = answers.area;
    const severity = answers.severity;

    /** @type {"nonShavenDhi"|"fueMega"|"dhiPrecision"|"individual"} */
    let techKey = "individual";

    if (g === "female") {
      techKey = "nonShavenDhi";
    } else if (area === "full" && severity === "advanced") {
      techKey = "fueMega";
    } else if (area === "hairline" || area === "beard") {
      techKey = "dhiPrecision";
    }

    const graftKey =
      severity === "light"
        ? "graft.light"
        : severity === "moderate"
          ? "graft.moderate"
          : "graft.advanced";

    const techLabelKey =
      techKey === "nonShavenDhi"
        ? "tech.nonShavenDhi"
        : techKey === "fueMega"
          ? "tech.fueMega"
          : techKey === "dhiPrecision"
            ? "tech.dhiPrecision"
            : "tech.individual";

    const id =
      fixedProtocolId ||
      "AC-" +
        new Date().toISOString().slice(0, 10).replace(/-/g, "") +
        "-" +
        String(Math.floor(1000 + Math.random() * 9000));

    const grafts = t(graftKey);
    const technique = t(techLabelKey);
    const recovery = t("recovery.text");

    const title = t("result.title").replace("{id}", id);
    const body = t("result.body")
      .replace("{technique}", technique)
      .replace("{grafts}", grafts);

    return {
      protocolId: id,
      techniqueKey: techKey,
      technique,
      grafts,
      graftKey,
      recovery,
      title,
      body,
    };
  }

  function readAnswers() {
    function val(name) {
      const el = document.querySelector('input[name="' + name + '"]:checked');
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

  function choiceLabel(field, value) {
    /** @type {Record<string, string> | null} */
    let map = null;
    if (field === "gender") map = { male: "opt.male", female: "opt.female" };
    else if (field === "age")
      map = { "18-25": "opt.age1825", "26-45": "opt.age2645", "45+": "opt.age45" };
    else if (field === "area")
      map = {
        hairline: "opt.hairline",
        crown: "opt.crown",
        full: "opt.full",
        beard: "opt.beard",
      };
    else if (field === "severity")
      map = { light: "opt.light", moderate: "opt.moderate", advanced: "opt.advanced" };
    else if (field === "goal")
      map = {
        density: "opt.density",
        natural: "opt.natural",
        reconstruction: "opt.reconstruction",
      };
    const k = map && map[value];
    return k ? t(k) : value || "—";
  }

  function insightFor(techKey, goal) {
    const ik = "report.insight." + techKey + "." + goal;
    let s = t(ik);
    if (!s || s === ik) s = t("report.insightFallback");
    return s;
  }

  function buildFullReportPlain(answers, proto) {
    const lines = [];
    lines.push(proto.title);
    lines.push("");
    lines.push(t("report.sectionChoices"));
    lines.push("• " + t("report.lblGender") + ": " + choiceLabel("gender", answers.gender));
    lines.push("• " + t("report.lblAge") + ": " + choiceLabel("age", answers.age));
    lines.push("• " + t("report.lblArea") + ": " + choiceLabel("area", answers.area));
    lines.push(
      "• " + t("report.lblSeverity") + ": " + choiceLabel("severity", answers.severity)
    );
    lines.push("• " + t("report.lblGoal") + ": " + choiceLabel("goal", answers.goal));
    lines.push("");
    lines.push(t("report.sectionRecommendation"));
    lines.push(proto.body);
    lines.push("");
    lines.push(t("report.graftIntro") + " " + proto.grafts);
    lines.push(proto.recovery);
    lines.push("");
    lines.push(insightFor(proto.techniqueKey, answers.goal));
    lines.push("");
    lines.push(t("report.severityContext." + answers.severity));
    lines.push("");
    lines.push(t("report.footerNote"));
    return lines.join("\n");
  }

  function renderReportCard(container, answers, proto) {
    container.replaceChildren();

    function addTitle(text) {
      const p = document.createElement("p");
      p.className = "report-block-title";
      p.textContent = text;
      container.appendChild(p);
    }

    function addP(text, className) {
      const p = document.createElement("p");
      p.className = className || "report-paragraph";
      p.textContent = text;
      container.appendChild(p);
    }

    addP(proto.title);

    addTitle(t("report.sectionChoices"));
    const ul = document.createElement("ul");
    ul.className = "report-choice-list";
    [
      [t("report.lblGender"), choiceLabel("gender", answers.gender)],
      [t("report.lblAge"), choiceLabel("age", answers.age)],
      [t("report.lblArea"), choiceLabel("area", answers.area)],
      [t("report.lblSeverity"), choiceLabel("severity", answers.severity)],
      [t("report.lblGoal"), choiceLabel("goal", answers.goal)],
    ].forEach(function (pair) {
      const li = document.createElement("li");
      li.textContent = pair[0] + ": " + pair[1];
      ul.appendChild(li);
    });
    container.appendChild(ul);

    addTitle(t("report.sectionRecommendation"));
    addP(proto.body);
    addP(t("report.graftIntro") + " " + proto.grafts);
    addP(proto.recovery);
    addP(insightFor(proto.techniqueKey, answers.goal));
    addP(t("report.severityContext." + answers.severity));

    const note = document.createElement("p");
    note.className = "report-note";
    note.textContent = t("report.footerNote");
    container.appendChild(note);
  }

  function initStepper() {
    const btnNext = document.getElementById("btn-next");
    const btnPrev = document.getElementById("btn-prev");
    if (!btnNext || !btnPrev) return;

    btnNext.addEventListener("click", function () {
      if (!currentStepHasValue()) return;
      const step = getCurrentStep();
      if (step < 5) {
        setStep(step + 1);
        return;
      }
      const answers = readAnswers();
      const proto = buildProtocol(answers, null);

      document.getElementById("field-protocol-id").value = proto.protocolId;
      document.getElementById("field-recommendation").value = buildFullReportPlain(answers, proto);
      document.getElementById("field-graft-range").value = proto.grafts;
      document.getElementById("field-recovery").value = proto.recovery;
      document.getElementById("field-answers-json").value = JSON.stringify(answers);

      lastReportSnapshot = null;
      const reportBox = document.getElementById("report-result");
      if (reportBox) reportBox.hidden = true;

      const stepper = document.getElementById("stepper-wrap");
      const lead = document.getElementById("lead-gate");
      if (stepper) stepper.hidden = true;
      if (lead) {
        lead.hidden = false;
        lead.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    btnPrev.addEventListener("click", function () {
      const step = getCurrentStep();
      if (step > 1) setStep(step - 1);
    });

    setStep(1);
  }

  function initForm() {
    const form = document.getElementById("lead-form");
    const successEl = document.getElementById("form-success");
    const errorEl = document.getElementById("form-error");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (successEl) successEl.hidden = true;
      if (errorEl) errorEl.hidden = true;

      const answers = readAnswers();
      const idField = document.getElementById("field-protocol-id");
      const fixedId = idField && idField.value ? idField.value : null;
      const proto = buildProtocol(answers, fixedId);
      if (idField) idField.value = proto.protocolId;
      const recField = document.getElementById("field-recommendation");
      if (recField) recField.value = buildFullReportPlain(answers, proto);
      const graftField = document.getElementById("field-graft-range");
      if (graftField) graftField.value = proto.grafts;
      const recovField = document.getElementById("field-recovery");
      if (recovField) recovField.value = proto.recovery;
      const jsonField = document.getElementById("field-answers-json");
      if (jsonField) jsonField.value = JSON.stringify(answers);

      const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";

      const fd = new FormData(form);
      var siteCfg = window.AURA_CLINIC_SITE || {};
      var submitUrl =
        siteCfg.leadSubmitUrl && String(siteCfg.leadSubmitUrl).length > 0
          ? siteCfg.leadSubmitUrl
          : form.getAttribute("action") || form.action;
      try {
        const res = await fetch(submitUrl, {
          method: "POST",
          body: fd,
          headers: { Accept: "application/json" },
        });
        const data = await res.json().catch(function () {
          return { ok: false };
        });
        if (res.ok && data.ok) {
          lastReportSnapshot = {
            answers: Object.assign({}, answers),
            protocolId: proto.protocolId,
          };
          if (successEl) {
            successEl.textContent = t("lead.success");
            successEl.hidden = false;
          }
          const reportBox = document.getElementById("report-result");
          const reportBody = document.getElementById("report-result-body");
          if (reportBox && reportBody) {
            renderReportCard(reportBody, answers, proto);
            reportBox.hidden = false;
            window.requestAnimationFrame(function () {
              window.setTimeout(function () {
                reportBox.scrollIntoView({ behavior: motion, block: "nearest" });
              }, window.innerWidth <= 900 ? 80 : 0);
            });
          }
          form.querySelectorAll("input:not([type=hidden])").forEach(function (inp) {
            inp.disabled = true;
          });
          form.querySelector('button[type="submit"]').disabled = true;
        } else {
          throw new Error(data.error || "fail");
        }
      } catch {
        if (errorEl) {
          errorEl.textContent = t("lead.error");
          errorEl.hidden = false;
        }
      }
    });
  }

  document.querySelectorAll(".lang-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const lang = btn.getAttribute("data-lang");
      if (lang) setLanguage(lang);
    });
  });

  function initSiteFloatingLinks() {
    var cfg = window.AURA_CLINIC_SITE || {};
    var wa = document.getElementById("fab-whatsapp");
    if (wa && cfg.whatsappE164) {
      wa.href =
        "https://wa.me/" +
        String(cfg.whatsappE164).replace(/^\+/, "").replace(/\s/g, "");
    }
    var ig = document.getElementById("fab-instagram");
    if (ig && cfg.instagram) ig.href = cfg.instagram;
    var tt = document.getElementById("fab-tiktok");
    if (tt && cfg.tiktok) tt.href = cfg.tiktok;
    var fb = document.getElementById("fab-facebook");
    if (fb && cfg.facebook) fb.href = cfg.facebook;
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
    function showBar() {
      bar.hidden = false;
      document.body.classList.add("cookie-banner-visible");
    }
    if (localStorage.getItem(KEY)) {
      hideBar();
    } else {
      showBar();
    }
    btn.addEventListener("click", function () {
      localStorage.setItem(KEY, "1");
      hideBar();
    });
  }

  setLanguage("en");
  initSiteFloatingLinks();
  initCookieBanner();
  initSmoothScroll();
  initMobileNav();
  initStepper();
  initForm();
})();

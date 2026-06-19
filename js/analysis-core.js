/**
 * Aura Clinic — shared protocol engine & report rendering
 */
window.AURA_ANALYSIS = (function () {
  "use strict";

  function t(key, lang) {
    var I18N = window.AURA_I18N || { en: {} };
    var pack = I18N[lang] || I18N.en || {};
    return pack[key] !== undefined ? pack[key] : (I18N.en && I18N.en[key]) || key;
  }

  function choiceLabel(field, value, lang) {
    var map = null;
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
    var k = map && map[value];
    return k ? t(k, lang) : value || "—";
  }

  function insightFor(techKey, goal, lang) {
    var ik = "report.insight." + techKey + "." + goal;
    var s = t(ik, lang);
    if (!s || s === ik) s = t("report.insightFallback", lang);
    return s;
  }

  function buildProtocol(answers, fixedProtocolId, lang) {
    var g = answers.gender;
    var area = answers.area;
    var severity = answers.severity;
    var techKey = "individual";

    if (g === "female") techKey = "nonShavenDhi";
    else if (area === "full" && severity === "advanced") techKey = "fueMega";
    else if (area === "hairline" || area === "beard") techKey = "dhiPrecision";

    var graftKey =
      severity === "light"
        ? "graft.light"
        : severity === "moderate"
          ? "graft.moderate"
          : "graft.advanced";

    var techLabelKey =
      techKey === "nonShavenDhi"
        ? "tech.nonShavenDhi"
        : techKey === "fueMega"
          ? "tech.fueMega"
          : techKey === "dhiPrecision"
            ? "tech.dhiPrecision"
            : "tech.individual";

    var id =
      fixedProtocolId ||
      "AC-" +
        new Date().toISOString().slice(0, 10).replace(/-/g, "") +
        "-" +
        String(Math.floor(1000 + Math.random() * 9000));

    var grafts = t(graftKey, lang);
    var technique = t(techLabelKey, lang);
    var recovery = t("recovery.text", lang);
    var title = t("result.title", lang).replace("{id}", id);
    var body = t("result.body", lang)
      .replace("{technique}", technique)
      .replace("{grafts}", grafts);

    return {
      protocolId: id,
      techniqueKey: techKey,
      technique: technique,
      grafts: grafts,
      graftKey: graftKey,
      recovery: recovery,
      title: title,
      body: body,
    };
  }

  function buildFullReportPlain(answers, proto, lang) {
    var lines = [];
    lines.push(proto.title);
    lines.push("");
    lines.push(t("report.sectionChoices", lang));
    lines.push("• " + t("report.lblGender", lang) + ": " + choiceLabel("gender", answers.gender, lang));
    lines.push("• " + t("report.lblAge", lang) + ": " + choiceLabel("age", answers.age, lang));
    lines.push("• " + t("report.lblArea", lang) + ": " + choiceLabel("area", answers.area, lang));
    lines.push(
      "• " + t("report.lblSeverity", lang) + ": " + choiceLabel("severity", answers.severity, lang)
    );
    lines.push("• " + t("report.lblGoal", lang) + ": " + choiceLabel("goal", answers.goal, lang));
    lines.push("");
    lines.push(t("report.sectionRecommendation", lang));
    lines.push(proto.body);
    lines.push("");
    lines.push(t("report.graftIntro", lang) + " " + proto.grafts);
    lines.push(proto.recovery);
    lines.push("");
    lines.push(insightFor(proto.techniqueKey, answers.goal, lang));
    lines.push("");
    lines.push(t("report.severityContext." + answers.severity, lang));
    lines.push("");
    lines.push(t("report.footerNote", lang));
    return lines.join("\n");
  }

  function renderReportCard(container, answers, proto, lang) {
    container.replaceChildren();

    function addTitle(text) {
      var p = document.createElement("p");
      p.className = "report-block-title";
      p.textContent = text;
      container.appendChild(p);
    }

    function addP(text, className) {
      var p = document.createElement("p");
      p.className = className || "report-paragraph";
      p.textContent = text;
      container.appendChild(p);
    }

    addP(proto.title);
    addTitle(t("report.sectionChoices", lang));
    var ul = document.createElement("ul");
    ul.className = "report-choice-list";
    [
      [t("report.lblGender", lang), choiceLabel("gender", answers.gender, lang)],
      [t("report.lblAge", lang), choiceLabel("age", answers.age, lang)],
      [t("report.lblArea", lang), choiceLabel("area", answers.area, lang)],
      [t("report.lblSeverity", lang), choiceLabel("severity", answers.severity, lang)],
      [t("report.lblGoal", lang), choiceLabel("goal", answers.goal, lang)],
    ].forEach(function (pair) {
      var li = document.createElement("li");
      li.textContent = pair[0] + ": " + pair[1];
      ul.appendChild(li);
    });
    container.appendChild(ul);
    addTitle(t("report.sectionRecommendation", lang));
    addP(proto.body);
    addP(t("report.graftIntro", lang) + " " + proto.grafts);
    addP(proto.recovery);
    addP(insightFor(proto.techniqueKey, answers.goal, lang));
    addP(t("report.severityContext." + answers.severity, lang));
    var note = document.createElement("p");
    note.className = "report-note";
    note.textContent = t("report.footerNote", lang);
    container.appendChild(note);
  }

  return {
    t: t,
    buildProtocol: buildProtocol,
    buildFullReportPlain: buildFullReportPlain,
    renderReportCard: renderReportCard,
  };
})();

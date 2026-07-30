/**
 * Aura Clinic — landing page lead / appointment forms (.landing-lead-form).
 * Submits via AURA_FORMS; fires conversion only after API success.
 */
(function () {
  "use strict";

  var MSG = {
    en: {
      success:
        "Thank you. Your request was sent. Our team will contact you shortly.",
      error:
        "Something went wrong. Please try again or contact us on WhatsApp.",
      validation:
        "Please check the required fields (name, phone, and privacy consent).",
      sending: "Sending…",
    },
    tr: {
      success:
        "Teşekkürler. Talebiniz alındı. Ekibimiz kısa süre içinde sizinle iletişime geçecek.",
      error:
        "Bir sorun oluştu. Lütfen tekrar deneyin veya WhatsApp üzerinden yazın.",
      validation:
        "Lütfen zorunlu alanları kontrol edin (ad, telefon ve gizlilik onayı).",
      sending: "Gönderiliyor…",
    },
    ka: {
      success:
        "მადლობა. თქვენი მოთხოვნა გაიგზავნა. ჩვენი გუნდი მალე დაგიკავშირდებათ.",
      error:
        "რაღაც შეცდომა მოხდა. გთხოვთ თავიდან სცადოთ ან დაგვიკავშირდეთ WhatsApp-ზე.",
      validation:
        "გთხოვთ შეამოწმოთ სავალდებულო ველები (სახელი, ტელეფონი და კონფიდენციალობის თანხმობა).",
      sending: "იგზავნება…",
    },
    ru: {
      success:
        "Спасибо. Ваша заявка отправлена. Наша команда свяжется с вами в ближайшее время.",
      error:
        "Что-то пошло не так. Попробуйте ещё раз или напишите нам в WhatsApp.",
      validation:
        "Проверьте обязательные поля (имя, телефон и согласие на обработку данных).",
      sending: "Отправка…",
    },
  };

  function pageLang() {
    return (document.body && document.body.getAttribute("data-lang")) || "en";
  }

  function t(key) {
    var lang = pageLang();
    var pack = MSG[lang] || MSG.en;
    return pack[key] || MSG.en[key] || key;
  }

  function setFormStarted(form) {
    var input = form.querySelector('[name="form_started_at"]');
    if (input && !input.value) {
      input.value = new Date().toISOString();
    }
  }

  function collectFields(form) {
    var fd = new FormData(form);
    var consent = form.querySelector('[name="consent"]');
    var marketing = form.querySelector('[name="marketing_consent"]');
    return {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      lang: String(fd.get("lang") || fd.get("language") || pageLang()).toLowerCase(),
      language: String(fd.get("lang") || fd.get("language") || pageLang()).toLowerCase(),
      service: String(fd.get("service") || document.body.getAttribute("data-service") || "hair_transplant"),
      age_range: String(fd.get("age_range") || "").trim(),
      timeline: String(fd.get("timeline") || "").trim(),
      country: String(fd.get("country") || "").trim(),
      interest: String(fd.get("interest") || "").trim(),
      preferred_time: String(fd.get("preferred_time") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      consent: !!(consent && consent.checked),
      marketing_consent: !!(marketing && marketing.checked),
      form_started_at: String(fd.get("form_started_at") || ""),
      honeypot: String(fd.get("website") || fd.get("honeypot") || ""),
    };
  }

  function showEl(el, text) {
    if (!el) return;
    el.hidden = false;
    el.textContent = text;
  }

  function hideEl(el) {
    if (!el) return;
    el.hidden = true;
    el.textContent = "";
  }

  function initForm(form) {
    setFormStarted(form);
    var submitBtn = form.querySelector('[type="submit"]');
    var successEl =
      form.parentElement.querySelector(".landing-form-success") ||
      form.querySelector(".landing-form-success");
    var errorEl =
      form.parentElement.querySelector(".landing-form-error") ||
      form.querySelector(".landing-form-error");
    var defaultLabel = submitBtn ? submitBtn.textContent : "";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hideEl(successEl);
      hideEl(errorEl);

      if (!window.AURA_FORMS) {
        showEl(errorEl, t("error"));
        return;
      }

      var fields = collectFields(form);
      var check = window.AURA_FORMS.validateLead(fields, {
        requirePhone: true,
        requireConsent: true,
      });

      if (!check.ok) {
        showEl(errorEl, t("validation"));
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = t("sending");
      }

      var leadEventId =
        window.AURA_META && window.AURA_META.makeEventId
          ? window.AURA_META.makeEventId("lead")
          : "";

      var payload = window.AURA_FORMS.buildPayload(
        Object.assign({}, fields, check.normalized),
        { leadEventId: leadEventId }
      );

      window.AURA_FORMS.submitLead(payload)
        .then(function (res) {
          if (!res.ok) {
            showEl(errorEl, t("error"));
            return;
          }
          form.hidden = true;
          showEl(successEl, t("success"));
          // Duplicate retries must not fire a second conversion
          if (res.data && res.data.duplicate) return;
          if (window.AURA_ANALYTICS && window.AURA_ANALYTICS.trackLeadConversion) {
            window.AURA_ANALYTICS.trackLeadConversion({
              pageType: document.body.getAttribute("data-page-type") || "landing",
              service: fields.service,
              language: fields.lang,
              formName: form.getAttribute("data-form-name") || "landing_lead",
              contentName: form.getAttribute("data-form-name") || "Landing Lead",
              leadEventId: leadEventId,
            });
          }
        })
        .catch(function () {
          showEl(errorEl, t("error"));
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = defaultLabel;
          }
        });
    });
  }

  function init() {
    document.querySelectorAll(".landing-lead-form").forEach(initForm);

    var lang = pageLang();
    if (window.AURA_ATTRIBUTION && window.AURA_ATTRIBUTION.capture) {
      window.AURA_ATTRIBUTION.capture({ language: lang });
    }
    if (window.AURA_ANALYTICS && window.AURA_ANALYTICS.init) {
      var pageType = document.body.getAttribute("data-page-type") || "";
      var service = document.body.getAttribute("data-service") || "";
      var viewEvent =
        service === "botox_filler"
          ? "view_botox_filler_page"
          : "view_hair_transplant_page";
      window.AURA_ANALYTICS.init({
        pageViewEvent: viewEvent,
        pageType: pageType,
        service: service,
        language: lang,
      });
    }
    if (window.AURA_CHROME && window.AURA_CHROME.init) {
      window.AURA_CHROME.init({
        initialLang: lang,
        metaPageName: document.title || "Aura Clinic",
      });
    } else if (window.AURA_WHATSAPP && window.AURA_WHATSAPP.bindAll) {
      window.AURA_WHATSAPP.bindAll(lang);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

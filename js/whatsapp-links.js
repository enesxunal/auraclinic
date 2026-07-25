/**
 * Aura Clinic — centralized WhatsApp deep links.
 * Campaign/click IDs are NEVER added to the user-visible message.
 */
window.AURA_WHATSAPP = (function () {
  "use strict";

  var MESSAGES = {
    en: {
      general:
        "Hello Aura Clinic, I would like to get information about your services. I found you on auraclinicge.com.",
      consultation:
        "Hello Aura Clinic, I would like to book a free consultation. I found you on auraclinicge.com.",
      consultationWithProtocol:
        "Hello Aura Clinic, I completed the online hair analysis and would like to book a free consultation. My protocol ID: {protocolId}",
      hair_transplant:
        "Hello, I am contacting you from the Aura Clinic hair transplant page. I would like to send my photos and request a preliminary assessment.",
      botox_filler:
        "Hello, I am contacting you from the Aura Clinic botox & fillers page. I would like information about suitable treatments and appointments.",
      preview_result:
        "Hello Aura Clinic, I generated an AI hair preview on your website and would like to discuss it with your team.",
      hydrafacial:
        "Hello Aura Clinic, I am interested in HydraFacial and would like more information.",
      g5: "Hello Aura Clinic, I am interested in G5 massage / body contouring and would like more information.",
      blog:
        "Hello, I read your article about {articleTitle} and would like to request a consultation.",
    },
    ka: {
      general:
        "გამარჯობა Aura Clinic, მინდა ინფორმაცია თქვენი სერვისების შესახებ. ვნახე auraclinicge.com-ზე.",
      consultation:
        "გამარჯობა Aura Clinic, მინდა უფასო კონსულტაციის დაჯავშნა. ვნახე auraclinicge.com-ზე.",
      consultationWithProtocol:
        "გამარჯობა Aura Clinic, გავიარე ონლაინ თმის ანალიზი და მინდა უფასო კონსულტაცია. პროტოკოლის ID: {protocolId}",
      hair_transplant:
        "გამარჯობა, Aura Clinic-ის თმის ტრანსპლანტაციის გვერდიდან გწერთ. მინდა ფოტოების გაგზავნა და წინასწარი შეფასება.",
      botox_filler:
        "გამარჯობა, Aura Clinic-ის ბოტოქსისა და ფილერის გვერდიდან გწერთ. მინდა ინფორმაცია პროცედურებსა და ჩაწერაზე.",
      preview_result:
        "გამარჯობა Aura Clinic, საიტზე AI თმის პრევიუ შევქმენი და გუნდთან განხილვა მინდა.",
      hydrafacial: "გამარჯობა Aura Clinic, დაინტერესებული ვარ HydraFacial-ით.",
      g5: "გამარჯობა Aura Clinic, დაინტერესებული ვარ G5 მასაჟით / კონტურირებით.",
      blog:
        "გამარჯობა, წავიკითხე სტატია „{articleTitle}“ და მინდა კონსულტაცია.",
    },
    tr: {
      general:
        "Merhaba Aura Clinic, hizmetleriniz hakkında bilgi almak istiyorum. Sitenizi auraclinicge.com üzerinden buldum.",
      consultation:
        "Merhaba Aura Clinic, ücretsiz konsültasyon randevusu almak istiyorum. Sitenizi auraclinicge.com üzerinden buldum.",
      consultationWithProtocol:
        "Merhaba Aura Clinic, online saç analizini tamamladım ve ücretsiz konsültasyon istiyorum. Protokol ID: {protocolId}",
      hair_transplant:
        "Merhaba, Aura Clinic web sitesindeki saç ekimi sayfasından ulaşıyorum. Fotoğraflarımı göndererek ücretsiz ön değerlendirme almak istiyorum.",
      botox_filler:
        "Merhaba, Aura Clinic dolgu ve botoks sayfasından ulaşıyorum. Uygun uygulama ve randevu seçenekleri hakkında bilgi almak istiyorum.",
      preview_result:
        "Merhaba Aura Clinic, sitede AI saç önizlemesi oluşturdum ve ekibinizle görüşmek istiyorum.",
      hydrafacial: "Merhaba Aura Clinic, HydraFacial hakkında bilgi almak istiyorum.",
      g5: "Merhaba Aura Clinic, G5 masaj / bölgesel incelme hakkında bilgi almak istiyorum.",
      blog:
        "Merhaba, “{articleTitle}” yazınızı okudum ve konsültasyon talep etmek istiyorum.",
    },
    ru: {
      general:
        "Здравствуйте, Aura Clinic! Хочу получить информацию о ваших услугах. Нашёл вас на auraclinicge.com.",
      consultation:
        "Здравствуйте, Aura Clinic! Хочу записаться на бесплатную консультацию. Нашёл вас на auraclinicge.com.",
      consultationWithProtocol:
        "Здравствуйте, Aura Clinic! Я прошёл онлайн-анализ волос и хочу бесплатную консультацию. ID протокола: {protocolId}",
      hair_transplant:
        "Здравствуйте. Я перешёл с сайта Aura Clinic. Хочу отправить фотографии и получить предварительную консультацию по пересадке волос.",
      botox_filler:
        "Здравствуйте. Я перешёл со страницы ботокса и филлеров Aura Clinic. Хочу получить информацию о процедурах и записи.",
      preview_result:
        "Здравствуйте, Aura Clinic! Я создал AI-превью волос на сайте и хотел бы обсудить его с вашей командой.",
      hydrafacial: "Здравствуйте, Aura Clinic! Интересуюсь процедурой HydraFacial.",
      g5: "Здравствуйте, Aura Clinic! Интересуюсь G5-массажем / коррекцией фигуры.",
      blog:
        "Здравствуйте! Я прочитал вашу статью «{articleTitle}» и хотел бы записаться на консультацию.",
    },
  };

  function phone() {
    var cfg = window.AURA_CLINIC_SITE || {};
    return String(cfg.whatsappE164 || "995557168876").replace(/^\+/, "").replace(/\s/g, "");
  }

  function pack(lang) {
    return MESSAGES[lang] || MESSAGES.en;
  }

  function fill(text, vars) {
    return String(text || "").replace(/\{(\w+)\}/g, function (_, k) {
      return vars && vars[k] !== undefined ? vars[k] : "";
    });
  }

  function message(lang, key, vars) {
    var p = pack(lang);
    var text = p[key] || MESSAGES.en[key] || p.general;
    return fill(text, vars || {});
  }

  function buildUrl(text) {
    return "https://wa.me/" + phone() + "?text=" + encodeURIComponent(text);
  }

  function urlFor(options) {
    options = options || {};
    var lang = options.lang || "en";
    var key = options.key || "general";
    if (options.protocolId && key === "consultation") key = "consultationWithProtocol";
    if (options.service && !options.key) {
      key = options.service;
      if (!pack(lang)[key] && !MESSAGES.en[key]) key = "general";
    }
    return buildUrl(
      message(lang, key, {
        protocolId: options.protocolId || "",
        articleTitle: options.articleTitle || "",
      })
    );
  }

  function consultationUrl(lang, options) {
    options = options || {};
    return urlFor({
      lang: lang,
      key: options.protocolId ? "consultationWithProtocol" : "consultation",
      protocolId: options.protocolId || "",
    });
  }

  function generalUrl(lang) {
    return urlFor({ lang: lang, key: "general" });
  }

  function bindAll(lang) {
    document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
      var key = el.getAttribute("data-whatsapp") || "general";
      var service = el.getAttribute("data-service") || "";
      var proto = el.getAttribute("data-protocol-id") || "";
      var article = el.getAttribute("data-article-title") || "";
      el.href = urlFor({
        lang: lang,
        key: key !== "general" ? key : service || "general",
        protocolId: proto,
        articleTitle: article,
        service: service,
      });
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });

    document.querySelectorAll("[data-whatsapp-consult]").forEach(function (el) {
      var proto = el.getAttribute("data-protocol-id") || "";
      el.href = consultationUrl(lang, { protocolId: proto });
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });

    var fab = document.getElementById("fab-whatsapp");
    if (fab) {
      var fabKey = fab.getAttribute("data-whatsapp") || document.body.getAttribute("data-service") || "general";
      fab.href = urlFor({
        lang: lang,
        key: fabKey,
        service: document.body.getAttribute("data-service") || "",
      });
      fab.target = "_blank";
      fab.rel = "noopener noreferrer";
    }
  }

  function bindConsultationLinks(lang) {
    bindAll(lang);
  }

  return {
    consultationUrl: consultationUrl,
    generalUrl: generalUrl,
    urlFor: urlFor,
    message: message,
    bindConsultationLinks: bindConsultationLinks,
    bindAll: bindAll,
  };
})();

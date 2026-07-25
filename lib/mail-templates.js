/**
 * Aura Clinic — branded HTML email templates.
 */
var SITE_URL = "https://auraclinicge.com";
var WHATSAPP_PHONE = "995557168876";

var WHATSAPP_MSG = {
  en: "Hello Aura Clinic, I would like to book a free consultation. I found you on auraclinicge.com.",
  ka: "გამარჯობა Aura Clinic, მინდა უფასო კონსულტაციის დაჯავშნა. ვნახე auraclinicge.com-ზე.",
  tr: "Merhaba Aura Clinic, ücretsiz konsültasyon randevusu almak istiyorum. Sitenizi auraclinicge.com üzerinden buldum.",
  ru: "Здравствуйте, Aura Clinic! Хочу записаться на бесплатную консультацию. Нашёл вас на auraclinicge.com.",
};

function whatsappConsultUrl(lang) {
  var text = WHATSAPP_MSG[lang] || WHATSAPP_MSG.en;
  return "https://wa.me/" + WHATSAPP_PHONE + "?text=" + encodeURIComponent(text);
}

var COPY = {
  en: {
    customerSubject: "Your Aura Clinic enquiry",
    customerTitle: "Thank you, {name}",
    customerLead:
      "We received your request. Below is a short summary. If you completed the hair analysis, your full report is also on the website.",
    protocolId: "Protocol ID",
    grafts: "Estimated grafts",
    recovery: "Recovery window",
    recommendation: "Your recommendation",
    ctaReport: "Try AI hair preview",
    ctaConsult: "Book consultation",
    ctaWhatsapp: "WhatsApp us",
    disclaimer:
      "This analysis is illustrative only and does not replace an in-person medical examination at Aura Clinic, Batumi.",
    footer: "Aura Clinic · 129 Petre Bagrationi Str, Batumi 6010 · Georgia",
    clinicSubject: "New lead — {service} — {id}",
    clinicTitle: "New website enquiry",
    clinicContact: "Contact details",
    clinicAnalysis: "Analysis answers",
    clinicAttribution: "Ads & source details",
    name: "Name",
    email: "Email",
    phone: "Phone",
    language: "Language",
    service: "Service",
    leadId: "Lead ID",
    landingPage: "Landing page",
    firstLanding: "First landing page",
    source: "Source",
    medium: "Medium",
    campaign: "Campaign",
    content: "Ad content",
    term: "Keyword",
    gclid: "Google click ID",
    fbclid: "Meta click ID",
    referrer: "Referrer",
    createdAt: "Created at",
  },
  ka: {
    customerSubject: "თქვენი Aura Clinic მოთხოვნა",
    customerTitle: "გმადლობთ, {name}",
    customerLead:
      "მივიღეთ თქვენი მოთხოვნა. ქვემოთაა მოკლე შეჯამება. თუ ანალიზი გაიარეთ, სრული რეპორტი საიტზეც ჩანს.",
    protocolId: "პროტოკოლის ID",
    grafts: "სავარაუდო გრაფტები",
    recovery: "აღდგენის პერიოდი",
    recommendation: "რეკომენდაცია",
    ctaReport: "AI პრევიუ",
    ctaConsult: "კონსულტაცია",
    ctaWhatsapp: "WhatsApp",
    disclaimer:
      "ეს ანალიზი მხოლოდ ინფორმაციულია და არ ცვლის პირისპირი მედიცინური შეფასების აუცილებლობას Aura Clinic-ში, ბათუმში.",
    footer: "Aura Clinic · 129 Petre Bagrationi Str, Batumi 6010 · საქართველო",
    clinicSubject: "ახალი მოთხოვნა — {service} — {id}",
    clinicTitle: "ახალი მოთხოვნა საიტიდან",
    clinicContact: "საკონტაქტო",
    clinicAnalysis: "ანალიზის პასუხები",
    clinicAttribution: "რეკლამა და წყარო",
    name: "სახელი",
    email: "ელფოსტა",
    phone: "ტელეფონი",
    language: "ენა",
    service: "სერვისი",
    leadId: "Lead ID",
    landingPage: "გვერდი",
    firstLanding: "პირველი გვერდი",
    source: "წყარო",
    medium: "მედიუმი",
    campaign: "კამპანია",
    content: "კონტენტი",
    term: "საკვანძო სიტყვა",
    gclid: "Google click ID",
    fbclid: "Meta click ID",
    referrer: "Referrer",
    createdAt: "დრო",
  },
  tr: {
    customerSubject: "Aura Clinic başvurunuz",
    customerTitle: "Teşekkürler, {name}",
    customerLead:
      "Talebinizi aldık. Aşağıda kısa bir özet var. Saç analizini tamamladıysanız tam rapor sitede de görünür.",
    protocolId: "Protokol ID",
    grafts: "Tahmini greft",
    recovery: "İyileşme süresi",
    recommendation: "Öneriniz",
    ctaReport: "AI ön görünüm",
    ctaConsult: "Konsültasyon",
    ctaWhatsapp: "WhatsApp",
    disclaimer:
      "Bu analiz yalnızca bilgilendirme amaçlıdır; Batumi Aura Clinic'te yüz yüze muayenenin yerini tutmaz.",
    footer: "Aura Clinic · 129 Petre Bagrationi Str, Batumi 6010 · Gürcistan",
    clinicSubject: "Yeni başvuru — {service} — {id}",
    clinicTitle: "Siteden yeni başvuru",
    clinicContact: "İletişim",
    clinicAnalysis: "Analiz yanıtları",
    clinicAttribution: "Reklam ve kaynak bilgileri",
    name: "Ad",
    email: "E-posta",
    phone: "Telefon",
    language: "Dil",
    service: "Hizmet",
    leadId: "Lead ID",
    landingPage: "Landing page",
    firstLanding: "İlk landing page",
    source: "Kaynak",
    medium: "Medium",
    campaign: "Kampanya",
    content: "Reklam içeriği",
    term: "Anahtar kelime",
    gclid: "Google click ID",
    fbclid: "Meta click ID",
    referrer: "Referrer",
    createdAt: "Oluşturulma",
  },
  ru: {
    customerSubject: "Ваш запрос в Aura Clinic",
    customerTitle: "Спасибо, {name}",
    customerLead:
      "Мы получили ваш запрос. Ниже краткое резюме. Если вы прошли анализ волос, полный отчёт также доступен на сайте.",
    protocolId: "ID протокола",
    grafts: "Ориентировочные графты",
    recovery: "Период восстановления",
    recommendation: "Рекомендация",
    ctaReport: "AI-превью",
    ctaConsult: "Консультация",
    ctaWhatsapp: "WhatsApp",
    disclaimer:
      "Этот анализ носит ознакомительный характер и не заменяет очный медицинский осмотр в Aura Clinic, Батуми.",
    footer: "Aura Clinic · 129 Petre Bagrationi Str, Batumi 6010 · Грузия",
    clinicSubject: "Новая заявка — {service} — {id}",
    clinicTitle: "Новая заявка с сайта",
    clinicContact: "Контакты",
    clinicAnalysis: "Ответы анализа",
    clinicAttribution: "Реклама и источник",
    name: "Имя",
    email: "Email",
    phone: "Телефон",
    language: "Язык",
    service: "Услуга",
    leadId: "Lead ID",
    landingPage: "Landing page",
    firstLanding: "Первая страница",
    source: "Источник",
    medium: "Medium",
    campaign: "Кампания",
    content: "Контент объявления",
    term: "Ключевое слово",
    gclid: "Google click ID",
    fbclid: "Meta click ID",
    referrer: "Referrer",
    createdAt: "Создано",
  },
};

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function t(lang, key) {
  var pack = COPY[lang] || COPY.en;
  return pack[key] || COPY.en[key] || key;
}

function fill(str, vars) {
  return String(str).replace(/\{(\w+)\}/g, function (_, k) {
    return vars[k] !== undefined ? vars[k] : "";
  });
}

function parseAnswers(data) {
  var answers = data.answers;
  if (!answers || typeof answers !== "object") {
    try {
      answers = JSON.parse(data.answers_json || "{}");
    } catch (e) {
      answers = {};
    }
  }
  return answers;
}

function emailShell(kind, bodyHtml) {
  return (
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
    '<body style="margin:0;padding:0;background:#0e1012;font-family:Montserrat,Segoe UI,Helvetica,Arial,sans-serif;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0e1012;">' +
    '<tr><td align="center" style="padding:32px 16px;">' +
    '<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#1e2228;border:1px solid #343b44;border-radius:14px;overflow:hidden;">' +
    '<tr><td style="height:4px;background:linear-gradient(90deg,#8a919c,#d4dae3,#8a919c);"></td></tr>' +
    '<tr><td style="padding:28px 32px 8px;text-align:center;">' +
    '<p style="margin:0;font-size:13px;font-weight:700;letter-spacing:0.22em;color:#d4dae3;">AURA CLINIC</p>' +
    '<p style="margin:6px 0 0;font-size:11px;letter-spacing:0.12em;color:#9aa3ae;">BATUMI · GEORGIA</p>' +
    "</td></tr>" +
    bodyHtml +
    '<tr><td style="padding:20px 32px 28px;border-top:1px solid #343b44;text-align:center;">' +
    '<p style="margin:0;font-size:11px;color:#6d7680;">' +
    '<a href="' +
    SITE_URL +
    '" style="color:#b8bec8;text-decoration:none;">auraclinicge.com</a>' +
    " · " +
    '<a href="mailto:info@auraclinicge.com" style="color:#b8bec8;text-decoration:none;">info@auraclinicge.com</a>' +
    "</p></td></tr></table></td></tr></table></body></html>"
  );
}

function infoRow(label, value) {
  if (value === undefined || value === null || value === "") value = "—";
  return (
    '<tr><td style="padding:10px 0;border-bottom:1px solid #343b44;color:#9aa3ae;font-size:12px;width:38%;vertical-align:top;">' +
    esc(label) +
    '</td><td style="padding:10px 0;border-bottom:1px solid #343b44;color:#eceff4;font-size:13px;vertical-align:top;word-break:break-word;">' +
    esc(value) +
    "</td></tr>"
  );
}

function btn(href, label, primary) {
  var bg = primary ? "#d4dae3" : "transparent";
  var color = primary ? "#0e1012" : "#d4dae3";
  var border = primary ? "none" : "1px solid #5c636d";
  return (
    '<a href="' +
    esc(href) +
    '" style="display:inline-block;margin:6px 4px;padding:12px 20px;background:' +
    bg +
    ";color:" +
    color +
    ";border-radius:8px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-decoration:none;border:" +
    border +
    ';">' +
    esc(label) +
    "</a>"
  );
}

function sectionTitle(text) {
  return (
    '<p style="margin:20px 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;color:#b8bec8;text-transform:uppercase;">' +
    esc(text) +
    "</p>"
  );
}

function buildClinicLeadEmail(data) {
  var lang = data.lang || "en";
  if (!COPY[lang]) lang = "en";
  var answers = parseAnswers(data);
  var rows = "";
  Object.keys(answers).forEach(function (key) {
    rows += infoRow(key, answers[key]);
  });

  var id = data.lead_id || data.protocol_id || "new";
  var body =
    '<tr><td style="padding:8px 32px 24px;">' +
    '<h1 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#eceff4;">' +
    esc(t(lang, "clinicTitle")) +
    "</h1>" +
    sectionTitle(t(lang, "clinicContact")) +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">' +
    infoRow(t(lang, "name"), data.name) +
    infoRow(t(lang, "email"), data.email) +
    infoRow(t(lang, "phone"), data.phone || "—") +
    infoRow(t(lang, "language"), String(lang).toUpperCase()) +
    infoRow(t(lang, "service"), data.service || "—") +
    infoRow(t(lang, "leadId"), data.lead_id || "—") +
    infoRow(t(lang, "protocolId"), data.protocol_id || "—") +
    infoRow(t(lang, "grafts"), data.graft_range || "—") +
    infoRow(t(lang, "recovery"), data.recovery || "—") +
    "</table>";

  body +=
    sectionTitle(t(lang, "clinicAttribution")) +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">' +
    infoRow(t(lang, "landingPage"), data.landing_page) +
    infoRow(t(lang, "firstLanding"), data.first_landing_page) +
    infoRow(t(lang, "source"), data.utm_source) +
    infoRow(t(lang, "medium"), data.utm_medium) +
    infoRow(t(lang, "campaign"), data.utm_campaign) +
    infoRow(t(lang, "content"), data.utm_content) +
    infoRow(t(lang, "term"), data.utm_term) +
    infoRow(t(lang, "gclid"), data.gclid || data.gbraid || data.wbraid) +
    infoRow(t(lang, "fbclid"), data.fbclid) +
    infoRow(t(lang, "referrer"), data.referrer || data.first_referrer) +
    infoRow(t(lang, "createdAt"), data.created_at) +
    "</table>";

  if (rows) {
    body +=
      sectionTitle(t(lang, "clinicAnalysis")) +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">' +
      rows +
      "</table>";
  }

  if (data.message) {
    body +=
      sectionTitle("Message") +
      '<div style="padding:16px;background:#16191d;border:1px solid #343b44;border-radius:10px;color:#c8cdd4;font-size:12px;line-height:1.6;white-space:pre-wrap;">' +
      esc(data.message) +
      "</div>";
  }

  if (data.recommendation) {
    body +=
      sectionTitle(t(lang, "recommendation")) +
      '<div style="padding:16px;background:#16191d;border:1px solid #343b44;border-radius:10px;color:#c8cdd4;font-size:12px;line-height:1.6;white-space:pre-wrap;">' +
      esc(data.recommendation) +
      "</div>";
  }

  body += "</td></tr>";

  return {
    subject: fill(t(lang, "clinicSubject"), {
      id: id,
      service: data.service || "lead",
    }),
    html: emailShell("clinic", body),
  };
}

function buildCustomerConfirmationEmail(data) {
  var lang = data.lang || "en";
  if (!COPY[lang]) lang = "en";

  var body =
    '<tr><td style="padding:8px 32px 28px;">' +
    '<h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#eceff4;">' +
    esc(fill(t(lang, "customerTitle"), { name: data.name })) +
    "</h1>" +
    '<p style="margin:0 0 24px;font-size:14px;line-height:1.65;color:#9aa3ae;">' +
    esc(t(lang, "customerLead")) +
    "</p>";

  if (data.protocol_id || data.graft_range) {
    body +=
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#16191d;border:1px solid #343b44;border-radius:10px;">' +
      '<tr><td style="padding:16px 18px;">' +
      '<p style="margin:0 0 4px;font-size:11px;letter-spacing:0.1em;color:#8a919c;text-transform:uppercase;">' +
      esc(t(lang, "protocolId")) +
      '</p><p style="margin:0 0 14px;font-size:16px;font-weight:700;color:#d4dae3;">' +
      esc(data.protocol_id || "—") +
      "</p>" +
      '<p style="margin:0 0 4px;font-size:11px;color:#8a919c;">' +
      esc(t(lang, "grafts")) +
      '</p><p style="margin:0 0 14px;font-size:14px;color:#eceff4;">' +
      esc(data.graft_range || "—") +
      "</p>" +
      '<p style="margin:0 0 4px;font-size:11px;color:#8a919c;">' +
      esc(t(lang, "recovery")) +
      '</p><p style="margin:0;font-size:14px;color:#eceff4;">' +
      esc(data.recovery || "—") +
      "</p></td></tr></table>";
  }

  if (data.recommendation) {
    body +=
      '<p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;color:#b8bec8;text-transform:uppercase;">' +
      esc(t(lang, "recommendation")) +
      '</p><div style="padding:16px;background:#16191d;border:1px solid #343b44;border-radius:10px;color:#c8cdd4;font-size:12px;line-height:1.6;white-space:pre-wrap;margin-bottom:24px;">' +
      esc(data.recommendation) +
      "</div>";
  }

  body +=
    '<p style="margin:0 0 12px;text-align:center;">' +
    btn(SITE_URL + "/preview.html", t(lang, "ctaReport"), true) +
    btn(whatsappConsultUrl(lang), t(lang, "ctaConsult"), false) +
    btn(whatsappConsultUrl(lang), t(lang, "ctaWhatsapp"), false) +
    "</p>" +
    '<p style="margin:16px 0 0;font-size:11px;line-height:1.55;color:#6d7680;text-align:center;">' +
    esc(t(lang, "disclaimer")) +
    "</p>" +
    '<p style="margin:12px 0 0;font-size:11px;color:#6d7680;text-align:center;">' +
    esc(t(lang, "footer")) +
    "</p></td></tr>";

  return {
    subject: t(lang, "customerSubject") + (data.protocol_id ? " · " + data.protocol_id : ""),
    html: emailShell("customer", body),
  };
}

module.exports = {
  buildClinicLeadEmail: buildClinicLeadEmail,
  buildCustomerConfirmationEmail: buildCustomerConfirmationEmail,
};

#!/usr/bin/env node
/**
 * Generates 8 static multilingual ad landing pages for Aura Clinic.
 * Run: node scripts/generate-landing-pages.js
 */
"use strict";

var fs = require("fs");
var path = require("path");
var root = path.join(__dirname, "..");

var HAIR = {
  en: {
    file: "en/hair-transplant-batumi.html",
    lang: "en",
    locale: "en_US",
    title: "Hair Transplant in Batumi | FUE & DHI | Aura Clinic",
    description:
      "Natural-looking FUE and DHI hair transplant in Batumi. Send your photos for a free preliminary assessment at Aura Clinic.",
    ogLocaleAlt: ["tr_TR", "ka_GE", "ru_RU"],
    eyebrow: "Aura Clinic · Batumi",
    h1: "Natural-Looking FUE & DHI Hair Transplant in Batumi",
    lead: "Send your photos for a preliminary review of your hair pattern and estimated graft need.",
    cta1: "Free hair analysis",
    cta2: "Send photos on WhatsApp",
    sticky1: "Free analysis",
    sticky2: "WhatsApp",
    trust: [
      "Clinic in Batumi, Georgia",
      "FUE and DHI techniques",
      "Multilingual communication",
      "Free preliminary photo assessment",
    ],
    navHome: "Home",
    navAnalysis: "Analysis",
    navContact: "Contact",
    navBlog: "Blog",
    sectionFueTitle: "FUE and DHI — what they mean",
    fueTitle: "FUE",
    fueText:
      "Follicular Unit Extraction (FUE) involves harvesting individual follicular units from the donor area and placing them into carefully prepared recipient sites. It is widely used for natural hairline design and density planning.",
    dhiTitle: "DHI",
    dhiText:
      "Direct Hair Implantation (DHI) uses specialised implantation tools that can place grafts with controlled angle and depth. Suitability depends on your hair pattern, donor capacity, and clinical assessment.",
    whoTitle: "Who can request a preliminary assessment",
    whoIntro:
      "A photo-based preliminary assessment helps the clinic understand your pattern of hair loss and discuss next steps. It does not replace an in-person medical examination.",
    whoItems: [
      "Receding hairline or thinning at the temples",
      "Crown (vertex) thinning",
      "Diffuse thinning where donor hair may still be available",
      "Patients considering FUE or DHI and wanting clear guidance first",
    ],
    processTitle: "Your journey — step by step",
    process: [
      {
        t: "Consultation",
        d: "Share photos and goals. The clinic reviews your case and answers initial questions.",
      },
      {
        t: "Planning",
        d: "Hairline design, graft estimation, and technique discussion are refined based on your profile.",
      },
      {
        t: "Procedure day overview",
        d: "On the day of treatment, the team follows a structured protocol from preparation through implantation.",
      },
      {
        t: "Recovery overview",
        d: "Early healing typically includes redness and scabbing that settle over the following days and weeks.",
      },
      {
        t: "Aftercare support",
        d: "You receive aftercare guidance and can stay in contact with the clinic during recovery.",
      },
    ],
    intlTitle: "International patients in Batumi",
    intlText:
      "Batumi is reachable by air and road for many international patients. Travel plans, stay length, and visit timing are discussed individually after your preliminary assessment.",
    intlNote:
      "Hotel and transfer arrangements are confirmed with the clinic when relevant — details are shared after case review.",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "Is a photo assessment the same as a medical diagnosis?",
        a: "No. Photos help with preliminary planning. A final plan is confirmed after clinical evaluation.",
      },
      {
        q: "What is the difference between FUE and DHI?",
        a: "Both transplant follicular units. They differ mainly in how grafts are placed. The suitable approach depends on your case.",
      },
      {
        q: "How many grafts will I need?",
        a: "Graft need varies by hair loss pattern, donor density, and goals. An estimate is discussed after reviewing your photos.",
      },
      {
        q: "How long does recovery take?",
        a: "Visible early healing often progresses over days to weeks. Full aesthetic results develop gradually over months.",
      },
      {
        q: "Do you communicate in English?",
        a: "Yes. Aura Clinic communicates with patients in English, Georgian, Turkish, and Russian.",
      },
    ],
    formTitle: "Request a free preliminary assessment",
    formSub: "Name and phone are required. We use your details only to process this request.",
    labelName: "Full name",
    labelPhone: "Phone / WhatsApp",
    labelEmail: "Email (optional)",
    labelAge: "Age range",
    labelTimeline: "Preferred timeline",
    labelCountry: "Country",
    labelLang: "Preferred language",
    ageOptions: ["Prefer not to say", "18–24", "25–34", "35–44", "45–54", "55+"],
    timelineOptions: [
      "Just researching",
      "Within 1 month",
      "1–3 months",
      "3–6 months",
      "Flexible",
    ],
    consent:
      "I agree to the processing of my personal data to handle this enquiry. See our privacy policy.",
    marketing: "I agree to receive occasional clinic updates (optional).",
    privacyLink: "Privacy policy",
    submit: "Send request",
    contactTitle: "Contact",
    address: "129 Petre Bagrationi Str, Batumi 6010, Georgia",
    map: "View on Google Maps",
    hoursLabel: "Opening hours:",
    hours: "Mon–Sun 10:00–19:00",
    waContact: "Message on WhatsApp",
    cookie1: "We use essential features and — with your consent — optional analytics. See our ",
    cookieLink: "cookie policy",
    cookie2: ".",
    cookieOk: "OK",
    footerTag: "Premium aesthetics & hair restoration — Batumi.",
    footerNav: "Navigation",
    footerLegal: "Legal",
    legal: "Legal notice",
    privacy: "Privacy policy",
    terms: "Terms of service",
    cookies: "Cookies",
    rights: "© Aura Clinic. All rights reserved.",
    serviceName: "Hair transplant (FUE / DHI)",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Hair transplant Batumi",
  },
  tr: {
    file: "tr/batum-sac-ekimi.html",
    lang: "tr",
    locale: "tr_TR",
    title: "Batum’da Saç Ekimi | FUE & DHI | Aura Clinic",
    description:
      "Batum’da doğal görünümlü FUE ve DHI saç ekimi. Fotoğraflarınızı gönderin, Aura Clinic’ten ücretsiz ön değerlendirme alın.",
    ogLocaleAlt: ["en_US", "ka_GE", "ru_RU"],
    eyebrow: "Aura Clinic · Batum",
    h1: "Batum’da Doğal Görünümlü FUE ve DHI Saç Ekimi",
    lead: "Fotoğraflarınızı gönderin, uzman ekibimiz saç yapınızı ve tahmini greft ihtiyacınızı ön değerlendirmeye alsın.",
    cta1: "Ücretsiz saç analizi al",
    cta2: "WhatsApp’tan fotoğraf gönder",
    sticky1: "Ücretsiz analiz",
    sticky2: "WhatsApp",
    trust: [
      "Batumi, Gürcistan’da klinik",
      "FUE ve DHI teknikleri",
      "Çok dilli iletişim",
      "Ücretsiz ön fotoğraf değerlendirmesi",
    ],
    navHome: "Ana sayfa",
    navAnalysis: "Analiz",
    navContact: "İletişim",
    navBlog: "Blog",
    sectionFueTitle: "FUE ve DHI — ne anlama gelir?",
    fueTitle: "FUE",
    fueText:
      "FUE (Follicular Unit Extraction), donör bölgeden tek tek greftlerin alınması ve alıcı bölgeye yerleştirilmesidir. Doğal saç çizgisi ve yoğunluk planlamasında yaygın kullanılır.",
    dhiTitle: "DHI",
    dhiText:
      "DHI (Direct Hair Implantation), greftlerin açı ve derinlik kontrolüyle yerleştirilmesine yardımcı olan özel implantasyon araçları kullanır. Uygunluk saç yapınıza ve klinik değerlendirmeye bağlıdır.",
    whoTitle: "Kimler ön değerlendirme talep edebilir?",
    whoIntro:
      "Fotoğraf üzerinden ön değerlendirme, saç dökülme paterninizi anlamaya ve sonraki adımları konuşmaya yardımcı olur. Yüz yüze muayenenin yerini tutmaz.",
    whoItems: [
      "Çekilme (frontotemporal) saç çizgisi",
      "Tepe (vertex) seyrelmesi",
      "Donör bölgenin uygun olabileceği yaygın incelme",
      "FUE veya DHI düşünen ve önce net yönlendirme isteyen kişiler",
    ],
    processTitle: "Süreç — adım adım",
    process: [
      {
        t: "Görüşme",
        d: "Fotoğraf ve hedeflerinizi paylaşın. Klinik ön değerlendirme yapar ve ilk sorularınızı yanıtlar.",
      },
      {
        t: "Planlama",
        d: "Saç çizgisi tasarımı, greft tahmini ve teknik seçenekleri profilinize göre netleştirilir.",
      },
      {
        t: "İşlem gününe genel bakış",
        d: "İşlem gününde ekip hazırlıktan ekime kadar yapılandırılmış bir protokol izler.",
      },
      {
        t: "İyileşme genel bakışı",
        d: "Erken dönemde kızarıklık ve kabuklanma görülebilir; bunlar günler ve haftalar içinde geriler.",
      },
      {
        t: "Bakım desteği",
        d: "Bakım önerileri paylaşılır; iyileşme sürecinde klinik ile iletişimde kalabilirsiniz.",
      },
    ],
    intlTitle: "Batumi’ye gelen uluslararası hastalar",
    intlText:
      "Batumi birçok ülke için hava ve kara yoluyla erişilebilir. Seyahat planı, konaklama süresi ve ziyaret zamanlaması ön değerlendirme sonrası bireysel konuşulur.",
    intlNote:
      "Otel ve transfer konularında klinik onayı sonrası net bilgi paylaşılır.",
    faqTitle: "Sık sorulan sorular",
    faqs: [
      {
        q: "Fotoğraf değerlendirmesi tıbbi teşhis midir?",
        a: "Hayır. Fotoğraflar ön planlama içindir. Nihai plan klinik değerlendirme sonrası netleşir.",
      },
      {
        q: "FUE ile DHI farkı nedir?",
        a: "Her ikisi de greft nakli yapar. Yerleştirme yöntemleri farklıdır. Size uygun yaklaşım vakaya göre konuşulur.",
      },
      {
        q: "Kaç greft gerekir?",
        a: "Greft ihtiyacı dökülme paterni, donör yoğunluğu ve hedeflere göre değişir. Fotoğraf incelemesi sonrası tahmini aralık konuşulur.",
      },
      {
        q: "İyileşme ne kadar sürer?",
        a: "Erken iyileşme günler–haftalar içinde ilerler. Estetik sonuçlar aylar içinde kademeli oluşur.",
      },
      {
        q: "Türkçe iletişim mümkün mü?",
        a: "Evet. Aura Clinic İngilizce, Gürcüce, Türkçe ve Rusça iletişim sağlar.",
      },
    ],
    formTitle: "Ücretsiz ön değerlendirme talep edin",
    formSub: "Ad ve telefon zorunludur. Bilgileriniz yalnızca bu talebi işlemek için kullanılır.",
    labelName: "Ad Soyad",
    labelPhone: "Telefon / WhatsApp",
    labelEmail: "E-posta (isteğe bağlı)",
    labelAge: "Yaş aralığı",
    labelTimeline: "Tercih edilen zaman",
    labelCountry: "Ülke",
    labelLang: "Tercih edilen dil",
    ageOptions: ["Belirtmek istemiyorum", "18–24", "25–34", "35–44", "45–54", "55+"],
    timelineOptions: [
      "Sadece araştırıyorum",
      "1 ay içinde",
      "1–3 ay",
      "3–6 ay",
      "Esnek",
    ],
    consent:
      "Bu talebin işlenmesi için kişisel verilerimin işlenmesine izin veriyorum. Gizlilik politikamızı inceleyebilirsiniz.",
    marketing: "Klinikten zaman zaman bilgilendirme almak istiyorum (isteğe bağlı).",
    privacyLink: "Gizlilik politikası",
    submit: "Talebi gönder",
    contactTitle: "İletişim",
    address: "129 Petre Bagrationi Str, Batumi 6010, Georgia",
    map: "Google Maps’te görüntüle",
    hoursLabel: "Çalışma saatleri:",
    hours: "Pzt–Paz 10:00–19:00",
    waContact: "WhatsApp’tan yazın",
    cookie1: "Zorunlu özellikler ve — onayınızla — isteğe bağlı analitik kullanıyoruz. ",
    cookieLink: "Çerez politikası",
    cookie2: ".",
    cookieOk: "Tamam",
    footerTag: "Premium estetik ve saç ekimi — Batum.",
    footerNav: "Navigasyon",
    footerLegal: "Yasal",
    legal: "Künye",
    privacy: "Gizlilik politikası",
    terms: "Kullanım şartları",
    cookies: "Çerezler",
    rights: "© Aura Clinic. Tüm hakları saklıdır.",
    serviceName: "Saç ekimi (FUE / DHI)",
    breadcrumbHome: "Ana sayfa",
    breadcrumbCurrent: "Batum saç ekimi",
  },
  ru: {
    file: "ru/peresadka-volos-batumi.html",
    lang: "ru",
    locale: "ru_RU",
    title: "Пересадка волос в Батуми | FUE и DHI | Aura Clinic",
    description:
      "Пересадка волос FUE и DHI в Батуми. Отправьте фотографии для бесплатной предварительной оценки в Aura Clinic.",
    ogLocaleAlt: ["en_US", "tr_TR", "ka_GE"],
    eyebrow: "Aura Clinic · Батуми",
    h1: "Пересадка волос FUE и DHI в Батуми",
    lead: "Отправьте фотографии, чтобы получить предварительную оценку состояния волос и предполагаемого количества графтов.",
    cta1: "Бесплатный анализ волос",
    cta2: "Отправить фото в WhatsApp",
    sticky1: "Анализ",
    sticky2: "WhatsApp",
    trust: [
      "Клиника в Батуми, Грузия",
      "Техники FUE и DHI",
      "Многоязычная коммуникация",
      "Бесплатная предварительная оценка по фото",
    ],
    navHome: "Главная",
    navAnalysis: "Анализ",
    navContact: "Контакты",
    navBlog: "Блог",
    sectionFueTitle: "FUE и DHI — в чём смысл",
    fueTitle: "FUE",
    fueText:
      "FUE (Follicular Unit Extraction) — извлечение отдельных фолликулярных единиц из донорской зоны и их пересадка в подготовленные зоны. Метод часто используют для естественной линии роста и планирования плотности.",
    dhiTitle: "DHI",
    dhiText:
      "DHI (Direct Hair Implantation) использует специальные инструменты имплантации, позволяющие контролировать угол и глубину. Подходящий метод зависит от вашей картины выпадения и клинической оценки.",
    whoTitle: "Кто может запросить предварительную оценку",
    whoIntro:
      "Оценка по фото помогает понять характер выпадения и обсудить следующие шаги. Она не заменяет очный медицинский осмотр.",
    whoItems: [
      "Залысины или редеющая линия роста у висков",
      "Истончение в области макушки",
      "Диффузное истончение при возможном наличии донорских волос",
      "Пациенты, рассматривающие FUE или DHI и желающие сначала получить ориентиры",
    ],
    processTitle: "Как проходит процесс",
    process: [
      {
        t: "Консультация",
        d: "Вы присылаете фото и цели. Клиника рассматривает случай и отвечает на первые вопросы.",
      },
      {
        t: "Планирование",
        d: "Дизайн линии роста, оценка графтов и выбор техники уточняются по вашему профилю.",
      },
      {
        t: "День процедуры — обзор",
        d: "В день процедуры команда следует структурированному протоколу от подготовки до имплантации.",
      },
      {
        t: "Восстановление — обзор",
        d: "На раннем этапе возможны покраснение и корочки; они обычно уменьшаются в течение дней и недель.",
      },
      {
        t: "Поддержка после процедуры",
        d: "Вы получаете рекомендации по уходу и можете оставаться на связи с клиникой.",
      },
    ],
    intlTitle: "Международные пациенты в Батуми",
    intlText:
      "Батуми доступен многим пациентам авиа- и наземным транспортом. План поездки, длительность пребывания и сроки обсуждаются индивидуально после предварительной оценки.",
    intlNote:
      "Вопросы отеля и трансфера уточняются с клиникой после рассмотрения случая.",
    faqTitle: "Частые вопросы",
    faqs: [
      {
        q: "Оценка по фото — это медицинский диагноз?",
        a: "Нет. Фото нужны для предварительного планирования. Окончательный план подтверждается после клинической оценки.",
      },
      {
        q: "Чем отличаются FUE и DHI?",
        a: "Оба метода пересаживают фолликулярные единицы. Разница в основном в способе размещения. Подход зависит от вашего случая.",
      },
      {
        q: "Сколько графтов мне нужно?",
        a: "Количество зависит от зоны выпадения, донорской плотности и целей. Ориентир обсуждается после просмотра фото.",
      },
      {
        q: "Сколько длится восстановление?",
        a: "Раннее заживление обычно занимает дни–недели. Эстетический результат формируется постепенно в течение месяцев.",
      },
      {
        q: "Можно ли общаться на русском?",
        a: "Да. Aura Clinic общается с пациентами на английском, грузинском, турецком и русском.",
      },
    ],
    formTitle: "Запросить бесплатную предварительную оценку",
    formSub: "Имя и телефон обязательны. Данные используются только для обработки заявки.",
    labelName: "Имя и фамилия",
    labelPhone: "Телефон / WhatsApp",
    labelEmail: "Email (необязательно)",
    labelAge: "Возраст",
    labelTimeline: "Желаемые сроки",
    labelCountry: "Страна",
    labelLang: "Предпочтительный язык",
    ageOptions: ["Не указывать", "18–24", "25–34", "35–44", "45–54", "55+"],
    timelineOptions: [
      "Только изучаю",
      "В течение 1 месяца",
      "1–3 месяца",
      "3–6 месяцев",
      "Гибко",
    ],
    consent:
      "Я соглашаюсь на обработку персональных данных для рассмотрения этой заявки. См. политику конфиденциальности.",
    marketing: "Я согласен получать иногда новости клиники (необязательно).",
    privacyLink: "Политика конфиденциальности",
    submit: "Отправить заявку",
    contactTitle: "Контакты",
    address: "129 Petre Bagrationi Str, Batumi 6010, Georgia",
    map: "Открыть в Google Maps",
    hoursLabel: "Часы работы:",
    hours: "Пн–Вс 10:00–19:00",
    waContact: "Написать в WhatsApp",
    cookie1: "Мы используем необходимые функции и — с вашего согласия — аналитику. См. ",
    cookieLink: "политику cookie",
    cookie2: ".",
    cookieOk: "OK",
    footerTag: "Премиальная эстетика и пересадка волос — Батуми.",
    footerNav: "Навигация",
    footerLegal: "Правовая информация",
    legal: "Выходные данные",
    privacy: "Конфиденциальность",
    terms: "Условия использования",
    cookies: "Cookies",
    rights: "© Aura Clinic. Все права защищены.",
    serviceName: "Пересадка волос (FUE / DHI)",
    breadcrumbHome: "Главная",
    breadcrumbCurrent: "Пересадка волос Батуми",
  },
  ka: {
    file: "ka/hair-transplant-batumi.html",
    lang: "ka",
    locale: "ka_GE",
    title: "თმის ტრანსპლანტაცია ბათუმში | FUE და DHI | Aura Clinic",
    description:
      "ბუნებრივი სახის FUE და DHI თმის ტრანსპლანტაცია ბათუმში. გამოგვიგზავნეთ ფოტოები უფასო წინასწარი შეფასებისთვის Aura Clinic-ში.",
    ogLocaleAlt: ["en_US", "tr_TR", "ru_RU"],
    eyebrow: "Aura Clinic · ბათუმი",
    h1: "ბუნებრივი სახის FUE და DHI თმის ტრანსპლანტაცია ბათუმში",
    lead: "გამოგვიგზავნეთ ფოტოები, რათა წინასწარ შევაფასოთ თმის მდგომარეობა და სავარაუდო გრაფტების საჭიროება.",
    cta1: "უფასო თმის ანალიზი",
    cta2: "ფოტოების გაგზავნა WhatsApp-ზე",
    sticky1: "უფასო ანალიზი",
    sticky2: "WhatsApp",
    trust: [
      "კლინიკა ბათუმში, საქართველო",
      "FUE და DHI ტექნიკები",
      "მრავალენოვანი კომუნიკაცია",
      "უფასო წინასწარი შეფასება ფოტოებით",
    ],
    navHome: "მთავარი",
    navAnalysis: "ანალიზი",
    navContact: "კონტაქტი",
    navBlog: "ბლოგი",
    sectionFueTitle: "FUE და DHI — რას ნიშნავს",
    fueTitle: "FUE",
    fueText:
      "FUE (Follicular Unit Extraction) გულისხმობს დონორის ზონიდან ინდივიდუალური ფოლიკულური ერთეულების აღებას და მიმღებ ზონაში განთავსებას. ხშირად გამოიყენება ბუნებრივი თმის ხაზისა და სიმკვრივის დაგეგმვისთვის.",
    dhiTitle: "DHI",
    dhiText:
      "DHI (Direct Hair Implantation) იყენებს სპეციალურ იმპლანტაციის ინსტრუმენტებს, რომლებიც ეხმარება კუთხისა და სიღრმის კონტროლში. შესაბამისობა დამოკიდებულია თმის მდგომარეობასა და კლინიკურ შეფასებაზე.",
    whoTitle: "ვინ შეიძლება მოითხოვოს წინასწარი შეფასება",
    whoIntro:
      "ფოტოებზე დაფუძნებული წინასწარი შეფასება ეხმარება თმის ცვენის პატერნის გაგებასა და შემდეგი ნაბიჯების განხილვას. ის არ ცვლის პირისპირ სამედიცინო გამოკვლევას.",
    whoItems: [
      "თმის ხაზის უკან დახევა ან საფეთქლებთან გათხელება",
      "გვირგვინის (vertex) გათხელება",
      "დიფუზური გათხელება, როცა დონორის თმა შესაძლოა ხელმისაწვდომი იყოს",
      "პაციენტები, რომლებიც განიხილავენ FUE ან DHI-ს და ჯერ მკაფიო ორიენტაციას ითხოვენ",
    ],
    processTitle: "პროცესი — ნაბიჯ-ნაბიჯ",
    process: [
      {
        t: "კონსულტაცია",
        d: "გააზიარეთ ფოტოები და მიზნები. კლინიკა განიხილავს შემთხვევას და პასუხობს პირველ კითხვებს.",
      },
      {
        t: "დაგეგმვა",
        d: "თმის ხაზის დიზაინი, გრაფტების შეფასება და ტექნიკის განხილვა იხვეწება თქვენი პროფილის მიხედვით.",
      },
      {
        t: "პროცედურის დღის მიმოხილვა",
        d: "პროცედურის დღეს გუნდი მიჰყვება სტრუქტურირებულ პროტოკოლს მომზადებიდან იმპლანტაციამდე.",
      },
      {
        t: "აღდგენის მიმოხილვა",
        d: "ადრეულ ეტაპზე შესაძლებელია სიწითლე და ქერცლები; ისინი ჩვეულებრივ მცირდება დღეებისა და კვირების განმავლობაში.",
      },
      {
        t: "მოვლის მხარდაჭერა",
        d: "მიიღებთ მოვლის რეკომენდაციებს და შეგიძლიათ დარჩეთ კავშირზე კლინიკასთან.",
      },
    ],
    intlTitle: "საერთაშორისო პაციენტები ბათუმში",
    intlText:
      "ბათუმი ბევრი საერთაშორისო პაციენტისთვის ხელმისაწვდომია საჰაერო და სახმელეთო გზით. მოგზაურობის გეგმა, ყოფნის ხანგრძლივობა და ვიზიტის დრო ინდივიდუალურად განიხილება წინასწარი შეფასების შემდეგ.",
    intlNote:
      "სასტუმრო და ტრანსფერი კლინიკასთან დადასტურების შემდეგ ირკვევა.",
    faqTitle: "ხშირად დასმული კითხვები",
    faqs: [
      {
        q: "ფოტოების შეფასება სამედიცინო დიაგნოზია?",
        a: "არა. ფოტოები წინასწარი დაგეგმვისთვისაა. საბოლოო გეგმა კლინიკური შეფასების შემდეგ დასტურდება.",
      },
      {
        q: "რა განსხვავებაა FUE-სა და DHI-ს შორის?",
        a: "ორივე გადააქვს ფოლიკულურ ერთეულებს. განსხვავება ძირითადად განთავსების მეთოდშია. შესაბამისი მიდგომა შემთხვევაზეა დამოკიდებული.",
      },
      {
        q: "რამდენი გრაფტი დამჭირდება?",
        a: "საჭიროება დამოკიდებულია ცვენის პატერნზე, დონორის სიმკვრივესა და მიზნებზე. ორიენტირი ფოტოების განხილვის შემდეგ საუბრობს.",
      },
      {
        q: "რამდენ ხანს გრძელდება აღდგენა?",
        a: "ადრეული შეხორცება ხშირად დღეებიდან კვირებამდე მიმდინარეობს. ესთეტიკური შედეგი თვეების განმავლობაში თანდათან ყალიბდება.",
      },
      {
        q: "შესაძლებელია ქართულად კომუნიკაცია?",
        a: "დიახ. Aura Clinic პაციენტებთან ურთიერთობს ინგლისურად, ქართულად, თურქულად და რუსულად.",
      },
    ],
    formTitle: "მოითხოვეთ უფასო წინასწარი შეფასება",
    formSub: "სახელი და ტელეფონი სავალდებულოა. მონაცემები გამოიყენება მხოლოდ ამ მოთხოვნის დასამუშავებლად.",
    labelName: "სახელი და გვარი",
    labelPhone: "ტელეფონი / WhatsApp",
    labelEmail: "ელფოსტა (არასავალდებულო)",
    labelAge: "ასაკობრივი დიაპაზონი",
    labelTimeline: "სასურველი ვადა",
    labelCountry: "ქვეყანა",
    labelLang: "სასურველი ენა",
    ageOptions: ["არ მინდა მითითება", "18–24", "25–34", "35–44", "45–54", "55+"],
    timelineOptions: [
      "მხოლოდ ვიკვლევ",
      "1 თვეში",
      "1–3 თვე",
      "3–6 თვე",
      "მოქნილი",
    ],
    consent:
      "ვეთანხმები პირადი მონაცემების დამუშავებას ამ მოთხოვნის განსახილველად. იხილეთ კონფიდენციალობის პოლიტიკა.",
    marketing: "თანახმა ვარ კლინიკისგან დროდადრო განახლებების მიღებაზე (არასავალდებულო).",
    privacyLink: "კონფიდენციალობის პოლიტიკა",
    submit: "მოთხოვნის გაგზავნა",
    contactTitle: "კონტაქტი",
    address: "129 Petre Bagrationi Str, Batumi 6010, Georgia",
    map: "ნახვა Google Maps-ზე",
    hoursLabel: "სამუშაო საათები:",
    hours: "ორშ–კვი 10:00–19:00",
    waContact: "მოგვწერეთ WhatsApp-ზე",
    cookie1: "ვიყენებთ აუცილებელ ფუნქციებს და — თქვენი თანხმობით — ანალიტიკას. იხილეთ ",
    cookieLink: "ქუქიების პოლიტიკა",
    cookie2: ".",
    cookieOk: "კარგი",
    footerTag: "პრემიუმ ესთეტიკა და თმის აღდგენა — ბათუმი.",
    footerNav: "ნავიგაცია",
    footerLegal: "სამართლებრივი",
    legal: "იურიდიული შენიშვნა",
    privacy: "კონფიდენციალობა",
    terms: "გამოყენების პირობები",
    cookies: "ქუქიები",
    rights: "© Aura Clinic. ყველა უფლება დაცულია.",
    serviceName: "თმის ტრანსპლანტაცია (FUE / DHI)",
    breadcrumbHome: "მთავარი",
    breadcrumbCurrent: "თმის ტრანსპლანტაცია ბათუმი",
  },
};

var BOTOX = {
  en: {
    file: "en/botox-fillers-batumi.html",
    lang: "en",
    locale: "en_US",
    title: "Botox & Fillers in Batumi | Aura Clinic",
    description:
      "Botox and dermal filler treatments in Batumi. Contact Aura Clinic to discuss a suitable approach and book a consultation.",
    ogLocaleAlt: ["tr_TR", "ka_GE", "ru_RU"],
    eyebrow: "Aura Clinic · Batumi",
    h1: "Botox & Dermal Fillers in Batumi",
    lead: "Contact the clinic to learn which approach may suit your goals and to book a consultation.",
    cta1: "Book on WhatsApp",
    cta2: "Request an appointment",
    sticky1: "WhatsApp",
    sticky2: "Book",
    navHome: "Home",
    navAnalysis: "Analysis",
    navContact: "Contact",
    navBlog: "Blog",
    botoxTitle: "Botox — overview",
    botoxText:
      "Botulinum toxin treatments are commonly used to soften the appearance of dynamic expression lines. Suitability, product choice, and dosing are determined only after clinical assessment — we do not publish dose or duration claims here.",
    fillerTitle: "Dermal fillers — overview",
    fillerText:
      "Dermal fillers are used to support facial contours and volume where appropriate. Results and product selection depend on anatomy and clinical judgement. Brand names and dosing are discussed privately at consultation.",
    areasTitle: "Treatment areas (general)",
    areas: [
      "Forehead lines",
      "Frown lines",
      "Crow’s feet",
      "Lips",
      "Cheeks",
      "Jawline",
      "Chin",
      "Under-eye area (when clinically suitable)",
    ],
    assessTitle: "Preliminary assessment process",
    assessSteps: [
      {
        t: "Share your goals",
        d: "Tell us what you would like to improve and any preferences for a natural look.",
      },
      {
        t: "Clinic review",
        d: "The team reviews your enquiry and advises on the next consultation step.",
      },
      {
        t: "In-clinic plan",
        d: "A personalised plan is confirmed only after face-to-face assessment.",
      },
    ],
    careTitle: "Before and after care — general information",
    careText:
      "Before treatment, avoid unverified advice from non-medical sources. After treatment, follow the clinic’s personal instructions. Detailed protocols are provided after your appointment is confirmed.",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "Can I choose botox or filler online?",
        a: "Online forms help us understand your interest. The final recommendation is made after clinical assessment.",
      },
      {
        q: "Will results look natural?",
        a: "The goal is a balanced, natural appearance. Exact outcomes vary by anatomy and treatment plan.",
      },
      {
        q: "How do I book?",
        a: "Use the form below or WhatsApp. The clinic will confirm a suitable time.",
      },
      {
        q: "Which languages do you speak?",
        a: "English, Georgian, Turkish, and Russian.",
      },
    ],
    formTitle: "Book an appointment enquiry",
    formSub: "Name and phone are required.",
    labelName: "Full name",
    labelPhone: "Phone / WhatsApp",
    labelLang: "Preferred language",
    labelInterest: "Interest",
    labelTime: "Preferred time",
    labelMessage: "Message (optional)",
    interestOptions: [
      { v: "botox", l: "Botox" },
      { v: "filler_lip", l: "Lip filler" },
      { v: "filler_face", l: "Face filler" },
      { v: "jawline", l: "Jawline" },
      { v: "consultation", l: "Consultation only" },
      { v: "other", l: "Other" },
    ],
    timeOptions: ["Morning", "Afternoon", "Evening", "Flexible"],
    consent:
      "I agree to the processing of my personal data to handle this enquiry. See our privacy policy.",
    marketing: "I agree to receive occasional clinic updates (optional).",
    privacyLink: "Privacy policy",
    submit: "Send enquiry",
    contactTitle: "Contact",
    address: "129 Petre Bagrationi Str, Batumi 6010, Georgia",
    map: "View on Google Maps",
    hoursLabel: "Opening hours:",
    hours: "Mon–Sun 10:00–19:00",
    waContact: "Message on WhatsApp",
    cookie1: "We use essential features and — with your consent — optional analytics. See our ",
    cookieLink: "cookie policy",
    cookie2: ".",
    cookieOk: "OK",
    footerTag: "Premium aesthetics & hair restoration — Batumi.",
    footerNav: "Navigation",
    footerLegal: "Legal",
    legal: "Legal notice",
    privacy: "Privacy policy",
    terms: "Terms of service",
    cookies: "Cookies",
    rights: "© Aura Clinic. All rights reserved.",
    serviceName: "Botox and dermal fillers",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Botox & fillers Batumi",
  },
  tr: {
    file: "tr/batum-dolgu-botoks.html",
    lang: "tr",
    locale: "tr_TR",
    title: "Batum’da Dolgu ve Botoks | Aura Clinic",
    description:
      "Batum’da doğal görünümü koruyan dolgu ve botoks uygulamaları. Randevu ve bilgilendirme için Aura Clinic ile iletişime geçin.",
    ogLocaleAlt: ["en_US", "ka_GE", "ru_RU"],
    eyebrow: "Aura Clinic · Batum",
    h1: "Batum’da Doğal Görünümü Koruyan Dolgu ve Botoks Uygulamaları",
    lead: "İhtiyacınıza uygun uygulamayı öğrenmek ve randevu oluşturmak için kliniğimizle iletişime geçin.",
    cta1: "WhatsApp’tan randevu al",
    cta2: "Randevu formu",
    sticky1: "WhatsApp",
    sticky2: "Randevu",
    navHome: "Ana sayfa",
    navAnalysis: "Analiz",
    navContact: "İletişim",
    navBlog: "Blog",
    botoxTitle: "Botoks — genel bakış",
    botoxText:
      "Botulinum toksini uygulamaları, dinamik mimik çizgilerinin görünümünü yumuşatmak için sık kullanılır. Uygunluk, ürün ve doz yalnızca klinik değerlendirme sonrası belirlenir — burada doz veya süre iddiası yer almaz.",
    fillerTitle: "Dolgu — genel bakış",
    fillerText:
      "Dermal dolgular, uygun görülen bölgelerde kontur ve hacim desteği için kullanılır. Sonuç ve ürün seçimi anatomiye ve klinik karara bağlıdır. Marka ve doz konsültasyonda özel olarak konuşulur.",
    areasTitle: "Uygulama bölgeleri (genel)",
    areas: [
      "Alın çizgileri",
      "Kaş arası",
      "Göz kenarı çizgileri",
      "Dudaklar",
      "Yanaklar",
      "Çene hattı",
      "Çene ucu",
      "Göz altı (klinik uygunluk varsa)",
    ],
    assessTitle: "Ön değerlendirme süreci",
    assessSteps: [
      {
        t: "Hedeflerinizi paylaşın",
        d: "Ne değiştirmek istediğinizi ve doğal görünüm tercihinizi iletin.",
      },
      {
        t: "Klinik inceleme",
        d: "Ekip talebinizi inceler ve sonraki görüşme adımını önerir.",
      },
      {
        t: "Klinik plan",
        d: "Kişisel plan yalnızca yüz yüze değerlendirme sonrası netleşir.",
      },
    ],
    careTitle: "Öncesi ve sonrası — genel bilgi",
    careText:
      "İşlem öncesi tıbbi olmayan kaynaklardan doğrulanmamış önerilere güvenmeyin. Sonrasında kliniğin size özel talimatlarını izleyin. Ayrıntılı protokoller randevu netleştikten sonra paylaşılır.",
    faqTitle: "Sık sorulan sorular",
    faqs: [
      {
        q: "Botoks veya dolguyu online seçebilir miyim?",
        a: "Form ilginizi anlamamıza yardımcı olur. Nihai öneri klinik değerlendirme sonrası verilir.",
      },
      {
        q: "Sonuç doğal görünür mü?",
        a: "Hedef dengeli ve doğal bir görünümüdür. Sonuç anatomiye ve plana göre değişir.",
      },
      {
        q: "Nasıl randevu alırım?",
        a: "Aşağıdaki formu veya WhatsApp’ı kullanın. Klinik uygun zamanı onaylar.",
      },
      {
        q: "Hangi dillerde iletişim var?",
        a: "İngilizce, Gürcüce, Türkçe ve Rusça.",
      },
    ],
    formTitle: "Randevu talebi gönderin",
    formSub: "Ad ve telefon zorunludur.",
    labelName: "Ad Soyad",
    labelPhone: "Telefon / WhatsApp",
    labelLang: "Tercih edilen dil",
    labelInterest: "İlgi alanı",
    labelTime: "Tercih edilen saat",
    labelMessage: "Mesaj (isteğe bağlı)",
    interestOptions: [
      { v: "botox", l: "Botoks" },
      { v: "filler_lip", l: "Dudak dolgusu" },
      { v: "filler_face", l: "Yüz dolgusu" },
      { v: "jawline", l: "Çene hattı" },
      { v: "consultation", l: "Sadece konsültasyon" },
      { v: "other", l: "Diğer" },
    ],
    timeOptions: ["Sabah", "Öğleden sonra", "Akşam", "Esnek"],
    consent:
      "Bu talebin işlenmesi için kişisel verilerimin işlenmesine izin veriyorum. Gizlilik politikamızı inceleyebilirsiniz.",
    marketing: "Klinikten zaman zaman bilgilendirme almak istiyorum (isteğe bağlı).",
    privacyLink: "Gizlilik politikası",
    submit: "Talebi gönder",
    contactTitle: "İletişim",
    address: "129 Petre Bagrationi Str, Batumi 6010, Georgia",
    map: "Google Maps’te görüntüle",
    hoursLabel: "Çalışma saatleri:",
    hours: "Pzt–Paz 10:00–19:00",
    waContact: "WhatsApp’tan yazın",
    cookie1: "Zorunlu özellikler ve — onayınızla — isteğe bağlı analitik kullanıyoruz. ",
    cookieLink: "Çerez politikası",
    cookie2: ".",
    cookieOk: "Tamam",
    footerTag: "Premium estetik ve saç ekimi — Batum.",
    footerNav: "Navigasyon",
    footerLegal: "Yasal",
    legal: "Künye",
    privacy: "Gizlilik politikası",
    terms: "Kullanım şartları",
    cookies: "Çerezler",
    rights: "© Aura Clinic. Tüm hakları saklıdır.",
    serviceName: "Dolgu ve botoks",
    breadcrumbHome: "Ana sayfa",
    breadcrumbCurrent: "Batum dolgu ve botoks",
  },
  ru: {
    file: "ru/botoks-fillery-batumi.html",
    lang: "ru",
    locale: "ru_RU",
    title: "Ботокс и филлеры в Батуми | Aura Clinic",
    description:
      "Ботокс и контурная пластика в Батуми. Свяжитесь с Aura Clinic, чтобы подобрать процедуру и записаться на консультацию.",
    ogLocaleAlt: ["en_US", "tr_TR", "ka_GE"],
    eyebrow: "Aura Clinic · Батуми",
    h1: "Ботокс и контурная пластика в Батуми",
    lead: "Свяжитесь с клиникой, чтобы подобрать подходящую процедуру и записаться на консультацию.",
    cta1: "Запись в WhatsApp",
    cta2: "Форма записи",
    sticky1: "WhatsApp",
    sticky2: "Запись",
    navHome: "Главная",
    navAnalysis: "Анализ",
    navContact: "Контакты",
    navBlog: "Блог",
    botoxTitle: "Ботокс — обзор",
    botoxText:
      "Препараты ботулотоксина часто используют для смягчения динамических мимических морщин. Подходящий подход, препарат и дозировка определяются только после клинической оценки — здесь нет заявлений о дозе или длительности эффекта.",
    fillerTitle: "Филлеры — обзор",
    fillerText:
      "Дермальные филлеры применяют для поддержки контуров и объёма лица при наличии показаний. Результат и выбор препарата зависят от анатомии и клинического решения. Бренды и дозировки обсуждаются на консультации.",
    areasTitle: "Зоны (общие названия)",
    areas: [
      "Лоб",
      "Межбровье",
      "«Гусиные лапки»",
      "Губы",
      "Скулы / щёки",
      "Линия челюсти",
      "Подбородок",
      "Область под глазами (при клинической целесообразности)",
    ],
    assessTitle: "Предварительная оценка",
    assessSteps: [
      {
        t: "Опишите цели",
        d: "Расскажите, что хотите улучшить и предпочитаете ли естественный результат.",
      },
      {
        t: "Ответ клиники",
        d: "Команда рассматривает запрос и предлагает следующий шаг консультации.",
      },
      {
        t: "План в клинике",
        d: "Персональный план подтверждается только после очной оценки.",
      },
    ],
    careTitle: "До и после — общая информация",
    careText:
      "До процедуры не опирайтесь на непроверенные советы из немедицинских источников. После — следуйте индивидуальным рекомендациям клиники. Подробные протоколы сообщаются после подтверждения записи.",
    faqTitle: "Частые вопросы",
    faqs: [
      {
        q: "Можно ли выбрать ботокс или филлер онлайн?",
        a: "Форма помогает понять ваш интерес. Итоговая рекомендация даётся после клинической оценки.",
      },
      {
        q: "Будет ли результат естественным?",
        a: "Цель — гармоничный, естественный вид. Итог зависит от анатомии и плана.",
      },
      {
        q: "Как записаться?",
        a: "Заполните форму ниже или напишите в WhatsApp. Клиника подтвердит удобное время.",
      },
      {
        q: "На каких языках можно общаться?",
        a: "На английском, грузинском, турецком и русском.",
      },
    ],
    formTitle: "Заявка на запись",
    formSub: "Имя и телефон обязательны.",
    labelName: "Имя и фамилия",
    labelPhone: "Телефон / WhatsApp",
    labelLang: "Предпочтительный язык",
    labelInterest: "Интерес",
    labelTime: "Удобное время",
    labelMessage: "Сообщение (необязательно)",
    interestOptions: [
      { v: "botox", l: "Ботокс" },
      { v: "filler_lip", l: "Филлер губ" },
      { v: "filler_face", l: "Филлер лица" },
      { v: "jawline", l: "Линия челюсти" },
      { v: "consultation", l: "Только консультация" },
      { v: "other", l: "Другое" },
    ],
    timeOptions: ["Утро", "День", "Вечер", "Гибко"],
    consent:
      "Я соглашаюсь на обработку персональных данных для рассмотрения этой заявки. См. политику конфиденциальности.",
    marketing: "Я согласен получать иногда новости клиники (необязательно).",
    privacyLink: "Политика конфиденциальности",
    submit: "Отправить заявку",
    contactTitle: "Контакты",
    address: "129 Petre Bagrationi Str, Batumi 6010, Georgia",
    map: "Открыть в Google Maps",
    hoursLabel: "Часы работы:",
    hours: "Пн–Вс 10:00–19:00",
    waContact: "Написать в WhatsApp",
    cookie1: "Мы используем необходимые функции и — с вашего согласия — аналитику. См. ",
    cookieLink: "политику cookie",
    cookie2: ".",
    cookieOk: "OK",
    footerTag: "Премиальная эстетика и пересадка волос — Батуми.",
    footerNav: "Навигация",
    footerLegal: "Правовая информация",
    legal: "Выходные данные",
    privacy: "Конфиденциальность",
    terms: "Условия использования",
    cookies: "Cookies",
    rights: "© Aura Clinic. Все права защищены.",
    serviceName: "Ботокс и филлеры",
    breadcrumbHome: "Главная",
    breadcrumbCurrent: "Ботокс и филлеры Батуми",
  },
  ka: {
    file: "ka/botox-fillers-batumi.html",
    lang: "ka",
    locale: "ka_GE",
    title: "ბოტოქსი და ფილერები ბათუმში | Aura Clinic",
    description:
      "ბოტოქსი და დერმალური ფილერები ბათუმში. დაუკავშირდით Aura Clinic-ს შესაბამისი პროცედურისა და კონსულტაციისთვის.",
    ogLocaleAlt: ["en_US", "tr_TR", "ru_RU"],
    eyebrow: "Aura Clinic · ბათუმი",
    h1: "ბოტოქსი და დერმალური ფილერები ბათუმში",
    lead: "დაუკავშირდით კლინიკას, რათა გაიგოთ თქვენთვის შესაფერისი მიდგომა და ჩაიწეროთ კონსულტაციაზე.",
    cta1: "ჩაწერა WhatsApp-ზე",
    cta2: "ჩაწერის ფორმა",
    sticky1: "WhatsApp",
    sticky2: "ჩაწერა",
    navHome: "მთავარი",
    navAnalysis: "ანალიზი",
    navContact: "კონტაქტი",
    navBlog: "ბლოგი",
    botoxTitle: "ბოტოქსი — მიმოხილვა",
    botoxText:
      "ბოტულინის ტოქსინის პროცედურები ხშირად გამოიყენება დინამიკური მიმიკური ხაზების შესარბილებლად. შესაბამისობა, პროდუქტი და დოზა განისაზღვრება მხოლოდ კლინიკური შეფასების შემდეგ — აქ დოზის ან ხანგრძლივობის განაცხადები არ არის.",
    fillerTitle: "ფილერები — მიმოხილვა",
    fillerText:
      "დერმალური ფილერები გამოიყენება სახის კონტურისა და მოცულობის მხარდასაჭერად, როცა ეს მიზანშეწონილია. შედეგი და პროდუქტის შერჩევა ანატომიასა და კლინიკურ გადაწყვეტაზეა დამოკიდებული. ბრენდები და დოზა კონსულტაციაზე განიხილება.",
    areasTitle: "ზონები (ზოგადი სახელები)",
    areas: [
      "შუბლის ხაზები",
      "წარბთაშორისი",
      "თვალის გარე კუთხეები",
      "ტუჩები",
      "ლოყები",
      "ყბის ხაზი",
      "ნიკაპი",
      "თვალქვეშა ზონა (კლინიკური შესაბამისობისას)",
    ],
    assessTitle: "წინასწარი შეფასების პროცესი",
    assessSteps: [
      {
        t: "გააზიარეთ მიზნები",
        d: "გვითხარით, რისი გაუმჯობესება გსურთ და გირჩევნიათ თუ არა ბუნებრივი სახე.",
      },
      {
        t: "კლინიკის განხილვა",
        d: "გუნდი განიხილავს მოთხოვნას და გირჩევთ შემდეგ კონსულტაციის ნაბიჯს.",
      },
      {
        t: "გეგმა კლინიკაში",
        d: "პერსონალური გეგმა დასტურდება მხოლოდ პირისპირ შეფასების შემდეგ.",
      },
    ],
    careTitle: "მანამდე და შემდეგ — ზოგადი ინფორმაცია",
    careText:
      "პროცედურამდე არ დაეყრდნოთ არასამედიცინო წყაროების დაუდასტურებელ რჩევებს. შემდეგ მიჰყევით კლინიკის ინდივიდუალურ ინსტრუქციებს. დეტალური პროტოკოლები ჩაწერის დადასტურების შემდეგ გაიცემა.",
    faqTitle: "ხშირად დასმული კითხვები",
    faqs: [
      {
        q: "შემიძლია ბოტოქსი ან ფილერი ონლაინ ავირჩიო?",
        a: "ფორმა გვეხმარება ინტერესის გაგებაში. საბოლოო რეკომენდაცია კლინიკური შეფასების შემდეგ გაიცემა.",
      },
      {
        q: "შედეგი ბუნებრივი იქნება?",
        a: "მიზანია დაბალანსებული, ბუნებრივი სახე. შედეგი ანატომიასა და გეგმაზეა დამოკიდებული.",
      },
      {
        q: "როგორ ჩავიწერო?",
        a: "შეავსეთ ქვემოთ მოცემული ფორმა ან მოგვწერეთ WhatsApp-ზე. კლინიკა დაადასტურებს დროს.",
      },
      {
        q: "რომელ ენებზეა კომუნიკაცია?",
        a: "ინგლისური, ქართული, თურქული და რუსული.",
      },
    ],
    formTitle: "ჩაწერის მოთხოვნა",
    formSub: "სახელი და ტელეფონი სავალდებულოა.",
    labelName: "სახელი და გვარი",
    labelPhone: "ტელეფონი / WhatsApp",
    labelLang: "სასურველი ენა",
    labelInterest: "ინტერესი",
    labelTime: "სასურველი დრო",
    labelMessage: "შეტყობინება (არასავალდებულო)",
    interestOptions: [
      { v: "botox", l: "ბოტოქსი" },
      { v: "filler_lip", l: "ტუჩის ფილერი" },
      { v: "filler_face", l: "სახის ფილერი" },
      { v: "jawline", l: "ყბის ხაზი" },
      { v: "consultation", l: "მხოლოდ კონსულტაცია" },
      { v: "other", l: "სხვა" },
    ],
    timeOptions: ["დილა", "შუადღე", "საღამო", "მოქნილი"],
    consent:
      "ვეთანხმები პირადი მონაცემების დამუშავებას ამ მოთხოვნის განსახილველად. იხილეთ კონფიდენციალობის პოლიტიკა.",
    marketing: "თანახმა ვარ კლინიკისგან დროდადრო განახლებების მიღებაზე (არასავალდებულო).",
    privacyLink: "კონფიდენციალობის პოლიტიკა",
    submit: "მოთხოვნის გაგზავნა",
    contactTitle: "კონტაქტი",
    address: "129 Petre Bagrationi Str, Batumi 6010, Georgia",
    map: "ნახვა Google Maps-ზე",
    hoursLabel: "სამუშაო საათები:",
    hours: "ორშ–კვი 10:00–19:00",
    waContact: "მოგვწერეთ WhatsApp-ზე",
    cookie1: "ვიყენებთ აუცილებელ ფუნქციებს და — თქვენი თანხმობით — ანალიტიკას. იხილეთ ",
    cookieLink: "ქუქიების პოლიტიკა",
    cookie2: ".",
    cookieOk: "კარგი",
    footerTag: "პრემიუმ ესთეტიკა და თმის აღდგენა — ბათუმი.",
    footerNav: "ნავიგაცია",
    footerLegal: "სამართლებრივი",
    legal: "იურიდიული შენიშვნა",
    privacy: "კონფიდენციალობა",
    terms: "გამოყენების პირობები",
    cookies: "ქუქიები",
    rights: "© Aura Clinic. ყველა უფლება დაცულია.",
    serviceName: "ბოტოქსი და ფილერები",
    breadcrumbHome: "მთავარი",
    breadcrumbCurrent: "ბოტოქსი და ფილერები ბათუმი",
  },
};

var HAIR_URLS = {
  en: "https://auraclinicge.com/en/hair-transplant-batumi.html",
  tr: "https://auraclinicge.com/tr/batum-sac-ekimi.html",
  ka: "https://auraclinicge.com/ka/hair-transplant-batumi.html",
  ru: "https://auraclinicge.com/ru/peresadka-volos-batumi.html",
};

var BOTOX_URLS = {
  en: "https://auraclinicge.com/en/botox-fillers-batumi.html",
  tr: "https://auraclinicge.com/tr/batum-dolgu-botoks.html",
  ka: "https://auraclinicge.com/ka/botox-fillers-batumi.html",
  ru: "https://auraclinicge.com/ru/botoks-fillery-batumi.html",
};

var HAIR_PATHS = {
  en: "../en/hair-transplant-batumi.html",
  tr: "../tr/batum-sac-ekimi.html",
  ka: "../ka/hair-transplant-batumi.html",
  ru: "../ru/peresadka-volos-batumi.html",
};

var BOTOX_PATHS = {
  en: "../en/botox-fillers-batumi.html",
  tr: "../tr/batum-dolgu-botoks.html",
  ka: "../ka/botox-fillers-batumi.html",
  ru: "../ru/botoks-fillery-batumi.html",
};

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function headCommon(c, urls, pageUrl, serviceSchemaName) {
  var alts = (c.ogLocaleAlt || [])
    .map(function (l) {
      return '  <meta property="og:locale:alternate" content="' + l + '" />';
    })
    .join("\n");
  var hreflang = ["en", "tr", "ka", "ru"]
    .map(function (l) {
      return (
        '  <link rel="alternate" hreflang="' +
        l +
        '" href="' +
        urls[l] +
        '" />'
      );
    })
    .join("\n");
  return (
    `<!DOCTYPE html>
<html lang="${c.lang}">
<head>
  <meta charset="UTF-8" />
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500
    });
  </script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18301236806"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(c.title)}</title>
  <meta name="description" content="${esc(c.description)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${pageUrl}" />
${hreflang}
  <link rel="alternate" hreflang="x-default" href="${urls.en}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Aura Clinic" />
  <meta property="og:locale" content="${c.locale}" />
${alts}
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="${esc(c.title)}" />
  <meta property="og:description" content="${esc(c.description)}" />
  <meta property="og:image" content="https://auraclinicge.com/media/media-hero.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(c.title)}" />
  <meta name="twitter:description" content="${esc(c.description)}" />
  <meta name="twitter:image" content="https://auraclinicge.com/media/media-hero.png" />
  <link rel="icon" type="image/svg+xml" href="../aura-fav.svg" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MedicalClinic", "LocalBusiness"],
        "@id": "https://auraclinicge.com/#clinic",
        "name": "Aura Clinic",
        "url": "https://auraclinicge.com",
        "logo": "https://auraclinicge.com/aura-logo.svg",
        "image": "https://auraclinicge.com/media/media-hero.png",
        "telephone": "+995557168876",
        "email": "info@auraclinicge.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "129 Petre Bagrationi Str",
          "addressLocality": "Batumi",
          "postalCode": "6010",
          "addressCountry": "GE"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          "opens": "10:00",
          "closes": "19:00"
        },
        "sameAs": ["https://www.instagram.com/auraclinicge/"]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": ${JSON.stringify(c.breadcrumbHome)},
            "item": "https://auraclinicge.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": ${JSON.stringify(c.breadcrumbCurrent)},
            "item": ${JSON.stringify(pageUrl)}
          }
        ]
      },
      {
        "@type": "Service",
        "name": ${JSON.stringify(serviceSchemaName)},
        "provider": { "@id": "https://auraclinicge.com/#clinic" },
        "areaServed": {
          "@type": "City",
          "name": "Batumi"
        },
        "url": ${JSON.stringify(pageUrl)}
      },
      {
        "@type": "FAQPage",
        "mainEntity": ${JSON.stringify(
          c.faqs.map(function (f) {
            return {
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            };
          })
        )}
      }
    ]
  }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800&family=Noto+Sans+Georgian:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/style.css" />
</head>`
  );
}

function langSwitcher(paths, current) {
  return ["en", "ka", "tr", "ru"]
    .map(function (l) {
      var active = l === current ? " is-active" : "";
      var pressed = l === current ? "true" : "false";
      return (
        '<a href="' +
        paths[l] +
        '" class="lang-btn' +
        active +
        '" data-lang="' +
        l +
        '" hreflang="' +
        l +
        '" aria-pressed="' +
        pressed +
        '">' +
        l.toUpperCase() +
        "</a>"
      );
    })
    .join("\n        ");
}

function chromeTop(c, paths) {
  return `
  <header class="site-header" id="site-header">
    <div class="container header-inner">
      <a href="../index.html" class="brand">
        <img src="../aura-logo.svg" alt="Aura Clinic" width="180" height="48" class="brand-logo" />
      </a>
      <button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="main-nav">
        <span class="nav-toggle-bar" aria-hidden="true"></span>
        <span class="nav-toggle-bar" aria-hidden="true"></span>
        <span class="nav-toggle-bar" aria-hidden="true"></span>
      </button>
      <nav class="nav-main" id="main-nav" aria-label="Main">
        <a href="../index.html">${esc(c.navHome)}</a>
        <a href="../index.html#analysis">${esc(c.navAnalysis)}</a>
        <a href="../blog.html">${esc(c.navBlog)}</a>
        <a href="#contact">${esc(c.navContact)}</a>
      </nav>
      <div class="lang-switcher" role="group" aria-label="Language">
        ${langSwitcher(paths, c.lang)}
      </div>
    </div>
    <div class="nav-backdrop" id="nav-backdrop" aria-hidden="true"></div>
  </header>`;
}

function chromeBottom(c, waKey) {
  return `
  <div id="cookie-banner" class="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie notice" hidden>
    <div class="cookie-banner-inner container">
      <p class="cookie-banner-text">
        <span>${esc(c.cookie1)}</span>
        <a href="../cookies.html">${esc(c.cookieLink)}</a><span>${esc(c.cookie2)}</span>
      </p>
      <button type="button" class="btn btn-primary cookie-banner-btn" id="cookie-accept">${esc(c.cookieOk)}</button>
    </div>
  </div>

  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img src="../aura-logo.svg" alt="" width="160" height="44" class="footer-logo brand-logo" />
        <p class="footer-tagline">${esc(c.footerTag)}</p>
      </div>
      <div class="footer-col">
        <p class="footer-heading">${esc(c.footerNav)}</p>
        <ul class="footer-links">
          <li><a href="../index.html">${esc(c.navHome)}</a></li>
          <li><a href="../index.html#analysis">${esc(c.navAnalysis)}</a></li>
          <li><a href="../blog.html">${esc(c.navBlog)}</a></li>
          <li><a href="#contact">${esc(c.navContact)}</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <p class="footer-heading">${esc(c.footerLegal)}</p>
        <ul class="footer-links">
          <li><a href="../impressum.html">${esc(c.legal)}</a></li>
          <li><a href="../datenschutz.html">${esc(c.privacy)}</a></li>
          <li><a href="../agb.html">${esc(c.terms)}</a></li>
          <li><a href="../cookies.html">${esc(c.cookies)}</a></li>
        </ul>
        <p class="footer-mail"><a href="mailto:info@auraclinicge.com">info@auraclinicge.com</a></p>
      </div>
    </div>
    <div class="container footer-bottom">
      <p class="footer-copy">${esc(c.rights)}</p>
    </div>
  </footer>

  <aside class="fab-social" aria-label="Social">
    <a class="fab-social-link" id="fab-instagram" href="https://www.instagram.com/auraclinicge/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
      <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    </a>
  </aside>

  <a class="fab-whatsapp" id="fab-whatsapp" href="https://wa.me/995557168876" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" data-whatsapp="${waKey}">
    <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>

  <script src="../js/site-config.js"></script>
  <script src="../js/attribution.js"></script>
  <script src="../js/analytics.js"></script>
  <script src="../js/google-ads.js"></script>
  <script src="../js/meta-pixel.js"></script>
  <script src="../js/whatsapp-links.js"></script>
  <script src="../js/i18n-data.js"></script>
  <script src="../js/site-chrome.js"></script>
  <script src="../js/form-helpers.js"></script>
  <script src="../js/landing-form.js" defer></script>
</body>
</html>`;
}

function contactBlock(c, waKey) {
  return `
    <section id="contact" class="contact section">
      <div class="container contact-inner">
        <h2>${esc(c.contactTitle)}</h2>
        <p class="contact-strong"><strong>Aura Clinic</strong></p>
        <p class="contact-address">${esc(c.address)}</p>
        <p>
          <a href="https://www.google.com/maps/search/?api=1&amp;query=129+Petre+Bagrationi+Str,+Batumi+6010,+Georgia" class="link-muted" target="_blank" rel="noopener noreferrer">${esc(c.map)}</a>
        </p>
        <p><a href="tel:+995557168876" class="link-muted">+995 557 16 88 76</a></p>
        <p class="contact-hours"><span>${esc(c.hoursLabel)}</span> <span>${esc(c.hours)}</span></p>
        <p><a href="mailto:info@auraclinicge.com" class="link-muted">info@auraclinicge.com</a></p>
        <p class="contact-actions">
          <a href="https://wa.me/995557168876" class="btn btn-primary btn--touch" data-whatsapp="${waKey}">${esc(c.waContact)}</a>
        </p>
      </div>
    </section>`;
}

function langOptions(selected) {
  return ["en", "ka", "tr", "ru"]
    .map(function (l) {
      return (
        '<option value="' +
        l +
        '"' +
        (l === selected ? " selected" : "") +
        ">" +
        l.toUpperCase() +
        "</option>"
      );
    })
    .join("");
}

function buildHair(c) {
  var pageUrl = HAIR_URLS[c.lang];
  var trust = c.trust
    .map(function (t) {
      return "<li>" + esc(t) + "</li>";
    })
    .join("\n            ");
  var who = c.whoItems
    .map(function (t) {
      return "<li>" + esc(t) + "</li>";
    })
    .join("\n            ");
  var steps = c.process
    .map(function (s, i) {
      return (
        "<li><span class=\"lp-step-num\" aria-hidden=\"true\">" +
        (i + 1) +
        '</span><div><h3>' +
        esc(s.t) +
        "</h3><p>" +
        esc(s.d) +
        "</p></div></li>"
      );
    })
    .join("\n          ");
  var faqs = c.faqs
    .map(function (f) {
      return (
        "<details><summary>" +
        esc(f.q) +
        "</summary><p>" +
        esc(f.a) +
        "</p></details>"
      );
    })
    .join("\n          ");
  var ageOpts = c.ageOptions
    .map(function (o, i) {
      return '<option value="' + esc(o) + '"' + (i === 0 ? " selected" : "") + ">" + esc(o) + "</option>";
    })
    .join("");
  var timeOpts = c.timelineOptions
    .map(function (o, i) {
      return '<option value="' + esc(o) + '"' + (i === 0 ? " selected" : "") + ">" + esc(o) + "</option>";
    })
    .join("");

  return (
    headCommon(c, HAIR_URLS, pageUrl, c.serviceName) +
    `
<body class="has-sticky-cta" data-page-type="hair_transplant_landing" data-service="hair_transplant" data-lang="${c.lang}">
  <!-- TODO_CLINIC: doctor name, certificates, real results gallery, patient reviews, pricing -->
${chromeTop(c, HAIR_PATHS)}

  <main>
    <section id="hero" class="lp-hero">
      <div class="lp-hero-bg" aria-hidden="true">
        <picture>
          <source srcset="../media/media-hero.avif" type="image/avif" />
          <source srcset="../media/media-hero.webp" type="image/webp" />
          <img src="../media/media-hero.png" alt="" width="1440" height="900" loading="eager" decoding="async" />
        </picture>
      </div>
      <div class="container">
        <p class="lp-hero-eyebrow">${esc(c.eyebrow)}</p>
        <h1>${esc(c.h1)}</h1>
        <p class="lp-hero-lead">${esc(c.lead)}</p>
        <div class="lp-cta-row">
          <a href="#lead-form" class="btn btn-primary">${esc(c.cta1)}</a>
          <a href="https://wa.me/995557168876" class="btn btn-ghost" data-whatsapp="hair_transplant">${esc(c.cta2)}</a>
        </div>
      </div>
    </section>

    <section class="lp-trust" aria-label="Trust">
      <div class="container">
        <ul class="lp-trust-list">
            ${trust}
        </ul>
      </div>
    </section>

    <section id="techniques" class="section">
      <div class="container">
        <header class="section-head">
          <h2>${esc(c.sectionFueTitle)}</h2>
        </header>
        <div class="lp-grid-2">
          <article class="lp-panel">
            <h3>${esc(c.fueTitle)}</h3>
            <p>${esc(c.fueText)}</p>
          </article>
          <article class="lp-panel">
            <h3>${esc(c.dhiTitle)}</h3>
            <p>${esc(c.dhiText)}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="who" class="section">
      <div class="container">
        <header class="section-head">
          <h2>${esc(c.whoTitle)}</h2>
          <p class="section-sub">${esc(c.whoIntro)}</p>
        </header>
        <ul class="lp-checklist">
            ${who}
        </ul>
      </div>
    </section>

    <section id="process" class="section">
      <div class="container">
        <header class="section-head">
          <h2>${esc(c.processTitle)}</h2>
        </header>
        <ol class="lp-steps">
          ${steps}
        </ol>
      </div>
    </section>

    <section id="international" class="section">
      <div class="container">
        <header class="section-head">
          <h2>${esc(c.intlTitle)}</h2>
        </header>
        <p>${esc(c.intlText)}</p>
        <p class="section-sub">${esc(c.intlNote)}</p>
        <!-- TODO_CLINIC: transfer/hotel partner details after clinic confirmation -->
      </div>
    </section>

    <!-- TODO_CLINIC: doctor/team cards omitted until verified credentials are provided -->
    <!-- TODO_CLINIC: real before/after gallery omitted — no placeholder images -->
    <!-- TODO_CLINIC: patient reviews omitted — no fabricated testimonials -->

    <section id="faq" class="section lp-faq">
      <div class="container">
        <header class="section-head">
          <h2>${esc(c.faqTitle)}</h2>
        </header>
          ${faqs}
      </div>
    </section>

    <section id="lead-form" class="section">
      <div class="container">
        <div class="card lead-inner" style="max-width:36rem;margin-inline:auto">
          <h2>${esc(c.formTitle)}</h2>
          <p class="section-sub">${esc(c.formSub)}</p>
          <div class="landing-form-success form-success" hidden role="status"></div>
          <div class="landing-form-error form-error" hidden role="alert"></div>
          <form class="lead-form landing-lead-form" data-form-name="hair_landing_lead" novalidate>
            <input type="hidden" name="service" value="hair_transplant" />
            <input type="hidden" name="form_started_at" value="" />
            <label class="field visually-hidden" aria-hidden="true">
              <span>Website</span>
              <input type="text" name="website" tabindex="-1" autocomplete="off" />
            </label>
            <label class="field">
              <span>${esc(c.labelName)}</span>
              <input type="text" name="name" autocomplete="name" required />
            </label>
            <label class="field">
              <span>${esc(c.labelPhone)}</span>
              <input type="tel" name="phone" autocomplete="tel" required />
            </label>
            <label class="field">
              <span>${esc(c.labelEmail)}</span>
              <input type="email" name="email" autocomplete="email" />
            </label>
            <label class="field">
              <span>${esc(c.labelAge)}</span>
              <select name="age_range">${ageOpts}</select>
            </label>
            <label class="field">
              <span>${esc(c.labelTimeline)}</span>
              <select name="timeline">${timeOpts}</select>
            </label>
            <label class="field">
              <span>${esc(c.labelCountry)}</span>
              <input type="text" name="country" autocomplete="country-name" />
            </label>
            <label class="field">
              <span>${esc(c.labelLang)}</span>
              <select name="lang">${langOptions(c.lang)}</select>
            </label>
            <label class="check-row">
              <input type="checkbox" name="consent" value="1" required />
              <span>${esc(c.consent)} <a href="../datenschutz.html">${esc(c.privacyLink)}</a></span>
            </label>
            <label class="check-row">
              <input type="checkbox" name="marketing_consent" value="1" />
              <span>${esc(c.marketing)}</span>
            </label>
            <button type="submit" class="btn btn-primary btn-block btn--touch">${esc(c.submit)}</button>
          </form>
        </div>
      </div>
    </section>

${contactBlock(c, "hair_transplant")}
  </main>

  <div class="mobile-sticky-cta" role="group" aria-label="CTA">
    <a href="#lead-form" class="btn btn-primary">${esc(c.sticky1)}</a>
    <a href="https://wa.me/995557168876" class="btn btn-ghost" data-whatsapp="hair_transplant">${esc(c.sticky2)}</a>
  </div>
` +
    chromeBottom(c, "hair_transplant")
  );
}

function buildBotox(c) {
  var pageUrl = BOTOX_URLS[c.lang];
  var areas = c.areas
    .map(function (a) {
      return "<li>" + esc(a) + "</li>";
    })
    .join("\n            ");
  var steps = c.assessSteps
    .map(function (s, i) {
      return (
        "<li><span class=\"lp-step-num\" aria-hidden=\"true\">" +
        (i + 1) +
        '</span><div><h3>' +
        esc(s.t) +
        "</h3><p>" +
        esc(s.d) +
        "</p></div></li>"
      );
    })
    .join("\n          ");
  var faqs = c.faqs
    .map(function (f) {
      return (
        "<details><summary>" +
        esc(f.q) +
        "</summary><p>" +
        esc(f.a) +
        "</p></details>"
      );
    })
    .join("\n          ");
  var interest = c.interestOptions
    .map(function (o) {
      return '<option value="' + esc(o.v) + '">' + esc(o.l) + "</option>";
    })
    .join("");
  var times = c.timeOptions
    .map(function (o) {
      return '<option value="' + esc(o) + '">' + esc(o) + "</option>";
    })
    .join("");

  return (
    headCommon(c, BOTOX_URLS, pageUrl, c.serviceName) +
    `
<body class="has-sticky-cta" data-page-type="botox_filler_landing" data-service="botox_filler" data-lang="${c.lang}">
  <!-- TODO_CLINIC: doctor name, certificates, real results gallery, patient reviews, pricing, product brands after clinic confirmation -->
${chromeTop(c, BOTOX_PATHS)}

  <main>
    <section id="hero" class="lp-hero">
      <div class="lp-hero-bg" aria-hidden="true">
        <picture>
          <source srcset="../media/media-hero.avif" type="image/avif" />
          <source srcset="../media/media-hero.webp" type="image/webp" />
          <img src="../media/media-hero.png" alt="" width="1440" height="900" loading="eager" decoding="async" />
        </picture>
      </div>
      <div class="container">
        <p class="lp-hero-eyebrow">${esc(c.eyebrow)}</p>
        <h1>${esc(c.h1)}</h1>
        <p class="lp-hero-lead">${esc(c.lead)}</p>
        <div class="lp-cta-row">
          <a href="https://wa.me/995557168876" class="btn btn-primary" data-whatsapp="botox_filler">${esc(c.cta1)}</a>
          <a href="#lead-form" class="btn btn-ghost">${esc(c.cta2)}</a>
        </div>
      </div>
    </section>

    <section id="botox" class="section">
      <div class="container">
        <header class="section-head"><h2>${esc(c.botoxTitle)}</h2></header>
        <p>${esc(c.botoxText)}</p>
      </div>
    </section>

    <section id="fillers" class="section">
      <div class="container">
        <header class="section-head"><h2>${esc(c.fillerTitle)}</h2></header>
        <p>${esc(c.fillerText)}</p>
      </div>
    </section>

    <section id="areas" class="section">
      <div class="container">
        <header class="section-head"><h2>${esc(c.areasTitle)}</h2></header>
        <ul class="lp-areas">
            ${areas}
        </ul>
      </div>
    </section>

    <section id="assessment" class="section">
      <div class="container">
        <header class="section-head"><h2>${esc(c.assessTitle)}</h2></header>
        <ol class="lp-steps">
          ${steps}
        </ol>
      </div>
    </section>

    <section id="care" class="section">
      <div class="container">
        <header class="section-head"><h2>${esc(c.careTitle)}</h2></header>
        <p>${esc(c.careText)}</p>
        <!-- TODO_CLINIC: clinic-verified before/after care details (no brand/dose/duration claims until confirmed) -->
      </div>
    </section>

    <!-- TODO_CLINIC: doctor/team cards omitted until verified credentials are provided -->
    <!-- TODO_CLINIC: real before/after gallery omitted — no placeholder images -->
    <!-- TODO_CLINIC: patient reviews omitted — no fabricated testimonials -->

    <section id="faq" class="section lp-faq">
      <div class="container">
        <header class="section-head"><h2>${esc(c.faqTitle)}</h2></header>
          ${faqs}
      </div>
    </section>

    <section id="lead-form" class="section">
      <div class="container">
        <div class="card lead-inner" style="max-width:36rem;margin-inline:auto">
          <h2>${esc(c.formTitle)}</h2>
          <p class="section-sub">${esc(c.formSub)}</p>
          <div class="landing-form-success form-success" hidden role="status"></div>
          <div class="landing-form-error form-error" hidden role="alert"></div>
          <form class="lead-form landing-lead-form" data-form-name="botox_landing_lead" novalidate>
            <input type="hidden" name="service" value="botox_filler" />
            <input type="hidden" name="form_started_at" value="" />
            <label class="field visually-hidden" aria-hidden="true">
              <span>Website</span>
              <input type="text" name="website" tabindex="-1" autocomplete="off" />
            </label>
            <label class="field">
              <span>${esc(c.labelName)}</span>
              <input type="text" name="name" autocomplete="name" required />
            </label>
            <label class="field">
              <span>${esc(c.labelPhone)}</span>
              <input type="tel" name="phone" autocomplete="tel" required />
            </label>
            <label class="field">
              <span>${esc(c.labelLang)}</span>
              <select name="lang">${langOptions(c.lang)}</select>
            </label>
            <label class="field">
              <span>${esc(c.labelInterest)}</span>
              <select name="interest">${interest}</select>
            </label>
            <label class="field">
              <span>${esc(c.labelTime)}</span>
              <select name="preferred_time">${times}</select>
            </label>
            <label class="field">
              <span>${esc(c.labelMessage)}</span>
              <textarea name="message" rows="4"></textarea>
            </label>
            <label class="check-row">
              <input type="checkbox" name="consent" value="1" required />
              <span>${esc(c.consent)} <a href="../datenschutz.html">${esc(c.privacyLink)}</a></span>
            </label>
            <label class="check-row">
              <input type="checkbox" name="marketing_consent" value="1" />
              <span>${esc(c.marketing)}</span>
            </label>
            <button type="submit" class="btn btn-primary btn-block btn--touch">${esc(c.submit)}</button>
          </form>
        </div>
      </div>
    </section>

${contactBlock(c, "botox_filler")}
  </main>

  <div class="mobile-sticky-cta" role="group" aria-label="CTA">
    <a href="https://wa.me/995557168876" class="btn btn-primary" data-whatsapp="botox_filler">${esc(c.sticky1)}</a>
    <a href="#lead-form" class="btn btn-ghost">${esc(c.sticky2)}</a>
  </div>
` +
    chromeBottom(c, "botox_filler")
  );
}

["en", "tr", "ka", "ru"].forEach(function (lang) {
  ["en", "tr", "ka", "ru"].forEach(function () {});
  var hair = HAIR[lang];
  var botox = BOTOX[lang];
  var hairPath = path.join(root, hair.file);
  var botoxPath = path.join(root, botox.file);
  fs.mkdirSync(path.dirname(hairPath), { recursive: true });
  fs.mkdirSync(path.dirname(botoxPath), { recursive: true });
  fs.writeFileSync(hairPath, buildHair(hair), "utf8");
  fs.writeFileSync(botoxPath, buildBotox(botox), "utf8");
  console.log("Wrote", hair.file);
  console.log("Wrote", botox.file);
});

console.log("Done.");

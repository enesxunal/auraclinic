/**
 * Hairgent — i18n, stepper, protocol engine, lead form
 * Ana dil: de
 */

(function () {
  "use strict";

  /** @type {Record<string, Record<string, string>>} */
  const I18N = {
    de: {
      "nav.home": "Start",
      "nav.services": "Leistungen",
      "nav.about": "Über uns",
      "nav.analysis": "Analyse",
      "nav.contact": "Kontakt",
      "nav.menuOpen": "Menü öffnen",
      "nav.menuClose": "Menü schließen",
      "hero.eyebrow": "Medizinische Haar-Expertise · Düsseldorf",
      "hero.title": "Präzision. Natürlichkeit. Vertrauen.",
      "hero.lead":
        "Hairgent verbindet deutsche medizinische Standards mit modernster Technik — für Ergebnisse, die zu Ihnen passen.",
      "hero.cta": "Zur kostenlosen Analyse",
      "about.title": "Klinik mit klarem Fokus",
      "about.p1":
        "In Düsseldorf begleiten wir Patientinnen und Patienten mit transparenter Beratung und individuellen Behandlungsplänen — von der ersten Analyse bis zur Nachsorge.",
      "about.p2":
        "Unser Ansatz: ruhige Ästhetik, evidenzbasierte Methoden und eine Atmosphäre, in der Sie sich sicher fühlen.",
      "about.note":
        "Wir erklären Chancen und Grenzen ehrlich — ohne unrealistische Versprechen.",
      "about.li1": "DHI & FUE nach medizinischen Kriterien",
      "about.li2": "Persönliche Protokolle statt Standardlösungen",
      "about.li3": "Diskrete Betreuung in deutscher Sprache",
      "services.title": "Behandlungsschwerpunkte",
      "services.p1":
        "Von der Haarlinie bis zur Dichte — wir planen Ihren Eingriff mit klarer medizinischer Begründung und realistischen Erwartungen.",
      "services.note":
        "Jede Kopfhaut ist anders — deshalb planen wir individuell, ohne Einheitslösungen.",
      "services.li1": "Haartransplantation (FUE / DHI)",
      "services.li2": "Beratung & digitale Haar-Analyse",
      "services.li3": "Nachsorge & Verlaufskontrolle",
      "analysis.sectionTitle": "Interaktive Haar-Analyse",
      "analysis.sectionSub":
        "Fünf kurze Schritte — danach erhalten Sie ein persönliches Hairgent-Protokoll.",
      "analysis.step": "Schritt",
      "analysis.back": "Zurück",
      "analysis.next": "Weiter",
      "analysis.finish": "Weiter zum Report",
      "analysis.pickOne": "Bitte nur eine Antwort auswählen (Einzelauswahl).",
      "q.gender": "Geschlecht",
      "q.age": "Alter",
      "q.area": "Zielregion",
      "q.severity": "Haarausfall — Schweregrad",
      "q.goal": "Hauptziel",
      "opt.male": "Männlich",
      "opt.female": "Weiblich",
      "opt.age1825": "18–25",
      "opt.age2645": "26–45",
      "opt.age45": "45+",
      "opt.hairline": "Haaransatz (frontal)",
      "opt.crown": "Scheitel (Vertex)",
      "opt.full": "Gesamtkopfhaut",
      "opt.beard": "Bart / Augenbrauen",
      "opt.light": "Leicht (dünner werdend)",
      "opt.moderate": "Mittel (sichtbare Kopfhaut)",
      "opt.advanced": "Stark (kahle Areale)",
      "opt.density": "Maximale Dichte",
      "opt.natural": "Natürlicher Look",
      "opt.reconstruction": "Rekonstruktion",
      "lead.title":
        "Geben Sie Ihre Daten an, um Ihren detaillierten Analyse-Report zu erhalten.",
      "lead.name": "Name",
      "lead.email": "E-Mail",
      "lead.phone": "Telefon",
      "lead.privacy": "Ihre Daten werden nur zur Bearbeitung Ihrer Anfrage verwendet.",
      "lead.submit": "Report anfordern",
      "lead.success":
        "Vielen Dank — Ihr persönlicher Report erscheint unten. Die Angaben wurden an unsere Praxis übermittelt.",
      "lead.error": "Senden fehlgeschlagen. Bitte versuchen Sie es später erneut oder schreiben Sie an info@hairgent.de",
      "footer.contactTitle": "Kontakt",
      "footer.tagline": "Haarästhetik mit medizinischer Klarheit — in Düsseldorf.",
      "footer.colNav": "Navigation",
      "footer.colLegal": "Rechtliches",
      "footer.linkImpressum": "Impressum",
      "footer.linkPrivacy": "Datenschutz",
      "footer.linkAGB": "AGB",
      "footer.linkCookies": "Cookies",
      "cookie.bannerPart1":
        "Wir verwenden nur technisch notwendige Funktionen und — nach Ihrer Einwilligung — ggf. Analyse-Tools. Mehr in der ",
      "cookie.bannerLink": "Cookie-Richtlinie",
      "cookie.bannerPart2": ".",
      "cookie.accept": "Verstanden",
      "footer.disclaimer":
        "Hinweis: Diese Analyse ersetzt keine ärztliche Diagnose. Individuelle Beratung in der Praxis.",
      "footer.rights": "© Hairgent. Alle Rechte vorbehalten.",
      "tech.dhiPrecision": "DHI-Präzisionstechnik",
      "tech.fueMega": "FUE-Mega-Session",
      "tech.nonShavenDhi": "Non-Shaven DHI (unrasierte Technik)",
      "tech.individual": "Individueller FUE/DHI-Plan",
      "graft.light": "1500–2500",
      "graft.moderate": "2500–4000",
      "graft.advanced": "4500+",
      "recovery.text": "Voraussichtliche Heilungszeit: 7–10 Tage.",
      "result.title": "Ihr Hairgent-Protokoll: {id}",
      "result.body":
        "Basierend auf Ihrer Analyse empfehlen wir die {technique}. Ihr geschätzter Bedarf liegt bei {grafts} Grafts.",
      "report.screenTitle": "Ihr persönlicher Analyse-Report",
      "report.sectionChoices": "Ihre Angaben",
      "report.lblGender": "Geschlecht",
      "report.lblAge": "Alter",
      "report.lblArea": "Zielregion",
      "report.lblSeverity": "Schweregrad",
      "report.lblGoal": "Hauptziel",
      "report.sectionRecommendation": "Empfehlung",
      "report.graftIntro": "Geschätzter Graft-Bedarf (Bandbreite):",
      "report.insight.nonShavenDhi.density":
        "Non-Shaven DHI erlaubt oft starke Verdichtung, ohne die gesamte Kopfhaut zu rasieren — passend zu Ihrem Dichte-Fokus.",
      "report.insight.nonShavenDhi.natural":
        "Für einen natürlichen Übergang eignet sich die unrasierte Technik besonders, wenn bestehendes Haar geschont werden soll.",
      "report.insight.nonShavenDhi.reconstruction":
        "Bei rekonstruktiven Zielen unterstützt Non-Shaven DHI eine präzise Kantenbildung mit geringerer Sichtbarkeit der OP-Phase.",
      "report.insight.fueMega.density":
        "FUE-Mega-Sessions können große Volumina in geplanten Sitzungen adressieren — relevant bei hohem Bedarf und ausgedehnten Arealen.",
      "report.insight.fueMega.natural":
        "Auch bei Mega-Sessions liegt der Fokus auf gleichmäßiger, natürlicher Verteilung — nicht auf maximal sichtbarer Dichte auf einmal.",
      "report.insight.fueMega.reconstruction":
        "Umfangreiche Kahlfelder erfordern oft mehrere Phasen; die Mega-Session ist ein Baustein einer Gesamtstrategie.",
      "report.insight.dhiPrecision.density":
        "DHI erlaubt feine Kontrolle pro Einheit — hilfreich, wenn gezielt Dichte an Haaransatz oder Bartlinie aufgebaut werden soll.",
      "report.insight.dhiPrecision.natural":
        "Die Direktimplantation unterstützt natürliche Winkel und Übergänge — typisch für Frontbereiche und sichtbare Linien.",
      "report.insight.dhiPrecision.reconstruction":
        "Für definierte neue Grenzen (Haarlinie/Bart) kann DHI präzise Winkel pro Follikeleinheit ermöglichen.",
      "report.insight.individual.density":
        "Ihre Kombination spricht für einen individuellen Mischplan aus FUE/DHI — Dichte nach Befund und Spenderkapazität abstimmen.",
      "report.insight.individual.natural":
        "Ein natürlicher Gesamtlook entsteht oft aus Mischtechniken und realistischer Planung über mehrere Monate.",
      "report.insight.individual.reconstruction":
        "Rekonstruktion ohne eindeutigen Standardweg: persönliche Abstimmung von Areal, Technik und Sitzungen ist sinnvoll.",
      "report.severityContext.light":
        "Leichter Ausfall: oft konservative Optionen mit Fokus auf Erhalt und gezielte Auffüllung möglich.",
      "report.severityContext.moderate":
        "Mittlerer Ausfall: Dichte und Deckung sollten Spenderreserven und Gesamtbild berücksichtigen.",
      "report.severityContext.advanced":
        "Stärkerer Ausfall: realistische Erwartungen, ggf. mehrstufige Planung und klare Prioritäten bei der Fläche.",
      "report.insightFallback":
        "Wir empfehlen eine individuelle Vor-Ort-Beratung zur finalen Technik- und Sitzungsplanung.",
      "report.footerNote":
        "Diese Auswertung ersetzt keine ärztliche Untersuchung und keine verbindliche Therapieempfehlung.",
    },
    tr: {
      "nav.home": "Ana sayfa",
      "nav.services": "Hizmetler",
      "nav.about": "Hakkımızda",
      "nav.analysis": "Analiz",
      "nav.contact": "İletişim",
      "nav.menuOpen": "Menüyü aç",
      "nav.menuClose": "Menüyü kapat",
      "hero.eyebrow": "Medikal saç uzmanlığı · Düsseldorf",
      "hero.title": "Hassasiyet. Doğallık. Güven.",
      "hero.lead":
        "Hairgent, Alman medikal standartları modern teknikle birleştirir — size uygun sonuçlar için.",
      "hero.cta": "Ücretsiz analize başla",
      "about.title": "Net odaklı klinik",
      "about.p1":
        "Düsseldorf’da şeffaf danışmanlık ve kişisel tedavi planlarıyla hastalarımıza eşlik ediyoruz — ilk analizden kontrol sürecine kadar.",
      "about.p2":
        "Yaklaşımımız: sakin estetik, kanıta dayalı yöntemler ve kendinizi güvende hissettiren bir ortam.",
      "about.note":
        "Fırsatları ve sınırları dürüstçe anlatırız — gerçekçi olmayan vaat yok.",
      "about.li1": "Medikal kriterlere uygun DHI ve FUE",
      "about.li2": "Standart yerine kişisel protokoller",
      "about.li3": "Almanca destekli, gizli takip",
      "services.title": "Hizmet alanları",
      "services.p1":
        "Saç çizgisinden yoğunluğa — müdahalenizi net tıbbi gerekçe ve gerçekçi beklentilerle planlıyoruz.",
      "services.note":
        "Her saç derisi farklıdır — bu yüzden tek tip çözüm yerine kişisel planlama.",
      "services.li1": "Saç ekimi (FUE / DHI)",
      "services.li2": "Danışmanlık ve dijital saç analizi",
      "services.li3": "Takip ve kontroller",
      "analysis.sectionTitle": "Interaktif saç analizi",
      "analysis.sectionSub":
        "Beş kısa adım — ardından kişisel Hairgent protokolünüz.",
      "analysis.step": "Adım",
      "analysis.back": "Geri",
      "analysis.next": "İleri",
      "analysis.finish": "Rapor için devam",
      "analysis.pickOne": "Lütfen yalnızca bir seçenek işaretleyin (tek seçim).",
      "q.gender": "Cinsiyet",
      "q.age": "Yaş",
      "q.area": "Hedef bölge",
      "q.severity": "Saç dökülmesi — şiddet",
      "q.goal": "Ana hedef",
      "opt.male": "Erkek",
      "opt.female": "Kadın",
      "opt.age1825": "18–25",
      "opt.age2645": "26–45",
      "opt.age45": "45+",
      "opt.hairline": "Ön çizgi (frontal)",
      "opt.crown": "Tepe (vertex)",
      "opt.full": "Tüm saç derisi",
      "opt.beard": "Sakal / kaş",
      "opt.light": "Hafif (incelme)",
      "opt.moderate": "Orta (deri görünür)",
      "opt.advanced": "İleri (kellik alanları)",
      "opt.density": "Maksimum yoğunluk",
      "opt.natural": "Doğal görünüm",
      "opt.reconstruction": "Rekonstrüksiyon",
      "lead.title":
        "Detaylı analiz raporunuzu almak için iletişim bilgilerinizi girin.",
      "lead.name": "Ad Soyad",
      "lead.email": "E-posta",
      "lead.phone": "Telefon",
      "lead.privacy": "Verileriniz yalnızca talebinizi yanıtlamak için kullanılır.",
      "lead.submit": "Raporu iste",
      "lead.success":
        "Teşekkürler — kişisel raporunuz aşağıda. Bilgiler kliniğimize iletildi.",
      "lead.error": "Gönderim başarısız. Lütfen sonra tekrar deneyin veya info@hairgent.de yazın.",
      "footer.contactTitle": "İletişim",
      "footer.tagline": "Düsseldorf’da net tıbbi çerçeveyle saç estetiği.",
      "footer.colNav": "Menü",
      "footer.colLegal": "Yasal",
      "footer.linkImpressum": "Künye (Impressum)",
      "footer.linkPrivacy": "Gizlilik (GDPR)",
      "footer.linkAGB": "Genel şartlar (AGB)",
      "footer.linkCookies": "Çerez politikası",
      "cookie.bannerPart1":
        "Yalnızca teknik olarak gerekli işlevler ve — onayınızla — analiz araçları kullanılabilir. Detaylar: ",
      "cookie.bannerLink": "Çerez politikası",
      "cookie.bannerPart2": ".",
      "cookie.accept": "Anladım",
      "footer.disclaimer":
        "Not: Bu analiz tıbbi tanı yerine geçmez. Bireysel muayene klinikte yapılır.",
      "footer.rights": "© Hairgent. Tüm hakları saklıdır.",
      "tech.dhiPrecision": "DHI hassas teknik",
      "tech.fueMega": "FUE mega seans",
      "tech.nonShavenDhi": "Traşsız DHI (unrasierte teknik)",
      "tech.individual": "Kişiselleştirilmiş FUE/DHI planı",
      "graft.light": "1500–2500",
      "graft.moderate": "2500–4000",
      "graft.advanced": "4500+",
      "recovery.text": "Tahmini iyileşme süresi: 7–10 gün.",
      "result.title": "Hairgent protokolünüz: {id}",
      "result.body":
        "Analizinize göre {technique} öneriyoruz. Tahmini ihtiyaç: {grafts} greft.",
      "report.screenTitle": "Kişisel analiz raporunuz",
      "report.sectionChoices": "Seçimleriniz",
      "report.lblGender": "Cinsiyet",
      "report.lblAge": "Yaş",
      "report.lblArea": "Hedef bölge",
      "report.lblSeverity": "Şiddet",
      "report.lblGoal": "Ana hedef",
      "report.sectionRecommendation": "Öneri",
      "report.graftIntro": "Tahmini greft ihtiyacı (aralık):",
      "report.insight.nonShavenDhi.density":
        "Traşsız DHI, tüm başı tıraş etmeden yoğunluk artışına izin verebilir — yoğunluk hedefinize uyar.",
      "report.insight.nonShavenDhi.natural":
        "Mevcut saç korunacaksa ve doğal geçiş isteniyorsa traşsız teknik özellikle uygundur.",
      "report.insight.nonShavenDhi.reconstruction":
        "Rekonstrüksiyonda traşsız DHI, net hatlar ve ameliyat döneminin daha az görünür olmasına yardımcı olabilir.",
      "report.insight.fueMega.density":
        "FUE mega seanslar, geniş alanlarda ve yüksek ihtiyaçta planlı oturumlarda büyük hacim hedefler.",
      "report.insight.fueMega.natural":
        "Mega seanslarda da odak eşit, doğal dağılımdır — tek seferde aşırı görünür yoğunluk değil.",
      "report.insight.fueMega.reconstruction":
        "Geniş dökülme alanlarında çoğu zaman çok aşamalı plan gerekir; mega seans genel stratejinin bir parçasıdır.",
      "report.insight.dhiPrecision.density":
        "DHI, greft başına ince kontrol sağlar — ön çizgi veya sakal hattında hedefli yoğunluk için uygundur.",
      "report.insight.dhiPrecision.natural":
        "Doğrudan implantasyon, açı ve geçişlerin doğal görünmesine yardımcı olur — ön bölge ve görünür çizgiler için tipiktir.",
      "report.insight.dhiPrecision.reconstruction":
        "Yeni net sınırlar (saç çizgisi/sakal) için DHI, folikül başına hassas açı yerleşimine olanak verir.",
      "report.insight.individual.density":
        "Kombinasyonunuz FUE/DHI karışık kişisel plana işaret eder — yoğunluk bulgu ve donör kapasitesine göre ayarlanır.",
      "report.insight.individual.natural":
        "Doğal genel görünüm genelde karışık teknikler ve aylar süren gerçekçi planlama ile oluşur.",
      "report.insight.individual.reconstruction":
        "Standart tek yol olmayan rekonstrüksiyon: alan, teknik ve seansların bireysel planlanması önemlidir.",
      "report.severityContext.light":
        "Hafif dökülme: koruma ve hedefli doldurma odaklı daha muhafazakâr seçenekler sık mümkündür.",
      "report.severityContext.moderate":
        "Orta şiddet: yoğunluk ve örtü, donör rezervi ve genel görünümle birlikte planlanmalıdır.",
      "report.severityContext.advanced":
        "İleri düzey: gerçekçi beklenti, çok aşamalı plan ve alan öncelikleri netleştirilmelidir.",
      "report.insightFallback":
        "Nihai teknik ve seans planı için yüz yüze bireysel danışmanlık öneriyoruz.",
      "report.footerNote":
        "Bu değerlendirme tıbbi muayene veya bağlayıcı tedavi önerisi yerine geçmez.",
    },
    en: {
      "nav.home": "Home",
      "nav.services": "Services",
      "nav.about": "About",
      "nav.analysis": "Analysis",
      "nav.contact": "Contact",
      "nav.menuOpen": "Open menu",
      "nav.menuClose": "Close menu",
      "hero.eyebrow": "Medical hair expertise · Düsseldorf",
      "hero.title": "Precision. Natural results. Trust.",
      "hero.lead":
        "Hairgent combines German medical standards with modern technique — for outcomes that fit you.",
      "hero.cta": "Start your free analysis",
      "about.title": "A clinic with clear focus",
      "about.p1":
        "In Düsseldorf we support patients with transparent counselling and individual treatment plans — from first analysis to aftercare.",
      "about.p2":
        "Our approach: calm aesthetics, evidence-based methods, and an atmosphere where you feel safe.",
      "about.note":
        "We explain opportunities and limits honestly — no unrealistic promises.",
      "about.li1": "DHI & FUE aligned with medical criteria",
      "about.li2": "Personal protocols instead of one-size-fits-all",
      "about.li3": "Discreet care in German",
      "services.title": "Treatment focus",
      "services.p1":
        "From the hairline to density — we plan your procedure with clear medical rationale and realistic expectations.",
      "services.note":
        "Every scalp is different — we plan individually, not one-size-fits-all.",
      "services.li1": "Hair transplantation (FUE / DHI)",
      "services.li2": "Consultation & digital hair analysis",
      "services.li3": "Aftercare & follow-up",
      "analysis.sectionTitle": "Interactive hair analysis",
      "analysis.sectionSub":
        "Five short steps — then your personal Hairgent protocol.",
      "analysis.step": "Step",
      "analysis.back": "Back",
      "analysis.next": "Next",
      "analysis.finish": "Continue to report",
      "analysis.pickOne": "Please select only one answer (single choice).",
      "q.gender": "Gender",
      "q.age": "Age",
      "q.area": "Target area",
      "q.severity": "Hair loss severity",
      "q.goal": "Main goal",
      "opt.male": "Male",
      "opt.female": "Female",
      "opt.age1825": "18–25",
      "opt.age2645": "26–45",
      "opt.age45": "45+",
      "opt.hairline": "Hairline (frontal)",
      "opt.crown": "Crown (vertex)",
      "opt.full": "Full scalp",
      "opt.beard": "Beard / eyebrows",
      "opt.light": "Light (slight thinning)",
      "opt.moderate": "Moderate (visible scalp)",
      "opt.advanced": "Advanced (bald areas)",
      "opt.density": "Maximum density",
      "opt.natural": "Natural look",
      "opt.reconstruction": "Reconstruction",
      "lead.title":
        "Enter your details to receive your detailed analysis report.",
      "lead.name": "Name",
      "lead.email": "Email",
      "lead.phone": "Phone",
      "lead.privacy": "Your data will only be used to process your request.",
      "lead.submit": "Request report",
      "lead.success":
        "Thank you — your personal report is below. Your details were sent to our practice.",
      "lead.error": "Could not send. Please try again later or email info@hairgent.de",
      "footer.contactTitle": "Contact",
      "footer.tagline": "Hair aesthetics with medical clarity — in Düsseldorf.",
      "footer.colNav": "Navigation",
      "footer.colLegal": "Legal",
      "footer.linkImpressum": "Legal notice (Impressum)",
      "footer.linkPrivacy": "Privacy policy",
      "footer.linkAGB": "Terms (AGB)",
      "footer.linkCookies": "Cookie policy",
      "cookie.bannerPart1":
        "We only use technically necessary features and — with your consent — optional analytics. More in our ",
      "cookie.bannerLink": "cookie policy",
      "cookie.bannerPart2": ".",
      "cookie.accept": "OK",
      "footer.disclaimer":
        "Note: This analysis does not replace a medical diagnosis. Individual consultation takes place at the clinic.",
      "footer.rights": "© Hairgent. All rights reserved.",
      "tech.dhiPrecision": "DHI precision technique",
      "tech.fueMega": "FUE mega session",
      "tech.nonShavenDhi": "Non-shaven DHI (unshaven technique)",
      "tech.individual": "Individual FUE/DHI plan",
      "graft.light": "1500–2500",
      "graft.moderate": "2500–4000",
      "graft.advanced": "4500+",
      "recovery.text": "Expected healing time: 7–10 days.",
      "result.title": "Your Hairgent protocol: {id}",
      "result.body":
        "Based on your analysis we recommend {technique}. Your estimated need is {grafts} grafts.",
      "report.screenTitle": "Your personal analysis report",
      "report.sectionChoices": "Your selections",
      "report.lblGender": "Gender",
      "report.lblAge": "Age",
      "report.lblArea": "Target area",
      "report.lblSeverity": "Severity",
      "report.lblGoal": "Main goal",
      "report.sectionRecommendation": "Recommendation",
      "report.graftIntro": "Estimated graft need (range):",
      "report.insight.nonShavenDhi.density":
        "Non-shaven DHI often allows meaningful density without shaving the whole scalp — aligned with your density focus.",
      "report.insight.nonShavenDhi.natural":
        "When existing hair should be preserved, the unshaven approach supports a natural transition.",
      "report.insight.nonShavenDhi.reconstruction":
        "For reconstructive goals, non-shaven DHI can help define edges while keeping the procedure phase less visible.",
      "report.insight.fueMega.density":
        "FUE mega sessions can address large volumes in planned sittings — relevant for extensive areas and higher need.",
      "report.insight.fueMega.natural":
        "Even in mega sessions the emphasis is on even, natural distribution — not maximal visible density in one step.",
      "report.insight.fueMega.reconstruction":
        "Large bald areas often need several phases; the mega session is one building block of an overall strategy.",
      "report.insight.dhiPrecision.density":
        "DHI allows fine control per unit — useful when building density precisely at the hairline or beard line.",
      "report.insight.dhiPrecision.natural":
        "Direct implantation supports natural angles and transitions — typical for frontal zones and visible lines.",
      "report.insight.dhiPrecision.reconstruction":
        "For clear new boundaries (hairline/beard), DHI can enable precise angulation per follicle unit.",
      "report.insight.individual.density":
        "Your combination suggests an individual FUE/DHI mix — density tuned to findings and donor capacity.",
      "report.insight.individual.natural":
        "A natural overall look often comes from mixed techniques and realistic planning over months.",
      "report.insight.individual.reconstruction":
        "Reconstruction without a single standard path: personal alignment of area, technique, and sessions matters.",
      "report.severityContext.light":
        "Mild loss: conservative options focused on preservation and targeted filling are often possible.",
      "report.severityContext.moderate":
        "Moderate loss: density and coverage should account for donor reserves and the overall picture.",
      "report.severityContext.advanced":
        "Advanced loss: realistic expectations, possibly staged planning, and clear priorities by area.",
      "report.insightFallback":
        "We recommend an in-person consultation for final technique and session planning.",
      "report.footerNote":
        "This assessment does not replace a medical examination or a binding treatment recommendation.",
    },
  };

  let currentLang = "de";
  /** @type {{ answers: ReturnType<typeof readAnswers>; protocolId: string } | null} */
  let lastReportSnapshot = null;

  function t(key) {
    const pack = I18N[currentLang] || I18N.de;
    return pack[key] !== undefined ? pack[key] : I18N.de[key] || key;
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
      "HG-" +
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
      var siteCfg = window.HAIRGENT_SITE || {};
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
    var cfg = window.HAIRGENT_SITE || {};
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
    var KEY = "hairgent_cookie_consent_v1";
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

  setLanguage("de");
  initSiteFloatingLinks();
  initCookieBanner();
  initSmoothScroll();
  initMobileNav();
  initStepper();
  initForm();
})();

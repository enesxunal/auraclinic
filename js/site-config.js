/**
 * Hairgent — tek yerden düzenleyin: WhatsApp, sosyal, form gönderim adresi
 * WhatsApp: ülke kodu ile, başında + olmadan (örn. Almanya 49...)
 */
(function () {
  /** Vercel’de kendi alan adınız (ör. hairgent.de) var ve mail yoksa true yapın */
  var FORCE_API_LEAD_NO_MAIL = false;

  var h = typeof location !== "undefined" ? location.hostname : "";
  var onVercelHost =
    h === "localhost" || h === "127.0.0.1"
      ? false
      : h.slice(-10) === "vercel.app" || h.indexOf(".vercel.app") !== -1;

  window.HAIRGENT_SITE = {
    whatsappE164: "491234567890",
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/",
    facebook: "https://www.facebook.com/",
    /**
     * Form nereye POST edilsin.
     * - Boş: index.html içindeki action (send-mail.php) kullanılır — Namecheap / PHP.
     * - Vercel *.vercel.app: otomatik /api/lead (mail yok, sadece demo).
     * Site özel alanla Vercel’de ve mail istemiyorsanız burada açıkça "/api/lead" yazın.
     */
    leadSubmitUrl: FORCE_API_LEAD_NO_MAIL || onVercelHost ? "/api/lead" : "",
  };
})();

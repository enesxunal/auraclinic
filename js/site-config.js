/**
 * Aura Clinic — WhatsApp, sosyal medya, form gönderim adresi
 */
(function () {
  var FORCE_API_LEAD_NO_MAIL = false;

  var h = typeof location !== "undefined" ? location.hostname : "";
  var onVercelHost =
    h === "localhost" || h === "127.0.0.1"
      ? false
      : h.slice(-10) === "vercel.app" || h.indexOf(".vercel.app") !== -1;

  window.AURA_CLINIC_SITE = {
    whatsappE164: "995557168876",
    whatsappSecondary: "995558217986",
    instagram: "https://www.instagram.com/auraclinicge/",
    leadSubmitUrl: FORCE_API_LEAD_NO_MAIL || onVercelHost ? "/api/lead" : "",
  };
})();

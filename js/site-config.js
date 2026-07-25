/**
 * Aura Clinic — site config (public IDs only; secrets stay in Vercel env)
 */
(function () {
  var h = typeof location !== "undefined" ? location.hostname : "";
  var isLocal = h === "localhost" || h === "127.0.0.1" || h === "";

  window.AURA_CLINIC_SITE = {
    whatsappE164: "995557168876",
    instagram: "https://www.instagram.com/auraclinicge/",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=129+Petre+Bagrationi+Str,+Batumi+6010,+Georgia",
    siteBaseUrl: "https://auraclinicge.com",
    /** Meta Pixel ID (public). CAPI token stays in Vercel env only. */
    metaPixelId: "1745389426890785",
    /** Google Ads tag ID */
    googleAdsId: "AW-18301236806",
    /**
     * Full send_to from Google Ads conversion action, e.g. AW-18301236806/AbCdEfGh
     * Leave empty until conversion label is created in Google Ads.
     */
    googleAdsLeadSendTo: "",
    /** GA4 Measurement ID, e.g. G-XXXXXXXX. Empty = do not load GA4. */
    ga4MeasurementId: "",
    /** AI preview API */
    previewApiUrl: "/api/preview",
    /** Lead form — production uses /api/lead */
    leadSubmitUrl: isLocal ? "/api/lead" : "/api/lead",
    hairLandingByLang: {
      en: "/en/hair-transplant-batumi.html",
      tr: "/tr/batum-sac-ekimi.html",
      ka: "/ka/hair-transplant-batumi.html",
      ru: "/ru/peresadka-volos-batumi.html",
    },
    botoxLandingByLang: {
      en: "/en/botox-fillers-batumi.html",
      tr: "/tr/batum-dolgu-botoks.html",
      ka: "/ka/botox-fillers-batumi.html",
      ru: "/ru/botoks-fillery-batumi.html",
    },
  };
})();

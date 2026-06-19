/**
 * Aura Clinic — AI hair preview (Phase 2)
 * Set GEMINI_API_KEY in Vercel environment variables to enable generation.
 */
module.exports = function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=UTF-8");

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  var apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;

  if (!apiKey) {
    res.status(200).json({
      ok: false,
      status: "not_configured",
      message: "AI preview API key not configured yet.",
    });
    return;
  }

  // Phase 2: parse multipart body, call Gemini image model, return { ok: true, imageBase64 }
  res.status(200).json({
    ok: false,
    status: "not_implemented",
    message: "AI pipeline placeholder — connect Gemini in next release.",
  });
};

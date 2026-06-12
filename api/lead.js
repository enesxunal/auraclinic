/**
 * Aura Clinic — Vercel demo endpoint (no mail). Production: send-mail.php via site-config.js.
 */
module.exports = function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=UTF-8");
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }
  res.status(200).json({ ok: true });
};

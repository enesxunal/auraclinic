# n8n Lead Webhook Integration

Server-to-server sync from `api/lead.js` to an n8n webhook. The browser always posts only to `/api/lead`. The webhook URL and secret never appear in frontend code.

## Vercel environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (Production):

| Variable | Required | Example / notes |
|---|---|---|
| `N8N_LEAD_WEBHOOK_URL` | No | Full HTTPS webhook URL from n8n. Empty = integration disabled. |
| `N8N_LEAD_WEBHOOK_SECRET` | Recommended | Shared secret; sent as request header. |
| `N8N_LEAD_WEBHOOK_TIMEOUT_MS` | No | Default `3000`. Clamped between 500 and 15000. |

Local placeholders live in `.env.example` (empty values only).

## Request

- **Method:** `POST`
- **Content-Type:** `application/json`
- **Header:** `X-Aura-Webhook-Secret: <N8N_LEAD_WEBHOOK_SECRET>`
- **When sent:** After the lead passes validation, is not honeypot/spam, is not a short-window duplicate, and clinic email sending succeeds.
- **Not sent:** Photos, AI preview images, or binary attachments.

## Example JSON payload

```json
{
  "lead_id": "AC-xxxxx-xxxxxx",
  "created_at": "2026-07-25T18:00:00.000Z",
  "source": "website",
  "service": "hair_transplant",
  "language": "tr",
  "name": "Jane Doe",
  "phone": "+995557168876",
  "email": "jane@example.com",
  "country": "",
  "city": "",
  "message": "",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "hair_batumi",
  "utm_content": "",
  "utm_term": "",
  "gclid": "",
  "gbraid": "",
  "wbraid": "",
  "fbclid": "",
  "ttclid": "",
  "first_landing_page": "https://auraclinicge.com/tr/batum-sac-ekimi.html",
  "landing_page": "https://auraclinicge.com/tr/batum-sac-ekimi.html",
  "first_referrer": "",
  "referrer": "",
  "status": "new",
  "qualified": "no",
  "appointment_date": "",
  "deposit_received": "no",
  "procedure_completed": "no",
  "revenue": "",
  "assigned_to": "",
  "follow_up_date": "",
  "notes": "",
  "duplicate": "no"
}
```

Default CRM values for new website leads when not provided: `status=new`, `qualified=no`, `deposit_received=no`, `procedure_completed=no`, `duplicate=no`.

## Expected n8n response

Something like:

```json
{
  "ok": true,
  "duplicate": false,
  "lead_id": "AC-xxxxx-xxxxxx"
}
```

The website does **not** depend on the response body. Any HTTP **2xx** counts as integration success.

## Timeout behavior

- One request attempt only (no infinite retries).
- Aborts after `N8N_LEAD_WEBHOOK_TIMEOUT_MS` (default 3s).
- Timeout → `n8n_sync: false` internally; user still gets a successful lead response if email succeeded.

## Failure behavior

| Situation | User API response | n8n |
|---|---|---|
| Webhook URL empty | `{ ok: true, lead_id, customerMail }` (no `n8n_sync`) | Skipped |
| n8n 5xx / network / timeout | `{ ok: true, lead_id, customerMail, n8n_sync: false }` | Failed, lead kept via email |
| n8n 2xx | `{ ok: true, lead_id, customerMail, n8n_sync: true }` | Synced |
| Duplicate browser retry | `{ ok: true, duplicate: true }` | **Not called** |
| Honeypot / invalid | Existing skip / 400 behavior | **Not called** |
| Mail failure | `{ ok: false, error: "mail_failed" }` | **Not called** |

Error logs only include safe metadata (`lead_id`, HTTP status, reason). No name, phone, or email in n8n error logs.

Meta CAPI and email behavior are unchanged. Conversion events still fire once on successful mail path (not twice).

## How to disable

Clear or remove `N8N_LEAD_WEBHOOK_URL` in Vercel (leave empty). Redeploy is not required for env-only changes on Vercel serverless if the variable is updated and functions cold-start with the new env — but a redeploy is the safest way to guarantee the new value is loaded everywhere.

## Production verification steps (after you add real credentials)

1. Add `N8N_LEAD_WEBHOOK_URL` and `N8N_LEAD_WEBHOOK_SECRET` in Vercel Production.
2. Deploy (or redeploy) so the lead function picks up the variables.
3. Submit **one** clearly marked test lead (e.g. name `TEST N8N`).
4. Confirm clinic email arrived.
5. Confirm n8n workflow received the JSON and returned 2xx.
6. Immediately resubmit the same lead → API should return `duplicate: true` and n8n should **not** get a second record.
7. Temporarily point URL at a failing endpoint or block it → user still sees success; `n8n_sync` should be `false`.

Do not put the webhook URL or secret into `js/site-config.js` or any HTML/JS file.

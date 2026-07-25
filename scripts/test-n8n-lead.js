/**
 * Local mock tests for n8n lead integration.
 * Does not call production APIs or send real leads / email.
 *
 * Run: node scripts/test-n8n-lead.js
 */
var assert = require("assert");
var n8nLead = require("../lib/n8n-lead");
var leadValidate = require("../lib/lead-validate");

var passed = 0;
var failed = 0;

function test(name, fn) {
  return Promise.resolve()
    .then(fn)
    .then(function () {
      passed += 1;
      console.log("PASS:", name);
    })
    .catch(function (err) {
      failed += 1;
      console.error("FAIL:", name);
      console.error(" ", err && err.message ? err.message : err);
    });
}

function sampleLead(overrides) {
  return Object.assign(
    {
      lead_id: "TEST-N8N-001",
      created_at: "2026-07-25T18:00:00.000Z",
      name: "TEST CURSOR",
      phone: "+995557168876",
      email: "test@example.com",
      service: "hair_transplant",
      lang: "tr",
      country: "Georgia",
      city: "Batumi",
      message: "QA mock only",
      utm_source: "cursor_test",
      utm_medium: "qa",
      utm_campaign: "deployment_test",
      utm_content: "landing_test",
      utm_term: "",
      gclid: "",
      gbraid: "",
      wbraid: "",
      fbclid: "",
      ttclid: "",
      first_landing_page: "https://auraclinicge.com/tr/batum-sac-ekimi.html",
      landing_page: "https://auraclinicge.com/tr/batum-sac-ekimi.html",
      first_referrer: "",
      referrer: "",
    },
    overrides || {}
  );
}

function mockResponse(status, bodyText) {
  return {
    status: status,
    text: function () {
      return Promise.resolve(bodyText == null ? "" : String(bodyText));
    },
  };
}

async function run() {
  var prevUrl = process.env.N8N_LEAD_WEBHOOK_URL;
  var prevSecret = process.env.N8N_LEAD_WEBHOOK_SECRET;
  var prevTimeout = process.env.N8N_LEAD_WEBHOOK_TIMEOUT_MS;

  await test("payload includes required CRM defaults", function () {
    var payload = n8nLead.buildN8nPayload(sampleLead());
    assert.strictEqual(payload.status, "new");
    assert.strictEqual(payload.qualified, "no");
    assert.strictEqual(payload.deposit_received, "no");
    assert.strictEqual(payload.procedure_completed, "no");
    assert.strictEqual(payload.duplicate, "no");
    assert.strictEqual(payload.source, "website");
    assert.strictEqual(payload.language, "tr");
    assert.strictEqual(payload.utm_source, "cursor_test");
    assert.ok(!("photo" in payload));
    assert.ok(!("image" in payload));
    assert.ok(!("preview" in payload));
    [
      "lead_id",
      "created_at",
      "source",
      "service",
      "language",
      "name",
      "phone",
      "email",
      "country",
      "city",
      "message",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "gclid",
      "gbraid",
      "wbraid",
      "fbclid",
      "ttclid",
      "first_landing_page",
      "landing_page",
      "first_referrer",
      "referrer",
      "status",
      "qualified",
      "appointment_date",
      "deposit_received",
      "procedure_completed",
      "revenue",
      "assigned_to",
      "follow_up_date",
      "notes",
      "duplicate",
    ].forEach(function (key) {
      assert.ok(key in payload, "missing field " + key);
    });
  });

  await test("webhook URL missing → skip silently", async function () {
    delete process.env.N8N_LEAD_WEBHOOK_URL;
    var calls = 0;
    var result = await n8nLead.sendLeadToN8n(sampleLead(), {
      fetchImpl: function () {
        calls += 1;
        return Promise.resolve(mockResponse(200, "{}"));
      },
    });
    assert.strictEqual(calls, 0);
    assert.strictEqual(result.skipped, true);
    assert.strictEqual(result.sync, false);
    assert.strictEqual(n8nLead.isConfigured(), false);
  });

  await test("successful n8n response (2xx) → sync true", async function () {
    process.env.N8N_LEAD_WEBHOOK_URL = "https://n8n.example.test/webhook/lead";
    process.env.N8N_LEAD_WEBHOOK_SECRET = "test-secret";
    var seen = null;
    var result = await n8nLead.sendLeadToN8n(sampleLead(), {
      fetchImpl: function (url, opts) {
        seen = { url: url, opts: opts };
        return Promise.resolve(
          mockResponse(200, JSON.stringify({ ok: true, duplicate: false, lead_id: "TEST-N8N-001" }))
        );
      },
    });
    assert.strictEqual(result.ok, true);
    assert.strictEqual(result.sync, true);
    assert.strictEqual(seen.url, "https://n8n.example.test/webhook/lead");
    assert.strictEqual(seen.opts.method, "POST");
    assert.strictEqual(seen.opts.headers["Content-Type"], "application/json");
    assert.strictEqual(seen.opts.headers["X-Aura-Webhook-Secret"], "test-secret");
    var body = JSON.parse(seen.opts.body);
    assert.strictEqual(body.lead_id, "TEST-N8N-001");
    assert.strictEqual(body.status, "new");
  });

  await test("invalid n8n response body on 2xx still counts as success", async function () {
    process.env.N8N_LEAD_WEBHOOK_URL = "https://n8n.example.test/webhook/lead";
    var result = await n8nLead.sendLeadToN8n(sampleLead(), {
      fetchImpl: function () {
        return Promise.resolve(mockResponse(204, "not-json<<<"));
      },
    });
    assert.strictEqual(result.ok, true);
    assert.strictEqual(result.sync, true);
  });

  await test("n8n HTTP 500 → sync false, no throw", async function () {
    process.env.N8N_LEAD_WEBHOOK_URL = "https://n8n.example.test/webhook/lead";
    var result = await n8nLead.sendLeadToN8n(sampleLead(), {
      fetchImpl: function () {
        return Promise.resolve(mockResponse(500, "Internal Server Error"));
      },
    });
    assert.strictEqual(result.ok, false);
    assert.strictEqual(result.sync, false);
    assert.strictEqual(result.http_status, 500);
  });

  await test("n8n timeout → sync false", async function () {
    process.env.N8N_LEAD_WEBHOOK_URL = "https://n8n.example.test/webhook/lead";
    process.env.N8N_LEAD_WEBHOOK_TIMEOUT_MS = "50";
    var result = await n8nLead.sendLeadToN8n(sampleLead(), {
      fetchImpl: function (url, opts) {
        return new Promise(function (resolve, reject) {
          if (opts && opts.signal) {
            opts.signal.addEventListener("abort", function () {
              var err = new Error("Aborted");
              err.name = "AbortError";
              reject(err);
            });
          }
        });
      },
    });
    assert.strictEqual(result.ok, false);
    assert.strictEqual(result.sync, false);
    assert.strictEqual(result.reason, "timeout");
  });

  await test("honeypot / invalid lead never reach n8n payload path", function () {
    var honey = leadValidate.validateLeadBody(
      {
        name: "Bot",
        phone: "+995557168876",
        consent: true,
        honeypot: "filled",
        service: "hair_transplant",
      },
      { requireConsent: true }
    );
    assert.strictEqual(honey.ok, false);
    assert.ok(honey.errors.indexOf("honeypot") !== -1);

    var invalid = leadValidate.validateLeadBody(
      { name: "", phone: "12", consent: false, service: "hair_transplant" },
      { requireConsent: true }
    );
    assert.strictEqual(invalid.ok, false);
  });

  await test("error logs must not include personal lead fields", function () {
    var logs = [];
    var original = console.log;
    console.log = function () {
      logs.push(Array.prototype.slice.call(arguments).join(" "));
    };
    return n8nLead
      .sendLeadToN8n(sampleLead({ name: "SECRET NAME", email: "secret@pii.test", phone: "+995111111111" }), {
        fetchImpl: function () {
          return Promise.resolve(mockResponse(500, "fail"));
        },
      })
      .then(function () {
        console.log = original;
        var joined = logs.join("\n");
        assert.ok(joined.indexOf("SECRET NAME") === -1);
        assert.ok(joined.indexOf("secret@pii.test") === -1);
        assert.ok(joined.indexOf("+995111111111") === -1);
        assert.ok(joined.indexOf("TEST-N8N-001") !== -1);
      })
      .catch(function (err) {
        console.log = original;
        throw err;
      });
  });

  await test("email-success + n8n-failure still yields user success shape", async function () {
    process.env.N8N_LEAD_WEBHOOK_URL = "https://n8n.example.test/webhook/lead";
    var n8nResult = await n8nLead.sendLeadToN8n(sampleLead(), {
      fetchImpl: function () {
        return Promise.reject(new Error("network down"));
      },
    });
    // Simulate api/lead response construction after mail success
    var responseBody = {
      ok: true,
      lead_id: "TEST-N8N-001",
      customerMail: true,
    };
    if (n8nLead.isConfigured()) {
      responseBody.n8n_sync = !!(n8nResult && n8nResult.sync);
    }
    assert.strictEqual(responseBody.ok, true);
    assert.strictEqual(responseBody.n8n_sync, false);
    assert.strictEqual(n8nResult.sync, false);
  });

  await test("duplicate flag in payload only when explicitly marked", function () {
    var normal = n8nLead.buildN8nPayload(sampleLead());
    var dup = n8nLead.buildN8nPayload(sampleLead(), { duplicate: true });
    assert.strictEqual(normal.duplicate, "no");
    assert.strictEqual(dup.duplicate, "yes");
  });

  await test("frontend lead URL remains /api/lead (site-config)", function () {
    var fs = require("fs");
    var path = require("path");
    var cfg = fs.readFileSync(
      path.join(__dirname, "..", "js", "site-config.js"),
      "utf8"
    );
    assert.ok(cfg.indexOf('leadSubmitUrl: isLocal ? "/api/lead" : "/api/lead"') !== -1);
    assert.ok(cfg.indexOf("N8N_LEAD_WEBHOOK") === -1);
    assert.ok(cfg.indexOf("n8n.example") === -1);
  });

  // restore env
  if (prevUrl === undefined) delete process.env.N8N_LEAD_WEBHOOK_URL;
  else process.env.N8N_LEAD_WEBHOOK_URL = prevUrl;
  if (prevSecret === undefined) delete process.env.N8N_LEAD_WEBHOOK_SECRET;
  else process.env.N8N_LEAD_WEBHOOK_SECRET = prevSecret;
  if (prevTimeout === undefined) delete process.env.N8N_LEAD_WEBHOOK_TIMEOUT_MS;
  else process.env.N8N_LEAD_WEBHOOK_TIMEOUT_MS = prevTimeout;

  console.log("");
  console.log("Result:", passed, "passed,", failed, "failed");
  if (failed > 0) process.exit(1);
}

run().catch(function (err) {
  console.error(err);
  process.exit(1);
});

/**
 * Lightweight in-memory rate limit for Vercel serverless.
 * Note: each isolate has its own memory — for stronger limits set
 * UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (optional).
 * When Redis is not configured, falls back to process memory.
 */
var memoryBuckets = Object.create(null);

function prune(bucket, windowMs) {
  var now = Date.now();
  bucket.hits = (bucket.hits || []).filter(function (t) {
    return now - t < windowMs;
  });
}

async function redisIncr(key, windowMs) {
  var url = process.env.UPSTASH_REDIS_REST_URL;
  var token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  var r = await fetch(url + "/pipeline", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", key],
      ["PEXPIRE", key, String(windowMs)],
    ]),
  });
  if (!r.ok) return null;
  var json = await r.json().catch(function () {
    return null;
  });
  if (!json || !json[0] || json[0].result === undefined) return null;
  return Number(json[0].result) || 0;
}

/**
 * @returns {{ allowed: boolean, remaining: number, backend: string }}
 */
async function checkRateLimit(key, limit, windowMs) {
  limit = limit || 10;
  windowMs = windowMs || 60 * 1000;
  var redisKey = "aura:rl:" + key;

  try {
    var count = await redisIncr(redisKey, windowMs);
    if (count !== null) {
      return {
        allowed: count <= limit,
        remaining: Math.max(0, limit - count),
        backend: "redis",
      };
    }
  } catch (e) {
    // fall through to memory
  }

  var bucket = memoryBuckets[key] || { hits: [] };
  prune(bucket, windowMs);
  if (bucket.hits.length >= limit) {
    memoryBuckets[key] = bucket;
    return { allowed: false, remaining: 0, backend: "memory" };
  }
  bucket.hits.push(Date.now());
  memoryBuckets[key] = bucket;
  return {
    allowed: true,
    remaining: Math.max(0, limit - bucket.hits.length),
    backend: "memory",
  };
}

function clientKey(req, prefix) {
  var ip =
    req.headers["x-forwarded-for"] ||
    req.headers["x-real-ip"] ||
    "unknown";
  if (Array.isArray(ip)) ip = ip[0];
  if (typeof ip === "string" && ip.indexOf(",") !== -1) ip = ip.split(",")[0].trim();
  return String(prefix || "rl") + ":" + String(ip).slice(0, 64);
}

function isAllowedOrigin(req) {
  var allowed = (process.env.ALLOWED_ORIGINS || "https://auraclinicge.com,https://www.auraclinicge.com")
    .split(",")
    .map(function (s) {
      return s.trim();
    })
    .filter(Boolean);
  var origin = req.headers.origin || "";
  var referer = req.headers.referer || "";
  if (!origin && !referer) {
    // Same-origin form posts from static pages may omit Origin; allow host match
    var host = req.headers.host || "";
    return (
      host.indexOf("auraclinicge.com") !== -1 ||
      host.indexOf("localhost") !== -1 ||
      host.indexOf("127.0.0.1") !== -1 ||
      host.indexOf("vercel.app") !== -1
    );
  }
  for (var i = 0; i < allowed.length; i++) {
    if (origin === allowed[i] || referer.indexOf(allowed[i]) === 0) return true;
  }
  if (origin.indexOf("localhost") !== -1 || referer.indexOf("localhost") !== -1) return true;
  return false;
}

module.exports = {
  checkRateLimit: checkRateLimit,
  clientKey: clientKey,
  isAllowedOrigin: isAllowedOrigin,
};

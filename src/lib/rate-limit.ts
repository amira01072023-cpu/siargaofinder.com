type RateLimitBucket = {
  count: number;
  resetAt: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
};

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

const MAX_BUCKETS = 10_000;

const globalRateLimitStore = globalThis as typeof globalThis & {
  __siargaoFinderRateLimitStore?: Map<string, RateLimitBucket>;
};

const buckets =
  globalRateLimitStore.__siargaoFinderRateLimitStore ??
  new Map<string, RateLimitBucket>();

globalRateLimitStore.__siargaoFinderRateLimitStore = buckets;

function requestIdentity(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const vercelIp = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  const ip = vercelIp || realIp || forwardedFor;

  if (ip) return ip.slice(0, 100);

  const userAgent = request.headers.get("user-agent")?.trim() || "unknown-client";
  return `fallback:${userAgent.slice(0, 120)}`;
}

function pruneExpiredBuckets(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }

  while (buckets.size >= MAX_BUCKETS) {
    const oldestKey = buckets.keys().next().value;
    if (!oldestKey) break;
    buckets.delete(oldestKey);
  }
}

export function consumeRateLimit(
  bucketKey: string,
  limit: number,
  windowMs: number,
  now = Date.now(),
): RateLimitResult {
  if (limit < 1 || windowMs < 1) {
    throw new Error("Rate limit and window must be positive.");
  }

  let bucket = buckets.get(bucketKey);

  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_BUCKETS) pruneExpiredBuckets(now);
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(bucketKey, bucket);
  }

  bucket.count += 1;
  const allowed = bucket.count <= limit;

  return {
    allowed,
    limit,
    remaining: Math.max(limit - bucket.count, 0),
    resetAt: bucket.resetAt,
    retryAfterSeconds: Math.max(Math.ceil((bucket.resetAt - now) / 1000), 1),
  };
}

export function rateLimitRequest(request: Request, options: RateLimitOptions) {
  return consumeRateLimit(
    `${options.key}:${requestIdentity(request)}`,
    options.limit,
    options.windowMs,
  );
}

export function rateLimitHeaders(result: RateLimitResult) {
  return {
    "RateLimit-Limit": String(result.limit),
    "RateLimit-Remaining": String(result.remaining),
    "RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
  };
}

export function tooManyRequestsResponse(result: RateLimitResult) {
  return Response.json(
    { error: "Too many requests. Please try again later." },
    {
      status: 429,
      headers: {
        ...rateLimitHeaders(result),
        "Retry-After": String(result.retryAfterSeconds),
        "Cache-Control": "no-store",
      },
    },
  );
}

export function resetRateLimitStoreForTests() {
  buckets.clear();
}

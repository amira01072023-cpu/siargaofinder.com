import { beforeEach, describe, expect, it } from "vitest";
import {
  consumeRateLimit,
  rateLimitRequest,
  resetRateLimitStoreForTests,
  tooManyRequestsResponse,
} from "../src/lib/rate-limit";

describe("rate limiting", () => {
  beforeEach(() => resetRateLimitStoreForTests());

  it("allows requests until the configured limit is reached", () => {
    expect(consumeRateLimit("test:client", 2, 60_000, 1_000)).toMatchObject({
      allowed: true,
      remaining: 1,
    });
    expect(consumeRateLimit("test:client", 2, 60_000, 1_001)).toMatchObject({
      allowed: true,
      remaining: 0,
    });
    expect(consumeRateLimit("test:client", 2, 60_000, 1_002)).toMatchObject({
      allowed: false,
      remaining: 0,
    });
  });

  it("starts a new bucket after the window expires", () => {
    consumeRateLimit("test:client", 1, 1_000, 2_000);
    const result = consumeRateLimit("test:client", 1, 1_000, 3_000);

    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(0);
    expect(result.resetAt).toBe(4_000);
  });

  it("separates request buckets by forwarded client address", () => {
    const firstClient = new Request("https://example.com/api", {
      headers: { "x-forwarded-for": "203.0.113.10" },
    });
    const secondClient = new Request("https://example.com/api", {
      headers: { "x-forwarded-for": "203.0.113.11" },
    });

    expect(rateLimitRequest(firstClient, { key: "chat", limit: 1, windowMs: 60_000 }).allowed).toBe(true);
    expect(rateLimitRequest(firstClient, { key: "chat", limit: 1, windowMs: 60_000 }).allowed).toBe(false);
    expect(rateLimitRequest(secondClient, { key: "chat", limit: 1, windowMs: 60_000 }).allowed).toBe(true);
  });

  it("returns a standards-friendly 429 response", async () => {
    const blocked = consumeRateLimit("test:client", 1, 60_000, 10_000);
    const result = consumeRateLimit("test:client", 1, 60_000, 10_001);
    const response = tooManyRequestsResponse(result);

    expect(blocked.allowed).toBe(true);
    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBe("60");
    await expect(response.json()).resolves.toEqual({
      error: "Too many requests. Please try again later.",
    });
  });
});

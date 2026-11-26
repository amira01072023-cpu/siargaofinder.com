import { describe, expect, it } from "vitest";
import { isCurrentSearchRequest } from "./search-request-state";

describe("search request state", () => {
  it("rejects a stale listing response", () => {
    expect(isCurrentSearchRequest(3, 2)).toBe(false);
    expect(isCurrentSearchRequest(3, 3)).toBe(true);
  });
});

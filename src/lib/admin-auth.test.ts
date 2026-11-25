import { describe, expect, it } from "vitest";
import { getAdminEmailAllowlist } from "./admin-auth";

describe("getAdminEmailAllowlist", () => {
  it("uses the established administrator when no server environment value exists", () => {
    expect(getAdminEmailAllowlist("", "")).toEqual(["info@siargaofinder.com"]);
  });

  it("normalizes and deduplicates a comma-separated server allowlist", () => {
    expect(getAdminEmailAllowlist(" Admin@Example.com,admin@example.com, second@example.com ", "")).toEqual([
      "admin@example.com",
      "second@example.com",
    ]);
  });

  it("supports the single-email environment value", () => {
    expect(getAdminEmailAllowlist("", "owner@example.com")).toEqual(["owner@example.com"]);
  });

  it("does not allow a whitespace-only allowlist to disable the compatibility fallback", () => {
    expect(getAdminEmailAllowlist(" , ", "owner@example.com")).toEqual(["owner@example.com"]);
  });
});

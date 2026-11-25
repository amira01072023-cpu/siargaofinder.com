import { describe, expect, it } from "vitest";
import { normalizeSavedListings, toggleSavedListingItems } from "./saved-listings";

const islandCafe = { id: 42, business_name: "Island Cafe", category: "Cafe", municipality: "General Luna" };

describe("saved listings persistence", () => {
  it("retains valid saved listings and removes malformed or duplicate stored values", () => {
    expect(normalizeSavedListings([
      islandCafe,
      { ...islandCafe, business_name: "Duplicate Cafe" },
      { id: "invalid", business_name: "Invalid" },
      null,
    ])).toEqual([islandCafe]);
  });

  it("adds and removes a saved listing predictably", () => {
    const saved = toggleSavedListingItems([], islandCafe);
    expect(saved).toEqual({ saved: true, items: [islandCafe] });

    const removed = toggleSavedListingItems(saved.items, islandCafe);
    expect(removed).toEqual({ saved: false, items: [] });
  });
});

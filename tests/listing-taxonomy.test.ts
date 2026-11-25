import { describe, expect, it } from "vitest";
import {
  categoryMatchesCanonicalSlug,
  categorySlugToCanonicalSlug,
  categoryToLandingSlug,
  categoryToCanonicalSlug,
  categoryToSlug,
} from "../src/lib/listing-taxonomy";
import { buildListingSeoDescription, buildListingSeoTitle } from "../src/lib/seo-metadata";

describe("listing taxonomy canonical slugs", () => {
  it.each([
    ["Food", "food-chains-and-restaurants"],
    ["Cafe", "food-chains-and-restaurants"],
    ["Accommodation", "hotels-and-stays"],
    ["Government", "government-offices"],
    ["Government Offices", "government-offices"],
    ["Services", "essentials-and-services"],
    ["Education", "schools-and-education"],
  ])("maps %s to %s", (category, expected) => {
    expect(categoryToCanonicalSlug(category)).toBe(expected);
  });

  it("keeps unknown categories on their deterministic slug", () => {
    expect(categoryToCanonicalSlug("Cargo Logistics")).toBe("cargo-logistics");
    expect(categoryToSlug("Cargo Logistics")).toBe("cargo-logistics");
  });

  it("canonicalizes alias route slugs", () => {
    expect(categorySlugToCanonicalSlug("government")).toBe("government-offices");
    expect(categorySlugToCanonicalSlug("government-offices")).toBe("government-offices");
  });

  it("matches varied live-directory category names to their canonical landing hubs", () => {
    expect(categoryToCanonicalSlug("General Merchandise & Grocery Supplier")).toBe("general-merchandise-and-grocery-supplier");
    expect(categoryToCanonicalSlug("Motorbike Rental")).toBe("transport-rentals");
    expect(categoryMatchesCanonicalSlug("Coffee, Snacks & Beverage Supplier", "food-chains-and-restaurants")).toBe(true);
    expect(categoryMatchesCanonicalSlug("Hardware & Construction Materials Supplier", "essentials-and-services")).toBe(true);
    expect(categoryToLandingSlug("General Merchandise & Grocery Supplier")).toBe("essentials-and-services");
    expect(categoryToLandingSlug("Cargo Logistics")).toBe("transport-rentals");
  });
});

describe("listing SEO title", () => {
  it("keeps long listing titles within the working SERP target", () => {
    const title = buildListingSeoTitle(
      "Municipal Social Welfare and Development Office - Santa Monica",
      "Santa Monica",
    );
    expect(title.length).toBeLessThanOrEqual(60);
    expect(title).toContain("Santa Monica, Siargao");
  });

  it("keeps long listing descriptions within the working SERP target", () => {
    const description = buildListingSeoDescription(
      "Municipal Social Welfare and Development Office - Santa Monica",
      "Santa Monica",
      "Government",
    );
    expect(description.length).toBeLessThanOrEqual(160);
    expect(description).toContain("Santa Monica, Siargao");
  });
});

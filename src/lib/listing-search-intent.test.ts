import { describe, expect, it } from "vitest";
import { getListingBusinessSearchTerms, inferListingSearchIntent } from "./listing-search-intent";

describe("inferListingSearchIntent", () => {
  it("detects transport and municipality intent", () => {
    expect(inferListingSearchIntent("motorbike rental in General Luna")).toEqual({
      categoryGroup: "transport-rentals",
      municipality: "General Luna",
    });
  });

  it("prefers the leading hardware intent and detects Dapa", () => {
    expect(inferListingSearchIntent("hardware suppliers in Dapa")).toEqual({
      categoryGroup: "home-construction",
      municipality: "Dapa",
    });
  });

  it("leaves an unknown business-name query unclassified", () => {
    expect(inferListingSearchIntent("Bombom")).toEqual({
      categoryGroup: "",
      municipality: "",
    });
  });

  it("normalizes common search typos without a database migration", () => {
    expect(inferListingSearchIntent("motobike rental in General Luna")).toEqual({
      categoryGroup: "transport-rentals",
      municipality: "General Luna",
    });
  });

  it("keeps a distinctive business fragment alongside category/location intent", () => {
    expect(getListingBusinessSearchTerms("Bombom motobike rental in General Luna")).toMatchObject({
      categoryGroup: "transport-rentals",
      municipality: "General Luna",
    });
    expect(getListingBusinessSearchTerms("Bombom motobike rental in General Luna").terms).toContain("bombom");
  });

  it("does not turn generic supplier wording into an over-restrictive business filter", () => {
    expect(getListingBusinessSearchTerms("hardware suppliers in Dapa")).toMatchObject({
      categoryGroup: "home-construction",
      municipality: "Dapa",
      terms: [],
    });
  });

  it("keeps category/location phrases broad when their remaining words are generic", () => {
    expect(getListingBusinessSearchTerms("surf schools in San Isidro")).toMatchObject({
      categoryGroup: "surf-beach",
      municipality: "San Isidro",
      terms: [],
    });
    expect(getListingBusinessSearchTerms("government offices in Socorro")).toMatchObject({
      categoryGroup: "government-public",
      municipality: "Socorro",
      terms: [],
    });
  });
});

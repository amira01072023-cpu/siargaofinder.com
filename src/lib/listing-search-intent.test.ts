import { describe, expect, it } from "vitest";
import { inferListingSearchIntent } from "./listing-search-intent";

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
});

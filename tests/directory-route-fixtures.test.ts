import { describe, expect, it } from "vitest";
import { categoryMatchesCanonicalSlug } from "../src/lib/listing-taxonomy";
import { municipalityToSlug } from "../src/lib/siargao-municipalities";

const variedListings = [
  { id: 1, category: "Coffee, Snacks & Beverage Supplier", municipality: "General Luna" },
  { id: 2, category: "Motorbike Rental", municipality: "Dapa" },
  { id: 3, category: "Government", municipality: "Del Carmen" },
  { id: 4, category: "Hardware & Construction Materials Supplier", municipality: "Pilar" },
  { id: 5, category: "Accommodation", municipality: "San Isidro" },
  { id: 6, category: "Surf school", municipality: "Burgos" },
  { id: 7, category: "Medical Clinic", municipality: "Santa Monica" },
  { id: 8, category: "School Supplies Store", municipality: "Socorro" },
  { id: 9, category: "Island Hopping Tour", municipality: "General Luna" },
  { id: 10, category: "Internet, Printing & Computer Services Supplier", municipality: "Dapa" },
];

function fixtureCount(municipalitySlug: string, categorySlug?: string) {
  return variedListings.filter((listing) =>
    municipalityToSlug(listing.municipality) === municipalitySlug &&
    (!categorySlug || categoryMatchesCanonicalSlug(listing.category, categorySlug)),
  ).length;
}

describe("directory category and municipality fixtures", () => {
  it("keeps municipality slugs aligned with public directory values", () => {
    expect(municipalityToSlug("General Luna")).toBe("general-luna");
    expect(fixtureCount("general-luna")).toBe(2);
    expect(fixtureCount("dapa")).toBe(2);
  });

  it("returns stable counts for representative combined filters", () => {
    expect(fixtureCount("general-luna", "food-chains-and-restaurants")).toBe(1);
    expect(fixtureCount("dapa", "transport-rentals")).toBe(1);
    expect(fixtureCount("pilar", "essentials-and-services")).toBe(1);
    expect(fixtureCount("socorro", "schools-and-education")).toBe(1);
  });
});

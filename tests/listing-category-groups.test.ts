import { describe, expect, it } from "vitest";
import {
  categoryMatchesGroup,
  getListingCategoryGroup,
} from "../src/lib/listing-category-groups";

describe("listing category groups", () => {
  it("matches common directory categories", () => {
    const food = getListingCategoryGroup("food-drinks");
    const transport = getListingCategoryGroup("transport-rentals");

    expect(food && categoryMatchesGroup("Seafood Restaurant", food)).toBe(true);
    expect(transport && categoryMatchesGroup("Motorbike Rental", transport)).toBe(true);
  });

  it("does not match unrelated categories", () => {
    const schools = getListingCategoryGroup("schools-education");

    expect(schools && categoryMatchesGroup("Boutique Hotel", schools)).toBe(false);
  });
});

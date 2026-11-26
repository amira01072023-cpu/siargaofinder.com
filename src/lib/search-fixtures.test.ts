import { describe, expect, it } from "vitest";
import { getListingBusinessSearchTerms } from "./listing-search-intent";
import { DIRECTORY_SEARCH_FIXTURES } from "./search-fixtures";

describe("real-directory search fixture", () => {
  it("contains at least twenty real-listing, intent, and clear-filter cases", () => {
    expect(DIRECTORY_SEARCH_FIXTURES.length).toBeGreaterThanOrEqual(20);
    expect(DIRECTORY_SEARCH_FIXTURES.some((fixture) => fixture.clearsFilters)).toBe(true);
    expect(DIRECTORY_SEARCH_FIXTURES.some((fixture) => fixture.expectsNoResults)).toBe(true);
  });

  it.each(DIRECTORY_SEARCH_FIXTURES.filter((fixture) => !fixture.clearsFilters && !fixture.expectsNoResults))(
    "$id produces the expected search plan",
    (fixture) => {
      const plan = getListingBusinessSearchTerms(fixture.query);
      if (fixture.expectedCategoryGroup) expect(plan.categoryGroup).toBe(fixture.expectedCategoryGroup);
      if (fixture.expectedMunicipality) expect(plan.municipality).toBe(fixture.expectedMunicipality);
      if (fixture.expectedNameFragment) expect(plan.terms.join(" ")).toContain(fixture.expectedNameFragment);
    },
  );
});

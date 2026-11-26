import { describe, expect, it } from "vitest";
import { addRecentSearch, parseRecentSearches, recentSearchLabel, type RecentSearch } from "./recent-searches";

describe("recent searches", () => {
  it("deduplicates searches and keeps the newest five", () => {
    let searches: RecentSearch[] = [];
    for (const q of ["cafe", "clinic", "surf", "hotel", "rental", "food"]) {
      searches = addRecentSearch(searches, { q });
    }
    expect(searches.map((item) => item.q)).toEqual(["food", "rental", "hotel", "surf", "clinic"]);
    expect(addRecentSearch(searches, { q: "clinic" }).map((item) => item.q)[0]).toBe("clinic");
  });

  it("drops malformed stored values and presents useful labels", () => {
    expect(parseRecentSearches("not-json")).toEqual([]);
    expect(parseRecentSearches(JSON.stringify([{ q: "", municipality: "Dapa" }, null, "wrong"]))).toEqual([{ q: "", categoryGroup: "", municipality: "Dapa", hasPhone: false }]);
    expect(recentSearchLabel({ categoryGroup: "transport-rentals", municipality: "Dapa" })).toBe("transport rentals · Dapa");
  });
});

import { describe, expect, it } from "vitest";
import { getNextSuggestionIndex } from "./search-suggestion-navigation";

describe("getNextSuggestionIndex", () => {
  it("keeps the input active when there are no suggestions", () => {
    expect(getNextSuggestionIndex(-1, 0, "ArrowDown")).toBe(-1);
  });

  it("moves through options and wraps at either end", () => {
    expect(getNextSuggestionIndex(-1, 3, "ArrowDown")).toBe(0);
    expect(getNextSuggestionIndex(2, 3, "ArrowDown")).toBe(0);
    expect(getNextSuggestionIndex(0, 3, "ArrowUp")).toBe(2);
  });

  it("supports Home and End", () => {
    expect(getNextSuggestionIndex(1, 3, "Home")).toBe(0);
    expect(getNextSuggestionIndex(1, 3, "End")).toBe(2);
  });
});

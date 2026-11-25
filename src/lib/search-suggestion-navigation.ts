export type SuggestionNavigationKey = "ArrowDown" | "ArrowUp" | "Home" | "End";

/**
 * Returns the next active option for a keyboard-operated suggestion list.
 * `-1` represents focus remaining in the input without an active option.
 */
export function getNextSuggestionIndex(
  currentIndex: number,
  optionCount: number,
  key: SuggestionNavigationKey,
) {
  if (optionCount <= 0) return -1;

  if (key === "Home") return 0;
  if (key === "End") return optionCount - 1;
  if (key === "ArrowDown") return currentIndex >= optionCount - 1 ? 0 : Math.max(currentIndex + 1, 0);
  return currentIndex <= 0 ? optionCount - 1 : currentIndex - 1;
}

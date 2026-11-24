import { LISTING_CATEGORY_GROUPS } from "./listing-category-groups";
import { SIARGAO_MUNICIPALITIES } from "./siargao-municipalities";

export function inferListingSearchIntent(rawQuery: string) {
  const normalized = rawQuery
    .toLowerCase()
    .replace(/[^a-z0-9\s&-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const municipality = SIARGAO_MUNICIPALITIES.find((name) => normalized.includes(name.toLowerCase())) || "";

  const categoryGroup = LISTING_CATEGORY_GROUPS
    .map((group) => {
      const matchedTerms = group.terms.filter((term) => normalized.includes(term.toLowerCase()));
      const score = matchedTerms.reduce((total, term) => {
        const positionBonus = normalized.startsWith(term.toLowerCase()) ? 5 : 0;
        return total + term.length + 10 + positionBonus;
      }, 0);
      return { id: group.id, score };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.id || "";

  return { municipality, categoryGroup };
}

import { LISTING_CATEGORY_GROUPS } from "./listing-category-groups";
import { SIARGAO_MUNICIPALITIES } from "./siargao-municipalities";

const TYPO_CORRECTIONS: Record<string, string> = {
  accomodation: "accommodation",
  hommestay: "homestay",
  motobike: "motorbike",
  motorcyle: "motorcycle",
  pharamcy: "pharmacy",
  restarant: "restaurant",
};

const SEARCH_FILLER_WORDS = new Set(["a", "an", "and", "best", "cheap", "find", "for", "in", "near", "siargao", "the", "with"]);

export function normalizeListingSearchQuery(rawQuery: string) {
  return rawQuery
    .toLowerCase()
    .replace(/[^a-z0-9\s&-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => TYPO_CORRECTIONS[word] || word)
    .join(" ");
}

export function inferListingSearchIntent(rawQuery: string) {
  const normalized = normalizeListingSearchQuery(rawQuery);
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

/**
 * Keeps a distinctive business-name fragment when a natural-language query
 * also contains a known category or municipality. This lets a query such as
 * "Bombom motobike rental in General Luna" prefer Bombom without discarding
 * the verified transport/location filters.
 */
export function getListingBusinessSearchTerms(rawQuery: string) {
  const normalized = normalizeListingSearchQuery(rawQuery);
  const intent = inferListingSearchIntent(normalized);
  const ignored = new Set<string>(SEARCH_FILLER_WORDS);

  if (intent.municipality) {
    intent.municipality.toLowerCase().split(" ").forEach((word) => ignored.add(word));
  }
  if (intent.categoryGroup) {
    const group = LISTING_CATEGORY_GROUPS.find((item) => item.id === intent.categoryGroup);
    group?.terms.forEach((term) => term.toLowerCase().split(" ").forEach((word) => ignored.add(word)));
  }

  const residual = normalized
    .split(" ")
    .filter((word) => word.length > 1 && !ignored.has(word))
    .join(" ");
  const terms = intent.categoryGroup || intent.municipality
    ? [normalized, residual].filter((value, index, values) => residual.length >= 2 && value.length >= 2 && values.indexOf(value) === index)
    : [normalized].filter((value) => value.length >= 2);
  return { ...intent, normalized, terms };
}

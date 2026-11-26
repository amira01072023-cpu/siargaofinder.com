export const RECENT_SEARCHES_STORAGE_KEY = "siargaofinder-recent-searches";
export const MAX_RECENT_SEARCHES = 5;

export type RecentSearch = {
  q?: string;
  categoryGroup?: string;
  municipality?: string;
  hasPhone?: boolean;
};

function normalizeValue(value?: string) {
  return value?.trim().slice(0, 120) || "";
}

export function normalizeRecentSearch(search: RecentSearch): RecentSearch | null {
  const normalized: RecentSearch = {
    q: normalizeValue(search.q),
    categoryGroup: normalizeValue(search.categoryGroup),
    municipality: normalizeValue(search.municipality),
    hasPhone: Boolean(search.hasPhone),
  };

  if (!normalized.q && !normalized.categoryGroup && !normalized.municipality && !normalized.hasPhone) return null;
  return normalized;
}

export function recentSearchKey(search: RecentSearch) {
  const normalized = normalizeRecentSearch(search);
  return normalized
    ? [normalized.q || "", normalized.categoryGroup || "", normalized.municipality || "", normalized.hasPhone ? "1" : "0"].join("|")
    : "";
}

export function parseRecentSearches(value: string | null): RecentSearch[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is RecentSearch => Boolean(item) && typeof item === "object")
      .map((item) => normalizeRecentSearch(item))
      .filter((item): item is RecentSearch => Boolean(item))
      .slice(0, MAX_RECENT_SEARCHES);
  } catch {
    return [];
  }
}

export function addRecentSearch(existing: RecentSearch[], search: RecentSearch): RecentSearch[] {
  const normalized = normalizeRecentSearch(search);
  if (!normalized) return existing.slice(0, MAX_RECENT_SEARCHES);
  const key = recentSearchKey(normalized);
  return [normalized, ...existing.filter((item) => recentSearchKey(item) !== key)].slice(0, MAX_RECENT_SEARCHES);
}

export function recentSearchLabel(search: RecentSearch) {
  const parts = [search.q, search.categoryGroup?.replace(/-/g, " "), search.municipality].filter(Boolean);
  return parts.join(" · ") || "Listings with phone numbers";
}

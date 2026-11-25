export const SAVED_LISTINGS_STORAGE_KEY = "siargaofinder_saved_listings_v1";
export const SAVED_LISTINGS_UPDATED_EVENT = "siargaofinder:saved-listings-updated";

export type SavedListing = {
  id: number;
  business_name: string;
  category?: string | null;
  municipality?: string | null;
};

function isSavedListingRecord(value: unknown): value is SavedListing {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<SavedListing>;
  const id = item.id;
  return typeof id === "number" && Number.isInteger(id) && id > 0 && typeof item.business_name === "string" && Boolean(item.business_name.trim());
}

export function normalizeSavedListings(items: unknown): SavedListing[] {
  if (!Array.isArray(items)) return [];

  const seen = new Set<number>();
  return items.flatMap((item) => {
    if (!isSavedListingRecord(item) || seen.has(item.id)) return [];
    seen.add(item.id);
    return [{
      id: item.id,
      business_name: item.business_name.trim(),
      category: typeof item.category === "string" ? item.category.trim() || null : null,
      municipality: typeof item.municipality === "string" ? item.municipality.trim() || null : null,
    }];
  });
}

export function readSavedListings(): SavedListing[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_LISTINGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return normalizeSavedListings(parsed);
  } catch {
    return [];
  }
}

export function writeSavedListings(items: SavedListing[]) {
  if (typeof window === "undefined") return;
  const normalized = normalizeSavedListings(items);
  window.localStorage.setItem(SAVED_LISTINGS_STORAGE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new CustomEvent(SAVED_LISTINGS_UPDATED_EVENT, { detail: normalized }));
}

export function isSavedListing(id: number) {
  return readSavedListings().some((item) => item.id === id);
}

export function removeSavedListing(id: number) {
  const current = readSavedListings();
  const next = current.filter((entry) => entry.id !== id);
  writeSavedListings(next);
  return next;
}

export function clearSavedListings() {
  writeSavedListings([]);
  return [] as SavedListing[];
}

export function toggleSavedListing(item: SavedListing) {
  const current = readSavedListings();
  return toggleSavedListingItems(current, item);
}

export function toggleSavedListingItems(items: SavedListing[], item: SavedListing) {
  const current = normalizeSavedListings(items);
  const exists = current.some((entry) => entry.id === item.id);
  const next = exists ? current.filter((entry) => entry.id !== item.id) : [item, ...current];
  writeSavedListings(next);
  return { saved: !exists, items: normalizeSavedListings(next) };
}

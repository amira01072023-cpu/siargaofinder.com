export const SAVED_LISTINGS_STORAGE_KEY = "siargaofinder_saved_listings_v1";
export const SAVED_LISTINGS_UPDATED_EVENT = "siargaofinder:saved-listings-updated";

export type SavedListing = {
  id: number;
  business_name: string;
  category?: string | null;
  municipality?: string | null;
};

export function readSavedListings(): SavedListing[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_LISTINGS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeSavedListings(items: SavedListing[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SAVED_LISTINGS_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(SAVED_LISTINGS_UPDATED_EVENT, { detail: items }));
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
  const exists = current.some((entry) => entry.id === item.id);
  const next = exists ? current.filter((entry) => entry.id !== item.id) : [item, ...current];
  writeSavedListings(next);
  return { saved: !exists, items: next };
}

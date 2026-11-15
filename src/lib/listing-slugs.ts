export function businessNameToListingSlug(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "listing";
}

export function listingHref(listing: { business_name: string }) {
  return `/listing/${businessNameToListingSlug(listing.business_name)}`;
}

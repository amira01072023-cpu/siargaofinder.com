import { businessNameToListingSlug } from "@/lib/listing-slugs";

type NullableString = string | null | undefined;

function hasValue(v: NullableString) {
  return typeof v === "string" ? v.trim().length > 0 : false;
}

const MIN_SUBSTANTIVE_SERVICES_LENGTH = 120;
const SOURCE_NOTE_PATTERNS = [
  /public (?:business |directory |listing |source)/i,
  /not confirmed/i,
  /no public (?:email|phone|website|value)/i,
  /blank fields?/i,
  /unconfirmed fields?/i,
  /checked (?:in |july|from)/i,
  /official .*directory/i,
  /contact directory/i,
  /recorded when displayed/i,
  /published .*contact/i,
  /accessible public source/i,
  /listing supplied/i,
];

export function hasSubstantiveListingDetails(services?: NullableString) {
  if (!hasValue(services)) return false;
  const normalized = services!.replace(/\s+/g, " ").trim();
  return (
    normalized.length >= MIN_SUBSTANTIVE_SERVICES_LENGTH &&
    !SOURCE_NOTE_PATTERNS.some((pattern) => pattern.test(normalized))
  );
}

function normalizeListingDetails(services?: NullableString) {
  return typeof services === "string"
    ? services.replace(/\s+/g, " ").trim().toLowerCase()
    : "";
}

function calculate(values: NullableString[]) {
  if (!values.length) return 0;
  const filled = values.filter(hasValue).length;
  return Math.round((filled / values.length) * 100);
}

export function getBasicListingCompleteness(listing: {
  business_name?: NullableString;
  category?: NullableString;
  municipality?: NullableString;
  phone?: NullableString;
  address?: NullableString;
  services?: NullableString;
}) {
  return calculate([
    listing.business_name,
    listing.category,
    listing.municipality,
    listing.phone,
    listing.address,
    listing.services,
  ]);
}

export function getDetailedListingCompleteness(listing: {
  business_name?: NullableString;
  category?: NullableString;
  municipality?: NullableString;
  phone?: NullableString;
  email?: NullableString;
  website_url?: NullableString;
  address?: NullableString;
  services?: NullableString;
}) {
  return calculate([
    listing.business_name,
    listing.category,
    listing.municipality,
    listing.phone,
    listing.address,
    listing.services,
    listing.email,
    listing.website_url,
  ]);
}

export function hasListingContact(listing: {
  phone?: NullableString;
  email?: NullableString;
  website_url?: NullableString;
}) {
  return Boolean(
    hasValue(listing.phone) ||
    hasValue(listing.email) ||
    hasValue(listing.website_url),
  );
}

export function isIndexableBusinessListing(listing: {
  business_name?: NullableString;
  category?: NullableString;
  municipality?: NullableString;
  phone?: NullableString;
  email?: NullableString;
  website_url?: NullableString;
  address?: NullableString;
  services?: NullableString;
}) {
  return Boolean(
    hasValue(listing.business_name) &&
    hasValue(listing.category) &&
    hasValue(listing.municipality) &&
    hasValue(listing.address) &&
    hasListingContact(listing) &&
    hasSubstantiveListingDetails(listing.services),
  );
}

export function getBusinessListingValueScore(listing: {
  business_name?: NullableString;
  category?: NullableString;
  municipality?: NullableString;
  phone?: NullableString;
  email?: NullableString;
  website_url?: NullableString;
  address?: NullableString;
  services?: NullableString;
}) {
  const populatedFields = [
    listing.business_name,
    listing.category,
    listing.municipality,
    listing.phone,
    listing.email,
    listing.website_url,
    listing.address,
    listing.services,
  ].filter(hasValue).length;
  const servicesLength = typeof listing.services === "string" ? listing.services.trim().length : 0;

  return (
    (isIndexableBusinessListing(listing) ? 10_000 : 0) +
    populatedFields * 100 +
    Math.min(servicesLength, 500)
  );
}

export function getIndexableUniqueBusinessListings<
  T extends {
    business_name: string;
    category?: NullableString;
    municipality?: NullableString;
    phone?: NullableString;
    email?: NullableString;
    website_url?: NullableString;
    address?: NullableString;
    services?: NullableString;
  },
>(listings: T[]) {
  const detailSlugs = new Map<string, Set<string>>();

  for (const listing of listings) {
    if (!isIndexableBusinessListing(listing)) continue;

    const detailKey = normalizeListingDetails(listing.services);
    const slug = businessNameToListingSlug(listing.business_name);
    const slugs = detailSlugs.get(detailKey) ?? new Set<string>();
    slugs.add(slug);
    detailSlugs.set(detailKey, slugs);
  }

  const bySlug = new Map<string, T>();

  for (const listing of listings) {
    if (!isIndexableBusinessListing(listing)) continue;
    const slug = businessNameToListingSlug(listing.business_name);
    const detailKey = normalizeListingDetails(listing.services);

    // Reused descriptions create near-duplicate public pages. Keep those
    // profiles accessible, but out of the index until their details are
    // rewritten for the specific business.
    if ((detailSlugs.get(detailKey)?.size ?? 0) > 1) continue;

    const current = bySlug.get(slug);
    if (!current || getBusinessListingValueScore(listing) > getBusinessListingValueScore(current)) {
      bySlug.set(slug, listing);
    }
  }

  return [...bySlug.values()];
}

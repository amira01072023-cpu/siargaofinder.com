type NullableString = string | null | undefined;

type ListingQualityInput = {
  phone?: NullableString;
  website_url?: NullableString;
  email?: NullableString;
  address?: NullableString;
  services?: NullableString;
  socials?: unknown;
  listing_status?: NullableString;
  claim_status?: NullableString;
};

function hasValue(value: NullableString) {
  return typeof value === "string" ? value.trim().length > 0 : false;
}

function hasSocials(value: unknown) {
  if (!value) return false;
  if (typeof value === "string") {
    return value.trim().length > 0 && value.trim() !== "{}";
  }
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).some((item) =>
      typeof item === "string" ? item.trim().length > 0 : Boolean(item)
    );
  }
  return false;
}

export function getListingQualityScore(listing: ListingQualityInput) {
  const checks = [
    { label: "Phone", points: 15, passed: hasValue(listing.phone) },
    { label: "Website", points: 15, passed: hasValue(listing.website_url) },
    { label: "Email", points: 15, passed: hasValue(listing.email) },
    { label: "Address", points: 15, passed: hasValue(listing.address) },
    { label: "Socials", points: 10, passed: hasSocials(listing.socials) },
    { label: "Services", points: 15, passed: hasValue(listing.services) },
    {
      label: "Verified",
      points: 15,
      passed: listing.listing_status === "verified" || listing.claim_status === "claimed",
    },
  ];

  const score = checks.reduce((total, check) => total + (check.passed ? check.points : 0), 0);
  const missing = checks.filter((check) => !check.passed).map((check) => check.label);

  return { score, missing };
}

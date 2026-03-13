type NullableString = string | null | undefined;

function hasValue(v: NullableString) {
  return typeof v === "string" ? v.trim().length > 0 : false;
}

function calculate(values: NullableString[]) {
  if (!values.length) return 0;
  const filled = values.filter(hasValue).length;
  return Math.round((filled / values.length) * 100);
}

export function getBasicListingCompleteness(listing: {
  business_name?: NullableString;
  category?: NullableString;
  city?: NullableString;
  phone?: NullableString;
  website_url?: NullableString;
}) {
  return calculate([
    listing.business_name,
    listing.category,
    listing.city,
    listing.phone,
    listing.website_url,
  ]);
}

export function getDetailedListingCompleteness(listing: {
  business_name?: NullableString;
  category?: NullableString;
  city?: NullableString;
  phone?: NullableString;
  email?: NullableString;
  website_url?: NullableString;
  address?: NullableString;
  services?: NullableString;
}) {
  return calculate([
    listing.business_name,
    listing.category,
    listing.city,
    listing.phone,
    listing.email,
    listing.website_url,
    listing.address,
    listing.services,
  ]);
}

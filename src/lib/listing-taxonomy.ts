import { getListingCategoryGroup } from "./listing-category-groups";

export const CATEGORY_SLUG_ALIASES: Record<string, string[]> = {
  "food-chains-and-restaurants": [
    "Food",
    "Cafe",
    "Bar",
    "Food Chains & Restaurants",
    "Restaurant",
    "Restaurants",
    "Cafe",
    "Coffee shop",
    "Coffee Shops",
    "Bakery",
    "Bakeries",
    "Seafood restaurant",
    "Filipino restaurant",
    "Restaurant and cafe",
    "Restaurants, Cafes and Bars",
    "Resto bar",
    "Food Stall",
    "Food House",
    "Eatery",
    "Bar and grill",
  ],
  "hotels-and-stays": [
    "Accommodation",
    "Hotels & Stays",
    "Hotel",
    "Hostel",
    "Homestay",
    "Resort",
    "Guesthouse",
    "Accommodation",
    "Boutique hotel",
    "Hotel and Resort",
    "Hotel resort",
    "Beach resort",
    "Beach accommodation",
    "Bed and Breakfast",
    "Bed & Breakfast",
    "Villa stay",
    "Villa resort",
    "Pension house",
    "Tourist inn",
  ],
  "surf-schools-and-rentals": [
    "Surf",
    "Surf Schools & Rentals",
    "Surf school",
    "Surf shop",
    "Surf stay",
    "Surf resort and restaurant",
    "Watersports school",
    "Watersports activity",
  ],
  "tours-and-island-hopping": [
    "Tours",
    "Tours & Island Hopping",
    "Tour company",
    "Travel",
    "Travel agency",
    "Travel service",
    "Adventure activity",
    "Paddleboarding",
    "Wakeboarding park",
  ],
  "transport-rentals": [
    "Transport",
    "Rental",
    "Transport Rentals",
    "Passenger Transport",
    "Passenger transport",
    "Motorbike rental",
    "Vehicle rental",
    "Airports & Transport Terminals",
  ],
  "essentials-and-services": [
    "Services",
    "Wellness",
    "Medical",
    "Shopping",
    "Finance",
    "Construction",
    "Realestate",
    "Real Estate",
    "Entertainment",
    "Essentials & Services",
    "Laundry service",
    "Laundry Service",
    "Laundry shop",
    "Pharmacy",
    "Clinic",
    "Dental clinic",
    "Medical center",
    "Hospital",
    "Diagnostic clinic",
    "Optical clinic",
    "Gym",
    "Beauty salon",
    "Salon and spa",
    "Barbershop",
    "Spa",
    "Veterinary clinic",
    "Real Estate Services",
    "Repair service",
    "Utilities",
    "Utility service",
  ],
  "government-offices": [
    "Government",
    "Government Offices",
    "Government office",
    "Government & Tourism",
    "Coast Guard",
    "Ambulance Service",
    "Rescue Service",
  ],
  "schools-and-education": ["Education", "Schools & Education"],
};

const CATEGORY_SLUG_GROUPS: Record<string, string[]> = {
  "food-chains-and-restaurants": ["food-drinks"],
  "hotels-and-stays": ["hotels-stays"],
  "surf-schools-and-rentals": ["surf-beach"],
  "tours-and-island-hopping": ["tours-activities"],
  "transport-rentals": ["transport-rentals"],
  "essentials-and-services": ["shopping-supplies", "health-wellness", "home-construction", "professional-services"],
  "government-offices": ["government-public"],
  "schools-and-education": ["schools-education"],
};

export function categoryToSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeCategoryName(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function categoryToCanonicalSlug(name: string) {
  const normalizedName = normalizeCategoryName(name);

  for (const [canonicalSlug, aliases] of Object.entries(CATEGORY_SLUG_ALIASES)) {
    const canonicalNames = [canonicalSlug, slugToLabel(canonicalSlug), ...aliases];
    if (canonicalNames.some((candidate) => normalizeCategoryName(candidate) === normalizedName)) {
      return canonicalSlug;
    }
  }

  return categoryToSlug(name);
}

export function categorySlugToCanonicalSlug(slug: string) {
  return categoryToCanonicalSlug(slugToLabel(slug));
}

export function slugToLabel(slug: string) {
  const prettyMap: Record<string, string> = {
    "hotels-and-stays": "Hotels & Stays",
    "food-chains-and-restaurants": "Food Chains & Restaurants",
    "essentials-and-services": "Essentials & Services",
    "schools-and-education": "Schools & Education",
    "government-offices": "Government Offices",
    "surf-schools-and-rentals": "Surf Schools & Rentals",
    "transport-rentals": "Transport Rentals",
    "airports-and-transport-terminals": "Airports & Transport Terminals",
    "gasoline-stations": "Gasoline Stations",
    "supermarkets-malls-and-hypermarkets": "Supermarkets, Malls & Hypermarkets",
    "banks-and-atms": "Banks & ATMs",
    "tours-and-island-hopping": "Tours & Island Hopping",
    "remittance-and-pera-padala": "Remittance & Pera Padala",
    "wet-market": "Wet Market",
    "survey-firms": "Survey Firms",
  };

  return (
    prettyMap[slug] ||
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}

export function getCategorySearchTerms(slug: string) {
  const groupTerms = (CATEGORY_SLUG_GROUPS[slug] || []).flatMap((groupId) => getListingCategoryGroup(groupId)?.terms || []);
  return [...new Set([...(CATEGORY_SLUG_ALIASES[slug] || []), ...groupTerms, slugToLabel(slug)])];
}

export function categoryMatchesCanonicalSlug(category: string | null | undefined, slug: string) {
  const normalizedCategory = category?.toLowerCase() || "";
  return getCategorySearchTerms(slug).some((term) => normalizedCategory.includes(term.toLowerCase()));
}

/**
 * Maps a raw directory category to a curated landing hub only for navigation
 * and counts. It deliberately does not change legacy category route slugs.
 */
export function categoryToLandingSlug(category: string) {
  const exactCanonicalSlug = categoryToCanonicalSlug(category);
  if (exactCanonicalSlug !== categoryToSlug(category)) return exactCanonicalSlug;

  return Object.keys(CATEGORY_SLUG_ALIASES).find((slug) =>
    categoryMatchesCanonicalSlug(category, slug),
  ) || exactCanonicalSlug;
}

export function categorySeoLabel(slug: string) {
  const seoMap: Record<string, string> = {
    "food-chains-and-restaurants": "Restaurants and Cafes",
    "transport-rentals": "Transport Rentals",
    "hotels-and-stays": "Hotels and Stays",
    "surf-schools-and-rentals": "Surf Schools and Rentals",
    "tours-and-island-hopping": "Tours and Island Hopping",
  };

  return seoMap[slug] || slugToLabel(slug);
}

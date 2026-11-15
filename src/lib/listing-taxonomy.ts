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

export function categoryToSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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
  return [...new Set([...(CATEGORY_SLUG_ALIASES[slug] || []), slugToLabel(slug)])];
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

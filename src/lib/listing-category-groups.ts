export type ListingCategoryGroup = {
  id: string;
  label: string;
  terms: string[];
};

export const LISTING_CATEGORY_GROUPS: ListingCategoryGroup[] = [
  {
    id: "food-drinks",
    label: "Food & Drinks",
    terms: ["food", "restaurant", "cafe", "bar", "bakery", "coffee", "beverage", "pastry", "dessert", "seafood", "meat"],
  },
  {
    id: "hotels-stays",
    label: "Hotels & Stays",
    terms: ["accommodation", "hotel", "hostel", "homestay", "resort", "guesthouse", "villa", "stay", "inn"],
  },
  {
    id: "tours-activities",
    label: "Tours & Activities",
    terms: ["tour", "travel", "activity", "island hopping", "adventure", "paddleboarding", "wakeboarding"],
  },
  {
    id: "transport-rentals",
    label: "Transport & Rentals",
    terms: ["transport", "rental", "motorbike", "scooter", "vehicle", "cargo", "delivery", "logistics", "booking"],
  },
  {
    id: "surf-beach",
    label: "Surf & Beach",
    terms: ["surf", "beach", "swimwear", "watersports", "skate"],
  },
  {
    id: "shopping-supplies",
    label: "Shopping & Supplies",
    terms: ["shopping", "supplier", "grocery", "general merchandise", "store", "market", "souvenir", "apparel", "clothing", "gift", "retail"],
  },
  {
    id: "health-wellness",
    label: "Health & Wellness",
    terms: ["medical", "clinic", "pharmacy", "wellness", "spa", "salon", "dental", "optical", "veterinary", "gym", "yoga"],
  },
  {
    id: "home-construction",
    label: "Home, Hardware & Construction",
    terms: ["construction", "hardware", "building", "glass", "aluminum", "steel", "roofing", "lumber", "sand", "gravel", "furniture", "appliance"],
  },
  {
    id: "government-public",
    label: "Government & Public Services",
    terms: ["government", "public", "coast guard", "ambulance", "rescue"],
  },
  {
    id: "schools-education",
    label: "Schools & Education",
    terms: ["education", "school", "books", "educational"],
  },
  {
    id: "professional-services",
    label: "Professional Services",
    terms: ["services", "real estate", "finance", "law", "printing", "computer", "internet", "repair", "photography"],
  },
];

export function getListingCategoryGroup(id: string) {
  return LISTING_CATEGORY_GROUPS.find((group) => group.id === id);
}

export function categoryMatchesGroup(category: string | null | undefined, group: ListingCategoryGroup) {
  const normalized = category?.toLowerCase() || "";
  return group.terms.some((term) => normalized.includes(term));
}

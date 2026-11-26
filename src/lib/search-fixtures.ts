/**
 * Manual/e2e search fixture based on real public directory records. It never
 * writes data and keeps expected results as name fragments so duplicate source
 * records do not make the fixture brittle.
 */
export type SearchFixture = {
  id: string;
  query: string;
  expectedNameFragment?: string;
  expectedCategoryGroup?: string;
  expectedMunicipality?: string;
  clearsFilters?: boolean;
  expectsNoResults?: boolean;
};

export const DIRECTORY_SEARCH_FIXTURES: SearchFixture[] = [
  { id: "exact-bombom", query: "Bombom Motorbike Rentals", expectedNameFragment: "bombom" },
  { id: "exact-sur", query: "Sur Transport Solutions", expectedNameFragment: "sur transport" },
  { id: "exact-inson", query: "Inson Cycles and Accessories", expectedNameFragment: "inson cycles" },
  { id: "exact-tofu", query: "Tofu and Tempeh Siargao", expectedNameFragment: "tofu and tempeh" },
  { id: "exact-saliargaw", query: "Saliargaw Hostel", expectedNameFragment: "saliargaw hostel" },
  { id: "exact-may-ann", query: "May Ann Homestay", expectedNameFragment: "may ann" },
  { id: "exact-rural-health", query: "Del Carmen Rural Health Unit", expectedNameFragment: "rural health" },
  { id: "exact-optical", query: "RN Optical Clinic Siargao", expectedNameFragment: "rn optical" },
  { id: "typo-motobike", query: "Bombom motobike rental", expectedNameFragment: "bombom", expectedCategoryGroup: "transport-rentals" },
  { id: "typo-accomodation", query: "accomodation in General Luna", expectedCategoryGroup: "hotels-stays", expectedMunicipality: "General Luna" },
  { id: "typo-restarant", query: "restarant in General Luna", expectedCategoryGroup: "food-drinks", expectedMunicipality: "General Luna" },
  { id: "synonym-scooter", query: "scooter", expectedCategoryGroup: "transport-rentals" },
  { id: "synonym-guesthouse", query: "guesthouse", expectedCategoryGroup: "hotels-stays" },
  { id: "synonym-clinic", query: "clinic", expectedCategoryGroup: "health-wellness" },
  { id: "natural-motorbike", query: "motorbike rental in General Luna", expectedCategoryGroup: "transport-rentals", expectedMunicipality: "General Luna" },
  { id: "natural-hardware", query: "hardware suppliers in Dapa", expectedCategoryGroup: "home-construction", expectedMunicipality: "Dapa" },
  { id: "natural-surf", query: "surf schools in San Isidro", expectedCategoryGroup: "surf-beach", expectedMunicipality: "San Isidro" },
  { id: "location-food", query: "food in Del Carmen", expectedCategoryGroup: "food-drinks", expectedMunicipality: "Del Carmen" },
  { id: "location-government", query: "government offices in Socorro", expectedCategoryGroup: "government-public", expectedMunicipality: "Socorro" },
  { id: "empty", query: "", clearsFilters: true },
  { id: "clear-filters", query: "", clearsFilters: true },
  { id: "no-result", query: "unlikelydirectoryqueryzz", expectsNoResults: true },
];

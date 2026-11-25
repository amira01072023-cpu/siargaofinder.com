import type { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { getSiteUrl } from "@/lib/site-url";
import { getIndexableUniqueBusinessListings } from "@/lib/listing-completeness";
import { listingHref } from "@/lib/listing-slugs";
import { CATEGORY_SLUG_ALIASES, categoryMatchesCanonicalSlug } from "@/lib/listing-taxonomy";
import { municipalityToSlug, SIARGAO_MUNICIPALITIES } from "@/lib/siargao-municipalities";

const baseUrl = getSiteUrl();
const listingSelect = "id,business_name,last_verified_at,category,municipality,phone,email,website_url,address,services";
const LISTING_BATCH_SIZE = 1000;
const MIN_COMBINED_LANDING_LISTINGS = 20;

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const getSitemapRows = unstable_cache(
async () => {
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnon) return { listings: [] };

const supabase = createClient(supabaseUrl, supabaseAnon);
const listings = [];

for (let from = 0; from < 5000; from += LISTING_BATCH_SIZE) {
  const to = from + LISTING_BATCH_SIZE - 1;
  const { data, error } = await supabase
  .from("business_listings")
  .select(listingSelect)
  .order("id", { ascending: false })
  .range(from, to);

  if (error || !data?.length) break;
  listings.push(...data);
  if (data.length < LISTING_BATCH_SIZE) break;
}

return {
listings,
};
},
["sitemap-rows"],
{ revalidate: 3600 },
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
const staticRoutes: MetadataRoute.Sitemap = [
{ url: `${baseUrl}/`, changeFrequency: "daily", priority: 1.0 },
{ url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
{ url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.5 },
{ url: `${baseUrl}/privacy-policy`, changeFrequency: "monthly", priority: 0.3 },
{ url: `${baseUrl}/terms-of-use`, changeFrequency: "monthly", priority: 0.3 },
{ url: `${baseUrl}/editorial-policy`, changeFrequency: "monthly", priority: 0.4 },
{ url: `${baseUrl}/directory-standards`, changeFrequency: "monthly", priority: 0.4 },
{ url: `${baseUrl}/advertising-disclosure`, changeFrequency: "monthly", priority: 0.4 },
{ url: `${baseUrl}/accessibility-statement`, changeFrequency: "monthly", priority: 0.3 },
{ url: `${baseUrl}/data-rights-request`, changeFrequency: "monthly", priority: 0.3 },
{ url: `${baseUrl}/eu-compliance`, changeFrequency: "monthly", priority: 0.4 },
{ url: `${baseUrl}/report-illegal-content`, changeFrequency: "monthly", priority: 0.4 },

// Blog pages
{ url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/where-to-stay-in-siargao`, changeFrequency: "weekly", priority: 0.9 },
{ url: `${baseUrl}/blog/general-luna-travel-guide`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/pacifico-travel-guide`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-luxury-travel-guide`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-for-couples`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-solo-travel-guide`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/family-friendly-things-to-do-in-siargao`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-for-non-surfers`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-itinerary`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/best-time-to-visit-siargao`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/how-to-get-around-siargao`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/manila-to-siargao-travel-guide`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/blog/how-much-does-a-siargao-trip-cost`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/blog/siargao-first-time-visitors`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/best-things-to-do-in-siargao-beyond-surfing`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/cloud-9-guide-for-first-time-visitors`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/best-sunset-spots-in-siargao`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/best-areas-to-stay-in-siargao-by-travel-style`, changeFrequency: "weekly", priority: 0.9 },
{ url: `${baseUrl}/blog/siargao-airport-guide`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/best-beaches-in-siargao`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/best-restaurants-in-siargao`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/medical-options-siargao`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/scooter-rental-in-siargao`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-airport-to-general-luna`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-island-hopping-contacts`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-motorbike-rental-guide`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-restaurant-directory`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/where-to-eat-in-siargao`, changeFrequency: "weekly", priority: 0.8 },

// Guide pages
{ url: `${baseUrl}/guide/best-cafes-in-siargao`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/guide/best-restaurants-in-general-luna`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/guide/siargao-surf-schools-guide`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/guide/siargao-island-hopping-guide`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/guide/siargao-transport-guide`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/guide/siargao-coworking-guide`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/guide/where-to-find-services-in-siargao`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/guide/top-local-businesses-in-siargao`, changeFrequency: "weekly", priority: 0.7 },

{ url: `${baseUrl}/list-your-business`, changeFrequency: "weekly", priority: 0.6 },

// Siargao municipality pages
{ url: `${baseUrl}/municipality/general-luna`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/municipality/dapa`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/municipality/del-carmen`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/municipality/pilar`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/municipality/san-benito`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/municipality/san-isidro`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/municipality/santa-monica`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/municipality/socorro`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/municipality/burgos`, changeFrequency: "weekly", priority: 0.7 },

// Category pages
{ url: `${baseUrl}/category/hotels-and-stays`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/category/food-chains-and-restaurants`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/category/surf-schools-and-rentals`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/category/tours-and-island-hopping`, changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/category/transport-rentals`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/category/essentials-and-services`, changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/category/government-offices`, changeFrequency: "weekly", priority: 0.6 },
{ url: `${baseUrl}/category/schools-and-education`, changeFrequency: "weekly", priority: 0.6 },
];

const { listings: data } = await getSitemapRows();

if (!data.length) return staticRoutes;

const indexableListings = getIndexableUniqueBusinessListings(data);
const directoryListings = data.filter((listing) => SIARGAO_MUNICIPALITIES.includes(listing.municipality ?? ""));
const filteredStaticRoutes = staticRoutes.filter((route) => {
  const path = new URL(route.url).pathname;
  const categoryMatch = path.match(/^\/category\/([^/]+)$/);
  if (categoryMatch) {
    const count = directoryListings.filter((listing) => categoryMatchesCanonicalSlug(listing.category, categoryMatch[1])).length;
    return count >= 5;
  }

  const municipalityMatch = path.match(/^\/municipality\/([^/]+)$/);
  if (municipalityMatch) {
    return directoryListings.some(
      (listing) => municipalityToSlug(listing.municipality ?? "") === municipalityMatch[1],
    );
  }

  return true;
});

const listingRoutes: MetadataRoute.Sitemap = indexableListings.map((row) => ({
    url: `${baseUrl}${listingHref(row)}`,
    ...(row.last_verified_at ? { lastModified: new Date(row.last_verified_at) } : {}),
    changeFrequency: "weekly",
    priority: 0.7,
}));

const municipalityCategoryRoutes: MetadataRoute.Sitemap = [];

for (const municipality of SIARGAO_MUNICIPALITIES) {
  const municipalitySlug = municipalityToSlug(municipality);

  for (const categorySlug of Object.keys(CATEGORY_SLUG_ALIASES)) {
    const matchingRows = directoryListings.filter(
      (listing) =>
        municipalityToSlug(listing.municipality ?? "") === municipalitySlug &&
        categoryMatchesCanonicalSlug(listing.category, categorySlug),
    );
    const count = matchingRows.length;

    if (count >= MIN_COMBINED_LANDING_LISTINGS) {
      municipalityCategoryRoutes.push({
        url: `${baseUrl}/municipality/${municipalitySlug}/category/${categorySlug}`,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }
}

return [...filteredStaticRoutes, ...municipalityCategoryRoutes, ...listingRoutes];
}

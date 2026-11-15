import type { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { getSiteUrl } from "@/lib/site-url";
import { getIndexableUniqueBusinessListings } from "@/lib/listing-completeness";
import { listingHref } from "@/lib/listing-slugs";
import { getCategorySearchTerms } from "@/lib/listing-taxonomy";
import { municipalityToSlug } from "@/lib/siargao-municipalities";

const baseUrl = getSiteUrl();
const listingSelect = "id,business_name,last_verified_at,category,municipality,phone,email,website_url,address,services";
const LISTING_BATCH_SIZE = 1000;

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
{ url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
{ url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
{ url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
{ url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
{ url: `${baseUrl}/terms-of-use`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
{ url: `${baseUrl}/editorial-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
{ url: `${baseUrl}/directory-standards`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
{ url: `${baseUrl}/advertising-disclosure`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
{ url: `${baseUrl}/accessibility-statement`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
{ url: `${baseUrl}/data-rights-request`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
{ url: `${baseUrl}/eu-compliance`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
{ url: `${baseUrl}/report-illegal-content`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },

// Blog pages
{ url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/where-to-stay-in-siargao`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
{ url: `${baseUrl}/blog/general-luna-travel-guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/pacifico-travel-guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-luxury-travel-guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-for-couples`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-solo-travel-guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/family-friendly-things-to-do-in-siargao`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-for-non-surfers`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-itinerary`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/best-time-to-visit-siargao`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/how-to-get-around-siargao`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/manila-to-siargao-travel-guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/blog/how-much-does-a-siargao-trip-cost`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/blog/siargao-first-time-visitors`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/best-things-to-do-in-siargao-beyond-surfing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/cloud-9-guide-for-first-time-visitors`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/best-sunset-spots-in-siargao`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/best-areas-to-stay-in-siargao-by-travel-style`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
{ url: `${baseUrl}/blog/siargao-airport-guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/best-beaches-in-siargao`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/best-restaurants-in-siargao`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/medical-options-siargao`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/scooter-rental-in-siargao`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-airport-to-general-luna`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-island-hopping-contacts`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-motorbike-rental-guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/siargao-restaurant-directory`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/blog/where-to-eat-in-siargao`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },

// Guide pages
{ url: `${baseUrl}/guide/best-cafes-in-siargao`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/guide/best-restaurants-in-general-luna`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/guide/siargao-surf-schools-guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/guide/siargao-island-hopping-guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/guide/siargao-transport-guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/guide/siargao-coworking-guide`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/guide/where-to-find-services-in-siargao`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/guide/top-local-businesses-in-siargao`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },

{ url: `${baseUrl}/list-your-business`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },

// Siargao municipality pages
{ url: `${baseUrl}/municipality/general-luna`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/municipality/dapa`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/municipality/del-carmen`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/municipality/pilar`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/municipality/san-benito`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/municipality/san-isidro`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/municipality/santa-monica`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/municipality/socorro`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/municipality/burgos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },

// Category pages
{ url: `${baseUrl}/category/hotels-and-stays`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/category/food-chains-and-restaurants`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/category/surf-schools-and-rentals`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/category/tours-and-island-hopping`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/category/transport-rentals`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/category/essentials-and-services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/category/government-offices`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
{ url: `${baseUrl}/category/schools-and-education`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
];

const { listings: data } = await getSitemapRows();

if (!data.length) return staticRoutes;

const indexableListings = getIndexableUniqueBusinessListings(data);
const filteredStaticRoutes = staticRoutes.filter((route) => {
  const path = new URL(route.url).pathname;
  const categoryMatch = path.match(/^\/category\/([^/]+)$/);
  if (categoryMatch) {
    const terms = getCategorySearchTerms(categoryMatch[1]).map((term) => term.toLowerCase());
    const count = indexableListings.filter((listing) =>
      terms.some((term) => listing.category?.toLowerCase().includes(term)),
    ).length;
    return count >= 5;
  }

  const municipalityMatch = path.match(/^\/municipality\/([^/]+)$/);
  if (municipalityMatch) {
    return indexableListings.some(
      (listing) => municipalityToSlug(listing.municipality ?? "") === municipalityMatch[1],
    );
  }

  return true;
});

const listingRoutes: MetadataRoute.Sitemap = indexableListings.map((row) => ({
    url: `${baseUrl}${listingHref(row)}`,
    lastModified: row.last_verified_at ? new Date(row.last_verified_at) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
}));

return [...filteredStaticRoutes, ...listingRoutes];
}

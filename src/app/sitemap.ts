import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { getSiteUrl } from "@/lib/site-url";

const baseUrl = getSiteUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
const staticRoutes: MetadataRoute.Sitemap = [
{ url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
{ url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
{ url: `${baseUrl}/terms-of-use`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
{ url: `${baseUrl}/accessibility-statement`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
{ url: `${baseUrl}/data-rights-request`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
{ url: `${baseUrl}/eu-compliance`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
{ url: `${baseUrl}/report-illegal-content`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },

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

// Siargao area pages
{ url: `${baseUrl}/city/general-luna`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/city/dapa`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/city/del-carmen`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/city/pilar`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/city/san-benito`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/city/socorro`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/city/santa-monica`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },

// Category pages
{ url: `${baseUrl}/category/accommodation`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/category/cafes-restaurants`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/category/surf-schools-rentals`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/category/tours-island-hopping`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
{ url: `${baseUrl}/category/transport`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/category/wellness`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/category/coworking`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
{ url: `${baseUrl}/category/essentials`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnon) return staticRoutes;

const supabase = createClient(supabaseUrl, supabaseAnon);

const { data, error } = await supabase
.from("business_listings")
.select("id,last_verified_at")
.order("id", { ascending: false })
.limit(5000);

if (error || !data) return staticRoutes;

const listingRoutes: MetadataRoute.Sitemap = data.map((row) => ({
url: `${baseUrl}/listing/${row.id}`,
lastModified: row.last_verified_at ? new Date(row.last_verified_at) : new Date(),
changeFrequency: "weekly",
priority: 0.7,
}));

return [...staticRoutes, ...listingRoutes];
}

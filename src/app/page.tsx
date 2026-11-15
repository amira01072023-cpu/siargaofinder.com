import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import HomePageClient from "@/components/HomePageClient";
import { getPublicListingFacets } from "@/lib/public-listing-data";
import { getSiteUrl } from "@/lib/site-url";
import { SIARGAO_MUNICIPALITIES } from "@/lib/siargao-municipalities";

type Listing = {
  id: number;
  business_name: string;
  category: string | null;
  municipality: string | null;
  phone: string | null;
  website_url: string | null;
  socials?: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    x?: string;
  } | null;
};

type PopularCategory = {
  name: string;
  count: number;
};

export const dynamic = "force-dynamic";
export const revalidate = 300;

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Siargao Directory: Local Businesses, Hotels, Cafes, Tours & Services",
  description:
    "Find local businesses in Siargao, including hotels, cafes, restaurants, surf schools, tours, transport rentals, and essential services across General Luna and nearby municipalities.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Siargao Directory: Local Businesses, Hotels, Cafes, Tours & Services",
    description:
      "Find local businesses in Siargao, including hotels, cafes, restaurants, surf schools, tours, transport rentals, and essential services across General Luna and nearby municipalities.",
    url: siteUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Siargao Directory: Local Businesses, Hotels, Cafes, Tours & Services",
    description:
      "Find local businesses in Siargao, including hotels, cafes, restaurants, surf schools, tours, transport rentals, and essential services across General Luna and nearby municipalities.",
  },
};

const HOME_LISTINGS_LIMIT = 10;
const RANDOM_LISTINGS_POOL_SIZE = 50;

function shuffleItems<T>(items: T[]) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const getHomeData = unstable_cache(async function getHomeData() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnon) {
    return {
      items: [],
      page: 1,
      limit: HOME_LISTINGS_LIMIT,
      total: 0,
      totalPages: 1,
      categories: [],
      municipalities: SIARGAO_MUNICIPALITIES,
      popularCategories: [] as PopularCategory[],
    };
  }

  const supabase = createClient(supabaseUrl, supabaseAnon);

  const listingCountQuery = supabase
    .from("business_listings")
    .select("id", { count: "exact", head: true })
    .in("municipality", SIARGAO_MUNICIPALITIES);

  const [listingCountResult, facets] = await Promise.all([
    listingCountQuery,
    getPublicListingFacets(),
  ]);

  const total = listingCountResult.count ?? 0;
  const randomOffset = Math.floor(
    Math.random() * Math.max(total - RANDOM_LISTINGS_POOL_SIZE + 1, 1),
  );

  const listingsResult = await supabase
    .from("business_listings")
    .select("id, business_name, category, municipality, phone, website_url, socials")
    .in("municipality", SIARGAO_MUNICIPALITIES)
    .order("id", { ascending: false })
    .range(randomOffset, randomOffset + RANDOM_LISTINGS_POOL_SIZE - 1);

  const items = shuffleItems((listingsResult.data ?? []) as Listing[]).slice(0, HOME_LISTINGS_LIMIT);

  return {
    items,
    page: 1,
    limit: HOME_LISTINGS_LIMIT,
    total,
    totalPages: Math.max(Math.ceil(total / HOME_LISTINGS_LIMIT), 1),
    categories: facets.categories,
    municipalities: facets.municipalities,
    popularCategories: facets.categoryBuckets as PopularCategory[],
  };
}, ["home-listing-data"], { revalidate: 300 });

export default async function Page() {
  const initialData = await getHomeData();
  return <HomePageClient initialData={initialData} />;
}

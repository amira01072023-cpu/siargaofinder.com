import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { SIARGAO_MUNICIPALITIES } from "@/lib/siargao-municipalities";
import { getIndexableUniqueBusinessListings } from "@/lib/listing-completeness";

const SUPABASE_PAGE_SIZE = 1000;
const CACHE_REVALIDATE_SECONDS = 900;

type ListingFacetRow = {
  category: string | null;
  municipality: string | null;
};

export type PublicListingRow = {
  id: number;
  business_name: string;
  category: string | null;
  municipality: string | null;
  phone: string | null;
  email: string | null;
  website_url: string | null;
  address: string | null;
  services: string | null;
  last_verified_at?: string | null;
};

export type ListingBucket = {
  name: string;
  count: number;
};

function getPublicSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnon) return null;
  return createClient(supabaseUrl, supabaseAnon);
}

function buildBuckets(values: Array<string | null | undefined>): ListingBucket[] {
  const map = new Map<string, ListingBucket>();

  for (const raw of values) {
    const value = raw?.trim();
    if (!value) continue;
    const key = value.toLowerCase().replace(/\s+/g, " ");
    const current = map.get(key);
    map.set(key, {
      name: current?.name || value,
      count: (current?.count || 0) + 1,
    });
  }

  return [...map.values()]
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

async function fetchListingFacetRows(): Promise<ListingFacetRow[]> {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return [];

  const rows: ListingFacetRow[] = [];

  for (let from = 0; ; from += SUPABASE_PAGE_SIZE) {
    const { data, error } = await supabase
      .from("business_listings")
      .select("category,municipality")
      .in("municipality", SIARGAO_MUNICIPALITIES)
      .range(from, from + SUPABASE_PAGE_SIZE - 1);

    if (error) return rows;

    rows.push(...((data ?? []) as ListingFacetRow[]));
    if (!data || data.length < SUPABASE_PAGE_SIZE) break;
  }

  return rows;
}

async function fetchPublicListingRows(): Promise<PublicListingRow[]> {
  const supabase = getPublicSupabaseClient();
  if (!supabase) return [];

  const rows: PublicListingRow[] = [];

  for (let from = 0; ; from += SUPABASE_PAGE_SIZE) {
    const { data, error } = await supabase
      .from("business_listings")
      .select("id,business_name,category,municipality,phone,email,website_url,address,services,last_verified_at")
      .order("id", { ascending: false })
      .range(from, from + SUPABASE_PAGE_SIZE - 1);

    if (error) return rows;

    rows.push(...((data ?? []) as PublicListingRow[]));
    if (!data || data.length < SUPABASE_PAGE_SIZE) break;
  }

  return rows;
}

export const getIndexablePublicListings = unstable_cache(
  async () => getIndexableUniqueBusinessListings(await fetchPublicListingRows()),
  ["indexable-public-listings-v1"],
  { revalidate: 1800 },
);

export const getPublicListingFacets = unstable_cache(
  async () => {
    const rows = await fetchListingFacetRows();
    const categoryBuckets = buildBuckets(rows.map((row) => row.category));
    const municipalityBuckets = buildBuckets(rows.map((row) => row.municipality)).filter((bucket) =>
      SIARGAO_MUNICIPALITIES.includes(bucket.name),
    );

    return {
      total: rows.length,
      categories: categoryBuckets.map((bucket) => bucket.name),
      municipalities: SIARGAO_MUNICIPALITIES,
      categoryBuckets,
      municipalityBuckets,
    };
  },
  ["public-listing-facets-v2"],
  { revalidate: CACHE_REVALIDATE_SECONDS },
);

export type RecentListingRow = {
  id: number;
  business_name: string;
  category: string | null;
  municipality: string | null;
  phone: string | null;
  email: string | null;
  website_url: string | null;
  address: string | null;
  last_verified_at: string | null;
};

export const getRecentlyAddedListings = unstable_cache(
  async (): Promise<RecentListingRow[]> => {
    const supabase = getPublicSupabaseClient();
    if (!supabase) return [];

    const { data, error } = await supabase
      .from("business_listings")
      .select("id,business_name,category,municipality,phone,email,website_url,address,last_verified_at")
      .in("municipality", SIARGAO_MUNICIPALITIES)
      .not("created_at", "is", null)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .limit(6);

    if (error) return [];
    return (data ?? []) as RecentListingRow[];
  },
  ["recently-added-listings-v1"],
  { revalidate: CACHE_REVALIDATE_SECONDS },
);

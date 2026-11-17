import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import HomePageClient from "@/components/HomePageClient";
import { getPublicListingFacets } from "@/lib/public-listing-data";
import { getSiteUrl } from "@/lib/site-url";

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

const getHomeData = unstable_cache(async function getHomeData() {
  const facets = await getPublicListingFacets();
  const total = facets.total;

  return {
    page: 1,
    total,
    totalPages: Math.max(Math.ceil(total / HOME_LISTINGS_LIMIT), 1),
    municipalities: facets.municipalities,
    popularCategories: facets.categoryBuckets as PopularCategory[],
  };
}, ["home-listing-data"], { revalidate: 300 });

function firstSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const initialData = await getHomeData();
  const params = await searchParams;
  const parsedPage = Number(firstSearchParam(params.page));
  const initialSearch = {
    q: firstSearchParam(params.q).slice(0, 120),
    categoryGroup: firstSearchParam(params.categoryGroup),
    municipality: firstSearchParam(params.municipality),
    hasPhone: firstSearchParam(params.hasPhone) === "1",
    page: Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1,
  };

  return <HomePageClient initialData={initialData} initialSearch={initialSearch} />;
}

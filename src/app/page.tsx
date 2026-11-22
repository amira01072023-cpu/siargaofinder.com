import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import HomePageClient from "@/components/HomePageClient";
import { getPublicListingFacets } from "@/lib/public-listing-data";
import { getSiteUrl } from "@/lib/site-url";
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/seo-metadata";

type PopularCategory = {
  name: string;
  count: number;
};

export const dynamic = "force-dynamic";
export const revalidate = 300;

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Siargao Business Directory | Local Services & Contacts",
  description:
    "Find Siargao businesses, hotels, cafes, tours, rentals, surf schools, transport, and essential services across all nine municipalities.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Siargao Business Directory | Local Services & Contacts",
    description:
      "Find Siargao businesses, hotels, cafes, tours, rentals, surf schools, transport, and essential services across all nine municipalities.",
    url: siteUrl,
    type: "website",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siargao Business Directory | Local Services & Contacts",
    description:
      "Find Siargao businesses, hotels, cafes, tours, rentals, surf schools, transport, and essential services across all nine municipalities.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
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

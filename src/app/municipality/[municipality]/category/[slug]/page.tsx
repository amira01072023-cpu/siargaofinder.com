import type { Metadata } from "next";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { cache } from "react";
import { ArrowRight, Building2, MapPin } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import BusinessListingCard from "@/components/BusinessListingCard";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import {
  categorySeoLabel,
  categorySlugToCanonicalSlug,
  getCategorySearchTerms,
  slugToLabel,
} from "@/lib/listing-taxonomy";
import { getSiteUrl } from "@/lib/site-url";
import { slugToMunicipality } from "@/lib/siargao-municipalities";
import { getIndexableUniqueBusinessListings } from "@/lib/listing-completeness";
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/seo-metadata";

type Listing = {
  id: number;
  business_name: string;
  category: string | null;
  municipality: string | null;
  phone: string | null;
  email: string | null;
  website_url: string | null;
  address?: string | null;
  services: string | null;
};

const MIN_INDEXABLE_MUNICIPALITY_CATEGORY_LISTINGS = 5;

const getMunicipalityCategoryListings = cache(async function getMunicipalityCategoryListings(municipalitySlug: string, categorySlug: string): Promise<Listing[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnon) return [];

  const municipality = slugToMunicipality(municipalitySlug);
  const terms = getCategorySearchTerms(categorySlug);
  const supabase = createClient(supabaseUrl, supabaseAnon);

  const results = await Promise.all(
    terms.map((term) =>
      supabase
        .from("business_listings")
        .select("id,business_name,category,municipality,phone,email,website_url,address,services")
        .ilike("municipality", `%${municipality}%`)
        .ilike("category", `%${term}%`)
        .order("id", { ascending: false })
        .limit(100),
    ),
  );

  const listings = new Map<number, Listing>();
  for (const result of results) {
    if (result.error || !result.data) continue;
    for (const item of result.data as Listing[]) listings.set(item.id, item);
  }

  return getIndexableUniqueBusinessListings([...listings.values()])
    .sort((a, b) => b.id - a.id)
    .slice(0, 100);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ municipality: string; slug: string }>;
}): Promise<Metadata> {
  const { municipality, slug } = await params;
  const canonicalSlug = categorySlugToCanonicalSlug(slug);
  const municipalityName = slugToMunicipality(municipality);
  const categoryName = categorySeoLabel(canonicalSlug);
  const baseUrl = getSiteUrl();
  const title = `${categoryName} in ${municipalityName}, Siargao`;
  const description = `Find ${categoryName.toLowerCase()} in ${municipalityName}, Siargao with local listings, contact details, addresses, and practical comparison help.`;
  const listings = await getMunicipalityCategoryListings(municipality, canonicalSlug);
  const hasEnoughListings = listings.length >= MIN_INDEXABLE_MUNICIPALITY_CATEGORY_LISTINGS;

  return {
    title,
    description,
    alternates: {
      canonical: `/municipality/${municipality}/category/${canonicalSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/municipality/${municipality}/category/${canonicalSlug}`,
      type: "website",
      images: [DEFAULT_SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [DEFAULT_SOCIAL_IMAGE.url],
    },
    robots: hasEnoughListings
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default async function MunicipalityCategoryPage({
  params,
}: {
  params: Promise<{ municipality: string; slug: string }>;
}) {
  const { municipality, slug } = await params;
  const canonicalSlug = categorySlugToCanonicalSlug(slug);
  if (canonicalSlug !== slug) {
    permanentRedirect(`/municipality/${municipality}/category/${canonicalSlug}`);
  }
  const municipalityName = slugToMunicipality(municipality);
  const categoryName = slugToLabel(canonicalSlug);
  const seoCategoryName = categorySeoLabel(canonicalSlug);
  const listings = await getMunicipalityCategoryListings(municipality, canonicalSlug);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/municipality/${municipality}/category/${canonicalSlug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${seoCategoryName} in ${municipalityName}, Siargao`,
    url: pageUrl,
    about: [seoCategoryName, municipalityName],
    isPartOf: {
      "@type": "WebSite",
      name: "Siargao Finder",
      url: siteUrl,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: municipalityName, item: `${siteUrl}/municipality/${municipality}` },
        { "@type": "ListItem", position: 3, name: seoCategoryName, item: pageUrl },
      ],
    },
  };

  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PublicSiteHeader />

      <section className="page-section page-hero">
        <p className="page-kicker">Local category</p>
        <h1 className="page-title">{seoCategoryName} in {municipalityName}</h1>
        <p className="page-subtitle">
          Browse {listings.length} listing{listings.length === 1 ? "" : "s"} for {categoryName.toLowerCase()} in {municipalityName}, with contact details, locations, and quick actions for comparing local options.
        </p>

        <div className="category-page-summary mt-8">
          <div className="category-page-summary-card">
            <span className="category-page-summary-label">Listings</span>
            <div className="category-page-summary-value">
              <Building2 size={16} />
              <span>{listings.length}</span>
            </div>
          </div>
          <div className="category-page-summary-card">
            <span className="category-page-summary-label">Area</span>
            <div className="category-page-summary-value">
              <MapPin size={16} />
              <span>{municipalityName}</span>
            </div>
          </div>
          <div className="category-page-summary-card">
            <span className="category-page-summary-label">Best use</span>
            <div className="category-page-summary-value">
              <ArrowRight size={16} />
              <span>Shortlist nearby</span>
            </div>
          </div>
        </div>

        {listings.length === 0 ? (
          <p className="status-message">No listings found for {categoryName} in {municipalityName} yet.</p>
        ) : (
          <div className="mt-5 grid md:grid-cols-2 gap-3">
            {listings.map((item) => (
              <BusinessListingCard key={item.id} listing={item} headingLevel="h2" />
            ))}
          </div>
        )}

        <div className="guide-surface p-4 mt-6">
          <h2 className="section-title text-[1.15rem]">How to use this page</h2>
          <div className="mt-3 space-y-2 guide-body">
            <p>
              Use this page when you already know the part of Siargao you want to search in and need a focused shortlist.
            </p>
            <p>
              Check whether each listing has a phone number, address, website, or directions link before reaching out.
            </p>
          </div>
        </div>

        <div className="guide-surface p-4 mt-5">
          <h2 className="section-title text-[1.35rem]">Keep exploring</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href={`/municipality/${municipality}`}>Browse all businesses in {municipalityName}</Link></li>
            <li><Link href={`/category/${slug}`}>Browse {seoCategoryName.toLowerCase()} across Siargao</Link></li>
            <li><Link href="/guide/top-local-businesses-in-siargao">Read: Top Local Businesses in Siargao</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

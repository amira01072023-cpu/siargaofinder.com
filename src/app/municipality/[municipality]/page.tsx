import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { MapPin, Building2, ArrowRight } from "lucide-react";
import { getSiteUrl } from "@/lib/site-url";
import BusinessListingCard from "@/components/BusinessListingCard";
import { categoryToLandingSlug, slugToLabel } from "@/lib/listing-taxonomy";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import { getPublicDirectoryListings } from "@/lib/public-listing-data";
import { isKnownMunicipalitySlug, municipalityToSlug, slugToMunicipality } from "@/lib/siargao-municipalities";
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

const getMunicipalityListings = cache(async function getMunicipalityListings(municipalitySlug: string): Promise<Listing[]> {
  const listings = await getPublicDirectoryListings();
  return listings.filter(
    (listing) => municipalityToSlug(listing.municipality ?? "") === municipalitySlug,
  ).sort((a, b) => b.id - a.id);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ municipality: string }>;
}): Promise<Metadata> {
  const { municipality } = await params;
  if (!isKnownMunicipalitySlug(municipality)) {
    return { title: "Municipality not found", robots: { index: false, follow: false } };
  }
  const municipalityName = slugToMunicipality(municipality);
  const baseUrl = getSiteUrl();
  const listings = await getMunicipalityListings(municipality);
  const hasListings = listings.length > 0;

  return {
    title: `${municipalityName} Siargao Business Directory`,
    description: `Find businesses in ${municipalityName}, Siargao, including places to stay, cafes, restaurants, transport, and practical local services.`,
    alternates: {
      canonical: `/municipality/${municipality}`,
    },
    openGraph: {
      title: `${municipalityName} Siargao Business Directory`,
      description: `Browse local listings, services, and practical business discovery in ${municipalityName}, Siargao.`,
      url: `${baseUrl}/municipality/${municipality}`,
      type: "website",
      images: [DEFAULT_SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary",
      title: `${municipalityName} Siargao Business Directory`,
      description: `Browse local listings, services, and practical business discovery in ${municipalityName}, Siargao.`,
      images: [DEFAULT_SOCIAL_IMAGE.url],
    },
    robots: hasListings
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default async function MunicipalityPage({
  params,
}: {
  params: Promise<{ municipality: string }>;
}) {
  const { municipality } = await params;
  if (!isKnownMunicipalitySlug(municipality)) notFound();
  const municipalityName = slugToMunicipality(municipality);
  const listings = await getMunicipalityListings(municipality);
  const siteUrl = getSiteUrl();
  const municipalityJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Businesses in ${municipalityName}, Siargao`,
    url: `${siteUrl}/municipality/${municipality}`,
    about: municipalityName,
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
      ],
    },
  };

  const categoryCounts = new Map<string, number>();
  for (const listing of listings) {
    if (!listing.category) continue;
    const categorySlug = categoryToLandingSlug(listing.category);
    categoryCounts.set(categorySlug, (categoryCounts.get(categorySlug) || 0) + 1);
  }
  const topCategories = [...categoryCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([slug, count]) => ({ slug, count }));
  const visibleListings = listings.slice(0, 100);

  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(municipalityJsonLd) }} />
      <PublicSiteHeader />

      <section className="page-section page-hero">
        <p className="page-kicker">Municipality</p>
        <h1 className="page-title">Businesses in {municipalityName}</h1>
        <p className="page-subtitle">
          Browse {listings.length} listing{listings.length === 1 ? "" : "s"} in {municipalityName}, with direct contact details, category context, and practical local discovery help.
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
            <span className="category-page-summary-label">Categories</span>
            <div className="category-page-summary-value">
              <MapPin size={16} />
              <span>{topCategories.length || 1}</span>
            </div>
          </div>
          <div className="category-page-summary-card">
            <span className="category-page-summary-label">Best use</span>
            <div className="category-page-summary-value">
              <ArrowRight size={16} />
              <span>Local planning</span>
            </div>
          </div>
        </div>

        {topCategories.length > 0 && (
          <div className="guide-surface p-4 mt-5">
            <h2 className="section-title text-[1.15rem]">Common business categories in {municipalityName}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {topCategories.map((category) => (
                <Link key={category.slug} href={`/municipality/${municipality}/category/${category.slug}`} className="listing-card-pill">
                  {slugToLabel(category.slug)} ({category.count})
                </Link>
              ))}
            </div>
          </div>
        )}

        {listings.length === 0 ? (
          <p className="status-message">No listings found in {municipalityName} yet.</p>
        ) : (
          <div className="mt-5 grid md:grid-cols-2 gap-3">
            {visibleListings.map((item) => (
              <BusinessListingCard key={item.id} listing={item} headingLevel="h2" />
            ))}
          </div>
        )}

        {listings.length > visibleListings.length && (
          <p className="mt-4 text-sm text-slate-600">
            Showing the latest {visibleListings.length} listings. Use the directory search to refine by category or business name.
          </p>
        )}

        <div className="guide-surface p-4 mt-6">
          <h2 className="section-title text-[1.15rem]">How to use this municipality page</h2>
          <div className="mt-3 space-y-2 guide-body">
            <p>
              Municipality pages work best when you already know which part of Siargao you want to stay in, explore, or use as your base.
            </p>
            <p>
              Use it to quickly compare local services, dining, transport, and practical nearby options.
            </p>
          </div>
        </div>

        <div className="guide-surface p-4 mt-5">
          <h2 className="section-title text-[1.35rem]">Related pages</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/">Browse all live listings</Link></li>
            <li><Link href="/guide/top-local-businesses-in-siargao">Read: Top Local Businesses in Siargao</Link></li>
            <li><Link href="/guide/where-to-find-services-in-siargao">Read: Where to Find Services in Siargao</Link></li>
            {municipality === "general-luna" && <li><Link href="/guide/best-restaurants-in-general-luna">Read: Best Restaurants in General Luna</Link></li>}
            {municipality === "general-luna" && <li><Link href="/guide/best-cafes-in-siargao">Read: Best Cafes in Siargao</Link></li>}
            {municipality === "general-luna" && <li><Link href="/blog/where-to-stay-in-siargao">Read: Where to Stay in Siargao</Link></li>}
            {municipality === "general-luna" && <li><Link href="/blog/how-to-get-around-siargao">Read: How to Get Around Siargao</Link></li>}
          </ul>
        </div>
      </section>
    </main>
  );
}

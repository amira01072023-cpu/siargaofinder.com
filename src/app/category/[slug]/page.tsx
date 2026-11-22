import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { cache } from "react";
import { MapPin, Building2, ArrowRight } from "lucide-react";
import { getSiteUrl } from "@/lib/site-url";
import ListingCardActions from "@/components/ListingCardActions";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import { getIndexablePublicListings } from "@/lib/public-listing-data";
import {
  categorySeoLabel,
  categorySlugToCanonicalSlug,
  getCategorySearchTerms,
  slugToLabel,
} from "@/lib/listing-taxonomy";
import { municipalityToSlug } from "@/lib/siargao-municipalities";
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

const DELETED_CATEGORY_SLUGS = new Set(["suppliers"]);
const MIN_INDEXABLE_CATEGORY_LISTINGS = 5;

const getCategoryListings = cache(async function getCategoryListings(slug: string): Promise<Listing[]> {
  const terms = getCategorySearchTerms(slug).map((term) => term.toLowerCase());
  const listings = await getIndexablePublicListings();

  return listings
    .filter((listing) =>
      terms.some((term) => listing.category?.toLowerCase().includes(term)),
    )
    .sort((a, b) => b.id - a.id)
    .slice(0, 100);
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (DELETED_CATEGORY_SLUGS.has(slug)) {
    return {
      title: "Category not found",
      robots: { index: false, follow: false },
    };
  }

  const canonicalSlug = categorySlugToCanonicalSlug(slug);
  const categoryName = categorySeoLabel(canonicalSlug);
  const baseUrl = getSiteUrl();
  const listings = await getCategoryListings(canonicalSlug);
  const hasEnoughListings = listings.length >= MIN_INDEXABLE_CATEGORY_LISTINGS;
  const title = `${categoryName} in Siargao | Business Directory`;
  const description = `Find ${categoryName.toLowerCase()} in Siargao with contact details, locations, and practical help for comparing local options.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/category/${canonicalSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/category/${canonicalSlug}`,
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (DELETED_CATEGORY_SLUGS.has(slug)) notFound();
  const canonicalSlug = categorySlugToCanonicalSlug(slug);
  if (canonicalSlug !== slug) permanentRedirect(`/category/${canonicalSlug}`);

  const categoryName = slugToLabel(canonicalSlug);
  const seoCategoryName = categorySeoLabel(canonicalSlug);
  const listings = await getCategoryListings(canonicalSlug);
  const siteUrl = getSiteUrl();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${seoCategoryName} in Siargao`,
    url: `${siteUrl}/category/${canonicalSlug}`,
    about: seoCategoryName,
    isPartOf: {
      "@type": "WebSite",
      name: "Siargao Finder",
      url: siteUrl,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: seoCategoryName, item: `${siteUrl}/category/${canonicalSlug}` },
      ],
    },
  };

  const municipalities = [...new Set(listings.map((item) => item.municipality).filter(Boolean))] as string[];
  const topMunicipalities = municipalities.slice(0, 6);

  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <PublicSiteHeader />

      <section className="page-section page-hero">
        <p className="page-kicker">Category</p>
        <h1 className="page-title">{seoCategoryName} in Siargao</h1>
        <p className="page-subtitle">
          Browse {listings.length} listing{listings.length === 1 ? "" : "s"} for {categoryName.toLowerCase()} across Siargao, with direct contact details, location context, and quick ways to compare your best options.
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
            <span className="category-page-summary-label">Municipalities</span>
            <div className="category-page-summary-value">
              <MapPin size={16} />
              <span>{municipalities.length || 1}</span>
            </div>
          </div>
          <div className="category-page-summary-card">
            <span className="category-page-summary-label">Best use</span>
            <div className="category-page-summary-value">
              <ArrowRight size={16} />
              <span>Compare and shortlist</span>
            </div>
          </div>
        </div>

        {topMunicipalities.length > 0 && (
          <div className="mt-6">
            <p className="category-page-helper-copy">Available across these areas:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {topMunicipalities.map((municipality) => (
                <Link key={municipality} href={`/municipality/${municipalityToSlug(municipality)}/category/${canonicalSlug}`} className="listing-card-pill">
                  {municipality}
                </Link>
              ))}
            </div>
          </div>
        )}

        {listings.length === 0 ? (
          <p className="status-message">No listings found for {categoryName} yet.</p>
        ) : (
          <div className="mt-5 grid md:grid-cols-2 gap-3">
            {listings.map((item) => (
              <article key={item.id} className="listing-card group">
                <div className="listing-card-accent" />
                <h2 className="listing-card-title">{item.business_name}</h2>
                <p className="listing-card-subtitle mt-1">{item.category || "General Services"}</p>
                <div className="listing-card-meta mt-4 space-y-2 text-sm">
                  <p className="flex items-center gap-2"><MapPin size={15} /> {item.municipality || "Siargao"}</p>
                  <p>{item.phone || "Phone not listed"}</p>
                </div>

                <ListingCardActions
                  listingId={item.id}
                  businessName={item.business_name}
                  phone={item.phone}
                  websiteUrl={item.website_url}
                  address={item.address}
                />
              </article>
            ))}
          </div>
        )}

        <div className="guide-surface p-4 mt-6">
          <h2 className="section-title text-[1.15rem]">What you can use this page for</h2>
          <div className="mt-3 space-y-2 guide-body">
            <p>
              This page is most useful when you already know the kind of business or service you need, but still want to compare by municipality, convenience, and direct contact options.
            </p>
            <p>
              For categories like transport, surf, food, and stays, pair this page with a related guide so you are not just browsing listings blindly.
            </p>
          </div>
        </div>

        <div className="guide-surface p-4 mt-5">
          <h2 className="section-title text-[1.35rem]">Keep exploring Siargao Finder</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/">Browse all live listings</Link></li>
            <li><Link href="/guide/top-local-businesses-in-siargao">Read: Top Local Businesses in Siargao</Link></li>
            <li><Link href="/guide/where-to-find-services-in-siargao">Read: Where to Find Services in Siargao</Link></li>
            {slug === "food-chains-and-restaurants" && <li><Link href="/guide/best-restaurants-in-general-luna">Read: Best Restaurants in General Luna</Link></li>}
            {slug === "food-chains-and-restaurants" && <li><Link href="/guide/best-cafes-in-siargao">Read: Best Cafes in Siargao</Link></li>}
            {slug === "transport-rentals" && <li><Link href="/blog/how-to-get-around-siargao">Read: How to Get Around Siargao</Link></li>}
            {slug === "hotels-and-stays" && <li><Link href="/blog/where-to-stay-in-siargao">Read: Where to Stay in Siargao</Link></li>}
            {slug === "tours-and-island-hopping" && <li><Link href="/guide/siargao-island-hopping-guide">Read: Siargao Island Hopping Guide</Link></li>}
            {slug === "surf-schools-and-rentals" && <li><Link href="/guide/siargao-surf-schools-guide">Read: Siargao Surf Schools Guide</Link></li>}
          </ul>
        </div>
      </section>
    </main>
  );
}

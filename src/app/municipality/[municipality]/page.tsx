import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { MapPin, Building2, ArrowRight } from "lucide-react";
import { getSiteUrl } from "@/lib/site-url";
import ListingCardActions from "@/components/ListingCardActions";
import { categoryToCanonicalSlug } from "@/lib/listing-taxonomy";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import { getIndexablePublicListings } from "@/lib/public-listing-data";
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

function slugToMunicipality(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const getMunicipalityListings = cache(async function getMunicipalityListings(municipalitySlug: string): Promise<Listing[]> {
  const listings = await getIndexablePublicListings();
  return listings.filter(
    (listing) => municipalityToSlug(listing.municipality ?? "") === municipalitySlug,
  );
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ municipality: string }>;
}): Promise<Metadata> {
  const { municipality } = await params;
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

  const categorySet = [...new Set(listings.map((item) => item.category).filter(Boolean))] as string[];
  const topCategories = categorySet.slice(0, 6);

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
                <Link key={category} href={`/municipality/${municipality}/category/${categoryToCanonicalSlug(category)}`} className="listing-card-pill">
                  {category}
                </Link>
              ))}
            </div>
          </div>
        )}

        {listings.length === 0 ? (
          <p className="status-message">No listings found in {municipalityName} yet.</p>
        ) : (
          <div className="mt-5 grid md:grid-cols-2 gap-3">
            {listings.map((item) => (
              <article key={item.id} className="listing-card group">
                <div className="listing-card-accent" />
                <h2 className="listing-card-title">{item.business_name}</h2>
                <p className="listing-card-subtitle mt-1">{item.category || "General Services"}</p>
                <div className="listing-card-meta mt-4 space-y-2 text-sm">
                  <p>{item.municipality || "Siargao"}</p>
                  <p>{item.phone || "N/A"}</p>
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

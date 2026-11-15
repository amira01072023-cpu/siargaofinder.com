import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { MapPin, Phone, Mail, Globe, ShieldCheck, Sparkles, Building2 } from "lucide-react";
import ListingActionBar from "@/components/ListingActionBar";
import SaveListingButton from "@/components/SaveListingButton";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import {
  getBusinessListingValueScore,
  getDetailedListingCompleteness,
  getIndexableUniqueBusinessListings,
  isIndexableBusinessListing,
} from "@/lib/listing-completeness";
import { getSiteUrl } from "@/lib/site-url";
import { categoryToSlug } from "@/lib/listing-taxonomy";
import { businessNameToListingSlug, listingHref } from "@/lib/listing-slugs";

export const revalidate = 1800;

type Listing = {
id: number;
business_name: string;
category: string | null;
municipality: string | null;
phone: string | null;
email: string | null;
website_url: string | null;
address: string | null;
services: string | null;
};

function municipalityToSlug(municipality?: string | null) {
if (!municipality) return "";
return municipality.toLowerCase().replace(/\s+/g, "-");
}

function buildDirectionsUrl(businessName: string, address?: string | null, municipality?: string | null) {
const query = encodeURIComponent([businessName, address, municipality].filter(Boolean).join(", "));
return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

async function getClient() {
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnon) return null;
return createClient(supabaseUrl, supabaseAnon);
}

const listingSelect = "id,business_name,category,municipality,phone,email,website_url,address,services";
const LISTING_BATCH_SIZE = 1000;

async function getAllListingRows(
supabase: NonNullable<Awaited<ReturnType<typeof getClient>>>,
): Promise<Listing[]> {
const listings: Listing[] = [];

for (let from = 0; from < 5000; from += LISTING_BATCH_SIZE) {
  const to = from + LISTING_BATCH_SIZE - 1;
  const { data, error } = await supabase
  .from("business_listings")
  .select(listingSelect)
  .order("id", { ascending: false })
  .range(from, to);

  if (error || !data?.length) break;
  listings.push(...(data as Listing[]));
  if (data.length < LISTING_BATCH_SIZE) break;
}

return listings;
}

const getIndexableListingSlugs = unstable_cache(
async () => {
const supabase = await getClient();
if (!supabase) return [] as string[];

const data = await getAllListingRows(supabase);

return getIndexableUniqueBusinessListings(data).map((listing) =>
  businessNameToListingSlug(listing.business_name),
);
},
["indexable-listing-slugs-v2"],
{ revalidate: 1800 },
);

export async function generateStaticParams() {
const slugs = await getIndexableListingSlugs();

return slugs
  .filter((slug) => {
    return Boolean(slug);
  })
  .map((slug) => ({ id: slug }));
}

function getSlugSearchTokens(slug: string) {
const stopWords = new Set(["and", "the", "of", "in", "at", "by", "for", "to", "a"]);
return slug
  .split("-")
  .map((token) => token.replace(/[^a-z0-9]/g, ""))
  .filter((token) => token.length >= 3 && !stopWords.has(token))
  .sort((a, b) => b.length - a.length)
  .slice(0, 3);
}

function findBestSlugMatch(items: Listing[], slug: string) {
  return items
    .filter((item) => businessNameToListingSlug(item.business_name) === slug)
    .sort((a, b) => getBusinessListingValueScore(b) - getBusinessListingValueScore(a))[0] ?? null;
}

async function findListingBySlug(
supabase: NonNullable<Awaited<ReturnType<typeof getClient>>>,
slug: string,
): Promise<Listing | null> {
const tokens = getSlugSearchTokens(slug);
const candidates = new Map<number, Listing>();

for (const token of tokens) {
  const { data, error } = await supabase
    .from("business_listings")
    .select(listingSelect)
    .ilike("business_name", `%${token}%`)
    .limit(150);

  if (error || !data) continue;

  for (const item of data as Listing[]) {
    candidates.set(item.id, item);
  }

  const match = findBestSlugMatch(Array.from(candidates.values()), slug);
  if (match) return match;
}

const phrase = slug.replace(/-/g, " ").trim();
if (phrase) {
  const { data, error } = await supabase
    .from("business_listings")
    .select(listingSelect)
    .ilike("business_name", `%${phrase}%`)
    .limit(50);

  if (!error && data) {
    const match = findBestSlugMatch(data as Listing[], slug);
    if (match) return match;
  }
}

const data = await getAllListingRows(supabase);

return findBestSlugMatch(data as Listing[], slug);
}

const getListing = cache(async function getListing(param: string): Promise<Listing | null> {
const supabase = await getClient();
if (!supabase) return null;

if (/^\d+$/.test(param)) {
  const { data, error } = await supabase
  .from("business_listings")
  .select(listingSelect)
  .eq("id", Number(param))
  .maybeSingle();

  if (error || !data) return null;
  return data as Listing;
}

return findListingBySlug(supabase, param);
});

async function getRelatedListings(listing: Listing): Promise<Listing[]> {
const supabase = await getClient();
if (!supabase) return [];

const [sameCategoryAndMunicipality, sameMunicipality, sameCategory] = await Promise.all([
  supabase
    .from("business_listings")
    .select("id,business_name,category,municipality,phone,website_url,address,email,services")
    .neq("id", listing.id)
    .ilike("municipality", `%${listing.municipality || ""}%`)
    .ilike("category", `%${listing.category || ""}%`)
    .order("id", { ascending: false })
    .limit(6),
  supabase
    .from("business_listings")
    .select("id,business_name,category,municipality,phone,website_url,address,email,services")
    .neq("id", listing.id)
    .ilike("municipality", `%${listing.municipality || ""}%`)
    .order("id", { ascending: false })
    .limit(8),
  supabase
    .from("business_listings")
    .select("id,business_name,category,municipality,phone,website_url,address,email,services")
    .neq("id", listing.id)
    .ilike("category", `%${listing.category || ""}%`)
    .order("id", { ascending: false })
    .limit(8),
]);

  const merged = [
    ...(sameCategoryAndMunicipality.data || []),
    ...(sameMunicipality.data || []),
    ...(sameCategory.data || []),
  ] as Listing[];

  const seenSlugs = new Set<string>();
  const deduped = merged.filter((item) => {
    const slug = businessNameToListingSlug(item.business_name);
    if (!isIndexableBusinessListing(item) || seenSlugs.has(slug)) return false;
    seenSlugs.add(slug);
    return true;
  });

  return deduped.slice(0, 6);
}

export async function generateMetadata({
params,
}: {
params: Promise<{ id: string }>;
}): Promise<Metadata> {
const { id } = await params;
const listing = await getListing(id);

if (!listing) {
return {
title: "Listing Not Found",
description: "The requested business listing was not found.",
};
}

const title = `${listing.business_name}${listing.municipality ? ` in ${listing.municipality}, Siargao` : " in Siargao"}${
listing.category ? ` - ${listing.category}` : ""
}`;
const description = `${listing.business_name}${listing.category ? ` - ${listing.category}` : ""}${
listing.municipality ? ` in ${listing.municipality}` : ""
}. Contact details and listing information.`;
const baseUrl = getSiteUrl();
const canonicalPath = listingHref(listing);
const indexableSlugs = await getIndexableListingSlugs();
const shouldIndex = indexableSlugs.includes(businessNameToListingSlug(listing.business_name));

return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: shouldIndex
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default async function ListingDetailPage({
params,
}: {
params: Promise<{ id: string }>;
}) {
const { id } = await params;
const listing = await getListing(id);

if (!listing) notFound();

const canonicalPath = listingHref(listing);
if (id !== businessNameToListingSlug(listing.business_name)) {
  permanentRedirect(canonicalPath);
}

const related = await getRelatedListings(listing);
const completeness = getDetailedListingCompleteness(listing);

const baseUrl = getSiteUrl();

const localBusinessJsonLd = {
"@context": "https://schema.org",
"@type": "LocalBusiness",
name: listing.business_name,
telephone: listing.phone || undefined,
email: listing.email || undefined,
url: listing.website_url || undefined,
address: listing.address
? {
"@type": "PostalAddress",
streetAddress: listing.address,
addressLocality: listing.municipality || undefined,
addressCountry: "PH",
}
: undefined,
areaServed: listing.municipality || "Siargao",
description: listing.services || listing.category || undefined,
};

const breadcrumbJsonLd = {
"@context": "https://schema.org",
"@type": "BreadcrumbList",
itemListElement: [
{ "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
{ "@type": "ListItem", position: 2, name: "Listings", item: `${baseUrl}/` },
{
"@type": "ListItem",
position: 3,
name: listing.business_name,
item: `${baseUrl}${canonicalPath}`,
},
],
};

const municipalitySlug = municipalityToSlug(listing.municipality);
const categorySlug = listing.category ? categoryToSlug(listing.category) : "";
const directionsUrl = listing.address || listing.municipality
  ? buildDirectionsUrl(listing.business_name, listing.address, listing.municipality)
  : null;

return (
<main className="page-shell">
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

<PublicSiteHeader showBlogLink showListYourBusinessLink className="max-w-5xl" homeLabel="Home" />

<section className="page-section page-hero max-w-5xl">
<p className="page-kicker">Listing Profile</p>
<h1 className="page-title">{listing.business_name}</h1>
<p className="page-subtitle">Public contact details, business information, and direct actions for this listing.</p>

<article className="page-card mt-8 p-6 md:p-8">
<div className="listing-detail-hero">
  <div>
    <div className="flex flex-wrap gap-2">
      <p className="listing-card-pill listing-card-pill--warm">{listing.category || "General Services"}</p>
      <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
        <ShieldCheck size={14} />
        Public directory listing
      </span>
      <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full">
        {completeness}% complete
      </span>
    </div>

    <div className="listing-detail-summary mt-5">
      <div className="listing-detail-summary-card">
        <span className="listing-detail-summary-label">Municipality</span>
        <div className="listing-detail-summary-value">
          <MapPin size={15} />
          <span>{listing.municipality || "Siargao"}</span>
        </div>
      </div>
      <div className="listing-detail-summary-card">
        <span className="listing-detail-summary-label">Category</span>
        <div className="listing-detail-summary-value">
          <Building2 size={15} />
          <span>{listing.category || "General Services"}</span>
        </div>
      </div>
      <div className="listing-detail-summary-card">
        <span className="listing-detail-summary-label">Profile quality</span>
        <div className="listing-detail-summary-value">
          <Sparkles size={15} />
          <span>{completeness}% complete</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="detail-grid mt-6">
<p className="detail-row"><MapPin size={16} className="text-slate-400 mt-0.5" /><span><strong>Municipality:</strong> {listing.municipality || "Not listed yet"}</span></p>
<p className="detail-row"><Phone size={16} className="text-slate-400 mt-0.5" /><span><strong>Phone:</strong> {listing.phone || "No phone listed yet"}</span></p>
<p className="detail-row"><Mail size={16} className="text-slate-400 mt-0.5" /><span><strong>Email:</strong> {listing.email || "No email listed yet"}</span></p>
<p className="detail-row"><Globe size={16} className="text-slate-400 mt-0.5" /><span><strong>Website:</strong> {listing.website_url ? <a href={listing.website_url} target="_blank" rel="noreferrer" className="link-inline break-all">{listing.website_url}</a> : "No website listed yet"}</span></p>
<p className="detail-row detail-row--full"><span><strong>Address:</strong> {listing.address || "No address listed yet"}</span></p>
<p className="detail-row detail-row--full"><span><strong>Services:</strong> {listing.services || "No service details listed yet"}</span></p>
</div>

<div className="mt-5 listing-detail-progress-card">
<p className="text-sm text-slate-700"><strong>Profile completeness:</strong> {completeness}%</p>
<div className="progress-rail">
<div className="progress-fill" style={{ width: `${completeness}%` }} />
</div>
<p className="mt-2 text-xs text-slate-500">Visible trust signals help visitors judge listing quality faster and improve confidence before they contact a business.</p>
</div>

<div className="mt-6 flex flex-wrap items-start justify-start gap-2">
  {directionsUrl && (
    <a href={directionsUrl} target="_blank" rel="noreferrer" className="ui-btn ui-btn--dark">
      <MapPin size={16} />
      <span>Directions</span>
    </a>
  )}
  <SaveListingButton
    item={{
      id: listing.id,
      business_name: listing.business_name,
      category: listing.category,
      municipality: listing.municipality,
    }}
    className="ui-btn ui-btn--soft"
  />
</div>

<ListingActionBar
  listingId={listing.id}
  businessName={listing.business_name}
  phone={listing.phone}
  email={listing.email}
  websiteUrl={listing.website_url}
  address={listing.address}
/>

<div className="mt-6 flex flex-wrap gap-4 text-sm">
{municipalitySlug && (
<Link href={`/municipality/${municipalitySlug}`} className="link-inline">
View more in {listing.municipality}
</Link>
)}
{categorySlug && (
<Link href={`/category/${categorySlug}`} className="link-inline">
View more {listing.category} listings
</Link>
)}
</div>
</article>
</section>

{related.length > 0 && (
<section className="page-section max-w-5xl pt-0 pb-12">
<div className="section-heading mb-6">
<div>
<p className="section-kicker">Related</p>
<h2 className="section-title">Related Listings</h2>
</div>
</div>
<div className="grid md:grid-cols-2 gap-4">
{related.map((r) => (
<article key={r.id} className="listing-card group">
<div className="flex items-start justify-between gap-3">
  <div className="min-w-0">
    <h3 className="listing-card-title">{r.business_name}</h3>
    <p className="listing-card-subtitle mt-1">Similar business you may want to compare</p>
  </div>
  <span className="listing-card-pill">{r.category || "General Services"}</span>
</div>
<div className="listing-card-meta text-sm mt-4 space-y-2 text-slate-600">
  <p className="flex items-center gap-2"><MapPin size={15} /> {r.municipality || "Siargao"}</p>
  <p className="flex items-center gap-2"><Phone size={15} /> {r.phone || "Phone not listed"}</p>
  <p className="text-xs text-slate-500">{r.address || "Address not listed yet"}</p>
</div>
<div className="mt-4 flex gap-2 flex-wrap">
<Link href={listingHref(r)} className="listing-card-btn listing-card-btn--soft">View Details</Link>
{r.website_url ? <a href={r.website_url} target="_blank" rel="noreferrer" className="listing-card-btn listing-card-btn--dark">Website</a> : null}
</div>
</article>
))}
</div>
</section>
)}
</main>
);
}

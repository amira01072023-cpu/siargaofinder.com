import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { MapPin, Phone, Mail, Globe, ShieldCheck, Search, Home } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import { getDetailedListingCompleteness } from "@/lib/listing-completeness";
import { getSiteUrl } from "@/lib/site-url";

type Listing = {
id: number;
business_name: string;
category: string | null;
city: string | null;
phone: string | null;
email: string | null;
website_url: string | null;
address: string | null;
services: string | null;
};

function cityToSlug(city?: string | null) {
if (!city) return "";
return city.toLowerCase().replace(/\s+/g, "-");
}

function categoryToSlug(category?: string | null) {
if (!category) return "";
return category.toLowerCase().replace(/\s+/g, "-");
}

async function getClient() {
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnon) return null;
return createClient(supabaseUrl, supabaseAnon);
}

async function getListing(id: string): Promise<Listing | null> {
const supabase = await getClient();
if (!supabase) return null;

const { data, error } = await supabase
.from("business_listings")
.select("id,business_name,category,city,phone,email,website_url,address,services")
.eq("id", Number(id))
.maybeSingle();

if (error || !data) return null;
return data as Listing;
}

async function getRelatedListings(listing: Listing): Promise<Listing[]> {
const supabase = await getClient();
if (!supabase) return [];

// Prefer same category + city first
let query = supabase
.from("business_listings")
.select("id,business_name,category,city,phone,website_url")
.neq("id", listing.id)
.limit(6);

if (listing.city) query = query.ilike("city", `%${listing.city}%`);
if (listing.category) query = query.ilike("category", `%${listing.category}%`);

const { data, error } = await query.order("id", { ascending: false });

if (error || !data) return [];
return data as Listing[];
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
title: "Listing Not Found | Siargao Finder",
description: "The requested business listing was not found.",
};
}

const title = `${listing.business_name} | Siargao Finder`;
const description = `${listing.business_name}${listing.category ? ` - ${listing.category}` : ""}${
listing.city ? ` in ${listing.city}` : ""
}. Contact details and listing information.`;
const baseUrl = getSiteUrl();

return {
    title,
    description,
    alternates: {
      canonical: `/listing/${listing.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/listing/${listing.id}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
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
addressLocality: listing.city || undefined,
addressCountry: "AE",
}
: undefined,
areaServed: listing.city || "Siargao",
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
item: `${baseUrl}/listing/${listing.id}`,
},
],
};

const citySlug = cityToSlug(listing.city);
const categorySlug = categoryToSlug(listing.category);

return (
<main className="min-h-screen bg-[#f8fafc] text-slate-800">
<script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
/>
<script
type="application/ld+json"
dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
/>

<header className="bg-black border-b border-yellow-500 sticky top-0 z-30 text-yellow-300 shadow-sm">
<div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
<div className="flex items-center gap-2">
<Search className="text-yellow-300" size={20} />
<span className="font-bold text-lg tracking-tight">Siargao Finder</span>
</div>
<Link
href="/"
className="inline-flex items-center gap-2 bg-yellow-400 text-black border border-yellow-500 text-sm px-4 py-2 rounded-lg hover:bg-yellow-300 transition font-semibold"
>
<Home size={16} />
Home
</Link>
</div>
</header>

<section className="max-w-5xl mx-auto px-4 py-8">
<article className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
<div className="flex flex-wrap items-start justify-between gap-4">
<div>
<h1 className="text-3xl font-bold">{listing.business_name}</h1>
<p className="mt-2 inline-block text-xs bg-yellow-100 text-yellow-900 px-2 py-1 rounded-full">
{listing.category || "General Services"}
</p>
</div>

<span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
<ShieldCheck size={14} />
Public Listing
</span>
</div>

<div className="mt-6 grid md:grid-cols-2 gap-3 text-sm">
<p className="flex items-center gap-2"><MapPin size={15} className="text-slate-500" /><strong>City:</strong> {listing.city || "—"}</p>
<p className="flex items-center gap-2"><Phone size={15} className="text-slate-500" /><strong>Phone:</strong> {listing.phone || "—"}</p>
<p className="flex items-center gap-2"><Mail size={15} className="text-slate-500" /><strong>Email:</strong> {listing.email || "—"}</p>
<p className="flex items-center gap-2">
<Globe size={15} className="text-slate-500" />
<strong>Website:</strong>{" "}
{listing.website_url ? (
<a href={listing.website_url} target="_blank" rel="noreferrer" className="text-amber-700 hover:underline break-all">
{listing.website_url}
</a>
) : "—"}
</p>
<p className="md:col-span-2"><strong>Address:</strong> {listing.address || "—"}</p>
<p className="md:col-span-2"><strong>Services:</strong> {listing.services || "—"}</p>
</div>

<div className="mt-4">
<p className="text-sm text-slate-600"><strong>Profile completeness:</strong> {completeness}%</p>
<div className="mt-1 h-2 w-full max-w-md rounded-full bg-slate-200 overflow-hidden">
<div className="h-full bg-yellow-400" style={{ width: `${completeness}%` }} />
</div>
</div>

<div className="mt-7 flex flex-wrap gap-2">
{listing.website_url && (
<a
href={listing.website_url}
target="_blank"
rel="noreferrer"
className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm hover:bg-yellow-300 font-semibold"
>
Visit Website
</a>
)}

{listing.phone && (
<a href={`tel:${listing.phone}`} className="border border-slate-300 px-4 py-2 rounded-lg text-sm hover:bg-slate-50">
Call Now
</a>
)}

{listing.email && (
<a href={`mailto:${listing.email}`} className="border border-slate-300 px-4 py-2 rounded-lg text-sm hover:bg-slate-50">
Email
</a>
)}

<Link href={`/claim/${listing.id}`} className="border border-slate-300 px-4 py-2 rounded-lg text-sm hover:bg-slate-50">
Claim / Update this Listing
</Link>

<a
href="mailto:info@siargaofinder.com?subject=Report%20Listing%20Issue"
className="border border-slate-300 px-4 py-2 rounded-lg text-sm hover:bg-slate-50"
>
Report Listing
</a>
</div>

<div className="mt-6 flex flex-wrap gap-2 text-sm">
{citySlug && (
<Link href={`/city/${citySlug}`} className="text-amber-700 hover:underline">
View more in {listing.city}
</Link>
)}
{categorySlug && (
<Link href={`/category/${categorySlug}`} className="text-amber-700 hover:underline">
View more {listing.category} listings
</Link>
)}
</div>
</article>
</section>

{related.length > 0 && (
<section className="max-w-5xl mx-auto px-4 pb-12">
<h2 className="text-2xl font-bold mb-4">Related Listings</h2>
<div className="grid md:grid-cols-2 gap-4">
{related.map((r) => (
<article key={r.id} className="bg-white border rounded-xl p-4">
<h3 className="font-semibold">{r.business_name}</h3>
<p className="text-sm text-slate-500">{r.category || "General Services"}</p>
<p className="text-sm text-slate-500">{r.city || "Siargao"}</p>
<div className="mt-3 flex gap-2">
<Link
href={`/listing/${r.id}`}
className="border border-slate-300 px-3 py-1.5 rounded text-sm hover:bg-slate-50"
>
View Details
</Link>
</div>
</article>
))}
</div>
</section>
)}

<SiteFooter />
</main>
);
}
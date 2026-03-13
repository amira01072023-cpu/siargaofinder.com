import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { getSiteUrl } from "@/lib/site-url";

type Listing = {
id: number;
business_name: string;
category: string | null;
city: string | null;
phone: string | null;
website_url: string | null;
};

function slugToCity(slug: string) {
return slug
.split("-")
.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
.join(" ");
}

async function getCityListings(citySlug: string): Promise<Listing[]> {
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnon) return [];

const city = slugToCity(citySlug);
const supabase = createClient(supabaseUrl, supabaseAnon);

const { data, error } = await supabase
.from("business_listings")
.select("id,business_name,category,city,phone,website_url")
.ilike("city", `%${city}%`)
.order("id", { ascending: false })
.limit(100);

if (error || !data) return [];
return data as Listing[];
}

export async function generateMetadata({
params,
}: {
params: Promise<{ city: string }>;
}): Promise<Metadata> {
const { city } = await params;
const cityName = slugToCity(city);
const baseUrl = getSiteUrl();

return {
    title: `Best Businesses in ${cityName} | Siargao Finder`,
    description: `Find trusted businesses, services, and contact details in ${cityName} in Siargao.`,
    alternates: {
      canonical: `/city/${city}`,
    },
    openGraph: {
      title: `Businesses in ${cityName} | Siargao Finder`,
      description: `Browse local listings in ${cityName}.`,
      url: `${baseUrl}/city/${city}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Businesses in ${cityName} | Siargao Finder`,
      description: `Browse local listings in ${cityName}.`,
    },
  };
}

export default async function CityPage({
params,
}: {
params: Promise<{ city: string }>;
}) {
const { city } = await params;
const cityName = slugToCity(city);
const listings = await getCityListings(city);

return (
<main className="min-h-screen bg-[#f8fafc] text-slate-800">
<header className="bg-black border-b border-yellow-500 sticky top-0 z-30 text-yellow-300 shadow-sm">
<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
<div className="flex items-center gap-2">
<Search className="text-yellow-300" size={20} />
<span className="font-bold text-lg tracking-tight">Siargao Finder</span>
</div>
<Link href="/" className="text-sm text-amber-700 hover:underline">← Back to Home</Link>
</div>
</header>

<section className="max-w-6xl mx-auto px-4 py-8">
<h1 className="text-3xl font-bold">Businesses in {cityName}</h1>
<p className="text-slate-600 mt-2">
{listings.length} listing{listings.length === 1 ? "" : "s"} found
</p>

{listings.length === 0 ? (
<p className="mt-6 text-slate-500">No listings found in {cityName} yet.</p>
) : (
<div className="mt-6 grid md:grid-cols-2 gap-4">
{listings.map((item) => (
<article key={item.id} className="bg-white border rounded-xl p-5">
<h2 className="text-lg font-bold">{item.business_name}</h2>
<p className="text-sm text-slate-500">{item.category || "General Services"}</p>
<p className="text-sm text-slate-600 mt-2">{item.city || "Siargao"}</p>
<p className="text-sm text-slate-600">{item.phone || "N/A"}</p>

<div className="mt-4 flex gap-2">
<Link
href={`/listing/${item.id}`}
className="border border-slate-300 px-4 py-2 rounded-lg text-sm hover:bg-slate-50"
>
View Details
</Link>
{item.website_url ? (
<a
href={item.website_url}
target="_blank"
rel="noreferrer"
className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm hover:bg-yellow-300 font-semibold"
>
Visit Website
</a>
) : (
<button className="bg-slate-400 text-black px-4 py-2 rounded-lg text-sm cursor-not-allowed">
No Website
</button>
)}
</div>
</article>
))}
</div>
)}
</section>
</main>
);
}
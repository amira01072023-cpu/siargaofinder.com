"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { Search, MapPin, Phone, Star, Building2 } from "lucide-react";
import { getBasicListingCompleteness } from "@/lib/listing-completeness";

type Listing = {
id: number;
business_name: string;
category: string | null;
city: string | null;
phone: string | null;
website_url: string | null;
socials?: {
facebook?: string;
instagram?: string;
tiktok?: string;
youtube?: string;
x?: string;
} | null;
};

type ListingsResponse = {
items: Listing[];
page: number;
limit: number;
total: number;
totalPages: number;
};

type FiltersResponse = {
categories: string[];
cities: string[];
};

type PopularCategory = {
name: string;
count: number;
};

type ViewMode = "gallery" | "list" | "table" | "kanban" | "detail";

function detectSocial(url?: string | null) {
if (!url) return null;
const u = url.toLowerCase();
if (u.includes("facebook.com")) return { label: "Facebook", href: url };
if (u.includes("instagram.com")) return { label: "Instagram", href: url };
if (u.includes("tiktok.com")) return { label: "TikTok", href: url };
if (u.includes("x.com") || u.includes("twitter.com")) return { label: "X", href: url };
if (u.includes("youtube.com") || u.includes("youtu.be")) return { label: "YouTube", href: url };
return null;
}

function socialsToButtons(socials?: Listing["socials"] | null) {
if (!socials) return [] as { label: string; href: string }[];
const entries: { label: string; href: string }[] = [];
if (socials.facebook) entries.push({ label: "Facebook", href: socials.facebook });
if (socials.instagram) entries.push({ label: "Instagram", href: socials.instagram });
if (socials.tiktok) entries.push({ label: "TikTok", href: socials.tiktok });
if (socials.youtube) entries.push({ label: "YouTube", href: socials.youtube });
if (socials.x) entries.push({ label: "X", href: socials.x });
return entries;
}

export default function Page() {
const [listings, setListings] = useState<Listing[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const [q, setQ] = useState("");
const [category, setCategory] = useState("");
const [city, setCity] = useState("");

const [categoryOptions, setCategoryOptions] = useState<string[]>([]);
const [cityOptions, setCityOptions] = useState<string[]>([]);
const [popularCategories, setPopularCategories] = useState<PopularCategory[]>([]);

const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [total, setTotal] = useState(0);
const [viewMode, setViewMode] = useState<ViewMode>("gallery");
const [selectedListingId, setSelectedListingId] = useState<number | null>(null);

const liveSectionRef = useRef<HTMLElement | null>(null);

const loadListings = async (params?: { q?: string; category?: string; city?: string; page?: number }) => {
try {
setLoading(true);
setError("");

const url = new URL("/api/listings", window.location.origin);
url.searchParams.set("limit", "10");
url.searchParams.set("page", String(params?.page ?? 1));
if (params?.q) url.searchParams.set("q", params.q);
if (params?.category) url.searchParams.set("category", params.category);
if (params?.city) url.searchParams.set("city", params.city);

const res = await fetch(url.toString(), { cache: "no-store" });
const data: ListingsResponse | { error: string } = await res.json();

if (!res.ok || "error" in data) {
throw new Error("error" in data ? data.error : "Failed to load listings");
}

setListings(data.items ?? []);
setPage(data.page ?? 1);
setTotalPages(data.totalPages ?? 1);
setTotal(data.total ?? 0);
} catch (e: unknown) {
setError(e instanceof Error ? e.message : "Something went wrong");
} finally {
setLoading(false);
}
};

const loadFilters = async () => {
try {
const res = await fetch("/api/listings/filters", { cache: "no-store" });
const data: FiltersResponse | { error: string } = await res.json();
if (!res.ok || "error" in data) {
throw new Error("error" in data ? data.error : "Failed to load filters");
}
setCategoryOptions(data.categories ?? []);
setCityOptions(data.cities ?? []);
} catch {
setCategoryOptions([]);
setCityOptions([]);
}
};

const loadPopularCategories = async () => {
try {
const res = await fetch("/api/listings/popular-categories", { cache: "no-store" });
const data = await res.json();
if (res.ok) setPopularCategories(data.categories || []);
} catch {
setPopularCategories([]);
}
};

useEffect(() => {
loadListings({ page: 1 });
loadFilters();
loadPopularCategories();
}, []);

const onSearch = async () => {
await loadListings({ q, category, city, page: 1 });
liveSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const onPrev = () => page > 1 && loadListings({ q, category, city, page: page - 1 });
const onNext = () => page < totalPages && loadListings({ q, category, city, page: page + 1 });

const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
if (e.key === "Enter") {
e.preventDefault();
onSearch();
}
};

const selectedListing = listings.find((l) => l.id === selectedListingId) || listings[0] || null;
const kanbanGroups = listings.reduce((acc, item) => {
const key = item.category || "Uncategorized";
if (!acc[key]) acc[key] = [];
acc[key].push(item);
return acc;
}, {} as Record<string, Listing[]>);

return (
<main className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased">
<header className="bg-black border-b border-yellow-500 sticky top-0 z-30 text-yellow-300 shadow-sm">
<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
<div className="flex items-center gap-2">
<Search className="text-yellow-300" size={20} />
<span className="font-bold text-lg tracking-tight">Siargao Finder</span>
</div>

<div className="flex items-center gap-2">

<Link
href="/list-your-business"
className="bg-yellow-400 text-black text-sm px-4 py-2 rounded-lg hover:bg-yellow-300 transition font-semibold"
>
List Your Business
</Link>
</div>
</div>
</header>

<section className="hero-wrap relative overflow-hidden text-black" style={{ backgroundColor: "#FAD644" }}>
<div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,#ffffff_0%,transparent_35%),radial-gradient(circle_at_80%_0%,#ffffff_0%,transparent_28%)]" />
<div className="hero-content relative max-w-6xl mx-auto px-4 py-16 md:py-20">
<h1 className="text-3xl md:text-5xl font-extrabold leading-tight max-w-3xl">
Find Local Businesses, Services & Contacts Across Siargao
</h1>
<p className="mt-4 text-black max-w-2xl">
Search by business name, category, or municipality. Discover trusted listings quickly.
</p>

<div className="mt-5 flex flex-wrap gap-2 text-xs md:text-sm">
<span className="bg-yellow-400 text-black border border-yellow-500 px-3 py-1 rounded-full">Verified public listings</span>
<span className="bg-yellow-400 text-black border border-yellow-500 px-3 py-1 rounded-full">Siargao-wide coverage</span>
<span className="bg-yellow-400 text-black border border-yellow-500 px-3 py-1 rounded-full">Free business listings</span>
</div>

<div className="mt-8 bg-white/95 backdrop-blur rounded-2xl p-3 md:p-4 shadow-2xl border border-white/40">
<div className="grid md:grid-cols-3 gap-3">
<div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-white">
<Search size={18} className="text-slate-500" />
<input
value={q}
onChange={(e) => setQ(e.target.value)}
onKeyDown={onSearchKeyDown}
placeholder="What are you looking for?"
className="w-full outline-none text-slate-700"
/>
</div>

<div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-white">
<Building2 size={18} className="text-slate-500" />
<select
value={category}
onChange={(e) => setCategory(e.target.value)}
onKeyDown={onSearchKeyDown}
className="w-full outline-none text-slate-700 bg-transparent"
>
<option value="">All Categories</option>
{categoryOptions.map((cat) => (
<option key={cat} value={cat}>
{cat}
</option>
))}
</select>
</div>

<div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-white">
<MapPin size={18} className="text-slate-500" />
<select
value={city}
onChange={(e) => setCity(e.target.value)}
onKeyDown={onSearchKeyDown}
className="w-full outline-none text-slate-700 bg-transparent"
>
<option value="">All Municipalities</option>
{cityOptions.map((c) => (
<option key={c} value={c}>
{c}
</option>
))}
</select>
</div>
</div>

<button
onClick={onSearch}
className="mt-3 w-full md:w-auto bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2.5 rounded-lg font-semibold transition"
>
Search Now
</button>
</div>
</div>
</section>

<section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
<div className="bg-white border rounded-xl p-4 shadow-sm">
<p className="text-xs text-slate-500">Total Listings</p>
<p className="text-xl font-bold">{total}</p>
</div>
<div className="bg-white border rounded-xl p-4 shadow-sm">
<p className="text-xs text-slate-500">Municipalities Covered</p>
<p className="text-xl font-bold">{cityOptions.length}</p>
</div>
<div className="bg-white border rounded-xl p-4 shadow-sm">
<p className="text-xs text-slate-500">Categories</p>
<p className="text-xl font-bold">{categoryOptions.length}</p>
</div>
<div className="bg-white border rounded-xl p-4 shadow-sm">
<p className="text-xs text-slate-500">Directory Status</p>
<p className="text-xl font-bold text-green-600">Live</p>
</div>
</div>
</section>

<section ref={liveSectionRef} className="max-w-6xl mx-auto px-4 py-12">
<div className="flex items-end justify-between mb-5">
<h2 className="text-2xl font-bold">Live Listings</h2>
<span className="text-sm text-slate-500">{total} total records</span>
</div>

{loading && <p className="text-slate-500">Loading listings...</p>}
{error && <p className="text-red-600">Error: {error}</p>}
{!loading && !error && listings.length === 0 && <p className="text-slate-500">No listings found for this search.</p>}

{!loading && !error && listings.length > 0 && (
<>
<div className="mb-4 flex flex-wrap gap-2">
{([
  ["gallery", "Gallery/Card"],
  ["list", "List"],
  ["table", "Table"],
  ["kanban", "Kanban/Board"],
  ["detail", "Row Detail"],
] as [ViewMode, string][]).map(([mode, label]) => (
<button
key={mode}
onClick={() => setViewMode(mode)}
className={`px-3 py-1.5 rounded-lg text-sm border transition ${viewMode === mode ? "bg-yellow-400 border-yellow-500 text-black font-semibold" : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"}`}
>
{label}
</button>
))}
</div>

{viewMode === "gallery" && (
<div className="grid md:grid-cols-2 gap-4">
{listings.map((item) => {
const social = detectSocial(item.website_url);
const socialButtons = socialsToButtons(item.socials);
return (
<article key={item.id} className="group bg-white rounded-2xl border border-slate-200/80 p-5 transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 hover:border-yellow-500/40">
<h3 className="text-lg font-bold">{item.business_name}</h3>
<p className="inline-block mt-1 text-xs bg-yellow-100 text-yellow-900 px-2 py-1 rounded-full">{item.category || "General Services"}</p>
<div className="mt-3 space-y-2 text-sm text-slate-600">
<p className="flex items-center gap-2"><MapPin size={15} /> {item.city || "Siargao"}</p>
<p className="flex items-center gap-2"><Phone size={15} /> {item.phone || "N/A"}</p>
<p className="flex items-center gap-1"><Star size={15} className="text-amber-500 fill-amber-500" /><span>Verified public listing</span></p>
<p className="text-xs text-slate-500">Profile completeness: {getBasicListingCompleteness(item)}%</p>
</div>
<div className="mt-4 flex flex-wrap gap-2">
<Link href={`/listing/${item.id}`} className="inline-flex items-center border border-slate-300 px-4 py-2 rounded-lg text-sm hover:bg-slate-50 hover:border-slate-400 transition-colors">View Details</Link>
{item.website_url ? <a href={item.website_url} target="_blank" rel="noreferrer" className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm hover:bg-yellow-300 font-semibold transition">{social ? "Visit Profile" : "Visit Website"}</a> : <button className="bg-slate-400 text-black px-4 py-2 rounded-lg text-sm cursor-not-allowed">No Website</button>}
{socialButtons.length > 0 ? socialButtons.map((s) => <a key={`${item.id}-${s.label}`} href={s.href} target="_blank" rel="noreferrer" className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition">{s.label}</a>) : social ? <a href={social.href} target="_blank" rel="noreferrer" className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition">{social.label}</a> : null}
</div>
</article>
);
})}
</div>
)}

{viewMode === "list" && (
<div className="bg-white border rounded-xl divide-y">
{listings.map((item) => (
<div key={item.id} className="p-4 flex items-center justify-between gap-3">
<div>
<p className="font-semibold">{item.business_name}</p>
<p className="text-sm text-slate-500">{item.category || "General Services"} • {item.city || "Siargao"}</p>
</div>
<Link href={`/listing/${item.id}`} className="text-sm bg-yellow-400 hover:bg-yellow-300 px-3 py-2 rounded-lg font-semibold">View</Link>
</div>
))}
</div>
)}

{viewMode === "table" && (
<div className="overflow-x-auto bg-white border rounded-xl">
<table className="min-w-full text-sm">
<thead className="bg-slate-50">
<tr>
<th className="text-left p-3">Business</th><th className="text-left p-3">Category</th><th className="text-left p-3">Municipality</th><th className="text-left p-3">Phone</th><th className="text-left p-3">Action</th>
</tr>
</thead>
<tbody>
{listings.map((item) => (
<tr key={item.id} className="border-t">
<td className="p-3">{item.business_name}</td>
<td className="p-3">{item.category || "General"}</td>
<td className="p-3">{item.city || "Siargao"}</td>
<td className="p-3">{item.phone || "N/A"}</td>
<td className="p-3"><Link href={`/listing/${item.id}`} className="text-amber-700 hover:underline">Open</Link></td>
</tr>
))}
</tbody>
</table>
</div>
)}

{viewMode === "kanban" && (
<div className="grid md:grid-cols-3 gap-4">
{Object.entries(kanbanGroups).slice(0, 6).map(([group, items]) => (
<div key={group} className="bg-white border rounded-xl p-3">
<h3 className="font-semibold mb-2">{group}</h3>
<div className="space-y-2 max-h-[340px] overflow-auto">
{items.map((item) => (
<div key={item.id} className="border rounded-lg p-2 bg-slate-50">
<p className="text-sm font-medium">{item.business_name}</p>
<p className="text-xs text-slate-500">{item.city || "Siargao"}</p>
</div>
))}
</div>
</div>
))}
</div>
)}

{viewMode === "detail" && selectedListing && (
<div className="bg-white border rounded-xl p-5">
<div className="flex flex-wrap gap-2 mb-4">
{listings.map((l) => (
<button key={l.id} onClick={() => setSelectedListingId(l.id)} className={`px-3 py-1 rounded-full text-xs border ${selectedListing.id === l.id ? "bg-yellow-400 border-yellow-500 font-semibold" : "bg-white border-slate-300"}`}>
{l.business_name}
</button>
))}
</div>
<h3 className="text-xl font-bold">{selectedListing.business_name}</h3>
<p className="text-sm text-slate-600 mt-1">{selectedListing.category || "General Services"} • {selectedListing.city || "Siargao"}</p>
<p className="text-sm mt-2">Phone: {selectedListing.phone || "N/A"}</p>
<div className="mt-3"><Link href={`/listing/${selectedListing.id}`} className="bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded-lg font-semibold">Open Full Details</Link></div>
</div>
)}

<div className="mt-6 flex items-center justify-between">
<p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
<div className="flex gap-2">
<button onClick={onPrev} disabled={page <= 1} className="px-3 py-2 rounded border border-slate-300 disabled:opacity-50 hover:bg-slate-50">Prev</button>
<button onClick={onNext} disabled={page >= totalPages} className="px-3 py-2 rounded border border-slate-300 disabled:opacity-50 hover:bg-slate-50">Next</button>
</div>
</div>
</>
)}
</section>

<section className="max-w-6xl mx-auto px-4 pb-12">
<div className="flex items-end justify-between mb-5">
<h2 className="text-2xl font-bold">Popular Categories</h2>
</div>

<div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
{popularCategories.map((cat) => (
<div key={cat.name} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition">
<div className="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-900 flex items-center justify-center mb-3">
<Building2 size={18} />
</div>
<h3 className="font-semibold">{cat.name}</h3>
<p className="text-sm text-slate-500">{cat.count} businesses</p>
</div>
))}
</div>
</section>

<section className="max-w-6xl mx-auto px-4 pb-14">
<div className="flex items-end justify-between mb-5">
<h2 className="text-2xl font-bold">Siargao Guides</h2>
<span className="text-sm text-slate-500">SEO hubs for visitors and locals</span>
</div>
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
{[
{ href: "/guide/best-cafes-in-siargao", label: "Best Cafes in Siargao" },
{ href: "/guide/best-restaurants-in-general-luna", label: "Best Restaurants in General Luna" },
{ href: "/guide/siargao-surf-schools-guide", label: "Siargao Surf Schools Guide" },
{ href: "/guide/siargao-island-hopping-guide", label: "Siargao Island Hopping Guide" },
{ href: "/guide/siargao-transport-guide", label: "Siargao Transport Guide" },
{ href: "/guide/siargao-coworking-guide", label: "Siargao Coworking Guide" },
{ href: "/guide/where-to-find-services-in-siargao", label: "Where to Find Services in Siargao" },
{ href: "/guide/top-local-businesses-in-siargao", label: "Top Local Businesses in Siargao" },
].map((g) => (
<Link key={g.href} href={g.href} className="bg-white border rounded-xl p-4 hover:shadow-md transition text-sm font-medium text-amber-800 hover:underline">
{g.label}
</Link>
))}
</div>
</section>

<SiteFooter />


</main>
);
}
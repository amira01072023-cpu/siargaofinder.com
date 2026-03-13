// src/app/vendors/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { Search, Globe, Home } from "lucide-react";

type Vendor = {
id: number;
company_name: string;
services: string;
website_url: string | null;
};

type VendorsResponse = {
items: Vendor[];
page: number;
limit: number;
total: number;
totalPages: number;
};

export default function VendorsPage() {
const [q, setQ] = useState("");
const [vendors, setVendors] = useState<Vendor[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [total, setTotal] = useState(0);

const loadVendors = async (params?: { q?: string; page?: number }) => {
try {
setLoading(true);
setError("");

const url = new URL("/api/vendors", window.location.origin);
url.searchParams.set("limit", "10");
url.searchParams.set("page", String(params?.page ?? 1));
if (params?.q) url.searchParams.set("q", params.q);

const res = await fetch(url.toString(), { cache: "no-store" });
const data: VendorsResponse | { error: string } = await res.json();

if (!res.ok || "error" in data) {
throw new Error("error" in data ? data.error : "Failed to load businesses");
}

setVendors(data.items ?? []);
setPage(data.page ?? 1);
setTotalPages(data.totalPages ?? 1);
setTotal(data.total ?? 0);
} catch (e: unknown) {
setError(e instanceof Error ? e.message : "Something went wrong");
} finally {
setLoading(false);
}
};

useEffect(() => {
loadVendors({ page: 1 });
}, []);

const onSearch = () => loadVendors({ q, page: 1 });
const onPrev = () => page > 1 && loadVendors({ q, page: page - 1 });
const onNext = () => page < totalPages && loadVendors({ q, page: page + 1 });

return (
<main className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased">
<header className="bg-black border-b border-yellow-500 sticky top-0 z-30 text-yellow-300 shadow-sm">
<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
<div className="flex items-center gap-2">
<Search className="text-yellow-300" size={20} />
<span className="font-bold text-lg tracking-tight">Siargao Finder</span>
</div>

<Link
href="/"
className="inline-flex items-center gap-2 bg-yellow-400 text-black text-sm px-4 py-2 rounded-lg hover:bg-yellow-300 transition font-semibold"
>
<Home size={16} />
Home
</Link>
</div>
</header>

<section className="max-w-6xl mx-auto px-4 py-10">
<h1 className="text-3xl font-extrabold">Find Businesses</h1>
<p className="mt-2 text-slate-600">Search by business name or services.</p>

<div className="mt-6 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
<div className="flex items-center gap-2 border border-slate-200 rounded-lg px-3 py-2 bg-white">
<Search size={18} className="text-slate-500" />
<input
value={q}
onChange={(e) => setQ(e.target.value)}
onKeyDown={(e) => e.key === "Enter" && onSearch()}
placeholder="Search services or business name..."
className="w-full outline-none text-slate-700"
/>
</div>

<button
onClick={onSearch}
className="mt-3 bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2.5 rounded-lg font-semibold transition"
>
Search
</button>
</div>

<div className="mt-6 flex items-center justify-between">
<h2 className="text-2xl font-bold">Results</h2>
<span className="text-sm text-slate-500">{total} total records</span>
</div>

{loading && <p className="text-slate-500 mt-4">Loading businesses...</p>}
{error && <p className="text-red-600 mt-4">Error: {error}</p>}
{!loading && !error && vendors.length === 0 && (
<p className="text-slate-500 mt-4">No businesses found.</p>
)}

{!loading && !error && vendors.length > 0 && (
<>
<div className="grid md:grid-cols-2 gap-4 mt-4">
{vendors.map((v) => (
<article
key={v.id}
className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg transition"
>
<h3 className="text-lg font-bold">{v.company_name}</h3>
<p className="mt-2 text-sm text-slate-600">{v.services}</p>

<div className="mt-4">
{v.website_url ? (
<a
href={v.website_url}
target="_blank"
rel="noreferrer"
className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm hover:bg-yellow-300 font-semibold transition"
>
<Globe size={16} />
Website
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

<div className="mt-6 flex items-center justify-between">
<p className="text-sm text-slate-500">
Page {page} of {totalPages}
</p>
<div className="flex gap-2">
<button
onClick={onPrev}
disabled={page <= 1}
className="px-3 py-2 rounded border border-slate-300 disabled:opacity-50 hover:bg-slate-50"
>
Prev
</button>
<button
onClick={onNext}
disabled={page >= totalPages}
className="px-3 py-2 rounded border border-slate-300 disabled:opacity-50 hover:bg-slate-50"
>
Next
</button>
</div>
</div>
</>
)}
</section>

<SiteFooter />
</main>
);
}

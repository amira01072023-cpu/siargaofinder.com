"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Search, MapPin, Phone, Star, Building2, BedDouble, Utensils, Waves, Car, Briefcase, School, Landmark, ShoppingBag, Fuel, Cross, PawPrint, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import SaveListingButton from "@/components/SaveListingButton";
import SavedListingsPanel from "@/components/SavedListingsPanel";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import { getBasicListingCompleteness } from "@/lib/listing-completeness";
import { categoryMatchesGroup, getListingCategoryGroup, LISTING_CATEGORY_GROUPS } from "@/lib/listing-category-groups";
import { listingHref } from "@/lib/listing-slugs";

type Listing = {
id: number;
business_name: string;
category: string | null;
municipality: string | null;
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

type PopularCategory = {
name: string;
count: number;
};

type DirectoryCategoryCard = {
id: string;
name: string;
countLabel: string;
note: string;
};

type InitialHomeData = {
  page: number;
  total: number;
  totalPages: number;
  municipalities: string[];
  popularCategories: PopularCategory[];
};

type ViewMode = "gallery" | "list" | "table" | "detail";

const CATEGORY_PAGE_SIZE = 8;
const BLOG_PAGE_SIZE = 8;

const blogPosts = [
  { href: "/blog/best-things-to-do-in-siargao-beyond-surfing", label: "Best Things to Do in Siargao Beyond Surfing" },
  { href: "/blog/siargao-itinerary", label: "Siargao Itinerary" },
  { href: "/blog/siargao-first-time-visitors", label: "Siargao for First-Time Visitors" },
  { href: "/blog/how-much-does-a-siargao-trip-cost", label: "How Much Does a Siargao Trip Cost?" },
  { href: "/blog/best-restaurants-in-siargao", label: "Best Restaurants in Siargao" },
  { href: "/blog/where-to-eat-in-siargao", label: "Where to Eat in Siargao" },
  { href: "/blog/siargao-restaurant-directory", label: "Siargao Restaurant Directory" },
  { href: "/blog/where-to-stay-in-siargao", label: "Where to Stay in Siargao" },
  { href: "/blog/best-areas-to-stay-in-siargao-by-travel-style", label: "Best Areas to Stay in Siargao by Travel Style" },
  { href: "/blog/siargao-luxury-travel-guide", label: "Siargao Luxury Travel Guide" },
  { href: "/blog/general-luna-travel-guide", label: "General Luna Travel Guide" },
  { href: "/blog/pacifico-travel-guide", label: "Pacifico Travel Guide" },
  { href: "/blog/cloud-9-guide-for-first-time-visitors", label: "Cloud 9 Guide for First-Time Visitors" },
  { href: "/blog/best-beaches-in-siargao", label: "Best Beaches in Siargao" },
  { href: "/blog/best-sunset-spots-in-siargao", label: "Best Sunset Spots in Siargao" },
  { href: "/blog/best-time-to-visit-siargao", label: "Best Time to Visit Siargao" },
  { href: "/blog/manila-to-siargao-travel-guide", label: "Manila to Siargao Travel Guide" },
  { href: "/blog/siargao-airport-guide", label: "Siargao Airport Guide" },
  { href: "/blog/siargao-airport-to-general-luna", label: "Siargao Airport to General Luna" },
  { href: "/blog/how-to-get-around-siargao", label: "How to Get Around Siargao" },
  { href: "/blog/scooter-rental-in-siargao", label: "Scooter Rental in Siargao" },
  { href: "/blog/siargao-motorbike-rental-guide", label: "Siargao Motorbike Rental Guide" },
  { href: "/blog/siargao-island-hopping-contacts", label: "Siargao Island Hopping Contacts" },
  { href: "/blog/siargao-for-couples", label: "Siargao for Couples" },
  { href: "/blog/siargao-solo-travel-guide", label: "Siargao Solo Travel Guide" },
  { href: "/blog/siargao-for-non-surfers", label: "Siargao for Non-Surfers" },
  { href: "/blog/family-friendly-things-to-do-in-siargao", label: "Family-Friendly Things to Do in Siargao" },
  { href: "/blog/medical-options-siargao", label: "Medical Options in Siargao" },
];

function categoryVisual(name: string) {
  const label = name.toLowerCase();
  const shared = { bg: 'bg-yellow-100', fg: 'text-yellow-900' };
  if (label.includes('hotel') || label.includes('stay')) return { icon: BedDouble, ...shared };
  if (label.includes('restaurant') || label.includes('food') || label.includes('cafe')) return { icon: Utensils, ...shared };
  if (label.includes('supplier')) return { icon: Building2, ...shared };
  if (label.includes('surf')) return { icon: Waves, ...shared };
  if (label.includes('transport') || label.includes('rental')) return { icon: Car, ...shared };
  if (label.includes('tour')) return { icon: Briefcase, ...shared };
  if (label.includes('school') || label.includes('education')) return { icon: School, ...shared };
  if (label.includes('government')) return { icon: Landmark, ...shared };
  if (label.includes('market') || label.includes('shop') || label.includes('mall')) return { icon: ShoppingBag, ...shared };
  if (label.includes('gas')) return { icon: Fuel, ...shared };
  if (label.includes('clinic') || label.includes('pharmacy')) return { icon: Cross, ...shared };
  if (label.includes('veterinary')) return { icon: PawPrint, ...shared };
  if (label.includes('grocery') || label.includes('supermarket')) return { icon: ShoppingCart, ...shared };
  return { icon: Building2, ...shared };
}

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

function uniqueOptions(options: string[]) {
const map = new Map<string, string>();
for (const option of options) {
  const value = option.trim();
  if (!value) continue;
  const key = normalizeOption(value);
  if (!map.has(key)) map.set(key, value);
}
return [...map.values()].sort((a, b) => a.localeCompare(b));
}

function normalizeOption(value: string) {
return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export default function HomePageClient({ initialData }: { initialData: InitialHomeData }) {
const [listings, setListings] = useState<Listing[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const [q, setQ] = useState("");
const [category, setCategory] = useState("");
const [categoryGroup, setCategoryGroup] = useState("");
const [municipality, setMunicipality] = useState("");
const [hasPhone, setHasPhone] = useState(false);

const municipalityOptions = uniqueOptions(initialData.municipalities ?? []);
const popularCategories = initialData.popularCategories ?? [];

const [page, setPage] = useState(initialData.page ?? 1);
const [totalPages, setTotalPages] = useState(initialData.totalPages ?? 1);
const [total, setTotal] = useState(initialData.total ?? 0);
const [viewMode, setViewMode] = useState<ViewMode>("gallery");
const [selectedListingId, setSelectedListingId] = useState<number | null>(null);
const [hasSearched, setHasSearched] = useState(false);
const [popularCategoryPage, setPopularCategoryPage] = useState(1);
const [blogPage, setBlogPage] = useState(1);

const liveSectionRef = useRef<HTMLElement | null>(null);

const loadListings = async (params?: { q?: string; category?: string; categoryGroup?: string; municipality?: string; hasPhone?: boolean; page?: number }) => {
try {
setLoading(true);
setError("");

const url = new URL("/api/listings", window.location.origin);
url.searchParams.set("limit", "10");
url.searchParams.set("page", String(params?.page ?? 1));
if (params?.q) url.searchParams.set("q", params.q);
if (params?.category) url.searchParams.set("category", params.category);
if (params?.categoryGroup) url.searchParams.set("categoryGroup", params.categoryGroup);
if (params?.municipality) url.searchParams.set("municipality", params.municipality);
if (params?.hasPhone) url.searchParams.set("hasPhone", "1");
if (!params?.q && !params?.category && !params?.categoryGroup && !params?.municipality && !params?.hasPhone && (params?.page ?? 1) === 1) {
url.searchParams.set("random", "1");
}

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

const onSearch = async () => {
setHasSearched(true);
await loadListings({ q, category, categoryGroup, municipality, hasPhone, page: 1 });
liveSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const clearAllFilters = () => {
  setQ("");
  setCategory("");
  setCategoryGroup("");
  setMunicipality("");
  setHasPhone(false);
  setHasSearched(false);
  setListings([]);
  setPage(initialData.page ?? 1);
  setTotalPages(initialData.totalPages ?? 1);
  setTotal(initialData.total ?? 0);
  setError("");
};

const onPrev = () => page > 1 && loadListings({ q, category, categoryGroup, municipality, hasPhone, page: page - 1 });
const onNext = () => page < totalPages && loadListings({ q, category, categoryGroup, municipality, hasPhone, page: page + 1 });

const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
if (e.key === "Enter") {
e.preventDefault();
onSearch();
}
};

const applyCategoryGroup = async (value: string) => {
  setCategory("");
  setCategoryGroup(value);
  setHasSearched(true);
  await loadListings({ q, categoryGroup: value, municipality, hasPhone, page: 1 });
  liveSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const selectedListing = listings.find((l) => l.id === selectedListingId) || listings[0] || null;
const groupCards: DirectoryCategoryCard[] = LISTING_CATEGORY_GROUPS.map((group) => {
  const count = popularCategories
    .filter((cat) => categoryMatchesGroup(cat.name, group))
    .reduce((sum, cat) => sum + cat.count, 0);
  return {
    id: group.id,
    name: group.label,
    countLabel: count > 0 ? `${count} listings` : "Browse listings",
    note: "Search this category group",
  };
});
const totalCategoryCards = groupCards.length;
const popularCategoryTotalPages = Math.max(Math.ceil(totalCategoryCards / CATEGORY_PAGE_SIZE), 1);
const categoryPageStart = Math.max((popularCategoryPage - 1) * CATEGORY_PAGE_SIZE, 0);
const visibleCategoryCards = groupCards.slice(
  categoryPageStart,
  categoryPageStart + CATEGORY_PAGE_SIZE,
);
const blogTotalPages = Math.max(Math.ceil(blogPosts.length / BLOG_PAGE_SIZE), 1);
const visibleBlogPosts = blogPosts.slice((blogPage - 1) * BLOG_PAGE_SIZE, blogPage * BLOG_PAGE_SIZE);
const hasActiveFilters = Boolean(q || category || categoryGroup || municipality || hasPhone);
const selectedCategoryGroup = categoryGroup ? getListingCategoryGroup(categoryGroup) : null;
return (
<main className="page-shell antialiased">
<PublicSiteHeader showBlogLink showListYourBusinessLink homeLabel="Home" />

<section className="hero-wrap hero-wrap--premium relative overflow-hidden text-black">
<div className="hero-content relative max-w-6xl mx-auto px-4 py-8 md:py-10">
<div className="hero-copy-shell max-w-4xl">
  <div className="hero-eyebrow">Curated island directory</div>
  <h1 className="hero-title max-w-3xl">
    Find trusted businesses, services, rentals, and local contacts across Siargao
  </h1>
  <p className="hero-description max-w-2xl">
    Search hotels, tours, transport, restaurants, clinics, and everyday services across Siargao’s municipalities in one clean local directory.
  </p>

  <div className="hero-rail-wrap hero-rail-wrap--aligned hidden md:block">
    <div className="hero-chip-marquee hero-chip-marquee--slow hero-chip-marquee--editorial text-xs md:text-sm" aria-label="Directory highlights">
      <div className="hero-chip-track hero-chip-track--minimal">
        {[
          `${total} listings and growing`,
          '9 municipalities covered',
          'Updated local business directory',
          `${total} listings and growing`,
          '9 municipalities covered',
          'Updated local business directory',
        ].map((label, index) => (
          <span key={`${label}-${index}`} className="hero-stat-chip hero-stat-chip--minimal whitespace-nowrap shrink-0">
            {label}
          </span>
        ))}
      </div>
    </div>

    <div className="mt-3 hero-chip-marquee hero-chip-marquee--subtle hero-chip-marquee--editorial text-xs md:text-sm" aria-label="Popular categories overview">
      <div className="hero-chip-track hero-chip-track--minimal hero-chip-track--alt">
        {[
          'Hotels & Stays',
          'Tours & Island Hopping',
          'Transport Rentals',
          'Food & Restaurants',
          'Surf Schools',
          'Essentials & Services',
          'Hotels & Stays',
          'Tours & Island Hopping',
          'Transport Rentals',
          'Food & Restaurants',
          'Surf Schools',
          'Essentials & Services',
        ].map((label, index) => (
          <span key={`${label}-${index}`} className="hero-link-chip hero-link-chip--minimal whitespace-nowrap shrink-0" aria-hidden="true">
            {label}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>

<div className="hero-search-panel hero-search-panel--classic mt-5">
  <div className="hero-search-header">
    <div>
      <p className="hero-search-kicker">Start your search</p>
      <h2 className="hero-search-title">Search the Siargao directory</h2>
    </div>
    <div className="hero-search-meta" aria-label="Directory status">
      <span className="hero-search-meta-item">Status: <span className="hero-search-status-live">Live</span></span>
    </div>
  </div>

  <div className="hero-search-grid">
    <label className="hero-search-field hero-search-field--wide">
      <span className="hero-search-label">What</span>
      <div className="hero-search-control">
        <Search size={17} className="hero-search-icon" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onSearchKeyDown}
          placeholder="What are you looking for?"
          className="hero-search-input"
        />
      </div>
    </label>

    <label className="hero-search-field">
      <span className="hero-search-label">Category</span>
      <div className="hero-search-control">
        <Building2 size={17} className="hero-search-icon" />
        <select
          value={categoryGroup}
          onChange={(e) => {
            setCategoryGroup(e.target.value);
            setCategory("");
          }}
          onKeyDown={onSearchKeyDown}
          className="hero-search-select"
        >
          <option value="">All Category Groups</option>
          {LISTING_CATEGORY_GROUPS.map((group) => (
            <option key={group.id} value={group.id}>
              {group.label}
            </option>
          ))}
        </select>
      </div>
    </label>

    <label className="hero-search-field">
      <span className="hero-search-label">Municipality</span>
      <div className="hero-search-control">
        <MapPin size={17} className="hero-search-icon" />
        <select
          value={municipality}
          onChange={(e) => setMunicipality(e.target.value)}
          onKeyDown={onSearchKeyDown}
          className="hero-search-select"
        >
          <option value="">All Municipalities</option>
          {municipalityOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </label>

    <div className="hero-search-field hero-search-field--button">
      <span className="hero-search-label hero-search-label--ghost">Search</span>
      <button
        onClick={onSearch}
        className="hero-search-button"
      >
        Search Directory
      </button>
    </div>
  </div>

  <label className="hero-phone-filter mt-4">
    <input
      type="checkbox"
      checked={hasPhone}
      onChange={(e) => setHasPhone(e.target.checked)}
      className="h-4 w-4 accent-slate-900"
    />
    <span className="inline-flex items-center gap-2">
      <Phone size={15} />
      Show only listings with phone numbers
    </span>
  </label>

  <div className="hero-search-actions hero-search-actions--classic flex flex-wrap items-center justify-between gap-3">
    <p className="hero-search-note">Search hotels, tours, rentals, local services, and everyday essentials across the island.</p>
    <div className="flex flex-wrap items-center gap-2">
      {hasActiveFilters && (
        <button onClick={clearAllFilters} className="ui-btn bg-black text-white hover:bg-slate-800 shadow-sm">
          Clear All
        </button>
      )}
      <span className="text-sm text-slate-700 font-medium">
        {hasSearched ? `${total} results` : "Search to view listings"}
      </span>
    </div>
  </div>

  {hasActiveFilters && (
    <div className="hero-active-filters mt-4 flex flex-wrap gap-2">
      {q && <span className="listing-card-pill">Search: {q}</span>}
      {selectedCategoryGroup && <span className="listing-card-pill">Category: {selectedCategoryGroup.label}</span>}
      {category && <span className="listing-card-pill">Quick category: {category}</span>}
      {municipality && <span className="listing-card-pill">Municipality: {municipality}</span>}
      {hasPhone && <span className="listing-card-pill">Phone numbers only</span>}
    </div>
  )}
</div>
</div>
</section>

<section className="max-w-6xl mx-auto px-4 pt-5">
  <SavedListingsPanel />
</section>

{hasSearched && (
<section ref={liveSectionRef} className="max-w-6xl mx-auto px-4 py-7">
<div className="section-heading mb-6">
<div>
<p className="section-kicker">Discover</p>
<h2 className="section-title">Live Listings</h2>
<p className="section-description mt-1">Updated local business listings</p>
</div>
</div>

{loading && <p className="text-slate-500">Loading listings...</p>}
{error && <p className="text-red-600">Error: {error}</p>}
{!loading && !error && listings.length === 0 && (
  <div className="surface-panel p-6 text-slate-600">
    <p className="font-semibold text-slate-900">No listings found.</p>
    <p className="mt-1">Try clearing a filter, changing municipality, or using a broader search term.</p>
    {(q || category || municipality) && (
      <button onClick={clearAllFilters} className="ui-btn ui-btn--soft mt-4">Reset search</button>
    )}
  </div>
)}

{!loading && !error && listings.length > 0 && (
<>
<div className="results-toolbar mb-4">
<div>
<p className="text-sm font-semibold text-slate-900">{total} matching listings</p>
<p className="text-xs text-slate-500">Page {page} of {totalPages}</p>
</div>
<div className="view-toggle-wrap">
{([
  ["list", "Compact"],
  ["gallery", "Cards"],
  ["table", "Table"],
  ["detail", "Detail"],
] as [ViewMode, string][]).map(([mode, label]) => (
<button
key={mode}
onClick={() => setViewMode(mode)}
className={`view-toggle-chip ${viewMode === mode ? "view-toggle-chip--active" : "view-toggle-chip--idle"}`}
>
{label}
</button>
))}
</div>
</div>

{viewMode === "gallery" && (
<div className="grid md:grid-cols-2 gap-3">
{listings.map((item) => {
const social = detectSocial(item.website_url);
const socialButtons = socialsToButtons(item.socials);
const visual = categoryVisual(item.category || "");
const Icon = visual.icon;
const completeness = getBasicListingCompleteness(item);
return (
<article key={item.id} className="listing-card group">
<div className="listing-card-accent" />
<div className="flex items-start justify-between gap-3">
  <div className="min-w-0">
    <div className="flex items-center gap-3 mb-3">
      <div className={`listing-card-icon ${visual.bg} ${visual.fg}`}>
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <h3 className="listing-card-title truncate">{item.business_name}</h3>
        <p className="listing-card-subtitle">Local business profile</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      <p className="listing-card-pill listing-card-pill--warm">{item.category || "General Services"}</p>
      <p className="listing-card-pill">{item.municipality || "Siargao"}</p>
    </div>
  </div>
  <div className="listing-card-score text-right">
    <p className="listing-card-score-label">Listing quality</p>
    <p className="listing-card-score-value">{completeness}%</p>
  </div>
</div>
<div className="listing-card-meta mt-4 space-y-2 text-sm text-slate-600">
<p className="flex items-center gap-2"><MapPin size={15} /> {item.municipality || "Siargao"}</p>
<p className="flex items-center gap-2"><Phone size={15} /> {item.phone || "Phone not listed"}</p>
<div className="flex flex-wrap gap-2 pt-1">
  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
    <Star size={13} className="text-green-600 fill-green-600" />
    Public directory listing
  </span>
</div>
</div>
<div className="listing-card-actions listing-card-actions--stacked mt-5">
<div className="listing-card-actions-primary">
  <Link href={listingHref(item)} className="listing-card-btn listing-card-btn--soft listing-card-btn--primary">View Details</Link>
  {item.website_url ? <a href={item.website_url} target="_blank" rel="noreferrer" className="listing-card-btn listing-card-btn--dark listing-card-btn--primary">{social ? "Visit Profile" : "Visit Website"}</a> : null}
</div>
<div className="listing-card-actions-secondary">
  <SaveListingButton item={{ id: item.id, business_name: item.business_name, category: item.category, municipality: item.municipality }} />
  {socialButtons.length > 0 ? socialButtons.slice(0, 2).map((s) => <a key={`${item.id}-${s.label}`} href={s.href} target="_blank" rel="noreferrer" className="listing-card-btn listing-card-btn--soft">{s.label}</a>) : social ? <a href={social.href} target="_blank" rel="noreferrer" className="listing-card-btn listing-card-btn--soft">{social.label}</a> : null}
</div>
</div>
</article>
);
})}
</div>
)}

{viewMode === "list" && (
<div className="surface-panel compact-list divide-y divide-slate-200/70 overflow-hidden">
{listings.map((item) => (
<div key={item.id} className="compact-list-row">
<div className="min-w-0">
<p className="font-semibold text-slate-900">{item.business_name}</p>
<p className="text-sm text-slate-500">{item.category || "General Services"} • {item.municipality || "Siargao"}</p>
</div>
<div className="compact-list-actions">
{item.phone ? <a href={`tel:${item.phone}`} className="listing-card-btn listing-card-btn--soft">Call</a> : null}
{item.website_url ? <a href={item.website_url} target="_blank" rel="noreferrer" className="listing-card-btn listing-card-btn--soft">Website</a> : null}
<Link href={listingHref(item)} className="listing-card-btn listing-card-btn--dark">View</Link>
</div>
</div>
))}
</div>
)}

{viewMode === "table" && (
<div className="surface-panel overflow-x-auto">
<table className="min-w-full text-sm">
<thead className="bg-slate-50/80 text-slate-500">
<tr>
<th className="text-left p-3 font-semibold">Business</th><th className="text-left p-3 font-semibold">Category</th><th className="text-left p-3 font-semibold">Municipality</th><th className="text-left p-3 font-semibold">Phone</th><th className="text-left p-3 font-semibold">Action</th>
</tr>
</thead>
<tbody>
{listings.map((item) => (
<tr key={item.id} className="border-t border-slate-200/70 text-slate-700">
<td className="p-3 font-medium text-slate-900">{item.business_name}</td>
<td className="p-3">{item.category || "General"}</td>
<td className="p-3">{item.municipality || "Siargao"}</td>
<td className="p-3">{item.phone || "N/A"}</td>
<td className="p-3"><Link href={listingHref(item)} className="text-slate-900 hover:underline">Open</Link></td>
</tr>
))}
</tbody>
</table>
</div>
)}

{viewMode === "detail" && selectedListing && (
<div className="surface-panel p-5">
<div className="flex flex-wrap gap-2 mb-4">
{listings.map((l) => (
<button key={l.id} onClick={() => setSelectedListingId(l.id)} className={`view-toggle-chip ${selectedListing.id === l.id ? "view-toggle-chip--active" : "view-toggle-chip--idle"}`}>
{l.business_name}
</button>
))}
</div>
<h3 className="text-xl font-bold text-slate-900">{selectedListing.business_name}</h3>
<p className="text-sm text-slate-600 mt-1">{selectedListing.category || "General Services"} • {selectedListing.municipality || "Siargao"}</p>
<p className="text-sm mt-2 text-slate-700">Phone: {selectedListing.phone || "N/A"}</p>
<div className="mt-4"><Link href={listingHref(selectedListing)} className="ui-btn ui-btn--dark">Open Full Details</Link></div>
</div>
)}

<div className="mt-5 border-t border-slate-200 pt-4 flex items-center justify-between gap-3 flex-wrap">
<div>
  <p className="text-sm font-medium text-slate-700">Listings Navigation</p>
  <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
</div>
<div className="flex items-center gap-2">
  <button onClick={onPrev} disabled={page <= 1} className="ui-btn ui-btn--soft disabled:opacity-50 disabled:cursor-not-allowed">← Prev</button>
  <button onClick={onNext} disabled={page >= totalPages} className="ui-btn ui-btn--dark disabled:opacity-50 disabled:cursor-not-allowed">Next →</button>
</div>
</div>
</>
)}
</section>
)}

<section className="max-w-6xl mx-auto px-4 pb-8">
<div className="section-heading mb-6">
<div>
<p className="section-kicker">Explore</p>
<h2 className="section-title">Popular Categories</h2>
<p className="section-description mt-1">Jump into the busiest parts of the directory with faster visual scanning.</p>
</div>
{popularCategoryTotalPages > 1 && (
<div className="flex items-center gap-2">
<button
type="button"
onClick={() => setPopularCategoryPage((current) => Math.max(current - 1, 1))}
disabled={popularCategoryPage <= 1}
className="ui-btn ui-btn--soft disabled:opacity-50 disabled:cursor-not-allowed"
aria-label="Previous popular categories"
>
<ChevronLeft size={16} />
</button>
<span className="text-sm font-medium text-slate-600">
Page {popularCategoryPage} of {popularCategoryTotalPages}
</span>
<button
type="button"
onClick={() => setPopularCategoryPage((current) => Math.min(current + 1, popularCategoryTotalPages))}
disabled={popularCategoryPage >= popularCategoryTotalPages}
className="ui-btn ui-btn--soft disabled:opacity-50 disabled:cursor-not-allowed"
aria-label="Next popular categories"
>
<ChevronRight size={16} />
</button>
</div>
)}
</div>

<div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
{visibleCategoryCards.map((cat) => {
const visual = categoryVisual(cat.name);
const Icon = visual.icon;
return (
<button key={cat.id} type="button" onClick={() => applyCategoryGroup(cat.id)} className="category-card group block text-left">
<div className="category-card-accent" />
<div className="category-card-header">
  <div className={`category-card-icon ${visual.bg} ${visual.fg}`}>
    <Icon size={20} />
  </div>
  <h3 className="category-card-title">{cat.name}</h3>
</div>
<p className="category-card-count">{cat.countLabel}</p>
<p className="category-card-note">{cat.note}</p>
</button>
);
})}
</div>
{visibleCategoryCards.length === 0 && (
<div className="surface-panel p-5 text-sm text-slate-600">Categories will appear here once listings are available.</div>
)}
</section>

<section className="max-w-6xl mx-auto px-4 pb-10">
<div className="section-heading mb-6">
<div>
<p className="section-kicker">Read</p>
<h2 className="section-title">Blog Posts</h2>
<p className="section-description">Fresh Siargao blog posts on travel planning, routes, timing, and practical local context</p>
</div>
{blogTotalPages > 1 && (
<div className="flex items-center gap-2">
<button
type="button"
onClick={() => setBlogPage((current) => Math.max(current - 1, 1))}
disabled={blogPage <= 1}
className="ui-btn ui-btn--soft disabled:opacity-50 disabled:cursor-not-allowed"
aria-label="Previous blog posts"
>
<ChevronLeft size={16} />
</button>
<span className="text-sm font-medium text-slate-600">
Page {blogPage} of {blogTotalPages}
</span>
<button
type="button"
onClick={() => setBlogPage((current) => Math.min(current + 1, blogTotalPages))}
disabled={blogPage >= blogTotalPages}
className="ui-btn ui-btn--soft disabled:opacity-50 disabled:cursor-not-allowed"
aria-label="Next blog posts"
>
<ChevronRight size={16} />
</button>
</div>
)}
</div>
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
{visibleBlogPosts.map((g) => (
<Link key={g.href} href={g.href} className="guide-card group">
<div className="guide-card-accent" />
<div className="pt-1">
  <div className="guide-card-title">{g.label}</div>
  <div className="guide-card-note">Read this blog post</div>
</div>
</Link>
))}
</div>
</section>
</main>
);
}

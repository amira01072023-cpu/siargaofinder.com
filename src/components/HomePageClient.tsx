"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, Phone, Building2, BedDouble, Utensils, Waves, Car, Briefcase, School, Landmark, ShoppingBag, Fuel, Cross, PawPrint, ShoppingCart, ChevronLeft, ChevronRight, ArrowRight, HeartPulse, Route, Newspaper } from "lucide-react";
import BusinessListingCard from "@/components/BusinessListingCard";
import SavedListingsPanel from "@/components/SavedListingsPanel";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import { categoryMatchesGroup, getListingCategoryGroup, LISTING_CATEGORY_GROUPS } from "@/lib/listing-category-groups";
import { listingHref } from "@/lib/listing-slugs";
import { municipalityToSlug, SIARGAO_MUNICIPALITIES } from "@/lib/siargao-municipalities";

type Listing = {
id: number;
business_name: string;
category: string | null;
municipality: string | null;
phone: string | null;
email?: string | null;
website_url: string | null;
address?: string | null;
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

type InitialSearch = {
  q: string;
  categoryGroup: string;
  municipality: string;
  hasPhone: boolean;
  page: number;
};

type ViewMode = "gallery" | "list" | "table" | "detail";

type SearchSuggestion = {
  type: "business" | "category" | "municipality";
  label: string;
  value: string;
  detail?: string;
};

const BLOG_PAGE_SIZE = 8;

const MUNICIPALITY_DESCRIPTIONS: Record<string, string> = {
  "General Luna": "Surf, dining & island life",
  Dapa: "Town center & port",
  "Del Carmen": "Lagoon & mangroves",
  "San Isidro": "Pacifico & surf",
  Burgos: "Coastal discovery",
  "Santa Monica": "Beaches & services",
  Pilar: "Rock pools & attractions",
  "San Benito": "Island coast & services",
  Socorro: "Bucas Grande & Sohoton",
};

const ISLAND_ESSENTIALS = [
  {
    href: "/blog/medical-options-siargao",
    label: "Health & emergency",
    description: "Find clinics and practical medical information.",
    icon: HeartPulse,
  },
  {
    href: "/guide/siargao-transport-guide",
    label: "Getting around",
    description: "Understand island transport and local travel options.",
    icon: Route,
  },
  {
    href: "/blog",
    label: "Local guides",
    description: "Plan your stay with practical Siargao articles.",
    icon: Newspaper,
  },
] as const;

const HERO_QUICK_GROUPS = [
  { id: "food-drinks", label: "Restaurants" },
  { id: "hotels-stays", label: "Stays" },
  { id: "tours-activities", label: "Tours" },
  { id: "transport-rentals", label: "Transport" },
  { id: "surf-beach", label: "Surf schools" },
];

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

function buildSearchHref(params: {
  q?: string;
  categoryGroup?: string;
  municipality?: string;
  hasPhone?: boolean;
  page?: number;
}) {
  const next = new URLSearchParams();
  if (params.q) next.set("q", params.q);
  if (params.categoryGroup) next.set("categoryGroup", params.categoryGroup);
  if (params.municipality) next.set("municipality", params.municipality);
  if (params.hasPhone) next.set("hasPhone", "1");
  if ((params.page ?? 1) > 1) next.set("page", String(params.page));
  return next.size ? `/?${next.toString()}` : "/";
}

export default function HomePageClient({
  initialData,
  initialSearch,
}: {
  initialData: InitialHomeData;
  initialSearch: InitialSearch;
}) {
const router = useRouter();
const [listings, setListings] = useState<Listing[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const [q, setQ] = useState(initialSearch.q);
const [category, setCategory] = useState("");
const [categoryGroup, setCategoryGroup] = useState(initialSearch.categoryGroup);
const [municipality, setMunicipality] = useState(initialSearch.municipality);
const [hasPhone, setHasPhone] = useState(initialSearch.hasPhone);
const [moreFiltersOpen, setMoreFiltersOpen] = useState(Boolean(initialSearch.categoryGroup || initialSearch.hasPhone));
const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
const [suggestionsOpen, setSuggestionsOpen] = useState(false);

const municipalityOptions = uniqueOptions(initialData.municipalities ?? []);
const popularCategories = initialData.popularCategories ?? [];

const [page, setPage] = useState(initialSearch.page || initialData.page || 1);
const [totalPages, setTotalPages] = useState(initialData.totalPages ?? 1);
const [total, setTotal] = useState(initialData.total ?? 0);
const [viewMode, setViewMode] = useState<ViewMode>("gallery");
const [selectedListingId, setSelectedListingId] = useState<number | null>(null);
const [hasSearched, setHasSearched] = useState(false);
const [showAllCategories, setShowAllCategories] = useState(false);
const [blogPage, setBlogPage] = useState(1);

const liveSectionRef = useRef<HTMLElement | null>(null);
const locallyLoadedUrlRef = useRef<string | null>(null);

useEffect(() => {
  const query = q.trim();
  if (query.length < 2) {
    return;
  }

  const controller = new AbortController();
  const timer = window.setTimeout(async () => {
    try {
      const response = await fetch(`/api/listings/suggestions?q=${encodeURIComponent(query)}`, {
        signal: controller.signal,
      });
      if (!response.ok) return;
      const data = await response.json();
      setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
      setSuggestionsOpen(true);
    } catch (suggestionError) {
      if (!(suggestionError instanceof DOMException && suggestionError.name === "AbortError")) {
        setSuggestions([]);
      }
    }
  }, 250);

  return () => {
    controller.abort();
    window.clearTimeout(timer);
  };
}, [q]);

const loadListings = useCallback(async (params?: { q?: string; category?: string; categoryGroup?: string; municipality?: string; hasPhone?: boolean; page?: number }) => {
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
}, []);

useEffect(() => {
  const incomingSearch = {
    q: initialSearch.q,
    categoryGroup: initialSearch.categoryGroup,
    municipality: initialSearch.municipality,
    hasPhone: initialSearch.hasPhone,
    page: initialSearch.page,
  };
  const incomingHref = buildSearchHref(incomingSearch);
  if (locallyLoadedUrlRef.current === incomingHref) {
    locallyLoadedUrlRef.current = null;
    return;
  }
  locallyLoadedUrlRef.current = null;

  const hasInitialSearch = Boolean(
    initialSearch.q ||
    initialSearch.categoryGroup ||
    initialSearch.municipality ||
    initialSearch.hasPhone ||
    initialSearch.page > 1,
  );

  const timer = window.setTimeout(() => {
    setQ(initialSearch.q);
    setCategory("");
    setCategoryGroup(initialSearch.categoryGroup);
    setMunicipality(initialSearch.municipality);
    setHasPhone(initialSearch.hasPhone);
    setMoreFiltersOpen(Boolean(initialSearch.categoryGroup || initialSearch.hasPhone));
    setPage(initialSearch.page || 1);

    if (hasInitialSearch) {
      setHasSearched(true);
      void loadListings(incomingSearch);
      return;
    }

    setHasSearched(false);
    setListings([]);
    setTotal(initialData.total);
    setTotalPages(initialData.totalPages);
    setError("");
  }, 0);

  return () => window.clearTimeout(timer);
}, [
  initialData.total,
  initialData.totalPages,
  initialSearch.categoryGroup,
  initialSearch.hasPhone,
  initialSearch.municipality,
  initialSearch.page,
  initialSearch.q,
  loadListings,
]);

const updateSearchUrl = (params: {
  q?: string;
  categoryGroup?: string;
  municipality?: string;
  hasPhone?: boolean;
  page?: number;
}) => {
  const href = buildSearchHref(params);
  locallyLoadedUrlRef.current = href;
  router.push(href, { scroll: false });
};

const performSearch = async (
  params: { q?: string; category?: string; categoryGroup?: string; municipality?: string; hasPhone?: boolean; page?: number },
  shouldScroll = true,
) => {
  setHasSearched(true);
  updateSearchUrl(params);
  await loadListings(params);
  if (shouldScroll) liveSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const onSearch = async (event?: React.FormEvent<HTMLFormElement>) => {
event?.preventDefault();
await performSearch({ q: q.trim(), category, categoryGroup, municipality, hasPhone, page: 1 });
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
  locallyLoadedUrlRef.current = "/";
  router.push("/", { scroll: false });
};

const onPrev = () => page > 1 && void performSearch({ q, category, categoryGroup, municipality, hasPhone, page: page - 1 }, false);
const onNext = () => page < totalPages && void performSearch({ q, category, categoryGroup, municipality, hasPhone, page: page + 1 }, false);

const applyCategoryGroup = async (value: string) => {
  setCategory("");
  setCategoryGroup(value);
  await performSearch({ q, categoryGroup: value, municipality, hasPhone, page: 1 });
};

const applySuggestion = async (suggestion: SearchSuggestion) => {
  setSuggestionsOpen(false);
  if (suggestion.type === "municipality") {
    setQ("");
    setMunicipality(suggestion.value);
    await performSearch({ categoryGroup, municipality: suggestion.value, hasPhone, page: 1 });
    return;
  }
  if (suggestion.type === "category") {
    setQ("");
    setCategory("");
    setCategoryGroup(suggestion.value);
    await performSearch({ categoryGroup: suggestion.value, municipality, hasPhone, page: 1 });
    return;
  }
  setQ(suggestion.value);
  await performSearch({ q: suggestion.value, categoryGroup, municipality, hasPhone, page: 1 });
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
const visibleCategoryCards = showAllCategories ? groupCards : groupCards.slice(0, 8);
const blogTotalPages = Math.max(Math.ceil(blogPosts.length / BLOG_PAGE_SIZE), 1);
const visibleBlogPosts = blogPosts.slice((blogPage - 1) * BLOG_PAGE_SIZE, blogPage * BLOG_PAGE_SIZE);
const hasActiveFilters = Boolean(q || category || categoryGroup || municipality || hasPhone);
const selectedCategoryGroup = categoryGroup ? getListingCategoryGroup(categoryGroup) : null;
return (
<main className="page-shell public-marketplace-shell antialiased">
<PublicSiteHeader showBlogLink showListYourBusinessLink homeLabel="Home" />

<section className="hero-wrap hero-wrap--premium classified-hero relative overflow-hidden text-black">
<Image
  src="/siargao-premium-directory-bg.webp"
  alt=""
  fill
  preload
  fetchPriority="high"
  quality={75}
  sizes="100vw"
  className="hero-background-image"
  aria-hidden="true"
/>
<div className="hero-content classified-hero-content relative max-w-6xl mx-auto px-4 py-8 md:py-10">
<div className="hero-copy-shell max-w-6xl">
  <h1 className="hero-title max-w-6xl">
    Discover the Best <span className="hero-title-accent">of Siargao.</span>
  </h1>
  <p className="hero-description max-w-3xl">
    Find local businesses, places to stay, restaurants, jobs, services, and unforgettable island experiences.
  </p>
</div>

<form id="directory" className="hero-search-panel hero-search-panel--classic marketplace-search-panel mt-5" onSubmit={onSearch}>
  <div className="hero-search-grid hero-search-grid--primary">
    <label className="hero-search-field hero-search-field--wide">
      <span className="hero-search-label">What are you looking for?</span>
      <div className="hero-search-control hero-search-control--suggestions">
        <Search size={17} className="hero-search-icon" />
        <input
          type="search"
          name="q"
          value={q}
          onChange={(e) => {
            const nextQuery = e.target.value;
            setQ(nextQuery);
            if (nextQuery.trim().length < 2) {
              setSuggestions([]);
              setSuggestionsOpen(false);
            }
          }}
          onFocus={() => suggestions.length > 0 && setSuggestionsOpen(true)}
          onBlur={() => window.setTimeout(() => setSuggestionsOpen(false), 120)}
          placeholder="Try “motorbike rental”, “clinic”, or “restaurant”"
          autoComplete="off"
          className="hero-search-input"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={suggestionsOpen && suggestions.length > 0}
          aria-controls="hero-search-suggestions"
        />
        {suggestionsOpen && suggestions.length > 0 && (
          <div id="hero-search-suggestions" className="hero-search-suggestions" role="listbox" aria-label="Search suggestions">
            {suggestions.map((suggestion) => (
              <button
                key={`${suggestion.type}-${suggestion.value}`}
                type="button"
                role="option"
                aria-selected="false"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => void applySuggestion(suggestion)}
                className="hero-search-suggestion"
              >
                <span>{suggestion.label}</span>
                <small>{suggestion.detail || suggestion.type}</small>
              </button>
            ))}
          </div>
        )}
      </div>
    </label>

    <label className="hero-search-field">
      <span className="hero-search-label">Municipality</span>
      <div className="hero-search-control">
        <MapPin size={17} className="hero-search-icon" />
        <select
          name="municipality"
          value={municipality}
          onChange={(e) => setMunicipality(e.target.value)}
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
        type="submit"
        disabled={loading}
        className="hero-search-button"
      >
        {loading ? "Searching…" : "Find businesses"}
      </button>
    </div>
  </div>

  <div className="hero-quick-searches" aria-label="Popular searches">
    <span className="hero-quick-searches-label">Popular</span>
    {HERO_QUICK_GROUPS.map((group) => (
      <button
        key={group.id}
        type="button"
        onClick={() => void applyCategoryGroup(group.id)}
        className={`hero-quick-search-link ${categoryGroup === group.id ? "hero-quick-search-link--active" : ""}`}
        aria-pressed={categoryGroup === group.id}
      >
        {group.label}
      </button>
    ))}
  </div>

  <details
    className="hero-more-filters"
    open={moreFiltersOpen}
    onToggle={(event) => setMoreFiltersOpen(event.currentTarget.open)}
  >
    <summary>More filters</summary>
    <div className="hero-more-filters-grid">
      <label className="hero-search-field">
        <span className="hero-search-label">Category</span>
        <div className="hero-search-control">
          <Building2 size={17} className="hero-search-icon" />
          <select
            name="categoryGroup"
            value={categoryGroup}
            onChange={(e) => {
              setCategoryGroup(e.target.value);
              setCategory("");
            }}
            className="hero-search-select"
          >
            <option value="">All category groups</option>
            {LISTING_CATEGORY_GROUPS.map((group) => (
              <option key={group.id} value={group.id}>
                {group.label}
              </option>
            ))}
          </select>
        </div>
      </label>

      <label className="hero-phone-filter">
        <input
          type="checkbox"
          checked={hasPhone}
          onChange={(e) => setHasPhone(e.target.checked)}
        />
        <span className="inline-flex items-center gap-2">
          <Phone size={15} />
          Only show listings with phone numbers
        </span>
      </label>

      {hasActiveFilters && (
        <button type="button" onClick={clearAllFilters} className="hero-clear-filters">
          Clear filters
        </button>
      )}
    </div>
  </details>

  {hasActiveFilters && (
    <div className="hero-active-filters" aria-label="Active search filters">
      {q && <span className="listing-card-pill">Search: {q}</span>}
      {selectedCategoryGroup && <span className="listing-card-pill">Category: {selectedCategoryGroup.label}</span>}
      {category && <span className="listing-card-pill">Quick category: {category}</span>}
      {municipality && <span className="listing-card-pill">Municipality: {municipality}</span>}
      {hasPhone && <span className="listing-card-pill">Phone numbers only</span>}
    </div>
  )}

  <div className="hero-trust-row">
    <div className="hero-trust-facts" aria-label="Directory coverage">
      <span><strong>{initialData.total.toLocaleString()}</strong> listings</span>
      <span aria-hidden="true">•</span>
      <span><strong>9</strong> municipalities</span>
      <span aria-hidden="true">•</span>
      <span>Updated regularly</span>
    </div>
    <div className="hero-trust-actions">
      <span className="hero-search-result-status" role="status" aria-live="polite">
        {loading ? "Searching…" : hasSearched ? `${total} result${total === 1 ? "" : "s"}` : "Ready to search"}
      </span>
      <Link href="/list-your-business" className="hero-owner-link">List your business <span aria-hidden="true">→</span></Link>
    </div>
  </div>
</form>
</div>
</section>

{hasSearched && (
<section id="results" ref={liveSectionRef} className="marketplace-section max-w-6xl mx-auto px-4 py-10" aria-busy={loading}>
<div className="section-heading mb-6">
<div>
<p className="section-kicker">Discover</p>
<h2 className="section-title">Live Listings</h2>
<p className="section-description mt-1">Updated local business listings</p>
</div>
</div>

{loading && (
  <div className="listing-skeleton-grid" role="status" aria-label="Loading listings">
    {[0, 1, 2, 3].map((item) => (
      <div key={item} className="listing-skeleton" aria-hidden="true">
        <span className="listing-skeleton__icon" />
        <span className="listing-skeleton__line listing-skeleton__line--title" />
        <span className="listing-skeleton__line" />
        <span className="listing-skeleton__line listing-skeleton__line--short" />
      </div>
    ))}
    <span className="sr-only">Loading listings…</span>
  </div>
)}
{error && <p className="text-red-600" role="alert">Error: {error}</p>}
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
<div className="marketplace-listing-grid grid md:grid-cols-2 gap-4">
{listings.map((item) => <BusinessListingCard key={item.id} listing={item} headingLevel="h3" />)}
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
<td className="p-3">{item.phone || <span className="text-slate-400">Not listed</span>}</td>
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
{selectedListing.phone ? <p className="text-sm mt-2 text-slate-700">Phone: {selectedListing.phone}</p> : null}
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

<section id="categories" className="marketplace-section marketplace-section--categories max-w-6xl mx-auto px-4 py-12">
<div className="category-showcase-heading">
<h2 className="section-title">Search by Categories</h2>
<p className="section-description">Discover what you need effortlessly. Browse Siargao&apos;s main categories to find exactly what you&apos;re looking for.</p>
</div>

<div className="category-showcase-grid">
{visibleCategoryCards.map((cat) => {
const visual = categoryVisual(cat.name);
const Icon = visual.icon;
return (
<button
  key={cat.id}
  type="button"
  onClick={() => applyCategoryGroup(cat.id)}
  className={`category-card group${["food-drinks", "hotels-stays", "tours-activities"].includes(cat.id) ? " category-card--featured" : ""}`}
  aria-label={`${cat.name}, ${cat.countLabel}`}
>
  <div className={`category-card-icon ${visual.bg} ${visual.fg}`}>
    <Icon size={38} strokeWidth={1.45} />
  </div>
  <h3 className="category-card-title">{cat.name}</h3>
  <p className="category-card-count">{cat.countLabel}</p>
</button>
);
})}
</div>
{visibleCategoryCards.length === 0 && (
<div className="surface-panel p-5 text-sm text-slate-600">Categories will appear here once listings are available.</div>
)}
{groupCards.length > 8 && (
  <div className="category-showcase-expand">
    <button type="button" className="ui-btn ui-btn--soft" onClick={() => setShowAllCategories((value) => !value)} aria-expanded={showAllCategories}>
      {showAllCategories ? "Show fewer categories" : "View all categories"}
      <ArrowRight size={16} aria-hidden="true" />
    </button>
  </div>
)}
</section>

<section id="municipalities" className="marketplace-section municipality-discovery max-w-6xl mx-auto px-4 py-12">
  <div className="section-heading mb-6">
    <div>
      <p className="section-kicker">Explore the island</p>
      <h2 className="section-title">Discover by Municipality</h2>
      <p className="section-description">Browse businesses and services across all nine Siargao-area municipalities.</p>
    </div>
  </div>
  <div className="municipality-discovery-grid">
    {SIARGAO_MUNICIPALITIES.map((name, index) => (
      <Link key={name} href={`/municipality/${municipalityToSlug(name)}`} className={`municipality-discovery-card${index < 3 ? " municipality-discovery-card--featured" : ""}`}>
        <MapPin size={20} aria-hidden="true" />
        <span>
          <strong>{name}</strong>
          <small>{MUNICIPALITY_DESCRIPTIONS[name]}</small>
        </span>
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    ))}
  </div>
</section>

<section className="marketplace-section island-essentials max-w-6xl mx-auto px-4 py-12">
  <div className="section-heading mb-6">
    <div>
      <p className="section-kicker">Useful on the island</p>
      <h2 className="section-title">Island Essentials</h2>
    </div>
  </div>
  <div className="island-essentials-grid">
    {ISLAND_ESSENTIALS.map(({ href, label, description, icon: Icon }) => (
      <Link key={href} href={href} className="island-essential-card">
        <Icon size={22} aria-hidden="true" />
        <span><strong>{label}</strong><small>{description}</small></span>
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    ))}
  </div>
</section>

<section id="saved" className="marketplace-saved-section max-w-6xl mx-auto px-4 py-8 scroll-mt-24">
  <SavedListingsPanel />
</section>

<section id="journal" className="marketplace-section marketplace-section--journal max-w-6xl mx-auto px-4 py-12">
<div className="section-heading mb-6">
<div>
<p className="section-kicker">The Siargao Journal</p>
<h2 className="section-title">Stories, Places &amp; Island Life</h2>
<p className="section-description">Practical travel guides, local discoveries, and useful context for life around Siargao.</p>
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
  <span className="guide-card-kicker">Siargao guide</span>
  <div className="guide-card-title">{g.label}</div>
  <div className="guide-card-note">Read this blog post <ChevronRight size={14} /></div>
</div>
</Link>
))}
</div>
</section>
</main>
);
}

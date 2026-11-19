"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";
import { getDetailedListingCompleteness } from "@/lib/listing-completeness";
import { getListingQualityScore } from "@/lib/listing-quality-score";
import AdminSubpageShell from "@/components/AdminSubpageShell";

type ListingStatus = "draft" | "published" | "needs_review" | "verified";
type ClaimStatus = "unclaimed" | "pending" | "claimed" | "rejected";

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
  socials: unknown;
  listing_status: ListingStatus | string | null;
  is_featured: boolean | null;
  is_duplicate_flagged: boolean | null;
  claim_status: ClaimStatus | string | null;
  verification_notes: string | null;
  last_reviewed_at: string | null;
  last_reviewed_by: string | null;
};

const LISTING_STATUS_OPTIONS: ListingStatus[] = ["draft", "published", "needs_review", "verified"];
const CLAIM_STATUS_OPTIONS: ClaimStatus[] = ["unclaimed", "pending", "claimed", "rejected"];

function labelize(value: string) {
  return value.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function safeParse<T>(raw: string): T {
  try {
    return raw ? (JSON.parse(raw) as T) : ({} as T);
  } catch {
    return {} as T;
  }
}

export default function AdminListingsPage() {
  const supabase = createClient();

  const [items, setItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [activeId, setActiveId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [claimFilter, setClaimFilter] = useState("");
  const [featuredFilter, setFeaturedFilter] = useState("");
  const [duplicateFilter, setDuplicateFilter] = useState("");
  const [qualitySort, setQualitySort] = useState("lowest");
  const [search, setSearch] = useState("");
  const [notesDraft, setNotesDraft] = useState<Record<number, string>>({});

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  const load = async () => {
    try {
      setLoading(true);
      setMsg("");

      const params = new URLSearchParams();
      if (statusFilter) params.set("listing_status", statusFilter);
      if (claimFilter) params.set("claim_status", claimFilter);
      if (featuredFilter) params.set("featured", featuredFilter);
      if (duplicateFilter) params.set("duplicates", duplicateFilter);
      if (search.trim()) params.set("search", search.trim());

      const url = params.toString() ? `/api/admin/listings?${params}` : "/api/admin/listings";
      const res = await fetch(url, { cache: "no-store" });
      const raw = await res.text();
      const data = safeParse<{ error?: string; items?: Listing[] }>(raw);

      if (!res.ok) {
        setItems([]);
        setMsg(data.error || `Failed to load (${res.status})`);
        return;
      }

      const nextItems = data.items || [];
      setItems(
        [...nextItems].sort((a, b) => {
          const aScore = getListingQualityScore(a).score;
          const bScore = getListingQualityScore(b).score;
          return qualitySort === "highest" ? bScore - aScore : aScore - bScore;
        })
      );
      setNotesDraft(
        nextItems.reduce((acc, item) => {
          acc[item.id] = item.verification_notes || "";
          return acc;
        }, {} as Record<number, string>)
      );
    } catch (e: unknown) {
      setItems([]);
      setMsg(e instanceof Error ? e.message : "Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [statusFilter, claimFilter, featuredFilter, duplicateFilter, qualitySort]);

  const stats = useMemo(() => {
    return {
      total: items.length,
      needsReview: items.filter((item) => item.listing_status === "needs_review").length,
      featured: items.filter((item) => item.is_featured).length,
      duplicateFlagged: items.filter((item) => item.is_duplicate_flagged).length,
      claimed: items.filter((item) => item.claim_status === "claimed").length,
      lowQuality: items.filter((item) => getListingQualityScore(item).score < 60).length,
    };
  }, [items]);

  const updateListing = async (id: number, updates: Record<string, string | boolean | null>) => {
    try {
      setActiveId(id);
      setMsg("");

      const res = await fetch("/api/admin/listings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });

      const raw = await res.text();
      const data = safeParse<{ error?: string }>(raw);

      if (!res.ok) {
        setMsg(data.error || `Update failed (${res.status})`);
        return;
      }

      setMsg(`✅ Listing #${id} updated.`);
      await load();
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : "Failed to update listing");
    } finally {
      setActiveId(null);
    }
  };

  return (
    <AdminSubpageShell>
      <div className="admin-subpage-content">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Admin</p>
            <h1 className="text-2xl font-bold">Listings Workflow</h1>
            <p className="text-sm text-slate-500 mt-1">Manage listing status, featured flags, duplicate review, and claim workflow.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin" className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50">
              Back to admin
            </Link>
            <button onClick={load} className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50">
              Refresh
            </button>
            <button onClick={signOut} className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50">
              Sign out
            </button>
          </div>
        </div>

        {msg && (
          <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm" role="status">
            {msg}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
          <div className="border rounded-lg p-4 bg-slate-50">
            <p className="text-xs text-slate-500">Total Listings</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.total}</p>
          </div>
          <div className="border rounded-lg p-4 bg-amber-50 border-amber-200">
            <p className="text-xs text-amber-700">Needs Review</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.needsReview}</p>
          </div>
          <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
            <p className="text-xs text-blue-700">Featured</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.featured}</p>
          </div>
          <div className="border rounded-lg p-4 bg-red-50 border-red-200">
            <p className="text-xs text-red-700">Duplicate Flagged</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.duplicateFlagged}</p>
          </div>
          <div className="border rounded-lg p-4 bg-emerald-50 border-emerald-200">
            <p className="text-xs text-emerald-700">Claimed</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.claimed}</p>
          </div>
          <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
            <p className="text-xs text-orange-700">Low Quality</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.lowQuality}</p>
          </div>
        </div>

        <section className="border rounded-xl p-4 mb-6">
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              className="border rounded-lg px-3 py-2 min-w-[240px]"
              placeholder="Search business, category, municipality, phone, email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={load} className="text-sm border border-slate-300 px-3 py-2 rounded-lg hover:bg-slate-50">
              Apply Search
            </button>
            <select className="border rounded-lg px-3 py-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All listing statuses</option>
              {LISTING_STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>{labelize(option)}</option>
              ))}
            </select>
            <select className="border rounded-lg px-3 py-2" value={claimFilter} onChange={(e) => setClaimFilter(e.target.value)}>
              <option value="">All claim statuses</option>
              {CLAIM_STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>{labelize(option)}</option>
              ))}
            </select>
            <select className="border rounded-lg px-3 py-2" value={featuredFilter} onChange={(e) => setFeaturedFilter(e.target.value)}>
              <option value="">All featured states</option>
              <option value="true">Featured</option>
              <option value="false">Not featured</option>
            </select>
            <select className="border rounded-lg px-3 py-2" value={duplicateFilter} onChange={(e) => setDuplicateFilter(e.target.value)}>
              <option value="">All duplicate flags</option>
              <option value="true">Duplicate flagged</option>
              <option value="false">Not flagged</option>
            </select>
            <select className="border rounded-lg px-3 py-2" value={qualitySort} onChange={(e) => setQualitySort(e.target.value)}>
              <option value="lowest">Lowest quality first</option>
              <option value="highest">Highest quality first</option>
            </select>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading listings...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500">No listings found.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border rounded-xl p-4 bg-white">
                  {(() => {
                    const quality = getListingQualityScore(item);
                    return (
                      <>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">{item.business_name}</h2>
                      <p className="text-sm text-slate-600">
                        {item.category || "—"} • {item.municipality || "—"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                        item.is_featured ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-700"
                      }`}>
                        {item.is_featured ? "Featured" : "Standard"}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                        item.is_duplicate_flagged ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"
                      }`}>
                        {item.is_duplicate_flagged ? "Duplicate Flagged" : "Not Flagged"}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                        quality.score >= 80
                          ? "bg-emerald-100 text-emerald-700"
                          : quality.score >= 60
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}>
                        Quality {quality.score}/100
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 grid md:grid-cols-2 gap-2 text-sm text-slate-700">
                    <p><strong>Phone:</strong> {item.phone || "—"}</p>
                    <p><strong>Email:</strong> {item.email || "—"}</p>
                    <p className="md:col-span-2">
                      <strong>Website:</strong>{" "}
                      {item.website_url ? (
                        <a href={item.website_url} target="_blank" rel="noreferrer" className="text-amber-700 hover:underline break-all">
                          {item.website_url}
                        </a>
                      ) : (
                        "—"
                      )}
                    </p>
                    <p className="md:col-span-2"><strong>Address:</strong> {item.address || "—"}</p>
                    <p className="md:col-span-2"><strong>Services:</strong> {item.services || "—"}</p>
                    <p><strong>Listing status:</strong> {labelize(String(item.listing_status || "published"))}</p>
                    <p><strong>Claim status:</strong> {labelize(String(item.claim_status || "unclaimed"))}</p>
                    <p><strong>Completeness:</strong> {getDetailedListingCompleteness(item)}%</p>
                    <p className="md:col-span-2"><strong>Quality cleanup:</strong> {quality.missing.length ? `Missing ${quality.missing.join(", ")}` : "Looks complete"}</p>
                    <p><strong>Last reviewed:</strong> {item.last_reviewed_at ? new Date(item.last_reviewed_at).toLocaleString() : "—"}</p>
                    <p className="md:col-span-2"><strong>Reviewed by:</strong> {item.last_reviewed_by || "—"}</p>
                  </div>

                  <div className="mt-4 grid md:grid-cols-[220px_220px_auto_auto] gap-3 items-start">
                    <select
                      className="border rounded-lg px-3 py-2"
                      value={item.listing_status || "published"}
                      onChange={(e) => updateListing(item.id, { listing_status: e.target.value })}
                      disabled={activeId === item.id}
                    >
                      {LISTING_STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>{labelize(option)}</option>
                      ))}
                    </select>

                    <select
                      className="border rounded-lg px-3 py-2"
                      value={item.claim_status || "unclaimed"}
                      onChange={(e) => updateListing(item.id, { claim_status: e.target.value })}
                      disabled={activeId === item.id}
                    >
                      {CLAIM_STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>{labelize(option)}</option>
                      ))}
                    </select>

                    <label className="inline-flex items-center gap-2 text-sm text-slate-700 border rounded-lg px-3 py-2">
                      <input
                        type="checkbox"
                        checked={Boolean(item.is_featured)}
                        onChange={(e) => updateListing(item.id, { is_featured: e.target.checked })}
                        disabled={activeId === item.id}
                      />
                      Featured
                    </label>

                    <label className="inline-flex items-center gap-2 text-sm text-slate-700 border rounded-lg px-3 py-2">
                      <input
                        type="checkbox"
                        checked={Boolean(item.is_duplicate_flagged)}
                        onChange={(e) => updateListing(item.id, { is_duplicate_flagged: e.target.checked })}
                        disabled={activeId === item.id}
                      />
                      Duplicate flag
                    </label>
                  </div>

                  <div className="mt-4 space-y-2">
                    <textarea
                      className="w-full border rounded-lg px-3 py-2 min-h-[90px]"
                      placeholder="Verification notes"
                      value={notesDraft[item.id] || ""}
                      onChange={(e) => setNotesDraft((prev) => ({ ...prev, [item.id]: e.target.value }))}
                    />
                    <div className="flex flex-wrap gap-2 justify-between">
                      <Link href={`/listing/${item.id}`} className="text-sm border border-slate-300 px-3 py-2 rounded-lg hover:bg-slate-50">
                        Open Public Listing
                      </Link>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => updateListing(item.id, { verification_notes: notesDraft[item.id] || "" })}
                          disabled={activeId === item.id}
                          className="text-sm border border-slate-300 px-3 py-2 rounded-lg hover:bg-slate-50 disabled:opacity-60"
                        >
                          {activeId === item.id ? "Saving..." : "Save Notes"}
                        </button>
                        <button
                          onClick={() => updateListing(item.id, { listing_status: "verified", verification_notes: notesDraft[item.id] || "" })}
                          disabled={activeId === item.id}
                          className="text-sm bg-black text-white px-3 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-60"
                        >
                          Mark Verified
                        </button>
                      </div>
                    </div>
                  </div>
                      </>
                    );
                  })()}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AdminSubpageShell>
  );
}

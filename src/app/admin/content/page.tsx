"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";

type ContentStatus = "idea" | "researching" | "outlining" | "drafting" | "published";
type ContentPriority = "low" | "medium" | "high";

type ContentItem = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string | null;
  target_keyword: string | null;
  search_intent: string | null;
  status: ContentStatus | string;
  priority: ContentPriority | string;
  related_category: string | null;
  related_listing_id: number | null;
  notes: string | null;
  published_url: string | null;
  published_at: string | null;
};

const STATUS_OPTIONS: ContentStatus[] = ["idea", "researching", "outlining", "drafting", "published"];
const PRIORITY_OPTIONS: ContentPriority[] = ["low", "medium", "high"];

const emptyForm = {
  title: "",
  slug: "",
  target_keyword: "",
  search_intent: "",
  status: "idea" as ContentStatus,
  priority: "medium" as ContentPriority,
  related_category: "",
  related_listing_id: "",
  notes: "",
  published_url: "",
};

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

export default function AdminContentPage() {
  const supabase = createClient();

  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [search, setSearch] = useState("");
  const [notesDraft, setNotesDraft] = useState<Record<number, string>>({});
  const [form, setForm] = useState(emptyForm);
  const [activeId, setActiveId] = useState<number | null>(null);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  const load = async () => {
    try {
      setLoading(true);
      setMsg("");

      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (priorityFilter) params.set("priority", priorityFilter);
      if (search.trim()) params.set("search", search.trim());

      const url = params.toString() ? `/api/admin/content?${params}` : "/api/admin/content";
      const res = await fetch(url, { cache: "no-store" });
      const raw = await res.text();
      const data = safeParse<{ error?: string; items?: ContentItem[] }>(raw);

      if (!res.ok) {
        setItems([]);
        setMsg(data.error || `Failed to load (${res.status})`);
        return;
      }

      const nextItems = data.items || [];
      setItems(nextItems);
      setNotesDraft(
        nextItems.reduce((acc, item) => {
          acc[item.id] = item.notes || "";
          return acc;
        }, {} as Record<number, string>)
      );
    } catch (e: unknown) {
      setItems([]);
      setMsg(e instanceof Error ? e.message : "Failed to load content items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [statusFilter, priorityFilter]);

  const stats = useMemo(() => {
    return {
      total: items.length,
      ideas: items.filter((item) => item.status === "idea").length,
      researching: items.filter((item) => item.status === "researching").length,
      drafting: items.filter((item) => item.status === "drafting").length,
      published: items.filter((item) => item.status === "published").length,
    };
  }, [items]);

  const createItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMsg("");

      const payload = {
        ...form,
        related_listing_id: form.related_listing_id ? Number(form.related_listing_id) : null,
      };

      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const raw = await res.text();
      const data = safeParse<{ error?: string }>(raw);

      if (!res.ok) {
        setMsg(data.error || `Create failed (${res.status})`);
        return;
      }

      setForm(emptyForm);
      setMsg("✅ Content item created.");
      await load();
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : "Failed to create content item");
    } finally {
      setSaving(false);
    }
  };

  const updateItem = async (id: number, updates: Record<string, string | number | null>) => {
    try {
      setActiveId(id);
      setMsg("");

      const res = await fetch("/api/admin/content", {
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

      setMsg(`✅ Content item #${id} updated.`);
      await load();
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : "Failed to update content item");
    } finally {
      setActiveId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] p-6 text-slate-800 antialiased">
      <div className="max-w-6xl mx-auto bg-white border rounded-xl p-6 mt-8">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Admin</p>
            <h1 className="text-2xl font-bold">Content</h1>
            <p className="text-sm text-slate-500 mt-1">Track blog ideas, keywords, search intent, and publishing status.</p>
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
          <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
            {msg}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          <div className="border rounded-lg p-4 bg-slate-50">
            <p className="text-xs text-slate-500">Total Items</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.total}</p>
          </div>
          <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
            <p className="text-xs text-blue-700">Ideas</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.ideas}</p>
          </div>
          <div className="border rounded-lg p-4 bg-amber-50 border-amber-200">
            <p className="text-xs text-amber-700">Researching</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.researching}</p>
          </div>
          <div className="border rounded-lg p-4 bg-violet-50 border-violet-200">
            <p className="text-xs text-violet-700">Drafting</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.drafting}</p>
          </div>
          <div className="border rounded-lg p-4 bg-emerald-50 border-emerald-200">
            <p className="text-xs text-emerald-700">Published</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.published}</p>
          </div>
        </div>

        <section className="border rounded-xl p-4 mb-6 bg-slate-50">
          <h2 className="font-semibold mb-3">Add Content Item</h2>
          <form onSubmit={createItem} className="grid md:grid-cols-2 gap-3">
            <input className="border rounded-lg px-3 py-2" placeholder="Title" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Slug (optional)" value={form.slug} onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Target keyword" value={form.target_keyword} onChange={(e) => setForm((prev) => ({ ...prev, target_keyword: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Search intent" value={form.search_intent} onChange={(e) => setForm((prev) => ({ ...prev, search_intent: e.target.value }))} />
            <select className="border rounded-lg px-3 py-2" value={form.status} onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as ContentStatus }))}>
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>{labelize(option)}</option>
              ))}
            </select>
            <select className="border rounded-lg px-3 py-2" value={form.priority} onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value as ContentPriority }))}>
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option} value={option}>{labelize(option)}</option>
              ))}
            </select>
            <input className="border rounded-lg px-3 py-2" placeholder="Related category" value={form.related_category} onChange={(e) => setForm((prev) => ({ ...prev, related_category: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Related listing ID (optional)" value={form.related_listing_id} onChange={(e) => setForm((prev) => ({ ...prev, related_listing_id: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="Published URL (optional)" value={form.published_url} onChange={(e) => setForm((prev) => ({ ...prev, published_url: e.target.value }))} />
            <textarea className="border rounded-lg px-3 py-2 md:col-span-2 min-h-[100px]" placeholder="Notes" value={form.notes} onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))} />
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" disabled={saving} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-60">
                {saving ? "Saving..." : "Create Content Item"}
              </button>
            </div>
          </form>
        </section>

        <section className="border rounded-xl p-4">
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              className="border rounded-lg px-3 py-2 min-w-[220px]"
              placeholder="Search title, keyword, intent, category, notes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={load} className="text-sm border border-slate-300 px-3 py-2 rounded-lg hover:bg-slate-50">
              Apply Search
            </button>
            <select className="border rounded-lg px-3 py-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All statuses</option>
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>{labelize(option)}</option>
              ))}
            </select>
            <select className="border rounded-lg px-3 py-2" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="">All priorities</option>
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option} value={option}>{labelize(option)}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading content items...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500">No content items found.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border rounded-xl p-4 bg-white">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="text-sm text-slate-600">
                        {item.target_keyword || "No keyword"} • {item.search_intent || "No intent"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                        item.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : item.priority === "medium"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        {labelize(String(item.priority || "medium"))}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                        item.status === "published"
                          ? "bg-emerald-100 text-emerald-700"
                          : item.status === "drafting"
                          ? "bg-violet-100 text-violet-700"
                          : item.status === "researching"
                          ? "bg-blue-100 text-blue-700"
                          : item.status === "outlining"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        {labelize(String(item.status || "idea"))}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 grid md:grid-cols-2 gap-2 text-sm text-slate-700">
                    <p><strong>Related category:</strong> {item.related_category || "—"}</p>
                    <p><strong>Related listing ID:</strong> {item.related_listing_id || "—"}</p>
                    <p><strong>Slug:</strong> {item.slug || "—"}</p>
                    <p><strong>Updated:</strong> {new Date(item.updated_at).toLocaleString()}</p>
                    <p className="md:col-span-2">
                      <strong>Published URL:</strong>{" "}
                      {item.published_url ? (
                        <a href={item.published_url} target="_blank" rel="noreferrer" className="text-amber-700 hover:underline break-all">
                          {item.published_url}
                        </a>
                      ) : (
                        "—"
                      )}
                    </p>
                  </div>

                  <div className="mt-4 grid md:grid-cols-[220px_220px_1fr] gap-3 items-start">
                    <select
                      className="border rounded-lg px-3 py-2"
                      value={item.status}
                      onChange={(e) => updateItem(item.id, { status: e.target.value })}
                      disabled={activeId === item.id}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>{labelize(option)}</option>
                      ))}
                    </select>

                    <select
                      className="border rounded-lg px-3 py-2"
                      value={item.priority}
                      onChange={(e) => updateItem(item.id, { priority: e.target.value })}
                      disabled={activeId === item.id}
                    >
                      {PRIORITY_OPTIONS.map((option) => (
                        <option key={option} value={option}>{labelize(option)}</option>
                      ))}
                    </select>

                    <div className="space-y-2">
                      <textarea
                        className="w-full border rounded-lg px-3 py-2 min-h-[90px]"
                        placeholder="Notes"
                        value={notesDraft[item.id] || ""}
                        onChange={(e) => setNotesDraft((prev) => ({ ...prev, [item.id]: e.target.value }))}
                      />
                      <div className="flex flex-wrap gap-2 justify-end">
                        <button
                          onClick={() => updateItem(item.id, { notes: notesDraft[item.id] || "" })}
                          disabled={activeId === item.id}
                          className="text-sm border border-slate-300 px-3 py-2 rounded-lg hover:bg-slate-50 disabled:opacity-60"
                        >
                          {activeId === item.id ? "Saving..." : "Save Notes"}
                        </button>
                        <button
                          onClick={() => updateItem(item.id, { status: "published", notes: notesDraft[item.id] || "" })}
                          disabled={activeId === item.id}
                          className="text-sm bg-black text-white px-3 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-60"
                        >
                          Mark Published
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";

type LeadStatus = "new" | "contacted" | "interested" | "closed";
type LeadSource = "listing_page" | "contact_form" | "blog_page" | "recommendation_request" | "manual";

type Lead = {
  id: number;
  created_at: string;
  updated_at: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  source: LeadSource | string;
  status: LeadStatus | string;
  message: string | null;
  business_listing_id: number | null;
  category: string | null;
  notes: string | null;
  assigned_to: string | null;
  closed_at: string | null;
};

const STATUS_OPTIONS: LeadStatus[] = ["new", "contacted", "interested", "closed"];
const SOURCE_OPTIONS: LeadSource[] = [
  "listing_page",
  "contact_form",
  "blog_page",
  "recommendation_request",
  "manual",
];

const emptyForm = {
  full_name: "",
  email: "",
  phone: "",
  source: "manual" as LeadSource,
  status: "new" as LeadStatus,
  message: "",
  category: "",
  notes: "",
  assigned_to: "",
  business_listing_id: "",
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

export default function AdminLeadsPage() {
  const supabase = createClient();

  const [items, setItems] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
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
      if (sourceFilter) params.set("source", sourceFilter);
      if (search.trim()) params.set("search", search.trim());

      const url = params.toString() ? `/api/admin/leads?${params}` : "/api/admin/leads";
      const res = await fetch(url, { cache: "no-store" });
      const raw = await res.text();
      const data = safeParse<{ error?: string; items?: Lead[] }>(raw);

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
      setMsg(e instanceof Error ? e.message : "Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [statusFilter, sourceFilter]);

  const stats = useMemo(() => {
    return {
      total: items.length,
      newCount: items.filter((item) => item.status === "new").length,
      contacted: items.filter((item) => item.status === "contacted").length,
      interested: items.filter((item) => item.status === "interested").length,
      closed: items.filter((item) => item.status === "closed").length,
    };
  }, [items]);

  const createLead = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMsg("");

      const payload = {
        ...form,
        business_listing_id: form.business_listing_id ? Number(form.business_listing_id) : null,
      };

      const res = await fetch("/api/admin/leads", {
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
      setMsg("✅ Lead created.");
      await load();
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : "Failed to create lead");
    } finally {
      setSaving(false);
    }
  };

  const updateLead = async (id: number, updates: Record<string, string | number | null>) => {
    try {
      setActiveId(id);
      setMsg("");

      const res = await fetch("/api/admin/leads", {
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

      setMsg(`✅ Lead #${id} updated.`);
      await load();
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : "Failed to update lead");
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
            <h1 className="text-2xl font-bold">Leads</h1>
            <p className="text-sm text-slate-500 mt-1">Track inbound inquiries and basic lead status for SiargaoFinder.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/admin" className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50">
              Back to admin
            </Link>
            <button
              onClick={load}
              className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50"
            >
              Refresh
            </button>
            <button
              onClick={signOut}
              className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50"
            >
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
            <p className="text-xs text-slate-500">Total Leads</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.total}</p>
          </div>
          <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
            <p className="text-xs text-blue-700">New</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.newCount}</p>
          </div>
          <div className="border rounded-lg p-4 bg-amber-50 border-amber-200">
            <p className="text-xs text-amber-700">Contacted</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.contacted}</p>
          </div>
          <div className="border rounded-lg p-4 bg-emerald-50 border-emerald-200">
            <p className="text-xs text-emerald-700">Interested</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.interested}</p>
          </div>
          <div className="border rounded-lg p-4 bg-slate-100 border-slate-200">
            <p className="text-xs text-slate-600">Closed</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.closed}</p>
          </div>
        </div>

        <section className="border rounded-xl p-4 mb-6 bg-slate-50">
          <h2 className="font-semibold mb-3">Add Lead</h2>
          <form onSubmit={createLead} className="grid md:grid-cols-2 gap-3">
            <input className="border rounded-lg px-3 py-2" placeholder="Full name" value={form.full_name} onChange={(e) => setForm((prev) => ({ ...prev, full_name: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Phone" value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Category" value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} />
            <select className="border rounded-lg px-3 py-2" value={form.source} onChange={(e) => setForm((prev) => ({ ...prev, source: e.target.value as LeadSource }))}>
              {SOURCE_OPTIONS.map((option) => (
                <option key={option} value={option}>{labelize(option)}</option>
              ))}
            </select>
            <select className="border rounded-lg px-3 py-2" value={form.status} onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as LeadStatus }))}>
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>{labelize(option)}</option>
              ))}
            </select>
            <input className="border rounded-lg px-3 py-2" placeholder="Assigned to" value={form.assigned_to} onChange={(e) => setForm((prev) => ({ ...prev, assigned_to: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Business listing ID (optional)" value={form.business_listing_id} onChange={(e) => setForm((prev) => ({ ...prev, business_listing_id: e.target.value }))} />
            <textarea className="border rounded-lg px-3 py-2 md:col-span-2 min-h-[90px]" placeholder="Message" value={form.message} onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))} />
            <textarea className="border rounded-lg px-3 py-2 md:col-span-2 min-h-[90px]" placeholder="Notes" value={form.notes} onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))} />
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" disabled={saving} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-60">
                {saving ? "Saving..." : "Create Lead"}
              </button>
            </div>
          </form>
        </section>

        <section className="border rounded-xl p-4">
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              className="border rounded-lg px-3 py-2 min-w-[220px]"
              placeholder="Search name, email, phone, category, notes"
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
            <select className="border rounded-lg px-3 py-2" value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
              <option value="">All sources</option>
              {SOURCE_OPTIONS.map((option) => (
                <option key={option} value={option}>{labelize(option)}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading leads...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500">No leads found.</p>
          ) : (
            <div className="space-y-4">
              {items.map((lead) => (
                <div key={lead.id} className="border rounded-xl p-4 bg-white">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">{lead.full_name || lead.email || lead.phone || `Lead #${lead.id}`}</h2>
                      <p className="text-sm text-slate-600">
                        {lead.email || "No email"} • {lead.phone || "No phone"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs px-2 py-1 rounded-md font-medium bg-slate-100 text-slate-700">
                        {labelize(String(lead.source || "manual"))}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                        lead.status === "new"
                          ? "bg-blue-100 text-blue-700"
                          : lead.status === "contacted"
                          ? "bg-amber-100 text-amber-700"
                          : lead.status === "interested"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-700"
                      }`}>
                        {labelize(String(lead.status || "new"))}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 grid md:grid-cols-2 gap-2 text-sm text-slate-700">
                    <p><strong>Category:</strong> {lead.category || "—"}</p>
                    <p><strong>Assigned to:</strong> {lead.assigned_to || "—"}</p>
                    <p><strong>Business Listing ID:</strong> {lead.business_listing_id || "—"}</p>
                    <p><strong>Created:</strong> {new Date(lead.created_at).toLocaleString()}</p>
                    <p><strong>Updated:</strong> {new Date(lead.updated_at).toLocaleString()}</p>
                    {lead.closed_at && <p><strong>Closed:</strong> {new Date(lead.closed_at).toLocaleString()}</p>}
                    <p className="md:col-span-2"><strong>Message:</strong> {lead.message || "—"}</p>
                  </div>

                  <div className="mt-4 grid md:grid-cols-[220px_1fr] gap-3 items-start">
                    <select
                      className="border rounded-lg px-3 py-2"
                      value={lead.status}
                      onChange={(e) => updateLead(lead.id, { status: e.target.value })}
                      disabled={activeId === lead.id}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>{labelize(option)}</option>
                      ))}
                    </select>

                    <div className="space-y-2">
                      <textarea
                        className="w-full border rounded-lg px-3 py-2 min-h-[90px]"
                        placeholder="Notes"
                        value={notesDraft[lead.id] || ""}
                        onChange={(e) => setNotesDraft((prev) => ({ ...prev, [lead.id]: e.target.value }))}
                      />
                      <div className="flex flex-wrap gap-2 justify-end">
                        <button
                          onClick={() => updateLead(lead.id, { notes: notesDraft[lead.id] || "" })}
                          disabled={activeId === lead.id}
                          className="text-sm border border-slate-300 px-3 py-2 rounded-lg hover:bg-slate-50 disabled:opacity-60"
                        >
                          {activeId === lead.id ? "Saving..." : "Save Notes"}
                        </button>
                        <button
                          onClick={() => updateLead(lead.id, { status: "closed", notes: notesDraft[lead.id] || "" })}
                          disabled={activeId === lead.id}
                          className="text-sm bg-black text-white px-3 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-60"
                        >
                          Mark Closed
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

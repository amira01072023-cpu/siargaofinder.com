"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";
import AdminSubpageShell from "@/components/AdminSubpageShell";

type OutreachStatus = "not_contacted" | "contacted" | "replied" | "follow_up_needed" | "closed";
type BusinessType = "hotel" | "villa" | "surf_school" | "cafe" | "coworking" | "transport" | "tours" | "other";

type OutreachContact = {
  id: number;
  created_at: string;
  updated_at: string;
  business_name: string;
  contact_person: string | null;
  business_type: BusinessType | string;
  phone: string | null;
  email: string | null;
  instagram: string | null;
  website_url: string | null;
  status: OutreachStatus | string;
  reminder_date: string | null;
  premium_interest: boolean;
  notes: string | null;
  linked_listing_id: number | null;
};

const STATUS_OPTIONS: OutreachStatus[] = ["not_contacted", "contacted", "replied", "follow_up_needed", "closed"];
const TYPE_OPTIONS: BusinessType[] = ["hotel", "villa", "surf_school", "cafe", "coworking", "transport", "tours", "other"];

const emptyForm = {
  business_name: "",
  contact_person: "",
  business_type: "other" as BusinessType,
  phone: "",
  email: "",
  instagram: "",
  website_url: "",
  status: "not_contacted" as OutreachStatus,
  reminder_date: "",
  premium_interest: false,
  notes: "",
  linked_listing_id: "",
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

export default function AdminOutreachPage() {
  const supabase = createClient();

  const [items, setItems] = useState<OutreachContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [premiumFilter, setPremiumFilter] = useState("");
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
      if (typeFilter) params.set("business_type", typeFilter);
      if (premiumFilter) params.set("premium_interest", premiumFilter);
      if (search.trim()) params.set("search", search.trim());

      const url = params.toString() ? `/api/admin/outreach?${params}` : "/api/admin/outreach";
      const res = await fetch(url, { cache: "no-store" });
      const raw = await res.text();
      const data = safeParse<{ error?: string; items?: OutreachContact[] }>(raw);

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
      setMsg(e instanceof Error ? e.message : "Failed to load outreach contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, [statusFilter, typeFilter, premiumFilter]);

  const stats = useMemo(() => {
    return {
      total: items.length,
      notContacted: items.filter((item) => item.status === "not_contacted").length,
      followUp: items.filter((item) => item.status === "follow_up_needed").length,
      replied: items.filter((item) => item.status === "replied").length,
      premiumInterested: items.filter((item) => item.premium_interest).length,
    };
  }, [items]);

  const createContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMsg("");

      const payload = {
        ...form,
        linked_listing_id: form.linked_listing_id ? Number(form.linked_listing_id) : null,
      };

      const res = await fetch("/api/admin/outreach", {
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
      setMsg("✅ Outreach contact created.");
      await load();
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : "Failed to create outreach contact");
    } finally {
      setSaving(false);
    }
  };

  const updateContact = async (id: number, updates: Record<string, string | number | boolean | null>) => {
    try {
      setActiveId(id);
      setMsg("");

      const res = await fetch("/api/admin/outreach", {
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

      setMsg(`✅ Outreach contact #${id} updated.`);
      await load();
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : "Failed to update outreach contact");
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
            <h1 className="text-2xl font-bold">Outreach</h1>
            <p className="text-sm text-slate-500 mt-1">Track local business contacts, follow-ups, and premium interest.</p>
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
            <p className="text-xs text-slate-500">Total Contacts</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.total}</p>
          </div>
          <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
            <p className="text-xs text-blue-700">Not Contacted</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.notContacted}</p>
          </div>
          <div className="border rounded-lg p-4 bg-amber-50 border-amber-200">
            <p className="text-xs text-amber-700">Follow-up Needed</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.followUp}</p>
          </div>
          <div className="border rounded-lg p-4 bg-emerald-50 border-emerald-200">
            <p className="text-xs text-emerald-700">Replied</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.replied}</p>
          </div>
          <div className="border rounded-lg p-4 bg-violet-50 border-violet-200">
            <p className="text-xs text-violet-700">Premium Interest</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.premiumInterested}</p>
          </div>
        </div>

        <section className="border rounded-xl p-4 mb-6 bg-slate-50">
          <h2 className="font-semibold mb-3">Add Outreach Contact</h2>
          <form onSubmit={createContact} className="grid md:grid-cols-2 gap-3">
            <input className="border rounded-lg px-3 py-2" placeholder="Business name" value={form.business_name} onChange={(e) => setForm((prev) => ({ ...prev, business_name: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Contact person" value={form.contact_person} onChange={(e) => setForm((prev) => ({ ...prev, contact_person: e.target.value }))} />
            <select className="border rounded-lg px-3 py-2" value={form.business_type} onChange={(e) => setForm((prev) => ({ ...prev, business_type: e.target.value as BusinessType }))}>
              {TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>{labelize(option)}</option>
              ))}
            </select>
            <select className="border rounded-lg px-3 py-2" value={form.status} onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as OutreachStatus }))}>
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>{labelize(option)}</option>
              ))}
            </select>
            <input className="border rounded-lg px-3 py-2" placeholder="Phone" value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Instagram" value={form.instagram} onChange={(e) => setForm((prev) => ({ ...prev, instagram: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Website URL" value={form.website_url} onChange={(e) => setForm((prev) => ({ ...prev, website_url: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" type="date" value={form.reminder_date} onChange={(e) => setForm((prev) => ({ ...prev, reminder_date: e.target.value }))} />
            <input className="border rounded-lg px-3 py-2" placeholder="Linked listing ID (optional)" value={form.linked_listing_id} onChange={(e) => setForm((prev) => ({ ...prev, linked_listing_id: e.target.value }))} />
            <label className="md:col-span-2 inline-flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={form.premium_interest} onChange={(e) => setForm((prev) => ({ ...prev, premium_interest: e.target.checked }))} />
              Premium listing / sponsorship interest
            </label>
            <textarea className="border rounded-lg px-3 py-2 md:col-span-2 min-h-[100px]" placeholder="Notes" value={form.notes} onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))} />
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" disabled={saving} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-60">
                {saving ? "Saving..." : "Create Contact"}
              </button>
            </div>
          </form>
        </section>

        <section className="border rounded-xl p-4">
          <div className="flex flex-wrap gap-3 mb-4">
            <input
              className="border rounded-lg px-3 py-2 min-w-[220px]"
              placeholder="Search business, contact, email, phone, IG, notes"
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
            <select className="border rounded-lg px-3 py-2" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">All business types</option>
              {TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>{labelize(option)}</option>
              ))}
            </select>
            <select className="border rounded-lg px-3 py-2" value={premiumFilter} onChange={(e) => setPremiumFilter(e.target.value)}>
              <option value="">All premium interest</option>
              <option value="true">Premium Interested</option>
              <option value="false">No Premium Interest</option>
            </select>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading outreach contacts...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500">No outreach contacts found.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border rounded-xl p-4 bg-white">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold">{item.business_name}</h2>
                      <p className="text-sm text-slate-600">
                        {item.contact_person || "No contact person"} • {labelize(String(item.business_type || "other"))}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                        item.premium_interest ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-700"
                      }`}>
                        {item.premium_interest ? "Premium Interested" : "Standard"}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                        item.status === "replied"
                          ? "bg-emerald-100 text-emerald-700"
                          : item.status === "follow_up_needed"
                          ? "bg-amber-100 text-amber-700"
                          : item.status === "contacted"
                          ? "bg-blue-100 text-blue-700"
                          : item.status === "closed"
                          ? "bg-slate-200 text-slate-700"
                          : "bg-slate-100 text-slate-700"
                      }`}>
                        {labelize(String(item.status || "not_contacted"))}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 grid md:grid-cols-2 gap-2 text-sm text-slate-700">
                    <p><strong>Phone:</strong> {item.phone || "—"}</p>
                    <p><strong>Email:</strong> {item.email || "—"}</p>
                    <p><strong>Instagram:</strong> {item.instagram || "—"}</p>
                    <p className="break-all"><strong>Website:</strong> {item.website_url || "—"}</p>
                    <p><strong>Reminder date:</strong> {item.reminder_date || "—"}</p>
                    <p><strong>Linked listing ID:</strong> {item.linked_listing_id || "—"}</p>
                    <p><strong>Updated:</strong> {new Date(item.updated_at).toLocaleString()}</p>
                  </div>

                  <div className="mt-4 grid md:grid-cols-[220px_220px_1fr] gap-3 items-start">
                    <select
                      className="border rounded-lg px-3 py-2"
                      value={item.status}
                      onChange={(e) => updateContact(item.id, { status: e.target.value })}
                      disabled={activeId === item.id}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>{labelize(option)}</option>
                      ))}
                    </select>

                    <label className="inline-flex items-center gap-2 text-sm text-slate-700 border rounded-lg px-3 py-2">
                      <input
                        type="checkbox"
                        checked={item.premium_interest}
                        onChange={(e) => updateContact(item.id, { premium_interest: e.target.checked })}
                        disabled={activeId === item.id}
                      />
                      Premium interest
                    </label>

                    <div className="space-y-2">
                      <textarea
                        className="w-full border rounded-lg px-3 py-2 min-h-[90px]"
                        placeholder="Notes"
                        value={notesDraft[item.id] || ""}
                        onChange={(e) => setNotesDraft((prev) => ({ ...prev, [item.id]: e.target.value }))}
                      />
                      <div className="flex flex-wrap gap-2 justify-end">
                        <button
                          onClick={() => updateContact(item.id, { notes: notesDraft[item.id] || "" })}
                          disabled={activeId === item.id}
                          className="text-sm border border-slate-300 px-3 py-2 rounded-lg hover:bg-slate-50 disabled:opacity-60"
                        >
                          {activeId === item.id ? "Saving..." : "Save Notes"}
                        </button>
                        <button
                          onClick={() => updateContact(item.id, { status: "follow_up_needed", notes: notesDraft[item.id] || "" })}
                          disabled={activeId === item.id}
                          className="text-sm bg-black text-white px-3 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-60"
                        >
                          Mark Follow-up Needed
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
    </AdminSubpageShell>
  );
}

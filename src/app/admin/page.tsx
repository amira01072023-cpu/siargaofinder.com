"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Home, ArrowRight, RefreshCcw } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

type Submission = { id: number; business_name: string; status: string; created_at: string };
type Claim = { id: number; listing_id: number; claimant_name: string; status: string; created_at: string };
type DataRequest = { id: number; full_name: string; request_type: string; status: string; created_at: string };
type Lead = { id: number; full_name: string | null; status: string; created_at: string };
type ContentItem = { id: number; title: string; status: string; created_at: string };
type OutreachContact = { id: number; business_name: string; status: string; premium_interest: boolean; created_at: string };
type ListingWorkflow = { id: number; business_name: string; listing_status: string | null; is_duplicate_flagged: boolean | null; created_at?: string };

type PanelErrors = {
  submissions?: string;
  claims?: string;
  requests?: string;
  leads?: string;
  content?: string;
  outreach?: string;
  listings?: string;
  visits?: string;
};

type ModuleCardProps = {
  href: string;
  title: string;
  description: string;
  totalLabel: string;
  totalValue: number | string;
};

function safeParse<T>(raw: string): T {
  try {
    return raw ? (JSON.parse(raw) as T) : ({} as T);
  } catch {
    return {} as T;
  }
}

function ModuleCard({ href, title, description, totalLabel, totalValue }: ModuleCardProps) {
  return (
    <Link href={href} className="group border rounded-xl p-4 bg-white hover:bg-slate-50 transition shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        </div>
        <ArrowRight size={16} className="text-slate-400 group-hover:text-slate-700 transition mt-1" />
      </div>
      <p className="text-xs text-slate-500 mt-3">{totalLabel}</p>
      <p className="text-lg font-semibold text-slate-900 mt-1">{totalValue}</p>
    </Link>
  );
}

export default function AdminDashboardPage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [panelErrors, setPanelErrors] = useState<PanelErrors>({});
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [requests, setRequests] = useState<DataRequest[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [outreachContacts, setOutreachContacts] = useState<OutreachContact[]>([]);
  const [listingWorkflows, setListingWorkflows] = useState<ListingWorkflow[]>([]);
  const [siteVisits, setSiteVisits] = useState(0);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  const load = async () => {
    try {
      setLoading(true);
      setMsg("");
      setPanelErrors({});

      const [sRes, cRes, dRes, lRes, contentRes, outreachRes, listingsRes, vRes] = await Promise.all([
        fetch("/api/admin/submissions", { cache: "no-store" }),
        fetch("/api/admin/claims", { cache: "no-store" }),
        fetch("/api/admin/data-requests", { cache: "no-store" }),
        fetch("/api/admin/leads", { cache: "no-store" }),
        fetch("/api/admin/content", { cache: "no-store" }),
        fetch("/api/admin/outreach", { cache: "no-store" }),
        fetch("/api/admin/listings", { cache: "no-store" }),
        fetch("/api/site-visits", { cache: "no-store" }),
      ]);

      const [sRaw, cRaw, dRaw, lRaw, contentRaw, outreachRaw, listingsRaw, vRaw] = await Promise.all([
        sRes.text(),
        cRes.text(),
        dRes.text(),
        lRes.text(),
        contentRes.text(),
        outreachRes.text(),
        listingsRes.text(),
        vRes.text(),
      ]);

      const sData = safeParse<{ error?: string; items?: Submission[] }>(sRaw);
      const cData = safeParse<{ error?: string; items?: Claim[] }>(cRaw);
      const dData = safeParse<{ error?: string; details?: string; items?: DataRequest[] }>(dRaw);
      const lData = safeParse<{ error?: string; items?: Lead[] }>(lRaw);
      const contentData = safeParse<{ error?: string; items?: ContentItem[] }>(contentRaw);
      const outreachData = safeParse<{ error?: string; items?: OutreachContact[] }>(outreachRaw);
      const listingsData = safeParse<{ error?: string; items?: ListingWorkflow[] }>(listingsRaw);
      const vData = safeParse<{ error?: string; total?: number }>(vRaw);

      const nextErrors: PanelErrors = {};

      if (sRes.ok) {
        setSubmissions(sData.items || []);
      } else {
        setSubmissions([]);
        nextErrors.submissions = sData.error || `Failed (${sRes.status})`;
      }

      if (cRes.ok) {
        setClaims(cData.items || []);
      } else {
        setClaims([]);
        nextErrors.claims = cData.error || `Failed (${cRes.status})`;
      }

      if (dRes.ok) {
        setRequests(dData.items || []);
      } else {
        setRequests([]);
        nextErrors.requests = dData.error || dData.details || `Failed (${dRes.status})`;
      }

      if (lRes.ok) {
        setLeads(lData.items || []);
      } else {
        setLeads([]);
        nextErrors.leads = lData.error || `Failed (${lRes.status})`;
      }

      if (contentRes.ok) {
        setContentItems(contentData.items || []);
      } else {
        setContentItems([]);
        nextErrors.content = contentData.error || `Failed (${contentRes.status})`;
      }

      if (outreachRes.ok) {
        setOutreachContacts(outreachData.items || []);
      } else {
        setOutreachContacts([]);
        nextErrors.outreach = outreachData.error || `Failed (${outreachRes.status})`;
      }

      if (listingsRes.ok) {
        setListingWorkflows(listingsData.items || []);
      } else {
        setListingWorkflows([]);
        nextErrors.listings = listingsData.error || `Failed (${listingsRes.status})`;
      }

      if (vRes.ok) {
        setSiteVisits(vData.total || 0);
      } else {
        setSiteVisits(0);
        nextErrors.visits = vData.error || `Failed (${vRes.status})`;
      }

      const hasAnyFailure = !sRes.ok || !cRes.ok || !dRes.ok || !lRes.ok || !contentRes.ok || !outreachRes.ok || !listingsRes.ok || !vRes.ok;
      if (hasAnyFailure) {
        setMsg("Some admin panels could not be loaded. Available data is shown below.");
      }

      setPanelErrors(nextErrors);
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => void load(), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    const submissionPending = submissions.filter((x) => x.status === "pending").length;
    const claimPending = claims.filter((x) => x.status === "pending").length;
    const requestOpen = requests.filter((x) => x.status === "pending" || x.status === "in_progress").length;
    const leadOpen = leads.filter((x) => x.status !== "closed").length;
    const contentInProgress = contentItems.filter((x) => x.status !== "published").length;
    const outreachFollowUps = outreachContacts.filter((x) => x.status === "follow_up_needed").length;
    const listingsNeedingReview = listingWorkflows.filter((x) => x.listing_status === "needs_review").length;

    return {
      submissionPending,
      claimPending,
      requestOpen,
      leadOpen,
      contentInProgress,
      outreachFollowUps,
      listingsNeedingReview,
      totalSubmissions: submissions.length,
      totalClaims: claims.length,
      totalRequests: requests.length,
      totalLeads: leads.length,
      totalContentItems: contentItems.length,
      totalOutreachContacts: outreachContacts.length,
      totalListings: listingWorkflows.length,
    };
  }, [submissions, claims, requests, leads, contentItems, outreachContacts, listingWorkflows]);

  const chartRows = useMemo(() => {
    const countByStatus = (arr: { status: string }[]) =>
      arr.reduce(
        (acc, cur) => {
          const s = (cur.status || "unknown").toLowerCase();
          acc[s] = (acc[s] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

    const s = countByStatus(submissions);
    const c = countByStatus(claims);
    const d = countByStatus(requests);

    return [
      {
        label: "Submissions",
        total: submissions.length,
        pending: s.pending || 0,
        in_progress: s.in_progress || 0,
        completed: s.completed || s.approved || 0,
        rejected: s.rejected || 0,
      },
      {
        label: "Claims",
        total: claims.length,
        pending: c.pending || 0,
        in_progress: c.in_progress || 0,
        completed: c.completed || c.approved || 0,
        rejected: c.rejected || 0,
      },
      {
        label: "Data Requests",
        total: requests.length,
        pending: d.pending || 0,
        in_progress: d.in_progress || 0,
        completed: d.completed || d.approved || 0,
        rejected: d.rejected || 0,
      },
    ];
  }, [submissions, claims, requests]);

  const widthPct = (value: number, total: number) => {
    if (!total) return 0;
    return Math.round((value / total) * 100);
  };

  const priorityQueue = [
    { label: "Pending submissions", value: stats.submissionPending, href: "/admin/submissions" },
    { label: "Pending claims", value: stats.claimPending, href: "/admin/claims" },
    { label: "Open data requests", value: stats.requestOpen, href: "/admin/data-requests" },
    { label: "Open leads", value: stats.leadOpen, href: "/admin/leads" },
    { label: "Outreach follow-ups", value: stats.outreachFollowUps, href: "/admin/outreach" },
    { label: "Listings needing review", value: stats.listingsNeedingReview, href: "/admin/listings" },
  ].filter((item) => item.value > 0);

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
              href="/"
              className="inline-flex items-center gap-2 bg-yellow-400 text-black border border-yellow-500 text-sm px-4 py-2 rounded-lg hover:bg-yellow-300 transition font-semibold"
            >
              <Home size={16} />
              Home
            </Link>
            <button onClick={signOut} className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <section className="p-6">
        <div className="max-w-6xl mx-auto space-y-6 mt-8">
          <section className="bg-white border rounded-2xl p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Admin Command Center</p>
                <h1 className="text-3xl font-bold text-slate-900 mt-1">Overview</h1>
                <p className="text-sm text-slate-600 mt-2 max-w-3xl">
                  Monitor the health of SiargaoFinder operations, jump into active work fast, and keep listings,
                  leads, content, and outreach moving.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/admin/manual" className="text-sm border border-slate-300 px-3 py-2 rounded-lg hover:bg-slate-50">
                  User Manual
                </Link>
                <button onClick={load} className="inline-flex items-center gap-2 text-sm border border-slate-300 px-3 py-2 rounded-lg hover:bg-slate-50">
                  <RefreshCcw size={14} />
                  Refresh
                </button>
              </div>
            </div>

            {msg && <p className="mb-4 text-sm text-amber-700">{msg}</p>}

            <div className="grid md:grid-cols-[1.7fr_1fr] gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                <div className="border rounded-xl p-4 bg-yellow-50 border-amber-200">
                  <p className="text-xs text-amber-700">Pending Submissions</p>
                  <p className="text-2xl font-bold">{loading ? "..." : stats.submissionPending}</p>
                </div>
                <div className="border rounded-xl p-4 bg-yellow-100 border-yellow-500/40">
                  <p className="text-xs text-yellow-900">Pending Claims</p>
                  <p className="text-2xl font-bold">{loading ? "..." : stats.claimPending}</p>
                </div>
                <div className="border rounded-xl p-4 bg-indigo-50 border-indigo-200">
                  <p className="text-xs text-indigo-700">Open Data Requests</p>
                  <p className="text-2xl font-bold">{loading ? "..." : stats.requestOpen}</p>
                </div>
                <div className="border rounded-xl p-4 bg-emerald-50 border-emerald-200">
                  <p className="text-xs text-emerald-700">Site Visits</p>
                  <p className="text-2xl font-bold">{loading ? "..." : siteVisits}</p>
                  {panelErrors.visits && <p className="mt-1 text-xs text-red-600">{panelErrors.visits}</p>}
                </div>
                <div className="border rounded-xl p-4 bg-sky-50 border-sky-200">
                  <p className="text-xs text-sky-700">Open Leads</p>
                  <p className="text-2xl font-bold">{loading ? "..." : stats.leadOpen}</p>
                  {panelErrors.leads && <p className="mt-1 text-xs text-red-600">{panelErrors.leads}</p>}
                </div>
                <div className="border rounded-xl p-4 bg-violet-50 border-violet-200">
                  <p className="text-xs text-violet-700">Content In Progress</p>
                  <p className="text-2xl font-bold">{loading ? "..." : stats.contentInProgress}</p>
                  {panelErrors.content && <p className="mt-1 text-xs text-red-600">{panelErrors.content}</p>}
                </div>
                <div className="border rounded-xl p-4 bg-rose-50 border-rose-200">
                  <p className="text-xs text-rose-700">Outreach Follow-ups</p>
                  <p className="text-2xl font-bold">{loading ? "..." : stats.outreachFollowUps}</p>
                  {panelErrors.outreach && <p className="mt-1 text-xs text-red-600">{panelErrors.outreach}</p>}
                </div>
                <div className="border rounded-xl p-4 bg-orange-50 border-orange-200">
                  <p className="text-xs text-orange-700">Listings Needing Review</p>
                  <p className="text-2xl font-bold">{loading ? "..." : stats.listingsNeedingReview}</p>
                  {panelErrors.listings && <p className="mt-1 text-xs text-red-600">{panelErrors.listings}</p>}
                </div>
              </div>

              <div className="border rounded-2xl p-5 bg-slate-50">
                <h2 className="font-semibold text-slate-900 mb-3">Priority Queue</h2>
                {priorityQueue.length === 0 ? (
                  <p className="text-sm text-slate-500">No urgent open items right now.</p>
                ) : (
                  <div className="space-y-2">
                    {priorityQueue.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center justify-between gap-3 border rounded-lg px-3 py-3 bg-white hover:bg-slate-50 transition"
                      >
                        <span className="text-sm text-slate-700">{item.label}</span>
                        <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="bg-white border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Modules</h2>
                <p className="text-sm text-slate-600 mt-1">Open the right admin area quickly and see how much work is inside each one.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              <ModuleCard href="/admin/submissions" title="Business Submissions" description="Review and approve or reject submitted listings." totalLabel="Total submissions" totalValue={stats.totalSubmissions} />
              <ModuleCard href="/admin/claims" title="Listing Claims" description="Validate ownership claim requests from businesses." totalLabel="Total claims" totalValue={stats.totalClaims} />
              <ModuleCard href="/admin/data-requests" title="Data Rights Requests" description="Handle privacy access, deletion, and portability requests." totalLabel="Total requests" totalValue={stats.totalRequests} />
              <ModuleCard href="/admin/leads" title="Leads" description="Track inbound inquiries and update sales or follow-up status." totalLabel="Total leads" totalValue={stats.totalLeads} />
              <ModuleCard href="/admin/content" title="Content" description="Manage content ideas, priorities, and publishing progress." totalLabel="Total content items" totalValue={stats.totalContentItems} />
              <ModuleCard href="/admin/outreach" title="Outreach" description="Track business contacts, replies, reminders, and premium interest." totalLabel="Total outreach contacts" totalValue={stats.totalOutreachContacts} />
              <ModuleCard href="/admin/listings" title="Listings Workflow" description="Manage listing review, featured state, duplicate flags, and claims." totalLabel="Total listings in workflow" totalValue={stats.totalListings} />
              <ModuleCard href="/admin/manual" title="User Manual" description="Open the in-app training guide and internal SOP reference." totalLabel="Reference" totalValue="Help Center" />
            </div>
          </section>

          <section className="bg-white border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Workflow Graphs</h2>
            <div className="space-y-4">
              {chartRows.map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">{row.label}</span>
                    <span className="text-slate-500">Total: {row.total}</span>
                  </div>
                  <div className="w-full h-4 rounded-full overflow-hidden bg-slate-100 flex">
                    <div title="Pending" className="bg-yellow-400" style={{ width: `${widthPct(row.pending, row.total)}%` }} />
                    <div title="In Progress" className="bg-indigo-400" style={{ width: `${widthPct(row.in_progress, row.total)}%` }} />
                    <div title="Completed" className="bg-green-500" style={{ width: `${widthPct(row.completed, row.total)}%` }} />
                    <div title="Rejected" className="bg-red-400" style={{ width: `${widthPct(row.rejected, row.total)}%` }} />
                  </div>
                  <div className="mt-1 text-xs text-slate-600 flex flex-wrap gap-3">
                    <span>🟨 Pending: {row.pending}</span>
                    <span>🟦 In Progress: {row.in_progress}</span>
                    <span>🟩 Completed: {row.completed}</span>
                    <span>🟥 Rejected: {row.rejected}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>
                <p className="text-sm text-slate-600 mt-1">A quick view of the latest items across the main admin modules.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="border rounded-xl p-4">
                <h3 className="font-semibold mb-2">Latest Submissions</h3>
                {panelErrors.submissions && <p className="text-xs text-red-600 mb-2">{panelErrors.submissions}</p>}
                <ul className="text-sm space-y-1 text-slate-700">
                  {submissions.slice(0, 5).map((s) => (
                    <li key={s.id}>#{s.id} · {s.business_name} · {s.status}</li>
                  ))}
                  {!submissions.length && <li className="text-slate-500">No records.</li>}
                </ul>
              </div>

              <div className="border rounded-xl p-4">
                <h3 className="font-semibold mb-2">Latest Claims</h3>
                {panelErrors.claims && <p className="text-xs text-red-600 mb-2">{panelErrors.claims}</p>}
                <ul className="text-sm space-y-1 text-slate-700">
                  {claims.slice(0, 5).map((c) => (
                    <li key={c.id}>#{c.id} · Listing {c.listing_id} · {c.status}</li>
                  ))}
                  {!claims.length && <li className="text-slate-500">No records.</li>}
                </ul>
              </div>

              <div className="border rounded-xl p-4">
                <h3 className="font-semibold mb-2">Latest Data Requests</h3>
                {panelErrors.requests && <p className="text-xs text-red-600 mb-2">{panelErrors.requests}</p>}
                <ul className="text-sm space-y-1 text-slate-700">
                  {requests.slice(0, 5).map((r) => (
                    <li key={r.id}>#{r.id} · {r.full_name} · {r.status}</li>
                  ))}
                  {!requests.length && <li className="text-slate-500">No records.</li>}
                </ul>
              </div>

              <div className="border rounded-xl p-4">
                <h3 className="font-semibold mb-2">Latest Leads</h3>
                {panelErrors.leads && <p className="text-xs text-red-600 mb-2">{panelErrors.leads}</p>}
                <ul className="text-sm space-y-1 text-slate-700">
                  {leads.slice(0, 5).map((lead) => (
                    <li key={lead.id}>#{lead.id} · {lead.full_name || "Unnamed lead"} · {lead.status}</li>
                  ))}
                  {!leads.length && <li className="text-slate-500">No records.</li>}
                </ul>
              </div>

              <div className="border rounded-xl p-4">
                <h3 className="font-semibold mb-2">Latest Content</h3>
                {panelErrors.content && <p className="text-xs text-red-600 mb-2">{panelErrors.content}</p>}
                <ul className="text-sm space-y-1 text-slate-700">
                  {contentItems.slice(0, 5).map((item) => (
                    <li key={item.id}>#{item.id} · {item.title} · {item.status}</li>
                  ))}
                  {!contentItems.length && <li className="text-slate-500">No records.</li>}
                </ul>
              </div>

              <div className="border rounded-xl p-4">
                <h3 className="font-semibold mb-2">Latest Outreach</h3>
                {panelErrors.outreach && <p className="text-xs text-red-600 mb-2">{panelErrors.outreach}</p>}
                <ul className="text-sm space-y-1 text-slate-700">
                  {outreachContacts.slice(0, 5).map((item) => (
                    <li key={item.id}>#{item.id} · {item.business_name} · {item.status}</li>
                  ))}
                  {!outreachContacts.length && <li className="text-slate-500">No records.</li>}
                </ul>
              </div>

              <div className="border rounded-xl p-4">
                <h3 className="font-semibold mb-2">Latest Listings Review</h3>
                {panelErrors.listings && <p className="text-xs text-red-600 mb-2">{panelErrors.listings}</p>}
                <ul className="text-sm space-y-1 text-slate-700">
                  {listingWorkflows.slice(0, 5).map((item) => (
                    <li key={item.id}>#{item.id} · {item.business_name} · {item.listing_status || "published"}</li>
                  ))}
                  {!listingWorkflows.length && <li className="text-slate-500">No records.</li>}
                </ul>
              </div>

              <div className="border rounded-xl p-4 bg-slate-50 border-dashed">
                <h3 className="font-semibold mb-2">Quick Admin Help</h3>
                <p className="text-sm text-slate-600 mb-3">
                  Need a refresher on how the modules should be used day to day?
                </p>
                <Link href="/admin/manual" className="inline-flex items-center gap-2 text-sm border border-slate-300 px-3 py-2 rounded-lg hover:bg-white">
                  Open User Manual
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

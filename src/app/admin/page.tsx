"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Building2,
  ClipboardList,
  Eye,
  FileText,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  Megaphone,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
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
  icon: LucideIcon;
  accent: string;
};

type MetricCardProps = {
  label: string;
  value: number | string;
  detail: string;
  icon: LucideIcon;
  accent: string;
  error?: string;
};

function safeParse<T>(raw: string): T {
  try {
    return raw ? (JSON.parse(raw) as T) : ({} as T);
  } catch {
    return {} as T;
  }
}

function MetricCard({ label, value, detail, icon: Icon, accent, error }: MetricCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] p-4 shadow-[0_18px_60px_-35px_rgba(0,0,0,0.8)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.1]">
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent}`} />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">{value}</p>
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.08] text-amber-200 shadow-inner shadow-white/5">
          <Icon size={18} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-400">{detail}</p>
      {error && <p className="mt-2 text-xs text-rose-300">{error}</p>}
    </div>
  );
}

function ModuleCard({ href, title, description, totalLabel, totalValue, icon: Icon, accent }: ModuleCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-amber-200/25 hover:bg-white/[0.09] hover:shadow-[0_24px_70px_-35px_rgba(245,158,11,0.55)]"
    >
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent}`} />
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-slate-950/30 text-amber-200 transition group-hover:scale-105 group-hover:bg-amber-300/10">
          <Icon size={19} aria-hidden="true" />
        </span>
        <ArrowUpRight size={17} className="mt-1 text-slate-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-200" aria-hidden="true" />
      </div>
      <h2 className="mt-5 font-semibold text-white">{title}</h2>
      <p className="mt-1.5 min-h-10 text-sm leading-5 text-slate-400">{description}</p>
      <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/[0.08] pt-4">
        <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">{totalLabel}</p>
        <p className="text-lg font-semibold text-slate-100">{totalValue}</p>
      </div>
    </Link>
  );
}

export default function AdminDashboardPage() {
  const supabase = createClient();
  const router = useRouter();

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
    router.push("/auth");
    router.refresh();
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

  const navigation = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/submissions", label: "Submissions", icon: Inbox },
    { href: "/admin/claims", label: "Claims", icon: BadgeCheck },
    { href: "/admin/data-requests", label: "Data requests", icon: ShieldCheck },
    { href: "/admin/leads", label: "Leads", icon: Users },
    { href: "/admin/content", label: "Content", icon: FileText },
    { href: "/admin/outreach", label: "Outreach", icon: Megaphone },
    { href: "/admin/listings", label: "Listings", icon: Building2 },
  ];

  const recentPanels = [
    {
      title: "Submissions",
      href: "/admin/submissions",
      error: panelErrors.submissions,
      items: submissions.slice(0, 4).map((item) => ({
        id: `submission-${item.id}`,
        label: item.business_name,
        meta: `#${item.id}`,
        status: item.status,
      })),
    },
    {
      title: "Claims",
      href: "/admin/claims",
      error: panelErrors.claims,
      items: claims.slice(0, 4).map((item) => ({
        id: `claim-${item.id}`,
        label: `Listing ${item.listing_id}`,
        meta: `#${item.id}`,
        status: item.status,
      })),
    },
    {
      title: "Data requests",
      href: "/admin/data-requests",
      error: panelErrors.requests,
      items: requests.slice(0, 4).map((item) => ({
        id: `request-${item.id}`,
        label: item.full_name,
        meta: `#${item.id}`,
        status: item.status,
      })),
    },
    {
      title: "Leads",
      href: "/admin/leads",
      error: panelErrors.leads,
      items: leads.slice(0, 4).map((item) => ({
        id: `lead-${item.id}`,
        label: item.full_name || "Unnamed lead",
        meta: `#${item.id}`,
        status: item.status,
      })),
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06100f] text-slate-100 antialiased">
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-24 size-[28rem] rounded-full bg-emerald-500/[0.12] blur-[120px]" />
        <div className="absolute right-[-10rem] top-[-4rem] size-[32rem] rounded-full bg-amber-300/[0.11] blur-[130px]" />
        <div className="absolute bottom-[-15rem] left-[30%] size-[38rem] rounded-full bg-cyan-400/[0.08] blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#06100f]/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl border border-amber-200/20 bg-gradient-to-br from-amber-200/20 to-emerald-400/10 text-amber-200 shadow-[0_10px_30px_-12px_rgba(251,191,36,.8)]">
              <Search size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate font-semibold tracking-[-0.02em] text-white">SiargaoFinder</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-200/65">Admin workspace · v2</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/[0.1] hover:text-white">
              <Home size={15} aria-hidden="true" />
              <span className="hidden sm:inline">View site</span>
            </Link>
            <button onClick={signOut} className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 text-sm text-slate-300 transition hover:border-rose-300/25 hover:bg-rose-300/10 hover:text-rose-100">
              <LogOut size={15} aria-hidden="true" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-[1500px] lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden border-r border-white/[0.07] px-4 py-8 lg:flex lg:min-h-[calc(100vh-65px)] lg:flex-col lg:px-5">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Workspace</p>
          <nav className="mt-4 space-y-1" aria-label="Admin navigation">
            {navigation.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                aria-current={href === "/admin" ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${href === "/admin" ? "border border-amber-200/15 bg-amber-200/[0.09] text-amber-100 shadow-inner shadow-amber-100/5" : "border border-transparent text-slate-400 hover:border-white/[0.06] hover:bg-white/[0.05] hover:text-slate-100"}`}
              >
                <Icon size={17} aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-emerald-200">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-50 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
              </span>
              <span className="text-xs font-medium">Operations online</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">Protected workspace for directory review and operations.</p>
            <Link href="/admin/manual" className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-amber-200 transition hover:text-amber-100">
              <BookOpen size={14} aria-hidden="true" />
              Open admin manual
            </Link>
          </div>
        </aside>

        <section className="min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <nav className="mb-5 flex gap-2 overflow-x-auto pb-2 lg:hidden" aria-label="Admin navigation">
            {navigation.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs transition ${href === "/admin" ? "border-amber-200/20 bg-amber-200/10 text-amber-100" : "border-white/10 bg-white/[0.05] text-slate-400"}`}>
                <Icon size={14} aria-hidden="true" />
                {label}
              </Link>
            ))}
          </nav>

          <section className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_35px_100px_-55px_rgba(16,185,129,.65)] backdrop-blur-2xl sm:p-8">
            <div className="absolute -right-16 -top-20 size-64 rounded-full bg-amber-200/[0.1] blur-3xl" aria-hidden="true" />
            <div className="relative flex flex-col justify-between gap-6 xl:flex-row xl:items-end">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/15 bg-emerald-300/[0.08] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-200">
                  <Sparkles size={13} aria-hidden="true" />
                  Glassy dashboard v2
                </div>
                <h1 className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">Good to see you, admin.</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                  Keep SiargaoFinder accurate and moving. Review urgent work, monitor workflows, and jump into the right operation from one place.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/admin/manual" className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.1]">
                  <BookOpen size={16} aria-hidden="true" />
                  Manual
                </Link>
                <button onClick={load} disabled={loading} className="inline-flex h-11 items-center gap-2 rounded-xl border border-amber-100/20 bg-amber-200 px-4 text-sm font-semibold text-[#17201d] shadow-[0_14px_38px_-18px_rgba(251,191,36,.9)] transition hover:bg-amber-100 disabled:cursor-wait disabled:opacity-70">
                  <RefreshCcw size={16} className={loading ? "animate-spin motion-reduce:animate-none" : ""} aria-hidden="true" />
                  {loading ? "Syncing" : "Refresh data"}
                </button>
              </div>
            </div>
          </section>

          {msg && (
            <div role="status" className="mt-5 rounded-2xl border border-amber-200/20 bg-amber-200/[0.08] px-4 py-3 text-sm text-amber-100 backdrop-blur-xl">
              {msg}
            </div>
          )}

          <section className="mt-6" aria-labelledby="dashboard-metrics">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-200/60">Live overview</p>
                <h2 id="dashboard-metrics" className="mt-1 text-xl font-semibold tracking-[-0.025em] text-white">Operational pulse</h2>
              </div>
              <span className="hidden items-center gap-2 text-xs text-slate-500 sm:flex"><Activity size={14} aria-hidden="true" /> Current workspace totals</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard label="Pending submissions" value={loading ? "—" : stats.submissionPending} detail="Waiting for business review" icon={Inbox} accent="from-transparent via-amber-300/80 to-transparent" />
              <MetricCard label="Pending claims" value={loading ? "—" : stats.claimPending} detail="Ownership checks required" icon={BadgeCheck} accent="from-transparent via-yellow-200/70 to-transparent" />
              <MetricCard label="Open data requests" value={loading ? "—" : stats.requestOpen} detail="Privacy tasks still active" icon={ShieldCheck} accent="from-transparent via-cyan-300/70 to-transparent" />
              <MetricCard label="Site visits" value={loading ? "—" : siteVisits.toLocaleString()} detail="Tracked directory visits" icon={Eye} accent="from-transparent via-emerald-300/70 to-transparent" error={panelErrors.visits} />
              <MetricCard label="Open leads" value={loading ? "—" : stats.leadOpen} detail="Conversations to progress" icon={Users} accent="from-transparent via-sky-300/70 to-transparent" error={panelErrors.leads} />
              <MetricCard label="Content in progress" value={loading ? "—" : stats.contentInProgress} detail="Items not yet published" icon={FileText} accent="from-transparent via-violet-300/70 to-transparent" error={panelErrors.content} />
              <MetricCard label="Outreach follow-ups" value={loading ? "—" : stats.outreachFollowUps} detail="Contacts needing action" icon={Megaphone} accent="from-transparent via-rose-300/70 to-transparent" error={panelErrors.outreach} />
              <MetricCard label="Listings to review" value={loading ? "—" : stats.listingsNeedingReview} detail="Workflow flags unresolved" icon={Building2} accent="from-transparent via-orange-300/70 to-transparent" error={panelErrors.listings} />
            </div>
          </section>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,.75fr)]">
            <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl sm:p-6" aria-labelledby="workflow-title">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Status distribution</p>
                  <h2 id="workflow-title" className="mt-1 text-lg font-semibold text-white">Workflow health</h2>
                </div>
                <ClipboardList size={19} className="text-emerald-200/70" aria-hidden="true" />
              </div>
              <div className="mt-6 space-y-6">
                {chartRows.map((row) => (
                  <div key={row.label}>
                    <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-slate-200">{row.label}</span>
                      <span className="text-xs text-slate-500">{row.total} total</span>
                    </div>
                    <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-black/25 shadow-inner" aria-label={`${row.label} status distribution`}>
                      <div title={`Pending: ${row.pending}`} className="bg-amber-300" style={{ width: `${widthPct(row.pending, row.total)}%` }} />
                      <div title={`In progress: ${row.in_progress}`} className="bg-cyan-300" style={{ width: `${widthPct(row.in_progress, row.total)}%` }} />
                      <div title={`Completed: ${row.completed}`} className="bg-emerald-400" style={{ width: `${widthPct(row.completed, row.total)}%` }} />
                      <div title={`Rejected: ${row.rejected}`} className="bg-rose-400" style={{ width: `${widthPct(row.rejected, row.total)}%` }} />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500">
                      <span><i className="mr-1.5 inline-block size-1.5 rounded-full bg-amber-300" />Pending {row.pending}</span>
                      <span><i className="mr-1.5 inline-block size-1.5 rounded-full bg-cyan-300" />In progress {row.in_progress}</span>
                      <span><i className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-400" />Completed {row.completed}</span>
                      <span><i className="mr-1.5 inline-block size-1.5 rounded-full bg-rose-400" />Rejected {row.rejected}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl sm:p-6" aria-labelledby="priority-title">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Action needed</p>
                  <h2 id="priority-title" className="mt-1 text-lg font-semibold text-white">Priority queue</h2>
                </div>
                <span className="rounded-full border border-amber-200/15 bg-amber-200/[0.08] px-2.5 py-1 text-xs font-medium text-amber-100">{priorityQueue.length}</span>
              </div>
              {priorityQueue.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-emerald-200/20 bg-emerald-300/[0.06] p-5 text-center">
                  <BadgeCheck className="mx-auto text-emerald-200" size={24} aria-hidden="true" />
                  <p className="mt-2 text-sm font-medium text-emerald-100">Queue is clear</p>
                  <p className="mt-1 text-xs text-slate-500">No urgent open items right now.</p>
                </div>
              ) : (
                <div className="mt-5 space-y-2">
                  {priorityQueue.map((item) => (
                    <Link key={item.label} href={item.href} className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-black/[0.12] px-3 py-3 transition hover:border-amber-200/15 hover:bg-amber-200/[0.06]">
                      <span className="text-sm text-slate-300 transition group-hover:text-white">{item.label}</span>
                      <span className="grid min-w-7 place-items-center rounded-lg bg-white/[0.07] px-2 py-1 text-xs font-semibold text-amber-100">{item.value}</span>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>

          <section className="mt-6" aria-labelledby="modules-title">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-200/60">Quick access</p>
                <h2 id="modules-title" className="mt-1 text-xl font-semibold tracking-[-0.025em] text-white">Operations</h2>
              </div>
              <p className="hidden text-xs text-slate-500 sm:block">Open a module to review and update records</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
              <ModuleCard href="/admin/submissions" title="Business Submissions" description="Review and approve or reject submitted listings." totalLabel="Total submissions" totalValue={stats.totalSubmissions} icon={Inbox} accent="from-transparent via-amber-300/70 to-transparent" />
              <ModuleCard href="/admin/claims" title="Listing Claims" description="Validate ownership claim requests from businesses." totalLabel="Total claims" totalValue={stats.totalClaims} icon={BadgeCheck} accent="from-transparent via-yellow-200/70 to-transparent" />
              <ModuleCard href="/admin/data-requests" title="Data Rights Requests" description="Handle privacy access, deletion, and portability requests." totalLabel="Total requests" totalValue={stats.totalRequests} icon={ShieldCheck} accent="from-transparent via-cyan-300/70 to-transparent" />
              <ModuleCard href="/admin/leads" title="Leads" description="Track inbound inquiries and update follow-up status." totalLabel="Total leads" totalValue={stats.totalLeads} icon={Users} accent="from-transparent via-sky-300/70 to-transparent" />
              <ModuleCard href="/admin/content" title="Content" description="Manage content ideas, priorities, and publishing progress." totalLabel="Total content items" totalValue={stats.totalContentItems} icon={FileText} accent="from-transparent via-violet-300/70 to-transparent" />
              <ModuleCard href="/admin/outreach" title="Outreach" description="Track contacts, replies, reminders, and premium interest." totalLabel="Total contacts" totalValue={stats.totalOutreachContacts} icon={Megaphone} accent="from-transparent via-rose-300/70 to-transparent" />
              <ModuleCard href="/admin/listings" title="Listings Workflow" description="Manage review state, duplicate flags, and claims." totalLabel="Total listings" totalValue={stats.totalListings} icon={Building2} accent="from-transparent via-orange-300/70 to-transparent" />
              <ModuleCard href="/admin/manual" title="User Manual" description="Open the training guide and internal operating reference." totalLabel="Reference" totalValue="Help Center" icon={BookOpen} accent="from-transparent via-emerald-300/70 to-transparent" />
            </div>
          </section>

          <section className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-2xl sm:p-6" aria-labelledby="recent-title">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">Latest records</p>
                <h2 id="recent-title" className="mt-1 text-xl font-semibold tracking-[-0.025em] text-white">Recent activity</h2>
              </div>
              <Activity size={19} className="text-emerald-200/70" aria-hidden="true" />
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
              {recentPanels.map((panel) => (
                <div key={panel.title} className="rounded-2xl border border-white/[0.08] bg-black/[0.12] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-slate-200">{panel.title}</h3>
                    <Link href={panel.href} aria-label={`View all ${panel.title}`} className="text-slate-500 transition hover:text-amber-200">
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                  {panel.error && <p className="mt-3 text-xs text-rose-300">{panel.error}</p>}
                  <ul className="mt-3 space-y-2">
                    {panel.items.map((item) => (
                      <li key={item.id} className="flex items-center justify-between gap-3 border-t border-white/[0.06] pt-2 first:border-0 first:pt-0">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-slate-300">{item.label}</p>
                          <p className="mt-0.5 text-[10px] text-slate-600">{item.meta}</p>
                        </div>
                        <span className="max-w-24 truncate rounded-full border border-white/[0.08] bg-white/[0.05] px-2 py-1 text-[10px] capitalize text-slate-400">{item.status.replaceAll("_", " ")}</span>
                      </li>
                    ))}
                    {!panel.items.length && <li className="py-4 text-center text-xs text-slate-600">No records yet.</li>}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <footer className="mt-6 flex flex-col gap-2 border-t border-white/[0.07] py-5 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>SiargaoFinder admin workspace</p>
            <p>Directory operations · Protected access</p>
          </footer>
        </section>
      </div>
    </main>
  );
}

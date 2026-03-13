"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Home } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import { createClient } from "@/lib/supabase-browser";

type Submission = { id: number; business_name: string; status: string; created_at: string };
type Claim = { id: number; listing_id: number; claimant_name: string; status: string; created_at: string };
type DataRequest = { id: number; full_name: string; request_type: string; status: string; created_at: string };

export default function AdminDashboardPage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [requests, setRequests] = useState<DataRequest[]>([]);

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  const load = async () => {
    try {
      setLoading(true);
      setMsg("");

      const [sRes, cRes, dRes] = await Promise.all([
        fetch("/api/admin/submissions", { cache: "no-store" }),
        fetch("/api/admin/claims", { cache: "no-store" }),
        fetch("/api/admin/data-requests", { cache: "no-store" }),
      ]);

      const [sRaw, cRaw, dRaw] = await Promise.all([sRes.text(), cRes.text(), dRes.text()]);

      const sData: { error?: string; items?: Submission[] } = sRaw ? JSON.parse(sRaw) : {};
      const cData: { error?: string; items?: Claim[] } = cRaw ? JSON.parse(cRaw) : {};
      const dData: { error?: string; details?: string; items?: DataRequest[] } = dRaw ? JSON.parse(dRaw) : {};

      if (!sRes.ok || !cRes.ok || !dRes.ok) {
        setMsg(sData.error || cData.error || dData.error || dData.details || "Failed to load admin data.");
        return;
      }

      setSubmissions(sData.items || []);
      setClaims(cData.items || []);
      setRequests(dData.items || []);
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    const submissionPending = submissions.filter((x) => x.status === "pending").length;
    const claimPending = claims.filter((x) => x.status === "pending").length;
    const requestOpen = requests.filter((x) => x.status === "pending" || x.status === "in_progress").length;

    return {
      submissionPending,
      claimPending,
      requestOpen,
      totalSubmissions: submissions.length,
      totalClaims: claims.length,
      totalRequests: requests.length,
    };
  }, [submissions, claims, requests]);

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
            <button onClick={signOut} className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50">Sign out</button>
          </div>
        </div>
      </header>

      <section className="p-6">
      <div className="max-w-6xl mx-auto bg-white border rounded-xl p-6 mt-8">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-2">
            <button onClick={load} className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50">Refresh</button>
          </div>
        </div>

        {msg && <p className="mb-4 text-sm text-red-600">{msg}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          <div className="border rounded-lg p-4 bg-amber-50 border-amber-200">
            <p className="text-xs text-amber-700">Pending Submissions</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.submissionPending}</p>
          </div>
          <div className="border rounded-lg p-4 bg-yellow-100 border-yellow-500/40">
            <p className="text-xs text-amber-900">Pending Claims</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.claimPending}</p>
          </div>
          <div className="border rounded-lg p-4 bg-indigo-50 border-indigo-200">
            <p className="text-xs text-indigo-700">Open Data Requests</p>
            <p className="text-2xl font-bold">{loading ? "..." : stats.requestOpen}</p>
          </div>
        </div>

        <section className="border rounded-lg p-4 mb-6">
          <h2 className="font-semibold mb-3">Workflow Graphs</h2>
          <div className="space-y-4">
            {chartRows.map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="font-medium">{row.label}</span>
                  <span className="text-slate-500">Total: {row.total}</span>
                </div>
                <div className="w-full h-4 rounded-full overflow-hidden bg-slate-100 flex">
                  <div title="Pending" className="bg-amber-400" style={{ width: `${widthPct(row.pending, row.total)}%` }} />
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

        <div className="grid md:grid-cols-4 gap-3 mb-6">
          <Link href="/admin/submissions" className="border rounded-lg p-4 hover:bg-slate-50">
            <h2 className="font-semibold">Business Submissions</h2>
            <p className="text-sm text-slate-600 mt-1">Review and approve/reject business listings.</p>
            <p className="text-xs text-slate-500 mt-2">Total: {stats.totalSubmissions}</p>
          </Link>
          <Link href="/admin/claims" className="border rounded-lg p-4 hover:bg-slate-50">
            <h2 className="font-semibold">Listing Claims</h2>
            <p className="text-sm text-slate-600 mt-1">Validate ownership claim requests.</p>
            <p className="text-xs text-slate-500 mt-2">Total: {stats.totalClaims}</p>
          </Link>
          <Link href="/admin/data-requests" className="border rounded-lg p-4 hover:bg-slate-50">
            <h2 className="font-semibold">Data Rights Requests</h2>
            <p className="text-sm text-slate-600 mt-1">Handle privacy access/deletion/portability requests.</p>
            <p className="text-xs text-slate-500 mt-2">Total: {stats.totalRequests}</p>
          </Link>
          <Link href="/admin/command-center" className="border rounded-lg p-4 hover:bg-slate-50">
            <h2 className="font-semibold">Command Center</h2>
            <p className="text-sm text-slate-600 mt-1">Cross-site SEO and operations panel.</p>
            <p className="text-xs text-slate-500 mt-2">Siargao + UAE</p>
          </Link>
        </div>

        <section className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Latest Submissions</h3>
            <ul className="text-sm space-y-1 text-slate-700">
              {submissions.slice(0, 5).map((s) => (
                <li key={s.id}>#{s.id} · {s.business_name} · {s.status}</li>
              ))}
              {!submissions.length && <li className="text-slate-500">No records.</li>}
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Latest Claims</h3>
            <ul className="text-sm space-y-1 text-slate-700">
              {claims.slice(0, 5).map((c) => (
                <li key={c.id}>#{c.id} · Listing {c.listing_id} · {c.status}</li>
              ))}
              {!claims.length && <li className="text-slate-500">No records.</li>}
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Latest Data Requests</h3>
            <ul className="text-sm space-y-1 text-slate-700">
              {requests.slice(0, 5).map((r) => (
                <li key={r.id}>#{r.id} · {r.full_name} · {r.status}</li>
              ))}
              {!requests.length && <li className="text-slate-500">No records.</li>}
            </ul>
          </div>
        </section>
      </div>
      </section>
      <SiteFooter />
    </main>
  );
}

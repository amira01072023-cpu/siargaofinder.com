"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";

type DataRequest = {
  id: number;
  full_name: string;
  email: string;
  request_type: "access" | "deletion" | "portability" | "correction" | string;
  details: string | null;
  status: "pending" | "in_progress" | "completed" | "rejected" | string;
  review_note: string | null;
  created_at: string;
  updated_at: string | null;
};

export default function AdminDataRequestsPage() {
  const supabase = createClient();

  const [items, setItems] = useState<DataRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [notes, setNotes] = useState<Record<number, string>>({});

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  const load = async () => {
    try {
      setLoading(true);
      setMsg("");

      const res = await fetch("/api/admin/data-requests", { cache: "no-store" });
      const raw = await res.text();

      let data: { error?: string; details?: string; items?: DataRequest[] } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        data = {};
      }

      if (!res.ok) {
        setMsg(data.error || `Failed to load (${res.status})`);
        setItems([]);
        return;
      }

      setItems(data.items || []);
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : "Failed to load data requests");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: number, status: "pending" | "in_progress" | "completed" | "rejected") => {
    const review_note = (notes[id] || "").trim();
    if (status === "rejected" && !review_note) {
      setMsg("❌ Review note is required when rejecting.");
      return;
    }

    try {
      setActionLoadingId(id);
      setMsg("");

      const res = await fetch("/api/admin/data-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, review_note }),
      });

      const raw = await res.text();
      let data: { error?: string } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        data = {};
      }

      if (!res.ok) {
        setMsg(data?.error || `Update failed (${res.status})`);
        return;
      }

      setMsg(`✅ Request #${id} updated to ${status}.`);
      await load();
    } catch (e: unknown) {
      setMsg(e instanceof Error ? e.message : "Update failed");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] p-6">
      <div className="max-w-6xl mx-auto bg-white border rounded-xl p-6 mt-8">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h1 className="text-2xl font-bold">Admin - Data Rights Requests</h1>
          <div className="flex gap-2">
            <Link
              href="/admin"
              className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/submissions"
              className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50"
            >
              Submissions
            </Link>
            <Link
              href="/admin/claims"
              className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50"
            >
              Claims
            </Link>
            <button
              onClick={signOut}
              className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50"
            >
              Sign out
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-4">
          Review access, correction, deletion, and portability requests.
        </p>

        {msg && (
          <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">{msg}</div>
        )}

        {loading ? (
          <p className="text-slate-500">Loading requests...</p>
        ) : items.length === 0 ? (
          <p className="text-slate-500">No data rights requests found.</p>
        ) : (
          <div className="space-y-4">
            {items.map((r) => (
              <div key={r.id} className="border rounded-xl p-4 bg-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{r.full_name}</h2>
                    <p className="text-sm text-slate-600">{r.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs px-2 py-1 rounded-md font-medium bg-blue-100 text-yellow-300">
                      {r.request_type}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-md font-medium ${
                        r.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : r.status === "in_progress"
                          ? "bg-indigo-100 text-indigo-700"
                          : r.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-700">
                  <strong>Details:</strong> {r.details || "—"}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Submitted: {new Date(r.created_at).toLocaleString()}
                </p>
                {r.updated_at && (
                  <p className="mt-1 text-xs text-slate-500">
                    Last update: {new Date(r.updated_at).toLocaleString()}
                  </p>
                )}

                <div className="mt-3 space-y-2">
                  <textarea
                    placeholder="Review note (required for reject)"
                    className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
                    value={notes[r.id] ?? r.review_note ?? ""}
                    onChange={(e) => setNotes((prev) => ({ ...prev, [r.id]: e.target.value }))}
                  />

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateStatus(r.id, "in_progress")}
                      disabled={actionLoadingId === r.id}
                      className="px-3 py-2 rounded-lg text-sm bg-indigo-600 text-black disabled:opacity-60"
                    >
                      {actionLoadingId === r.id ? "Updating..." : "Mark In Progress"}
                    </button>
                    <button
                      onClick={() => updateStatus(r.id, "completed")}
                      disabled={actionLoadingId === r.id}
                      className="px-3 py-2 rounded-lg text-sm bg-green-600 text-black disabled:opacity-60"
                    >
                      Mark Completed
                    </button>
                    <button
                      onClick={() => updateStatus(r.id, "rejected")}
                      disabled={actionLoadingId === r.id}
                      className="px-3 py-2 rounded-lg text-sm bg-red-600 text-black disabled:opacity-60"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => updateStatus(r.id, "pending")}
                      disabled={actionLoadingId === r.id}
                      className="px-3 py-2 rounded-lg text-sm border border-slate-300 disabled:opacity-60"
                    >
                      Reset Pending
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

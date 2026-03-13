"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";

type Claim = {
id: number;
listing_id: number;
claimant_user_id: string;
claimant_name: string;
claimant_email: string;
claimant_phone: string;
relation_to_business: string;
message: string | null;
status: "pending" | "approved" | "rejected" | string;
review_note: string | null;
created_at: string;
reviewed_at: string | null;
};

export default function AdminClaimsPage() {
const supabase = createClient();

const [items, setItems] = useState<Claim[]>([]);
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

const res = await fetch("/api/admin/claims", { cache: "no-store" });
const raw = await res.text();

let data: { error?: string; items?: Claim[] } = {};
try {
data = raw ? JSON.parse(raw) : {};
} catch {
data = {};
}

if (!res.ok) {
setMsg(data?.error || `Failed to load (${res.status})`);
setItems([]);
return;
}

setItems(data.items || []);
} catch (e: unknown) {
setMsg(e instanceof Error ? e.message : "Failed to load claim requests");
setItems([]);
} finally {
setLoading(false);
}
};

useEffect(() => {
load();
}, []);

const approve = async (id: number) => {
try {
setActionLoadingId(id);
setMsg("");

const res = await fetch("/api/admin/claims", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ id, action: "approve" }),
});

const raw = await res.text();
let data: { error?: string; items?: Claim[] } = {};
try {
data = raw ? JSON.parse(raw) : {};
} catch {
data = {};
}

if (!res.ok) {
setMsg(data?.error || `Approve failed (${res.status})`);
return;
}

setMsg("✅ Claim request approved.");
await load();
} catch (e: unknown) {
setMsg(e instanceof Error ? e.message : "Approve failed");
} finally {
setActionLoadingId(null);
}
};

const reject = async (id: number) => {
const review_note = (notes[id] || "").trim();
if (!review_note) {
setMsg("❌ Rejection reason is required.");
return;
}

try {
setActionLoadingId(id);
setMsg("");

const res = await fetch("/api/admin/claims", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ id, action: "reject", review_note }),
});

const raw = await res.text();
let data: { error?: string; items?: Claim[] } = {};
try {
data = raw ? JSON.parse(raw) : {};
} catch {
data = {};
}

if (!res.ok) {
setMsg(data?.error || `Reject failed (${res.status})`);
return;
}

setMsg("✅ Claim request rejected with reason.");
await load();
} catch (e: unknown) {
setMsg(e instanceof Error ? e.message : "Reject failed");
} finally {
setActionLoadingId(null);
}
};

return (
<main className="min-h-screen bg-[#f8fafc] p-6">
<div className="max-w-6xl mx-auto bg-white border rounded-xl p-6 mt-8">
<div className="flex flex-wrap items-center justify-between gap-2 mb-2">
<h1 className="text-2xl font-bold">Admin Review - Claim Requests</h1>
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
Business Submissions
</Link>
<Link
href="/admin/data-requests"
className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50"
>
Data Requests
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
Review owner claims for existing listings.
</p>

{msg && (
<div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
{msg}
</div>
)}

{loading ? (
<p className="text-slate-500">Loading claim requests...</p>
) : items.length === 0 ? (
<p className="text-slate-500">No claim requests found.</p>
) : (
<div className="space-y-4">
{items.map((c) => (
<div key={c.id} className="border rounded-xl p-4 bg-white">
<div className="flex items-start justify-between gap-3">
<div>
<h2 className="text-lg font-semibold">
Claim for Listing #{c.listing_id}
</h2>
<p className="text-sm text-slate-600">
{c.claimant_name} • {c.claimant_email}
</p>
</div>
<span
className={`text-xs px-2 py-1 rounded-md font-medium ${
c.status === "pending"
? "bg-amber-100 text-amber-700"
: c.status === "approved"
? "bg-green-100 text-green-700"
: "bg-red-100 text-red-700"
}`}
>
{c.status}
</span>
</div>

<div className="mt-3 grid md:grid-cols-2 gap-2 text-sm text-slate-700">
<p><strong>Claimant Phone:</strong> {c.claimant_phone}</p>
<p><strong>Relation:</strong> {c.relation_to_business}</p>
<p className="md:col-span-2"><strong>Message:</strong> {c.message || "—"}</p>
<p><strong>Submitted:</strong> {new Date(c.created_at).toLocaleString()}</p>
{c.reviewed_at && <p><strong>Reviewed:</strong> {new Date(c.reviewed_at).toLocaleString()}</p>}
</div>

{c.status === "pending" && (
<div className="mt-4 space-y-2">
<textarea
placeholder="Rejection reason (required if rejecting)"
className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
value={notes[c.id] || ""}
onChange={(e) =>
setNotes((prev) => ({ ...prev, [c.id]: e.target.value }))
}
/>

<div className="flex gap-2">
<button
onClick={() => approve(c.id)}
disabled={actionLoadingId === c.id}
className="bg-green-600 text-black px-4 py-2 rounded-lg disabled:opacity-60"
>
{actionLoadingId === c.id ? "Processing..." : "Approve"}
</button>

<button
onClick={() => reject(c.id)}
disabled={actionLoadingId === c.id}
className="bg-red-600 text-black px-4 py-2 rounded-lg disabled:opacity-60"
>
{actionLoadingId === c.id ? "Processing..." : "Reject"}
</button>
</div>
</div>
)}

{c.status !== "pending" && c.review_note && (
<p className="mt-3 text-sm text-slate-600">
<strong>Review note:</strong> {c.review_note}
</p>
)}
</div>
))}
</div>
)}
</div>
</main>
);
}

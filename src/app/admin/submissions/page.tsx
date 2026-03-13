"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";
import { getDetailedListingCompleteness } from "@/lib/listing-completeness";

type Submission = {
id: number;
user_id: string;
business_name: string;
category: string | null;
city: string | null;
phone: string | null;
email: string | null;
website_url: string | null;
address: string | null;
services: string | null;
status: "pending" | "approved" | "rejected" | string;
review_note: string | null;
created_at: string;
reviewed_at: string | null;
};

export default function AdminSubmissionsPage() {
const supabase = createClient();

const [items, setItems] = useState<Submission[]>([]);
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

const res = await fetch("/api/admin/submissions", { cache: "no-store" });
const raw = await res.text();

let data: { error?: string; items?: Submission[] } = {};
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
setMsg(e instanceof Error ? e.message : "Failed to load submissions");
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

const res = await fetch("/api/admin/submissions", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ id, action: "approve" }),
});

const raw = await res.text();
let data: { error?: string; items?: Submission[] } = {};
try {
data = raw ? JSON.parse(raw) : {};
} catch {
data = {};
}

if (!res.ok) {
setMsg(data?.error || `Approve failed (${res.status})`);
return;
}

setMsg("✅ Submission approved and published.");
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

const res = await fetch("/api/admin/submissions", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ id, action: "reject", review_note }),
});

const raw = await res.text();
let data: { error?: string; items?: Submission[] } = {};
try {
data = raw ? JSON.parse(raw) : {};
} catch {
data = {};
}

if (!res.ok) {
setMsg(data?.error || `Reject failed (${res.status})`);
return;
}

setMsg("✅ Submission rejected with reason.");
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
<div className="flex items-center justify-between mb-2">
<h1 className="text-2xl font-bold">Admin Review - Business Submissions</h1>
<div className="flex gap-2">
<Link
href="/admin"
className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50"
>
Dashboard
</Link>
<button
onClick={signOut}
className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50"
>
Sign out
</button>
<Link
href="/admin/data-requests"
className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50"
>
Data Requests
</Link>
</div>
</div>

<p className="text-sm text-slate-500 mb-4">
Review pending requests and approve/reject.
</p>

{msg && (
<div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
{msg}
</div>
)}

{loading ? (
<p className="text-slate-500">Loading submissions...</p>
) : items.length === 0 ? (
<p className="text-slate-500">No submissions found.</p>
) : (
<div className="space-y-4">
{items.map((s) => (
<div key={s.id} className="border rounded-xl p-4 bg-white">
<div className="flex items-start justify-between gap-3">
<div>
<h2 className="text-lg font-semibold">{s.business_name}</h2>
<p className="text-sm text-slate-600">
{s.category || "—"} • {s.city || "—"}
</p>
</div>
<span
className={`text-xs px-2 py-1 rounded-md font-medium ${
s.status === "pending"
? "bg-amber-100 text-amber-700"
: s.status === "approved"
? "bg-green-100 text-green-700"
: "bg-red-100 text-red-700"
}`}
>
{s.status}
</span>
</div>

<div className="mt-3 grid md:grid-cols-2 gap-2 text-sm text-slate-700">
<p><strong>Phone:</strong> {s.phone || "—"}</p>
<p><strong>Email:</strong> {s.email || "—"}</p>
<p className="md:col-span-2">
<strong>Website:</strong>{" "}
{s.website_url ? (
<a
href={s.website_url}
target="_blank"
rel="noreferrer"
className="text-amber-700 hover:underline"
>
{s.website_url}
</a>
) : (
"—"
)}
</p>
<p className="md:col-span-2"><strong>Address:</strong> {s.address || "—"}</p>
<p className="md:col-span-2"><strong>Services:</strong> {s.services || "—"}</p>
<p className="md:col-span-2"><strong>Profile completeness:</strong> {getDetailedListingCompleteness(s)}%</p>
</div>

{s.status === "pending" && (
<div className="mt-4 space-y-2">
<textarea
placeholder="Rejection reason (required if rejecting)"
className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
value={notes[s.id] || ""}
onChange={(e) =>
setNotes((prev) => ({ ...prev, [s.id]: e.target.value }))
}
/>

<div className="flex gap-2">
<button
onClick={() => approve(s.id)}
disabled={actionLoadingId === s.id}
className="bg-green-600 text-black px-4 py-2 rounded-lg disabled:opacity-60"
>
{actionLoadingId === s.id ? "Processing..." : "Approve"}
</button>

<button
onClick={() => reject(s.id)}
disabled={actionLoadingId === s.id}
className="bg-red-600 text-black px-4 py-2 rounded-lg disabled:opacity-60"
>
{actionLoadingId === s.id ? "Processing..." : "Reject"}
</button>
</div>
</div>
)}

{s.status !== "pending" && s.review_note && (
<p className="mt-3 text-sm text-slate-600">
<strong>Review note:</strong> {s.review_note}
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
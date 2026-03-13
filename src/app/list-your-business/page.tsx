"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import { Search, Home } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

export default function ListYourBusinessPage() {
const supabase = createClient();
const [ready, setReady] = useState(false);

const SIARGAO_MUNICIPALITIES = [
"General Luna",
"Dapa",
"Del Carmen",
"Pilar",
"San Benito",
"Santa Monica",
"Socorro",
"Burgos",
];

const [form, setForm] = useState({
business_name: "",
category: "",
city: "",
phone: "",
email: "",
website_url: "",
address: "",
services: "",
facebook: "",
instagram: "",
tiktok: "",
youtube: "",
});

const [msg, setMsg] = useState("");
const [submitting, setSubmitting] = useState(false);

useEffect(() => {
(async () => {
const { data } = await supabase.auth.getUser();
if (!data.user) {
window.location.href = "/auth";
} else {
setReady(true);
}
})();
}, [supabase]);

const signOut = async () => {
await supabase.auth.signOut();
window.location.href = "/auth";
};

const setField = (k: string, v: string) =>
setForm((p) => ({ ...p, [k]: v }));

const submit = async (e: React.FormEvent) => {
e.preventDefault();
setMsg("");

if (
!form.business_name.trim() ||
!form.category.trim() ||
!form.city.trim() ||
!form.phone.trim() ||
!form.address.trim() ||
!form.services.trim()
) {
return setMsg("All fields are required.");
}

setSubmitting(true);

try {
const res = await fetch("/api/business-submissions", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(form),
});

const data = await res.json();

if (!res.ok) {
setMsg(data.error || "Failed to submit");
return;
}

setMsg("✅ Submitted successfully. Status: Pending admin approval.");

setForm({
business_name: "",
category: "",
city: "",
phone: "",
email: "",
website_url: "",
address: "",
services: "",
facebook: "",
instagram: "",
tiktok: "",
youtube: "",
});

setTimeout(() => {
window.location.href = "/";
}, 1500);
} catch {
setMsg("Something went wrong. Please try again.");
} finally {
setSubmitting(false);
}
};

if (!ready) {
return <main className="p-8">Checking session...</main>;
}

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

</div>
</div>
</header>

<section className="p-6">
<div className="max-w-2xl mx-auto bg-white border rounded-xl p-6 mt-8">
<div className="flex items-center justify-between mb-4">
<h1 className="text-2xl font-bold">List Your Business</h1>
<button
onClick={signOut}
className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50"
>
Sign out
</button>
</div>

<form onSubmit={submit} className="space-y-3">
<input
className="w-full border rounded-lg px-3 py-2"
placeholder="Business Name *"
value={form.business_name}
onChange={(e) => setField("business_name", e.target.value)}
required
/>
<input
className="w-full border rounded-lg px-3 py-2"
placeholder="Category *"
value={form.category}
onChange={(e) => setField("category", e.target.value)}
required
/>
<select
className="w-full border rounded-lg px-3 py-2 bg-white"
value={form.city}
onChange={(e) => setField("city", e.target.value)}
required
>
<option value="">Select Municipality *</option>
{SIARGAO_MUNICIPALITIES.map((m) => (
<option key={m} value={m}>{m}</option>
))}
</select>
<input
className="w-full border rounded-lg px-3 py-2"
placeholder="Phone *"
value={form.phone}
onChange={(e) => setField("phone", e.target.value)}
required
/>
<input
type="email"
className="w-full border rounded-lg px-3 py-2"
placeholder="Email (optional)"
value={form.email}
onChange={(e) => setField("email", e.target.value)}
/>
<input
type="url"
className="w-full border rounded-lg px-3 py-2"
placeholder="Website URL (optional)"
value={form.website_url}
onChange={(e) => setField("website_url", e.target.value)}
/>
<input
className="w-full border rounded-lg px-3 py-2"
placeholder="Address *"
value={form.address}
onChange={(e) => setField("address", e.target.value)}
required
/>
<textarea
className="w-full border rounded-lg px-3 py-2 min-h-[100px]"
placeholder="Services *"
value={form.services}
onChange={(e) => setField("services", e.target.value)}
required
/>

<div className="grid md:grid-cols-2 gap-3">
<input className="w-full border rounded-lg px-3 py-2" placeholder="Facebook URL (optional)" value={form.facebook} onChange={(e) => setField("facebook", e.target.value)} />
<input className="w-full border rounded-lg px-3 py-2" placeholder="Instagram URL (optional)" value={form.instagram} onChange={(e) => setField("instagram", e.target.value)} />
<input className="w-full border rounded-lg px-3 py-2" placeholder="TikTok URL (optional)" value={form.tiktok} onChange={(e) => setField("tiktok", e.target.value)} />
<input className="w-full border rounded-lg px-3 py-2" placeholder="YouTube URL (optional)" value={form.youtube} onChange={(e) => setField("youtube", e.target.value)} />
</div>

<button
disabled={submitting}
className="bg-yellow-400 text-black px-5 py-2 rounded-lg disabled:opacity-60 font-semibold"
>
{submitting ? "Submitting..." : "Submit"}
</button>
</form>

{msg && <p className="mt-4 text-sm">{msg}</p>}
</div>
</section>

<SiteFooter />
</main>
);
}
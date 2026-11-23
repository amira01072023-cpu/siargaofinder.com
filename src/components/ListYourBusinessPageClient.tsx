"use client";

import { useState } from "react";
import PublicSiteHeader from "@/components/PublicSiteHeader";

export default function ListYourBusinessPageClient() {
const SIARGAO_MUNICIPALITIES = [
"General Luna",
"Dapa",
"Del Carmen",
"Pilar",
"San Benito",
"San Isidro",
"Santa Monica",
"Socorro",
"Burgos",
];

const [form, setForm] = useState(() => ({
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
nickname: "",
started_at: String(Date.now()),
}));

const [msg, setMsg] = useState("");
const [duplicateHint, setDuplicateHint] = useState("");
const [submitting, setSubmitting] = useState(false);

const setField = (k: string, v: string) => {
if (k === "business_name") setDuplicateHint("");
setForm((p) => ({ ...p, [k]: v }));
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
const normalizeName = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");

const checkDuplicateListing = async () => {
const name = form.business_name.trim();
if (name.length < 3) {
setDuplicateHint("");
return;
}

try {
const res = await fetch(`/api/listings?q=${encodeURIComponent(name)}&limit=5`);
if (!res.ok) return;

const data = await res.json();
const hasExactMatch = Array.isArray(data.items)
? data.items.some((item: { business_name?: string }) => normalizeName(item.business_name || "") === normalizeName(name))
: false;

setDuplicateHint(
hasExactMatch
? "This business may already be listed. Please search the directory before submitting a duplicate."
: ""
);
} catch {
// Duplicate hints are best-effort; the server still performs the final check.
}
};

const submit = async (e: React.FormEvent) => {
e.preventDefault();
setMsg("");

if (
!form.business_name.trim() ||
!form.category.trim() ||
!form.city.trim() ||
!form.phone.trim() ||
!form.email.trim() ||
!form.address.trim() ||
!form.services.trim()
) {
return setMsg("All fields are required.");
}

if (!isValidEmail(form.email)) {
return setMsg("Please enter a valid email address.");
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

setMsg(data.message || "Submitted successfully. Please check your email to verify before admin review.");

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
nickname: "",
started_at: String(Date.now()),
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

return (
<main className="page-shell">
<PublicSiteHeader showListYourBusinessLink={false} />

<section className="page-section page-hero form-shell">
<p className="page-kicker">Business Submission</p>
<h1 className="page-title">List Your Business</h1>
<p className="page-subtitle">Submit your business details for review. No account is required, but a valid email is needed so admins can follow up.</p>

<div className="page-card mt-8 p-6 md:p-8">
<form onSubmit={submit} className="form-grid">
<label className="hidden" aria-hidden="true">
  <span>Nickname</span>
  <input
    tabIndex={-1}
    autoComplete="off"
    value={form.nickname}
    onChange={(e) => setField("nickname", e.target.value)}
  />
</label>

<label className="form-field">
  <span className="form-label">Business Name</span>
  <input className="form-input" placeholder="Business Name *" value={form.business_name} onBlur={checkDuplicateListing} onChange={(e) => setField("business_name", e.target.value)} maxLength={160} required />
  {duplicateHint && <span className="text-sm text-amber-700" role="status">{duplicateHint}</span>}
</label>

<label className="form-field">
  <span className="form-label">Category</span>
  <input className="form-input" placeholder="Category *" value={form.category} onChange={(e) => setField("category", e.target.value)} maxLength={120} required />
</label>

<label className="form-field">
  <span className="form-label">Municipality</span>
  <select className="form-select" value={form.city} onChange={(e) => setField("city", e.target.value)} required>
    <option value="">Select Municipality *</option>
    {SIARGAO_MUNICIPALITIES.map((m) => (
      <option key={m} value={m}>{m}</option>
    ))}
  </select>
</label>

<label className="form-field">
  <span className="form-label">Phone</span>
  <input className="form-input" placeholder="Phone *" value={form.phone} onChange={(e) => setField("phone", e.target.value)} maxLength={80} required />
</label>

<label className="form-field">
  <span className="form-label">Email</span>
  <input type="email" className="form-input" placeholder="Email *" value={form.email} onChange={(e) => setField("email", e.target.value)} maxLength={254} required />
</label>

<label className="form-field">
  <span className="form-label">Website URL</span>
  <input type="url" className="form-input" placeholder="Website URL (optional)" value={form.website_url} onChange={(e) => setField("website_url", e.target.value)} maxLength={300} />
</label>

<label className="form-field">
  <span className="form-label">Address</span>
  <input className="form-input" placeholder="Address *" value={form.address} onChange={(e) => setField("address", e.target.value)} maxLength={300} required />
</label>

<label className="form-field">
  <span className="form-label">Services</span>
  <textarea className="form-textarea" placeholder="Services *" value={form.services} onChange={(e) => setField("services", e.target.value)} maxLength={1200} required />
</label>

<div className="grid md:grid-cols-2 gap-3">
  <label className="form-field">
    <span className="form-label">Facebook</span>
    <input className="form-input" placeholder="Facebook URL (optional)" value={form.facebook} onChange={(e) => setField("facebook", e.target.value)} maxLength={300} />
  </label>
  <label className="form-field">
    <span className="form-label">Instagram</span>
    <input className="form-input" placeholder="Instagram URL (optional)" value={form.instagram} onChange={(e) => setField("instagram", e.target.value)} maxLength={300} />
  </label>
  <label className="form-field">
    <span className="form-label">TikTok</span>
    <input className="form-input" placeholder="TikTok URL (optional)" value={form.tiktok} onChange={(e) => setField("tiktok", e.target.value)} maxLength={300} />
  </label>
  <label className="form-field">
    <span className="form-label">YouTube</span>
    <input className="form-input" placeholder="YouTube URL (optional)" value={form.youtube} onChange={(e) => setField("youtube", e.target.value)} maxLength={300} />
  </label>
</div>

<div className="pt-2">
  <button disabled={submitting} className="ui-btn ui-btn--dark disabled:opacity-60">
    {submitting ? "Submitting..." : "Submit"}
  </button>
</div>
</form>

{msg && <p className="status-message" role="status">{msg}</p>}
</div>
</section>
</main>
);
}

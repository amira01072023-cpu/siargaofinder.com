"use client";

import { useState } from "react";
import Link from "next/link";

export default function ReportIllegalContentPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    page_url: "",
    details: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const setField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg("");

    try {
      const res = await fetch("/api/report-illegal-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setMsg(data?.error || "Failed to submit report.");
        return;
      }

      setMsg("✅ Report submitted. Our moderation team will review it.");
      setForm({ full_name: "", email: "", page_url: "", details: "" });
    } catch {
      setMsg("Something went wrong. Please try again or email info@siargaofinder.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] p-6 text-slate-800">
      <div className="max-w-2xl mx-auto bg-white border rounded-xl p-6 mt-8">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold">Report Illegal or Harmful Content</h1>
          <Link href="/eu-compliance" className="text-sm text-amber-700 hover:underline">EU Compliance</Link>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Use this form to report potentially illegal, abusive, or harmful content on this platform.
        </p>

        <form onSubmit={onSubmit} className="space-y-3">
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Full name *" value={form.full_name} onChange={(e)=>setField("full_name", e.target.value)} required />
          <input type="email" className="w-full border rounded-lg px-3 py-2" placeholder="Email *" value={form.email} onChange={(e)=>setField("email", e.target.value)} required />
          <input type="url" className="w-full border rounded-lg px-3 py-2" placeholder="Page URL to report *" value={form.page_url} onChange={(e)=>setField("page_url", e.target.value)} required />
          <textarea className="w-full border rounded-lg px-3 py-2 min-h-[120px]" placeholder="Explain the issue and why this content may be illegal or harmful *" value={form.details} onChange={(e)=>setField("details", e.target.value)} required />
          <button disabled={submitting} className="bg-yellow-400 text-black px-5 py-2 rounded-lg disabled:opacity-60 font-semibold">{submitting ? "Submitting..." : "Submit Report"}</button>
        </form>

        {msg && <p className="mt-4 text-sm">{msg}</p>}
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

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
      setMsg("Something went wrong. Please try again or use the contact page.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <div className="site-header-brand">
            <Search size={19} />
            <span>Siargao Finder</span>
          </div>
          <Link href="/eu-compliance" className="ui-btn ui-btn--soft">EU Compliance</Link>
        </div>
      </header>

      <section className="page-section page-hero form-shell">
        <p className="page-kicker">Moderation</p>
        <h1 className="page-title">Report Illegal or Harmful Content</h1>
        <p className="page-subtitle">Use this form to report potentially illegal, abusive, or harmful content on the platform.</p>

        <div className="page-card mt-8 p-6 md:p-8">
          <form onSubmit={onSubmit} className="form-grid">
            <label className="form-field"><span className="form-label">Full Name</span><input className="form-input" placeholder="Full name *" value={form.full_name} onChange={(e)=>setField("full_name", e.target.value)} required /></label>
            <label className="form-field"><span className="form-label">Email</span><input type="email" className="form-input" placeholder="Email *" value={form.email} onChange={(e)=>setField("email", e.target.value)} required /></label>
            <label className="form-field"><span className="form-label">Page URL</span><input type="url" className="form-input" placeholder="Page URL to report *" value={form.page_url} onChange={(e)=>setField("page_url", e.target.value)} required /></label>
            <label className="form-field"><span className="form-label">Details</span><textarea className="form-textarea" placeholder="Explain the issue and why this content may be illegal or harmful *" value={form.details} onChange={(e)=>setField("details", e.target.value)} required /></label>
            <div className="pt-2"><button disabled={submitting} className="ui-btn ui-btn--dark disabled:opacity-60">{submitting ? "Submitting..." : "Submit Report"}</button></div>
          </form>

          {msg && <p className="status-message">{msg}</p>}
        </div>
      </section>
    </main>
  );
}

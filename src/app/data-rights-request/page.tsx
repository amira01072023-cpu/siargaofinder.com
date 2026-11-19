"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function DataRightsRequestPage() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    request_type: "access",
    details: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const setField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/data-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setMsg(data?.error || "Failed to submit request.");
        return;
      }

      setMsg("✅ Your data request was submitted. We will contact you by email.");
      setForm({ full_name: "", email: "", request_type: "access", details: "" });
    } catch {
      setMsg("Something went wrong. Please try again from the contact page.");
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
          <Link href="/privacy-policy" className="ui-btn ui-btn--soft">Privacy Policy</Link>
        </div>
      </header>

      <section className="page-section page-hero form-shell">
        <p className="page-kicker">Privacy</p>
        <h1 className="page-title">Data Rights Request</h1>
        <p className="page-subtitle">Request access, correction, deletion, or portability of your personal data.</p>

        <div className="page-card mt-8 p-6 md:p-8">
          <form onSubmit={onSubmit} className="form-grid">
            <label className="form-field">
              <span className="form-label">Full Name</span>
              <input className="form-input" placeholder="Full name *" value={form.full_name} onChange={(e) => setField("full_name", e.target.value)} required />
            </label>
            <label className="form-field">
              <span className="form-label">Email</span>
              <input type="email" className="form-input" placeholder="Email *" value={form.email} onChange={(e) => setField("email", e.target.value)} required />
            </label>
            <label className="form-field">
              <span className="form-label">Request Type</span>
              <select className="form-select" value={form.request_type} onChange={(e) => setField("request_type", e.target.value)}>
                <option value="access">Access my data</option>
                <option value="correction">Correct my data</option>
                <option value="deletion">Delete my data</option>
                <option value="portability">Export/port my data</option>
              </select>
            </label>
            <label className="form-field">
              <span className="form-label">Details</span>
              <textarea className="form-textarea" placeholder="Request details (optional but recommended)" value={form.details} onChange={(e) => setField("details", e.target.value)} />
            </label>
            <div className="pt-2">
              <button disabled={submitting} className="ui-btn ui-btn--dark disabled:opacity-60">
                {submitting ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>

          {msg && <p className="status-message" role="status">{msg}</p>}
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

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
      setMsg("Something went wrong. Please try again or email info@siargaofinder.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] p-6 text-slate-800">
      <div className="max-w-2xl mx-auto bg-white border rounded-xl p-6 mt-8">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold">Data Rights Request</h1>
          <Link href="/privacy-policy" className="text-sm text-amber-700 hover:underline">
            Privacy Policy
          </Link>
        </div>

        <p className="text-sm text-slate-600 mb-4">
          Use this form to request access, correction, deletion, or portability of your personal data.
        </p>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Full name *"
            value={form.full_name}
            onChange={(e) => setField("full_name", e.target.value)}
            required
          />
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Email *"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            required
          />
          <select
            className="w-full border rounded-lg px-3 py-2 bg-white"
            value={form.request_type}
            onChange={(e) => setField("request_type", e.target.value)}
          >
            <option value="access">Access my data</option>
            <option value="correction">Correct my data</option>
            <option value="deletion">Delete my data</option>
            <option value="portability">Export/port my data</option>
          </select>

          <textarea
            className="w-full border rounded-lg px-3 py-2 min-h-[120px]"
            placeholder="Request details (optional but recommended)"
            value={form.details}
            onChange={(e) => setField("details", e.target.value)}
          />

          <button
            disabled={submitting}
            className="bg-yellow-400 text-black px-5 py-2 rounded-lg disabled:opacity-60 font-semibold"
          >
            {submitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>

        {msg && <p className="mt-4 text-sm">{msg}</p>}
      </div>
    </main>
  );
}

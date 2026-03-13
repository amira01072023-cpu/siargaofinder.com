"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Home } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import { createClient } from "@/lib/supabase-browser";

export default function ClaimListingPage({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const supabase = createClient();

  const [listingId, setListingId] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    claimant_name: "",
    claimant_email: "",
    claimant_phone: "",
    relation_to_business: "",
    message: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: "",
  });

  useEffect(() => {
    (async () => {
      const p = await params;
      setListingId(Number(p.listingId));

      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        window.location.href = "/auth";
        return;
      }
      setReady(true);
    })();
  }, [params, supabase]);

  const setField = (k: keyof typeof form, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    if (!listingId) return setMsg("Invalid listing.");
    if (
      !form.claimant_name.trim() ||
      !form.claimant_phone.trim() ||
      !form.relation_to_business.trim()
    ) {
      return setMsg("Please complete all required fields.");
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listing_id: listingId,
          claimant_name: form.claimant_name,
          claimant_email: form.claimant_email,
          claimant_phone: form.claimant_phone,
          relation_to_business: form.relation_to_business,
          message: form.message,
          socials: {
            facebook: form.facebook,
            instagram: form.instagram,
            tiktok: form.tiktok,
            youtube: form.youtube,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data?.error || "Failed to submit claim.");
        return;
      }

      setMsg("✅ Claim request submitted. Pending admin review.");
      setTimeout(() => {
        window.location.href = `/listing/${listingId}`;
      }, 1200);
    } catch {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!ready) return <main className="p-8">Checking session...</main>;

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased">
      <header className="bg-black border-b border-yellow-500 sticky top-0 z-30 text-yellow-300 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="text-yellow-300" size={20} />
            <span className="font-bold text-lg tracking-tight">Siargao Finder</span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-yellow-400 text-black border border-yellow-500 text-sm px-4 py-2 rounded-lg hover:bg-yellow-300 transition font-semibold"
          >
            <Home size={16} />
            Home
          </Link>
        </div>
      </header>

      <section className="p-6">
        <div className="max-w-2xl mx-auto bg-white border rounded-xl p-6 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Claim This Listing</h1>
            <Link
              href={listingId ? `/listing/${listingId}` : "/"}
              className="text-sm text-amber-700 hover:underline"
            >
              ← Back
            </Link>
          </div>

          <form onSubmit={submit} className="space-y-3">
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Full Name *"
              value={form.claimant_name}
              onChange={(e) => setField("claimant_name", e.target.value)}
              required
            />
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Business Email (optional)"
              value={form.claimant_email}
              onChange={(e) => setField("claimant_email", e.target.value)}
            />
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Phone *"
              value={form.claimant_phone}
              onChange={(e) => setField("claimant_phone", e.target.value)}
              required
            />
            <input
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Your relation to this business *"
              value={form.relation_to_business}
              onChange={(e) => setField("relation_to_business", e.target.value)}
              required
            />
            <textarea
              className="w-full border rounded-lg px-3 py-2 min-h-[110px]"
              placeholder="Additional message (optional)"
              value={form.message}
              onChange={(e) => setField("message", e.target.value)}
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
              {submitting ? "Submitting..." : "Submit Claim"}
            </button>
          </form>

          {msg && <p className="mt-4 text-sm">{msg}</p>}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

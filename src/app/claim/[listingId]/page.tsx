"use client";

import { useEffect, useState } from "react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import { createClient } from "@/lib/supabase-browser";

type ClaimStatus = {
  id: number;
  status: string;
  review_note: string | null;
  created_at: string;
  reviewed_at: string | null;
};

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
  const [claimStatus, setClaimStatus] = useState<ClaimStatus | null>(null);

  const [form, setForm] = useState({
    claimant_name: "",
    claimant_email: "",
    claimant_phone: "",
    relation_to_business: "",
    message: "",
    proof: "",
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
      setForm((prev) => ({ ...prev, claimant_email: data.user?.email || "" }));
      const statusRes = await fetch(`/api/claims?listing_id=${Number(p.listingId)}`, { cache: "no-store" });
      if (statusRes.ok) {
        const statusData = await statusRes.json();
        setClaimStatus(statusData?.item || null);
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
      !form.claimant_email.trim() ||
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
            proof: form.proof,
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

      setClaimStatus({
        id: data?.item?.id || Date.now(),
        status: "pending",
        review_note: null,
        created_at: data?.item?.created_at || new Date().toISOString(),
        reviewed_at: null,
      });
      setMsg("Claim request submitted. Pending admin review.");
    } catch {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!ready) return <main className="page-shell"><section className="page-section"><p className="status-message">Checking session...</p></section></main>;

  return (
    <main className="page-shell">
      <PublicSiteHeader />

      <section className="page-section page-hero form-shell">
        <p className="page-kicker">Ownership Claim</p>
        <h1 className="page-title">Claim This Listing</h1>
        <p className="page-subtitle">Submit your details so the team can verify ownership and review your request.</p>

        <div className="page-card mt-8 p-6 md:p-8">
          {claimStatus && (
            <div className="mb-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-slate-800">
              <p><strong>Current claim status:</strong> {claimStatus.status.replace(/_/g, " ")}</p>
              <p className="mt-1">Submitted: {new Date(claimStatus.created_at).toLocaleString()}</p>
              {claimStatus.review_note && <p className="mt-1"><strong>Admin note:</strong> {claimStatus.review_note}</p>}
            </div>
          )}
          <form onSubmit={submit} className="form-grid">
            <label className="form-field">
              <span className="form-label">Full Name</span>
              <input className="form-input" placeholder="Full Name *" value={form.claimant_name} onChange={(e) => setField("claimant_name", e.target.value)} required />
            </label>
            <label className="form-field">
              <span className="form-label">Business Email</span>
              <input type="email" className="form-input" placeholder="Business Email *" value={form.claimant_email} onChange={(e) => setField("claimant_email", e.target.value)} required />
            </label>
            <label className="form-field">
              <span className="form-label">Phone</span>
              <input className="form-input" placeholder="Phone *" value={form.claimant_phone} onChange={(e) => setField("claimant_phone", e.target.value)} required />
            </label>
            <label className="form-field">
              <span className="form-label">Relation to Business</span>
              <input className="form-input" placeholder="Your relation to this business *" value={form.relation_to_business} onChange={(e) => setField("relation_to_business", e.target.value)} required />
            </label>
            <label className="form-field">
              <span className="form-label">Additional Message</span>
              <textarea className="form-textarea" placeholder="Additional message (optional)" value={form.message} onChange={(e) => setField("message", e.target.value)} />
            </label>
            <label className="form-field">
              <span className="form-label">Proof</span>
              <textarea className="form-textarea" placeholder="Proof, website admin email, social profile, registration detail, or other evidence (optional)" value={form.proof} onChange={(e) => setField("proof", e.target.value)} />
            </label>

            <div className="grid md:grid-cols-2 gap-3">
              <label className="form-field"><span className="form-label">Facebook</span><input className="form-input" placeholder="Facebook URL (optional)" value={form.facebook} onChange={(e) => setField("facebook", e.target.value)} /></label>
              <label className="form-field"><span className="form-label">Instagram</span><input className="form-input" placeholder="Instagram URL (optional)" value={form.instagram} onChange={(e) => setField("instagram", e.target.value)} /></label>
              <label className="form-field"><span className="form-label">TikTok</span><input className="form-input" placeholder="TikTok URL (optional)" value={form.tiktok} onChange={(e) => setField("tiktok", e.target.value)} /></label>
              <label className="form-field"><span className="form-label">YouTube</span><input className="form-input" placeholder="YouTube URL (optional)" value={form.youtube} onChange={(e) => setField("youtube", e.target.value)} /></label>
            </div>

            <div className="pt-2">
              <button disabled={submitting} className="ui-btn ui-btn--dark disabled:opacity-60">
                {submitting ? "Submitting..." : "Submit Claim"}
              </button>
            </div>
          </form>

          {msg && <p className="status-message" role="status">{msg}</p>}
        </div>
      </section>
    </main>
  );
}

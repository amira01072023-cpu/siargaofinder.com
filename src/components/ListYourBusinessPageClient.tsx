"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import { SIARGAO_MUNICIPALITIES } from "@/lib/siargao-municipalities";

const STEPS = ["Business", "Category & area", "Contact", "Address", "Details", "Review"] as const;

const emptyForm = () => ({
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

export default function ListYourBusinessPageClient() {
  const router = useRouter();
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const [form, setForm] = useState(emptyForm);
  const [step, setStep] = useState(0);
  const [msg, setMsg] = useState("");
  const [duplicateHint, setDuplicateHint] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    stepHeadingRef.current?.focus();
  }, [step]);

  const setField = (key: keyof ReturnType<typeof emptyForm>, value: string) => {
    if (key === "business_name") setDuplicateHint("");
    setMsg("");
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  const normalizeName = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");

  const checkDuplicateListing = async () => {
    const name = form.business_name.trim();
    if (name.length < 3) {
      setDuplicateHint("");
      return false;
    }

    try {
      const response = await fetch(`/api/listings?businessName=${encodeURIComponent(name)}&limit=5`);
      if (!response.ok) return false;
      const data = await response.json();
      const hasExactMatch = Array.isArray(data.items)
        ? data.items.some((item: { business_name?: string }) => normalizeName(item.business_name || "") === normalizeName(name))
        : false;
      setDuplicateHint(hasExactMatch
        ? "This business is already listed. Use Claim / Update on its profile instead of creating a duplicate."
        : "");
      return hasExactMatch;
    } catch {
      return false;
    }
  };

  const validateStep = async () => {
    if (step === 0) {
      if (!form.business_name.trim()) {
        setMsg("Enter the business name to continue.");
        return false;
      }
      if (await checkDuplicateListing()) {
        setMsg("A matching listing already exists. Please claim or update the existing profile.");
        return false;
      }
    }
    if (step === 1 && (!form.category.trim() || !form.city.trim())) {
      setMsg("Add a category and municipality to continue.");
      return false;
    }
    if (step === 2) {
      if (!form.phone.trim() || !form.email.trim()) {
        setMsg("Add a phone number and email address to continue.");
        return false;
      }
      if (!isValidEmail(form.email)) {
        setMsg("Enter a valid email address to continue.");
        return false;
      }
    }
    if (step === 3 && !form.address.trim()) {
      setMsg("Add the business address to continue.");
      return false;
    }
    if (step === 4 && !form.services.trim()) {
      setMsg("Describe the business services to continue.");
      return false;
    }
    setMsg("");
    return true;
  };

  const nextStep = async () => {
    if (await validateStep()) setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMsg("");
    if (step < STEPS.length - 1) {
      await nextStep();
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/business-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        setMsg(data.error || "Failed to submit. Please review the form and try again.");
        return;
      }

      setMsg(data.message || "Submitted successfully. Check your email to verify the submission before admin review.");
      setForm(emptyForm());
      window.setTimeout(() => router.push("/"), 1500);
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
        <p className="page-kicker">Free business submission</p>
        <h1 className="page-title">List Your Business</h1>
        <p className="page-subtitle">Add accurate business information for admin review. No account or listing fee is required.</p>

        <div className="page-card business-submission-wizard mt-8 p-5 md:p-8">
          <ol className="submission-progress" aria-label="Submission progress">
            {STEPS.map((label, index) => (
              <li key={label} className={index === step ? "is-current" : index < step ? "is-complete" : ""} aria-current={index === step ? "step" : undefined}>
                <span>{index < step ? <Check size={14} aria-hidden="true" /> : index + 1}</span>
                <small>{label}</small>
              </li>
            ))}
          </ol>

          <form onSubmit={submit} className="submission-step-form" noValidate>
            <label className="hidden" aria-hidden="true">
              <span>Nickname</span>
              <input tabIndex={-1} autoComplete="off" value={form.nickname} onChange={(event) => setField("nickname", event.target.value)} />
            </label>

            <div className="submission-step-heading">
              <p>Step {step + 1} of {STEPS.length}</p>
              <h2 ref={stepHeadingRef} tabIndex={-1}>{STEPS[step]}</h2>
            </div>

            {step === 0 && (
              <div className="submission-step-fields">
                <label className="form-field">
                  <span className="form-label">Business name</span>
                  <input autoFocus className="form-input" placeholder="Official business name" value={form.business_name} onBlur={() => void checkDuplicateListing()} onChange={(event) => setField("business_name", event.target.value)} maxLength={160} required />
                  <small>Use the name customers will recognize. We check for duplicates before continuing.</small>
                  {duplicateHint && <span className="text-sm text-amber-700" role="status">{duplicateHint}</span>}
                </label>
              </div>
            )}

            {step === 1 && (
              <div className="submission-step-fields submission-step-fields--two">
                <label className="form-field">
                  <span className="form-label">Category</span>
                  <input autoFocus className="form-input" placeholder="Example: Restaurant, Resort, Motorbike Rental" value={form.category} onChange={(event) => setField("category", event.target.value)} maxLength={120} required />
                </label>
                <label className="form-field">
                  <span className="form-label">Municipality</span>
                  <select className="form-select" value={form.city} onChange={(event) => setField("city", event.target.value)} required>
                    <option value="">Select municipality</option>
                    {SIARGAO_MUNICIPALITIES.map((municipality) => <option key={municipality} value={municipality}>{municipality}</option>)}
                  </select>
                </label>
              </div>
            )}

            {step === 2 && (
              <div className="submission-step-fields submission-step-fields--two">
                <label className="form-field">
                  <span className="form-label">Phone</span>
                  <input autoFocus className="form-input" inputMode="tel" autoComplete="tel" placeholder="Business phone number" value={form.phone} onChange={(event) => setField("phone", event.target.value)} maxLength={80} required />
                </label>
                <label className="form-field">
                  <span className="form-label">Email</span>
                  <input type="email" className="form-input" autoComplete="email" placeholder="Email for verification" value={form.email} onChange={(event) => setField("email", event.target.value)} maxLength={254} required />
                </label>
                <label className="form-field submission-field-full">
                  <span className="form-label">Website URL <small>(optional)</small></span>
                  <input type="url" className="form-input" placeholder="https://" value={form.website_url} onChange={(event) => setField("website_url", event.target.value)} maxLength={300} />
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="submission-step-fields">
                <label className="form-field">
                  <span className="form-label">Business address</span>
                  <input autoFocus className="form-input" autoComplete="street-address" placeholder="Street or barangay, municipality" value={form.address} onChange={(event) => setField("address", event.target.value)} maxLength={300} required />
                  <small>Enter an accurate address. Exact map coordinates are not created from an estimate.</small>
                </label>
              </div>
            )}

            {step === 4 && (
              <div className="submission-step-fields">
                <label className="form-field">
                  <span className="form-label">Business description and services</span>
                  <textarea autoFocus className="form-textarea" placeholder="Describe what the business offers" value={form.services} onChange={(event) => setField("services", event.target.value)} maxLength={1200} required />
                </label>
                <div className="submission-step-fields submission-step-fields--two">
                  {(["facebook", "instagram", "tiktok", "youtube"] as const).map((network) => (
                    <label key={network} className="form-field">
                      <span className="form-label">{network.charAt(0).toUpperCase() + network.slice(1)} <small>(optional)</small></span>
                      <input type="url" className="form-input" placeholder="https://" value={form[network]} onChange={(event) => setField(network, event.target.value)} maxLength={300} />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="submission-review">
                <p>Review the information below. The listing will not publish automatically; it enters the existing admin review and email-verification workflow.</p>
                <dl>
                  <div><dt>Business</dt><dd>{form.business_name}</dd></div>
                  <div><dt>Category</dt><dd>{form.category}</dd></div>
                  <div><dt>Municipality</dt><dd>{form.city}</dd></div>
                  <div><dt>Phone</dt><dd>{form.phone}</dd></div>
                  <div><dt>Email</dt><dd>{form.email}</dd></div>
                  <div><dt>Address</dt><dd>{form.address}</dd></div>
                  <div className="submission-field-full"><dt>Services</dt><dd>{form.services}</dd></div>
                </dl>
              </div>
            )}

            {msg && <p className="status-message" role="alert">{msg}</p>}
            <div className="submission-wizard-actions">
              <button type="button" className="ui-btn ui-btn--soft" onClick={() => setStep((current) => Math.max(current - 1, 0))} disabled={step === 0 || submitting}>
                <ChevronLeft size={16} aria-hidden="true" /> Back
              </button>
              {step < STEPS.length - 1 ? (
                <button type="button" className="ui-btn ui-btn--dark" onClick={() => void nextStep()}>
                  Continue <ChevronRight size={16} aria-hidden="true" />
                </button>
              ) : (
                <button disabled={submitting} className="ui-btn ui-btn--dark disabled:opacity-60">
                  {submitting ? "Submitting…" : "Submit for review"}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

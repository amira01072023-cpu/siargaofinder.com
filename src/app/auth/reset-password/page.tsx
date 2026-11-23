"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import { createClient } from "@/lib/supabase-browser";

function getSafeRedirect(fallback = "/") {
  if (typeof window === "undefined") return fallback;
  const params = new URLSearchParams(window.location.search);
  const next = params.get("redirectedFrom");
  return next && next.startsWith("/") && !next.startsWith("//") ? next : fallback;
}

export default function ResetPasswordPage() {
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setHasSession(Boolean(data.session));
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === "PASSWORD_RECOVERY" || session) setHasSession(Boolean(session));
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const submit = async () => {
    setMsg("");

    if (!password || !confirmPassword) {
      return setMsg("Enter and confirm your new password.");
    }

    if (password.length < 6) {
      return setMsg("Password must be at least 6 characters.");
    }

    if (password !== confirmPassword) {
      return setMsg("Passwords do not match.");
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) return setMsg(error.message);

    const next = getSafeRedirect("/");
    window.location.href = `${next}${next.includes("?") ? "&" : "?"}message=${encodeURIComponent("Password updated. You can continue safely.")}`;
  };

  return (
    <main className="page-shell">
      <PublicSiteHeader />

      <section className="page-section page-hero form-shell max-w-md">
        <p className="page-kicker">Account Recovery</p>
        <h1 className="page-title">Set a new password</h1>
        <p className="page-subtitle">Use the recovery email link, then create a new password for your SiargaoFinder account.</p>

        <div className="page-card mt-8 p-6 md:p-8">
          {!hasSession ? (
            <div className="page-card rounded-2xl p-4 text-sm text-slate-700">
              Open this page from the password reset email. If the link expired, request a new one from the sign in page.
            </div>
          ) : null}

          <label className="form-field mt-3">
            <span className="form-label">New password</span>
            <input type="password" className="form-input" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
          </label>

          <label className="form-field mt-3">
            <span className="form-label">Confirm new password</span>
            <input type="password" className="form-input" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" />
          </label>

          <div className="mt-5 flex flex-col gap-3">
            <button onClick={submit} disabled={loading} className="ui-btn ui-btn--dark w-full justify-center disabled:opacity-60">
              {loading ? "Updating password…" : "Update password"}
            </button>

            <Link href="/auth" className="text-center text-sm text-slate-600 hover:text-slate-900 transition">
              Back to sign in
            </Link>
          </div>

          {msg && <p className="status-message" role="status">{msg}</p>}
        </div>
      </section>
    </main>
  );
}

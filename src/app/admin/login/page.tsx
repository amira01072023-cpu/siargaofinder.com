"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function getSafeAdminRedirect() {
    const params = new URLSearchParams(window.location.search);
    const next = params.get("redirectedFrom");
    return next && next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";
  }

  const sendPasswordReset = async () => {
    setMsg("");
    if (!email) {
      setMsg("Enter your admin email first, then request a password reset link.");
      return;
    }

    setLoading(true);
    const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const authOrigin = publicSiteUrl || window.location.origin;
    const next = getSafeAdminRedirect();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${authOrigin}/auth/callback?redirectedFrom=${encodeURIComponent(`/auth/reset-password?redirectedFrom=${encodeURIComponent(next)}`)}`,
    });
    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg("Password reset email sent. Open the link in your email to set a new admin password.");
  };

  const submit = async () => {
    setMsg("");
    if (!email || !password) {
      setMsg("Email and password are required.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setMsg(error.message);
      return;
    }

    window.location.href = getSafeAdminRedirect();
  };

  return (
    <main className="page-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <div className="site-header-brand">
            <Search size={19} />
            <span>Siargao Finder</span>
          </div>
          <Link href="/" className="ui-btn ui-btn--soft">Home</Link>
        </div>
      </header>

      <section className="page-section page-hero max-w-4xl">
        <p className="page-kicker">SiargaoFinder Admin</p>
        <h1 className="page-title">Admin login</h1>
        <p className="page-subtitle max-w-2xl">
          Sign in with an authorized admin account to manage directory operations.
        </p>
      </section>

      <section className="page-section max-w-md pt-0">
        <div className="guide-surface p-6 md:p-8">
          <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900"><ShieldCheck size={26} /></div>
          <label className="form-field">
            <span className="form-label">Admin email</span>
            <input type="email" className="form-input" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </label>

          <label className="form-field mt-4">
            <span className="form-label">Password</span>
            <input type="password" className="form-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </label>

          <button onClick={submit} disabled={loading} className="listing-card-btn listing-card-btn--dark w-full justify-center mt-5">
            {loading ? "Signing in…" : "Sign in to Admin"}
          </button>

          <button
            onClick={sendPasswordReset}
            disabled={loading}
            className="mt-4 w-full text-sm font-medium text-slate-700 hover:text-slate-950 transition disabled:opacity-60"
          >
            Forgot admin password? Send reset link
          </button>

          {msg ? <p className="status-message" role="alert">{msg}</p> : null}

          <div className="page-card rounded-2xl p-4 mt-5 text-sm text-slate-700">
            Admin account creation is restricted. Use an existing allowlisted admin account.
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <Link href="/admin" className="link-inline">Admin Dashboard</Link>
            <Link href="/" className="link-inline">Back to Directory</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

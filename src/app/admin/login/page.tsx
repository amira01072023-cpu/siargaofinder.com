"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Search, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

export default function AdminLoginPage() {
  const supabase = createClient();
  const router = useRouter();
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

    router.push(getSafeAdminRedirect());
    router.refresh();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06100f] text-slate-100 antialiased">
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-24 size-[28rem] rounded-full bg-emerald-500/[0.14] blur-[120px]" />
        <div className="absolute right-[-10rem] top-[-4rem] size-[32rem] rounded-full bg-amber-300/[0.12] blur-[130px]" />
        <div className="absolute bottom-[-15rem] left-[30%] size-[38rem] rounded-full bg-cyan-400/[0.08] blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <header className="relative z-20 border-b border-white/[0.08] bg-[#06100f]/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl border border-amber-200/20 bg-gradient-to-br from-amber-200/20 to-emerald-400/10 text-amber-200 shadow-[0_10px_30px_-12px_rgba(251,191,36,.8)]">
              <Search size={18} aria-hidden="true" />
            </span>
            <span>
              <span className="block font-semibold tracking-[-0.02em] text-white">SiargaoFinder</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-emerald-200/65">Admin workspace · v2</span>
            </span>
          </Link>
          <Link href="/" className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/[0.1] hover:text-white">
            <Home size={15} aria-hidden="true" />
            <span className="hidden sm:inline">View site</span>
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-65px)] max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,440px)] lg:py-16">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/15 bg-emerald-300/[0.08] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-200">
            <ShieldCheck size={13} aria-hidden="true" />
            Protected operations
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">Welcome back.</h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-400">
            Sign in with an authorized administrator account to review listings, process requests, and manage SiargaoFinder operations.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4 backdrop-blur-xl">
              <p className="text-xs font-medium text-slate-200">Private by default</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Admin routes and APIs require an approved account.</p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4 backdrop-blur-xl">
              <p className="text-xs font-medium text-slate-200">Directory operations</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">One workspace for moderation, content, and outreach.</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.065] p-6 shadow-[0_35px_100px_-50px_rgba(16,185,129,.65)] backdrop-blur-2xl sm:p-8">
          <div className="absolute -right-20 -top-24 size-56 rounded-full bg-amber-200/[0.1] blur-3xl" aria-hidden="true" />
          <div className="relative">
            <div className="mb-6 grid size-12 place-items-center rounded-2xl border border-amber-200/15 bg-amber-200/[0.08] text-amber-200">
              <ShieldCheck size={23} aria-hidden="true" />
            </div>
            <h2 className="text-xl font-semibold text-white">Admin sign in</h2>
            <p className="mt-1 text-sm text-slate-500">Use your allowlisted SiargaoFinder account.</p>

            <label className="mt-6 block">
              <span className="text-xs font-medium text-slate-300">Admin email</span>
              <input type="email" className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-amber-200/40 focus:ring-4 focus:ring-amber-200/[0.06]" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </label>

            <label className="mt-4 block">
              <span className="text-xs font-medium text-slate-300">Password</span>
              <input type="password" className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-amber-200/40 focus:ring-4 focus:ring-amber-200/[0.06]" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            </label>

            <button onClick={submit} disabled={loading} className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl border border-amber-100/20 bg-amber-200 px-4 text-sm font-semibold text-[#17201d] shadow-[0_14px_38px_-18px_rgba(251,191,36,.9)] transition hover:bg-amber-100 disabled:cursor-wait disabled:opacity-60">
              {loading ? "Signing in…" : "Sign in to admin"}
            </button>

            <button onClick={sendPasswordReset} disabled={loading} className="mt-4 w-full text-sm font-medium text-slate-400 transition hover:text-amber-100 disabled:opacity-60">
              Forgot password? Send reset link
            </button>

            {msg ? <p className="mt-5 rounded-xl border border-amber-200/15 bg-amber-200/[0.07] px-3 py-2.5 text-sm text-amber-100" role="alert">{msg}</p> : null}

            <p className="mt-6 border-t border-white/[0.08] pt-5 text-xs leading-5 text-slate-500">
              Account creation is restricted. Use an existing allowlisted administrator account.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

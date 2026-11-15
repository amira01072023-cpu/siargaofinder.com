// src/app/auth/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

const DEFAULT_AUTH_ORIGIN = "https://www.siargaofinder.com";

export default function AuthPage() {
const supabase = createClient();

function getSafeRedirect(fallback = "/") {
const params = new URLSearchParams(window.location.search);
const next = params.get("redirectedFrom");
return next && next.startsWith("/") && !next.startsWith("//") ? next : fallback;
}

function getAuthOrigin() {
const publicSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_AUTH_ORIGIN).replace(/\/$/, "");
const browserOrigin = window.location.origin;
const envIsLocalhost = publicSiteUrl ? /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(publicSiteUrl) : false;
const browserIsLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(browserOrigin);

if (publicSiteUrl && (!envIsLocalhost || browserIsLocalhost)) return publicSiteUrl;
return browserOrigin;
}

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [isSignUp, setIsSignUp] = useState(() => {
if (typeof window === "undefined") return true;
return !new URLSearchParams(window.location.search).get("redirectedFrom");
});
const [msg, setMsg] = useState(() => {
if (typeof window === "undefined") return "";
return new URLSearchParams(window.location.search).get("message") || "";
});
const [loading, setLoading] = useState(false);

function clearSupabaseBrowserState() {
try {
Object.keys(window.localStorage).forEach((key) => {
if (key.includes("supabase") || key.startsWith("sb-")) window.localStorage.removeItem(key);
});
} catch {}
try {
Object.keys(window.sessionStorage).forEach((key) => {
if (key.includes("supabase") || key.startsWith("sb-")) window.sessionStorage.removeItem(key);
});
} catch {}
}

const sendPasswordReset = async () => {
setMsg("");
if (!email) return setMsg("Enter your email first, then request a password reset link.");

setLoading(true);
const next = getSafeRedirect("/");
const authOrigin = getAuthOrigin();
const { error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: `${authOrigin}/auth/callback?redirectedFrom=${encodeURIComponent(`/auth/reset-password?redirectedFrom=${encodeURIComponent(next)}`)}`,
});
setLoading(false);

if (error) return setMsg(error.message);
return setMsg("Password reset email sent. Open the link in your email to set a new password.");
};

const submit = async () => {
setMsg("");
if (!email || !password) return setMsg("Email and password required.");

setLoading(true);

if (isSignUp) {
const authOrigin = getAuthOrigin();
const confirmationRedirect = `${authOrigin}/auth/callback`;
const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: confirmationRedirect,
  },
});

if (error) {
setLoading(false);
const m = (error.message || "").toLowerCase();

if (
m.includes("already registered") ||
m.includes("already exists") ||
m.includes("user already registered")
) {
setIsSignUp(false);
return setMsg("This email is already registered. Please sign in.");
}

return setMsg(error.message);
}

setLoading(false);
void fetch("/api/auth/signup-notification", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, redirectTo: confirmationRedirect }),
}).catch(() => {});
return setMsg("Account created. Check your email if confirmation is enabled.");
}

await supabase.auth.signOut();
clearSupabaseBrowserState();
const { error } = await supabase.auth.signInWithPassword({ email, password });
setLoading(false);
if (error) return setMsg(error.message);

window.location.href = getSafeRedirect("/");
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

<section className="page-section page-hero form-shell max-w-md">
<p className="page-kicker">Access</p>
<h1 className="page-title">Sign in / Sign up</h1>
<p className="page-subtitle">Use your email and password to access your SiargaoFinder account.</p>

<div className="page-card mt-8 p-6 md:p-8">
<label className="form-field">
  <span className="form-label">Email</span>
  <input type="email" className="form-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
</label>

<label className="form-field mt-3">
  <span className="form-label">Password</span>
  <input type="password" className="form-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
</label>

<div className="mt-5 flex flex-col gap-3">
  <button onClick={submit} disabled={loading} className="ui-btn ui-btn--dark w-full justify-center disabled:opacity-60">
    {loading ? "Please wait…" : isSignUp ? "Create account" : "Sign in"}
  </button>

  <button
    onClick={() => {
      setIsSignUp(!isSignUp);
      setMsg("");
    }}
    className="text-sm text-slate-600 hover:text-slate-900 transition"
  >
    {isSignUp ? "Already have account? Sign in" : "Need account? Sign up"}
  </button>

  {!isSignUp ? (
    <button
      onClick={sendPasswordReset}
      disabled={loading}
      className="text-sm font-medium text-slate-700 hover:text-slate-950 transition disabled:opacity-60"
    >
      Forgot password? Send reset link
    </button>
  ) : null}
</div>

{msg && <p className="status-message">{msg}</p>}
</div>
</section>
</main>
);
}

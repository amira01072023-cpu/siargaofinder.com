// src/app/auth/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Home } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import { createClient } from "@/lib/supabase-browser";

export default function AuthPage() {
const supabase = createClient();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [isSignUp, setIsSignUp] = useState(true);
const [msg, setMsg] = useState("");

const submit = async () => {
setMsg("");
if (!email || !password) return setMsg("Email and password required.");

if (isSignUp) {
const { error } = await supabase.auth.signUp({ email, password });

if (error) {
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

return setMsg("Account created. Check your email if confirmation is enabled.");
}

const { error } = await supabase.auth.signInWithPassword({ email, password });
if (error) return setMsg(error.message);

const normalized = email.trim().toLowerCase();
if (normalized === "amira.01072023@gmail.com") {
window.location.href = "/admin";
return;
}

const params = new URLSearchParams(window.location.search);
const next = params.get("redirectedFrom") || "/";
window.location.href = next;
};

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
<div className="max-w-md mx-auto mt-12 bg-white border rounded-xl p-6">
<h1 className="text-2xl font-bold mb-2">Sign in / Sign up</h1>
<p className="text-sm text-slate-500 mb-6">Use your email and password.</p>

<input
type="email"
className="w-full border rounded-lg px-3 py-2 mb-3"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>

<input
type="password"
className="w-full border rounded-lg px-3 py-2 mb-3"
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>

<button
onClick={submit}
className="w-full bg-yellow-400 text-black py-2 rounded-lg hover:bg-yellow-300"
>
{isSignUp ? "Create account" : "Sign in"}
</button>

<button
onClick={() => {
setIsSignUp(!isSignUp);
setMsg("");
}}
className="w-full mt-3 text-sm text-yellow-300"
>
{isSignUp ? "Already have account? Sign in" : "Need account? Sign up"}
</button>

{msg && <p className="mt-4 text-sm text-red-600">{msg}</p>}
</div>
</section>

<SiteFooter />
</main>
);
}
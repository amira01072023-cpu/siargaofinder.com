import Link from "next/link";
import type { ReactNode } from "react";

type LegalLayoutProps = {
title: string;
lastUpdated?: string;
children: ReactNode;
};

export default function LegalLayout({
title,
lastUpdated = "7 March 2026",
children,
}: LegalLayoutProps) {
return (
<main className="min-h-screen bg-[#f8fafc] text-slate-800">
<header className="bg-white border-b border-slate-200 sticky top-0 z-20">
<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
<Link className="font-bold text-lg tracking-tight" href="/">
Siargao Finder
</Link>
<Link className="text-sm text-amber-700 hover:underline" href="/">
← Back to Home
</Link>
</div>
</header>

<section className="max-w-4xl mx-auto px-4 py-10">
<article className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
<h1 className="text-3xl font-extrabold text-slate-900">{title}</h1>
<p className="mt-2 text-sm text-slate-500">
<strong>Last Updated:</strong> {lastUpdated}
</p>

<div className="mt-6 space-y-4">{children}</div>
</article>
</section>
</main>
);
}
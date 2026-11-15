import type { ReactNode } from "react";
import PublicSiteHeader from "@/components/PublicSiteHeader";

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
<main className="page-shell">
<PublicSiteHeader showBlogLink showListYourBusinessLink homeLabel="Home" />

<section className="page-section page-hero max-w-4xl">
<p className="page-kicker">Legal & Policy</p>
<h1 className="page-title">{title}</h1>
<p className="page-subtitle">
Last updated: {lastUpdated}
</p>

<article className="page-card mt-8 p-6 md:p-8">
<div className="prose prose-slate max-w-none prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700 prose-a:text-slate-900 hover:prose-a:text-slate-700">
{children}
</div>
</article>
</section>
</main>
);
}

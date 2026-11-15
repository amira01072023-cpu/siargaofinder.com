import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Top Local Businesses in Siargao (Updated 2026)",
  description:
    "Explore standout local businesses in Siargao across food, surf, tours, transport, wellness, and more.",
  alternates: {
    canonical: "/guide/top-local-businesses-in-siargao",
  },
};

export default function TopLocalBusinessesInSiargaoPage() {
  const siteUrl = getSiteUrl();
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Top Local Businesses in Siargao',
    description: 'Explore standout local businesses in Siargao across food, surf, tours, transport, wellness, and more.',
    author: { '@type': 'Organization', name: 'Siargao Finder' },
    publisher: { '@type': 'Organization', name: 'Siargao Finder' },
    mainEntityOfPage: `${siteUrl}/guide/top-local-businesses-in-siargao`,
  };
  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="page-section page-hero max-w-4xl">
        <p className="page-kicker">Guide</p>
        <h1 className="page-title">Top Local Businesses in Siargao</h1>
        <p className="page-subtitle guide-body">
          This page highlights notable local businesses across Siargao’s most searched categories. Use it as a quick
          starting point to discover trusted options and continue to detailed listings for direct contact information.
        </p>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best for</span>
            <p className="guide-highlight-value">First-time visitors who want a fast shortlist across multiple categories.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Start with</span>
            <p className="guide-highlight-value">Food, surf, transport, and tours—then narrow by municipality.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Smart move</span>
            <p className="guide-highlight-value">Save promising listings early so your best options stay organized.</p>
          </div>
        </div>

        <div className="mt-8 space-y-5 guide-body">
          <p>
            For the best experience, filter by category first, then narrow down by municipality. This approach helps
            you find options that are both relevant and logistically convenient.
          </p>
          <p>
            If your plans include multiple activities—surfing, island hopping, coworking, and dining—save shortlisted
            listings early to avoid availability gaps in high season.
          </p>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Before you choose</h2>
          <div className="guide-checklist">
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Check which municipality makes the most sense for your schedule and transport plan.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Prioritize listings with direct phone numbers or websites if you need fast confirmation.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Open detail pages for your strongest options and compare them before committing.</span></div>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Explore Related Pages</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/category/food-chains-and-restaurants">Food Chains & Restaurants in Siargao</Link></li>
            <li><Link href="/category/surf-schools-and-rentals">Surf Schools & Rentals in Siargao</Link></li>
            <li><Link href="/category/tours-and-island-hopping">Tours & Island Hopping in Siargao</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

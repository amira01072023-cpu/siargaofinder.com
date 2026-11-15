import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Where to Find Services in Siargao",
  description:
    "A practical guide to finding reliable services in Siargao, from transport and wellness to essentials and business support.",
  alternates: {
    canonical: "/guide/where-to-find-services-in-siargao",
  },
};

export default function WhereToFindServicesInSiargaoPage() {
  const siteUrl = getSiteUrl();
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Where to Find Services in Siargao',
    description: 'A practical guide to finding reliable services in Siargao, from transport and wellness to essentials and business support.',
    author: { '@type': 'Organization', name: 'Siargao Finder' },
    publisher: { '@type': 'Organization', name: 'Siargao Finder' },
    mainEntityOfPage: `${siteUrl}/guide/where-to-find-services-in-siargao`,
  };
  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="page-section page-hero max-w-4xl">
        <p className="page-kicker">Guide</p>
        <h1 className="page-title">Where to Find Services in Siargao</h1>
        <p className="page-subtitle guide-body">
          Whether you are visiting short-term or staying longer, knowing where to find reliable services in Siargao
          saves time and avoids last-minute stress. This guide helps you navigate the island’s key service categories.
        </p>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best for</span>
            <p className="guide-highlight-value">Visitors and longer-stay guests trying to solve practical day-to-day needs fast.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Focus on</span>
            <p className="guide-highlight-value">Proximity, responsiveness, and whether the provider matches your exact service need.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Useful habit</span>
            <p className="guide-highlight-value">Bookmark repeat-use services early so you are not searching again under time pressure.</p>
          </div>
        </div>

        <div className="mt-8 space-y-5 guide-body">
          <p>
            Start by identifying your base area (for example General Luna, Dapa, or Del Carmen), then shortlist providers
            based on proximity, contact responsiveness, and category relevance.
          </p>
          <p>
            For recurring needs—transport, wellness, essentials, and business support—bookmark trusted listings and
            confirm operating hours in advance, especially during holidays and peak tourist periods.
          </p>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Before you choose</h2>
          <div className="guide-checklist">
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Start with your municipality so you avoid wasting time on options that are too far away.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Use listings with direct contact details when timing matters or availability may change quickly.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>For repeat needs, keep a shortlist of providers you would actually use again.</span></div>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Explore Related Pages</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/category/transport-rentals">Transport Rentals in Siargao</Link></li>
            <li><Link href="/category/essentials-and-services">Essentials & Services in Siargao</Link></li>
            <li><Link href="/municipality/general-luna">Businesses in General Luna</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

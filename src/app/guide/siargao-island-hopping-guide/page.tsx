import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Siargao Island Hopping Guide",
  description:
    "Plan your Siargao island hopping with practical tips, route ideas, and local operator options.",
  alternates: {
    canonical: "/guide/siargao-island-hopping-guide",
  },
};

export default function SiargaoIslandHoppingGuidePage() {
  const siteUrl = getSiteUrl();
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Siargao Island Hopping Guide',
    description: 'Plan your Siargao island hopping with practical tips, route ideas, and local operator options.',
    author: { '@type': 'Organization', name: 'Siargao Finder' },
    publisher: { '@type': 'Organization', name: 'Siargao Finder' },
    mainEntityOfPage: `${siteUrl}/guide/siargao-island-hopping-guide`,
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${siteUrl}/guide/siargao-island-hopping-guide` },
      { '@type': 'ListItem', position: 3, name: 'Siargao Island Hopping Guide', item: `${siteUrl}/guide/siargao-island-hopping-guide` },
    ],
  };
  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="page-section page-hero max-w-4xl">
        <p className="page-kicker">Guide</p>
        <h1 className="page-title">Siargao Island Hopping Guide</h1>
        <p className="page-subtitle guide-body">
          Island hopping is one of the most searched activities in Siargao. This guide helps you plan routes,
          compare operator options, and book with clearer expectations for timing and inclusions.
        </p>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best for</span>
            <p className="guide-highlight-value">Travelers comparing operators, inclusions, and the easiest route planning decisions.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Compare by</span>
            <p className="guide-highlight-value">Departure point, private vs shared format, inclusions, and weather flexibility.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Avoid</span>
            <p className="guide-highlight-value">Last-minute booking confusion by checking fees, stop coverage, and reconfirmation timing.</p>
          </div>
        </div>

        <div className="mt-8 space-y-5 guide-body">
          <p>
            Start by checking operator coverage, departure points, and group vs private trip formats.
            If you travel during busy months, reserve early and reconfirm the day-before schedule,
            weather conditions, and included stops.
          </p>
          <p>
            For smoother trips, confirm whether meals, environmental fees, and transfer logistics are included.
            Use verified listing contacts to avoid outdated pricing and last-minute confusion.
          </p>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Before you choose</h2>
          <div className="guide-checklist">
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Decide whether shared or private island hopping fits your timing, group size, and budget.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Confirm what the rate includes so environmental fees, food, or transfers do not become surprise costs.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Reconfirm close to departure when weather or sea conditions could change the route.</span></div>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Explore Related Pages</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/category/tours-and-island-hopping">Tours & Island Hopping in Siargao</Link></li>
            <li><Link href="/municipality/del-carmen">Businesses in Del Carmen</Link></li>
            <li><Link href="/guide/siargao-surf-schools-guide">Siargao Surf Schools Guide</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

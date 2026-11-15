import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Siargao Transport Guide: Scooters, Transfers & Local Options",
  description:
    "Learn how to get around Siargao with practical transport options including scooter rentals, vans, and local rides.",
  alternates: {
    canonical: "/guide/siargao-transport-guide",
  },
};

export default function SiargaoTransportGuidePage() {
  const siteUrl = getSiteUrl();
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Siargao Transport Guide',
    description: 'Learn how to get around Siargao with practical transport options including scooter rentals, vans, and local rides.',
    author: { '@type': 'Organization', name: 'Siargao Finder' },
    publisher: { '@type': 'Organization', name: 'Siargao Finder' },
    mainEntityOfPage: `${siteUrl}/guide/siargao-transport-guide`,
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${siteUrl}/guide/siargao-transport-guide` },
      { '@type': 'ListItem', position: 3, name: 'Siargao Transport Guide', item: `${siteUrl}/guide/siargao-transport-guide` },
    ],
  };
  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="page-section page-hero max-w-4xl">
        <p className="page-kicker">Guide</p>
        <h1 className="page-title">Siargao Transport Guide</h1>
        <p className="page-subtitle guide-body">
          Getting around Siargao is easier when you understand your transport options. This guide covers scooters,
          van transfers, and local ride choices for short visits and longer stays.
        </p>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best for</span>
            <p className="guide-highlight-value">Visitors comparing scooters, arrivals transfers, and practical local movement.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Usually best</span>
            <p className="guide-highlight-value">Scooters for flexibility, transfers for arrivals, groups, and weather-sensitive days.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Check first</span>
            <p className="guide-highlight-value">Pricing, inclusions, pickup logistics, and availability during rain or peak season.</p>
          </div>
        </div>

        <div className="mt-8 space-y-5 guide-body">
          <p>
            Scooters are the most flexible option for many travelers, especially around General Luna and nearby towns.
            For airport/ferry arrivals or group travel, private and shared transfers are often more convenient.
          </p>
          <p>
            Before booking, confirm driver availability, fuel/helmet inclusions, pickup points, and total pricing.
            During rain or peak days, pre-booking transport can prevent delays.
          </p>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Before you choose</h2>
          <div className="guide-checklist">
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Match the transport type to your trip: scooters for freedom, transfers for convenience, drivers for group logistics.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Confirm what is included so there are no surprises around fuel, helmets, luggage, or waiting time.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Pre-book when arrival timing matters or weather may reduce same-day options.</span></div>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Explore Related Pages</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/category/transport-rentals">Transport Services in Siargao</Link></li>
            <li><Link href="/municipality/dapa">Businesses in Dapa</Link></li>
            <li><Link href="/guide/siargao-island-hopping-guide">Siargao Island Hopping Guide</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

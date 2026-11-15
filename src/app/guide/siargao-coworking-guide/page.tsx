import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Siargao Coworking Guide for Remote Workers",
  description:
    "Find coworking spaces and remote-work friendly spots in Siargao with tips on Wi-Fi, location, and productivity setup.",
  alternates: {
    canonical: "/guide/siargao-coworking-guide",
  },
};

export default function SiargaoCoworkingGuidePage() {
  const siteUrl = getSiteUrl();
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Siargao Coworking Guide for Remote Workers',
    description: 'Find coworking spaces and remote-work friendly spots in Siargao with tips on Wi-Fi, location, and productivity setup.',
    author: { '@type': 'Organization', name: 'Siargao Finder' },
    publisher: { '@type': 'Organization', name: 'Siargao Finder' },
    mainEntityOfPage: `${siteUrl}/guide/siargao-coworking-guide`,
  };
  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="page-section page-hero max-w-4xl">
        <p className="page-kicker">Guide</p>
        <h1 className="page-title">Siargao Coworking Guide</h1>
        <p className="page-subtitle guide-body">
          Siargao is becoming a strong base for remote workers. This guide helps you choose coworking and
          work-friendly spaces based on internet reliability, location, and day-to-day comfort.
        </p>

        <div className="mt-8 space-y-5 guide-body">
          <p>
            When choosing a workspace, prioritize stable internet, backup power readiness, and seating setup.
            If you take calls regularly, check whether the space has quiet zones or meeting options.
          </p>
          <p>
            Balance productivity with convenience by selecting spaces near your accommodation and transport routes.
            Verify opening times and pass options before committing to weekly or monthly plans.
          </p>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Explore Related Pages</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/municipality/general-luna">Businesses in General Luna</Link></li>
            <li><Link href="/guide/where-to-find-services-in-siargao">Where to Find Services in Siargao</Link></li>
            <li><Link href="/guide/siargao-transport-guide">Siargao Transport Guide</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

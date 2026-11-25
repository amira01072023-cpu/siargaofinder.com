import type { Metadata } from "next";
import Link from "next/link";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import { getSiteUrl } from "@/lib/site-url";
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Siargao Surf Schools Guide (Beginner to Advanced)",
  description:
    "Compare Siargao surf schools and lesson options by experience level, location, and learning goals.",
  alternates: {
    canonical: "/guide/siargao-surf-schools-guide",
  },
  openGraph: {
    title: "Siargao Surf Schools Guide (Beginner to Advanced)",
    description: "Compare Siargao surf schools and lesson options by experience level, location, and learning goals.",
    url: "https://www.siargaofinder.com/guide/siargao-surf-schools-guide",
    type: "article",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siargao Surf Schools Guide (Beginner to Advanced)",
    description: "Compare Siargao surf schools and lesson options by experience level, location, and learning goals.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
};

export default function SiargaoSurfSchoolsGuidePage() {
  const siteUrl = getSiteUrl();
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Siargao Surf Schools Guide (Beginner to Advanced)",
    description: "Compare Siargao surf schools and lesson options by experience level, location, and learning goals.",
    mainEntityOfPage: `${siteUrl}/guide/siargao-surf-schools-guide`,
    image: [`${siteUrl}${DEFAULT_SOCIAL_IMAGE.url}`],
    author: { "@type": "Organization", name: "Siargao Finder" },
    publisher: { "@type": "Organization", name: "Siargao Finder" },
  };

  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <PublicSiteHeader showBlogLink={false} showListYourBusinessLink homeLabel="Home" />
      <section className="page-section page-hero max-w-4xl">
        <p className="page-kicker">Guide</p>
        <h1 className="page-title">Siargao Surf Schools Guide</h1>
        <p className="page-subtitle guide-body">
          Choosing the right surf school can shape your entire Siargao experience. This guide helps you compare
          schools based on skill level support, location, coaching style, and lesson structure.
        </p>

        <div className="mt-8 space-y-5 guide-body">
          <p>
            Beginners should prioritize schools that offer clear safety orientation, soft-landing spots,
            and patient coaching progression. Intermediate and advanced surfers can focus on schedule flexibility,
            spot access, and instructor specialization.
          </p>
          <p>
            Before booking, check listing contact details and confirm inclusions like board rental,
            rash guards, transport, and lesson duration. Seasonal wave conditions can also influence
            the best school choice during your stay.
          </p>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Explore Related Pages</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/category/surf-schools-and-rentals">Surf Schools & Rentals in Siargao</Link></li>
            <li><Link href="/municipality/general-luna">Businesses in General Luna</Link></li>
            <li><Link href="/guide/siargao-island-hopping-guide">Siargao Island Hopping Guide</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

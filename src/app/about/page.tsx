import type { Metadata } from "next";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import { getSiteUrl } from "@/lib/site-url";
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "About Siargao Finder",
  description:
    "Learn how Siargao Finder builds its independent local directory, reviews public listing information, and helps people discover Siargao businesses.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Siargao Finder",
    description:
      "Learn how Siargao Finder builds its independent local directory, reviews public listing information, and helps people discover Siargao businesses.",
    url: "https://www.siargaofinder.com/about",
    type: "website",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
};

export default function AboutPage() {
  const siteUrl = getSiteUrl();

  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Siargao Finder",
    url: `${siteUrl}/about`,
    description:
      "Siargao Finder is an independent hobby website built to help people discover local businesses and help business owners become easier to find online.",
  };

  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />

      <PublicSiteHeader showListYourBusinessLink homeLabel="Home" />

      <section className="page-section page-hero max-w-4xl">
        <p className="page-kicker">About</p>
        <h1 className="page-title">About Siargao Finder</h1>
        <p className="page-subtitle">
          Siargao Finder is an independent directory project built to make local businesses in Siargao easier to find,
          understand, and contact.
        </p>
      </section>

      <section className="page-section max-w-4xl pt-0">
        <div className="guide-surface p-6 md:p-8 space-y-8 guide-body">
          <section>
            <h2 className="section-title text-[1.45rem]">What Siargao Finder is</h2>
            <p className="mt-4">
              Siargao Finder is a practical local directory focused on helping people discover businesses, services,
              suppliers, and useful local contacts across Siargao.
            </p>
            <p className="mt-4">
              The goal is simple: make it easier for people to find reliable business information, and make it easier
              for local businesses to be discovered.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.45rem]">Our current model</h2>
            <p className="mt-4">
              <strong>We do not accept payments for listings.</strong>
            </p>
            <p className="mt-4">
              At this stage, listings on Siargao Finder are <strong>free</strong>. We do not charge listing fees, we do
              not sell paid placements, and we do not currently offer sponsored ranking positions.
            </p>
            <p className="mt-4">
              If a business appears on the site, that does not mean it paid to be there. The directory is being built as
              an informational resource first.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.45rem]">Why this exists</h2>
            <p className="mt-4">
              Many useful businesses in Siargao are hard to find, difficult to verify, or scattered across Facebook
              pages, map listings, old posts, and informal recommendations.
            </p>
            <p className="mt-4">
              Siargao Finder exists to organize that information into a more usable directory so that visitors,
              residents, and business owners can benefit from clearer visibility and easier discovery.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.45rem]">A professional but small-scale project</h2>
            <p className="mt-4">
              Siargao Finder is currently a <strong>hobby website</strong> and an independent project. That means it is
              being built carefully and seriously, but it is not presented as a large corporate platform.
            </p>
            <p className="mt-4">
              We still aim to keep the directory professional, useful, and trustworthy. That includes improving listing
              quality, reducing duplicates, correcting location details, and updating business information where
              possible.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.45rem]">What we try to do well</h2>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Make local businesses easier to discover</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Improve listing accuracy over time</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Keep the directory practical instead of cluttered</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Help business owners get found without charging for basic visibility</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Build a more useful local discovery tool for Siargao</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.45rem]">How listings are added</h2>
            <p className="mt-4">
              Listings may be added through public business information, owner submissions, directory research, and
              ongoing verification work. The purpose is to build a directory that is useful, practical, and easier to
              navigate than scattered posts or outdated references.
            </p>
            <p className="mt-4">
              We may review, standardize, or organize business details before publishing them so the directory stays more
              consistent and easier for users to browse.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.45rem]">How corrections work</h2>
            <p className="mt-4">
              If a listing is inaccurate, outdated, duplicated, or missing important details, corrections can be sent to
              us for review. This includes address updates, contact changes, municipality corrections, duplicate flags,
              or requests to review business status.
            </p>
            <p className="mt-4">
              Our aim is not to keep a static list, but to improve directory quality over time through verification and
              practical cleanup.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.45rem]">Why listings are free</h2>
            <p className="mt-4">
              Siargao Finder is currently focused on usefulness, discoverability, and data quality rather than charging
              businesses for inclusion. Keeping listings free helps lower friction for local businesses and keeps the
              project aligned with its current purpose as an independent directory resource.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.45rem]">About listing accuracy</h2>
            <p className="mt-4">
              We work to keep listings useful and accurate, but business details can change. Addresses, contact numbers,
              operating status, and pages may be updated by the business or change over time.
            </p>
            <p className="mt-4">
              If you see a listing that is outdated, incomplete, duplicated, or incorrect, corrections are welcome.
              The directory improves through continuous review and verification.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.45rem]">Who this is for</h2>
            <p className="mt-4">
              Siargao Finder is for people trying to find businesses more easily, and for business owners who want to be
              easier to discover without dealing with unnecessary friction.
            </p>
            <p className="mt-4">
              The project is especially focused on practical local discovery: services, suppliers, transport, food,
              shops, health-related businesses, and other useful categories across Siargao municipalities.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.45rem]">Contact</h2>
            <p className="mt-4">
              For listing corrections, questions, or general contact, use our {" "}
              <a className="text-amber-700 hover:underline" href="/contact">
                contact and support page
              </a>.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}

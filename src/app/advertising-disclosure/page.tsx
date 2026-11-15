import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: { absolute: "Advertising Disclosure | Siargao Finder" },
  description:
    "Advertising and sponsorship disclosure for Siargao Finder, including current listing and placement practices.",
  alternates: {
    canonical: "/advertising-disclosure",
  },
};

export default function AdvertisingDisclosurePage() {
  return (
    <LegalLayout title="Advertising Disclosure">
      <p>
        This page explains how Siargao Finder handles advertising, sponsorship, and directory placement so readers and
        businesses understand how the site operates.
      </p>

      <h2 className="mt-8 text-xl font-bold">Current Advertising Status</h2>
      <p>
        Siargao Finder does not currently run third-party display ads, sponsored-link widgets, popunders, social bars,
        or ad-network scripts. The cookie preference banner controls optional analytics only.
      </p>

      <h2 className="mt-8 text-xl font-bold">Directory Listings</h2>
      <p>
        Basic business listings are currently free. Siargao Finder does not currently accept payment for guaranteed
        inclusion, paid ranking, or paid approval of submitted listings.
      </p>

      <h2 className="mt-8 text-xl font-bold">Sponsored Content</h2>
      <p>
        Siargao Finder does not currently publish sponsored content. If this changes, paid or sponsored material will be
        clearly identified and kept separate from directory review and ranking decisions.
      </p>

      <h2 className="mt-8 text-xl font-bold">Editorial Separation</h2>
      <p>
        Directory cleanup, duplicate review, claim review, and listing quality improvements are handled separately from
        commercial decisions. Future advertising or sponsorship will not change whether a listing is accurate, claimed,
        verified, or appropriate for publication.
      </p>
    </LegalLayout>
  );
}

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
        Siargao Finder uses third-party advertising networks on public pages. The advertising scripts are disabled until
        a visitor accepts optional analytics and advertising through the cookie preference banner. It is not loaded in
        the protected admin workspace.
      </p>
      <p className="mt-3">
        Depending on the visitor, device, location, and interaction, the network may display or open promotional content,
        including a pop-under or a separate advertising page after a click or touch. Advertising destinations are selected
        and delivered by the third-party networks and may change over time.
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

      <h2 className="mt-8 text-xl font-bold">Advertising Privacy</h2>
      <p>
        The advertising providers and their delivery partners may use cookies, device or browser information, IP address,
        referrer information, and interaction data under their own privacy practices after consent. Visitors can reject
        non-essential processing in the cookie preference banner.
      </p>
    </LegalLayout>
  );
}

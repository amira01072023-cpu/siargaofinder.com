import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: { absolute: "Editorial Policy | Siargao Finder" },
  description:
    "How Siargao Finder researches, writes, reviews, and updates local directory content and Siargao travel guides.",
  alternates: {
    canonical: "/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <LegalLayout title="Editorial Policy">
      <p>
        Siargao Finder publishes practical directory pages and local guides to help visitors, residents, and business
        owners find useful Siargao information. This policy explains how we approach content quality, accuracy, and
        updates.
      </p>

      <h2 className="mt-8 text-xl font-bold">Independent Content</h2>
      <p>
        Siargao Finder is an independent directory project. At this stage, listings are free and we do not sell paid
        ranking positions or sponsored placement in the directory.
      </p>

      <h2 className="mt-8 text-xl font-bold">Research and Sources</h2>
      <p>
        Directory and guide content may be based on public business information, official websites, official social
        pages, map listings, owner submissions, local category research, and direct corrections submitted through the
        site.
      </p>

      <h2 className="mt-8 text-xl font-bold">Accuracy and Updates</h2>
      <p>
        Business details can change quickly in Siargao. We review corrections, duplicate flags, claim requests, and
        owner submissions to improve listing accuracy over time. Pages may be updated when better information becomes
        available.
      </p>

      <h2 className="mt-8 text-xl font-bold">AI Assistance</h2>
      <p>
        Some drafting, formatting, categorization, or cleanup work may be AI-assisted, but editorial judgment and site
        structure remain under human control. We do not intentionally publish content that is purely automated,
        misleading, or unrelated to Siargao Finder&apos;s directory purpose.
      </p>

      <h2 className="mt-8 text-xl font-bold">Corrections</h2>
      <p>
        If you see inaccurate, outdated, duplicated, or unsafe information, please use the{" "}
        <Link className="text-amber-700 hover:underline" href="/contact">
          contact and support page
        </Link>{" "}
        or the reporting forms linked in the footer.
      </p>
    </LegalLayout>
  );
}

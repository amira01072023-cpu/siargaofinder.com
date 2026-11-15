import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: { absolute: "Directory Standards | Siargao Finder" },
  description:
    "How Siargao Finder reviews listings, handles claims, reduces duplicates, and keeps the Siargao directory useful.",
  alternates: {
    canonical: "/directory-standards",
  },
};

export default function DirectoryStandardsPage() {
  return (
    <LegalLayout title="Directory Standards">
      <p>
        Siargao Finder is built as a practical local directory. These standards explain how listings are reviewed,
        organized, and improved so the site remains useful to readers and fair to local businesses.
      </p>

      <h2 className="mt-8 text-xl font-bold">Listing Review</h2>
      <p>
        Public business submissions are checked before publication. Guest submissions require email verification before
        they enter the admin review queue, and review actions include approve, reject, duplicate, or request more
        information.
      </p>

      <h2 className="mt-8 text-xl font-bold">Duplicate and Low-Quality Listings</h2>
      <p>
        We use duplicate checks and admin cleanup tools to reduce repeated, incomplete, or misleading entries. Listings
        with missing phone, email, website, address, services, or verification details may be prioritized for cleanup.
      </p>

      <h2 className="mt-8 text-xl font-bold">Claims and Ownership</h2>
      <p>
        Business owners can submit a claim request for an existing listing. Claims require a valid email address and may
        include optional proof, such as a business website, official social profile, or other evidence.
      </p>

      <h2 className="mt-8 text-xl font-bold">No Paid Ranking</h2>
      <p>
        Siargao Finder does not currently sell paid listing placement, sponsored ranking, or paid review outcomes.
        Listings are organized for usefulness, relevance, category context, and data quality.
      </p>

      <h2 className="mt-8 text-xl font-bold">Corrections and Reports</h2>
      <p>
        To request a listing correction, claim a business, or report unsafe content, start from the{" "}
        <Link className="text-amber-700 hover:underline" href="/contact">
          contact page
        </Link>
        .
      </p>
    </LegalLayout>
  );
}

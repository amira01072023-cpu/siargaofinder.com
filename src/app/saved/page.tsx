import type { Metadata } from "next";
import Link from "next/link";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import SavedListingsPanel from "@/components/SavedListingsPanel";

export const metadata: Metadata = {
  title: "Saved Listings | Siargao Finder",
  description: "Your saved Siargao businesses, stored privately in this browser for quick return visits.",
  alternates: { canonical: "/saved" },
  robots: { index: false, follow: true },
};

export default function SavedPage() {
  return (
    <main className="page-shell">
      <PublicSiteHeader />
      <section className="page-section page-hero">
        <p className="page-kicker">Your shortlist</p>
        <h1 className="page-title">Saved Listings</h1>
        <p className="page-subtitle">Businesses you save are stored only in this browser. No account is needed.</p>
        <div className="mt-8">
          <SavedListingsPanel />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/#directory" className="ui-btn ui-btn--dark">Search the directory</Link>
          <Link href="/#categories" className="ui-btn ui-btn--soft">Browse categories</Link>
        </div>
      </section>
    </main>
  );
}

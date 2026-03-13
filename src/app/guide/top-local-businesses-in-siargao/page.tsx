import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Top Local Businesses in Siargao (Updated 2026) | Siargao Finder",
  description:
    "Explore standout local businesses in Siargao across food, surf, tours, transport, wellness, and more.",
  alternates: {
    canonical: "/guide/top-local-businesses-in-siargao",
  },
};

export default function TopLocalBusinessesInSiargaoPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800">
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-10">
        <p className="text-sm text-slate-500">Guide • Siargao Finder</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">Top Local Businesses in Siargao</h1>
        <p className="mt-4 text-slate-700 leading-7">
          This page highlights notable local businesses across Siargao’s most searched categories. Use it as a quick
          starting point to discover trusted options and continue to detailed listings for direct contact information.
        </p>

        <div className="mt-8 space-y-5 leading-7 text-slate-700">
          <p>
            For the best experience, filter by category first, then narrow down by municipality. This approach helps
            you find options that are both relevant and logistically convenient.
          </p>
          <p>
            If your plans include multiple activities—surfing, island hopping, coworking, and dining—save shortlisted
            listings early to avoid availability gaps in high season.
          </p>
        </div>

        <div className="mt-10 rounded-xl border bg-white p-5">
          <h2 className="text-xl font-bold">Explore Related Pages</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-amber-800">
            <li>
              <Link className="hover:underline" href="/category/cafes-restaurants">
                Cafes & Restaurants in Siargao
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/category/surf-schools-rentals">
                Surf Schools & Rentals in Siargao
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/category/tours-island-hopping">
                Tours & Island Hopping in Siargao
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

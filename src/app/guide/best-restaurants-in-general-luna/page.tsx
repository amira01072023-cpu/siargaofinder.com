import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Best Restaurants in General Luna, Siargao | Siargao Finder",
  description:
    "Explore top restaurants in General Luna with local recommendations for casual meals, date nights, and group dining.",
  alternates: {
    canonical: "/guide/best-restaurants-in-general-luna",
  },
};

export default function BestRestaurantsInGeneralLunaPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800">
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-10">
        <p className="text-sm text-slate-500">Guide • Siargao Finder</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">Best Restaurants in General Luna</h1>
        <p className="mt-4 text-slate-700 leading-7">
          General Luna offers one of the widest food selections in Siargao. This guide helps you shortlist
          restaurant options for different tastes, budgets, and dining styles—whether you want quick local meals,
          relaxed dinners, or group-friendly spots.
        </p>

        <div className="mt-8 space-y-5 leading-7 text-slate-700">
          <p>
            For first-time visitors, start with restaurants near central General Luna to reduce travel time.
            If you are traveling in groups, look for listings with direct contact details so reservations and
            menu confirmations are easier before arrival.
          </p>
          <p>
            Restaurant availability can shift during high season and weather changes, so checking listing pages
            for current details is recommended before finalizing plans.
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
              <Link className="hover:underline" href="/city/general-luna">
                Businesses in General Luna
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/guide/best-cafes-in-siargao">
                Best Cafes in Siargao
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

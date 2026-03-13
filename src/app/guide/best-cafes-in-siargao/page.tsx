import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Best Cafes in Siargao (2026 Guide) | Siargao Finder",
  description:
    "Discover the best cafes in Siargao, from popular coffee spots to quiet work-friendly places, with local tips and practical info.",
  alternates: {
    canonical: "/guide/best-cafes-in-siargao",
  },
};

export default function BestCafesInSiargaoPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800">
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-10">
        <p className="text-sm text-slate-500">Guide • Siargao Finder</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">Best Cafes in Siargao (2026 Guide)</h1>
        <p className="mt-4 text-slate-700 leading-7">
          From specialty coffee to beachfront brunch spots, Siargao has a cafe scene worth exploring.
          Use this guide to discover cafe options by vibe, location, and practical needs like Wi-Fi,
          seating comfort, and proximity to your stay.
        </p>

        <div className="mt-8 space-y-5 leading-7 text-slate-700">
          <p>
            If you are staying around General Luna, start with cafes that open early and have reliable coffee quality.
            For remote work days, prioritize places with stable internet, charging access, and quieter seating.
            For sunset sessions, look for cafes near beachfront routes and main roads for easier transport.
          </p>
          <p>
            Before visiting, check listing details for updated contact information and location context.
            Some places are seasonal or adjust operating hours during peak surf and tourism periods.
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
              <Link className="hover:underline" href="/guide/best-restaurants-in-general-luna">
                Best Restaurants in General Luna
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Siargao Transport Guide: Scooters, Transfers & Local Options | Siargao Finder",
  description:
    "Learn how to get around Siargao with practical transport options including scooter rentals, vans, and local rides.",
  alternates: {
    canonical: "/guide/siargao-transport-guide",
  },
};

export default function SiargaoTransportGuidePage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800">
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-10">
        <p className="text-sm text-slate-500">Guide • Siargao Finder</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">Siargao Transport Guide</h1>
        <p className="mt-4 text-slate-700 leading-7">
          Getting around Siargao is easier when you understand your transport options. This guide covers scooters,
          van transfers, and local ride choices for short visits and longer stays.
        </p>

        <div className="mt-8 space-y-5 leading-7 text-slate-700">
          <p>
            Scooters are the most flexible option for many travelers, especially around General Luna and nearby towns.
            For airport/ferry arrivals or group travel, private and shared transfers are often more convenient.
          </p>
          <p>
            Before booking, confirm driver availability, fuel/helmet inclusions, pickup points, and total pricing.
            During rain or peak days, pre-booking transport can prevent delays.
          </p>
        </div>

        <div className="mt-10 rounded-xl border bg-white p-5">
          <h2 className="text-xl font-bold">Explore Related Pages</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-amber-800">
            <li>
              <Link className="hover:underline" href="/category/transport">
                Transport Services in Siargao
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/city/dapa">
                Businesses in Dapa
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/guide/siargao-island-hopping-guide">
                Siargao Island Hopping Guide
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

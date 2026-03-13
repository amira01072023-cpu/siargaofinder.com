import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Where to Find Services in Siargao | Siargao Finder",
  description:
    "A practical guide to finding reliable services in Siargao, from transport and wellness to essentials and business support.",
  alternates: {
    canonical: "/guide/where-to-find-services-in-siargao",
  },
};

export default function WhereToFindServicesInSiargaoPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800">
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-10">
        <p className="text-sm text-slate-500">Guide • Siargao Finder</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">Where to Find Services in Siargao</h1>
        <p className="mt-4 text-slate-700 leading-7">
          Whether you are visiting short-term or staying longer, knowing where to find reliable services in Siargao
          saves time and avoids last-minute stress. This guide helps you navigate the island’s key service categories.
        </p>

        <div className="mt-8 space-y-5 leading-7 text-slate-700">
          <p>
            Start by identifying your base area (for example General Luna, Dapa, or Del Carmen), then shortlist providers
            based on proximity, contact responsiveness, and category relevance.
          </p>
          <p>
            For recurring needs—transport, wellness, essentials, and business support—bookmark trusted listings and
            confirm operating hours in advance, especially during holidays and peak tourist periods.
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
              <Link className="hover:underline" href="/category/wellness">
                Wellness Services in Siargao
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/city/general-luna">
                Businesses in General Luna
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

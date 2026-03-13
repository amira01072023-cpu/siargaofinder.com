import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Siargao Island Hopping Guide | Siargao Finder",
  description:
    "Plan your Siargao island hopping with practical tips, route ideas, and local operator options.",
  alternates: {
    canonical: "/guide/siargao-island-hopping-guide",
  },
};

export default function SiargaoIslandHoppingGuidePage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800">
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-10">
        <p className="text-sm text-slate-500">Guide • Siargao Finder</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">Siargao Island Hopping Guide</h1>
        <p className="mt-4 text-slate-700 leading-7">
          Island hopping is one of the most searched activities in Siargao. This guide helps you plan routes,
          compare operator options, and book with clearer expectations for timing and inclusions.
        </p>

        <div className="mt-8 space-y-5 leading-7 text-slate-700">
          <p>
            Start by checking operator coverage, departure points, and group vs private trip formats.
            If you travel during busy months, reserve early and reconfirm the day-before schedule,
            weather conditions, and included stops.
          </p>
          <p>
            For smoother trips, confirm whether meals, environmental fees, and transfer logistics are included.
            Use verified listing contacts to avoid outdated pricing and last-minute confusion.
          </p>
        </div>

        <div className="mt-10 rounded-xl border bg-white p-5">
          <h2 className="text-xl font-bold">Explore Related Pages</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-amber-800">
            <li>
              <Link className="hover:underline" href="/category/tours-island-hopping">
                Tours & Island Hopping in Siargao
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/city/del-carmen">
                Businesses in Del Carmen
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/guide/siargao-surf-schools-guide">
                Siargao Surf Schools Guide
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

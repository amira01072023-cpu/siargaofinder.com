import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Siargao Coworking Guide for Remote Workers | Siargao Finder",
  description:
    "Find coworking spaces and remote-work friendly spots in Siargao with tips on Wi-Fi, location, and productivity setup.",
  alternates: {
    canonical: "/guide/siargao-coworking-guide",
  },
};

export default function SiargaoCoworkingGuidePage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800">
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-10">
        <p className="text-sm text-slate-500">Guide • Siargao Finder</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">Siargao Coworking Guide</h1>
        <p className="mt-4 text-slate-700 leading-7">
          Siargao is becoming a strong base for remote workers. This guide helps you choose coworking and
          work-friendly spaces based on internet reliability, location, and day-to-day comfort.
        </p>

        <div className="mt-8 space-y-5 leading-7 text-slate-700">
          <p>
            When choosing a workspace, prioritize stable internet, backup power readiness, and seating setup.
            If you take calls regularly, check whether the space has quiet zones or meeting options.
          </p>
          <p>
            Balance productivity with convenience by selecting spaces near your accommodation and transport routes.
            Verify opening times and pass options before committing to weekly or monthly plans.
          </p>
        </div>

        <div className="mt-10 rounded-xl border bg-white p-5">
          <h2 className="text-xl font-bold">Explore Related Pages</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-amber-800">
            <li>
              <Link className="hover:underline" href="/category/coworking">
                Coworking in Siargao
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/city/general-luna">
                Businesses in General Luna
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/guide/siargao-transport-guide">
                Siargao Transport Guide
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

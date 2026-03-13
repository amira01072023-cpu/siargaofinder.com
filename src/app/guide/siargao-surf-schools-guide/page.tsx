import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Siargao Surf Schools Guide (Beginner to Advanced) | Siargao Finder",
  description:
    "Compare Siargao surf schools and lesson options by experience level, location, and learning goals.",
  alternates: {
    canonical: "/guide/siargao-surf-schools-guide",
  },
};

export default function SiargaoSurfSchoolsGuidePage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800">
      <section className="max-w-4xl mx-auto px-4 pt-12 pb-10">
        <p className="text-sm text-slate-500">Guide • Siargao Finder</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold">Siargao Surf Schools Guide</h1>
        <p className="mt-4 text-slate-700 leading-7">
          Choosing the right surf school can shape your entire Siargao experience. This guide helps you compare
          schools based on skill level support, location, coaching style, and lesson structure.
        </p>

        <div className="mt-8 space-y-5 leading-7 text-slate-700">
          <p>
            Beginners should prioritize schools that offer clear safety orientation, soft-landing spots,
            and patient coaching progression. Intermediate and advanced surfers can focus on schedule flexibility,
            spot access, and instructor specialization.
          </p>
          <p>
            Before booking, check listing contact details and confirm inclusions like board rental,
            rash guards, transport, and lesson duration. Seasonal wave conditions can also influence
            the best school choice during your stay.
          </p>
        </div>

        <div className="mt-10 rounded-xl border bg-white p-5">
          <h2 className="text-xl font-bold">Explore Related Pages</h2>
          <ul className="mt-3 list-disc pl-6 space-y-2 text-amber-800">
            <li>
              <Link className="hover:underline" href="/category/surf-schools-rentals">
                Surf Schools & Rentals in Siargao
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/city/general-luna">
                Businesses in General Luna
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

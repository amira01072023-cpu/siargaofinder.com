import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, FileText, Flag, ShieldCheck } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";

export const metadata: Metadata = {
  title: { absolute: "Contact SiargaoFinder | Support and Requests" },
  description: "Contact SiargaoFinder through the correct support route for listings, data rights, accessibility, and content reports.",
  alternates: {
    canonical: "/contact",
  },
  robots: { index: true, follow: true },
};

const contactRoutes = [
  {
    title: "List or update a business",
    text: "Submit a new listing or claim an existing listing so we can keep directory details accurate.",
    href: "/list-your-business",
    label: "List your business",
    icon: Building2,
  },
  {
    title: "Report a listing or unsafe content",
    text: "Use the moderation form for incorrect listings, harmful content, scams, or illegal content reports.",
    href: "/report-illegal-content",
    label: "Submit a report",
    icon: Flag,
  },
  {
    title: "Privacy or data rights request",
    text: "Request access, correction, deletion, or portability of your personal data through our privacy form.",
    href: "/data-rights-request",
    label: "Open data request form",
    icon: FileText,
  },
];

export default function ContactPage() {
  return (
    <main className="page-shell">
      <PublicSiteHeader />

      <section className="page-section page-hero max-w-5xl">
        <p className="page-kicker">Contact & Support</p>
        <h1 className="page-title">How can we help?</h1>
        <p className="page-subtitle max-w-3xl">
          Choose the right support route below. We use forms instead of publishing a raw email address so requests are easier to track and less exposed to spam bots.
        </p>
      </section>

      <section className="page-section max-w-5xl pt-0">
        <div className="grid gap-4 md:grid-cols-3">
          {contactRoutes.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.title} href={item.href} className="page-card group block p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-900"><Icon size={20} /></span>
                <strong>{item.title}</strong>
                <p className="mt-2 text-sm text-slate-600">{item.text}</p>
                <small className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-900">{item.label} <ArrowRight size={13} /></small>
              </Link>
            );
          })}
        </div>

        <div className="page-card rounded-2xl p-5 mt-8 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">About support</p>
          <p className="mt-2">
            Siargao Finder is an independent directory project. We review listing corrections, ownership claims, data
            rights requests, accessibility reports, and safety reports through the routes above so each request reaches
            the right workflow.
          </p>
          <p className="mt-2">
            We cannot guarantee immediate replies for every general message, but verified correction, privacy, and
            safety requests are prioritized for review.
          </p>
        </div>

        <div className="page-card rounded-2xl p-5 mt-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900"><ShieldCheck size={16} className="mr-1 inline" /> Spam protection note</p>
          <p className="mt-2">
            SiargaoFinder no longer displays a public raw contact email on this page. Internal notification emails are still delivered securely through the backend when you submit a form.
          </p>
        </div>
      </section>
    </main>
  );
}

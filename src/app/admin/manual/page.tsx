"use client";

import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";
import AdminSubpageShell from "@/components/AdminSubpageShell";

type ModuleCardProps = {
  title: string;
  description: string;
  href: string;
  bullets: string[];
};

function ModuleCard({ title, description, href, bullets }: ModuleCardProps) {
  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        </div>
        <Link href={href} className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50 whitespace-nowrap">
          Open
        </Link>
      </div>
      <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  );
}

export default function AdminManualPage() {
  const supabase = createClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  };

  return (
    <AdminSubpageShell>
      <div className="admin-subpage-stack space-y-6">
        <section className="bg-white border rounded-2xl p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Admin Help Center</p>
              <h1 className="text-3xl font-bold text-slate-900">SiargaoFinder Dashboard Manual</h1>
              <p className="text-sm text-slate-600 mt-2 max-w-3xl">
                Practical staff guide for using the admin dashboard day to day. Use this page as your
                in-app reference for operations, content, outreach, and listing quality control.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/admin" className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50">
                Back to admin
              </Link>
              <button
                onClick={signOut}
                className="text-sm border border-slate-300 px-3 py-1.5 rounded-lg hover:bg-slate-50"
              >
                Sign out
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-xl p-4 bg-slate-50">
              <p className="text-xs uppercase tracking-wide text-slate-500">Primary goal</p>
              <p className="mt-2 text-sm text-slate-700">
                Keep the team aligned on what to do, what each module is for, and how to update the dashboard properly.
              </p>
            </div>
            <div className="border rounded-xl p-4 bg-slate-50">
              <p className="text-xs uppercase tracking-wide text-slate-500">Best use</p>
              <p className="mt-2 text-sm text-slate-700">
                Open this page when onboarding staff, building a daily routine, or checking how a workflow should be handled.
              </p>
            </div>
            <div className="border rounded-xl p-4 bg-slate-50">
              <p className="text-xs uppercase tracking-wide text-slate-500">Core modules</p>
              <p className="mt-2 text-sm text-slate-700">
                Leads, Content, Outreach, and Listings Workflow work together as the operational system for SiargaoFinder.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Navigation</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <a href="#access-and-overview" className="border rounded-lg px-4 py-3 hover:bg-slate-50">Access and Overview</a>
            <a href="#modules" className="border rounded-lg px-4 py-3 hover:bg-slate-50">Modules</a>
            <a href="#daily-workflow" className="border rounded-lg px-4 py-3 hover:bg-slate-50">Daily Workflow</a>
            <a href="#team-standards" className="border rounded-lg px-4 py-3 hover:bg-slate-50">Team Standards</a>
            <a href="#mistakes-to-avoid" className="border rounded-lg px-4 py-3 hover:bg-slate-50">Mistakes to Avoid</a>
            <a href="#summary" className="border rounded-lg px-4 py-3 hover:bg-slate-50">Summary</a>
          </div>
        </section>

        <section id="access-and-overview" className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Access and Overview</h2>
            <p className="text-sm text-slate-600 mt-2">
              Start here if you are new to the admin area or need a fast refresher on how the dashboard is meant to be used.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="border rounded-xl p-5 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-3">How to access the dashboard</h3>
              <ol className="space-y-2 text-sm text-slate-700 list-decimal pl-5">
                <li>Go to <strong>/auth</strong>.</li>
                <li>Sign in with your approved admin email and password.</li>
                <li>Open <strong>/admin</strong> after login.</li>
              </ol>
            </div>

            <div className="border rounded-xl p-5 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-3">What the overview page is for</h3>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>See what needs attention first</li>
                <li>Check open operational work across modules</li>
                <li>Review recent activity quickly</li>
                <li>Jump into the right section without guessing</li>
              </ul>
            </div>
          </div>

          <div className="border rounded-xl p-5 bg-amber-50 border-amber-200">
            <h3 className="font-semibold text-amber-900 mb-2">What to check first on Overview</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-amber-900">
              <ul className="space-y-2 list-disc pl-5">
                <li>Open leads</li>
                <li>Outreach follow-ups</li>
                <li>Listings needing review</li>
              </ul>
              <ul className="space-y-2 list-disc pl-5">
                <li>Pending submissions</li>
                <li>Pending claims</li>
                <li>Open data requests</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="modules" className="space-y-5">
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Modules</h2>
            <p className="text-sm text-slate-600 mt-2">
              Each module has a different job. Use the right one so information stays organized and the team can trust the dashboard.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5">
            <ModuleCard
              title="Leads"
              description="Track incoming inquiries, possible business opportunities, and lead follow-up status."
              href="/admin/leads"
              bullets={[
                "Use for listing inquiries, business interest, recommendation requests, and contact form messages.",
                "Update status as soon as contact happens: New, Contacted, Interested, Closed.",
                "Always add notes after meaningful actions so context is not lost.",
              ]}
            />

            <ModuleCard
              title="Content"
              description="Manage article ideas, keyword targets, search intent, and publishing progress."
              href="/admin/content"
              bullets={[
                "Every content item should have a clear title, keyword, and search intent.",
                "Use statuses to move work forward: Idea, Researching, Outlining, Drafting, Published.",
                "Use priority levels to keep the most valuable content moving first.",
              ]}
            />

            <ModuleCard
              title="Outreach"
              description="Track local business contacts, replies, reminder dates, and premium interest."
              href="/admin/outreach"
              bullets={[
                "Use this as the lightweight CRM for Siargao business relationships.",
                "Update outreach status immediately when a business replies or a follow-up is needed.",
                "Set reminder dates whenever the next step should happen later.",
              ]}
            />

            <ModuleCard
              title="Listings Workflow"
              description="Manage listing quality, review decisions, duplicate flags, featured state, and claim workflow."
              href="/admin/listings"
              bullets={[
                "Use Needs Review when something is incomplete, uncertain, or should be checked manually.",
                "Use verification notes to explain why a listing was verified, flagged, or changed.",
                "Flag duplicates before making cleanup decisions so nothing gets lost blindly.",
              ]}
            />
          </div>
        </section>

        <section id="daily-workflow" className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Daily Workflow</h2>
            <p className="text-sm text-slate-600 mt-2">
              A simple routine makes the dashboard much more useful. This is the recommended operating rhythm.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="border rounded-xl p-5 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-3">Start of day</h3>
              <ol className="space-y-2 text-sm text-slate-700 list-decimal pl-5">
                <li>Open Overview</li>
                <li>Check urgent numbers and recent items</li>
                <li>Decide what needs immediate action first</li>
              </ol>
            </div>

            <div className="border rounded-xl p-5 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-3">First work block</h3>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>Handle new leads</li>
                <li>Handle follow-up-needed outreach</li>
                <li>Handle listings needing review</li>
              </ul>
            </div>

            <div className="border rounded-xl p-5 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-3">Later work block</h3>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>Move content pipeline forward</li>
                <li>Expand outreach</li>
                <li>Improve listing quality and completeness</li>
              </ul>
            </div>
          </div>

          <div className="border rounded-xl p-5 bg-emerald-50 border-emerald-200">
            <h3 className="font-semibold text-emerald-900 mb-3">End-of-day checklist</h3>
            <ul className="space-y-2 text-sm text-emerald-900 list-disc pl-5">
              <li>Update statuses for anything you touched</li>
              <li>Save notes with useful context</li>
              <li>Close completed work</li>
              <li>Recheck Overview before signing out</li>
            </ul>
          </div>
        </section>

        <section id="team-standards" className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Team Standards</h2>
            <p className="text-sm text-slate-600 mt-2">
              These standards help keep the dashboard accurate enough to trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="border rounded-xl p-5 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-3">Write useful notes</h3>
              <p className="text-sm text-slate-700 mb-3">Avoid vague notes like <em>done</em>.</p>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>Messaged business on Instagram about premium listing. Waiting for reply.</li>
                <li>Phone number appears outdated; listing marked needs review.</li>
                <li>Article moved to drafting after keyword and angle approved.</li>
              </ul>
            </div>

            <div className="border rounded-xl p-5 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-3">Keep statuses real</h3>
              <ul className="space-y-2 text-sm text-slate-700 list-disc pl-5">
                <li>Do not leave worked leads as New</li>
                <li>Do not leave replied outreach in Contacted</li>
                <li>Do not mark listings verified without review</li>
                <li>Do not mark content published without confirming it is live</li>
              </ul>
            </div>
          </div>

          <div className="border rounded-xl p-5 bg-sky-50 border-sky-200">
            <h3 className="font-semibold text-sky-900 mb-2">Rule of thumb</h3>
            <p className="text-sm text-sky-900">
              The dashboard should be the source of truth. If something happened and the dashboard was not updated,
              assume the team cannot reliably act on it later.
            </p>
          </div>
        </section>

        <section id="mistakes-to-avoid" className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Mistakes to Avoid</h2>
          <div className="grid md:grid-cols-2 gap-5 text-sm text-slate-700">
            <div className="border rounded-xl p-5 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-3">Operational mistakes</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Leaving worked leads marked as New</li>
                <li>Forgetting reminder dates in outreach</li>
                <li>Changing statuses without adding useful notes</li>
              </ul>
            </div>
            <div className="border rounded-xl p-5 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-3">Quality mistakes</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Adding vague content ideas without keyword or intent</li>
                <li>Marking listings verified without checking details</li>
                <li>Flagging duplicates without explaining why</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="summary" className="bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Summary</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <div className="border rounded-xl p-4 bg-slate-50">
              <h3 className="font-semibold">Leads</h3>
              <p className="text-sm text-slate-600 mt-1">Manage incoming opportunities</p>
            </div>
            <div className="border rounded-xl p-4 bg-slate-50">
              <h3 className="font-semibold">Content</h3>
              <p className="text-sm text-slate-600 mt-1">Manage the publishing pipeline</p>
            </div>
            <div className="border rounded-xl p-4 bg-slate-50">
              <h3 className="font-semibold">Outreach</h3>
              <p className="text-sm text-slate-600 mt-1">Manage business relationships</p>
            </div>
            <div className="border rounded-xl p-4 bg-slate-50">
              <h3 className="font-semibold">Listings Workflow</h3>
              <p className="text-sm text-slate-600 mt-1">Manage directory quality</p>
            </div>
          </div>
          <p className="text-sm text-slate-700">
            If staff keep statuses accurate, notes useful, and workflows updated, the dashboard becomes a real operations system instead of just an admin panel.
          </p>
        </section>
      </div>
    </AdminSubpageShell>
  );
}

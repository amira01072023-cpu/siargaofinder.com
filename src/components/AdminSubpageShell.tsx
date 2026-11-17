"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeCheck,
  BookOpen,
  Building2,
  FileText,
  Home,
  Inbox,
  LayoutDashboard,
  Megaphone,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

const adminNavigation = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox },
  { href: "/admin/claims", label: "Claims", icon: BadgeCheck },
  { href: "/admin/data-requests", label: "Data requests", icon: ShieldCheck },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/outreach", label: "Outreach", icon: Megaphone },
  { href: "/admin/listings", label: "Listings", icon: Building2 },
];

function isCurrentRoute(pathname: string, href: string) {
  return href === "/admin" ? pathname === href : pathname.startsWith(href);
}

export default function AdminSubpageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="admin-glass-v2 relative min-h-screen overflow-hidden bg-[#06100f] text-slate-100 antialiased">
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-24 size-[28rem] rounded-full bg-emerald-500/[0.12] blur-[120px]" />
        <div className="absolute right-[-10rem] top-[-4rem] size-[32rem] rounded-full bg-amber-300/[0.11] blur-[130px]" />
        <div className="absolute bottom-[-15rem] left-[30%] size-[38rem] rounded-full bg-cyan-400/[0.08] blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.9)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#06100f]/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/admin" className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-2xl border border-amber-200/20 bg-gradient-to-br from-amber-200/20 to-emerald-400/10 text-amber-200 shadow-[0_10px_30px_-12px_rgba(251,191,36,.8)]">
              <Search size={18} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-semibold tracking-[-0.02em] text-white">SiargaoFinder</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-emerald-200/65">Admin workspace · v2</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/admin" className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/[0.1] hover:text-white">
              <LayoutDashboard size={15} aria-hidden="true" />
              <span className="hidden sm:inline">Overview</span>
            </Link>
            <Link href="/" className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/[0.1] hover:text-white">
              <Home size={15} aria-hidden="true" />
              <span className="hidden sm:inline">View site</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid max-w-[1500px] lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="hidden border-r border-white/[0.07] px-4 py-8 lg:flex lg:min-h-[calc(100vh-65px)] lg:flex-col lg:px-5">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">Workspace</p>
          <nav className="mt-4 space-y-1" aria-label="Admin navigation">
            {adminNavigation.map(({ href, label, icon: Icon }) => {
              const active = isCurrentRoute(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active ? "border border-amber-200/15 bg-amber-200/[0.09] text-amber-100 shadow-inner shadow-amber-100/5" : "border border-transparent text-slate-400 hover:border-white/[0.06] hover:bg-white/[0.05] hover:text-slate-100"}`}
                >
                  <Icon size={17} aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-white/[0.08] bg-white/[0.045] p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-emerald-200">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-50 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
              </span>
              <span className="text-xs font-medium">Operations online</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">Protected workspace for directory review and operations.</p>
            <Link href="/admin/manual" className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-amber-200 transition hover:text-amber-100">
              <BookOpen size={14} aria-hidden="true" />
              Open admin manual
            </Link>
          </div>
        </aside>

        <section className="min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <nav className="mb-5 flex gap-2 overflow-x-auto pb-2 lg:hidden" aria-label="Admin navigation">
            {adminNavigation.map(({ href, label, icon: Icon }) => {
              const active = isCurrentRoute(pathname, href);
              return (
                <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs transition ${active ? "border-amber-200/20 bg-amber-200/10 text-amber-100" : "border-white/10 bg-white/[0.05] text-slate-400"}`}>
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
          </nav>

          {children}
        </section>
      </div>
    </main>
  );
}

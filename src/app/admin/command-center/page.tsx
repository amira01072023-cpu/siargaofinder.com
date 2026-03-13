import type { Metadata } from "next";
import Link from "next/link";
import { Search, Home, Globe, BarChart3, ShieldCheck, FileText } from "lucide-react";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Command Center | Admin",
  robots: {
    index: false,
    follow: false,
  },
};

type SiteCard = {
  name: string;
  domain: string;
  sitemap: string;
  robots: string;
  searchConsole: string;
  notes: string[];
};

type HealthRow = {
  label: string;
  url: string;
  ok: boolean;
  status: number;
};

type SiteHealth = {
  site: string;
  rows: HealthRow[];
};

const sites: SiteCard[] = [
  {
    name: "Siargao Finder",
    domain: "https://www.siargaofinder.com",
    sitemap: "https://www.siargaofinder.com/sitemap.xml",
    robots: "https://www.siargaofinder.com/robots.txt",
    searchConsole: "https://search.google.com/search-console",
    notes: [
      "Guide pages published and included in sitemap",
      "Global Organization + WebSite JSON-LD enabled",
      "Search Console and sitemap already configured",
    ],
  },
  {
    name: "UAEBizConnect",
    domain: "https://www.uaebizconnect.com",
    sitemap: "https://www.uaebizconnect.com/sitemap.xml",
    robots: "https://www.uaebizconnect.com/robots.txt",
    searchConsole: "https://search.google.com/search-console",
    notes: [
      "SEO command-center docs mirrored",
      "Use this panel to run daily/weekly SEO operations",
      "Confirm canonical/metadata alignment in production",
    ],
  },
];

async function check(url: string): Promise<{ ok: boolean; status: number }> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false, status: 0 };
  }
}

async function buildHealth(): Promise<SiteHealth[]> {
  const checks = await Promise.all(
    sites.map(async (s) => {
      const [home, robots, sitemap] = await Promise.all([
        check(s.domain),
        check(s.robots),
        check(s.sitemap),
      ]);

      return {
        site: s.name,
        rows: [
          { label: "Homepage", url: s.domain, ...home },
          { label: "Robots", url: s.robots, ...robots },
          { label: "Sitemap", url: s.sitemap, ...sitemap },
        ],
      };
    })
  );

  return checks;
}

export default async function CommandCenterPage() {
  const health = await buildHealth();

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-800 antialiased">
      <header className="bg-black border-b border-yellow-500 sticky top-0 z-30 text-yellow-300 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="text-yellow-300" size={20} />
            <span className="font-bold text-lg tracking-tight">Siargao Finder</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 bg-yellow-400 text-black border border-yellow-500 text-sm px-4 py-2 rounded-lg hover:bg-yellow-300 transition font-semibold"
            >
              <Home size={16} />
              Admin
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold">Cross-Site Command Center</h1>
          <p className="text-slate-600 mt-1">
            Unified operations panel for SEO health, indexing, and monitoring across your two websites.
          </p>

          <section className="mt-6 border rounded-xl p-4 bg-slate-50/60">
            <h2 className="font-semibold mb-3">Live SEO Health</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {health.map((h) => (
                <div key={h.site} className="border rounded-lg bg-white p-4">
                  <h3 className="font-semibold mb-2">{h.site}</h3>
                  <ul className="space-y-2 text-sm">
                    {h.rows.map((r) => (
                      <li key={`${h.site}-${r.label}`} className="flex items-center justify-between gap-3">
                        <span className="text-slate-700">{r.label}</span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${r.ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {r.ok ? `OK (${r.status})` : `Fail${r.status ? ` (${r.status})` : ""}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {sites.map((site) => (
              <article key={site.name} className="border rounded-xl p-5 bg-slate-50/50">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">{site.name}</h2>
                    <a className="text-sm text-amber-700 hover:underline" href={site.domain} target="_blank" rel="noreferrer">
                      {site.domain}
                    </a>
                  </div>
                  <Globe className="text-slate-500" size={20} />
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <a className="block hover:underline" href={site.sitemap} target="_blank" rel="noreferrer">
                    <span className="font-semibold">Sitemap:</span> {site.sitemap}
                  </a>
                  <a className="block hover:underline" href={site.robots} target="_blank" rel="noreferrer">
                    <span className="font-semibold">Robots:</span> {site.robots}
                  </a>
                  <a className="block hover:underline" href={site.searchConsole} target="_blank" rel="noreferrer">
                    <span className="font-semibold">Search Console</span>
                  </a>
                </div>

                <ul className="mt-4 list-disc pl-6 text-sm text-slate-700 space-y-1">
                  {site.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            <Link href="/admin/submissions" className="border rounded-lg p-4 bg-white hover:bg-slate-50">
              <div className="flex items-center gap-2 font-semibold"><FileText size={16} /> Submissions</div>
              <p className="text-xs text-slate-600 mt-1">Review listing submissions</p>
            </Link>
            <Link href="/admin/claims" className="border rounded-lg p-4 bg-white hover:bg-slate-50">
              <div className="flex items-center gap-2 font-semibold"><ShieldCheck size={16} /> Claims</div>
              <p className="text-xs text-slate-600 mt-1">Validate ownership claims</p>
            </Link>
            <Link href="/admin/data-requests" className="border rounded-lg p-4 bg-white hover:bg-slate-50">
              <div className="flex items-center gap-2 font-semibold"><BarChart3 size={16} /> Data Requests</div>
              <p className="text-xs text-slate-600 mt-1">Handle compliance requests</p>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

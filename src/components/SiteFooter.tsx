import Link from "next/link";
import { Building2, ShieldCheck, MapPinned, Search } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="footer-image-bg relative overflow-hidden text-slate-300 border-t border-white/10">
      <div className="footer-overlay" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-14 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-white font-bold text-lg mb-3 inline-flex items-center gap-2">
            <Search size={18} className="text-white" /> Siargao Finder
          </h3>
          <p className="text-sm text-slate-200 mb-4">
            Your trusted local business directory for Siargao island areas.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-200">
            <p className="inline-flex items-center gap-1.5"><ShieldCheck size={14} /> Verified public listings</p>
            <p className="inline-flex items-center gap-1.5"><MapPinned size={14} /> Siargao-wide coverage</p>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-200">
            <li><Link className="hover:text-white" href="/">Home</Link></li>

            <li><Link className="hover:text-white" href="/list-your-business">List Your Business</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-slate-200">
            <li><a className="hover:text-white" href="mailto:info@siargaofinder.com">Contact Us</a></li>
            <li><Link className="hover:text-white" href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link className="hover:text-white" href="/terms-of-use">Terms of Use</Link></li>
            <li><Link className="hover:text-white" href="/accessibility-statement">Accessibility Statement</Link></li>
            <li><Link className="hover:text-white" href="/data-rights-request">Data Rights Request</Link></li>
            <li><Link className="hover:text-white" href="/eu-compliance">EU Compliance Notice</Link></li>
            <li><Link className="hover:text-white" href="/report-illegal-content">Report Illegal Content</Link></li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/list-your-business" className="inline-flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-black text-xs px-3 py-2 rounded-lg transition font-semibold">
              <Building2 size={14} /> List Your Business
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/15">
        <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-slate-300 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Siargao Finder. All rights reserved.</p>
          <p>Elevating Siargao business discovery with refined simplicity · Developed by Creencia Digital</p>
        </div>
      </div>
    </footer>
  );
}

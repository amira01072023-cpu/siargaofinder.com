import Image from "next/image";
import Link from "next/link";
import { Building2, ShieldCheck, MapPinned } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="footer-image-bg footer-shell relative overflow-hidden border-t border-white/10 text-slate-300">
      <div className="footer-overlay" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-14 grid gap-8 md:grid-cols-[1.3fr_0.8fr_1fr]">
        <div>
          <h3 className="footer-brand inline-flex items-center gap-3">
            <Image
              src="/siargaofinder-hero-logo.jpg"
              alt="Siargao Finder"
              width={80}
              height={80}
              className="h-auto w-[32px] rounded-full mix-blend-screen sm:w-[36px] md:w-[52px]"
            />
            <span>Siargao Finder</span>
          </h3>
          <p className="footer-copy">
            Your trusted local business directory for Siargao island areas.
          </p>
          <div className="footer-feature-list mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            <p className="inline-flex items-center gap-1.5"><ShieldCheck size={14} /> Curated public listings</p>
            <p className="inline-flex items-center gap-1.5"><MapPinned size={14} /> Siargao-wide coverage</p>
          </div>
        </div>

        <div>
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/">Home</Link></li>
            <li><Link className="hover:text-white" href="/about">About</Link></li>
            <li><Link className="hover:text-white" href="/blog">Blog</Link></li>
            <li><Link className="hover:text-white" href="/list-your-business">List Your Business</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/contact">Contact Us</Link></li>
            <li><Link className="hover:text-white" href="/editorial-policy">Editorial Policy</Link></li>
            <li><Link className="hover:text-white" href="/directory-standards">Directory Standards</Link></li>
            <li><Link className="hover:text-white" href="/advertising-disclosure">Advertising Disclosure</Link></li>
            <li><Link className="hover:text-white" href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link className="hover:text-white" href="/terms-of-use">Terms of Use</Link></li>
            <li><Link className="hover:text-white" href="/accessibility-statement">Accessibility Statement</Link></li>
            <li><Link className="hover:text-white" href="/data-rights-request">Data Rights Request</Link></li>
            <li><Link className="hover:text-white" href="/eu-compliance">EU Compliance Notice</Link></li>
            <li><Link className="hover:text-white" href="/report-illegal-content">Report Illegal Content</Link></li>
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/list-your-business" className="footer-cta inline-flex items-center gap-1.5">
              <Building2 size={14} /> List Your Business
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/12">
        <div className="max-w-6xl mx-auto px-4 py-3 text-xs footer-subline flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Siargao Finder. All rights reserved.</p>
          <p>Elevating Siargao business discovery with refined simplicity</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Plus, ShieldCheck, MapPinned } from "lucide-react";

export default function SiteFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="footer-image-bg footer-shell relative overflow-hidden border-t border-white/10 text-slate-300">
      <div className="footer-overlay" />

      <div className="footer-marketplace-cta relative z-10 max-w-6xl mx-auto px-4">
        <div>
          <p className="footer-kicker">Built for Siargao</p>
          <h2>Put your business on the island map.</h2>
          <p>Join the local directory and make it easier for customers to find you.</p>
        </div>
        <Link href="/list-your-business" className="footer-marketplace-cta-button">
          <Plus size={17} /> List your business <ArrowRight size={17} />
        </Link>
      </div>

      <div className="footer-marketplace-grid relative z-10 max-w-6xl mx-auto px-4 py-14">
        <div className="footer-marketplace-brand-column">
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
          <h4 className="footer-heading">Discover</h4>
          <ul className="footer-links space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/">Home</Link></li>
            <li><Link className="hover:text-white" href="/#directory">Directory</Link></li>
            <li><Link className="hover:text-white" href="/#categories">Categories</Link></li>
            <li><Link className="hover:text-white" href="/about">About</Link></li>
            <li><Link className="hover:text-white" href="/blog">Blog</Link></li>
            <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Popular areas</h4>
          <ul className="footer-links space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/municipality/general-luna">General Luna</Link></li>
            <li><Link className="hover:text-white" href="/municipality/dapa">Dapa</Link></li>
            <li><Link className="hover:text-white" href="/municipality/del-carmen">Del Carmen</Link></li>
            <li><Link className="hover:text-white" href="/municipality/san-isidro">San Isidro</Link></li>
            <li><Link className="hover:text-white" href="/municipality/burgos">Burgos</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Support & policy</h4>
          <ul className="footer-links space-y-2 text-sm">
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
        </div>
      </div>

      <div className="relative z-10 border-t border-white/12">
        <div className="max-w-6xl mx-auto px-4 py-3 text-xs footer-subline flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Siargao Finder. All rights reserved.</p>
          <p>Find local. Choose confidently. Support Siargao.</p>
        </div>
      </div>
    </footer>
  );
}

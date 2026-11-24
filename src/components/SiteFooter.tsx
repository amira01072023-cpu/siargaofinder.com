"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Compass, MapPinned, Plus, ShieldCheck } from "lucide-react";

const municipalities = [
  ["General Luna", "/municipality/general-luna"],
  ["Dapa", "/municipality/dapa"],
  ["Del Carmen", "/municipality/del-carmen"],
  ["San Isidro", "/municipality/san-isidro"],
  ["Burgos", "/municipality/burgos"],
  ["Santa Monica", "/municipality/santa-monica"],
  ["Pilar", "/municipality/pilar"],
  ["San Benito", "/municipality/san-benito"],
  ["Socorro", "/municipality/socorro"],
] as const;

export default function SiteFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer id="site-footer" className="site-footer-2027 footer-image-bg">
      <section className="footer-2027-cta" aria-labelledby="footer-business-heading">
        <div className="footer-2027-container footer-2027-cta__inner">
          <div>
            <p className="footer-2027-kicker">Local business owners</p>
            <h2 id="footer-business-heading">Help people discover your business.</h2>
            <p>Submit accurate details for free. Every new listing enters the existing review and email-verification process.</p>
          </div>
          <Link href="/list-your-business" className="footer-2027-cta__button">
            <Plus size={18} aria-hidden="true" />
            <span>List your business</span>
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="footer-2027-main">
        <div className="footer-2027-container footer-2027-grid">
          <div className="footer-2027-brand">
            <Link href="/" className="footer-2027-brand__mark" aria-label="Siargao Finder home">
              <Image
                src="/siargaofinder-logo.png"
                alt=""
                width={52}
                height={52}
                className="footer-2027-logo"
              />
              <span>SiargaoFinder</span>
            </Link>
            <p className="footer-2027-tagline">Discover. Connect. Explore.</p>
            <p className="footer-2027-copy">Your practical guide to local businesses, services, places and island life across Siargao.</p>
            <div className="footer-2027-signals" aria-label="Directory features">
              <span><ShieldCheck size={15} aria-hidden="true" /> Reviewed submissions</span>
              <span><MapPinned size={15} aria-hidden="true" /> Nine municipalities</span>
            </div>
          </div>

          <nav className="footer-2027-column" aria-labelledby="footer-explore-heading">
            <h3 id="footer-explore-heading">Explore</h3>
            <ul>
              <li><Link href="/#directory">Business directory</Link></li>
              <li><Link href="/#categories">Browse categories</Link></li>
              <li><Link href="/#municipalities">Explore municipalities</Link></li>
              <li><Link href="/saved">Saved listings</Link></li>
              <li><Link href="/blog">The Siargao Journal</Link></li>
              <li><Link href="/list-your-business">List your business</Link></li>
            </ul>
          </nav>

          <nav className="footer-2027-column" aria-labelledby="footer-guides-heading">
            <h3 id="footer-guides-heading">Island guides</h3>
            <ul>
              <li><Link href="/blog/siargao-first-time-visitors">First-time visitors</Link></li>
              <li><Link href="/blog/where-to-stay-in-siargao">Where to stay</Link></li>
              <li><Link href="/blog/how-to-get-around-siargao">Getting around</Link></li>
              <li><Link href="/blog/best-restaurants-in-siargao">Food and dining</Link></li>
              <li><Link href="/blog/medical-options-siargao">Medical options</Link></li>
              <li><Link href="/guide/siargao-transport-guide">Transport guide</Link></li>
            </ul>
          </nav>

          <nav className="footer-2027-column footer-2027-column--municipalities" aria-labelledby="footer-municipalities-heading">
            <h3 id="footer-municipalities-heading">Municipalities</h3>
            <ul>
              {municipalities.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
            </ul>
          </nav>

          <nav className="footer-2027-column" aria-labelledby="footer-trust-heading">
            <h3 id="footer-trust-heading">Trust &amp; support</h3>
            <ul>
              <li><Link href="/about">About SiargaoFinder</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/directory-standards">Directory standards</Link></li>
              <li><Link href="/editorial-policy">Editorial policy</Link></li>
              <li><Link href="/report-illegal-content">Report incorrect content</Link></li>
              <li><Link href="/data-rights-request">Data rights request</Link></li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="footer-2027-legal">
        <div className="footer-2027-container footer-2027-legal__inner">
          <p>© 2026 SiargaoFinder. Your complete guide to island living.</p>
          <nav aria-label="Legal links">
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-of-use">Terms</Link>
            <Link href="/accessibility-statement">Accessibility</Link>
            <Link href="/advertising-disclosure">Advertising</Link>
            <Link href="/eu-compliance">EU notice</Link>
          </nav>
          <p className="footer-2027-signoff"><Compass size={14} aria-hidden="true" /> Built for Siargao</p>
        </div>
      </div>
    </footer>
  );
}

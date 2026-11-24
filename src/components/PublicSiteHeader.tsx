"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Plus } from "lucide-react";
import HeaderExchangeRate from "@/components/HeaderExchangeRate";

type PublicSiteHeaderProps = {
  showBlogLink?: boolean;
  showListYourBusinessLink?: boolean;
  homeLabel?: string;
  className?: string;
};

export default function PublicSiteHeader({
  showBlogLink = true,
  showListYourBusinessLink = true,
  homeLabel = "Siargao Finder",
  className = "",
}: PublicSiteHeaderProps) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    const frame = window.requestAnimationFrame(updateHash);
    window.addEventListener("hashchange", updateHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  const activeClass = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/" && hash === href.slice(1) ? "is-active" : undefined;
    return pathname === href && (!hash || href !== "/") ? "is-active" : undefined;
  };

  return (
    <header className="site-header">
      <div className={`site-header-inner ${className}`.trim()}>
        <Link href="/" className="site-header-brand" aria-label={homeLabel}>
          <Image
            src="/siargaofinder-hero-logo.jpg"
            alt=""
            width={44}
            height={44}
            className="site-header-logo"
            priority
          />
          <span>Siargao Finder</span>
        </Link>

        <nav className="site-header-nav" aria-label="Primary navigation">
          <Link href="/" className={activeClass("/")}>Home</Link>
          <Link href="/#categories" className={activeClass("/#categories")}>Explore</Link>
          <Link href="/#directory" className={activeClass("/#directory")}>Business Directory</Link>
          <Link href="/#municipalities" className={activeClass("/#municipalities")}>Map</Link>
          {showBlogLink && <Link href="/blog" className={activeClass("/blog")}>Travel Guides</Link>}
          <Link href="/saved" className={activeClass("/saved")}>Saved</Link>
        </nav>

        <div className="site-header-actions">
          <div className="site-header-rate-wrap"><HeaderExchangeRate /></div>
          {showListYourBusinessLink && (
            <Link
              href="/list-your-business"
              className="ui-btn site-header-cta-premium"
            >
              <Plus size={16} />
              <span>List your business</span>
            </Link>
          )}

          <details className="site-header-mobile-menu">
            <summary aria-label="Open navigation menu"><Menu size={22} /></summary>
            <nav aria-label="Mobile navigation">
              <Link href="/" className={activeClass("/")}>Home</Link>
              <Link href="/#categories" className={activeClass("/#categories")}>Explore</Link>
              <Link href="/#directory" className={activeClass("/#directory")}>Business Directory</Link>
              <Link href="/#municipalities" className={activeClass("/#municipalities")}>Map</Link>
              {showBlogLink && <Link href="/blog" className={activeClass("/blog")}>Travel Guides</Link>}
              <Link href="/saved" className={activeClass("/saved")}>Saved</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              {showListYourBusinessLink && <Link href="/list-your-business">List your business</Link>}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

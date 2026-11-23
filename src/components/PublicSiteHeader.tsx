import Link from "next/link";
import Image from "next/image";
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
          <Link href="/">Home</Link>
          <Link href="/#directory">Directory</Link>
          <Link href="/#categories">Categories</Link>
          <Link href="/about">About</Link>
          {showBlogLink && <Link href="/blog">Blog</Link>}
          <Link href="/contact">Contact</Link>
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
              <Link href="/">Home</Link>
              <Link href="/#directory">Directory</Link>
              <Link href="/#categories">Categories</Link>
              <Link href="/about">About</Link>
              {showBlogLink && <Link href="/blog">Blog</Link>}
              <Link href="/contact">Contact</Link>
              {showListYourBusinessLink && <Link href="/list-your-business">List your business</Link>}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

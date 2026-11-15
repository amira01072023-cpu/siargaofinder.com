import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
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
        <div className="site-header-actions site-header-actions--left">
          <Link href="/" className="site-header-brand" aria-label={homeLabel}>
            <Image
              src="/siargaofinder-hero-logo.jpg"
              alt=""
              width={40}
              height={40}
              className="site-header-logo"
              priority
            />
            <span>Siargao Finder</span>
          </Link>
        </div>
        <div className="site-header-actions">
        <HeaderExchangeRate />
        <Link href="/about" className="ui-btn ui-btn--soft">About</Link>
        {showBlogLink && <Link href="/blog" className="ui-btn ui-btn--soft">Blog</Link>}
        {showListYourBusinessLink && (
          <Link
            href="/list-your-business"
            className="ui-btn site-header-cta-pulse site-header-cta-premium"
          >
            <Sparkles size={14} />
            <span>List your business for free</span>
          </Link>
        )}
        </div>
      </div>
    </header>
  );
}

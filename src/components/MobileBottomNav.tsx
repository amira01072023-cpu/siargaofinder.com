"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bookmark, Compass, Home, MapPin, Menu } from "lucide-react";

const primaryItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Explore", href: "/#categories", icon: Compass },
  { label: "Island", href: "/#municipalities", icon: MapPin },
  { label: "Saved", href: "/saved", icon: Bookmark },
] as const;

export default function MobileBottomNav() {
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

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <div className="mobile-bottom-nav__inner">
        {primaryItems.map(({ label, href, icon: Icon }) => {
          const itemHash = href.includes("#") ? `#${href.split("#")[1]}` : "";
          const active = itemHash
            ? pathname === "/" && hash === itemHash
            : href === "/"
              ? pathname === "/" && !hash
              : pathname.startsWith(href);
          return (
            <Link
              key={label}
              href={href}
              className={`mobile-bottom-nav__item${active ? " is-active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={20} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}

        <details className="mobile-bottom-nav__more">
          <summary className="mobile-bottom-nav__item">
            <Menu size={20} aria-hidden="true" />
            <span>More</span>
          </summary>
          <nav aria-label="More links">
            <Link href="/blog">Travel guides</Link>
            <Link href="/about">About Siargao Finder</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/list-your-business">List your business</Link>
          </nav>
        </details>
      </div>
    </nav>
  );
}

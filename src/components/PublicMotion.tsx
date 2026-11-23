"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = [
  ".page-shell .page-hero > *",
  ".page-shell .section-heading",
  ".page-shell .listing-card",
  ".page-shell .category-card",
  ".page-shell .guide-card",
  ".page-shell .blog-card",
  ".page-shell .page-card",
  ".page-shell .guide-surface",
  ".page-shell .blog-summary-card",
  ".page-shell .guide-highlight-card",
  ".page-shell .category-page-summary-card",
  ".page-shell .listing-detail-summary-card",
  ".page-shell .listing-detail-progress-card",
  ".page-shell .guide-checklist-item",
  ".page-shell .blog-post-author-card",
  ".page-shell .blog-post-intro-card",
  ".page-shell .blog-share-card",
].join(",");

export default function PublicMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const headers = Array.from(document.querySelectorAll<HTMLElement>(".site-header"));
    const mobileMenus = Array.from(document.querySelectorAll<HTMLDetailsElement>(".site-header-mobile-menu"));

    const setHeaderState = () => {
      headers.forEach((header) => header.classList.toggle("is-scrolled", window.scrollY > 16));
    };

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });

    const menuLinkCleanups = mobileMenus.flatMap((menu) =>
      Array.from(menu.querySelectorAll("a")).map((link) => {
        const closeMenu = () => menu.removeAttribute("open");
        link.addEventListener("click", closeMenu);
        return () => link.removeEventListener("click", closeMenu);
      }),
    );

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return () => {
        window.removeEventListener("scroll", setHeaderState);
        menuLinkCleanups.forEach((cleanup) => cleanup());
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9% 0px", threshold: 0.08 },
    );

    const preparedElements = new WeakSet<HTMLElement>();
    const prepareReveal = (element: HTMLElement) => {
      if (preparedElements.has(element)) return;
      preparedElements.add(element);

      const siblings = element.parentElement
        ? Array.from(element.parentElement.children).filter((child) => child.matches(REVEAL_SELECTOR))
        : [];
      const siblingIndex = Math.max(0, siblings.indexOf(element));
      element.style.setProperty("--public-reveal-delay", `${Math.min(siblingIndex % 4, 3) * 70}ms`);
      element.classList.add("public-reveal");

      if (element.classList.contains("section-heading")) {
        element.classList.add("public-reveal--left");
      }

      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        window.requestAnimationFrame(() => element.classList.add("is-visible"));
      } else {
        observer.observe(element);
      }
    };

    revealElements.forEach(prepareReveal);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(REVEAL_SELECTOR)) prepareReveal(node);
          node.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach(prepareReveal);
        });
      });
    });

    const publicShell = document.querySelector(".page-shell");
    if (publicShell) mutationObserver.observe(publicShell, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", setHeaderState);
      menuLinkCleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return null;
}

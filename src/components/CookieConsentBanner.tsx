"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Consent = "accepted" | "rejected";
export const COOKIE_CONSENT_STORAGE_KEY = "ubc_cookie_consent_v2";
export const COOKIE_CONSENT_EVENT = "siargaofinder:consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function applyAnalyticsConsent(choice: Consent) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  window.gtag("consent", "update", {
    analytics_storage: choice === "accepted" ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getConsentVisibility() {
  return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === null;
}

export default function CookieConsentBanner() {
  const pathname = usePathname();
  const visible = useSyncExternalStore(subscribeToConsent, getConsentVisibility, () => false);

  useEffect(() => {
    const saved = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) as Consent | null;
    applyAnalyticsConsent(saved || "rejected");
  }, []);

  const handleChoice = (choice: Consent) => {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
    applyAnalyticsConsent(choice);
    window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: choice }));
  };

  if (pathname.startsWith("/admin") || !visible) return null;

  return (
    <div className="cookie-consent-banner" role="dialog" aria-live="polite" aria-label="Cookie consent banner">
      <div className="cookie-consent-copy">
        <p className="cookie-consent-title">Your privacy, your call.</p>
        <p className="cookie-consent-text">
          We use essential cookies to keep the site secure and working. Optional analytics and third-party advertising
          stay off unless you accept them.
        </p>
        <p className="cookie-consent-subtext">
          Read more in our{" "}
          <Link href="/privacy-policy" className="cookie-consent-link">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <div className="cookie-consent-actions">
        <button onClick={() => handleChoice("rejected")} className="cookie-consent-btn cookie-consent-btn--secondary">
          Reject non-essential
        </button>
        <button onClick={() => handleChoice("accepted")} className="cookie-consent-btn cookie-consent-btn--primary">
          Accept analytics and ads
        </button>
      </div>
    </div>
  );
}

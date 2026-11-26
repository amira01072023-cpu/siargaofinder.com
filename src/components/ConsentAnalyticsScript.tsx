"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { COOKIE_CONSENT_EVENT, COOKIE_CONSENT_STORAGE_KEY } from "@/lib/consent";

function subscribeToConsent(callback: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function hasAnalyticsConsent() {
  return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "accepted";
}

export default function ConsentAnalyticsScript() {
  const pathname = usePathname();
  const consented = useSyncExternalStore(subscribeToConsent, hasAnalyticsConsent, () => false);

  if (pathname.startsWith("/admin") || !consented) return null;

  return (
    <>
      <Script
        id="ga4-google-tag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: [
            "window.dataLayer = window.dataLayer || [];",
            "function gtag(){dataLayer.push(arguments);}",
            "window.gtag = gtag;",
            "gtag('js', new Date());",
            "gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });",
            "gtag('config', 'G-9HB4R9D2HX', { anonymize_ip: true });",
          ].join(""),
        }}
      />
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-9HB4R9D2HX" strategy="afterInteractive" referrerPolicy="no-referrer" />
    </>
  );
}

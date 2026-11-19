"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { AD_NETWORK_SCRIPTS, shouldLoadAdNetwork } from "@/lib/ad-network";
import { COOKIE_CONSENT_EVENT, COOKIE_CONSENT_STORAGE_KEY } from "@/lib/consent";

function subscribeToConsent(callback: () => void) {
  window.addEventListener(COOKIE_CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function hasAdvertisingConsent() {
  return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "accepted";
}

export default function ConsentAdNetworkScript() {
  const pathname = usePathname();
  const consented = useSyncExternalStore(subscribeToConsent, hasAdvertisingConsent, () => false);

  if (!shouldLoadAdNetwork(pathname, consented)) return null;

  return (
    <>
      {AD_NETWORK_SCRIPTS.map((script) => (
        <Script
          key={script.id}
          id={script.id}
          data-cfasync="false"
          src={script.src}
          strategy="afterInteractive"
          referrerPolicy="no-referrer"
        />
      ))}
    </>
  );
}

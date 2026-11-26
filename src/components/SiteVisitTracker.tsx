"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { COOKIE_CONSENT_EVENT, COOKIE_CONSENT_STORAGE_KEY } from "@/lib/consent";

const STORAGE_KEY = "siargaofinder:last-visit-day";

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

export default function SiteVisitTracker() {
  const pathname = usePathname();
  const consented = useSyncExternalStore(subscribeToConsent, hasAnalyticsConsent, () => false);

  useEffect(() => {
    if (pathname.startsWith("/admin") || !consented) return;

    const today = new Date().toISOString().slice(0, 10);
    const last = window.localStorage.getItem(STORAGE_KEY);
    if (last === today) return;

    const visitorKey = (() => {
      const existing = window.localStorage.getItem("siargaofinder:visitor-key");
      if (existing) return existing;
      const created = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      window.localStorage.setItem("siargaofinder:visitor-key", created);
      return created;
    })();

    fetch("/api/site-visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: window.location.pathname, visitorKey }),
      keepalive: true,
    })
      .then(() => {
        window.localStorage.setItem(STORAGE_KEY, today);
      })
      .catch(() => {
        // ignore analytics failures
      });
  }, [consented, pathname]);

  return null;
}

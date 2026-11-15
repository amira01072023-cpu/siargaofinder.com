"use client";

import { useEffect } from "react";

const STORAGE_KEY = "siargaofinder:last-visit-day";

export default function SiteVisitTracker() {
  useEffect(() => {
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
  }, []);

  return null;
}

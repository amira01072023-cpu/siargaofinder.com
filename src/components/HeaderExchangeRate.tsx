"use client";

import { useEffect, useState } from "react";

type ExchangeState = {
  text: string;
  title: string;
};

const INITIAL: ExchangeState = {
  text: "🇺🇸 USD → 🇵🇭 PHP",
  title: "Loading live Frankfurter exchange rate",
};

export default function HeaderExchangeRate() {
  const [state, setState] = useState<ExchangeState>(INITIAL);

  useEffect(() => {
    let cancelled = false;

    async function loadRate() {
      try {
        const res = await fetch("/api/exchange-rate", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const rate = data?.rate;
        const date = data?.date;
        if (!rate || cancelled) return;

        setState({
          text: `🇺🇸 USD → 🇵🇭 PHP ${Number(rate).toFixed(2)}`,
          title: date
            ? `Frankfurter exchange rate • 1 USD = ${Number(rate).toFixed(2)} PHP • ${date}`
            : `Frankfurter exchange rate • 1 USD = ${Number(rate).toFixed(2)} PHP`,
        });
      } catch {
        if (!cancelled) {
          setState({
            text: "🇺🇸 USD → 🇵🇭 PHP n/a",
            title: "Exchange rate unavailable right now",
          });
        }
      }
    }

    loadRate();
    const timer = window.setInterval(loadRate, 30 * 60 * 1000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <span className="site-header-rate" title={state.title} aria-label={state.title}>
      {state.text}
    </span>
  );
}

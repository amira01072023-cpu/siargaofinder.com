"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Heart, MapPin, Trash2, X } from "lucide-react";
import {
  clearSavedListings,
  readSavedListings,
  removeSavedListing,
  SAVED_LISTINGS_UPDATED_EVENT,
  type SavedListing,
} from "@/lib/saved-listings";
import { listingHref } from "@/lib/listing-slugs";

export default function SavedListingsPanel() {
  const [items, setItems] = useState<SavedListing[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const refresh = () => setItems(readSavedListings());
    const onUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<SavedListing[]>;
      setItems(customEvent.detail || readSavedListings());
    };

    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener(SAVED_LISTINGS_UPDATED_EVENT, onUpdated as EventListener);
    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener(SAVED_LISTINGS_UPDATED_EVENT, onUpdated as EventListener);
    };
  }, []);

  const visibleItems = useMemo(() => (expanded ? items : items.slice(0, 4)), [expanded, items]);

  const handleRemove = (id: number) => {
    setItems(removeSavedListing(id));
  };

  const handleClearAll = () => {
    setItems(clearSavedListings());
    setExpanded(false);
  };

  if (items.length === 0) {
    return (
      <div className="surface-panel saved-listings-panel p-5 text-sm text-slate-600">
        <div className="flex items-center gap-2 text-slate-900 font-semibold">
          <Heart size={16} />
          Saved listings
        </div>
        <p className="mt-2">Save businesses you want to revisit later. Your shortlist stays in this browser for quick return visits.</p>
      </div>
    );
  }

  return (
    <div className="surface-panel saved-listings-panel p-5">
      <div className="saved-listings-header">
        <div>
          <p className="text-sm font-semibold text-slate-900">Saved listings</p>
          <p className="text-xs text-slate-500">{items.length} saved{items.length > 1 ? " businesses" : " business"}</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={handleClearAll} className="saved-listings-mini-btn text-slate-600 hover:text-slate-900">
            <Trash2 size={14} />
            <span>Clear all</span>
          </button>
          <Heart size={16} className="text-rose-500 fill-rose-500" />
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {visibleItems.map((item) => (
          <div key={item.id} className="saved-listing-card">
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link href={listingHref(item)} className="saved-listing-title">
                    {item.business_name}
                  </Link>
                  <p className="saved-listing-meta mt-1">{item.category || "General Services"}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="saved-listings-icon-btn"
                  aria-label={`Remove ${item.business_name} from saved listings`}
                >
                  <X size={14} />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="listing-card-pill">{item.category || "General Services"}</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} />
                  {item.municipality || "Siargao"}
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={listingHref(item)} className="listing-card-btn listing-card-btn--soft">
                View details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="saved-listings-footer mt-4">
        {items.length > 4 && (
          <button type="button" onClick={() => setExpanded((current) => !current)} className="saved-listings-mini-btn">
            <span>{expanded ? "Show less" : `Show all ${items.length}`}</span>
          </button>
        )}
        <p className="text-xs text-slate-500">Saved items are private to this device and browser.</p>
      </div>
    </div>
  );
}

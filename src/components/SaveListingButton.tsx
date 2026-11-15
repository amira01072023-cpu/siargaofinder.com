"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { isSavedListing, toggleSavedListing, type SavedListing } from "@/lib/saved-listings";

type Props = {
  item: SavedListing;
  className?: string;
};

export default function SaveListingButton({ item, className }: Props) {
  const [saved, setSaved] = useState(() => isSavedListing(item.id));

  const onToggle = () => {
    const result = toggleSavedListing(item);
    setSaved(result.saved);
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      className={className || "listing-card-btn listing-card-btn--soft"}
      aria-pressed={saved}
    >
      <Heart size={15} className={`save-listing-icon ${saved ? "fill-current" : ""}`} />{" "}
      <span className="save-listing-label">{saved ? "Saved" : "Save"}</span>
    </button>
  );
}

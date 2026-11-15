"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Globe, Navigation, Copy, Check } from "lucide-react";
import { listingHref } from "@/lib/listing-slugs";

type Props = {
  listingId: number;
  businessName: string;
  phone?: string | null;
  websiteUrl?: string | null;
  address?: string | null;
};

async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
}

function buildDirectionsUrl(businessName: string, address?: string | null) {
  const q = encodeURIComponent([businessName, address].filter(Boolean).join(", "));
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export default function ListingCardActions({ businessName, phone, websiteUrl, address }: Props) {
  const [copied, setCopied] = useState(false);

  const onCopyPhone = async () => {
    if (!phone) return;
    try {
      await copyText(phone);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="listing-card-actions mt-3 flex gap-1.5 flex-wrap">
      <Link href={listingHref({ business_name: businessName })} className="listing-card-btn listing-card-btn--soft">
        View Details
      </Link>
      {websiteUrl ? (
        <a href={websiteUrl} target="_blank" rel="noreferrer" className="listing-card-btn listing-card-btn--dark">
          <Globe size={15} />
          <span>Website</span>
        </a>
      ) : null}
      {phone ? (
        <a href={`tel:${phone}`} className="listing-card-btn listing-card-btn--soft">
          <Phone size={15} />
          <span>Call</span>
        </a>
      ) : null}
      {(address || businessName) && (
        <a href={buildDirectionsUrl(businessName, address)} target="_blank" rel="noreferrer" className="listing-card-btn listing-card-btn--soft">
          <Navigation size={15} />
          <span>Directions</span>
        </a>
      )}
      {phone ? (
        <button type="button" onClick={onCopyPhone} className="listing-card-btn listing-card-btn--soft">
          {copied ? <Check size={15} /> : <Copy size={15} />}
          <span>{copied ? "Copied" : "Copy Phone"}</span>
        </button>
      ) : null}
      {!websiteUrl && !phone ? (
        <button className="listing-card-btn listing-card-btn--disabled">No direct contact</button>
      ) : null}
    </div>
  );
}

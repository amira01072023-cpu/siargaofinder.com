"use client";

import { useState } from "react";
import Link from "next/link";
import { Navigation, Copy, Check, Phone, Mail, Globe, Flag } from "lucide-react";

type Props = {
  listingId: number;
  businessName: string;
  phone?: string | null;
  email?: string | null;
  websiteUrl?: string | null;
  address?: string | null;
};

function cleanForMaps(address?: string | null, businessName?: string) {
  const value = [businessName, address].filter(Boolean).join(", ").trim();
  return encodeURIComponent(value);
}

async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
}

export default function ListingActionBar({ listingId, businessName, phone, email, websiteUrl, address }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (value: string, key: string) => {
    try {
      await copyText(value);
      setCopied(key);
      window.setTimeout(() => setCopied((current) => (current === key ? null : current)), 1600);
    } catch {
      setCopied(null);
    }
  };

  const directionsUrl = address ? `https://www.google.com/maps/search/?api=1&query=${cleanForMaps(address, businessName)}` : null;

  return (
    <div className="listing-action-bar mt-7">
      <div className="listing-action-bar-primary">
        {websiteUrl && (
          <a href={websiteUrl} target="_blank" rel="noreferrer" className="ui-btn ui-btn--dark">
            <Globe size={16} />
            <span>Visit Website</span>
          </a>
        )}
        {phone && (
          <a href={`tel:${phone}`} className="ui-btn ui-btn--soft">
            <Phone size={16} />
            <span>Call Now</span>
          </a>
        )}
        {directionsUrl && (
          <a href={directionsUrl} target="_blank" rel="noreferrer" className="ui-btn ui-btn--soft">
            <Navigation size={16} />
            <span>Directions</span>
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`} className="ui-btn ui-btn--soft">
            <Mail size={16} />
            <span>Email</span>
          </a>
        )}
      </div>

      <div className="listing-action-bar-secondary">
        {phone && (
          <button type="button" onClick={() => handleCopy(phone, "phone")} className="ui-btn ui-btn--soft">
            {copied === "phone" ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied === "phone" ? "Phone Copied" : "Copy Phone"}</span>
          </button>
        )}
        {address && (
          <button type="button" onClick={() => handleCopy(address, "address")} className="ui-btn ui-btn--soft">
            {copied === "address" ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied === "address" ? "Address Copied" : "Copy Address"}</span>
          </button>
        )}
        <Link href={`/claim/${listingId}`} className="ui-btn ui-btn--soft">
          <Check size={16} />
          <span>Claim / Update</span>
        </Link>
        <Link href={`/report-illegal-content?listing=${encodeURIComponent(businessName)}`} className="ui-btn ui-btn--soft">
          <Flag size={16} />
          <span>Report Listing</span>
        </Link>
      </div>
    </div>
  );
}

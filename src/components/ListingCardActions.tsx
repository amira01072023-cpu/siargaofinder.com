"use client";

import Link from "next/link";
import { ArrowUpRight, Globe, Mail, Navigation, Phone } from "lucide-react";
import { listingHref } from "@/lib/listing-slugs";

type Props = {
  listingId: number;
  businessName: string;
  phone?: string | null;
  email?: string | null;
  websiteUrl?: string | null;
  address?: string | null;
};

function buildDirectionsUrl(businessName: string, address?: string | null) {
  const q = encodeURIComponent([businessName, address].filter(Boolean).join(", "));
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export default function ListingCardActions({ businessName, phone, email, websiteUrl, address }: Props) {
  return (
    <div className="listing-card-actions">
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
      {websiteUrl ? (
        <a href={websiteUrl} target="_blank" rel="noreferrer" className="listing-card-btn listing-card-btn--soft">
          <Globe size={15} />
          <span>Website</span>
        </a>
      ) : null}
      {email ? (
        <a href={`mailto:${email}`} className="listing-card-btn listing-card-btn--soft">
          <Mail size={15} />
          <span>Email</span>
        </a>
      ) : null}
      <Link href={listingHref({ business_name: businessName })} className="listing-card-btn listing-card-btn--soft">
        <ArrowUpRight size={15} />
        <span>Details</span>
      </Link>
    </div>
  );
}

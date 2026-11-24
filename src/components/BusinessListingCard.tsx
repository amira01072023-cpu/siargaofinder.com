import { BedDouble, Building2, CalendarCheck, Car, HeartPulse, MapPin, ShieldCheck, ShoppingBag, Utensils, Waves } from "lucide-react";
import ListingCardActions from "@/components/ListingCardActions";
import SaveListingButton from "@/components/SaveListingButton";

export type BusinessListingCardData = {
  id: number;
  business_name: string;
  category: string | null;
  municipality: string | null;
  phone?: string | null;
  email?: string | null;
  website_url?: string | null;
  address?: string | null;
  last_verified_at?: string | null;
};

type Props = {
  listing: BusinessListingCardData;
  headingLevel?: "h2" | "h3";
};

export function formatLastChecked(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

function CategoryIcon({ category }: { category?: string | null }) {
  const value = category?.toLowerCase() || "";
  if (/(hotel|resort|hostel|homestay|villa|stay)/.test(value)) return <BedDouble size={19} />;
  if (/(food|restaurant|cafe|coffee|bakery|bar)/.test(value)) return <Utensils size={19} />;
  if (/(surf|beach|watersport)/.test(value)) return <Waves size={19} />;
  if (/(transport|rental|motorbike|scooter|vehicle)/.test(value)) return <Car size={19} />;
  if (/(clinic|medical|health|pharmacy|dental|wellness)/.test(value)) return <HeartPulse size={19} />;
  if (/(shop|store|market|grocery|retail)/.test(value)) return <ShoppingBag size={19} />;
  return <Building2 size={19} />;
}

export default function BusinessListingCard({ listing, headingLevel = "h2" }: Props) {
  const Heading = headingLevel;
  const contactMethodCount = [listing.phone, listing.email, listing.website_url].filter(Boolean).length;
  const lastChecked = formatLastChecked(listing.last_verified_at);

  return (
    <article className="listing-card business-listing-card group">
      <div className="listing-card-accent" />
      <div className="business-listing-card__header">
        <div className="listing-card-icon" aria-hidden="true">
          <CategoryIcon category={listing.category} />
        </div>
        <div className="min-w-0">
          <Heading className="listing-card-title">{listing.business_name}</Heading>
          <p className="listing-card-subtitle">{listing.category || "General Services"}</p>
        </div>
        <SaveListingButton
          item={{
            id: listing.id,
            business_name: listing.business_name,
            category: listing.category,
            municipality: listing.municipality,
          }}
          className="business-listing-card__save"
        />
      </div>

      <div className="business-listing-card__meta">
        <p><MapPin size={15} aria-hidden="true" /> {listing.municipality || "Siargao"}</p>
        {listing.address ? <p className="business-listing-card__address">{listing.address}</p> : null}
      </div>

      <div className="business-listing-card__signals">
        <span><ShieldCheck size={14} aria-hidden="true" /> Public directory listing</span>
        {contactMethodCount > 0 ? <span>{contactMethodCount} contact {contactMethodCount === 1 ? "option" : "options"}</span> : null}
        {lastChecked ? <span className="business-listing-card__checked"><CalendarCheck size={14} aria-hidden="true" /> Last checked {lastChecked}</span> : null}
      </div>

      <ListingCardActions
        listingId={listing.id}
        businessName={listing.business_name}
        phone={listing.phone}
        email={listing.email}
        websiteUrl={listing.website_url}
        address={listing.address}
      />
    </article>
  );
}

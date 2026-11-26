// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import SiteChatWidget from "@/components/SiteChatWidget";
import SiteFooter from "@/components/SiteFooter";
import SiteVisitTracker from "@/components/SiteVisitTracker";
import ConsentAdNetworkScript from "@/components/ConsentAdNetworkScript";
import ConsentAnalyticsScript from "@/components/ConsentAnalyticsScript";
import FormValidationA11y from "@/components/FormValidationA11y";
import PublicMotion from "@/components/PublicMotion";
import MobileBottomNav from "@/components/MobileBottomNav";
import { getSiteUrl } from "@/lib/site-url";
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/seo-metadata";

const siteUrl = getSiteUrl();

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Siargao Finder | Local Businesses, Services & Contacts in Siargao",
  description: "Find local businesses, services, rentals, tours, restaurants, and contact details across Siargao.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Siargao Finder",
    title: "Siargao Finder | Local Businesses, Services & Contacts in Siargao",
    description: "Find local businesses, services, rentals, tours, restaurants, and contact details across Siargao.",
    locale: "en_PH",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siargao Finder | Local Businesses, Services & Contacts in Siargao",
    description: "Find local businesses, services, rentals, tours, restaurants, and contact details across Siargao.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  verification: {
    google: "3p_IASh8NiGqhPGB-H_65AobSiPJ6PjdKAhuyfeFq8U",
  },
};

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#087F8C",
};

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
const siteUrl = getSiteUrl();
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Siargao Finder",
  url: siteUrl,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${siteUrl}/contact`,
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Siargao Finder",
  url: siteUrl,
  description: "Local business directory for Siargao with listings for restaurants, services, rentals, tours, accommodations, and essential contacts.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const localBusinessDirectoryJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Siargao Business Directory",
  url: siteUrl,
  description: "Browse local businesses, services, restaurants, tours, accommodations, and essential contacts across Siargao municipalities.",
  about: {
    "@type": "Place",
    name: "Siargao Island",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Surigao del Norte",
      addressCountry: "PH",
    },
  },
};

return (
<html lang="en">
<body className={`${inter.variable} ${plusJakartaSans.variable}`}>
<a className="skip-link" href="#main-content">Skip to main content</a>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessDirectoryJsonLd) }}
/>
<SiteVisitTracker />
<PublicMotion />
<div className="min-h-screen flex flex-col">
  <div id="main-content" className="flex-1" tabIndex={-1}>{children}</div>
  <SiteFooter />
</div>
<MobileBottomNav />
<SiteChatWidget />
<ConsentAnalyticsScript />
<ConsentAdNetworkScript />
<FormValidationA11y />
<CookieConsentBanner />
</body>
</html>
);
}

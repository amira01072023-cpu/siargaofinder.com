// src/app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import CookieConsentBanner, { COOKIE_CONSENT_STORAGE_KEY } from "@/components/CookieConsentBanner";
import SiteChatWidget from "@/components/SiteChatWidget";
import SiteFooter from "@/components/SiteFooter";
import SiteVisitTracker from "@/components/SiteVisitTracker";
import ConsentAdNetworkScript from "@/components/ConsentAdNetworkScript";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

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
  },
  twitter: {
    card: "summary_large_image",
    title: "Siargao Finder | Local Businesses, Services & Contacts in Siargao",
    description: "Find local businesses, services, rentals, tours, restaurants, and contact details across Siargao.",
  },
  verification: {
    google: "3p_IASh8NiGqhPGB-H_65AobSiPJ6PjdKAhuyfeFq8U",
  },
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
<body>
<a className="skip-link" href="#main-content">Skip to main content</a>
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-9HB4R9D2HX" strategy="afterInteractive" />
<Script
  id="ga4-google-tag"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: [
      "window.dataLayer = window.dataLayer || [];",
      "function gtag(){dataLayer.push(arguments);}",
      "window.gtag = gtag;",
      "gtag('js', new Date());",
      `const savedConsent = window.localStorage.getItem(${JSON.stringify(COOKIE_CONSENT_STORAGE_KEY)});`,
      "const analyticsGranted = savedConsent === 'accepted';",
      "gtag('consent', 'default', { analytics_storage: analyticsGranted ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });",
      "gtag('config', 'G-9HB4R9D2HX', { anonymize_ip: true });",
    ].join(""),
  }}
/>
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
<div className="min-h-screen flex flex-col">
  <div id="main-content" className="flex-1" tabIndex={-1}>{children}</div>
  <SiteFooter />
</div>
<SiteChatWidget />
<ConsentAdNetworkScript />
<CookieConsentBanner />
</body>
</html>
);
}

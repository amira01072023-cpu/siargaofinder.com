// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Siargao Finder",
    template: "%s | Siargao Finder",
  },
  description: "Find local businesses, services, and contacts across Siargao.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
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
      email: "info@siargaofinder.com",
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Siargao Finder",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

return (
<html lang="en">
<body>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
/>
{children}
<CookieConsentBanner />
</body>
</html>
);
}
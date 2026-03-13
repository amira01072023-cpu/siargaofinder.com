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
};

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
<html lang="en">
<body>
{children}
<CookieConsentBanner />
</body>
</html>
);
}
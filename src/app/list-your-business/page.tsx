import type { Metadata } from "next";
import ListYourBusinessPageClient from "@/components/ListYourBusinessPageClient";
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "List Your Business in Siargao",
  description:
    "Submit a Siargao business for review and inclusion in the Siargao Finder local directory, with contact details, location, and services.",
  alternates: {
    canonical: "/list-your-business",
  },
  openGraph: {
    title: "List Your Business in Siargao",
    description:
      "Submit a Siargao business for review and inclusion in the Siargao Finder local directory, with contact details, location, and services.",
    url: "https://www.siargaofinder.com/list-your-business",
    type: "website",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "List Your Business in Siargao",
    description:
      "Submit a Siargao business for review and inclusion in the Siargao Finder local directory, with contact details, location, and services.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
};

export default function ListYourBusinessPage() {
  return <ListYourBusinessPageClient />;
}

import type { Metadata } from "next";
import ListYourBusinessPageClient from "@/components/ListYourBusinessPageClient";

export const metadata: Metadata = {
  title: "List Your Business in Siargao",
  description:
    "Submit your business for review and inclusion in the Siargao Finder directory.",
  alternates: {
    canonical: "/list-your-business",
  },
  openGraph: {
    title: "List Your Business in Siargao",
    description:
      "Submit your business for review and inclusion in the Siargao Finder directory.",
    url: "https://www.siargaofinder.com/list-your-business",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "List Your Business in Siargao",
    description:
      "Submit your business for review and inclusion in the Siargao Finder directory.",
  },
};

export default function ListYourBusinessPage() {
  return <ListYourBusinessPageClient />;
}

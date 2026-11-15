import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Data Rights Request | Siargao Finder" },
  description: "Request access, correction, deletion, or portability of your personal data handled by Siargao Finder.",
  alternates: {
    canonical: "/data-rights-request",
  },
  robots: { index: true, follow: true },
};

export default function DataRightsRequestLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

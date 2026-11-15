import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Report Illegal or Harmful Content | Siargao Finder" },
  description: "Report potentially illegal, abusive, unsafe, or harmful content found on Siargao Finder.",
  alternates: {
    canonical: "/report-illegal-content",
  },
  robots: { index: true, follow: true },
};

export default function ReportIllegalContentLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

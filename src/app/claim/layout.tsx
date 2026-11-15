import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Claim Listing",
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
    },
  },
};

export default function ClaimLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

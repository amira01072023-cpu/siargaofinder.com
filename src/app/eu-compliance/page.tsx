import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "EU Compliance Notice | Siargao Finder",
  description: "How Siargao Finder addresses GDPR, DSA, EAA/WCAG, AI transparency, and consumer protection requirements.",
  alternates: { canonical: "/eu-compliance" },
};

export default function EuCompliancePage() {
  return (
    <LegalLayout title="EU Compliance Notice (2026)">
      <p>
        Siargao Finder applies a compliance baseline aligned with key EU digital requirements, including GDPR,
        the Digital Services Act (DSA), and accessibility expectations under EAA/WCAG.
      </p>

      <h2 className="mt-8 text-xl font-bold">1) Data Protection (GDPR)</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Clear privacy disclosures about data collection, use, and sharing</li>
        <li>Cookie controls with opt-in for non-essential categories</li>
        <li>Data subject request flow for access, correction, deletion, and portability</li>
      </ul>

      <h2 className="mt-8 text-xl font-bold">2) Accessibility (EAA / WCAG)</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Accessibility statement published and maintained</li>
        <li>Keyboard navigation and visible focus indicators</li>
        <li>Ongoing review toward WCAG 2.2 AA alignment</li>
      </ul>

      <h2 className="mt-8 text-xl font-bold">3) Digital Services Act (DSA) Readiness</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Channel to report potentially illegal or harmful content</li>
        <li>Admin moderation workflows for review and status tracking</li>
        <li>Operational controls to prevent misuse of forms and submissions</li>
      </ul>

      <h2 className="mt-8 text-xl font-bold">4) AI Transparency</h2>
      <p>
        If AI-assisted functionality is used in user-facing workflows, we provide notice and keep human review
        for moderation-sensitive actions.
      </p>

      <h2 className="mt-8 text-xl font-bold">5) Consumer Protection</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>No deceptive dark patterns by design intent</li>
        <li>No fake review generation policy</li>
        <li>Clear legal pages and contact channels for complaints</li>
      </ul>

      <h2 className="mt-8 text-xl font-bold">6) Contact</h2>
      <p>
        Compliance inquiries: <a className="text-amber-700 hover:underline" href="mailto:info@siargaofinder.com">info@siargaofinder.com</a>
      </p>
    </LegalLayout>
  );
}

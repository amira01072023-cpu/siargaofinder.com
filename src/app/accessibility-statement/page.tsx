import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Accessibility Statement | Siargao Finder",
  description: "Accessibility commitment and conformance statement for Siargao Finder.",
};

export default function AccessibilityStatementPage() {
  return (
    <LegalLayout title="Accessibility Statement">
      <p>
        Siargao Finder is committed to digital accessibility and aims to align with WCAG 2.2 Level AA.
      </p>

      <h2 className="mt-8 text-xl font-bold">What we are doing</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Clear page structure with readable contrast and scalable text</li>
        <li>Keyboard-accessible navigation and interactive controls</li>
        <li>Decorative graphics marked appropriately to avoid screen-reader noise</li>
        <li>Continuous review of forms and user journeys for accessibility issues</li>
      </ul>

      <h2 className="mt-8 text-xl font-bold">Known limitations</h2>
      <p>
        Some legacy content may not fully meet our target yet. We are actively improving it.
      </p>

      <h2 className="mt-8 text-xl font-bold">Feedback and support</h2>
      <p>
        If you face an accessibility barrier, contact us at{" "}
        <a className="text-amber-700 hover:underline" href="mailto:info@siargaofinder.com">
          info@siargaofinder.com
        </a>
        {" "}with the page URL and issue details.
      </p>
    </LegalLayout>
  );
}

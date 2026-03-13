import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Use | Siargao Finder",
  description: "Terms of Use for Siargao Finder.",
};

export default function TermsOfUsePage() {
  return (
    <LegalLayout title="Terms of Use">
      <p>
        Welcome to <strong>Siargao Finder</strong> (“Website”, “we”, “our”, “us”). By accessing or using this Website,
        you agree to these Terms.
      </p>

      <h2 className="mt-8 text-xl font-bold">1. Eligibility</h2>
      <p>You must be at least 18 years old (or legal age in your jurisdiction).</p>

      <h2 className="mt-8 text-xl font-bold">2. Permitted Use</h2>
      <p>
        You may use this Website for lawful business discovery and directory activities. You must not misuse,
        scrape aggressively, attempt unauthorized access, or disrupt the service.
      </p>

      <h2 className="mt-8 text-xl font-bold">3. Listings and User Content</h2>
      <p>
        By submitting business information, you confirm you have the rights to provide it and that it is accurate.
        We may moderate, edit, or remove content that violates law or these Terms.
      </p>

      <h2 className="mt-8 text-xl font-bold">4. Intellectual Property</h2>
      <p>
        Website content, branding, and structure are protected by applicable copyright and related laws. Third-party
        marks remain property of their respective owners.
      </p>

      <h2 className="mt-8 text-xl font-bold">5. Service Model (Current Phase)</h2>
      <p>
        Listings are currently <strong>free of charge</strong>. We do <strong>not</strong> charge listing fees or accept paid
        sponsored placements at this stage.
      </p>

      <h2 className="mt-8 text-xl font-bold">6. Consumer Protection and Fair UX</h2>
      <p>
        We do not intentionally use deceptive dark patterns. Users must be able to make informed choices,
        including cookie and privacy choices, without hidden manipulation.
      </p>

      <h2 className="mt-8 text-xl font-bold">7. Reviews and Authenticity</h2>
      <p>
        Fake, misleading, or manipulated reviews are prohibited. Report suspicious content through our reporting channel.
      </p>

      <h2 className="mt-8 text-xl font-bold">8. Email Communications</h2>
      <p>
        If we send marketing emails in future, messages will include clear opt-out/unsubscribe options and required
        sender identification in line with applicable anti-spam laws.
      </p>

      <h2 className="mt-8 text-xl font-bold">9. Limitation of Liability</h2>
      <p>
        The Website is provided “as is” without warranties of uninterrupted availability. To the extent permitted by
        law, we are not liable for indirect or consequential losses.
      </p>

      <h2 className="mt-8 text-xl font-bold">10. Governing Law</h2>
      <p>These Terms are governed by the laws of the <strong>Philippines</strong>.</p>

      <h2 className="mt-8 text-xl font-bold">11. Contact</h2>
      <p>
        For legal questions: {" "}
        <a className="text-amber-700 hover:underline" href="mailto:info@siargaofinder.com">
          info@siargaofinder.com
        </a>
      </p>
    </LegalLayout>
  );
}

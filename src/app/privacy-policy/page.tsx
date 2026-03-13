import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Siargao Finder",
  description: "Privacy Policy for Siargao Finder.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        Siargao Finder (“we”, “our”, “us”) respects your privacy. This Policy explains what personal data we
        collect, why we collect it, and your rights.
      </p>

      <h2 className="mt-8 text-xl font-bold">1. Information We Collect</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Information you provide (name, email, listing details, claim/submission content)</li>
        <li>Technical data (IP address, browser type, device info, timestamps)</li>
        <li>Usage data (pages viewed, navigation events, referrer where available)</li>
        <li>Cookie preferences and essential session data</li>
      </ul>

      <h2 className="mt-8 text-xl font-bold">2. How We Use Data</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Operate, secure, and maintain the directory</li>
        <li>Process listing submissions and ownership claims</li>
        <li>Respond to support, legal, and compliance requests</li>
        <li>Improve website performance and user experience</li>
      </ul>

      <h2 className="mt-8 text-xl font-bold">3. Data Sharing</h2>
      <p>We do not sell personal data. We may share data only with:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Infrastructure and hosting providers (for secure site operations)</li>
        <li>Legal/regulatory authorities when required by law</li>
        <li>Service providers acting under our instructions and confidentiality obligations</li>
      </ul>

      <h2 className="mt-8 text-xl font-bold">4. Cookies and Consent</h2>
      <p>
        We use a cookie preference banner. Non-essential cookies are disabled unless you explicitly accept them.
        Essential cookies required for security and core functionality may still be used.
      </p>

      <h2 className="mt-8 text-xl font-bold">5. Data Subject Rights</h2>
      <p>You may request access, correction, deletion, or data portability where applicable by law.</p>
      <p className="mt-2">
        To submit a request, use our {" "}
        <a className="text-amber-700 hover:underline" href="/data-rights-request">
          Data Rights Request form
        </a>
        {" "}or email {" "}
        <a className="text-amber-700 hover:underline" href="mailto:info@siargaofinder.com?subject=Data%20Subject%20Request">
          info@siargaofinder.com
        </a>
        {" "}with your request type and identifying details.
      </p>

      <h2 className="mt-8 text-xl font-bold">6. Retention</h2>
      <p>
        We retain personal data only as long as necessary for operational, legal, and security purposes, then
        delete or anonymize it where appropriate.
      </p>

      <h2 className="mt-8 text-xl font-bold">7. International Compliance Notes</h2>
      <p>
        For users in regions with specific privacy rights (including GDPR-like frameworks), we will handle valid
        requests according to applicable law.
      </p>

      <h2 className="mt-8 text-xl font-bold">8. AI Transparency</h2>
      <p>
        Where AI-assisted features are used, we provide appropriate disclosure and maintain human oversight for
        moderation-sensitive decisions.
      </p>

      <h2 className="mt-8 text-xl font-bold">9. Contact</h2>
      <p>
        Privacy and data requests: {" "}
        <a className="text-amber-700 hover:underline" href="mailto:info@siargaofinder.com">
          info@siargaofinder.com
        </a>
      </p>
    </LegalLayout>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, PenSquare, Tag } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import BlogShareButtons from "@/components/BlogShareButtons";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Medical Options in Siargao: Clinics, Hospital, Dentists, and Emergency Contacts",
  description:
    "Looking for medical options in Siargao? This practical guide covers the main hospital, clinics, RHUs, dentists, and emergency contacts around Siargao Island.",
  alternates: {
    canonical: "/blog/medical-options-siargao",
  },
  openGraph: {
    title: "Medical Options in Siargao: Clinics, Hospital, Dentists, and Emergency Contacts",
    description:
      "Looking for medical options in Siargao? This practical guide covers the main hospital, clinics, RHUs, dentists, and emergency contacts around Siargao Island.",
    url: "https://www.siargaofinder.com/blog/medical-options-siargao",
    type: "article",
    images: [{ url: "/og-siargaofinder-logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Options in Siargao: Clinics, Hospital, Dentists, and Emergency Contacts",
    description:
      "Looking for medical options in Siargao? This practical guide covers the main hospital, clinics, RHUs, dentists, and emergency contacts around Siargao Island.",
    images: ["/og-siargaofinder-logo.jpg"],
  },
};

export default function MedicalOptionsSiargaoPage() {
  const siteUrl = getSiteUrl();
  const publishedDate = "2026-04-22";
  const readingTime = "10 min read";
  const authorName = "M1GX";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Medical Options in Siargao: Clinics, Hospital, Dentists, and Emergency Contacts",
    description:
      "Looking for medical options in Siargao? This practical guide covers the main hospital, clinics, RHUs, dentists, and emergency contacts around Siargao Island.",
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Siargao Finder" },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: `${siteUrl}/blog/medical-options-siargao`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the main hospital in Siargao?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The main hospital on the island is generally listed as Siargao Island Medical Center in Dapa, also referred to in some sources as Siargao District Hospital.",
        },
      },
      {
        "@type": "Question",
        name: "Are there clinics in General Luna?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. General Luna has several medical options, including RAYA Clinic, MetroDocs, Island Doctors PH, BMCI, Aero Island Med Clinic, and Siargao Primary Care Facility.",
        },
      },
      {
        "@type": "Question",
        name: "Is there emergency medical care in Siargao?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "There is limited emergency care on the island, with Siargao Island Medical Center in Dapa serving as the main hospital fallback. For rescue support, local MDRRMO numbers and 911 may also help.",
        },
      },
      {
        "@type": "Question",
        name: "Does Siargao have dental clinics?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Public listings show Eyog Dental Clinic in General Luna and Siargao Dental Clinic in Dapa among the clearer dental options.",
        },
      },
      {
        "@type": "Question",
        name: "Will I need to leave Siargao for major treatment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Possibly. For major trauma, surgery, specialist care, or severe illness, patients may still need transfer to Surigao City, Cebu, or another larger center.",
        },
      },
    ],
  };

  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PublicSiteHeader showBlogLink={false} showListYourBusinessLink homeLabel="Home" />

      <section className="page-section page-hero max-w-5xl">
        <p className="page-kicker">Blog</p>
        <div className="blog-post-author-card">
          <Image
            src="/authors/miggy-pagapong.jpg"
            alt="M1GX"
            width={64}
            height={64}
            className="blog-post-avatar-image"
          />
          <div className="blog-post-author-copy">
            <p className="blog-post-author-name">{authorName}</p>
            <p className="blog-post-author-bio">Content Writer, Researcher, SEO, Gamer and Gym-buddy</p>
            <div className="blog-post-meta-row">
              <span className="blog-post-meta-pill"><Tag size={14} /> Health guide</span>
              <span className="blog-post-meta-pill"><CalendarDays size={14} /> {publishedDate}</span>
              <span className="blog-post-meta-pill"><Clock3 size={14} /> {readingTime}</span>
              <span className="blog-post-meta-pill"><PenSquare size={14} /> Siargao practical guide</span>
            </div>
          </div>
        </div>

        <h1 className="page-title">Medical Options in Siargao: Clinics, Hospital, Dentists, and Emergency Contacts</h1>
        <p className="page-subtitle guide-body">
          If you are traveling or living in Siargao, it is worth knowing your medical options before you need them. The island has a practical mix of hospital care, private clinics, public rural health units, diagnostic services, dental care, and rescue contacts, with the strongest concentration around General Luna and Dapa.
        </p>

        <BlogShareButtons title={metadata.title as string} path={metadata.alternates?.canonical as string} />

        <div className="blog-post-intro-card mt-8">
          <p className="blog-post-intro-label">In this post</p>
          <p className="blog-post-intro-copy">
            This guide covers the main hospital in Dapa, clinic options in General Luna, public health units, dental care, rescue numbers, and what to do if you need help while you are on the island.
          </p>
        </div>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Main hospital fallback</span>
            <p className="guide-highlight-value">For more serious cases on the island, the main fallback is still Siargao Island Medical Center in Dapa.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best clinic area</span>
            <p className="guide-highlight-value">General Luna has the strongest concentration of private clinic options for routine consultations and non-hospital care.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Important reality</span>
            <p className="guide-highlight-value">For major trauma, specialist care, or severe illness, off-island transfer may still be necessary.</p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6 guide-body">
          <h2 className="section-title text-[1.35rem]">Important disclaimer</h2>
          <div className="mt-4 space-y-4">
            <p>
              The clinics, hospitals, service descriptions, operating hours, and contact numbers in this guide were compiled from publicly available online sources, including websites, directories, social media pages, and listing platforms. Those details can change without notice.
            </p>
            <p>
              It is always best to call or message the provider directly to confirm current availability, exact services, clinic hours, and emergency response options before relying on them. If you are dealing with a life-threatening emergency, call <strong>911</strong>, contact the nearest local rescue unit, or go straight to the nearest appropriate medical facility.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-10 guide-body">
          <section>
            <h2 className="section-title text-[1.6rem]">Main hospital in Siargao</h2>
            <div className="mt-5 guide-surface p-6">
              <h3 className="text-[1.1rem] font-semibold text-slate-900">Siargao Island Medical Center / SIMC / Siargao District Hospital — Dapa</h3>
              <div className="mt-4 space-y-4">
                <p>
                  This is widely regarded as the main hospital on Siargao Island and the most important island-based fallback for emergencies, hospital care, X-ray, animal bites, and more serious medical cases.
                </p>
                <p>
                  It is located in Dapa, usually around 30 to 40 minutes from General Luna depending on traffic and road conditions. Some sources refer to it as Siargao Island Medical Center, while others use Siargao District Hospital.
                </p>
                <div>
                  <p><strong>Listed contact numbers:</strong></p>
                  <ul className="mt-2 list-disc pl-6 space-y-1">
                    <li>+63 949 738 7043</li>
                    <li>+63 948 900 6922</li>
                  </ul>
                </div>
                <div>
                  <p><strong>Public listings describe services such as:</strong></p>
                  <ul className="mt-2 list-disc pl-6 space-y-1">
                    <li>general medicine</li>
                    <li>OB-GYN</li>
                    <li>pediatrics</li>
                    <li>surgery</li>
                    <li>X-ray</li>
                    <li>ECG</li>
                    <li>laboratory services</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Private clinics and medical centers in General Luna</h2>
            <p className="mt-4">
              For minor health concerns, routine consultations, diagnostics, and some urgent but non-hospital cases, General Luna has the most useful concentration of private clinic options on the island.
            </p>
            <div className="mt-5 guide-surface overflow-x-auto p-4 md:p-5">
              <table className="min-w-full text-left restaurant-guide-table restaurant-guide-table--detailed">
                <thead>
                  <tr>
                    <th>Clinic</th>
                    <th>Location</th>
                    <th>Contact</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="font-semibold text-slate-900">RAYA Clinic Siargao</td><td>General Luna</td><td>+63 917 111 7292</td><td>General care, urgent care, laboratory services, X-ray, and wellness support; appears to advertise 24/7 service</td></tr>
                  <tr><td className="font-semibold text-slate-900">MetroDocs Medical Clinic Siargao</td><td>General Luna</td><td>0918 926 3112 / 0908 216 5296</td><td>Public listings mention CBC, blood chemistry, urinalysis, fecalysis, ECG, and teleconsultation</td></tr>
                  <tr><td className="font-semibold text-slate-900">Island Doctors PH</td><td>National Highway, Dapa–General Luna Road, Purok 5</td><td>+63 917 848 4357</td><td>Another local clinic option in General Luna</td></tr>
                  <tr><td className="font-semibold text-slate-900">BMCI</td><td>234 Espiridion St., Poblacion 5</td><td>+63 917 701 9852</td><td>Listed locally as another medical option in town</td></tr>
                  <tr><td className="font-semibold text-slate-900">Aero Island Med Clinic Inc.</td><td>Poblacion IV, in front of BDO Network Bank</td><td>0919 006 6568 / 0917 520 8817</td><td>Listed hours: Monday to Friday, 8 AM to 5 PM; closed on weekends</td></tr>
                  <tr><td className="font-semibold text-slate-900">Siargao Primary Care Facility</td><td>Back Road, General Luna</td><td></td><td>Listed hours: Monday to Saturday, 8 AM to 5 PM; selected lab services and consultations</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Public health units in Siargao</h2>
            <p className="mt-4">
              Public health facilities also matter, especially if you are closer to a municipality center than to General Luna or Dapa, or if you need more basic community-based care.
            </p>
            <div className="mt-5 guide-surface overflow-x-auto p-4 md:p-5">
              <table className="min-w-full text-left restaurant-guide-table restaurant-guide-table--compact">
                <thead>
                  <tr>
                    <th>Facility</th>
                    <th>Area</th>
                    <th>Contact</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="font-semibold text-slate-900">General Luna Rural Health Unit</td><td>General Luna</td><td>+63 938 448 5059</td><td>Public primary-care option in Brgy. 1 Poblacion</td></tr>
                  <tr><td className="font-semibold text-slate-900">Dapa Rural Health Unit</td><td>Dapa</td><td></td><td>Focused on primary care, preventive medicine, maternal care, and local public health services</td></tr>
                  <tr><td className="font-semibold text-slate-900">Del Carmen Rural Health Unit</td><td>Del Carmen</td><td>0930 648 6721 / 0995 118 5859</td><td>A practical public-care option if you are closer to Del Carmen</td></tr>
                  <tr><td className="font-semibold text-slate-900">San Benito Super Health Center</td><td>San Benito</td><td></td><td>Opened in 2025 for broader outpatient and community care</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Other medical and diagnostic options in Dapa</h2>
            <div className="mt-5 space-y-6">
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">Isla Klinik Medical Clinic and Diagnostic / Isla Klinika Medical and Diagnostic Center</h3>
                <p className="mt-2">This clinic and diagnostic center is listed in Juan Luna St., Brgy. 6, Dapa. Public snippets show contact details, but these should still be verified before visiting.</p>
                <p className="mt-2"><strong>Listed contacts:</strong> 0930 836 1513 / 086 809 136</p>
                <p className="mt-2">Some public posts also describe services under PhilHealth Konsulta, including consultations, essential medicines, and laboratory tests.</p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">JDC Clinic</h3>
                <p className="mt-2">JDC Clinic is another Dapa-based option, especially relevant for OB-GYNE needs.</p>
                <p className="mt-2"><strong>Address:</strong> Lopez Jaena St., Dapa</p>
                <p className="mt-2"><strong>OB-GYNE listed:</strong> Dr. Chloe C. Digal-Corpin</p>
                <p className="mt-2"><strong>Contact:</strong> +63 949 738 7043</p>
                <p className="mt-2"><strong>Listed hours:</strong> Monday to Saturday, 9 AM to 5 PM; Sunday, 9 AM to 12 NN</p>
                <p className="mt-2">Appointment is recommended.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Dental clinics in Siargao</h2>
            <p className="mt-4">
              If you need dental care while on the island, the clearest listed options are currently in General Luna and Dapa.
            </p>
            <div className="mt-5 guide-surface overflow-x-auto p-4 md:p-5">
              <table className="min-w-full text-left restaurant-guide-table restaurant-guide-table--compact">
                <thead>
                  <tr>
                    <th>Clinic</th>
                    <th>Area</th>
                    <th>Contact</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="font-semibold text-slate-900">Eyog Dental Clinic</td><td>General Luna</td><td>+63 923 435 8312</td><td>Purok 5, General Luna; Monday to Saturday 9 AM to 5 PM, Sunday 11 AM to 3 PM</td></tr>
                  <tr><td className="font-semibold text-slate-900">Siargao Dental Clinic</td><td>Dapa</td><td>+63 948 541 2735</td><td>Gomez St., Dapa; Dentist listed: Dr. Heidi J. Gelsano</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">Appointment is recommended for both listed dental options.</p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Public hospital option in Del Carmen</h2>
            <p className="mt-4">
              <strong>Del Carmen Medicare Community Hospital</strong> is a public hospital option in Del Carmen and may be useful if you are closer to the airport side of the island than Dapa or General Luna.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Rescue and emergency contacts in Siargao</h2>
            <div className="mt-5 guide-surface overflow-x-auto p-4 md:p-5">
              <table className="min-w-full text-left restaurant-guide-table restaurant-guide-table--compact">
                <thead>
                  <tr>
                    <th>Contact point</th>
                    <th>Number</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="font-semibold text-slate-900">MDRRMO Rescue — Dapa</td><td>0917 529 9002</td><td>Publicly listed rescue contact</td></tr>
                  <tr><td className="font-semibold text-slate-900">MDRRMO Rescue — General Luna</td><td>0930 685 7839</td><td>Publicly listed rescue contact</td></tr>
                  <tr><td className="font-semibold text-slate-900">National Emergency Hotline</td><td>911</td><td>Response speed can vary by location, signal, weather, and island conditions</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Surigao City hospital fallback numbers</h2>
            <p className="mt-4">
              If you need a larger hospital off-island, these Surigao City fallback contacts may be useful to keep on hand.
            </p>
            <div className="mt-5 guide-surface overflow-x-auto p-4 md:p-5">
              <table className="min-w-full text-left restaurant-guide-table restaurant-guide-table--compact">
                <thead>
                  <tr>
                    <th>Hospital</th>
                    <th>Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="font-semibold text-slate-900">CARAGA Hospital</td><td>086 826 0497</td></tr>
                  <tr><td className="font-semibold text-slate-900">Medical Hospital</td><td>086 826 0100</td></tr>
                  <tr><td className="font-semibold text-slate-900">Miranda Hospital</td><td>086 826 8995</td></tr>
                  <tr><td className="font-semibold text-slate-900">Health Specialist</td><td>086 826 6266</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">What to do if you need medical help in Siargao</h2>
            <p className="mt-4">A simple way to think about it:</p>
            <div className="guide-checklist mt-4">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>For serious illness, injury, animal bites, or emergencies, try Siargao Island Medical Center in Dapa</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>For urgent but non-hospital concerns in General Luna, check RAYA Clinic, MetroDocs, Island Doctors PH, BMCI, or Aero Island Med Clinic</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>For basic public care, use the nearest Rural Health Unit</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>For dental care, look at Eyog Dental Clinic in General Luna or Siargao Dental Clinic in Dapa</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>For ambulance or rescue help, try the local MDRRMO rescue numbers or 911</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Frequently asked questions</h2>
            <div className="mt-5 space-y-6">
              <div>
                <h3 className="text-[1.05rem] font-semibold text-slate-900">What is the main hospital in Siargao?</h3>
                <p className="mt-2">The main hospital on the island is generally listed as Siargao Island Medical Center in Dapa, also referred to in some sources as Siargao District Hospital.</p>
              </div>
              <div>
                <h3 className="text-[1.05rem] font-semibold text-slate-900">Are there clinics in General Luna?</h3>
                <p className="mt-2">Yes. General Luna has several medical options, including RAYA Clinic, MetroDocs, Island Doctors PH, BMCI, Aero Island Med Clinic, and Siargao Primary Care Facility.</p>
              </div>
              <div>
                <h3 className="text-[1.05rem] font-semibold text-slate-900">Is there emergency medical care in Siargao?</h3>
                <p className="mt-2">There is limited emergency care on the island, with Siargao Island Medical Center in Dapa serving as the main hospital fallback. For rescue support, local MDRRMO numbers and 911 may also help.</p>
              </div>
              <div>
                <h3 className="text-[1.05rem] font-semibold text-slate-900">Does Siargao have dental clinics?</h3>
                <p className="mt-2">Yes. Public listings show Eyog Dental Clinic in General Luna and Siargao Dental Clinic in Dapa among the clearer dental options.</p>
              </div>
              <div>
                <h3 className="text-[1.05rem] font-semibold text-slate-900">Will I need to leave Siargao for major treatment?</h3>
                <p className="mt-2">Possibly. For major trauma, surgery, specialist care, or severe illness, patients may still need transfer to Surigao City, Cebu, or another larger center.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Final thoughts</h2>
            <p className="mt-4">
              Medical care in Siargao is more accessible than many travelers expect, especially around General Luna and Dapa, but it still helps to stay realistic about the island’s limits. There are useful clinics, diagnostic options, public health units, dental care, and a main hospital fallback in Dapa. For major treatment, specialist care, or more serious emergencies, off-island transfer may still be necessary.
            </p>
            <p className="mt-4">
              If you are staying in Siargao for more than a short trip, one of the smartest things you can do is save a few key contacts in your phone ahead of time, then verify them before you ever need them:
            </p>
            <div className="guide-checklist mt-4">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Siargao Island Medical Center</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>RAYA Clinic</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>MetroDocs</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>General Luna Rescue</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Dapa Rescue</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>911</span></div>
            </div>
          </section>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Related pages</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/blog/general-luna-travel-guide">Read: General Luna Travel Guide</Link></li>
            <li><Link href="/blog/siargao-first-time-visitors">Read: Siargao for First-Time Visitors</Link></li>
            <li><Link href="/blog/siargao-airport-guide">Read: Siargao Airport Guide</Link></li>
            <li><Link href="/blog/siargao-airport-to-general-luna">Read: How to Get from Siargao Airport to General Luna</Link></li>
            <li><Link href="/guide/where-to-find-services-in-siargao">Read: Where to Find Services in Siargao</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

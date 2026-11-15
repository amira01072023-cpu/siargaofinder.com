import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, PenSquare, Tag } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import BlogShareButtons from "@/components/BlogShareButtons";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Siargao Island Hopping Contacts: Tour Operators and Booking Numbers in 2026",
  description:
    "Looking for Siargao island hopping contacts? Here’s a simple 2026 directory of tour operators, booking numbers, WhatsApp contacts, and travel agencies for island hopping in Siargao.",
  alternates: {
    canonical: "/blog/siargao-island-hopping-contacts",
  },
  openGraph: {
    title: "Siargao Island Hopping Contacts: Tour Operators and Booking Numbers in 2026",
    description:
      "Looking for Siargao island hopping contacts? Here’s a simple 2026 directory of tour operators, booking numbers, WhatsApp contacts, and travel agencies for island hopping in Siargao.",
    url: "https://www.siargaofinder.com/blog/siargao-island-hopping-contacts",
    type: "article",
    images: [{ url: "/og-siargaofinder-logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siargao Island Hopping Contacts: Tour Operators and Booking Numbers in 2026",
    description:
      "Looking for Siargao island hopping contacts? Here’s a simple 2026 directory of tour operators, booking numbers, WhatsApp contacts, and travel agencies for island hopping in Siargao.",
    images: ["/og-siargaofinder-logo.jpg"],
  },
};

export default function SiargaoIslandHoppingContactsPage() {
  const siteUrl = getSiteUrl();
  const publishedDate = "2026-04-22";
  const readingTime = "8 min read";
  const authorName = "M1GX";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Siargao Island Hopping Contacts: Tour Operators and Booking Numbers in 2026",
    description:
      "Looking for Siargao island hopping contacts? Here’s a simple 2026 directory of tour operators, booking numbers, WhatsApp contacts, and travel agencies for island hopping in Siargao.",
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Siargao Finder" },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: `${siteUrl}/blog/siargao-island-hopping-contacts`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I book island hopping in Siargao?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book island hopping in Siargao by contacting tour operators directly through mobile number, WhatsApp, Viber, Facebook, or email.",
        },
      },
      {
        "@type": "Question",
        name: "What is included in a Siargao island hopping tour?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on the operator, but packages may include boat transfers, island stops, lunch, and some fees. Always confirm before booking.",
        },
      },
      {
        "@type": "Question",
        name: "Is it better to book island hopping in advance in Siargao?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, especially during peak season, weekends, and holidays. Booking early gives you more choices and better availability.",
        },
      },
      {
        "@type": "Question",
        name: "Can I book a private island hopping tour in Siargao?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Many operators offer private island hopping tours in Siargao, but inclusions, routes, and rates vary, so it is best to confirm directly before paying.",
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
              <span className="blog-post-meta-pill"><Tag size={14} /> Tour guide</span>
              <span className="blog-post-meta-pill"><CalendarDays size={14} /> {publishedDate}</span>
              <span className="blog-post-meta-pill"><Clock3 size={14} /> {readingTime}</span>
              <span className="blog-post-meta-pill"><PenSquare size={14} /> Siargao contacts guide</span>
            </div>
          </div>
        </div>

        <h1 className="page-title">Siargao Island Hopping Contacts: Tour Operators and Booking Numbers in 2026</h1>
        <p className="page-subtitle guide-body">
          Planning a Siargao island hopping trip gets easier when you already have a shortlist of operators to message. Whether you are looking for a Tri-Island tour, a Mam-on Island trip, or a private day tour, having direct booking details in one place can save time.
        </p>

        <BlogShareButtons title={metadata.title as string} path={metadata.alternates?.canonical as string} />

        <div className="blog-post-intro-card mt-8">
          <p className="blog-post-intro-label">In this post</p>
          <p className="blog-post-intro-copy">
            This directory is designed as a simple reference page for travelers who want quick access to Siargao island hopping contacts, including mobile numbers, WhatsApp, Viber, and email where available.
          </p>
        </div>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best use case</span>
            <p className="guide-highlight-value">Helpful if you want to message several operators quickly and compare responses before booking.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best booking tip</span>
            <p className="guide-highlight-value">During peak season, weekends, and holidays, message multiple operators at once for faster availability checks.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best traveler habit</span>
            <p className="guide-highlight-value">Always confirm inclusions, fees, meetup point, and weather policy before paying.</p>
          </div>
        </div>

        <div className="mt-10 space-y-10 guide-body">
          <section>
            <p>
              The list below is not ranked. It is simply organized to make outreach easier. If you are traveling during peak season, weekends, or holidays, it is smart to contact several operators at once to compare availability, package details, and pricing.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Siargao island hopping directory</h2>
            <div className="mt-5 guide-surface overflow-x-auto p-4 md:p-5">
              <table className="min-w-full text-left restaurant-guide-table restaurant-guide-table--detailed">
                <thead>
                  <tr>
                    <th>Business or operator</th>
                    <th>Contact details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="font-semibold text-slate-900">Siargao Island Hopping PH / ADAII Travel and Tours</td><td>WhatsApp/Viber: +63 917 174 5705; Phone: 0947 845 6843; Email: reservations@siargaoislandhopping.com</td></tr>
                  <tr><td className="font-semibold text-slate-900">Siargao Island Tour / Siargao Island Getaway / Elvis Fajardo Evangelista</td><td>Call/Text: +63 917 834 2526; WhatsApp/Viber: +63 923 348 8333</td></tr>
                  <tr><td className="font-semibold text-slate-900">Siargao Explorer</td><td>WhatsApp/Viber: 0951 763 1793; Contact: +63 976 455 0772</td></tr>
                  <tr><td className="font-semibold text-slate-900">Tara Siargao Ta / AJROB Travel and Tour</td><td>WhatsApp: +63 946 589 5393; Globe: 0954 321 1183; Other: 0995 648 7102</td></tr>
                  <tr><td className="font-semibold text-slate-900">Kuya Ralph / Ralph Siargao Landtour &amp; Island Hopping</td><td>Call/Text/WhatsApp: +63 927 836 3971</td></tr>
                  <tr><td className="font-semibold text-slate-900">John Michael Pilapil</td><td>Contact/WhatsApp: 0935 063 1818</td></tr>
                  <tr><td className="font-semibold text-slate-900">Dee Siargaonon / Dee Tour Booking</td><td>Globe/WhatsApp: 0966 649 7725</td></tr>
                  <tr><td className="font-semibold text-slate-900">Turista Siargao / Jem Perea</td><td>WhatsApp/Viber: +63 953 347 4600</td></tr>
                  <tr><td className="font-semibold text-slate-900">Viewteful Siargao</td><td>WhatsApp: 0966 649 7674</td></tr>
                  <tr><td className="font-semibold text-slate-900">Siargao Solve / D&apos;Dreamz Travel and Tours</td><td>Contact/WhatsApp: 0946 953 4705</td></tr>
                  <tr><td className="font-semibold text-slate-900">MC Travel and Tour Siargao</td><td>Text/Call: +63 921 734 0390; WhatsApp: 0956 220 2226</td></tr>
                  <tr><td className="font-semibold text-slate-900">South Shore Travel and Tours</td><td>Mobile/WhatsApp/Viber: +63 906 482 7862; Sun: +63 923 245 5202</td></tr>
                  <tr><td className="font-semibold text-slate-900">Marieya Siargao Car Rental / Tours</td><td>Mobile: 0910 963 2090; WhatsApp: +63 907 805 5844</td></tr>
                  <tr><td className="font-semibold text-slate-900">Gladex Travel and Tours</td><td>Contact: 0917 653 1100; Email: Support@gladextours.com</td></tr>
                  <tr><td className="font-semibold text-slate-900">Abraham Tours Philippines</td><td>Contact: +63 927 073 6267; Email: tours.phl@abraham.travel</td></tr>
                  <tr><td className="font-semibold text-slate-900">Mam-on + Tri Island contact</td><td>WhatsApp/Globe: 0929 381 2456</td></tr>
                  <tr><td className="font-semibold text-slate-900">Annil / Tri-Island tour post</td><td>Contact: 0905 497 6902</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Tips before booking a Siargao island hopping tour</h2>
            <div className="guide-checklist mt-4">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Ask whether the rate is for a joiner tour or a private tour</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Confirm which islands are included in the package</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Check whether entrance fees, environmental fees, or boat fees are already included</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Ask whether lunch is included</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Confirm the meetup point and start time</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Ask whether hotel pickup is available</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Check what happens if weather conditions affect the trip</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Ask for booking confirmation through WhatsApp or Viber if possible</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Why it helps to save multiple Siargao tour contacts</h2>
            <p className="mt-4">
              Not every operator replies at the same speed, and availability can change fast during busy travel dates. Saving several Siargao island hopping contacts gives you a better chance of finding:
            </p>
            <div className="guide-checklist mt-4">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>same-day or next-day availability</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>a better package price</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>a private group setup</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>a specific island route like Tri-Island or Mam-on</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>a backup option if one operator does not respond</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Frequently asked questions</h2>
            <div className="mt-5 space-y-6">
              <div>
                <h3 className="text-[1.05rem] font-semibold text-slate-900">How do I book island hopping in Siargao?</h3>
                <p className="mt-2">You can book island hopping in Siargao by contacting tour operators directly through mobile number, WhatsApp, Viber, Facebook, or email.</p>
              </div>
              <div>
                <h3 className="text-[1.05rem] font-semibold text-slate-900">What is included in a Siargao island hopping tour?</h3>
                <p className="mt-2">It depends on the operator, but packages may include boat transfers, island stops, lunch, and some fees. Always confirm before booking.</p>
              </div>
              <div>
                <h3 className="text-[1.05rem] font-semibold text-slate-900">Is it better to book island hopping in advance in Siargao?</h3>
                <p className="mt-2">Yes, especially during peak season, weekends, and holidays. Booking early gives you more choices and better availability.</p>
              </div>
              <div>
                <h3 className="text-[1.05rem] font-semibold text-slate-900">Can I book a private island hopping tour in Siargao?</h3>
                <p className="mt-2">Yes. Many operators offer private island hopping tours for couples, families, or groups. Ask directly when inquiring.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Final thoughts</h2>
            <p className="mt-4">
              If you are planning a day tour in Siargao, having a ready list of Siargao island hopping contacts makes booking faster and easier. This directory gives you a simple place to start, whether you want to compare operators, ask about pricing, or arrange a custom trip.
            </p>
            <p className="mt-4">
              For the smoothest experience, message a few operators, confirm what is included, and save your booking conversation before your tour date.
            </p>
          </section>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Related pages</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/guide/siargao-island-hopping-guide">Read: Siargao Island Hopping Guide</Link></li>
            <li><Link href="/blog/best-things-to-do-in-siargao-beyond-surfing">Read: Best Things to Do in Siargao Beyond Surfing</Link></li>
            <li><Link href="/blog/best-beaches-in-siargao">Read: Best Beaches in Siargao</Link></li>
            <li><Link href="/blog/siargao-first-time-visitors">Read: Siargao for First-Time Visitors</Link></li>
            <li><Link href="/blog/siargao-itinerary">Read: Siargao Itinerary</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

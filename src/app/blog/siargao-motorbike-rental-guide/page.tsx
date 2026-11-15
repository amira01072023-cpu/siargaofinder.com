import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, PenSquare, Tag } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import BlogShareButtons from "@/components/BlogShareButtons";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Siargao Motorbike Rental Guide | Where to Rent a Scooter in General Luna",
  description:
    "Renting a motorbike in Siargao? Compare trusted scooter rental options in General Luna, with prices, contacts, surfboard rack availability, and booking tips.",
  alternates: {
    canonical: "/blog/siargao-motorbike-rental-guide",
  },
  openGraph: {
    title: "Siargao Motorbike Rental Guide | Where to Rent a Scooter in General Luna",
    description:
      "Renting a motorbike in Siargao? Compare trusted scooter rental options in General Luna, with prices, contacts, surfboard rack availability, and booking tips.",
    url: "https://www.siargaofinder.com/blog/siargao-motorbike-rental-guide",
    type: "article",
    images: [{ url: "/og-siargaofinder-logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siargao Motorbike Rental Guide | Where to Rent a Scooter in General Luna",
    description:
      "Renting a motorbike in Siargao? Compare trusted scooter rental options in General Luna, with prices, contacts, surfboard rack availability, and booking tips.",
    images: ["/og-siargaofinder-logo.jpg"],
  },
};

export default function SiargaoMotorbikeRentalGuidePage() {
  const siteUrl = getSiteUrl();
  const publishedDate = "2026-04-22";
  const readingTime = "9 min read";
  const authorName = "M1GX";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Siargao Motorbike Rental Guide: Where to Rent a Scooter in General Luna",
    description:
      "Renting a motorbike in Siargao? Compare trusted scooter rental options in General Luna, with prices, contacts, surfboard rack availability, and booking tips.",
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Siargao Finder" },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: `${siteUrl}/blog/siargao-motorbike-rental-guide`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you need a license to rent a motorbike in Siargao?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most rental providers require a valid driver’s license, and some may also ask for a valid ID or signed waiver.",
        },
      },
      {
        "@type": "Question",
        name: "How much does it cost to rent a scooter in General Luna?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rates commonly start around ₱350 to ₱600 per day depending on the scooter model, rental length, delivery area, and included extras.",
        },
      },
      {
        "@type": "Question",
        name: "Can you rent a scooter with a surfboard rack in Siargao?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Some providers in General Luna offer scooters or motorbikes with surfboard racks, which can be useful for surfers staying near the main break areas.",
        },
      },
      {
        "@type": "Question",
        name: "Do motorbike rentals in Siargao include helmets?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many providers include one or two helmets, but it is still best to confirm what is included before booking.",
        },
      },
      {
        "@type": "Question",
        name: "Is it better to book online or rent directly in General Luna?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Online platforms are convenient if you want to reserve ahead of arrival, while direct local rentals may offer more flexibility for longer stays or custom delivery arrangements.",
        },
      },
    ],
  };

  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PublicSiteHeader showBlogLink={false} showListYourBusinessLink homeLabel="Home" />

      <section className="page-section page-hero max-w-4xl">
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
              <span className="blog-post-meta-pill"><Tag size={14} /> Transport</span>
              <span className="blog-post-meta-pill"><CalendarDays size={14} /> {publishedDate}</span>
              <span className="blog-post-meta-pill"><Clock3 size={14} /> {readingTime}</span>
              <span className="blog-post-meta-pill"><PenSquare size={14} /> Siargao local guide</span>
            </div>
          </div>
        </div>

        <h1 className="page-title">Siargao Motorbike Rental Guide: Where to Rent a Scooter in General Luna</h1>
        <p className="page-subtitle guide-body">
          Renting a motorbike in Siargao is one of the easiest ways to get around the island, especially if you’re staying in General Luna.
        </p>

        <BlogShareButtons title={metadata.title as string} path={metadata.alternates?.canonical as string} />

        <div className="blog-post-intro-card mt-8">
          <p className="blog-post-intro-label">In this post</p>
          <p className="blog-post-intro-copy">
            We compare scooter and motorcycle rental options in General Luna, what rates usually look like, what to check before paying, and how to choose the right bike for your trip.
          </p>
        </div>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Typical starting range</span>
            <p className="guide-highlight-value">Many listings commonly start around ₱350 to ₱600 per day, depending on the bike, duration, and extras.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best area to rent</span>
            <p className="guide-highlight-value">General Luna is the most practical base because most rental shops, stays, restaurants, and surf spots are nearby.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best for surfers</span>
            <p className="guide-highlight-value">Some rental shops offer surfboard rack options, which can make daily beach runs much easier.</p>
          </div>
        </div>

        <div className="mt-8 space-y-5 guide-body">
          <p>
            Most rental shops are located around <strong>Tourism Road, Catangnan, Malinao, and nearby accommodation areas</strong>. For many travelers, renting a scooter is the simplest way to reach surf spots, cafés, restaurants, beaches, and nearby towns without relying on tricycles all day.
          </p>
          <p>
            If you plan to surf, some providers also offer <strong>motorbikes with surfboard racks</strong>. If you are carrying more weight or planning longer rides, a bigger bike may be worth considering.
          </p>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Before you book</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              Prices, deposits, delivery coverage, and included items can change. It is best to confirm the latest details directly with the rental provider before booking.
            </p>
            <p>
              This guide is most useful for travelers who want to compare local rental options in and around <Link href="/municipality/general-luna" className="link-inline">General Luna</Link> before choosing where to rent.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-10 guide-body">
          <section>
            <h2 className="section-title text-[1.6rem]">Best motorbike rental options in Siargao</h2>
            <div className="mt-5 space-y-8">
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">1. Golden Bell Siargao</h3>
                <p className="mt-2">
                  Golden Bell Siargao is located on Tourism Road in General Luna. Their listed rates start from <strong>₱350 per day</strong>, with bike options including Honda Beat, Honda Click 125, Yamaha Fazzio 125, Honda TMX 125, XR150, Cafe Racer, and Honda Navi.
                </p>
                <p className="mt-2">
                  Their website also mentions no passport deposit, two helmets, a phone holder, WhatsApp support, and delivery around General Luna and nearby areas.
                </p>
                <p className="mt-2"><strong>Best for:</strong> Clear pricing, easy booking, and no passport deposit</p>
                <p className="mt-2"><strong>Contact:</strong> +63 995 869 2455</p>
                <p className="mt-2"><strong>Email:</strong> goldenbellmotorbikesiargao@gmail.com</p>
                <p className="mt-2"><strong>Area:</strong> Tourism Road, General Luna</p>
              </div>

              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">2. Siargao Motorbike Rentals</h3>
                <p className="mt-2">
                  Siargao Motorbike Rentals operates in General Luna, off Dapa–General Luna Road, Purok 5, near Kawayan Hostel. Their listed units include Honda Beat, Honda Click, Yamaha Fazzio, Honda ADV 160, and Honda Beat with surfboard rack.
                </p>
                <p className="mt-2">
                  Their Honda Beat starts at <strong>₱350 per day</strong>, while the Honda Beat with surfboard rack is listed from <strong>₱400 per day</strong>. Drop-off and pickup are also available.
                </p>
                <p className="mt-2"><strong>Best for:</strong> Simple scooter rentals, surfboard rack options, and pickup/drop-off</p>
                <p className="mt-2"><strong>Contact:</strong> Mark, +63 935 227 2861</p>
                <p className="mt-2"><strong>Area:</strong> Purok 5, General Luna</p>
              </div>

              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">3. Klook Siargao Island Motorbike Rental</h3>
                <p className="mt-2">
                  Klook offers online booking for Siargao motorbike rentals, with options for 1-day, 2-day, 3-day, and multi-day rentals. The listing mentions optional accommodation delivery.
                </p>
                <p className="mt-2">
                  Listing details and reviews also suggest a <strong>₱1,000 deposit</strong> and <strong>two helmets</strong>, so it is smart to prepare cash for deposit requirements before pickup.
                </p>
                <p className="mt-2"><strong>Best for:</strong> Travelers who prefer booking through a travel platform before arriving</p>
                <p className="mt-2"><strong>Area:</strong> General Luna delivery and pickup areas</p>
                <p className="mt-2"><strong>Booking:</strong> Via Klook</p>
              </div>

              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">4. KKday Siargao Motorbike Rental</h3>
                <p className="mt-2">
                  KKday also lists motorbike rental with delivery within General Luna. Package details mention two helmets and license or ID requirements.
                </p>
                <p className="mt-2">
                  This can be useful for travelers who want the convenience of platform booking with delivery rather than arranging rental directly after arrival.
                </p>
                <p className="mt-2"><strong>Best for:</strong> Platform booking with delivery</p>
                <p className="mt-2"><strong>Area:</strong> General Luna delivery</p>
                <p className="mt-2"><strong>Booking:</strong> Via KKday</p>
              </div>

              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">5. Lola’s Rentals</h3>
                <p className="mt-2">
                  Lola’s Rentals lists Honda Beat scooter rentals in Siargao and also offers other rentals such as tuk-tuks and kayaks.
                </p>
                <p className="mt-2">
                  This may work well for travelers who want scooter rental plus other island rental options from one provider.
                </p>
                <p className="mt-2"><strong>Best for:</strong> Travelers who want scooter rental plus other rental options</p>
                <p className="mt-2"><strong>Area:</strong> Siargao Island</p>
                <p className="mt-2"><strong>Booking:</strong> Via Lola’s Rentals website</p>
              </div>

              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">6. Triple-Rock Motorcycle Rental</h3>
                <p className="mt-2">
                  Triple-Rock Motorcycle Rental appears in Siargao booking listings with units such as Yamaha Fazzio, Yamaha Mio i125, Honda Click, and ADV-style bikes.
                </p>
                <p className="mt-2">
                  Listings suggest service coverage around General Luna and Sayak Airport, which may be useful for travelers arriving by flight or staying outside the center.
                </p>
                <p className="mt-2"><strong>Best for:</strong> Wider service coverage and airport-area delivery</p>
                <p className="mt-2"><strong>Contact:</strong> 0970 897 0180</p>
                <p className="mt-2"><strong>Email:</strong> shegiemante@gmail.com</p>
              </div>

              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">7. Fat Lips Surf Shop</h3>
                <p className="mt-2">
                  Fat Lips Surf Shop in General Luna offers Honda Beat scooters, Honda XRM bikes, and Honda XR150 motorcycles. Their rental page says the bikes are available with or without surfboard racks and include helmets for up to two people.
                </p>
                <p className="mt-2">
                  Their page also mentions registration and insurance papers, which can be reassuring for surfers and longer-stay travelers.
                </p>
                <p className="mt-2"><strong>Best for:</strong> Surfers who want a bike with a surfboard rack near Tourism Road</p>
                <p className="mt-2"><strong>Contact:</strong> +63 947 678 6422</p>
                <p className="mt-2"><strong>Email:</strong> info@fatlipssurfshop.com</p>
                <p className="mt-2"><strong>Area:</strong> Tourism Road, Purok 5, General Luna</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Quick comparison</h2>
            <div className="mt-5 guide-surface overflow-x-auto p-4 md:p-5">
              <table className="min-w-full text-left restaurant-guide-table restaurant-guide-table--compact">
                <thead>
                  <tr>
                    <th>Rental provider</th>
                    <th>Area</th>
                    <th>Starting rate found</th>
                    <th>Best for</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-semibold text-slate-900">Golden Bell Siargao</td>
                    <td>General Luna</td>
                    <td>From ₱350/day</td>
                    <td>Clear pricing and no passport deposit</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-slate-900">Siargao Motorbike Rentals</td>
                    <td>General Luna</td>
                    <td>From ₱350/day</td>
                    <td>Surfboard rack and pickup/drop-off</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-slate-900">Klook</td>
                    <td>General Luna</td>
                    <td>Platform rate shown</td>
                    <td>Online booking</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-slate-900">KKday</td>
                    <td>General Luna</td>
                    <td>Package-based</td>
                    <td>Delivery booking option</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-slate-900">Lola’s Rentals</td>
                    <td>Siargao Island</td>
                    <td>Varies</td>
                    <td>Scooter plus other rental options</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-slate-900">Triple-Rock Motorcycle Rental</td>
                    <td>Siargao / airport coverage</td>
                    <td>Varies</td>
                    <td>Wider service area</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-slate-900">Fat Lips Surf Shop</td>
                    <td>General Luna</td>
                    <td>Varies</td>
                    <td>Surfers and surfboard racks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">What to check before renting a motorbike in Siargao</h2>
            <p className="mt-4">
              Before paying, inspect the bike carefully and take photos or a short video before leaving the shop. That helps avoid disputes when returning the unit.
            </p>
            <div className="guide-checklist mt-5">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Check the brakes</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Check the lights and horn</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Check the mirrors and tires</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Confirm the fuel level</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Ask to see registration papers</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Inspect the helmet condition</span></div>
            </div>
            <p className="mt-4">
              Bring a <strong>valid driver’s license</strong>. Some providers may also require a cash deposit, valid ID, or signed waiver.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Questions to ask before booking</h2>
            <div className="guide-checklist mt-4">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Is delivery included?</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>How much is the deposit?</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Are two helmets included?</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Is there a surfboard rack available?</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Is the bike registered and insured?</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>What happens in case of a flat tire, damage, or accident?</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Is there a lower weekly or monthly rate?</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Best area to rent a scooter in Siargao</h2>
            <p className="mt-4">
              For most visitors, <strong>General Luna</strong> is the best place to rent a motorbike in Siargao. It is where many hotels, cafés, surf spots, restaurants, and rental shops are concentrated.
            </p>
            <p className="mt-4">
              If you are arriving through <strong>Sayak Airport</strong> or staying outside General Luna, ask whether the provider offers delivery or pickup before booking.
            </p>
            <p className="mt-4">
              If you are staying longer, ask for weekly or monthly rates. Many rental shops lower the daily rate for extended bookings.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Final thoughts</h2>
            <p className="mt-4">
              For short trips around General Luna, a <strong>Honda Beat</strong> or <strong>Honda Click</strong> is usually enough. If you are carrying extra weight, planning longer rides, or expect rougher road conditions, an <strong>XR150</strong> or <strong>ADV-style bike</strong> may be a better fit.
            </p>
            <p className="mt-4">
              Before booking, always confirm the latest rate, deposit, delivery coverage, and accident or damage policy directly with the provider.
            </p>
          </section>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Related pages</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/blog/scooter-rental-in-siargao">Read: Scooter Rental in Siargao</Link></li>
            <li><Link href="/blog/how-to-get-around-siargao">Read: How to Get Around Siargao</Link></li>
            <li><Link href="/blog/siargao-airport-to-general-luna">Read: How to Get from Siargao Airport to General Luna</Link></li>
            <li><Link href="/blog/general-luna-travel-guide">Read: General Luna Travel Guide</Link></li>
            <li><Link href="/category/transport-rentals">Browse Transport Rentals in Siargao</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

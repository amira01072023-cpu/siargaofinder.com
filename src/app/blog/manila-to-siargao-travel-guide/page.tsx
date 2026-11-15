import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, PenSquare, Tag } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import BlogShareButtons from "@/components/BlogShareButtons";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Manila to Siargao and Vice Versa Travel Guide: Flights and Ferry Options",
  description:
    "Planning a trip between Manila and Siargao? Here’s how to travel by flight or ferry, which airlines to check, the Surigao–Dapa route, and the best websites for booking tickets.",
  alternates: {
    canonical: "/blog/manila-to-siargao-travel-guide",
  },
  openGraph: {
    title: "Manila to Siargao and Vice Versa Travel Guide: Flights and Ferry Options",
    description:
      "Planning a trip between Manila and Siargao? Here’s how to travel by flight or ferry, which airlines to check, the Surigao–Dapa route, and the best websites for booking tickets.",
    url: "https://www.siargaofinder.com/blog/manila-to-siargao-travel-guide",
    type: "article",
    images: [{ url: "/og-siargaofinder-logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Manila to Siargao and Vice Versa Travel Guide: Flights and Ferry Options",
    description:
      "Planning a trip between Manila and Siargao? Here’s how to travel by flight or ferry, which airlines to check, the Surigao–Dapa route, and the best websites for booking tickets.",
    images: ["/og-siargaofinder-logo.jpg"],
  },
};

export default function ManilaToSiargaoTravelGuidePage() {
  const siteUrl = getSiteUrl();
  const publishedDate = "2026-04-09";
  const readingTime = "7 min read";
  const authorName = "M1GX";

  const faqItems = [
    {
      question: "Is there a direct flight from Manila to Siargao?",
      answer:
        "Depending on the date and season, direct flights may be available. On other dates, you may need to take a connecting flight, often through another Philippine hub.",
    },
    {
      question: "What airport do you fly into in Siargao?",
      answer: "You fly into Siargao Airport (IAO / Sayak Airport).",
    },
    {
      question: "Is there a direct ferry from Manila to Siargao?",
      answer:
        "A direct Manila–Siargao sea route may be available through 2GO on some schedules, but availability should always be checked live. A common alternative is to go through Surigao City first, then take a boat from the Surigao City Boulevard area to Siargao. Depending on weather, arrival may be through Dapa, Santa Monica, or Numancia in Del Carmen.",
    },
    {
      question: "What is the main ferry route to Siargao?",
      answer: "A common sea connection starts from the Surigao City Boulevard area and may arrive in Dapa or, depending on weather and conditions, through Santa Monica or Numancia in Del Carmen. On some schedules, a direct Manila–Siargao route may also be available.",
    },
    {
      question: "What websites should I use to book tickets?",
      answer:
        "For flights, use Philippine Airlines, Cebu Pacific, Google Flights, Skyscanner, and Traveloka. For ferries or mixed routes, try 12Go and BusTickets.ph, and always verify current schedules close to departure.",
    },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Manila to Siargao and Vice Versa Travel Guide: Flights, Ferry Options, and Where to Book Tickets",
    description:
      "Planning a trip between Manila and Siargao? Here’s how to travel by flight or ferry, which airlines to check, the Surigao–Dapa route, and the best websites for booking tickets.",
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Siargao Finder" },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: `${siteUrl}/blog/manila-to-siargao-travel-guide`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
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
              <span className="blog-post-meta-pill"><Tag size={14} /> Travel Planning</span>
              <span className="blog-post-meta-pill"><CalendarDays size={14} /> {publishedDate}</span>
              <span className="blog-post-meta-pill"><Clock3 size={14} /> {readingTime}</span>
              <span className="blog-post-meta-pill"><PenSquare size={14} /> Siargao local guide</span>
            </div>
          </div>
        </div>

        <h1 className="page-title">Manila to Siargao and Vice Versa Travel Guide: Flights, Ferry Options, and Where to Book Tickets</h1>
        <p className="page-subtitle guide-body">
          Traveling between Manila and Siargao is fairly straightforward once you know your options. For most travelers,
          flying is the best choice because it is faster, simpler, and far more convenient than taking a mixed land-and-sea route.
        </p>

        <BlogShareButtons title={metadata.title as string} path={metadata.alternates?.canonical as string} />

        <div className="blog-post-intro-card mt-8">
          <p className="blog-post-intro-label">In this post</p>
          <p className="blog-post-intro-copy">
            We break down the easiest way to travel between Manila and Siargao, what the ferry route actually looks like, and the best places to compare and book tickets.
          </p>
        </div>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best option</span>
            <p className="guide-highlight-value">For most travelers, flying is still the easiest and most practical route.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Sea route</span>
            <p className="guide-highlight-value">Sea routes may run direct from Manila or connect through Surigao City depending on schedule and conditions.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best for</span>
            <p className="guide-highlight-value">Travelers comparing flight convenience against a slower land-and-sea trip.</p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Quick Answer: What’s the Best Way to Travel From Manila to Siargao?</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              The easiest and most practical option is to book a flight from Manila to Siargao Airport (IAO / Sayak Airport).
            </p>
            <p>
              Depending on the date and airline schedule, you may find either a direct flight or a connecting flight, often through another Philippine hub such as Cebu.
            </p>
            <p>
              If you want to travel partly by sea, there are two practical sea-route options to know. One is the more familiar Surigao City connection into Siargao. The other is a direct Manila–Siargao sea route that has been promoted by 2GO, though schedules and availability should always be checked live before booking.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-10 guide-body">
          <section>
            <h2 className="section-title text-[1.6rem]">Manila to Siargao by Flight</h2>
            <p className="mt-4">
              For nearly all travelers, flying is the most efficient way to get to Siargao.
            </p>
            <p className="mt-4">
              Flights arrive at <strong>Siargao Airport (IAO / Sayak Airport)</strong>. From there, travelers usually continue to <Link href="/municipality/general-luna" className="link-inline">General Luna</Link> by van, tricycle, or private transfer.
            </p>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Airlines to check:</strong> Philippine Airlines / PAL Express and Cebu Pacific</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Some flights may be nonstop, while others may require a connection depending on season and schedule.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Flying is best if you want the fastest route, fewer transfers, and an easier trip overall.</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Manila to Siargao by Sea</h2>
            <p className="mt-4">
              Traveling to Siargao by sea is possible, but it takes more time and planning. This is not usually the best option for first-time visitors or travelers on a short trip, but it can work for people with flexible schedules.
            </p>
            <p className="mt-4">
              In addition to the usual Surigao City connection, a direct Manila–Siargao route has also been promoted by 2GO. Because shipping schedules can change, it is still best to verify current sailings directly before planning around it.
            </p>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Direct option:</strong> check whether the 2GO Manila–Siargao route is operating on your dates.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Alternative route:</strong> travel from Manila to Surigao City, then take a boat from the Surigao City Boulevard area to Siargao.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>After sea arrival, continue onward to General Luna or your accommodation depending on where the boat arrives.</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Surigao to Siargao Sea Route</h2>
            <p className="mt-4">
              If you are traveling by sea, the important leg to know starts from the <strong>Surigao City Boulevard</strong> area. Depending on weather and operating conditions, boats may arrive in <strong>Dapa</strong>, or route instead through <strong>Santa Monica</strong> or <strong>Numancia, Del Carmen</strong>.
            </p>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Operators commonly mentioned:</strong> Evaristo & Sons Sea Transport and JP Shipping Lines</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Departure and arrival points can shift depending on weather, sea conditions, and vessel availability.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Always confirm the actual departure point, arrival point, and timing close to your travel date.</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Siargao to Manila: Return Trip</h2>
            <p className="mt-4">
              The simplest way to return from Siargao to Manila is by air. The best return option is a flight from Siargao Airport (IAO) to Manila, either direct or connecting depending on what is available.
            </p>
            <p className="mt-4">
              If you want to return by sea, the usual route is to travel from your accommodation to Dapa Port, take the ferry to Surigao City, then continue from Surigao to Manila by flight or a longer overland route.
            </p>
          </section>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Best Websites for Booking Tickets</h2>
          <div className="guide-checklist">
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Flights:</strong> Philippine Airlines, Cebu Pacific, Google Flights, Skyscanner, and Traveloka</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Ferries or mixed routes:</strong> 12Go, BusTickets.ph, and official ferry operator pages or Facebook pages</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Best strategy: compare routes on Google Flights, Skyscanner, or Traveloka, then check the final price on the official airline website after baggage and extras.</span></div>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Flight vs Ferry: Which Should You Choose?</h2>
          <div className="guide-checklist">
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Choose a flight</strong> if you want the fastest and easiest route, fewer transfers, and a smoother holiday trip.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Choose the ferry route</strong> if you have extra time, are comfortable with longer travel days, or are already traveling through Mindanao.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>For most travelers, especially first-time visitors, flying is the better option.</span></div>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Travel Tips Before You Book</h2>
          <div className="guide-checklist">
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Book early during busy dates.</strong> Flights to Siargao can become expensive during holidays, summer, long weekends, and peak surf season.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Check baggage rules carefully.</strong> Budget airline fares can look cheap at first, but the total can rise once baggage and extras are added.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Verify ferry schedules before departure.</strong> Do not assume ferry times are fixed far in advance.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Allow for onward transfer time.</strong> Whether you arrive at Siargao Airport or Dapa Port, you will still need transport to places like General Luna.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Keep weather in mind.</strong> Both flights and ferries may be affected by rough weather, so avoid overly tight connections if possible.</span></div>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Final Thoughts</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              For most people, the best way to travel from Manila to Siargao and vice versa is by plane. It is the fastest, least stressful, and most practical option.
            </p>
            <p>
              If you prefer the sea route, the usual gateway is still Surigao City, with boats typically departing from the Surigao City Boulevard area. Depending on weather and conditions, arrival may be in Dapa, Santa Monica, or Numancia, Del Carmen. A direct Manila–Siargao route may also be available through 2GO depending on current operations, but schedules should always be checked close to departure.
            </p>
            <p>
              When booking, it is smart to compare fares on platforms like Google Flights, Skyscanner, or Traveloka, then confirm details on the official airline website before paying. If your goal is convenience, book a flight. If your goal is flexibility and you do not mind the extra time, the ferry route is still an option.
            </p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">FAQ</h2>
          <div className="guide-checklist">
            {faqItems.map((item) => (
              <div key={item.question} className="guide-checklist-item">
                <span className="guide-checklist-dot" />
                <span>
                  <strong>{item.question}</strong><br />
                  {item.answer}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Keep exploring</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/guide/siargao-transport-guide">Read the Siargao Transport Guide</Link></li>
            <li><Link href="/municipality/general-luna">Browse businesses in General Luna</Link></li>
            <li><Link href="/blog/where-to-stay-in-siargao">Read: Where to Stay in Siargao</Link></li>
            <li><Link href="/blog">Back to the blog</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

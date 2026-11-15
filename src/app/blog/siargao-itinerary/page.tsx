import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, PenSquare, Tag } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import BlogShareButtons from "@/components/BlogShareButtons";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Siargao Itinerary: How to Spend 3, 5, or 7 Days on the Island",
  description:
    "Planning a Siargao trip? Here’s a practical Siargao itinerary for 3, 5, or 7 days, with tips for first-time visitors, surfers, and slower travelers.",
  alternates: {
    canonical: "/blog/siargao-itinerary",
  },
  openGraph: {
    title: "Siargao Itinerary: How to Spend 3, 5, or 7 Days on the Island",
    description:
      "Planning a Siargao trip? Here’s a practical Siargao itinerary for 3, 5, or 7 days, with tips for first-time visitors, surfers, and slower travelers.",
    url: "https://www.siargaofinder.com/blog/siargao-itinerary",
    type: "article",
    images: [{ url: "/og-siargaofinder-logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siargao Itinerary: How to Spend 3, 5, or 7 Days on the Island",
    description:
      "Planning a Siargao trip? Here’s a practical Siargao itinerary for 3, 5, or 7 days, with tips for first-time visitors, surfers, and slower travelers.",
    images: ["/og-siargaofinder-logo.jpg"],
  },
};

export default function SiargaoItineraryPage() {
  const siteUrl = getSiteUrl();
  const publishedDate = "2026-04-10";
  const readingTime = "8 min read";
  const authorName = "M1GX";

  const faqItems = [
    {
      question: "Is 3 days enough for Siargao?",
      answer: "Yes, but only for a short version of the trip. It is enough to get a feel for the island, not to do everything.",
    },
    {
      question: "How many days is ideal for Siargao?",
      answer: "For most travelers, 5 days is the ideal balance.",
    },
    {
      question: "Is 7 days too much for Siargao?",
      answer: "No. A week in Siargao gives you more flexibility, downtime, and a less rushed experience.",
    },
    {
      question: "Should I surf on my first Siargao trip?",
      answer: "If you want to try it, yes. But you do not need to surf to enjoy Siargao.",
    },
    {
      question: "Where should I stay for a first Siargao itinerary?",
      answer: "For most first-timers, General Luna is the easiest and most practical base.",
    },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Siargao Itinerary: How to Spend 3, 5, or 7 Days on the Island",
    description:
      "Planning a Siargao trip? Here’s a practical Siargao itinerary for 3, 5, or 7 days, with tips for first-time visitors, surfers, and slower travelers.",
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Siargao Finder" },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: `${siteUrl}/blog/siargao-itinerary`,
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

        <h1 className="page-title">Siargao Itinerary: How to Spend 3, 5, or 7 Days on the Island</h1>
        <p className="page-subtitle guide-body">
          Planning a Siargao trip is exciting, but it can also get messy fast. There is usually a moment when travelers realize they have too many saved spots, not enough time, and no clear idea how to put the trip together.
        </p>

        <BlogShareButtons title={metadata.title as string} path={metadata.alternates?.canonical as string} />

        <div className="blog-post-intro-card mt-8">
          <p className="blog-post-intro-label">In this post</p>
          <p className="blog-post-intro-copy">
            We break down how to spend 3 days, 5 days, or 7 days in Siargao, depending on how much time you have and what kind of trip you want.
          </p>
        </div>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Shortest useful trip</span>
            <p className="guide-highlight-value">3 days works for a quick taste of Siargao, but you need to keep expectations simple.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best for most visitors</span>
            <p className="guide-highlight-value">5 days is usually the sweet spot for a proper first trip.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best for slower travel</span>
            <p className="guide-highlight-value">7 days gives you flexibility, breathing room, and a less rushed island feel.</p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Quick Answer: How Many Days Do You Need in Siargao?</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              If you are short on time, 3 days is enough for a quick taste of Siargao.
            </p>
            <p>
              If you want a proper first trip, 5 days is usually the sweet spot. It gives you enough time for island hopping, a land day, good food, and a more relaxed pace.
            </p>
            <p>
              If you want the island to feel less rushed, 7 days is the better option. That gives you room for downtime, weather flexibility, and a deeper feel for Siargao beyond the main highlights.
            </p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Before You Build Your Siargao Itinerary</h2>
          <div className="guide-checklist">
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Where you stay</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Weather</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>How comfortable you are riding a scooter</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Whether surfing is a priority</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>How fast or slow you want the trip to feel</span></div>
          </div>
          <p className="mt-4 guide-body">For most first-time visitors, staying in <Link href="/municipality/general-luna" className="link-inline">General Luna</Link> makes itinerary planning easier because it keeps you closer to restaurants, surf spots, and tour departures.</p>
        </div>

        <div className="mt-10 space-y-10 guide-body">
          <section>
            <h2 className="section-title text-[1.6rem]">Siargao Itinerary for 3 Days</h2>
            <p className="mt-4">
              A 3-day Siargao itinerary works best if you accept that you are only getting a short version of the island. The goal here is not to cover everything. It is to get a good feel for Siargao without exhausting yourself.
            </p>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Day 1:</strong> Arrival and easy General Luna day — check in, settle in, relaxed meal, nearby ride or walk, and sunset.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Day 2:</strong> Island hopping day — one of the easiest highlight days to include on a short first trip.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Day 3:</strong> Land tour or surf + departure — scenic inland stops or a beginner surf session with a slower afternoon.</span></div>
            </div>
            <p className="mt-4"><strong>Best for:</strong> quick first trips, long weekends, and travelers combining Siargao with another destination.</p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Siargao Itinerary for 5 Days</h2>
            <p className="mt-4">
              For most travelers, 5 days is the sweet spot. It gives you enough time to hit the highlights without making the trip feel rushed.
            </p>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Day 1:</strong> Arrival and easy settling-in day</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Day 2:</strong> Island hopping</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Day 3:</strong> Inland or land tour day</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Day 4:</strong> Surf, café, and flexible day</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Day 5:</strong> Last slow morning + departure</span></div>
            </div>
            <p className="mt-4"><strong>Best for:</strong> first-time visitors, couples, and travelers who want highlights plus breathing room.</p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Siargao Itinerary for 7 Days</h2>
            <p className="mt-4">
              If you have a week in Siargao, the experience starts to feel much better. You can still do the highlights, but you no longer have to stack everything tightly.
            </p>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Day 1:</strong> Arrival and easy General Luna evening</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Day 2:</strong> Island hopping</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Day 3:</strong> Inland or land day</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Day 4:</strong> Surf lesson or water-based activity</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Day 5:</strong> Slow day</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Day 6:</strong> Flexible extra activity day</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Day 7:</strong> Final morning and departure</span></div>
            </div>
            <p className="mt-4"><strong>Best for:</strong> slower travelers, repeat visitors, couples, and anyone who dislikes rushed itineraries.</p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Best Siargao Itinerary by Travel Style</h2>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>For first-time visitors:</strong> choose the 5-day itinerary.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>For short trips:</strong> choose the 3-day itinerary and focus on highlights only.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>For couples:</strong> the 5- or 7-day version works better because it leaves room for slower days.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>For surfers:</strong> build more flexibility into the itinerary instead of overbooking every day.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>For non-surfers:</strong> focus on island hopping, food, beaches, inland exploring, and slower pacing.</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Should You Book Tours in Advance?</h2>
            <p className="mt-4">
              It depends on the season and how fixed your plans are.
            </p>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Book in advance if you are visiting during peak dates, only have a short trip, or a specific tour is a must-do.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Leave some flexibility if you have more time and want room for weather changes or slower pacing after arrival.</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Common Siargao Itinerary Mistakes</h2>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Trying to do too much every day</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Forgetting travel time</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Scheduling every day as a full activity day</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Not leaving room for weather changes</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Treating arrival and departure days like full sightseeing days</span></div>
            </div>
          </section>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Final Thoughts</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              The best Siargao itinerary depends on how much time you have, but for most people, 5 days is the sweet spot.
            </p>
            <p>
              That is usually enough time to experience the island without turning the trip into a checklist. If you only have 3 days, keep it simple. If you have 7, use the extra time to slow down and enjoy the island more naturally.
            </p>
            <p>
              Siargao is one of those places that rewards a little space in the schedule.
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
            <li><Link href="/blog/siargao-first-time-visitors">Read: Siargao for First-Time Visitors</Link></li>
            <li><Link href="/blog/where-to-stay-in-siargao">Read: Where to Stay in Siargao</Link></li>
            <li><Link href="/blog/how-to-get-around-siargao">Read: How to Get Around Siargao</Link></li>
            <li><Link href="/blog">Back to the blog</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

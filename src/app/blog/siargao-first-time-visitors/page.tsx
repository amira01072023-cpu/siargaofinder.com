import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, PenSquare, Tag } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import BlogShareButtons from "@/components/BlogShareButtons";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Siargao for First-Time Visitors: What to Know Before You Go",
  description:
    "First time in Siargao? Here’s what to know before you go, including where to stay, how many days you need, transport, budget, and common mistakes to avoid.",
  alternates: {
    canonical: "/blog/siargao-first-time-visitors",
  },
  openGraph: {
    title: "Siargao for First-Time Visitors: What to Know Before You Go",
    description:
      "First time in Siargao? Here’s what to know before you go, including where to stay, how many days you need, transport, budget, and common mistakes to avoid.",
    url: "https://www.siargaofinder.com/blog/siargao-first-time-visitors",
    type: "article",
    images: [{ url: "/og-siargaofinder-logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siargao for First-Time Visitors: What to Know Before You Go",
    description:
      "First time in Siargao? Here’s what to know before you go, including where to stay, how many days you need, transport, budget, and common mistakes to avoid.",
    images: ["/og-siargaofinder-logo.jpg"],
  },
};

export default function SiargaoFirstTimeVisitorsPage() {
  const siteUrl = getSiteUrl();
  const publishedDate = "2026-04-10";
  const readingTime = "8 min read";
  const authorName = "M1GX";

  const faqItems = [
    {
      question: "Is Siargao good for first-time visitors?",
      answer:
        "Yes. Siargao is a good destination for first-time visitors, especially if you enjoy laid-back island travel and plan your trip realistically.",
    },
    {
      question: "Where should first-timers stay in Siargao?",
      answer:
        "For most first-timers, General Luna is the best base because it is the most convenient area for food, tours, surfing, and transport.",
    },
    {
      question: "How many days do first-time visitors need in Siargao?",
      answer: "5 days is often the best balance for a first trip. It gives you enough time to explore without rushing.",
    },
    {
      question: "Do you need to surf in Siargao?",
      answer: "No. You can enjoy Siargao without surfing at all.",
    },
    {
      question: "Is Siargao expensive for first-time visitors?",
      answer:
        "It can be, especially if you book flights late, stay in nicer accommodations, and dine out often. A budget trip is possible, but realistic planning helps.",
    },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Siargao for First-Time Visitors: What to Know Before You Go",
    description:
      "First time in Siargao? Here’s what to know before you go, including where to stay, how many days you need, transport, budget, and common mistakes to avoid.",
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Siargao Finder" },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: `${siteUrl}/blog/siargao-first-time-visitors`,
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
              <span className="blog-post-meta-pill"><Tag size={14} /> First-time travel</span>
              <span className="blog-post-meta-pill"><CalendarDays size={14} /> {publishedDate}</span>
              <span className="blog-post-meta-pill"><Clock3 size={14} /> {readingTime}</span>
              <span className="blog-post-meta-pill"><PenSquare size={14} /> Siargao local guide</span>
            </div>
          </div>
        </div>

        <h1 className="page-title">Siargao for First-Time Visitors: What to Know Before You Go</h1>
        <p className="page-subtitle guide-body">
          If it’s your first time visiting Siargao, it helps to know one thing early: the island is easy to love, but it’s better when you arrive with the right expectations.
        </p>

        <BlogShareButtons title={metadata.title as string} path={metadata.alternates?.canonical as string} />

        <div className="blog-post-intro-card mt-8">
          <p className="blog-post-intro-label">In this post</p>
          <p className="blog-post-intro-copy">
            We cover what first-time visitors should know before going to Siargao, from where to stay and how to get around to budgeting, pacing, and common mistakes to avoid.
          </p>
        </div>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best base</span>
            <p className="guide-highlight-value">For most first-timers, General Luna is the easiest and most practical base.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best trip length</span>
            <p className="guide-highlight-value">5 days is often the sweet spot for a first trip without rushing.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Most helpful mindset</span>
            <p className="guide-highlight-value">Keep plans practical and flexible instead of trying to optimize every hour.</p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Quick Answer: Is Siargao Good for First-Time Visitors?</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              Yes — Siargao is a great destination for first-time visitors, especially if you like laid-back island travel and do not expect everything to feel ultra-polished or urban.
            </p>
            <p>
              For most first-timers, the easiest base is <Link href="/municipality/general-luna" className="link-inline">General Luna</Link>, since it gives you the best access to restaurants, cafés, surf schools, tours, and transport options.
            </p>
            <p>
              If you want your first Siargao trip to go smoothly, the biggest things to get right are choosing the right area to stay, understanding local transport, budgeting realistically, and not overpacking your itinerary.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-10 guide-body">
          <section>
            <h2 className="section-title text-[1.6rem]">What Siargao Is Really Like</h2>
            <p className="mt-4">
              One of the biggest mistakes first-timers make is expecting Siargao to be only one thing.
            </p>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>It is not just a surfing island</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>It is not just a party destination</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>It is not just a luxury escape or a backpacker island</span></div>
            </div>
            <p className="mt-4">
              Siargao is a mix of all of those depending on where you stay and how you travel. You can spend your days surfing, island hopping, café-hopping in General Luna, riding around on a scooter, exploring inland spots, or slowing down and doing almost nothing.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Where Should First-Time Visitors Stay in Siargao?</h2>
            <p className="mt-4">
              For most first-time visitors, General Luna is the best place to stay. It is the island’s main tourist hub and the easiest base if you want convenience.
            </p>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Widest range of accommodation</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Cafés, restaurants, bars, and nightlife</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Surf schools, tour pickups, and easier access to transport</span></div>
            </div>
            <p className="mt-4">
              Better choices for a quieter trip can include the quieter edges of General Luna, Catangnan, or other less central areas — but for a first trip, convenience usually wins.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">How Many Days Do You Need in Siargao?</h2>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>3 days</strong> is the minimum for a quick feel of the island</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>5 days</strong> is a much better first trip</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>7 days</strong> gives you a more relaxed pace</span></div>
            </div>
            <p className="mt-4">
              For first-timers, 5 days is often the sweet spot. It gives you enough time for one or two activity days, time to explore, time to slow down, and some flexibility in case of weather changes.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Do You Need to Surf to Enjoy Siargao?</h2>
            <p className="mt-4">
              No — absolutely not. You do not need to surf to enjoy Siargao.
            </p>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Island hopping</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Beach time</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Scenic drives, food and cafés, lagoons, inland spots, and slower island atmosphere</span></div>
            </div>
            <p className="mt-4">
              Surfing is a major part of the island’s image, but it is not a requirement for having a good trip.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">How Do You Get Around Siargao?</h2>
            <p className="mt-4">
              For most travelers, the main transport options are scooter, tricycle, van, and private transfer.
            </p>
            <p className="mt-4">
              A scooter is the most common option because it gives the most flexibility, but that only makes sense if you are already comfortable riding one. If you are not, do not force it.
            </p>
            <p className="mt-4">
              For first-time visitors who do not ride confidently, a better setup is airport transfer by van, tricycles for short local rides, and organized tours when needed.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">How Much Should First-Time Visitors Budget for Siargao?</h2>
            <p className="mt-4">
              Siargao can fit different budgets, but first-timers often underestimate how quickly daily spending adds up.
            </p>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Main costs: flights, accommodation, food, transport, and activities</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Comfort-focused trips can get expensive quickly if you stay in boutique accommodation, dine out constantly, and book several tours</span></div>
            </div>
            <p className="mt-4">
              The best approach is to budget realistically instead of assuming an island trip will automatically be cheap.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">What Is the Best Time to Visit Siargao for First-Timers?</h2>
            <p className="mt-4">
              For many first-time visitors, the easiest time to visit is during the drier part of the year, when conditions are generally better for island hopping, beach days, sightseeing, scooter travel, and outdoor exploring.
            </p>
            <p className="mt-4">
              If your trip depends on smooth logistics and beach-friendly weather, this matters more. For most first-timers, it is usually better to prioritize overall travel conditions than surf season.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Common Mistakes First-Time Visitors Make in Siargao</h2>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Staying too far from where they actually want to spend time</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Renting a scooter without real riding confidence</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Underestimating food and activity costs</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Trying to do too much in too little time</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Expecting a polished big-city style destination</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">What Should First-Time Visitors Prioritize?</h2>
            <p className="mt-4">
              If it’s your first trip, keep it simple. A good first Siargao trip usually includes a convenient place to stay, one or two major activities, enough downtime, flexible transport plans, and realistic expectations for weather and pacing.
            </p>
            <p className="mt-4">
              You do not need to “complete” Siargao in one trip. In fact, the better first trip is often the one that leaves room to enjoy the island instead of trying to optimize every hour.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Is Siargao Worth It for First-Time Travelers?</h2>
            <p className="mt-4">
              For many people, yes. Siargao is especially worth it if you like laid-back destinations, beach and island scenery, casual food and café culture, active-but-not-rushed trips, and a mix of social energy and slower moments.
            </p>
            <p className="mt-4">
              It may be less ideal if you want a highly urban destination, extremely easy public transport, or a heavily structured resort experience everywhere.
            </p>
          </section>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Final Thoughts</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              If it’s your first time in Siargao, the best thing you can do is keep your plans practical.
            </p>
            <p>
              Stay somewhere convenient, give yourself enough days, budget honestly, and do not assume you need to surf or race through every attraction to enjoy the island.
            </p>
            <p>
              For most first-time visitors, General Luna, a 5-day trip, and a flexible approach will go a long way. Siargao is one of those destinations that tends to work best when you leave room for it to feel like Siargao.
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
            <li><Link href="/blog/where-to-stay-in-siargao">Read: Where to Stay in Siargao</Link></li>
            <li><Link href="/blog/how-to-get-around-siargao">Read: How to Get Around Siargao</Link></li>
            <li><Link href="/blog/best-time-to-visit-siargao">Read: Best Time to Visit Siargao</Link></li>
            <li><Link href="/blog">Back to the blog</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

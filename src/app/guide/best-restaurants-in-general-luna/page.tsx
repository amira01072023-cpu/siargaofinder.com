import type { Metadata } from "next";
import Link from "next/link";
import { getSiteUrl } from "@/lib/site-url";
import { DEFAULT_SOCIAL_IMAGE } from "@/lib/seo-metadata";

export const metadata: Metadata = {
  title: "Best Restaurants in General Luna | Siargao Dining Guide",
  description:
    "A practical guide to the best restaurants in General Luna, including where to eat for casual meals, date nights, group dinners, and easy first-time visitor planning.",
  alternates: {
    canonical: "/guide/best-restaurants-in-general-luna",
  },
  openGraph: {
    title: "Best Restaurants in General Luna | Siargao Dining Guide",
    description:
      "A practical guide to the best restaurants in General Luna, including where to eat for casual meals, date nights, group dinners, and easy first-time visitor planning.",
    url: "https://www.siargaofinder.com/guide/best-restaurants-in-general-luna",
    type: "article",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
};

export default function BestRestaurantsInGeneralLunaPage() {
  const siteUrl = getSiteUrl();
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Restaurants in General Luna",
    description:
      "A practical guide to the best restaurants in General Luna, including where to eat for casual meals, date nights, group dinners, and easy first-time visitor planning.",
    author: { "@type": "Organization", name: "Siargao Finder" },
    publisher: { "@type": "Organization", name: "Siargao Finder" },
    image: `${siteUrl}${DEFAULT_SOCIAL_IMAGE.url}`,
    mainEntityOfPage: `${siteUrl}/guide/best-restaurants-in-general-luna`,
  };

  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <section className="page-section page-hero max-w-4xl">
        <p className="page-kicker">Guide</p>
        <h1 className="page-title">Best Restaurants in General Luna</h1>
        <p className="page-subtitle guide-body">
          General Luna has one of the widest restaurant selections in Siargao, which is helpful but also makes it easy to waste time deciding where to eat.
          Some places work best for quick local meals, some are better for slower dinners, and others make more sense for groups, date nights, or first-time visitors who want something easy.
        </p>

        <div className="blog-post-intro-card mt-8">
          <p className="blog-post-intro-label">In this guide</p>
          <p className="blog-post-intro-copy">
            We break down how to think about the best restaurants in General Luna by meal type, atmosphere, convenience, and the kind of day or evening you are planning.
          </p>
        </div>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best for first-time visitors</span>
            <p className="guide-highlight-value">Stay close to central General Luna if you want the easiest restaurant choices without extra planning.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best for group meals</span>
            <p className="guide-highlight-value">Choose places with more seating, clearer menus, and direct contact details for easier planning.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best planning mindset</span>
            <p className="guide-highlight-value">Think about the kind of meal you want first, then match it to the part of town and the timing of your day.</p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Quick answer: where should you start?</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              If you are visiting Siargao for the first time, General Luna is usually the easiest place to eat well because it gives you the highest concentration of restaurants,
              the best range of price points, and the least effort when you want to decide on the spot.
            </p>
            <p>
              The best restaurant is not always the most talked about one. It is usually the one that fits your timing, budget, group size, and how far you want to move after a beach day, surf session, or slow afternoon.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-10 guide-body">
          <section>
            <h2 className="section-title text-[1.6rem]">Why General Luna is the easiest place to eat in Siargao</h2>
            <p className="mt-4">
              <Link href="/municipality/general-luna" className="link-inline">General Luna</Link> is the island’s most convenient dining base because the options are concentrated,
              transport is easier, and it is simple to combine meals with cafés, bars, surf plans, and evening stops.
            </p>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>You get the widest range of food styles and price points.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>It is easier to make last-minute dinner decisions without long transport.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>It works well for short trips where convenience matters more than hunting for remote spots.</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Best restaurants in General Luna by occasion</h2>
            <p className="mt-4">
              The smartest way to choose where to eat in General Luna is by occasion rather than trying to rank every restaurant against every other one.
            </p>
            <div className="guide-checklist mt-5">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Best for casual meals:</strong> easy places where you can eat well without overplanning.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Best for date nights:</strong> places where atmosphere matters as much as the food.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Best for group dinners:</strong> restaurants with more seating, easier sharing, and practical reservations.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Best for quick food after surf:</strong> convenient spots that make sense when you do not want a formal meal.</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">How to choose well if it is your first time</h2>
            <p className="mt-4">
              For first-time visitors, the simplest dining plan is often the best one. Stay close to your route, do not overcomplicate lunch, and save more intentional decisions for dinner.
            </p>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>For lunch, convenience usually matters more than chasing the “best” place on paper.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>For dinner, think more about vibe, group size, and how busy the area may be.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>If you are traveling with others, look for listing pages with contact details so booking or confirming details is easier.</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">What makes a restaurant worth prioritizing?</h2>
            <p className="mt-4">
              The best restaurant in General Luna depends on your expectations. Some travelers want memorable food, some want an easy atmosphere, and some just want a place that works well after a long day on the island.
            </p>
            <div className="guide-checklist mt-5">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>For couples:</strong> choose places with a stronger atmosphere and slower pacing.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>For groups:</strong> choose places with enough space and clearer logistics.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>For budget-conscious meals:</strong> stay practical and prioritize convenience and consistency.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>For one-night-only dinners:</strong> choose a place that feels worth the evening, not just the easiest nearby fallback.</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">When to use restaurant listings instead of just browsing around</h2>
            <p className="mt-4">
              Walking around General Luna can work, but it is not always the smartest approach if you are short on time, traveling with others, or dining during busier periods.
            </p>
            <div className="guide-checklist mt-5">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Use listing pages when you need phone numbers, exact locations, or website and social links.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Check ahead when you want a smoother dinner plan or need to compare several choices quickly.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>This matters more for groups, date nights, and evenings when you do not want to improvise from scratch.</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Practical restaurant planning tips</h2>
            <div className="guide-checklist mt-4">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Pick your meal type first, then your restaurant.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Keep travel distance short if you are already staying in General Luna.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>For groups, use restaurants with direct contact details whenever possible.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Use cafes for lighter daytime meals and save restaurant decisions for when the setting matters more.</span></div>
            </div>
          </section>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Related pages</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/category/food-chains-and-restaurants">Browse restaurants and cafes in Siargao</Link></li>
            <li><Link href="/municipality/general-luna">Explore businesses in General Luna</Link></li>
            <li><Link href="/guide/best-cafes-in-siargao">Read: Best Cafes in Siargao</Link></li>
            <li><Link href="/blog/where-to-stay-in-siargao">Read: Where to Stay in Siargao</Link></li>
            <li><Link href="/blog/how-to-get-around-siargao">Read: How to Get Around Siargao</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

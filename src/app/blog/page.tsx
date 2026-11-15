import type { Metadata } from "next";
import Link from "next/link";
import { Newspaper, ArrowRight, Search } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import { getSiteUrl } from "@/lib/site-url";

const blogPosts = [
  {
    href: "/blog/medical-options-siargao",
    title: "Medical Options in Siargao",
    description: "A practical guide to Siargao’s main hospital, clinics, rural health units, dentists, and emergency contacts.",
    tag: "Health guide",
  },
  {
    href: "/blog/siargao-island-hopping-contacts",
    title: "Siargao Island Hopping Contacts",
    description: "A simple 2026 directory of Siargao island hopping tour operators, booking numbers, WhatsApp contacts, and practical booking tips.",
    tag: "Tour guide",
  },
  {
    href: "/blog/best-restaurants-in-siargao",
    title: "Best Restaurants in Siargao",
    description: "A practical guide to standout restaurants in General Luna and beyond, including casual favorites, date-night spots, vegan-friendly picks, and dining tips.",
    tag: "Food guide",
  },
  {
    href: "/blog/siargao-restaurant-directory",
    title: "Siargao Restaurant Directory",
    description: "A practical, verification-led guide to where to eat in Siargao, with General Luna standouts, planning notes, and closure cautions.",
    tag: "Food guide",
  },
  {
    href: "/blog/siargao-motorbike-rental-guide",
    title: "Siargao Motorbike Rental Guide",
    description: "Compare trusted scooter rental options in General Luna, with pricing context, booking tips, and what to check before renting.",
    tag: "Transport",
  },
  {
    href: "/blog/best-beaches-in-siargao",
    title: "Best Beaches in Siargao",
    description: "A practical guide to the best beaches in Siargao by travel style, from iconic surf spots to quieter beach escapes.",
    tag: "Beach guide",
  },
  {
    href: "/blog/siargao-airport-guide",
    title: "Siargao Airport Guide",
    description: "A practical guide to Siargao Airport, transfers to General Luna, arrival expectations, and first-time visitor tips.",
    tag: "Arrival guide",
  },
  {
    href: "/blog/siargao-airport-to-general-luna",
    title: "How to Get from Siargao Airport to General Luna",
    description: "A practical guide to shared vans, private transfers, travel time, and the easiest first-time arrival choices.",
    tag: "Airport transfer",
  },
  {
    href: "/blog/best-areas-to-stay-in-siargao-by-travel-style",
    title: "Best Areas to Stay in Siargao by Travel Style",
    description: "A practical guide to choosing the right part of Siargao based on your travel style, from General Luna to Malinao and Pacifico.",
    tag: "Accommodation guide",
  },
  {
    href: "/blog/best-sunset-spots-in-siargao",
    title: "Best Sunset Spots in Siargao",
    description: "A practical guide to the best sunset spots in Siargao by vibe, from iconic Cloud 9 evenings to quieter beach sunsets.",
    tag: "Sunset guide",
  },
  {
    href: "/blog/cloud-9-guide-for-first-time-visitors",
    title: "Cloud 9 Guide for First-Time Visitors",
    description: "A practical guide to what Cloud 9 is, when to go, whether it is worth visiting if you do not surf, and what beginners should know.",
    tag: "First-time visitors",
  },
  {
    href: "/blog/siargao-for-non-surfers",
    title: "Siargao for Non-Surfers",
    description: "A practical guide to what non-surfers can actually do in Siargao, where to stay, and whether the trip is still worth it.",
    tag: "Travel style guide",
  },
  {
    href: "/blog/family-friendly-things-to-do-in-siargao",
    title: "Family-Friendly Things to Do in Siargao",
    description: "A practical guide to what genuinely works in Siargao for kids and parents, including where to stay and how to pace the trip.",
    tag: "Family travel",
  },
  {
    href: "/blog/siargao-solo-travel-guide",
    title: "Siargao Solo Travel Guide",
    description: "A practical guide to where solo travelers should stay, what to do, and how to plan a flexible Siargao trip alone.",
    tag: "Solo travel",
  },
  {
    href: "/blog/siargao-for-couples",
    title: "Siargao for Couples",
    description: "A practical guide to where couples should stay, what to do, and how to plan a romantic Siargao getaway.",
    tag: "Couples travel",
  },
  {
    href: "/blog/siargao-luxury-travel-guide",
    title: "Siargao Luxury Travel Guide",
    description: "A practical guide to barefoot luxury in Siargao, including the best areas, villas, resorts, and upscale travel tips.",
    tag: "Luxury travel",
  },
  {
    href: "/blog/pacifico-travel-guide",
    title: "Pacifico Travel Guide",
    description: "A practical guide to where to stay, what to do, and what to expect in Siargao’s quieter surf coast.",
    tag: "Destination guide",
  },
  {
    href: "/blog/general-luna-travel-guide",
    title: "General Luna Travel Guide",
    description: "A practical guide to where to stay, what to do, and what to expect in Siargao’s main tourism hub.",
    tag: "Destination guide",
  },
  {
    href: "/blog/best-things-to-do-in-siargao-beyond-surfing",
    title: "Best Things to Do in Siargao Beyond Surfing",
    description: "A practical guide to island hopping, beaches, cafés, scenic rides, inland spots, and slow travel days for non-surfers.",
    tag: "Activities",
  },
  {
    href: "/blog/siargao-itinerary",
    title: "Siargao Itinerary",
    description: "A practical Siargao itinerary for 3, 5, or 7 days, with tips for first-time visitors, surfers, and slower travelers.",
    tag: "Trip planning",
  },
  {
    href: "/blog/siargao-first-time-visitors",
    title: "Siargao for First-Time Visitors",
    description: "What to know before you go, including where to stay, how many days you need, transport, budget, and common mistakes to avoid.",
    tag: "First-time guide",
  },
  {
    href: "/blog/how-much-does-a-siargao-trip-cost",
    title: "How Much Does a Siargao Trip Cost?",
    description: "A practical Siargao trip cost guide covering budget, mid-range, and comfort spending on accommodation, food, transport, and activities.",
    tag: "Budget planning",
  },
  {
    href: "/blog/how-to-get-around-siargao",
    title: "How to Get Around Siargao",
    description: "A practical guide to scooters, tricycles, vans, private transfers, and airport transport across Siargao.",
    tag: "Transport",
  },
  {
    href: "/blog/scooter-rental-in-siargao",
    title: "Scooter Rental in Siargao",
    description: "What scooter rental usually costs, who it suits best, safety considerations, and when local transport may be smarter.",
    tag: "Transport",
  },
  {
    href: "/blog/best-time-to-visit-siargao",
    title: "Best Time to Visit Siargao",
    description: "A practical guide to Siargao weather, surf season, crowds, and costs so you can choose the right time for your trip.",
    tag: "Seasonal guide",
  },
  {
    href: "/blog/manila-to-siargao-travel-guide",
    title: "Manila to Siargao Travel Guide",
    description: "A practical guide to flights, ferry options via Surigao, and the best places to compare and book tickets.",
    tag: "Transport",
  },
  {
    href: "/blog/where-to-stay-in-siargao",
    title: "Where to Stay in Siargao",
    description: "A practical guide to the best areas to stay in Siargao for first-time visitors, surfers, and quieter trips.",
    tag: "Accommodation",
  },
  {
    href: "/blog/where-to-eat-in-siargao",
    title: "Where to Eat in Siargao",
    description: "A practical food planning guide to help visitors choose where to eat by area, meal type, and travel style.",
    tag: "Food guide",
  },
  {
    href: "/guide/top-local-businesses-in-siargao",
    title: "Top Local Businesses in Siargao",
    description: "A practical starting point for discovering standout local businesses across Siargao’s most searched categories.",
    tag: "Popular picks",
  },
  {
    href: "/guide/where-to-find-services-in-siargao",
    title: "Where to Find Services in Siargao",
    description: "A useful guide for transport, essentials, wellness, and everyday services across the island.",
    tag: "Practical guide",
  },
  {
    href: "/guide/siargao-transport-guide",
    title: "Siargao Transport Guide",
    description: "How to think about scooters, transfers, and local transport choices for different kinds of trips.",
    tag: "Getting around",
  },
  {
    href: "/guide/siargao-island-hopping-guide",
    title: "Siargao Island Hopping Guide",
    description: "A cleaner way to compare island hopping options, inclusions, timing, and route planning.",
    tag: "Tours",
  },
  {
    href: "/guide/best-cafes-in-siargao",
    title: "Best Cafes in Siargao",
    description: "Coffee, brunch, work-friendly spots, and cafe-planning context for different Siargao days.",
    tag: "Food & cafes",
  },
  {
    href: "/guide/best-restaurants-in-general-luna",
    title: "Best Restaurants in General Luna",
    description: "A practical restaurant planning guide for one of Siargao’s busiest dining areas.",
    tag: "Dining",
  },
  {
    href: "/guide/siargao-coworking-guide",
    title: "Siargao Coworking Guide",
    description: "Helpful context for remote workers looking at coworking and work-friendly spots in Siargao.",
    tag: "Remote work",
  },
  {
    href: "/guide/siargao-surf-schools-guide",
    title: "Siargao Surf Schools Guide",
    description: "How to compare surf schools by skill level, coaching style, location, and lesson structure.",
    tag: "Surf",
  },
];

export const metadata: Metadata = {
  title: "Siargao Blog | Guides, Travel Tips & Local Planning",
  description:
    "Browse Siargao Finder blog posts and guides covering local businesses, transport, island hopping, cafes, surf, and practical island planning.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Siargao Blog | Guides, Travel Tips & Local Planning",
    description:
      "Browse Siargao Finder blog posts and guides covering local businesses, transport, island hopping, cafes, surf, and practical island planning.",
    url: "https://www.siargaofinder.com/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const siteUrl = getSiteUrl();
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Siargao Blog",
    url: `${siteUrl}/blog`,
    description:
      "Browse Siargao Finder blog posts and guides covering local businesses, transport, island hopping, cafes, surf, and practical island planning.",
  };

  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />

      <PublicSiteHeader showBlogLink={false} showListYourBusinessLink homeLabel="Home" />

      <section className="page-section page-hero max-w-6xl">
        <p className="page-kicker">Blog</p>
        <h1 className="page-title">Siargao blog posts and local guides</h1>
        <p className="page-subtitle max-w-3xl">
          A clean place to browse SiargaoFinder articles on local businesses, island planning, transport, surf, cafes, and practical travel context.
        </p>

        <div className="blog-summary-grid mt-8">
          <div className="blog-summary-card">
            <span className="blog-summary-label">What’s here</span>
            <div className="blog-summary-value">
              <Newspaper size={16} />
              <span>{blogPosts.length} blog posts</span>
            </div>
          </div>
          <div className="blog-summary-card">
            <span className="blog-summary-label">Best for</span>
            <div className="blog-summary-value">
              <ArrowRight size={16} />
              <span>Trip planning and local discovery</span>
            </div>
          </div>
          <div className="blog-summary-card">
            <span className="blog-summary-label">Style</span>
            <div className="blog-summary-value">
              <Search size={16} />
              <span>Practical, clear, and useful</span>
            </div>
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {blogPosts.map((post) => (
            <article key={post.href} className="blog-card">
              <div className="blog-card-accent" />
              <p className="blog-card-tag">{post.tag}</p>
              <h2 className="blog-card-title mt-2">{post.title}</h2>
              <p className="blog-card-description mt-3">{post.description}</p>
              <div className="mt-5">
                <Link href={post.href} className="listing-card-btn listing-card-btn--dark inline-flex items-center gap-2">
                  Read post
                  <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

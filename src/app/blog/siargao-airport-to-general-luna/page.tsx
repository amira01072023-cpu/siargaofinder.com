import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, PenSquare, Tag } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import BlogShareButtons from "@/components/BlogShareButtons";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "How to Get from Siargao Airport to General Luna | Van, Private Transfer, and Arrival Tips",
  description:
    "Landing in Siargao? Here’s how to get from Siargao Airport to General Luna, including shared vans, private transfers, travel time, and what first-time visitors should expect.",
  alternates: {
    canonical: "/blog/siargao-airport-to-general-luna",
  },
  openGraph: {
    title: "How to Get from Siargao Airport to General Luna | Van, Private Transfer, and Arrival Tips",
    description:
      "Landing in Siargao? Here’s how to get from Siargao Airport to General Luna, including shared vans, private transfers, travel time, and what first-time visitors should expect.",
    url: "https://www.siargaofinder.com/blog/siargao-airport-to-general-luna",
    type: "article",
    images: [{ url: "/og-siargaofinder-logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Get from Siargao Airport to General Luna | Van, Private Transfer, and Arrival Tips",
    description:
      "Landing in Siargao? Here’s how to get from Siargao Airport to General Luna, including shared vans, private transfers, travel time, and what first-time visitors should expect.",
    images: ["/og-siargaofinder-logo.jpg"],
  },
};

export default function SiargaoAirportToGeneralLunaPage() {
  const siteUrl = getSiteUrl();
  const publishedDate = "2026-04-19";
  const readingTime = "7 min read";
  const authorName = "M1GX";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Get from Siargao Airport to General Luna: Van, Private Transfer, and Arrival Tips",
    description:
      "Landing in Siargao? Here’s how to get from Siargao Airport to General Luna, including shared vans, private transfers, travel time, and what first-time visitors should expect.",
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Siargao Finder" },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: `${siteUrl}/blog/siargao-airport-to-general-luna`,
  };

  return (
    <main className="page-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
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
              <span className="blog-post-meta-pill"><Tag size={14} /> Arrival Guide</span>
              <span className="blog-post-meta-pill"><CalendarDays size={14} /> {publishedDate}</span>
              <span className="blog-post-meta-pill"><Clock3 size={14} /> {readingTime}</span>
              <span className="blog-post-meta-pill"><PenSquare size={14} /> Siargao local guide</span>
            </div>
          </div>
        </div>

        <h1 className="page-title">How to Get from Siargao Airport to General Luna: Van, Private Transfer, and Arrival Tips</h1>
        <p className="page-subtitle guide-body">
          If you are landing in Siargao for the first time, one of the first practical things to figure out is how you will get from the airport to General Luna.
          The good news is that this part of the trip is usually straightforward once you know what the common options are.
        </p>

        <BlogShareButtons title={metadata.title as string} path={metadata.alternates?.canonical as string} />

        <div className="blog-post-intro-card mt-8">
          <p className="blog-post-intro-label">In this post</p>
          <p className="blog-post-intro-copy">
            We break down the easiest ways to get from Siargao Airport to General Luna, what most first-time visitors should choose, and what to expect when you land.
          </p>
        </div>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best for most travelers</span>
            <p className="guide-highlight-value">Shared van is usually the easiest balance of price, convenience, and arrival-day simplicity.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best for comfort</span>
            <p className="guide-highlight-value">Private transfer is the easiest option for families, groups, and luggage-heavy arrivals.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Travel time</span>
            <p className="guide-highlight-value">Usually around 45 minutes to about 1 hour, depending on stops and conditions.</p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Quick answer</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              For most travelers, the best option from Siargao Airport to General Luna is a <strong>shared van transfer</strong>.
              It is usually the most practical mix of convenience, cost, and ease.
            </p>
            <p>
              If you want a smoother arrival with more privacy, then a <strong>private transfer</strong> is often the better choice.
            </p>
            <p>
              A scooter may make sense later in your trip if you already ride confidently, but for many first-time visitors, arrival day is not the best time to make that your main plan.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-10 guide-body">
          <section>
            <h2 className="section-title text-[1.6rem]">Where is Siargao Airport?</h2>
            <p className="mt-4">
              Siargao Airport is also known as <strong>Sayak Airport</strong>, with the airport code <strong>IAO</strong>. It is located in <strong>Del Carmen</strong>, not in General Luna itself.
            </p>
            <p className="mt-4">
              That means almost everyone staying in General Luna still needs onward transport after landing.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">How far is Siargao Airport from General Luna?</h2>
            <p className="mt-4">
              For most travelers, the trip takes roughly <strong>45 minutes to around 1 hour</strong>, depending on weather, road conditions, and whether your transfer has multiple drop-offs.
            </p>
            <p className="mt-4">
              A lot of practical guides simplify this to around 45 minutes, which is a good expectation — but it is better to think in ranges instead of expecting an exact fixed travel time.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Shared van: best option for most visitors</h2>
            <p className="mt-4">
              Shared van transfer is usually the easiest recommendation for first-time visitors because it is one of the most common airport-to-General Luna options.
            </p>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Common and practical for solo travelers and couples</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Usually cheaper than private transfer</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Better than improvising a more awkward arrival if it is your first Siargao trip</span></div>
            </div>
            <p className="mt-4">
              Recent sources commonly place shared van fares roughly in the <strong>₱300 to ₱400 per person</strong> range, but local rates can change.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Private transfer: best for comfort and low-friction arrival</h2>
            <p className="mt-4">
              A private transfer is often worth it if you want a smoother arrival, direct hotel drop-off, and less waiting around after you land.
            </p>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Best for families and groups</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Good for travelers with heavier luggage</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Useful if you arrive tired, late, or just want the easiest option</span></div>
            </div>
            <p className="mt-4">
              The main tradeoff is cost. It is more expensive than a shared van, but usually much easier from an arrival-day comfort perspective.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Can you take a tricycle or habal-habal?</h2>
            <p className="mt-4">
              Yes, these can exist as options, but they are usually better treated as alternatives rather than the default recommendation for first-time visitors.
            </p>
            <p className="mt-4">
              They may work better for lighter luggage, more flexible travelers, or people already comfortable with simpler local transport choices.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Should you rent a scooter from the airport?</h2>
            <p className="mt-4">
              Only if you are already a confident rider.
            </p>
            <p className="mt-4">
              A lot of travelers assume that because scooters are common in Siargao, the airport is the best place to start riding. That is not always the smartest move, especially if you are arriving tired, carrying bags, or unfamiliar with island roads.
            </p>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Good only for confident riders</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Not ideal for first-time riders</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Often smarter to reach General Luna first, settle in, and decide later</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">What should first-time visitors expect when they land?</h2>
            <p className="mt-4">
              The biggest thing to understand is that the airport is simple, but arrival still feels easier when you have already decided on your transfer approach.
            </p>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>You will still need onward transport after landing</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>General Luna is the normal destination for many arriving visitors</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Arrival feels easier when you choose convenience over overcomplicating the first transfer</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Best option by travel style</h2>
            <div className="guide-checklist mt-4">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>First-time visitor:</strong> shared van</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Couple:</strong> shared van for value, private transfer for comfort</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Family:</strong> private transfer</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Budget solo traveler:</strong> shared van</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Confident rider:</strong> scooter may work later, but not automatically best on arrival day</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Final recommendation</h2>
            <p className="mt-4">
              For most travelers, the smartest move is simple: take a shared van or a private transfer to General Luna, settle in, and make the rest of your transport decisions after you arrive.
            </p>
            <p className="mt-4">
              That approach usually gives you a smoother start to the trip than trying to solve every transport decision the moment you land.
            </p>
          </section>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Related pages</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/blog/siargao-airport-guide">Read: Siargao Airport Guide</Link></li>
            <li><Link href="/blog/how-to-get-around-siargao">Read: How to Get Around Siargao</Link></li>
            <li><Link href="/guide/siargao-transport-guide">Read: Siargao Transport Guide</Link></li>
            <li><Link href="/category/transport-rentals">Browse Transport Rentals in Siargao</Link></li>
            <li><Link href="/municipality/general-luna">Explore Businesses in General Luna</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

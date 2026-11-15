import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, PenSquare, Tag } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import BlogShareButtons from "@/components/BlogShareButtons";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "How to Get Around Siargao: Scooter, Tricycle, Van, and Airport Transfer Guide",
  description:
    "A practical guide to getting around Siargao by scooter, tricycle, van, private transfer, and airport transport, with tips for first-time visitors.",
  alternates: {
    canonical: "/blog/how-to-get-around-siargao",
  },
  openGraph: {
    title: "How to Get Around Siargao: Scooter, Tricycle, Van, and Airport Transfer Guide",
    description:
      "A practical guide to getting around Siargao by scooter, tricycle, van, private transfer, and airport transport, with tips for first-time visitors.",
    url: "https://www.siargaofinder.com/blog/how-to-get-around-siargao",
    type: "article",
    images: [{ url: "/og-siargaofinder-logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Get Around Siargao: Scooter, Tricycle, Van, and Airport Transfer Guide",
    description:
      "A practical guide to getting around Siargao by scooter, tricycle, van, private transfer, and airport transport, with tips for first-time visitors.",
    images: ["/og-siargaofinder-logo.jpg"],
  },
};

export default function HowToGetAroundSiargaoPage() {
  const siteUrl = getSiteUrl();
  const publishedDate = "2026-04-09";
  const readingTime = "8 min read";
  const authorName = "M1GX";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Get Around Siargao: Scooter, Tricycle, Van, and Airport Transfer Guide",
    description:
      "A practical guide to getting around Siargao by scooter, tricycle, van, private transfer, and airport transport, with tips for first-time visitors.",
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Siargao Finder" },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: `${siteUrl}/blog/how-to-get-around-siargao`,
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
              <span className="blog-post-meta-pill"><Tag size={14} /> Transport</span>
              <span className="blog-post-meta-pill"><CalendarDays size={14} /> {publishedDate}</span>
              <span className="blog-post-meta-pill"><Clock3 size={14} /> {readingTime}</span>
              <span className="blog-post-meta-pill"><PenSquare size={14} /> Siargao local guide</span>
            </div>
          </div>
        </div>

        <h1 className="page-title">How to Get Around Siargao: Scooter, Tricycle, Van, and Airport Transfer Guide</h1>
        <p className="page-subtitle guide-body">
          If you’re planning a trip to Siargao, one of the most useful things to figure out early is how you’ll get around the island. Unlike big cities, Siargao does not rely on ride-hailing apps or large public transport systems.
        </p>

        <BlogShareButtons title={metadata.title as string} path={metadata.alternates?.canonical as string} />

        <div className="blog-post-intro-card mt-8">
          <p className="blog-post-intro-label">In this post</p>
          <p className="blog-post-intro-copy">
            We break down the main ways to move around Siargao, how airport transfers usually work, when a scooter makes sense, and when local transport is the smarter option.
          </p>
        </div>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best overall</span>
            <p className="guide-highlight-value">For most visitors, scooters are the most flexible option if you already ride confidently.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best non-rider option</span>
            <p className="guide-highlight-value">Tricycles, vans, and private transfers are often the safer and easier choice.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Most important tip</span>
            <p className="guide-highlight-value">Do not assume Siargao is the best place to learn scooter riding for the first time.</p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Quick Answer: What Is the Best Way to Get Around Siargao?</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              For most travelers, the best way to get around Siargao is by scooter.
            </p>
            <p>
              Scooters are the island’s most popular transport option because they give you flexibility, make it easy to explore beyond General Luna, and work well for beach stops, surf spots, cafés, and inland detours.
            </p>
            <p>
              If you do not ride confidently, your best alternatives are tricycles for short local rides, shared vans for airport transfers, and private transfers for comfort and convenience.
            </p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Why Transport in Siargao Feels Different</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              Siargao is not the kind of destination where everything is within walking distance. Even if you stay in <Link href="/municipality/general-luna" className="link-inline">General Luna</Link>, many useful or interesting places are still spread out.
            </p>
            <p>
              That is why transport matters more in Siargao than in compact destinations where you can mostly walk everywhere.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-10 guide-body">
          <section>
            <h2 className="section-title text-[1.6rem]">Main Ways to Get Around Siargao</h2>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Scooter or motorbike rental</strong> – best for flexibility and independent exploring</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Tricycle</strong> – best for short local rides</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Shared van</strong> – best for airport transfers and practical point-to-point transport</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Private transfer</strong> – best for groups, families, and luggage-heavy arrivals</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Motorcycle taxi or habal-habal</strong> – best for solo travelers and lighter trips</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Walking</strong> – only practical in limited parts of General Luna</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Scooter Rental in Siargao</h2>
            <p className="mt-4">
              For many travelers, renting a scooter is the easiest way to explore Siargao.
            </p>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Gives you freedom to move at your own pace</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Makes day trips and spontaneous stops easier</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Works well for travelers staying around General Luna, Catangnan, or Malinao</span></div>
            </div>
            <p className="mt-4">
              Recent travel and transport guides commonly place scooter rental somewhere around ₱350 to ₱600 per day depending on the rental shop, bike type, season, and length of rental.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Should First-Time Riders Rent a Scooter in Siargao?</h2>
            <p className="mt-4">
              Usually, no. A lot of travelers see that scooters are everywhere and assume that means Siargao is the perfect place to learn. That is not always smart.
            </p>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Unfamiliar road conditions and uneven surfaces can still be risky</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Rain, low visibility at night, and carrying luggage or a passenger make riding harder</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>If you are not already comfortable riding, Siargao is not the best place to figure it out</span></div>
            </div>
            <p className="mt-4">
              If you do not ride confidently, choose tricycles for short rides, shared vans for airport transfers, private transfers for comfort, or organized tours for day trips.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Safety Tips for Driving in Siargao</h2>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Wear a helmet</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Check brakes, tires, and lights before leaving</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Avoid riding after drinking</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Slow down in rain and be more careful at night</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Ask the rental shop what to do if the bike breaks down</span></div>
            </div>
            <p className="mt-4">
              License requirements can vary depending on your home country and the rental provider. Bring your valid license, and if relevant, carry an International Driving Permit (IDP).
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Tricycles in Siargao</h2>
            <p className="mt-4">
              If you are not renting a scooter, tricycles are one of the easiest ways to get around locally.
            </p>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Useful for short rides around General Luna, restaurant trips, quick errands, or nights when you do not want to drive</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Convenient for non-drivers and short stays</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Can add up in cost if used many times a day over several days</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Vans and Shared Transfers in Siargao</h2>
            <p className="mt-4">
              For airport runs and some longer transfers, vans are one of the most practical options.
            </p>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Commonly used between Siargao Airport and General Luna</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Useful for Catangnan, Malinao, and group arrivals</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Recent route guides often place shared van pricing around ₱300 to ₱400 per person, with travel time often around 45 minutes depending on stops</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Private Transfers in Siargao</h2>
            <p className="mt-4">
              If comfort matters more than budget, private transfers are a strong option.
            </p>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Great for late arrivals, families, groups, and luggage-heavy trips</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Often one of the easiest ways to start or end your trip without stress</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Motorcycle Taxi or Habal-Habal in Siargao</h2>
            <p className="mt-4">
              Motorcycle taxis, often called habal-habal, are another local transport option.
            </p>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Useful for solo travelers, lighter luggage, and quick point-to-point rides</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Less ideal if you are carrying bags or want a more comfortable ride</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Can You Walk Around Siargao?</h2>
            <p className="mt-4">
              Only in a limited way. Walking works in parts of central General Luna and in areas where your hotel, cafés, and nearby spots are close together.
            </p>
            <p className="mt-4">
              Walking is usually not enough if you want to change beaches, visit inland attractions, get to the airport, move between different parts of the island, or explore beyond your immediate stay area.
            </p>
            <p className="mt-4">
              So yes, you can walk for some daily needs — but not for most of the island experience.
            </p>
          </section>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">How to Get From Siargao Airport to General Luna</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              This is one of the most common practical questions for first-time visitors. Siargao Airport (IAO / Sayak Airport) is not in General Luna, and the trip is commonly described as taking around 45 minutes depending on your exact destination and traffic.
            </p>
          </div>
          <div className="guide-checklist">
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Shared van:</strong> usually the most practical balance of cost and convenience, often around ₱300–₱400 per person based on recent references.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Private transfer:</strong> best for comfort, groups, families, or travelers with a lot of luggage.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Tricycle:</strong> possible, but generally less practical than a van for a longer airport transfer.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Motorcycle taxi:</strong> works best for solo travelers with minimal baggage.</span></div>
          </div>
          <p className="mt-4 guide-body">For most people, the easiest option is a shared or pre-booked private van from Siargao Airport to General Luna.</p>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">How to Get From Dapa Port to General Luna</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              If you arrive by ferry, you will usually enter Siargao through Dapa Port. From there, onward transport to General Luna is commonly available by van, multicab, tricycle, or habal-habal.
            </p>
            <p>
              This means ferry travelers should still plan their final transfer just like airport arrivals do.
            </p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Best Way to Get Around Siargao by Travel Style</h2>
          <div className="guide-checklist">
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Best for first-time visitors:</strong> shared van from the airport, tricycles for local trips, scooter only if already confident riding.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Best for couples:</strong> scooter if both are comfortable, private transfer for arrival day, tricycles for easy local rides.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Best for families:</strong> private transfer or van, and avoid relying on scooters if traveling with kids or lots of luggage.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Best for budget travelers:</strong> scooter if confident, shared van for airport transfer, occasional tricycle use.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Best for non-drivers:</strong> tricycles, vans, and pre-arranged tours and transfers.</span></div>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Do You Need a Scooter in Siargao?</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              No — but it helps.
            </p>
            <p>
              You do not need a scooter to enjoy Siargao if you stay near General Luna, arrange airport transfers, use tricycles locally, and book tours for activity days.
            </p>
            <p>
              But if you want more freedom and plan to explore regularly, a scooter usually makes the trip easier. The honest answer is: you do not need a scooter, but many travelers prefer one because it gives them more flexibility.
            </p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Final Thoughts on Getting Around Siargao</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              The best way to get around Siargao depends on your confidence, budget, and travel style.
            </p>
            <p>
              If you already ride confidently, a scooter is usually the easiest and most flexible option. If you do not, that is not a problem — tricycles, shared vans, and private transfers are enough for a comfortable trip, especially if you are staying near General Luna.
            </p>
            <p>
              For arrival day, a shared or private van from Siargao Airport to General Luna is usually the simplest move. After that, decide whether you want the freedom of your own scooter or the ease of using local transport as needed.
            </p>
            <p>
              The smartest choice is not the most adventurous one. It is the one that fits how you actually travel.
            </p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">FAQ</h2>
          <div className="guide-checklist">
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>What is the best way to get around Siargao?</strong><br />For most travelers, the best way is by scooter, as long as they already know how to ride confidently.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Do you need a scooter in Siargao?</strong><br />No. You can still get around using tricycles, vans, private transfers, and tours, especially if you stay near General Luna.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>How much is a van from Siargao Airport to General Luna?</strong><br />Recent transport references commonly place shared van transfers at around ₱300 to ₱400 per person, but rates can change.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Are tricycles common in Siargao?</strong><br />Yes. Tricycles are widely used for short local trips, especially around General Luna.</span></div>
            <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Is Siargao walkable?</strong><br />Only in a limited way. Walking works in parts of General Luna, but it is usually not enough for exploring most of the island.</span></div>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Keep exploring</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/guide/siargao-transport-guide">Read the Siargao Transport Guide</Link></li>
            <li><Link href="/blog/manila-to-siargao-travel-guide">Read: Manila to Siargao Travel Guide</Link></li>
            <li><Link href="/blog/where-to-stay-in-siargao">Read: Where to Stay in Siargao</Link></li>
            <li><Link href="/blog">Back to the blog</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

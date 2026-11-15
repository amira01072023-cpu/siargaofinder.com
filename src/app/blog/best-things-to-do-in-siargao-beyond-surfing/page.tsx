import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, PenSquare, Tag } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import BlogShareButtons from "@/components/BlogShareButtons";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Best Things to Do in Siargao Beyond Surfing",
  description:
    "Not into surfing? Here are the best things to do in Siargao beyond surfing, from island hopping and beaches to cafés, inland exploring, and slow travel days.",
  alternates: {
    canonical: "/blog/best-things-to-do-in-siargao-beyond-surfing",
  },
  openGraph: {
    title: "Best Things to Do in Siargao Beyond Surfing",
    description:
      "Not into surfing? Here are the best things to do in Siargao beyond surfing, from island hopping and beaches to cafés, inland exploring, and slow travel days.",
    url: "https://www.siargaofinder.com/blog/best-things-to-do-in-siargao-beyond-surfing",
    type: "article",
    images: [{ url: "/og-siargaofinder-logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Things to Do in Siargao Beyond Surfing",
    description:
      "Not into surfing? Here are the best things to do in Siargao beyond surfing, from island hopping and beaches to cafés, inland exploring, and slow travel days.",
    images: ["/og-siargaofinder-logo.jpg"],
  },
};

export default function BestThingsToDoInSiargaoBeyondSurfingPage() {
  const siteUrl = getSiteUrl();
  const publishedDate = "2026-04-10";
  const readingTime = "8 min read";
  const authorName = "M1GX";

  const faqItems = [
    {
      question: "Is Siargao worth it for non-surfers?",
      answer:
        "Yes. Siargao is still worth visiting for non-surfers because it offers island hopping, beaches, cafés, inland spots, scenic rides, and a laid-back atmosphere.",
    },
    {
      question: "What can you do in Siargao if you don’t surf?",
      answer:
        "You can go island hopping, visit beaches, explore inland, enjoy cafés and restaurants, watch sunset, and build a slower island-style itinerary.",
    },
    {
      question: "Is island hopping worth it in Siargao?",
      answer: "For many first-time visitors, yes. It is one of the easiest and most memorable activities to include.",
    },
    {
      question: "How many days do non-surfers need in Siargao?",
      answer: "For most non-surfers, 5 days is a good amount of time. It gives enough room for a highlight activity and slower days.",
    },
    {
      question: "Do you need a scooter to enjoy Siargao?",
      answer: "No. A scooter helps with flexibility, but you can still enjoy Siargao through transfers, tricycles, and organized tours.",
    },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Best Things to Do in Siargao Beyond Surfing",
    description:
      "Not into surfing? Here are the best things to do in Siargao beyond surfing, from island hopping and beaches to cafés, inland exploring, and slow travel days.",
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Siargao Finder" },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: `${siteUrl}/blog/best-things-to-do-in-siargao-beyond-surfing`,
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
              <span className="blog-post-meta-pill"><Tag size={14} /> Activities</span>
              <span className="blog-post-meta-pill"><CalendarDays size={14} /> {publishedDate}</span>
              <span className="blog-post-meta-pill"><Clock3 size={14} /> {readingTime}</span>
              <span className="blog-post-meta-pill"><PenSquare size={14} /> Siargao local guide</span>
            </div>
          </div>
        </div>

        <h1 className="page-title">Best Things to Do in Siargao Beyond Surfing</h1>
        <p className="page-subtitle guide-body">
          Siargao may be best known as the surfing capital of the Philippines, but there’s much more to the island than waves and surfboards.
        </p>

        <BlogShareButtons title={metadata.title as string} path={metadata.alternates?.canonical as string} />

        <div className="blog-post-intro-card mt-8">
          <p className="blog-post-intro-label">In this post</p>
          <p className="blog-post-intro-copy">
            We cover the best things to do in Siargao beyond surfing, especially for first-time visitors, couples, non-surfers, and anyone who wants to see a fuller side of the island.
          </p>
        </div>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best all-around activity</span>
            <p className="guide-highlight-value">Island hopping is one of the easiest and most memorable non-surf experiences.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best slower-day option</span>
            <p className="guide-highlight-value">Cafés, scenic rides, and beach time often end up being some of the most enjoyable parts of the trip.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best mindset</span>
            <p className="guide-highlight-value">Siargao feels better when you leave room for flexibility instead of overpacking every day.</p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Quick Answer: Is Siargao Worth Visiting If You Don’t Surf?</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              Yes — Siargao is still worth visiting even if you do not surf.
            </p>
            <p>
              The island offers a mix of island hopping, beach time, lagoons and inland spots, scenic drives, cafés and restaurants, and slower travel days that do not need a packed itinerary.
            </p>
            <p>
              Surfing may be the island’s most famous activity, but it is not the only reason people enjoy Siargao.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-10 guide-body">
          <section>
            <h2 className="section-title text-[1.6rem]">1. Go Island Hopping</h2>
            <p className="mt-4">
              If you do only one major activity in Siargao, island hopping is one of the easiest choices.
            </p>
            <p className="mt-4">
              For many travelers, it is one of the most memorable parts of the trip because it gives you the classic island feeling quickly: clear water, boat rides, beach stops, and a full day out that feels different from just staying around General Luna.
            </p>
            <p className="mt-4"><strong>Best for:</strong> first-timers, short trips, couples, groups with mixed interests, and non-surfers who still want a strong Siargao experience.</p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">2. Explore Siargao’s Inland Side</h2>
            <p className="mt-4">
              One of the best ways to enjoy Siargao beyond surfing is to explore inland. Scenic roads, quieter areas, and natural spots help Siargao feel bigger and more varied than just a surf town.
            </p>
            <p className="mt-4"><strong>Best for:</strong> travelers with 5 days or more, slower self-guided exploring, and repeat visitors wanting more than the obvious highlights.</p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">3. Spend Time in General Luna’s Cafés and Restaurants</h2>
            <p className="mt-4">
              Not every good day in Siargao has to be an activity day. One of the easiest pleasures on the island is simply spending time in and around <Link href="/municipality/general-luna" className="link-inline">General Luna</Link> with good coffee, long brunches, dinner spots, casual evening walks, and slow afternoons between activities.
            </p>
            <p className="mt-4"><strong>Best for:</strong> slow travel, couples, digital nomad-style stays, and travelers who do not want every day to be highly scheduled.</p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">4. Visit the Beaches</h2>
            <p className="mt-4">
              Even without surfing, beach time is still one of the best reasons to be in Siargao.
            </p>
            <p className="mt-4">
              For non-surfers, a beach-focused day can mean swimming, sunbathing, reading, watching the light change in the afternoon, or combining a beach stop with a café or scenic ride.
            </p>
            <p className="mt-4"><strong>Best for:</strong> couples, non-surfers, and travelers who want a more relaxed pace.</p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">5. Take a Scenic Scooter Ride Around the Island</h2>
            <p className="mt-4">
              If you are already comfortable riding a scooter, one of the simplest and most satisfying things to do in Siargao is just to ride.
            </p>
            <p className="mt-4">
              This is less about racing from stop to stop and more about enjoying the island at a slower pace: coastal roads, palm-lined stretches, inland detours, and quieter parts of the island beyond the busiest center.
            </p>
            <p className="mt-4"><strong>Best for:</strong> independent travelers, couples, people staying several days, and travelers who enjoy the journey as much as the destination.</p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">6. Enjoy a Slow Day on Purpose</h2>
            <p className="mt-4">
              This might sound small, but it is one of the best non-surf experiences in Siargao.
            </p>
            <p className="mt-4">
              A slow day in Siargao might include sleeping in, coffee and breakfast, one short ride or beach stop, lunch somewhere casual, a sunset spot, and dinner in General Luna.
            </p>
            <p className="mt-4"><strong>Best for:</strong> travelers staying 5–7 days, couples, and people trying to avoid burnout on the trip.</p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">7. Watch the Sunset</h2>
            <p className="mt-4">
              Sunset in Siargao is one of the easiest low-effort, high-reward parts of the trip. Even if you are not doing a major activity that day, ending the day well can shift the whole mood of the trip.
            </p>
            <p className="mt-4"><strong>Best for:</strong> everyone, especially couples and first-time visitors.</p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">8. Try a Surf Lesson Anyway — Even If You’re Not a Surfer</h2>
            <p className="mt-4">
              This article is about what to do beyond surfing, but it would be incomplete not to mention this: you do not need to be “a surfer” to try one lesson.
            </p>
            <p className="mt-4">
              For many first-time visitors, taking a beginner lesson once can be a fun way to connect with Siargao’s identity without turning the entire trip into a surf trip.
            </p>
            <p className="mt-4"><strong>Best for:</strong> curious first-timers, mixed-interest travelers, and people who want to try without committing.</p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">9. Build a More Food-Focused Trip</h2>
            <p className="mt-4">
              For some travelers, Siargao becomes more enjoyable once they stop thinking only in terms of attractions and start shaping the trip around atmosphere and meals.
            </p>
            <p className="mt-4">
              A food-focused day might include breakfast in one café, a slow midday stop, sunset drinks or snacks, and dinner somewhere different.
            </p>
            <p className="mt-4"><strong>Best for:</strong> travelers who enjoy café culture, relaxed itineraries, and people who want a more lifestyle-led trip.</p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">10. Leave Room for Flexibility</h2>
            <p className="mt-4">
              This is not a single attraction, but it may be the best advice in the whole guide.
            </p>
            <p className="mt-4">
              Siargao works better when you leave room for weather changes, mood changes, extra rest, repeated favorite spots, and spontaneous plans. A trip that is too tightly planned can make the island feel smaller than it really is.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Best Non-Surf Siargao Experience by Travel Style</h2>
            <div className="guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>For first-time visitors:</strong> island hopping, one inland day, General Luna cafés and dinners, beach time, and sunset stops.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>For couples:</strong> quieter beaches, scenic rides, slower food-focused days, sunset time, and one or two major activities only.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>For non-surfers:</strong> island hopping, inland exploring, food and café stops, beach days, and a flexible itinerary.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>For short trips:</strong> island hopping, one easy scenic or beach day, and General Luna food and atmosphere.</span></div>
            </div>
          </section>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Final Thoughts</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              Siargao is absolutely worth visiting even if you do not surf.
            </p>
            <p>
              Yes, surfing gives the island much of its identity, but the experience of Siargao goes well beyond that. Island hopping, scenic rides, beach time, café culture, inland exploring, and slower travel days are all part of what makes the island appealing.
            </p>
            <p>
              In fact, for many travelers, the best version of Siargao is not all action — it is a mix of one or two standout activities and enough open space to enjoy the island’s pace.
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
            <li><Link href="/blog/siargao-itinerary">Read: Siargao Itinerary</Link></li>
            <li><Link href="/blog/siargao-first-time-visitors">Read: Siargao for First-Time Visitors</Link></li>
            <li><Link href="/blog/how-to-get-around-siargao">Read: How to Get Around Siargao</Link></li>
            <li><Link href="/blog">Back to the blog</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

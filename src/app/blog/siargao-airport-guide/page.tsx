import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, PenSquare, Tag } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import BlogShareButtons from "@/components/BlogShareButtons";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Siargao Airport Guide | What to Expect, Transfers, and First-Time Arrival Tips",
  description:
    "Flying to Siargao for the first time? Learn what to expect at Siargao Airport, how far it is from General Luna, transport options, and how to make arrival day easier.",
  alternates: {
    canonical: "/blog/siargao-airport-guide",
  },
  openGraph: {
    title: "Siargao Airport Guide | What to Expect, Transfers, and First-Time Arrival Tips",
    description:
      "Flying to Siargao for the first time? Learn what to expect at Siargao Airport, how far it is from General Luna, transport options, and how to make arrival day easier.",
    url: "https://www.siargaofinder.com/blog/siargao-airport-guide",
    type: "article",
    images: [{ url: "/og-siargaofinder-logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siargao Airport Guide | What to Expect, Transfers, and First-Time Arrival Tips",
    description:
      "Flying to Siargao for the first time? Learn what to expect at Siargao Airport, how far it is from General Luna, transport options, and how to make arrival day easier.",
    images: ["/og-siargaofinder-logo.jpg"],
  },
};

export default function SiargaoAirportGuidePage() {
  const siteUrl = getSiteUrl();
  const publishedDate = "2026-04-12";
  const readingTime = "9 min read";
  const authorName = "M1GX";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Siargao Airport Guide: What to Expect on Arrival, How to Get to General Luna, and Tips for First-Time Visitors",
    description:
      "Flying to Siargao for the first time? Learn what to expect at Siargao Airport, how far it is from General Luna, transport options, and how to make arrival day easier.",
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Siargao Finder" },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: `${siteUrl}/blog/siargao-airport-guide`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What airport do you fly into for Siargao?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You fly into Siargao Airport, also called Sayak Airport, with the airport code IAO.",
        },
      },
      {
        "@type": "Question",
        name: "Is Siargao Airport in General Luna?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Siargao Airport is in Del Carmen, not in General Luna.",
        },
      },
      {
        "@type": "Question",
        name: "How far is Siargao Airport from General Luna?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Usually around 40 to 55 minutes, depending on traffic and your exact accommodation location.",
        },
      },
      {
        "@type": "Question",
        name: "How do I get from Siargao Airport to General Luna?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Common options include shared van transfer, private transfer, hotel-arranged pickup, or self-arranged onward transport.",
        },
      },
      {
        "@type": "Question",
        name: "Should I arrange airport transport in advance in Siargao?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For many first-time visitors, yes. It usually makes arrival feel smoother and less stressful.",
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
              <span className="blog-post-meta-pill"><Tag size={14} /> Arrival Guide</span>
              <span className="blog-post-meta-pill"><CalendarDays size={14} /> {publishedDate}</span>
              <span className="blog-post-meta-pill"><Clock3 size={14} /> {readingTime}</span>
              <span className="blog-post-meta-pill"><PenSquare size={14} /> Siargao local guide</span>
            </div>
          </div>
        </div>

        <h1 className="page-title">Siargao Airport Guide: What to Expect on Arrival, How to Get to General Luna, and Tips for First-Time Visitors</h1>
        <p className="page-subtitle guide-body">
          For most travelers, the Siargao trip starts at the airport — and if it is your first time visiting the island, that arrival step shapes the tone of the whole trip more than people expect.
        </p>

        <BlogShareButtons title={metadata.title as string} path={metadata.alternates?.canonical as string} />

        <div className="blog-post-intro-card mt-8">
          <p className="blog-post-intro-label">In this post</p>
          <p className="blog-post-intro-copy">
            We break down what airport Siargao uses, where it is, how far it is from General Luna, what transport options you have, and how to make arrival day feel smooth instead of confusing.
          </p>
        </div>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Airport code</span>
            <p className="guide-highlight-value">IAO — Siargao Airport, also called Sayak Airport.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Location</span>
            <p className="guide-highlight-value">The airport is in Del Carmen, not in General Luna.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">General Luna travel time</span>
            <p className="guide-highlight-value">Usually around 40 to 55 minutes depending on traffic and your exact drop-off point.</p>
          </div>
        </div>

        <div className="mt-8 space-y-5 guide-body">
          <p>
            The good news is that Siargao airport arrival is usually fairly manageable. The less glamorous truth is that it can still feel slightly confusing if you arrive without a plan, especially if it is your first island trip in the Philippines or you assume the airport is in General Luna when it is not.
          </p>
          <p>
            If you understand the basics before you land, Siargao arrival is usually quite straightforward.
          </p>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">What Airport Do You Fly Into for Siargao?</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              The airport for Siargao is <strong>Sayak Airport</strong>, also commonly called <strong>Siargao Airport</strong>, with the airport code <strong>IAO</strong>.
            </p>
            <p>
              It is located in <strong>Del Carmen</strong>, not in General Luna. That matters because many first-time visitors assume the airport is right beside the island’s busiest tourist area. In reality, you still need onward transport after landing.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-10 guide-body">
          <section>
            <h2 className="section-title text-[1.6rem]">How Far Is Siargao Airport from General Luna?</h2>
            <p className="mt-4">
              For most travelers, the trip from Siargao Airport to <Link href="/blog/general-luna-travel-guide" className="link-inline">General Luna</Link> takes around 40 to 55 minutes, depending on traffic, weather, road conditions, and your exact accommodation location.
            </p>
            <p className="mt-4">
              A lot of practical guidance rounds this to about 45 minutes, which is a good expectation for first-time planning.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">What Is the Airport Like in Siargao?</h2>
            <p className="mt-4">
              Siargao Airport is much smaller and simpler than a major city airport.
            </p>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Easier orientation</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Less walking</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Fewer complicated airport steps</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>A more casual arrival experience</span></div>
            </div>
            <p className="mt-4">
              But it also means fewer big-airport conveniences, less margin for assuming everything will sort itself out automatically, and more value in having your transport plan ready before you land.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">How Do You Get from Siargao Airport to General Luna?</h2>
            <div className="mt-5 space-y-6">
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">1. Van transfer</h3>
                <p className="mt-2">
                  One of the most common and practical options for travelers heading to General Luna, especially solo travelers, couples, and first-timers who want a straightforward shared transfer.
                </p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">2. Private transfer</h3>
                <p className="mt-2">
                  A good fit if you want less arrival friction, more comfort, direct hotel drop-off, or easier travel with family, a group, or larger luggage.
                </p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">3. Hotel-arranged transfer</h3>
                <p className="mt-2">
                  Some accommodations help organize airport pickup. This is often one of the easiest options because it reduces uncertainty on arrival.
                </p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">4. Motorbike rental or self-arranged onward travel</h3>
                <p className="mt-2">
                  This can work, but it is not the best recommendation for everyone on day one, especially if it is your first Siargao trip, you are arriving tired, or you are carrying luggage.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Is It Easy to Get from the Airport to General Luna?</h2>
            <p className="mt-4">
              Yes — generally.
            </p>
            <p className="mt-4">
              Even though the airport is not in General Luna, the route is common enough that it usually does not feel difficult. A lot of travelers make that trip every day, and General Luna remains the easiest and most obvious first base for many people.
            </p>
            <p className="mt-4">
              So if your worry is whether arrival will feel complicated, the answer is usually no — not if you sort out transport reasonably well in advance or make a simple plan before you land.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Should You Arrange Airport Transport in Advance?</h2>
            <p className="mt-4">
              For many travelers, yes.
            </p>
            <p className="mt-4">
              You do not always need to overbook everything, but airport arrival is usually one of the parts worth making easy. Advance planning helps especially if it is your first Siargao trip, you arrive late in the day, you are traveling with family, or you want a private transfer.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Where Should You Stay After Landing?</h2>
            <p className="mt-4">
              For most first-time visitors, General Luna is still the smartest arrival base.
            </p>
            <p className="mt-4">
              It gives you easier food access, easier transport, easier tour logistics, and the best concentration of cafes, restaurants, and stays. Other areas can work too, but if you want the trip to feel smooth from day one, General Luna is usually the strongest default.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">What Should First-Time Visitors Know Before Arriving at Siargao Airport?</h2>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>The airport is not in General Luna.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>General Luna is still easy to reach.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Small-airport logic applies: simpler, but less padded with extras.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Day-one transport matters more than people expect.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>If you land late or after delays, it helps even more to already know how you are getting to your accommodation.</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Is Siargao Airport Stressful for First-Time Travelers?</h2>
            <p className="mt-4">
              Usually not — at least not by the standards of bigger or more chaotic travel hubs.
            </p>
            <p className="mt-4">
              For most people, the airport itself is not the stressful part. The stress usually comes from arriving without a clear transport plan, not knowing how far General Luna is, or being tired and trying to improvise too much.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Best Arrival Strategy for Different Traveler Types</h2>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>First-time visitors:</strong> pre-arrange transport or use a straightforward transfer and stay in General Luna.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Families:</strong> private transfer is often worth it and arrival day should stay simple.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Couples:</strong> hotel transfer or private transfer often makes arrival smoother.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Solo travelers:</strong> shared transfer or simple van setup usually works fine.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Luxury travelers:</strong> arrange private pickup through the property if possible.</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">How Should You Treat Arrival Day?</h2>
            <p className="mt-4">
              For most people, Siargao works much better when arrival day is not treated like a full-action day.
            </p>
            <p className="mt-4">
              Arrival day is usually best used to settle in, have a meal, maybe take a short walk or catch sunset, and save major activities for the next day.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Siargao Airport Tips for First-Time Visitors</h2>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Know that IAO / Sayak Airport is in Del Carmen, not General Luna.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Expect around 40 to 55 minutes to reach General Luna.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>If you want a smooth first day, plan your airport transfer before landing.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>If you are tired, traveling with kids, or carrying a lot of luggage, private transfer is often worth it.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>If it is your first trip, stay in General Luna unless you have a strong reason not to.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Treat arrival day as a lighter day if possible.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Do not assume renting a motorbike immediately after landing is the best first move unless you are very comfortable doing that.</span></div>
            </div>
          </section>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Final Verdict</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              Siargao Airport is not difficult to deal with, but it is easier when you know what to expect.
            </p>
            <p>
              The airport itself is small and manageable. The key thing is understanding that you still need onward transport after landing, especially if you are staying in General Luna.
            </p>
            <p>
              For most first-time visitors, the best strategy is simple: land at Siargao Airport, take a straightforward transfer to General Luna, keep the first day easy, and start the real island rhythm once you have settled in.
            </p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Quick FAQ</h2>
          <div className="mt-4 space-y-5 guide-body">
            <div>
              <h3 className="text-[1.05rem] font-semibold text-slate-900">What airport do you fly into for Siargao?</h3>
              <p className="mt-2">You fly into Siargao Airport, also called Sayak Airport, with the airport code IAO.</p>
            </div>
            <div>
              <h3 className="text-[1.05rem] font-semibold text-slate-900">Is Siargao Airport in General Luna?</h3>
              <p className="mt-2">No. Siargao Airport is in Del Carmen, not in General Luna.</p>
            </div>
            <div>
              <h3 className="text-[1.05rem] font-semibold text-slate-900">How far is Siargao Airport from General Luna?</h3>
              <p className="mt-2">Usually around 40 to 55 minutes, depending on traffic and your exact accommodation location.</p>
            </div>
            <div>
              <h3 className="text-[1.05rem] font-semibold text-slate-900">How do I get from Siargao Airport to General Luna?</h3>
              <p className="mt-2">Common options include shared van transfer, private transfer, hotel-arranged pickup, or self-arranged onward transport.</p>
            </div>
            <div>
              <h3 className="text-[1.05rem] font-semibold text-slate-900">Should I arrange airport transport in advance in Siargao?</h3>
              <p className="mt-2">For many first-time visitors, yes. It usually makes arrival feel smoother and less stressful.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Keep exploring</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/blog/general-luna-travel-guide">Read the General Luna Travel Guide</Link></li>
            <li><Link href="/blog/how-to-get-around-siargao">Read How to Get Around Siargao</Link></li>
            <li><Link href="/blog/where-to-stay-in-siargao">Read Where to Stay in Siargao</Link></li>
            <li><Link href="/blog/siargao-first-time-visitors">Read Siargao for First-Time Visitors</Link></li>
            <li><Link href="/blog/siargao-itinerary">Read the Siargao Itinerary</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

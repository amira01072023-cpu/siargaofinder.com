import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, PenSquare, Tag } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import BlogShareButtons from "@/components/BlogShareButtons";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Cloud 9 Guide for First-Time Visitors | What to Expect in Siargao",
  description:
    "Visiting Cloud 9 in Siargao for the first time? Learn what to expect, when to go, whether it is worth visiting if you do not surf, and if beginners should surf there.",
  alternates: {
    canonical: "/blog/cloud-9-guide-for-first-time-visitors",
  },
  openGraph: {
    title: "Cloud 9 Guide for First-Time Visitors | What to Expect in Siargao",
    description:
      "Visiting Cloud 9 in Siargao for the first time? Learn what to expect, when to go, whether it is worth visiting if you do not surf, and if beginners should surf there.",
    url: "https://www.siargaofinder.com/blog/cloud-9-guide-for-first-time-visitors",
    type: "article",
    images: [{ url: "/og-siargaofinder-logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud 9 Guide for First-Time Visitors | What to Expect in Siargao",
    description:
      "Visiting Cloud 9 in Siargao for the first time? Learn what to expect, when to go, whether it is worth visiting if you do not surf, and if beginners should surf there.",
    images: ["/og-siargaofinder-logo.jpg"],
  },
};

export default function Cloud9GuideForFirstTimeVisitorsPage() {
  const siteUrl = getSiteUrl();
  const publishedDate = "2026-04-12";
  const readingTime = "9 min read";
  const authorName = "M1GX";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Cloud 9 Guide for First-Time Visitors: What to Expect, When to Go, and Whether It’s Worth Visiting in Siargao",
    description:
      "Visiting Cloud 9 in Siargao for the first time? Learn what to expect, when to go, whether it is worth visiting if you do not surf, and if beginners should surf there.",
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Siargao Finder" },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: `${siteUrl}/blog/cloud-9-guide-for-first-time-visitors`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Cloud 9 in Siargao?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cloud 9 is Siargao’s most famous surf area in General Luna and one of the island’s most recognizable coastal landmarks.",
        },
      },
      {
        "@type": "Question",
        name: "Is Cloud 9 worth visiting if you do not surf?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You do not need to surf to enjoy Cloud 9. Many visitors go there for the atmosphere, boardwalk, views, and surf watching.",
        },
      },
      {
        "@type": "Question",
        name: "Is Cloud 9 good for beginner surfers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not always. Conditions vary, and beginners should not assume it is the right place for them without local guidance.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best time to visit Cloud 9?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Early morning and late afternoon are usually the best times because the light is better and the heat is less intense.",
        },
      },
      {
        "@type": "Question",
        name: "Should I stay near Cloud 9 in Siargao?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It can be a good idea if you want surf access and a recognizable General Luna base, but it is not automatically the best fit for everyone.",
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
              <span className="blog-post-meta-pill"><Tag size={14} /> First-Time Visitors</span>
              <span className="blog-post-meta-pill"><CalendarDays size={14} /> {publishedDate}</span>
              <span className="blog-post-meta-pill"><Clock3 size={14} /> {readingTime}</span>
              <span className="blog-post-meta-pill"><PenSquare size={14} /> Siargao local guide</span>
            </div>
          </div>
        </div>

        <h1 className="page-title">Cloud 9 Guide for First-Time Visitors: What to Expect, When to Go, and Whether It’s Worth Visiting in Siargao</h1>
        <p className="page-subtitle guide-body">
          Cloud 9 is the most famous surf spot in Siargao and one of the best-known surf breaks in the Philippines. Even people who know very little about the island usually know the name.
        </p>

        <BlogShareButtons title={metadata.title as string} path={metadata.alternates?.canonical as string} />

        <div className="blog-post-intro-card mt-8">
          <p className="blog-post-intro-label">In this post</p>
          <p className="blog-post-intro-copy">
            We break down what Cloud 9 actually is, whether it is worth visiting if you do not surf, what beginners should know, when to go, and how to fit it into a first Siargao trip.
          </p>
        </div>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best for</span>
            <p className="guide-highlight-value">First-time Siargao visitors, surf watchers, scenic-stop travelers, and anyone who wants to understand the island’s most iconic surf area.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best times to go</span>
            <p className="guide-highlight-value">Early morning or late afternoon, when the light is better and the heat is less intense.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Main expectation</span>
            <p className="guide-highlight-value">Cloud 9 is iconic and worth understanding, but it is best enjoyed as part of a wider General Luna day rather than as a huge standalone attraction.</p>
          </div>
        </div>

        <div className="mt-8 space-y-5 guide-body">
          <p>
            That alone makes it easy to assume Cloud 9 is only for serious surfers, or that it is something you either fully get or skip altogether. In practice, that is not really true. Cloud 9 matters because it gives Siargao much of its identity — but you do not need to be an experienced surfer to visit it, appreciate it, or include it in your trip.
          </p>
          <p>
            For first-time visitors, the more useful question is not just what Cloud 9 is. It is what you should actually expect when you go there.
          </p>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">What Is Cloud 9 in Siargao?</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              Cloud 9 is the surf area in <Link href="/blog/general-luna-travel-guide" className="link-inline">General Luna</Link> that is most strongly associated with Siargao’s reputation as a surf destination.
            </p>
            <p>
              It is best known for its iconic surf break, its boardwalk and viewing area, its visibility in Siargao travel imagery, and its role in shaping the island’s surf identity.
            </p>
            <p>
              For many travelers, Cloud 9 is not just a surf spot — it is also a place to watch surfers, take in the atmosphere, catch sunrise or late afternoon light, and understand why Siargao became so famous in the first place.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-10 guide-body">
          <section>
            <h2 className="section-title text-[1.6rem]">Is Cloud 9 Worth Visiting for First-Time Travelers?</h2>
            <p className="mt-4">
              Yes — usually.
            </p>
            <p className="mt-4">
              Cloud 9 is worth visiting for most first-time travelers because it is one of the easiest ways to connect with the island’s identity. Even if you only spend a modest amount of time there, it helps you understand the atmosphere, surf culture, and visual side of Siargao that so many people associate with the island.
            </p>
            <p className="mt-4">
              The useful caveat is this: Cloud 9 is not necessarily a full-day attraction on its own for every traveler. For some people, it is a short but worthwhile stop. For others — especially surfers or people who enjoy simply sitting in the atmosphere — it can become a place they return to several times.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Do You Need to Surf to Enjoy Cloud 9?</h2>
            <p className="mt-4">
              No.
            </p>
            <p className="mt-4">
              You do not need to surf to enjoy Cloud 9. A lot of visitors go there simply to watch the waves, watch surfers, enjoy the setting, walk the boardwalk, take photos, and spend time near one of the island’s most recognizable coastal areas.
            </p>
            <p className="mt-4">
              For non-surfers, Cloud 9 works best when treated as a scenic landmark, a surf-culture stop, and a place to spend some time rather than just tick off in two minutes.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Is Cloud 9 Good for Beginner Surfers?</h2>
            <p className="mt-4">
              Not always — and that is exactly the kind of nuance first-timers need.
            </p>
            <p className="mt-4">
              Cloud 9 is famous, but that does not mean it is automatically ideal for every level of surfer in every condition. The safest and most useful framing is that Cloud 9 is iconic, conditions vary, it can look more approachable on some days than others, and beginners should not assume it is the right place for them just because it is the most famous spot.
            </p>
            <p className="mt-4">
              In practice, beginners usually need local guidance, realistic expectations, the right conditions, and sometimes a different nearby break that suits their level better.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">What Is the Best Time to Visit Cloud 9?</h2>
            <p className="mt-4">
              For most first-time visitors, the best times are early morning and late afternoon.
            </p>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Morning:</strong> cooler temperatures, softer light, and a calmer feeling.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Late afternoon:</strong> warm light, a more social atmosphere, and strong surf-watching energy.</span></div>
            </div>
            <p className="mt-4">
              The middle of the day can still be fine, but it is often hotter, brighter, and less comfortable for lingering.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">How Long Should You Spend at Cloud 9?</h2>
            <p className="mt-4">
              That depends on your travel style.
            </p>
            <p className="mt-4">
              For many first-time visitors, 30 minutes to 1 hour is enough for a short visit, while 1 to 2 hours feels better if you want to watch surfers, take your time, and enjoy the atmosphere.
            </p>
            <p className="mt-4">
              Cloud 9 is often better as a repeatable stop than as something you force into a big “must maximize” block.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">What Does the Cloud 9 Area Feel Like?</h2>
            <p className="mt-4">
              The Cloud 9 area feels like a mix of surf culture, tourism visibility, scenic coastline, casual movement, and travelers coming and going.
            </p>
            <p className="mt-4">
              Depending on the hour and season, it may feel scenic and calm, social and busy, photo-heavy, surf-centered, or more commercial than quieter parts of Siargao.
            </p>
            <p className="mt-4">
              That last point is worth saying honestly. Cloud 9 is iconic, but it is not the whole island. Some people love that energy. Others prefer quieter beaches and less traffic-heavy areas.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">What Should First-Time Visitors Know Before Going?</h2>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>It is worth visiting, but manage expectations.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>You do not need to surf there for it to matter.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Conditions change depending on season, tide, and weather.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Heat matters, so early or late visits usually feel better.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>It works best as part of a bigger General Luna day with cafes, food, or a slower ride nearby.</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Should You Stay Near Cloud 9?</h2>
            <p className="mt-4">
              For some travelers, yes.
            </p>
            <p className="mt-4">
              Staying near Cloud 9 can be a good idea if you want easy surf access, like the idea of sunrise nearby, want to stay close to one of Siargao’s most iconic areas, and do not mind being in a more active, surf-oriented part of General Luna.
            </p>
            <p className="mt-4">
              But it is not automatically the best place for everyone. You may prefer staying elsewhere if you want a quieter atmosphere, easier food access in central General Luna, or a softer beachside feel like Malinao.
            </p>
            <p className="mt-4">
              The better advice is to stay near Cloud 9 if that atmosphere is part of what you want, not just because it is famous.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Who Will Enjoy Cloud 9 Most?</h2>
            <p className="mt-4">
              Cloud 9 is especially good for first-time Siargao visitors, surfers, non-surfers who like watching surf culture, travelers who want iconic scenery, and people who enjoy sunrise or late-afternoon coastal stops.
            </p>
            <p className="mt-4">
              It may be less exciting for travelers looking for a very quiet beach or expecting a huge standalone attraction with lots to do.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Cloud 9 Tips for First-Time Visitors</h2>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Go early or late if you want the best experience.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Do not assume it is only worth it if you surf.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>If you are a beginner, get local advice before deciding where to surf.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Treat it as part of a wider General Luna day rather than a full-day destination by itself.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>If you want quieter scenery, balance your Cloud 9 stop with time in calmer parts of Siargao.</span></div>
            </div>
          </section>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Final Verdict</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              Cloud 9 is worth visiting for most first-time travelers in Siargao.
            </p>
            <p>
              It matters not only because of surfing, but because it helps explain the island. It is one of the clearest places to feel Siargao’s surf identity, coastal atmosphere, and traveler energy all in one stop.
            </p>
            <p>
              You do not need to surf it, master it, or build your whole trip around it for it to be worthwhile. For many visitors, the best way to experience Cloud 9 is simply to show up with the right expectations.
            </p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Quick FAQ</h2>
          <div className="mt-4 space-y-5 guide-body">
            <div>
              <h3 className="text-[1.05rem] font-semibold text-slate-900">What is Cloud 9 in Siargao?</h3>
              <p className="mt-2">Cloud 9 is Siargao’s most famous surf area in General Luna and one of the island’s most recognizable coastal landmarks.</p>
            </div>
            <div>
              <h3 className="text-[1.05rem] font-semibold text-slate-900">Is Cloud 9 worth visiting if you do not surf?</h3>
              <p className="mt-2">Yes. You do not need to surf to enjoy Cloud 9. Many visitors go there for the atmosphere, boardwalk, views, and surf watching.</p>
            </div>
            <div>
              <h3 className="text-[1.05rem] font-semibold text-slate-900">Is Cloud 9 good for beginner surfers?</h3>
              <p className="mt-2">Not always. Conditions vary, and beginners should not assume it is the right place for them without local guidance.</p>
            </div>
            <div>
              <h3 className="text-[1.05rem] font-semibold text-slate-900">What is the best time to visit Cloud 9?</h3>
              <p className="mt-2">Early morning and late afternoon are usually the best times because the light is better and the heat is less intense.</p>
            </div>
            <div>
              <h3 className="text-[1.05rem] font-semibold text-slate-900">Should I stay near Cloud 9 in Siargao?</h3>
              <p className="mt-2">It can be a good idea if you want surf access and a recognizable General Luna base, but it is not automatically the best fit for everyone.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Keep exploring</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/blog/general-luna-travel-guide">Read the General Luna Travel Guide</Link></li>
            <li><Link href="/blog/siargao-for-non-surfers">Read Siargao for Non-Surfers</Link></li>
            <li><Link href="/blog/siargao-first-time-visitors">Read Siargao for First-Time Visitors</Link></li>
            <li><Link href="/blog/siargao-for-couples">Read Siargao for Couples</Link></li>
            <li><Link href="/blog/siargao-solo-travel-guide">Read the Siargao Solo Travel Guide</Link></li>
            <li><Link href="/guide/siargao-surf-schools-guide">Read the Siargao Surf Schools Guide</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, PenSquare, Tag } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import BlogShareButtons from "@/components/BlogShareButtons";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Siargao for Non-Surfers | Is It Still Worth Visiting and What Can You Actually Do?",
  description:
    "Planning a Siargao trip but not surfing? Discover what non-surfers can actually do, where to stay, how many days to go, and whether Siargao is still worth visiting.",
  alternates: {
    canonical: "/blog/siargao-for-non-surfers",
  },
  openGraph: {
    title: "Siargao for Non-Surfers | Is It Still Worth Visiting and What Can You Actually Do?",
    description:
      "Planning a Siargao trip but not surfing? Discover what non-surfers can actually do, where to stay, how many days to go, and whether Siargao is still worth visiting.",
    url: "https://www.siargaofinder.com/blog/siargao-for-non-surfers",
    type: "article",
    images: [{ url: "/og-siargaofinder-logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siargao for Non-Surfers | Is It Still Worth Visiting and What Can You Actually Do?",
    description:
      "Planning a Siargao trip but not surfing? Discover what non-surfers can actually do, where to stay, how many days to go, and whether Siargao is still worth visiting.",
    images: ["/og-siargaofinder-logo.jpg"],
  },
};

export default function SiargaoForNonSurfersPage() {
  const siteUrl = getSiteUrl();
  const publishedDate = "2026-04-11";
  const readingTime = "9 min read";
  const authorName = "M1GX";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Siargao for Non-Surfers: Is It Still Worth Visiting and What Can You Actually Do?",
    description:
      "Planning a Siargao trip but not surfing? Discover what non-surfers can actually do, where to stay, how many days to go, and whether Siargao is still worth visiting.",
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Siargao Finder" },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: `${siteUrl}/blog/siargao-for-non-surfers`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Siargao worth visiting if you do not surf?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Siargao is still worth visiting for island hopping, beaches, scenic drives, cafes, food, and relaxed island atmosphere.",
        },
      },
      {
        "@type": "Question",
        name: "What can non-surfers do in Siargao?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Island hopping, beach time, scenic drives, cafe hopping, wellness, casual nightlife, and slower day trips are all strong options.",
        },
      },
      {
        "@type": "Question",
        name: "Where should non-surfers stay in Siargao?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "General Luna is usually the easiest base, while Malinao is a good quieter alternative. Pacifico works well for slower, less social stays.",
        },
      },
      {
        "@type": "Question",
        name: "Is General Luna worth it for non-surfers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. It is still the most practical base because it gives non-surfers easy access to food, tours, and transport.",
        },
      },
      {
        "@type": "Question",
        name: "How many days should non-surfers stay in Siargao?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Around 4 to 5 days works well for most non-surfers.",
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
              <span className="blog-post-meta-pill"><Tag size={14} /> Non-Surfers Guide</span>
              <span className="blog-post-meta-pill"><CalendarDays size={14} /> {publishedDate}</span>
              <span className="blog-post-meta-pill"><Clock3 size={14} /> {readingTime}</span>
              <span className="blog-post-meta-pill"><PenSquare size={14} /> Siargao local guide</span>
            </div>
          </div>
        </div>

        <h1 className="page-title">Siargao for Non-Surfers: Is It Still Worth Visiting and What Can You Actually Do?</h1>
        <p className="page-subtitle guide-body">
          Siargao is famous for surfing, but that does not mean it is only worth visiting if you plan to paddle out. In fact, a lot of travelers go to Siargao and barely surf at all.
        </p>

        <BlogShareButtons title={metadata.title as string} path={metadata.alternates?.canonical as string} />

        <div className="blog-post-intro-card mt-8">
          <p className="blog-post-intro-label">In this post</p>
          <p className="blog-post-intro-copy">
            We break down whether Siargao is still worth visiting if you do not surf, what non-surfers can actually do, where to stay, and how to plan a trip that feels like more than just watching other people surf.
          </p>
        </div>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best for</span>
            <p className="guide-highlight-value">Travelers who want island hopping, beaches, scenic drives, food, and a relaxed island atmosphere without needing surfing to carry the whole trip.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best base</span>
            <p className="guide-highlight-value">General Luna is still the smartest first base for most non-surfers because it reduces friction.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Main reality check</span>
            <p className="guide-highlight-value">Surfing gives Siargao its identity, but it is not the only reason people enjoy being there.</p>
          </div>
        </div>

        <div className="mt-8 space-y-5 guide-body">
          <p>
            The more useful question is not whether non-surfers can go to Siargao. It is whether Siargao still feels worth it if surfing is not the main reason for the trip. For many people, the answer is yes.
          </p>
          <p>
            If what you want is island hopping, beach time, scenic drives, cafes and restaurants, slow tropical days, boutique stays, and a relaxed but active island atmosphere, Siargao can still work very well.
          </p>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Is Siargao Worth Visiting if You Do Not Surf?</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              Yes — for many travelers, absolutely.
            </p>
            <p>
              Siargao is worth visiting even if you never surf, because its appeal is not only about waves. The island also works as a destination for island hopping, relaxed beach days, food and cafe culture, casual nightlife, scenic road trips, nature-based experiences, and slower, flexible travel.
            </p>
            <p>
              The key is expectation. If you expect Siargao to function like a purely beach-and-luxury destination with no surf identity, you may misunderstand what makes it good. But if you like the idea of an island that feels scenic, social, outdoorsy, and relaxed, it can still be a very strong choice without any surfing involved.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-10 guide-body">
          <section>
            <h2 className="section-title text-[1.6rem]">Why Non-Surfers Still Like Siargao</h2>
            <div className="mt-5 space-y-6">
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">1. The island is easy to enjoy casually</h3>
                <p className="mt-2">
                  A lot of good days in Siargao are simple: coffee in the morning, a scenic ride, lunch somewhere relaxed, an afternoon swim or island activity, sunset, and dinner. That makes the island appealing even if you are not building the trip around one main sport.
                </p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">2. General Luna has enough going on</h3>
                <p className="mt-2">
                  Much of Siargao’s visitor scene is concentrated around <Link href="/blog/general-luna-travel-guide" className="link-inline">General Luna</Link>, which means non-surfers still get access to cafes, restaurants, bars, island-hopping tours, wellness, massage, and casual places to spend time.
                </p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">3. The island’s atmosphere matters</h3>
                <p className="mt-2">
                  For many travelers, Siargao is not about a checklist of attractions. It is about the rhythm: open-air dining, tropical scenery, easygoing movement, feeling outdoors a lot, and a social but not too intense atmosphere.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">What Can Non-Surfers Actually Do in Siargao?</h2>
            <div className="mt-5 space-y-6">
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">1. Go island hopping</h3>
                <p className="mt-2">
                  The classic route to Guyam, Daku, and Naked Island is one of the biggest reasons Siargao still works for non-surfers. It is scenic, easy to enjoy, and does not require surfing at all.
                </p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">2. Spend time at the beach without surfing</h3>
                <p className="mt-2">
                  Not every beach moment in Siargao has to be tied to surfing. You can still enjoy swimming where conditions allow, walking the beach, relaxing by the shore, and watching surfers without joining them.
                </p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">3. Cafe-hop and eat well</h3>
                <p className="mt-2">
                  Especially around General Luna, you can build a very enjoyable trip around coffee, brunch spots, seafood dinners, casual lunch places, laid-back bars, and island-style date nights.
                </p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">4. Take scenic drives around the island</h3>
                <p className="mt-2">
                  A scenic ride or drive can include palm-lined roads, coastal stretches, beach stops, small town detours, and flexible pauses whenever something looks worth checking out.
                </p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">5. Enjoy wellness and massage</h3>
                <p className="mt-2">
                  If your trip style leans more toward rest than adrenaline, Siargao can still work well because it has a strong slower side through massage, spa treatments, yoga, and quiet accommodation downtime.
                </p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">6. Use Siargao as a base for slower outdoor experiences</h3>
                <p className="mt-2">
                  Even without surfing, you can still structure the trip around island hopping, lagoon or nature day trips, beach afternoons, scenic drives, resort or villa downtime, and casual food exploration.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Where Should Non-Surfers Stay in Siargao?</h2>
            <div className="mt-5 space-y-6">
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">1. General Luna</h3>
                <p className="mt-2">
                  Best for first-time visitors, convenience, food, nightlife, and easy access to tours.
                </p>
                <p className="mt-2">
                  For most non-surfers, General Luna is still the smartest base because it gives you better food access, more accommodation choices, easier tour logistics, more places to spend downtime, and easier social options.
                </p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">2. Malinao</h3>
                <p className="mt-2">
                  Best for non-surfers who want a calmer stay while staying close to General Luna.
                </p>
                <p className="mt-2">
                  This is a good fit if you want quieter surroundings, beachside calm, and easy access to town without sleeping in the busiest area.
                </p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">3. Pacifico</h3>
                <p className="mt-2">
                  Best for slower trips, quieter stays, and travelers who like beach atmosphere without lots of nightlife.
                </p>
                <p className="mt-2">
                  Pacifico can work well for non-surfers too — but mainly if you specifically want fewer crowds, a more peaceful stay, and a less social atmosphere.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Is General Luna Still Worth It if You Do Not Surf?</h2>
            <p className="mt-4">
              Yes.
            </p>
            <p className="mt-4">
              A lot of people think General Luna only makes sense if they are surfing every day, but that is not really true. General Luna is still useful for non-surfers because it gives you better food access, easier meeting points for tours, more places to spend downtime, and more flexibility overall.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Is Siargao Better for Non-Surfers Than People Expect?</h2>
            <p className="mt-4">
              Usually, yes.
            </p>
            <p className="mt-4">
              People often imagine Siargao as a place where surfing dominates every hour of every day. In reality, a lot of visitors spend their time eating, island hopping, riding around, swimming, socializing, resting, booking one or two tours, and spending time at their accommodation.
            </p>
            <p className="mt-4">
              That is why non-surfers often enjoy it more than they initially expect.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">How Many Days Should Non-Surfers Stay in Siargao?</h2>
            <p className="mt-4">
              For most non-surfers, four to five days works very well.
            </p>
            <p className="mt-4">
              That gives you enough time to settle in, do island hopping, explore General Luna, have a beach or scenic-drive day, leave room for slower meals and downtime, and avoid making the trip feel rushed.
            </p>
            <p className="mt-4">
              If you like slower travel, a week can work even better. That gives you the option to split your stay between General Luna and Malinao, or General Luna and Pacifico.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Who Should Skip Siargao if They Do Not Surf?</h2>
            <p className="mt-4">
              Siargao may be less ideal for non-surfers who want nonstop sightseeing, lots of urban entertainment, shopping as a major part of the trip, a heavily structured resort experience, or a destination where beaches alone do all the work.
            </p>
            <p className="mt-4">
              But if you like scenic, flexible, easygoing island travel, it can still be very worth it.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Non-Surfer Travel Tips for Siargao</h2>
            <div className="mt-5 guide-checklist">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Stay in General Luna if it is your first trip and you want things to feel easy.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Build the trip around island hopping, food, beach time, and scenic movement rather than forcing yourself to surf.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>If you want peace, stay slightly outside the busiest central stretch.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>If you want a slower version of Siargao, consider splitting your stay with Pacifico.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Do not overbook every day. Siargao often feels better when you leave space in the itinerary.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>If you do not ride a motorbike confidently, plan transport honestly from the start.</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Give the island enough time to breathe — it is usually better at 4 to 5 days than at 2 rushed days.</span></div>
            </div>
          </section>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Final Verdict</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              Siargao is still worth visiting if you do not surf.
            </p>
            <p>
              Surfing may be the reason the island became famous, but it is not the only reason people love being there. Siargao also works for non-surfers because it offers island hopping, beautiful scenery, food, atmosphere, flexible days, and a style of travel that feels relaxed without being empty.
            </p>
            <p>
              If you like the idea of a scenic island trip with enough variety to keep things interesting, Siargao can still be a very strong destination — even if surfing never enters the plan.
            </p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Quick FAQ</h2>
          <div className="mt-4 space-y-5 guide-body">
            <div>
              <h3 className="text-[1.05rem] font-semibold text-slate-900">Is Siargao worth visiting if you do not surf?</h3>
              <p className="mt-2">Yes. Siargao is still worth visiting for island hopping, beaches, scenic drives, cafes, food, and relaxed island atmosphere.</p>
            </div>
            <div>
              <h3 className="text-[1.05rem] font-semibold text-slate-900">What can non-surfers do in Siargao?</h3>
              <p className="mt-2">Island hopping, beach time, scenic drives, cafe hopping, wellness, casual nightlife, and slower day trips are all strong options.</p>
            </div>
            <div>
              <h3 className="text-[1.05rem] font-semibold text-slate-900">Where should non-surfers stay in Siargao?</h3>
              <p className="mt-2">General Luna is usually the easiest base, while Malinao is a good quieter alternative. Pacifico works well for slower, less social stays.</p>
            </div>
            <div>
              <h3 className="text-[1.05rem] font-semibold text-slate-900">Is General Luna worth it for non-surfers?</h3>
              <p className="mt-2">Yes. It is still the most practical base because it gives non-surfers easy access to food, tours, and transport.</p>
            </div>
            <div>
              <h3 className="text-[1.05rem] font-semibold text-slate-900">How many days should non-surfers stay in Siargao?</h3>
              <p className="mt-2">Around 4 to 5 days works well for most non-surfers.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Keep exploring</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/blog/general-luna-travel-guide">Read the General Luna Travel Guide</Link></li>
            <li><Link href="/blog/pacifico-travel-guide">Read the Pacifico Travel Guide</Link></li>
            <li><Link href="/blog/siargao-for-couples">Read Siargao for Couples</Link></li>
            <li><Link href="/blog/siargao-solo-travel-guide">Read the Siargao Solo Travel Guide</Link></li>
            <li><Link href="/blog/family-friendly-things-to-do-in-siargao">Read Family-Friendly Things to Do in Siargao</Link></li>
            <li><Link href="/blog/where-to-stay-in-siargao">Read Where to Stay in Siargao</Link></li>
            <li><Link href="/guide/siargao-island-hopping-guide">Read the Siargao Island Hopping Guide</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock3, PenSquare, Tag } from "lucide-react";
import PublicSiteHeader from "@/components/PublicSiteHeader";
import BlogShareButtons from "@/components/BlogShareButtons";
import { getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Siargao Restaurant Directory | Verified Places to Eat in General Luna and Beyond",
  description:
    "A practical Siargao restaurant directory based on public verification, with where to eat in General Luna, standout restaurants by style, and notes on closures or uncertain listings.",
  alternates: {
    canonical: "/blog/siargao-restaurant-directory",
  },
  openGraph: {
    title: "Siargao Restaurant Directory | Verified Places to Eat in General Luna and Beyond",
    description:
      "A practical Siargao restaurant directory based on public verification, with where to eat in General Luna, standout restaurants by style, and notes on closures or uncertain listings.",
    url: "https://www.siargaofinder.com/blog/siargao-restaurant-directory",
    type: "article",
    images: [{ url: "/og-siargaofinder-logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Siargao Restaurant Directory | Verified Places to Eat in General Luna and Beyond",
    description:
      "A practical Siargao restaurant directory based on public verification, with where to eat in General Luna, standout restaurants by style, and notes on closures or uncertain listings.",
    images: ["/og-siargaofinder-logo.jpg"],
  },
};

export default function SiargaoRestaurantDirectoryPage() {
  const siteUrl = getSiteUrl();
  const publishedDate = "2026-04-22";
  const readingTime = "10 min read";
  const authorName = "M1GX";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Siargao Restaurant Directory: Verified Places to Eat in General Luna and Beyond",
    description:
      "A practical Siargao restaurant directory based on public verification, with where to eat in General Luna, standout restaurants by style, and notes on closures or uncertain listings.",
    author: { "@type": "Person", name: authorName },
    publisher: { "@type": "Organization", name: "Siargao Finder" },
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: `${siteUrl}/blog/siargao-restaurant-directory`,
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
              <span className="blog-post-meta-pill"><Tag size={14} /> Food Guide</span>
              <span className="blog-post-meta-pill"><CalendarDays size={14} /> {publishedDate}</span>
              <span className="blog-post-meta-pill"><Clock3 size={14} /> {readingTime}</span>
              <span className="blog-post-meta-pill"><PenSquare size={14} /> Verified local directory</span>
            </div>
          </div>
        </div>

        <h1 className="page-title">Siargao Restaurant Directory: Verified Places to Eat in General Luna and Beyond</h1>
        <p className="page-subtitle guide-body">
          If you want a more practical answer than a generic “best restaurants in Siargao” list, this directory-style guide is built around publicly verifiable signals of restaurants that appear active as of April 22, 2026.
        </p>

        <BlogShareButtons title={metadata.title as string} path={metadata.alternates?.canonical as string} />

        <div className="blog-post-intro-card mt-8">
          <p className="blog-post-intro-label">In this post</p>
          <p className="blog-post-intro-copy">
            We break down where the strongest restaurant concentration still sits, what kinds of places stand out in General Luna, where the evidence gets thinner outside town, and which listings deserve caution because of closure or status conflicts.
          </p>
        </div>

        <div className="mt-8 guide-highlight-grid">
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best food base</span>
            <p className="guide-highlight-value">General Luna still has the strongest concentration of active and publicly visible restaurant options.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best for variety</span>
            <p className="guide-highlight-value">General Luna leads in mid-range dining, vegan-friendly spots, cocktails, and reservation-friendly dinner venues.</p>
          </div>
          <div className="guide-highlight-card">
            <span className="guide-highlight-label">Best planning tip</span>
            <p className="guide-highlight-value">Outside General Luna, check recent activity carefully because some towns rely more on guide listings than strong official restaurant pages.</p>
          </div>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Quick answer</h2>
          <div className="mt-4 space-y-4 guide-body">
            <p>
              If you are choosing where to eat in Siargao with the least friction, start in <Link href="/municipality/general-luna" className="link-inline">General Luna</Link>. It remains the island’s main tourism and dining hub, and the strongest concentration of verifiably active restaurants still sits there.
            </p>
            <p>
              Outside General Luna, there are still worthwhile options in places like Del Carmen, Dapa, Pilar, Burgos, San Isidro, and Santa Monica, but the public evidence often gets thinner. In other words, the farther you go from the main tourism center, the more important it becomes to double-check current hours and activity.
            </p>
          </div>
        </div>

        <div className="mt-10 space-y-10 guide-body">
          <section>
            <h2 className="section-title text-[1.6rem]">What this restaurant directory is based on</h2>
            <p className="mt-4">
              This guide is based on public verification signals checked on <strong>2026-04-22</strong>. Priority was given to official restaurant websites, official pages, resort restaurant pages, municipal tourism pages, and current Tripadvisor records. Secondary directories were only used to fill gaps where primary information was incomplete.
            </p>
            <p className="mt-4">
              That matters because not every Siargao restaurant maintains a strong standalone website. Some are clearly active through current listings and reviews, while others appear in older directories but have weaker recent evidence.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Why General Luna still dominates the restaurant map</h2>
            <p className="mt-4">
              The biggest pattern in the directory is simple: General Luna still carries the center of gravity for Siargao dining. That shows up not just in volume, but in the range of restaurant types that are easier to verify publicly.
            </p>
            <div className="guide-checklist mt-5">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>More mid-range and upper-mid-range dining than other parts of the island</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Stronger concentration of vegan, vegetarian, gluten-free, and cocktail-led venues</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>More restaurants with visible reservation systems, delivery signals, and card acceptance</span></div>
            </div>
            <p className="mt-4">
              By contrast, north and east Siargao lean more toward smaller cafés, grills, roadside spots, and resort restaurants with narrower hours and lighter platform coverage.
            </p>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Best verified restaurant picks in General Luna</h2>
            <p className="mt-4">
              If you want a practical shortlist rather than a huge spreadsheet, these are some of the stronger General Luna names that stood out repeatedly in the directory data.
            </p>
            <div className="mt-5 space-y-6">
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">Bravo Restaurant</h3>
                <p className="mt-2">A strong option for Spanish and international food, especially if you want a more polished sit-down meal with broad traveler familiarity.</p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">Kermit Siargao</h3>
                <p className="mt-2">Still one of the best-known names for pizza and casual dining in General Luna, with strong long-running visibility.</p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">NĀGA Siargao</h3>
                <p className="mt-2">A useful pick if you want a more contemporary all-day restaurant with stronger public signals for cards, delivery, takeout, and reservations.</p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">La Carinderia</h3>
                <p className="mt-2">A reliable choice for handmade pasta and a more established dinner feel, with card acceptance and reservations noted publicly.</p>
              </div>
              <div>
                <h3 className="text-[1.1rem] font-semibold text-slate-900">Roots, Lyma, Alma, and Secreto</h3>
                <p className="mt-2">These are stronger evening picks if you are planning a more intentional dinner and do not want to treat the meal as an afterthought.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Best for vegan, vegetarian, and healthier eating</h2>
            <p className="mt-4">
              One of the clearest advantages General Luna has over the rest of the island is how much easier it is to find vegan-friendly, vegetarian-friendly, and generally more health-conscious menus.
            </p>
            <div className="guide-checklist mt-5">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Ver De</strong> for a vegan-focused comfort-food option with strong 2026 signs of active operations</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Shaka</strong> for bowls, coffee, and a lighter daytime café feel</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Spotted Pig</strong> and <strong>Goodies</strong> for café-style meals and daytime flexibility</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>NĀGA</strong>, <strong>La Carinderia</strong>, <strong>CEV</strong>, and <strong>Miguel’s Taqueria</strong> for menus that still offer useful veg-friendly coverage</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Best for groups and families</h2>
            <p className="mt-4">
              If you are planning meals with a group, the best restaurants are usually the ones with broader menu appeal, easier seating, and stronger familiarity for mixed preferences.
            </p>
            <div className="guide-checklist mt-5">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Bravo</strong> and <strong>Kermit</strong> remain easy all-around picks in General Luna</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Tradicion</strong> is useful if you want a more Filipino-leaning meal in town</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span><strong>Las Barricas</strong> works well when the group wants a stronger evening atmosphere</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Outside General Luna, places like <strong>Krokodeilos</strong>, <strong>Cafe Editha</strong>, <strong>Bollox</strong>, and <strong>DaRosa Del Mar</strong> appear more useful as regional family or mixed-group options</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Important operational details travelers should know</h2>
            <p className="mt-4">
              The directory also surfaced a few practical patterns that matter once you move beyond “what looks good” and into “what is easier to plan.”
            </p>
            <div className="guide-checklist mt-5">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Cash and GCash still dominate at many casual spots</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Card acceptance is much more common at higher-end General Luna venues</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Dinner reservations matter more at places like Secreto, Las Barricas, Roots, NĀGA, and Lyma</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Outside General Luna, formal reservations and polished booking flows are less consistent</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Closures and uncertainty notes worth knowing</h2>
            <p className="mt-4">
              One useful part of the source document is that it did not treat every listing equally. It also flagged places with conflicting or outdated status signals.
            </p>
            <div className="mt-5 space-y-4">
              <p><strong>Emerald Restaurant</strong> in General Luna appears clearly closed and should be treated as historical, not current.</p>
              <p><strong>The Garage by Izustarri</strong> in Burgos is officially marked temporarily closed and should not be treated as currently bookable.</p>
              <p><strong>Aqwa Siargao</strong> in Santa Monica has conflicting public signals, so it is best treated as <strong>unverified</strong> rather than confidently open.</p>
              <p><strong>Ver De Siargao</strong> appears active again in 2026 despite a temporary closure announcement in October 2025.</p>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">How to use this directory well</h2>
            <p className="mt-4">
              The smartest way to use this kind of restaurant directory is not to read it as a final ranking. It works better as a filter for current-use planning.
            </p>
            <div className="guide-checklist mt-5">
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Use General Luna if you want the widest and easiest restaurant choice set</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Use the northern and eastern towns for more specific route-based or stay-based dining decisions</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>Double-check current hours outside General Luna before building plans around a single restaurant</span></div>
              <div className="guide-checklist-item"><span className="guide-checklist-dot" /><span>For dinner-led places, check reservation needs first instead of assuming walk-ins will be easy</span></div>
            </div>
          </section>

          <section>
            <h2 className="section-title text-[1.6rem]">Final takeaway</h2>
            <p className="mt-4">
              If you want the most practical restaurant planning base in Siargao, General Luna is still the clear winner. That is where the strongest concentration of verifiably active restaurants, broader cuisine variety, and better-publicized dining operations still sit.
            </p>
            <p className="mt-4">
              If you are staying elsewhere on the island, there are still worthwhile places to eat — just with a thinner evidence trail. That means the smartest move is not only choosing a good restaurant, but choosing one with strong current signals that it is actually operating the way you expect.
            </p>
          </section>
        </div>

        <div className="mt-10 guide-surface p-6">
          <h2 className="section-title text-[1.35rem]">Related pages</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 guide-links">
            <li><Link href="/blog/where-to-eat-in-siargao">Read: Where to Eat in Siargao</Link></li>
            <li><Link href="/guide/best-restaurants-in-general-luna">Read: Best Restaurants in General Luna</Link></li>
            <li><Link href="/guide/best-cafes-in-siargao">Read: Best Cafes in Siargao</Link></li>
            <li><Link href="/category/food-chains-and-restaurants">Browse Restaurants and Cafes in Siargao</Link></li>
            <li><Link href="/municipality/general-luna">Explore Businesses in General Luna</Link></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

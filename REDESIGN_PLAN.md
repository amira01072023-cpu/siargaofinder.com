# SiargaoFinder 2027 Redesign Plan

Last updated: 2026-11-24
Working branch: `feat/2027-ui-modernization`
Reference: `SiargaoFinder_UI_UX_Strategy_2027.pdf`

## Objective

Progressively modernize SiargaoFinder into a mobile-first local discovery platform without replacing the existing Next.js/Supabase architecture, changing indexed URLs, weakening security, or risking production data.

Brand direction: **Discover. Connect. Explore.**

## Verified baseline

- Next.js 16, React 19, TypeScript, Tailwind CSS 4, Supabase, Vercel.
- 3,326 public business listings across nine municipalities.
- 69 page components and 19 API route handlers.
- 98/98 sitemap URLs returned HTTP 200 on 2026-11-24.
- Existing canonical URLs, sitemap, robots, JSON-LD and public metadata are healthy.
- Responsive checks at 360, 375, 390, 430, 768, 1024, 1440 and 1920px found no horizontal overflow.
- The current mobile homepage hero is 768–801px tall and has no fixed bottom navigation.
- The current search API matches business names with `ILIKE`; it does not yet provide ranked full-text, typo-tolerant or autocomplete search.
- Public homepage logic is concentrated in an 839-line client component; global CSS is 3,839 lines. New work should reduce coupling through reusable components rather than expanding those files indefinitely.
- Read-only Supabase checks confirmed the public listing surface and 3,326 rows. Protected tables return no rows to anonymous requests where data exists; a full policy export remains a required pre-migration check.
- No Supabase Storage buckets currently exist, so image-upload work must not begin without an approved private/public bucket design.
- Cold-cache synthetic mobile lab baseline (4G, 4× CPU): TTFB 151ms, LCP 1.49s, CLS 0, approximately 234KB transferred. This is lab evidence, not field Core Web Vitals.

## Architecture principles

1. Preserve all current URLs, listing identifiers, database relationships and workflows.
2. Build reusable public components and tokens; keep admin styling isolated.
3. Use real database values only. Never fabricate ratings, reviews, verification, hours, photos or jobs.
4. Prefer PostgreSQL FTS and `pg_trgm` before paid search or AI services.
5. Exclude map search and jobs from the public product scope; keep municipality discovery and directory services focused on verified listing data.
6. Keep mobile interaction targets at least 44px and support reduced motion.
7. Reserve ad space without activating new monetization or obscuring primary actions.
8. Measure before and after; do not promise Lighthouse or field CWV scores.

## Phase 1 — Foundation and core discovery

### Increment 1A: design and navigation foundation

- Introduce Tropical Minimalism design tokens.
- Use Inter for body text and Plus Jakarta Sans for headings through `next/font`.
- Refactor public header navigation around Explore, Directory, Guides, Saved and business submission.
- Add an accessible mobile bottom navigation: Home, Explore, Island, Saved, More.
- Add active-route indicators, safe-area spacing and content clearance.
- Keep admin pages and routes unchanged.

### Increment 1B: homepage discovery

- Shorten the mobile hero and adopt “Discover the Best of Siargao.”
- Preserve keyword and municipality search with URL-backed state.
- Replace paginated category tiles with a responsive Bento-style category system using the existing taxonomy.
- Add municipality discovery using all nine existing municipality URLs.
- Add island essentials links using existing verified pages and categories.
- Rename the editorial homepage section to “The Siargao Journal” while preserving `/blog` and article URLs.
- Add reserved advertisement space below categories without loading new ad code.

### Increment 1C: search and listing cards

- Extract reusable listing-card components.
- Hide unavailable actions rather than displaying `N/A`.
- Replace public completeness percentages with neutral data-availability or verification language only when supported.
- Add accessible loading skeletons and empty states.
- Add autocomplete from legitimate business/category/municipality data with debouncing.
- Prepare a version-controlled SQL proposal for FTS/`pg_trgm`; do not execute without explicit approval.

### Increment 1D: listing profile and submission UX

- Modernize detail information hierarchy and mobile actions.
- Preserve LocalBusiness JSON-LD and canonical URLs.
- Convert business submission into an accessible multi-step client flow without changing the current API contract.
- Preserve claim, report and admin moderation workflows.

## Phase 2 — Local discovery

- Modernize all nine municipality pages with unique verified content.
- Expand favorites into a dedicated page and collection-ready data model.

## Phase 3 — Content and intelligent features

- Reframe `/blog` as **The Siargao Journal** without changing article URLs.
- Add topic navigation, dates, reading time, related content and internal directory links.
- Add advanced search, saved collections, trip planning and PWA capabilities.
- Consider Ask Siargao only after structured search quality and listing accuracy improve.

## Phase 4 — Growth and optimization

- Validate AdSense placements and consent behavior.
- Continue listing enrichment, duplicate cleanup and index-coverage expansion.
- Add multilingual architecture only after English information quality is stable.
- Use field performance data, Search Console and conversion analytics for iteration.

## Database and security gates

The following require separate review and explicit approval before execution:

- Database migrations, extensions, indexes or functions.
- New public or private Storage buckets.
- Changes to RLS, admin allowlists, auth or service-role usage.
- New paid services or production monetization changes.

Before any migration, export the current schema and RLS policies, write a reversible SQL migration, test it in a non-production project, and document rollback.

## Acceptance criteria

- Existing listings, URLs, APIs, auth and admin workflows remain intact.
- Public pages share a consistent, accessible 2027 design system.
- Mobile navigation feels app-like without obscuring content or advertisements.
- Search and listing actions are faster and clearer.
- No fabricated business data or unsupported status labels appear.
- Modified routes pass lint, type checking, tests, build, responsive checks, keyboard checks and live-link checks.
- Production deployment happens only after explicit approval.

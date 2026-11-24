# SiargaoFinder 2027 Test Report

Last updated: 2026-11-24
Branch: `feat/2027-ui-modernization`

## Baseline tests

### Live route health

- Sitemap URLs checked: 98
- HTTP 200: 98
- Broken or redirected sitemap URLs: 0

### Responsive baseline

Widths checked: 360, 375, 390, 430, 768, 1024, 1440 and 1920px.

- Horizontal overflow: none detected.
- Desktop navigation visible at 1024px and wider.
- Mobile hamburger visible through 768px.
- Fixed mobile bottom navigation: not implemented at baseline.
- Homepage category columns: 2 on mobile/tablet, 5 from 1024px.
- Mobile hero height: 768–801px.
- Browser runtime exceptions on sampled public pages: none.

Representative routes checked:

- `/`
- `/category/food-and-beverage`
- `/municipality/general-luna`
- `/listing/sur-transport-solutions-general-luna-siargao`
- `/blog`
- `/contact`

Each sampled page had one visible H1, a canonical URL and no horizontal overflow.

### Synthetic performance baseline

Profile: cold browser cache, 390×844 viewport, 4× CPU throttling, simulated 4G.

| Metric | Baseline |
|---|---:|
| TTFB | 151ms |
| DOMContentLoaded | 1,211ms |
| Load | 2,027ms |
| LCP | 1,492ms |
| CLS | 0 |
| Long tasks | 2 |
| Transfer | ~234KB |

This is a single synthetic run and must not be presented as field Core Web Vitals.

### Data/security surface

- Public `business_listings` count: 3,326.
- Service-role read checks succeeded for known operational tables.
- Anonymous reads returned zero rows for the populated `site_visits` table while the service role returned 38,080, consistent with RLS filtering.
- Empty protected tables cannot prove policy correctness; export and inspect policies before schema work.
- Supabase Storage buckets: 0.
- No database writes or migrations were performed.

## Required tests after each implementation increment

- ESLint
- TypeScript
- Vitest
- Next.js production build
- Required responsive widths
- Keyboard/focus navigation
- Reduced-motion behavior
- Public route and internal-link crawl
- Metadata/canonical/structured-data validation
- Admin isolation
- Synthetic performance comparison

## Known baseline issues

- Existing lint warnings in admin/auth flows.
- Search uses business-name `ILIKE` rather than ranked full-text search.
- Mobile bottom navigation is absent.
- The mobile homepage hero occupies most of the initial viewport.
- Listing UI exposes completeness percentages rather than meaningful verification language.
- Some municipality cards display `N/A` for unavailable phone values.
- Homepage and global CSS files are large and need progressive component extraction.

## Phase 1 foundation verification

Completed locally on `feat/2027-ui-modernization` without database writes or production deployment.

### Automated checks

- TypeScript: passed.
- Vitest: 5 files, 23 tests passed, including three natural-query intent cases.
- ESLint: 0 errors; 15 pre-existing warnings in admin/auth/claim flows.
- Next.js production build: passed; 115 static pages generated.
- `git diff --check`: passed.

### Search checks

- `motorbike rental in General Luna` inferred the Transport & Rentals group and General Luna municipality.
- Local API result: 79 matching listings; sampled results were real General Luna rental/transport records.
- `motorbike` suggestions returned the Transport & Rentals group and matching real business names.
- Suggestions are capped, debounced and sourced from existing public listing fields.

### Responsive checks after implementation

Widths checked: 360, 375, 390, 430, 768, 1024, 1440 and 1920px.

- Horizontal overflow: none detected.
- Exactly one H1 at every tested width.
- Mobile bottom navigation visible from 360–768px and hidden from 1024px upward.
- Category grid: 2 columns through 768px, 3 columns at 1024px, 4 columns at 1440px and 1920px.
- Municipality cards rendered: 9 at every tested width.
- Mobile and desktop hero screenshots were visually reviewed after animations settled.

### Accessibility and route checks

- Keyboard traversal reached the skip link, brand link, search input, municipality selector, search button, popular-search controls, filter disclosure and business-submission link in logical order.
- Focus indicators were present on interactive controls; search fields use the visible parent `:focus-within` treatment.
- Emulated `prefers-reduced-motion: reduce`: hero animation resolved to `none` and new discovery-card transition duration resolved to `0s`.
- Representative public routes had one H1, a canonical tag, no horizontal overflow and no browser runtime/console errors.
- `/admin/login` did not render the public mobile bottom navigation.
- Local sitemap crawl: 98/98 URLs returned HTTP 200.

### Synthetic performance comparison

Profile: cold browser cache, 390×844 viewport, 4× CPU throttling, simulated 4G. Each number is a single lab run, not field data.

| Metric | Baseline | Phase 1 foundation |
|---|---:|---:|
| TTFB | 151ms | 152ms |
| DOMContentLoaded | 1,211ms | 1,026ms |
| Load | 2,027ms | 2,529ms |
| LCP | 1,492ms | 1,308ms |
| CLS | 0 | 0 |
| Long tasks | 2 | 5 |
| Transfer | ~234KB | ~330KB |

LCP improved in this sample, but total transfer, load completion and long-task count increased. The next performance pass should profile font payloads and client-side homepage work before production release.

### Deferred verification

- Field Core Web Vitals require production traffic after an approved deployment.
- Safari verification requires an available Safari/WebKit environment.
- Full RLS policy verification requires a schema/policy export before any database migration.

## Phase 1 discovery and submission verification

### Automated checks

- TypeScript: passed.
- Vitest: 5 files, 23 tests passed.
- ESLint: 0 errors; 14 pre-existing warnings in admin/auth/claim flows.
- Next.js production build: passed; 115 static pages generated.

### Submission workflow

- Empty first step remained on step 1 and announced `Enter the business name to continue.`
- Existing `Bombom Motorbike Rentals` was found by the exact-name endpoint and blocked as a duplicate.
- Keyboard-style CDP input completed all six steps with category, municipality, phone, email, address and services preserved in the review summary.
- The final `Submit for review` control was present, but was intentionally not activated; no test record or database write was created.
- No runtime exceptions were recorded during the flow.

### Public discovery cards and detail page

- General Luna rendered 10 reusable cards at 390, 768, 1024 and 1440px.
- No horizontal overflow was detected on the submission, listing detail or General Luna pages at sampled widths.
- Mobile listing-detail primary actions computed as `position: sticky` above the bottom navigation.
- Each sampled page retained exactly one H1.
- Visual review completed for the mobile submission wizard and desktop municipality cards.
- Local sitemap crawl after the increment: 98/98 URLs returned HTTP 200.

## Public footer verification

- TypeScript: passed.
- Vitest: 5 files, 23 tests passed.
- ESLint: 0 errors; 14 pre-existing warnings in admin/auth/claim flows.
- Next.js production build: passed; 115 static pages generated.
- Footer checked at 360, 390, 768, 1024, 1440 and 1920px with no horizontal overflow.
- Layout adapts from one column on small phones to three columns on tablet/small desktop and five columns on wide desktop.
- Primary footer CTA retained a 52px touch target at every tested width.
- All 33 unique internal footer destinations returned a valid local response.
- `/admin/login` did not render the public footer.
- No browser runtime exceptions were recorded during responsive checks.
- Mobile and desktop footer screenshots were visually reviewed.

# SiargaoFinder 2027 Implementation Checklist

Last updated: 2026-11-24

## Governance and safety

- [x] Review the 2027 strategy and master implementation brief.
- [x] Create `feat/2027-ui-modernization` from the current production commit.
- [x] Confirm the worktree is clean before implementation.
- [x] Confirm indexed routes and production data must be preserved.
- [x] Confirm production deployment requires explicit approval.
- [ ] Export current Supabase schema and RLS policy definitions before any migration.
- [ ] Create a non-production migration test procedure before database changes.

## Baseline assessment

- [x] Inventory public pages, admin pages and API routes.
- [x] Review homepage, search API, listing pages, municipality pages and shared components.
- [x] Review Supabase table access surface without modifying data.
- [x] Check storage bucket availability.
- [x] Crawl the live sitemap: 98/98 URLs healthy.
- [x] Test widths 360, 375, 390, 430, 768, 1024, 1440 and 1920px.
- [x] Confirm no horizontal overflow at tested widths.
- [x] Record a synthetic mobile performance baseline.

## Phase 1A — Design system and navigation

- [x] Add Ocean Teal, Deep Ocean, Tropical Green, Island Sand, Soft White and Charcoal tokens.
- [x] Add Plus Jakarta Sans headings and Inter body typography with optimized font loading.
- [x] Standardize 12–16px radii, subtle borders, shadows, focus rings and motion timings.
- [x] Refactor desktop public navigation.
- [x] Add accessible fixed mobile bottom navigation.
- [x] Add safe-area and footer spacing for the bottom navigation.
- [x] Add path and hash-aware active navigation states.
- [x] Redesign the comprehensive public footer to match the 2027 design system.
- [x] Preserve admin UI isolation.

## Phase 1B — Homepage discovery

- [x] Update hero headline and supporting copy.
- [x] Reduce mobile hero height.
- [x] Preserve keyword and municipality URL state.
- [x] Add accessible search suggestions using real data.
- [x] Convert categories to Bento-style layout using existing identifiers.
- [x] Add all-nine municipality discovery section.
- [x] Add island essentials section.
- [ ] Add recently verified section only when verification data is reliable.
- [x] Add Recently added businesses section from real created_at data.
- [x] Add a dedicated noindexed Saved listings page.
- [x] Exclude map search and jobs previews from the public homepage scope.
- [x] Rename blog presentation to The Siargao Journal without URL changes.
- [ ] Add reserved ad space below categories.

## Phase 1C — Listings and search results

- [x] Extract reusable business listing card and adopt it across public discovery pages.
- [x] Hide unavailable contact actions and empty contact rows on updated public cards.
- [x] Add category-specific icon placeholders without fabricated photos.
- [x] Remove public completeness percentages while retaining internal SEO/admin quality scoring.
- [x] Add "Last checked" labels from the real last_verified_at field.
- [x] Preserve grid/list controls with visible accessible names.
- [x] Preserve the accessible mobile filter disclosure.
- [x] Add loading skeletons and improved empty states.
- [x] Add debounced autocomplete.
- [ ] Draft FTS/`pg_trgm` migration and rollback documentation.

## Phase 1D — Detail and submission flows

- [x] Modernize listing detail hierarchy.
- [x] Add mobile sticky contact actions above the bottom navigation.
- [x] Preserve LocalBusiness and breadcrumb structured data.
- [x] Add related businesses from existing listing data.
- [x] Convert business submission to an accessible multi-step flow.
- [x] Preserve and strengthen duplicate detection and admin approval.
- [ ] Verify claim and report flows.

## Later phases

- [ ] Modernize nine municipality destination pages.
- [ ] Dedicated saved-listings page and collections.
- [ ] The Siargao Journal editorial enhancement.
- [ ] PWA/low-data evaluation.
- [ ] Ask Siargao evaluation after structured search improvements.
- [ ] Multilingual architecture.

## Required verification for every increment

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm test`
- [x] `npm run build`
- [x] Responsive checks at all required widths
- [x] Keyboard and visible-focus checks
- [x] Reduced-motion check
- [x] Browser console error check
- [x] Modified-route HTTP and internal-link check
- [x] SEO metadata/canonical/structured-data check
- [x] Admin isolation check
- [x] Update `CHANGELOG.md` and `TEST_REPORT.md`

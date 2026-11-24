# Changelog

All notable 2027 modernization work is recorded here.

## Unreleased — `feat/2027-ui-modernization`

### Public discovery refinement

- Balanced the homepage category grid into equal-size responsive cards while retaining hover motion.
- Removed the hero trust/status strip to simplify the search area.
- Updated municipality cards to fetch and show matching homepage listings directly.
- Refined reusable listing cards with compact contact, address, last-checked and equal-action layouts.
- Added the supplied SiargaoFinder logo to the header and footer, with circular presentation and a corrected footer wordmark.

### Planning

- Added the phased 2027 redesign plan.
- Added implementation, testing and deployment checklists.
- Added the Tropical Minimalism design system.
- Recorded responsive, SEO, database-surface and synthetic performance baselines.

### Safety

- Confirmed the redesign branch is isolated from `main`.
- Confirmed no production deployment is authorized by this implementation brief.
- Confirmed existing URLs, Supabase data, auth and admin workflows are preservation requirements.

### Phase 1 foundation

- Added the Tropical Minimalism public color tokens and optimized Inter/Plus Jakarta Sans typography.
- Refactored public desktop navigation and added a five-item mobile bottom navigation with safe-area support.
- Updated the homepage hero content while retaining keyword, municipality and filter URL state.
- Added debounced, real-data autocomplete suggestions for businesses, categories and municipalities.
- Added natural query intent parsing for category and municipality phrases without a database migration.
- Replaced category pagination with an expandable Bento-style grid using existing category group identifiers and live counts.
- Added discovery cards for all nine municipalities and a practical Island Essentials section.
- Renamed the homepage editorial presentation to The Siargao Journal without changing article URLs.
- Replaced public completeness percentages with useful contact-availability information.
- Removed empty phone/address rows from updated public cards instead of displaying `N/A`.
- Preserved admin styling and all current production data, routes and Supabase relationships.

### Still pending in Phase 1

- PostgreSQL FTS/`pg_trgm` migration proposal, policy export and rollback test.
- Reliable last-updated/verification fields before displaying freshness claims.

### Phase 1 discovery and submission

- Added one reusable, category-aware business listing card across homepage results, category pages, municipality pages, municipality/category pages and related listings.
- Added real contact-method indicators, save actions, call/email/website/directions actions and category-specific icon placeholders.
- Removed disabled or empty contact actions instead of showing unavailable values.
- Added listing-result skeletons with reduced-motion support.
- Simplified listing details so unavailable fields are hidden and available contact actions have mobile sticky access above the bottom navigation.
- Converted free business submission into an accessible six-step workflow with progress, per-step validation, review and focus management.
- Strengthened duplicate checks with a dedicated exact business-name query that is independent of natural-language search intent.
- Preserved the existing submission endpoint, email verification, honeypot, admin review and Supabase data model.
- Added path and hash-aware active states to desktop and mobile public navigation.
- Replaced the submission success redirect with Next.js router navigation, reducing lint warnings from 15 to 14.

### Public footer refresh

- Replaced the previous black/yellow marketplace footer with the Ocean Teal, Deep Ocean and Island Sand design system.
- Added a clearer free-listing CTA, brand tagline, discovery links, practical island guides, all nine municipality routes and trust/support navigation.
- Consolidated legal links into a compact final row with mobile safe-area spacing.
- Preserved admin isolation; protected admin pages do not render the public footer.

### Strategy PDF gap closure

- Added a cached "Recently Added Businesses" homepage section using real `created_at` ordering across the nine municipalities.
- Added "Last checked" dates on listing cards and listing detail pages from the existing `last_verified_at` field; hidden when the field is empty.
- Added a dedicated noindexed `/saved` page; header, mobile bottom navigation and footer now link to it.
- Updated the hero trust line to "Free directory" per the 2027 strategy.
- Listings API now returns `email` and `last_verified_at` so search-result cards show email actions and check dates.

### Scope refinement and editorial discovery

- Removed the misleading public Map label and replaced it with municipality-focused discovery links; no map-search experience is advertised.
- Confirmed Jobs is excluded from the public homepage and navigation scope.
- Removed Jobs language from the homepage hero so the promise matches the live directory.
- Added a direct “Explore all guides” action to The Siargao Journal entry point.

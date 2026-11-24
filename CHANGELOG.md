# Changelog

All notable 2027 modernization work is recorded here.

## Unreleased — `feat/2027-ui-modernization`

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

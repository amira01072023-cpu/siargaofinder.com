# SEO Implementation Checklist — Siargao Finder

Tracks what already exists in the app and what to implement next from `docs/SEO_CONTENT_PLAN.md`.

## A) Already Implemented Routes (verify/enhance copy)

### Category hubs (dynamic)
- [x] `/category/[slug]` → `src/app/category/[slug]/page.tsx`
  - [ ] Inject unique SEO intro copy per mapped slug
  - [ ] Add FAQ block per category
  - [ ] Strengthen internal links to city + listing pages

### City hubs (dynamic)
- [x] `/city/[city]` → `src/app/city/[city]/page.tsx`
  - [ ] Inject unique SEO intro copy per mapped city
  - [ ] Add FAQ block per city
  - [ ] Add links to relevant categories + top listings

### Compliance/support pages
- [x] `/privacy-policy` → `src/app/privacy-policy/page.tsx`
- [x] `/terms-of-use` → `src/app/terms-of-use/page.tsx`
- [x] `/accessibility-statement` → `src/app/accessibility-statement/page.tsx`
- [x] `/data-rights-request` → `src/app/data-rights-request/page.tsx`
- [x] `/eu-compliance` → `src/app/eu-compliance/page.tsx`
- [x] `/report-illegal-content` → `src/app/report-illegal-content/page.tsx`

### Core listing/index pages
- [x] `/` → `src/app/page.tsx`
- [x] `/listing/[id]` → `src/app/listing/[id]/page.tsx`

---

## B) New Pages to Create (from SEO plan)

Create new route folder and `page.tsx` for each:

- [ ] `/guide/best-cafes-in-siargao`
- [ ] `/guide/best-restaurants-in-general-luna`
- [ ] `/guide/siargao-surf-schools-guide`
- [ ] `/guide/siargao-island-hopping-guide`
- [ ] `/guide/siargao-transport-guide`
- [ ] `/guide/siargao-coworking-guide`
- [ ] `/guide/where-to-find-services-in-siargao`
- [ ] `/guide/top-local-businesses-in-siargao`

Suggested file paths:
- `src/app/guide/best-cafes-in-siargao/page.tsx`
- `src/app/guide/best-restaurants-in-general-luna/page.tsx`
- `src/app/guide/siargao-surf-schools-guide/page.tsx`
- `src/app/guide/siargao-island-hopping-guide/page.tsx`
- `src/app/guide/siargao-transport-guide/page.tsx`
- `src/app/guide/siargao-coworking-guide/page.tsx`
- `src/app/guide/where-to-find-services-in-siargao/page.tsx`
- `src/app/guide/top-local-businesses-in-siargao/page.tsx`

---

## C) On-Page SEO Tasks (all target pages)

- [ ] Unique `<title>` and `description` metadata per page
- [ ] Single H1 per page
- [ ] 200–400 word intro content (human written)
- [ ] Internal links to related city/category/listing pages
- [ ] Optional FAQ section with useful long-tail questions
- [ ] Canonical defined where needed

---

## D) Technical SEO Tasks

- [x] `robots.txt` live and linked to sitemap
- [x] `sitemap.xml` live and indexable
- [x] Search Console verified
- [x] Sitemap submitted
- [x] Canonical base uses `https://www.siargaofinder.com`
- [ ] Expand sitemap entries after new `/guide/*` pages launch
- [ ] Add Organization/WebSite JSON-LD on homepage

---

## E) Internal Linking Sprint (high impact)

- [ ] Homepage: add link block to all city + category hubs
- [ ] City pages: link to top 3–5 categories in that city
- [ ] Category pages: link to top municipalities for that category
- [ ] Guide pages: link to at least 5 relevant listing/category/city pages

---

## F) Publish Workflow Per Page

1. Add route/page content
2. Add metadata (title/description)
3. Link from at least one existing indexed page
4. Deploy
5. Request indexing in Search Console URL Inspection
6. Track impressions/CTR weekly

---

## G) KPI Targets (first 90 days)

- [ ] 8 guide pages published
- [ ] 100% city/category pages with unique intro copy
- [ ] 20+ meaningful internal links added across hubs/guides
- [ ] Top 10 rankings for 10+ long-tail keywords
- [ ] Top 5 for 3–5 high-intent keywords

# ROUTES.md — Siargao Finder Route Map

## Public Pages
- `/`
  - Homepage (search, filters, popular categories, city/category links)
- `/listing/[id]`
  - Listing detail page + claim/report actions
- `/city/[city]`
  - City landing pages
- `/municipality/[municipality]`
  - Municipality landing pages
- `/category/[slug]`
  - Category landing pages
- `/auth`
  - Email signup/signin
- `/auth/callback`
  - Auth callback route
- `/list-your-business`
  - Auth-required business submission page
- `/claim/[listingId]`
  - Auth-required listing claim form
- `/privacy-policy`
- `/terms-of-use`
- `/accessibility-statement`
- `/eu-compliance`
- `/data-rights-request`
- `/report-illegal-content`
  - Legal/compliance pages
- `/guide/best-cafes-in-siargao`
- `/guide/best-restaurants-in-general-luna`
- `/guide/siargao-coworking-guide`
- `/guide/siargao-island-hopping-guide`
- `/guide/siargao-surf-schools-guide`
- `/guide/siargao-transport-guide`
- `/guide/top-local-businesses-in-siargao`
- `/guide/where-to-find-services-in-siargao`
  - SEO/content guide pages

---

## Admin Pages
- `/admin`
  - Admin landing page
- `/admin/submissions`
  - Review business submissions (approve/reject)
- `/admin/claims`
  - Review listing claim requests (approve/reject)
- `/admin/data-requests`
  - Review data rights requests
- `/admin/command-center`
  - Admin command center

---

## Public APIs
- `/api/listings`
  - Listings list with search + pagination
- `/api/listings/filters`
  - Dynamic category/city filter options
- `/api/listings/popular-categories`
  - Category counts for homepage
- `/api/business-submissions`
  - Create business submission (pending)
- `/api/claims`
  - Create listing claim request (pending)
- `/api/data-requests`
  - Create data rights requests
- `/api/report-illegal-content`
  - Create illegal content reports
- `/api/chat`
  - Site assistant search/chat endpoint
- `/api/site-visits`
  - Site visit tracking endpoint

---

## Admin APIs (Protected by admin email check)
- `/api/admin/submissions`
  - GET submissions
  - POST approve/reject submissions
- `/api/admin/claims`
  - GET claim requests
  - POST approve/reject claims
- `/api/admin/data-requests`
  - GET data requests
  - POST admin actions for data requests

---

## SEO / System Routes
- `/sitemap.xml` (from `src/app/sitemap.ts`)
- `/robots.txt` (from `src/app/robots.ts`)
- `/icon.svg`

---

## Route Guard Rules
- `/auth` and `/auth/callback` are public
- `/list-your-business` requires signed-in user
- `/claim/[listingId]` requires signed-in user
- `/admin/*` and `/api/admin/*` restricted to:
  - `amira.01072023@gmail.com`
- `middleware.ts` currently only matches `/__vendors_disabled__/:path*`, so most auth/admin enforcement is happening in route/page logic rather than global middleware

---

## Notes
- Keep API route naming consistent (`/api/admin/...` for admin routes)
- Do not introduce duplicate temporary routes without documenting and cleaning up
- Update this file when adding/removing routes
- Build output should be used as a final verification source for route coverage

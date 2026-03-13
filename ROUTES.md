# ROUTES.md — Siargao Biz Connect Route Map

## Public Pages
- `/`
- Homepage (search, filters, popular categories, city/category links)
- `/listing/[id]`
- Listing detail page + claim/report actions
- `/city/[city]`
- City landing pages
- `/category/[slug]`
- Category landing pages
- `/privacy-policy`
- Legal page
- `/terms-of-use`
- Legal page
- `/auth`
- Email signup/signin
- `/list-your-business`
- Auth-required business submission page
- `/claim/[listingId]`
- Auth-required listing claim form

---

## Admin Pages
- `/admin/submissions`
- Review business submissions (approve/reject)
- `/admin/claims`
- Review listing claim requests (approve/reject)

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

---

## Admin APIs (Protected by admin email check)
- `/api/admin/submissions`
- GET submissions
- POST approve/reject submissions
- `/api/admin/claims`
- GET claim requests
- POST approve/reject claims

---

## SEO / System Routes
- `/sitemap.xml` (from `src/app/sitemap.ts`)
- `/robots.txt` (from `src/app/robots.ts`)

---

## Route Guard Rules
- `/auth` is public
- `/list-your-business` requires signed-in user
- `/claim/[listingId]` requires signed-in user
- `/admin/*` and `/api/admin/*` restricted to:
- `amira.01072023@gmail.com`

---

## Notes
- Keep API route naming consistent (`/api/admin/...` for admin routes)
- Do not introduce duplicate temporary routes without documenting and cleaning up
- Update this file when adding/removing routes

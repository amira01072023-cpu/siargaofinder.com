# LAUNCH_CHECKLIST.md — Siargao Finder Production Checklist

## 1) Core Site
- [x] Homepage loads and search works
- [x] Filters (category/city) load from DB
- [x] Pagination works
- [x] Listing cards open detail pages

## 2) Listing Detail
- [x] `/listing/[id]` loads valid data
- [x] Website/phone/email actions work
- [x] "Claim / Update this Listing" opens `/claim/[listingId]`
- [x] Related listings section renders (if available)
- [x] JSON-LD scripts present in page source

## 3) Submission & Claims
- [ ] `/auth` sign up/sign in works
- [x] `/list-your-business` requires login
- [ ] All required fields enforced
- [ ] Submission saved with status `pending`
- [x] `/claim/[listingId]` requires login
- [ ] Claim form submits with filled fields

## 4) Admin
- [ ] `/admin/submissions` accessible only to admin email
- [ ] Approve inserts into `business_listings`
- [ ] Reject requires reason and saves `review_note`
- [ ] `/admin/claims` accessible only to admin email
- [ ] Approve/reject claims updates status correctly

## 5) API Endpoints
- [x] `/api/listings` returns JSON
- [x] `/api/listings/filters` returns JSON
- [x] `/api/listings/popular-categories` returns JSON
- [ ] `/api/business-submissions` accepts valid payload
- [ ] `/api/claims` accepts valid payload
- [x] `/api/admin/submissions` admin protected
- [x] `/api/admin/claims` admin protected

## 6) SEO
- [x] `/sitemap.xml` loads
- [x] `/robots.txt` loads
- [ ] Google verification file accessible
- [x] Search Console property verified
- [x] Sitemap submitted to Search Console

## 7) Security & Hygiene
- [x] `.env.local` exists locally and is NOT committed
- [x] `.gitignore` includes local secrets/logs/backups
- [x] No debug placeholders/routes left
- [x] Admin email restriction active
- [x] HTTPS/SSL enforced on production domain
- [ ] Backups configured and restore test verified
- [x] Vulnerability scan completed (production dependencies currently report 0 known vulnerabilities)
- [x] Public write/email endpoints have application-level request limiting
- [ ] Vercel firewall/distributed rate limits configured and verified

## 7.1) Compliance & Accessibility
- [x] Privacy Policy reviewed and published
- [x] Terms of Use reviewed and published
- [x] Cookie consent banner visible and functional
- [x] Accessibility Statement published
- [x] Data Rights Request form tested
- [x] Contact process for DSAR requests documented

## 8) Deployment
- [x] `git add . && git commit` clean
- [ ] `git push origin main` (blocked until GitHub credentials are reconnected; local `main` is ahead)
- [x] Vercel deployment status = Ready
- [x] Live smoke test passed:
- [x] `/`
- [x] `/listing/1`
- [x] `/auth`
- [x] `/admin/submissions` (admin)
- [x] `/admin/claims` (admin)
- [x] `/sitemap.xml`

## 9) Post-Launch Monitoring (first 72h)
- [ ] Check Vercel logs for runtime errors
- [ ] Check Supabase logs for API errors
- [ ] Check Search Console coverage
- [ ] Verify new submissions/claims processing


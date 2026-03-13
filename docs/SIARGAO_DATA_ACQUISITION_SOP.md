# Siargao Directory — Data Acquisition SOP

## 1) Objective
Build and maintain a fresh, trustworthy Siargao business directory with structured, deduplicated, owner-updatable listings.

## 2) Priority Categories (Phase 1)
1. Accommodation (hotels, hostels, villas)
2. Cafés & restaurants
3. Surf schools & rentals
4. Tours & island hopping
5. Transport (scooter/motorbike/van)
6. Wellness (spa, yoga, gyms)
7. Coworking spaces
8. Essentials (pharmacy, clinic, groceries, ATMs)

## 3) Data Sources (in order)
1. Google Maps (broad base)
2. Facebook Pages (freshness + contacts)
3. Instagram business profiles (tourism-heavy segments)
4. TripAdvisor / Booking / Airbnb (hospitality/tours discovery)
5. Owner submissions + claim requests (highest long-term quality)

## 4) Required Listing Fields
### Minimum publish fields
- business_name
- category
- city_or_area (e.g., General Luna, Del Carmen)
- phone_or_whatsapp
- source_url
- last_verified_at

### Recommended fields
- website_url
- email
- services
- short_description
- status (`active`, `pending_review`, `inactive`)

## 5) Capture Workflow
1. Collect raw (source + URL + scrape date)
2. Normalize (trim, title case, standardize phones)
3. Classify (map to fixed categories)
4. Deduplicate (name + phone + area heuristics)
5. Score completeness (minimum threshold before publish)
6. Publish as public listing
7. Queue periodic re-verification

## 6) Deduplication Rules
Mark as probable duplicate if:
- same phone OR same WhatsApp
- same name + same area
- same website domain + similar name

When duplicate found:
- keep richer record
- merge missing fields
- preserve all source references

## 7) Freshness Rules
- High-churn categories (cafés, tours, rentals): every 30 days
- Medium (wellness, coworking): every 60 days
- Stable (clinics, pharmacies): every 90 days

Auto-flag stale when `last_verified_at` exceeds threshold.

## 8) Verification Checklist
- Business still active
- Contact works
- Location/category still correct
- Social page active in last 60 days
- No spam/fake indicators

## 9) Compliance & Trust
- Keep source URL for each record
- No fake reviews
- Keep Report Listing + Claim Listing flows visible
- Respect platform terms when collecting public data
- Track moderation decisions in admin logs

## 10) Weekly Ops Cadence
- Monday: ingest + normalize
- Tuesday: dedupe + category QA
- Wednesday: publish approved batch
- Thursday: owner outreach / claim prompts
- Friday: stale listing re-verification
- Saturday: analytics review (top searches, no-result terms)

## 11) KPIs
- New listings/week
- Duplicate rate
- % listings with phone/website
- % verified in last 60 days
- Claim conversion rate
- No-result search terms

# SiargaoFinder

SiargaoFinder is a Next.js directory website for discovering local businesses, services, tours, rentals, restaurants, and useful contacts across Siargao.

## Stack
- Next.js 16
- React 19
- TypeScript
- Supabase
- Tailwind CSS v4
- Vercel

## Core Features
- searchable business directory
- category, city, and municipality browsing
- listing detail pages
- business submission flow
- listing claim flow
- admin review tools for submissions, claims, and data requests
- legal/compliance pages
- guide/content pages for SEO
- site chat widget for lightweight directory discovery

## Main Routes
- `/`
- `/listing/[id]`
- `/city/[city]`
- `/municipality/[municipality]`
- `/category/[slug]`
- `/auth`
- `/list-your-business`
- `/claim/[listingId]`
- `/admin`

See `ROUTES.md` for the fuller route map.

## Development
Start the dev server:

```bash
npm run dev
```

Run lint:

```bash
npx eslint .
```

Run production build:

```bash
npm run build
```

Run automated checks:

```bash
npm run typecheck
npm test
```

## Environment
This project expects Supabase environment variables in `.env.local`.

Typical values include:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `ADMIN_EMAIL` or `ADMIN_EMAIL_ALLOWLIST`
- `RESEND_API_KEY` (optional)

## Notes
- `scripts/` contains import, migration, normalization, and scraping utilities
- `sql/` contains database setup SQL
- `public/googledc123a7f9d3a9fff.html` is used for Google verification
- deployment is configured for Vercel
- public write/email APIs use application-level request limiting; keep Vercel firewall/rate-limit rules enabled as the distributed production layer
- public third-party advertising scripts are consent-gated and excluded from all `/admin` routes
- GitHub Actions runs audit, lint, type-check, tests, and build for pushes and pull requests

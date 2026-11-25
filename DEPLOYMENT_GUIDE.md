# SiargaoFinder 2027 Deployment Guide

Last updated: 2026-11-25

## Environments

- Production branch: `main`
- Current review branch: `feat/directory-audit-hardening`
- Hosting: linked Vercel project `siargaofinder-com`
- Production domains: `siargaofinder.com` and `www.siargaofinder.com`
- Canonical domain: `https://www.siargaofinder.com`

### Turnstile anti-spam configuration

Before enabling Cloudflare Turnstile in Vercel, add these variables for the production domain and preview environment:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — Cloudflare Turnstile site key; safe for the browser.
- `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile secret key; server-only and never committed.

The submission form keeps its existing honeypot, timing, rate-limit, duplicate and email-verification safeguards. Once both variables are set, Turnstile renders on the Review step and the server rejects submissions without a valid token.

Do not deploy this redesign branch to production without explicit approval.

### Admin access configuration

- `ADMIN_EMAIL_ALLOWLIST` — optional comma-separated, server-only allowlist for admin accounts.
- `ADMIN_EMAIL` — optional single-email server-only fallback.

If neither variable is configured, the established administrator remains the compatibility fallback. Configure the allowlist in Vercel before a production release when changing administrator access; never place an allowlist in client-side `NEXT_PUBLIC_*` variables.

## Pre-merge checklist

1. Confirm all changes are committed on the development branch.
2. Confirm no `.env`, credentials, exports, backups or local logs are staged.
3. Confirm no unapproved SQL or RLS changes are included.
4. Run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

5. Run responsive, keyboard, reduced-motion and browser-console checks.
6. Crawl all sitemap URLs and modified internal routes.
7. Verify metadata, canonical URLs, structured data, robots and sitemap.
8. Verify admin files and workflows are unchanged unless explicitly in scope.
9. Compare synthetic performance with `TEST_REPORT.md`.
10. Review the staged diff and obtain production approval.

## Preview workflow

Push the development branch only when a remote preview is requested. Use the Vercel preview URL for stakeholder review. Do not alias a preview deployment to the production domains.

## Production workflow

After approval:

1. Merge the reviewed development branch into `main`.
2. Push `main` to GitHub.
3. Wait for Vercel Production to reach `READY`.
4. Verify the deployment commit and production aliases.
5. Smoke-test homepage, search, listings, municipality, category, blog, legal, auth and protected admin routes.
6. Crawl sitemap URLs.
7. Check Vercel and Supabase runtime logs.
8. Monitor Search Console, analytics and error reports after release.

## Database migration workflow

Database changes require separate explicit approval.

1. Export schema, indexes, functions, grants and RLS policies.
2. Create a timestamped, reversible SQL migration.
3. Document expected locks, query cost and rollback.
4. Test against a non-production Supabase project.
5. Back up affected production tables.
6. Apply during an approved window.
7. Verify RLS using anonymous, authenticated, owner and admin roles.

## Rollback

Frontend rollback:

- Promote the previous Ready Vercel production deployment, or revert the merge commit and push `main`.
- Verify both production aliases after rollback.

Database rollback:

- Use the reviewed down migration or restore the affected backup.
- Never use destructive reset commands against production.

## Post-deployment evidence

Record in `TEST_REPORT.md` and `CHANGELOG.md`:

- Commit SHA and deployment URL.
- Build/test results.
- Production route crawl result.
- Performance comparison.
- Any known limitations or follow-up items.

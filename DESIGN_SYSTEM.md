# SiargaoFinder Design System — Tropical Minimalism 2027

Last updated: 2026-11-24

## Brand

- Product: **SiargaoFinder**
- Tagline: **Discover. Connect. Explore.**
- Voice: practical, welcoming, local and trustworthy.
- Visual goal: premium island discovery without decorative clutter.

## Color tokens

| Token | Value | Use |
|---|---:|---|
| Ocean Teal | `#087F8C` | Primary actions, active navigation, links |
| Deep Ocean | `#134E4A` | Headings, dark surfaces, strong text |
| Tropical Green | `#10B981` | Positive status and verified-data accents |
| Island Sand | `#F5F1E8` | Warm section backgrounds |
| Soft White | `#FAFAFA` | Main application background |
| Charcoal | `#1E293B` | Primary body text |

Supporting neutral colors should come from a small slate scale. Yellow from the existing site may remain as a restrained transitional accent during the redesign, but new primary interactions use Ocean Teal.

## Typography

- Headings: Plus Jakarta Sans, variable weight 600–800.
- Body and UI: Inter, variable weight 400–700.
- Use `next/font/google` so fonts are self-hosted and preloaded by Next.js.
- Avoid all-caps for long headings; reserve uppercase for short eyebrow labels.
- Body copy line height: 1.55–1.75.
- Minimum default body size: 16px.

## Layout

- Public maximum width: 80–90rem depending on content density.
- Standard page gutter: 1rem mobile, 1.5rem tablet, 2rem desktop.
- Section spacing: 3.5rem mobile, 5–7rem desktop.
- Use CSS Grid for discovery and listing layouts.
- Avoid horizontal carousels for essential content unless keyboard and scroll controls are present.

## Shape and elevation

- Controls: 12px radius.
- Cards and panels: 14–16px radius.
- Pills: 9999px only for tags, compact filters and status chips.
- Default cards: 1px subtle border with minimal shadow.
- Hover: 150–250ms, small translation or shadow change; no large zooms.
- Avoid stacked offset shadows, excessive gradients and glass effects in new 2027 components.

## Interaction

- Minimum touch target: 44×44px.
- Focus ring: 3px Ocean Teal tint plus visible offset.
- Motion durations: 150ms fast, 200ms standard, 250ms deliberate.
- Respect `prefers-reduced-motion` and keep content visible without JavaScript.
- Hover must never be the only way to expose required information.

## Navigation

Desktop:

- Brand at left.
- Primary discovery routes centered.
- “List your business” as the main action.
- Show only routes that exist; mark future Map/Jobs destinations clearly until implemented.

Mobile:

- Fixed bottom navigation: Home, Explore, Map, Saved, More.
- Active item uses Ocean Teal and a semantic current-page state.
- Respect `env(safe-area-inset-bottom)`.
- Provide enough page-bottom padding so controls and advertisements are not covered.

## Cards

Business cards:

- Business name, category, municipality and address first.
- Only real contact actions.
- Hide unavailable buttons instead of showing `N/A`.
- No fabricated images, ratings, reviews, hours or verification.
- Use consistent category placeholders where photos do not exist.

Category cards:

- Preserve existing identifiers and destination behavior.
- Tourism categories may span more grid area.
- Use real counts where available.
- Lucide icons for categories without licensed images.

## Accessibility

- Target WCAG 2.2 AA.
- Maintain 4.5:1 normal-text contrast and 3:1 large-text/UI contrast.
- Use semantic landmarks and one H1 per page.
- Labels remain programmatically associated with controls.
- Dialogs, sheets and disclosures must be keyboard operable.
- Error messages use text and ARIA semantics, not color alone.

## Photography

- Prefer authentic, licensed Siargao photography.
- Record asset source/license in project documentation.
- Use responsive `next/image` sizes and below-the-fold lazy loading.
- When a verified image is unavailable, use a lightweight category placeholder.

## Advertising

- Clearly label advertising.
- Reserve dimensions to reduce CLS.
- Never place ads beside contact buttons or inside navigation.
- Never disguise ads as listings.
- Consent and policy behavior must remain intact.

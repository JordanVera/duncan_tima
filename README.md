# Duncan Tima — portfolio

Portfolio site for Duncan Tima, UI/UX and product designer. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and a single isolated GSAP ScrollTrigger sequence on the homepage.

## Getting started

Requires Node 20+ and pnpm 10 (the version is pinned in `package.json`; `corepack enable` picks it up).

```bash
pnpm install
cp .env.example .env.local   # optional — the site runs without any variables
pnpm dev                     # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm lint` | ESLint (Next core-web-vitals + TypeScript rules) |
| `pnpm typecheck` | `tsc --noEmit` |

## Environment variables

All variables are optional. `.env.example` lists the names only; put real values in `.env.local` locally and in your host's environment settings in production. Never commit them.

| Variable | Scope | Effect when unset |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical URLs, sitemap, robots, Open Graph, and JSON-LD fall back to `http://localhost:3000`. **Set this in production.** |
| `NEXT_PUBLIC_BOOKING_URL` | Public | "Book a discovery call" becomes "Request a discovery call by email" (a prefilled `mailto:`). |
| `RESEND_API_KEY` | Server only | Inquiry form cannot deliver (see below). |
| `CONTACT_TO_EMAIL` | Server only | Recipient(s) for inquiries. Comma-separate multiple addresses. |
| `CONTACT_FROM_EMAIL` | Server only | Sender address; must be on a domain verified in Resend. |

### Inquiry form delivery

The form on `/contact` posts to a Server Action (`src/app/contact/actions.ts`), validates with zod (`src/lib/inquiry/schema.ts`), and hands the inquiry to a provider (`src/lib/inquiry/deliver.ts`). The included provider sends through the [Resend REST API](https://resend.com/docs/api-reference/emails/send-email) with `reply_to` set to the visitor's address.

The form never reports a delivery that did not happen:

- **Not configured** (any of the three server variables missing): the visitor sees "Your message has not been sent", keeps everything they typed, and gets a button that opens the same message prefilled in their email app.
- **Provider error** (bad key, network failure, timeout): same honest fallback; the reason is logged on the server.
- **Sent**: confirmation message.

To enable delivery: create a Resend account, verify your sending domain, create an API key, and set the three variables. To use a different provider, add a file next to `src/lib/inquiry/providers/resend.ts` that implements `InquiryProvider` and return it from `getInquiryProvider()`.

## Editing content

All copy and media are typed local data behind a content-access layer, so pages never import content files directly.

| What | File |
| --- | --- |
| Case studies (Proof, ProofOPS, Userwise) | `src/content/projects/*.ts` — ordered `blocks` (headings, text, images, video, quotes, metrics, features, diagram) |
| Services | `src/content/services.ts` |
| About, experience timeline | `src/content/about.ts` |
| Testimonials | `src/content/testimonials.ts` |
| Inquiry form options | `src/content/inquiry.ts` |
| Name, email, phone, LinkedIn, logo files, nav | `src/lib/site-config.ts` |
| Data access (`getProjects`, `getProject`, …) | `src/lib/content.ts` |
| Design tokens (color, type, spacing, motion) | `src/app/globals.css` |

Images live in `public/images/…`. Always record an image's real pixel `width`/`height` in content so it renders at its native aspect ratio; see `docs/asset-inventory.md` for every asset and where it came from.

### Adding a case study

1. Add images under `public/images/projects/<slug>/`.
2. Create `src/content/projects/<slug>.ts` exporting a `Project`.
3. Add it to the array in `src/content/projects/index.ts`. Routes, navigation, sitemap, and "next project" links update automatically.

### Moving to Sanity later

Only `src/lib/content.ts` needs to change: replace each function body with a GROQ query that returns the same types from `src/content/types.ts`. Case-study `blocks` map naturally to a Portable Text–style array of typed objects. Page components and the design system stay untouched.

## Project structure

```
src/
  app/                 routes, metadata, sitemap, robots, OG image, contact Server Action
  components/
    navigation/        glass nav, projects disclosure, mobile menu, theme toggle
    home/              hero, GSAP work stack, testimonials
    case-study/        block renderer, section index, diagram, next project
    contact/           inquiry form
    layout/ ui/        header, footer, closing CTA, buttons, media frame, reveal
  content/             typed local content
  lib/                 site config, content access, SEO/JSON-LD, motion tokens, inquiry delivery
docs/asset-inventory.md
```

## Accessibility and motion

- Skip link, landmark regions, one `h1` per page, visible focus rings, labelled controls.
- Mobile menu is a modal dialog with focus trap, Escape to close, and focus return; the projects disclosure closes on Escape and outside click.
- Theme: dark by default, persisted in `localStorage` (`dt-theme`), applied before paint (no flash).
- `prefers-reduced-motion`: Framer Motion drops movement and keeps simple fades; the GSAP sequence is not registered; video never autoplays.
- `prefers-reduced-transparency` and browsers without `backdrop-filter` get solid surfaces instead of glass.

## Missing before launch

| Needed | Where | Current state |
| --- | --- | --- |
| Portrait or working photo of Duncan (portrait orientation, ≥1600×2000) at `public/images/about/duncan-tima-portrait.jpg` | `/about` | Neutral "Image pending" placeholder. Add the file and set `portrait` in `src/content/about.ts`. |
| Services screenshot referenced in the original brief | `src/content/services.ts` | Not received; services mirror the live site word for word. |
| Production domain | `NEXT_PUBLIC_SITE_URL` | Unset. |
| Booking link (optional) | `NEXT_PUBLIC_BOOKING_URL` | Unset; email request is used. |
| Resend account + verified domain (optional) | Server env | Unset; form shows the email fallback. |

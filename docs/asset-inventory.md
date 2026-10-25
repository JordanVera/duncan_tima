# Asset inventory

All assets were captured on 25 Oct 2026 from Duncan's existing portfolio at `duncantima.framer.website` (password-protected; the password was entered manually in the browser and is not stored anywhere in this repository). Source files live on `framerusercontent.com`; very large originals were downloaded through Framer's `scale-down-to=2560` variant, which preserves aspect ratio.

Dimensions are the stored file's pixel size. "Fit" is how the site renders the image: `contain` keeps the full UI screenshot readable, `cover` is only used where cropping cannot hide interface detail.

## Brand

| File | Size | Used on | Notes |
| --- | --- | --- | --- |
| `public/images/logo_main_white.png` | 875×649 | Header, footer, and mobile menu in the light theme | Supplied by Duncan. White pixel "D.T" with black outline and shadow, transparent background. |
| `public/images/logo_main_black.png` | 875×649 | Header, footer, and mobile menu in the dark theme; OG image | Supplied by Duncan. Black pixel "D.T" with white detailing, transparent background. |

The theme-to-file mapping lives in `siteConfig.logo` (`src/lib/site-config.ts`).

## Projects: Proof (`/projects/proof`, source `/proof`)

Order matches the source case study.

| # | File | Size | Source section | Fit |
| --- | --- | --- | --- | --- |
| 1 | `projects/proof/proof-cover.png` | 2560×1920 | Hero / homepage card | contain |
| 2 | `projects/proof/proof-job-details-before.png` | 2556×1648 | Where we started | contain |
| 3 | `projects/proof/proof-chat-intent-research.png` | 1506×816 | Research revealed | contain |
| 4 | `projects/proof/proof-fragmented-job-pages.png` | 2560×1607 | The reframe | contain |
| 5 | `projects/proof/proof-serve-as-container.png` | 1380×988 | The reframe (data model) | contain |
| 6 | `projects/proof/proof-job-tracker-health.png` | 1049×776 | Solution: Job tracker | contain |
| 7 | `projects/proof/proof-unified-history.png` | 814×812 | Solution: Unified history | contain |
| 8 | `projects/proof/proof-address-intelligence.png` | 1334×798 | Solution: Address intelligence | contain |
| 9 | `projects/proof/proof-global-job-selector.png` | 2571×422 | Enabling ops | contain |
| 10 | `projects/proof/proof-key-takeaway.png` | 6400×4800 | Key takeaway | contain |

## Projects: ProofOPS (`/projects/proofops`, source `/proofops`)

| # | File | Size | Source section | Fit |
| --- | --- | --- | --- | --- |
| 1 | `projects/proofops/proofops-cover.png` | 2560×1607 | Hero / homepage card | contain |
| 2 | `public/video/proofops-background.mp4` | 1856×1080, 17.8 s | Background | contain (muted, no autoplay under reduced motion) |
| 2a | `projects/proofops/proofops-background-poster.jpg` | 1856×1080 | Poster frame for the video (frame at 2 s) | contain |
| 3 | `projects/proofops/proofops-legal-complexity.png` | 2560×1273 | Legal tech is complex | contain |
| 4 | `projects/proofops/proofops-compounding-problems.png` | 1351×529 | The problem | contain |
| 5 | `projects/proofops/proofops-job-lifecycle-map.png` | 2560×1607 | Mapping work | contain |
| 6 | `projects/proofops/proofops-teams.png` | 1006×681 | Teams | contain |
| 7 | `projects/proofops/proofops-roles.png` | 1440×904 | Roles | contain |
| 8 | `projects/proofops/proofops-routing-logic.png` | 1440×904 | Routing logic | contain |
| 9 | `projects/proofops/proofops-documentation.png` | 2880×1808 | Documentation | contain |

## Projects: Userwise (`/projects/userwise`, source `/userwise`)

| # | File | Size | Source section | Fit |
| --- | --- | --- | --- | --- |
| 1 | `projects/userwise/userwise-cover.png` | 2560×1920 | Hero / homepage card | contain |
| 2 | `projects/userwise/userwise-overview.png` | 6400×4800 | Intro | contain |
| 3 | `projects/userwise/userwise-process.png` | 6400×4800 | How I worked (sketches) | contain |
| 4 | `projects/userwise/userwise-campaigns.png` | 6400×4800 | Campaigns | contain |
| 5 | `projects/userwise/userwise-shops.png` | 6400×4800 | Shops | contain |
| 6 | `projects/userwise/userwise-version-history.png` | 6400×4800 | Version history | contain |
| 7 | `projects/userwise/userwise-json-upload.png` | 6400×4800 | JSON upload | contain |
| 8 | `projects/userwise/userwise-outcome.png` | 6400×4800 | Outcome | contain |

## Services (homepage "Services" section on the source)

| File | Size | Service | Fit |
| --- | --- | --- | --- |
| `services/graphic-design-example.png` | 2048×2560 | Graphic Design | cover (poster artwork, no UI) |
| `services/digital-design-example.png` | 2560×1002 | Digital Design | contain |
| `services/social-media-design-example.png` | 1080×1350 | Social Media Design | cover (poster artwork, no UI) |

## Testimonials

| File | Size | Person |
| --- | --- | --- |
| `testimonials/frank-marricochi.jpg` | 389×389 | Frank Marricochi |
| `testimonials/melanie-britton.jpg` | 400×400 | Melanie Britton |
| `testimonials/robin-boyd.png` | 640×640 | Robin Boyd (transparent cut-out) |

## Missing before launch

| Needed | Where it appears | Current state |
| --- | --- | --- |
| A portrait or working photo of Duncan (JPG/PNG, at least 1600×2000, portrait orientation) saved as `public/images/about/duncan-tima-portrait.jpg` | `/about` | The source site has no photo of Duncan (the image in the hero slot is the D.T logo). A labeled neutral placeholder is shown until the file is added and `portrait` is set in `src/content/about.ts`. |
| The services screenshot referenced in the brief | `src/content/services.ts` | Not received. Services currently mirror the live site (Graphic, Digital, Social Media Design) word for word. |

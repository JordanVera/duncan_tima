# Asset inventory

All brand, toolkit, and project assets were ingested from the ABCD client Google Drive folders (`ABCD DNA` and `DT Website Assets`) on 17 Nov 2026.

Dimensions are each stored file's pixel size (or SVG `viewBox`). "Fit" describes how `MediaFrame` renders each asset: `contain` keeps the full artwork or screenshot readable; `cover` is only used when an explicit aspect container is passed.

## Brand logos (`public/images/logos/`)

All 10 original logo files from `Logos/Website Logo/` are preserved at `1116×1116` in `public/images/logos/`, alongside tightly cropped web lockups in `public/images/logos/trimmed/` for crisp navbar/footer rendering without vertical padding.

| File | Size | Trimmed (`trimmed/`) | Notes |
| --- | --- | --- | --- |
| `public/images/logos/abcd_logo_hor.png` | 1116×1116 | 1056×308 | Horizontal ABCD \| A Better Creative Direction lockup (dark ink, light theme) |
| `public/images/logos/abcd_logo_hor_wht.png` | 1116×1116 | 1056×308 | Horizontal ABCD \| A Better Creative Direction lockup (white ink, dark theme & OG) |
| `public/images/logos/abcd_logo_vert.png` | 1116×1116 | 758×360 | Stacked monogram + full name horizontal lockup (dark ink) |
| `public/images/logos/abcd_logo_vert_wht.png` | 1116×1116 | 758×360 | Stacked monogram + full name horizontal lockup (white ink) |
| `public/images/logos/abcd_main_icon.png` | 1116×1116 | 680×1058 | Modular 2×2 ABCD quadrant monogram (dark ink) |
| `public/images/logos/abcd_main_icon_wht.png` | 1116×1116 | 680×1058 | Modular 2×2 ABCD quadrant monogram (white ink) |
| `public/images/logos/abcd_vert2.png` | 1116×1116 | 704×857 | Stacked vertical lockup (monogram above wordmark, dark ink) |
| `public/images/logos/abcd_vert2_wht.png` | 1116×1116 | 704×857 | Stacked vertical lockup (monogram above wordmark, white ink) |
| `public/images/logos/abcd_fav.png` | 1116×1116 | — | Square black icon with white curved "A" mark (also copied to `src/app/icon.png` & `apple-icon.png`) |
| `public/images/logos/abcd_fav_wht.png` | 1116×1116 | 546×600 | Transparent white curved "A" mark |

The theme-to-file mapping lives in `siteConfig.logo` (`src/lib/site-config.ts`).

## Work marks & Toolkit (`public/images/works/`, `public/images/toolkit/`)

| File | Format / Size | Notes |
| --- | --- | --- |
| `public/images/works/aiwokomain-logo.svg` | SVG (`1080×1080`) | Primary Aioko Japanese Cuisine lockup |
| `public/images/works/aiwokosec-logo.svg` | SVG (`1080×1080`) | Secondary Aioko Japanese Cuisine lockup |
| `public/images/works/oortho-icon.svg` | SVG (`1080×1080`) | OpusOrtho radial sun emblem |
| `public/images/toolkit/figma.svg` / `figma.png` | SVG / 800×1200 | Figma symbol |
| `public/images/toolkit/axure-light.svg` / `axure-dark.svg` | SVG (`322×77`) | Axure RP wordmark (light & dark theme variants) |
| `public/images/toolkit/miro.svg` / `miro-dark.svg` / `miro.png` | SVG / 800×294 | Miro wordmark (light & dark theme variants) |
| `public/images/toolkit/notion-light.svg` / `notion-dark.svg` | SVG (`180×63`) | Notion wordmark (light & dark theme variants) |
| `public/images/toolkit/claude-light.svg` / `claude.svg` | SVG (`184×40`) | Claude wordmark (light & dark theme variants) |

## Projects: Aioko Japanese Cuisine (`/projects/aioko`)

| # | File | Size / ViewBox | Fit |
| --- | --- | --- | --- |
| 1 | `public/images/projects/aioko/aiwokomain-logo.svg` | SVG (`1080×1080`) | contain |
| 2 | `public/images/projects/aioko/aiwokosec-logo.svg` | SVG (`1080×1080`) | contain |
| 3 | `public/images/projects/aioko/aioko-main-framed.svg` | SVG (`944×680`) | contain |
| 4 | `public/images/projects/aioko/aioko-sec-framed.svg` | SVG (`882×600`) | contain |

## Projects: Amplify Conference (`/projects/amplify`)

| # | File | Size | Fit |
| --- | --- | --- | --- |
| 1 | `public/images/projects/amplify/amplify-collage.webp` | 1920×1256 | contain |
| 2 | `public/images/projects/amplify/amplify-badges.png` | 1536×1024 | contain |
| 3 | `public/images/projects/amplify/amplify-01.jpg` | 2228×1344 | contain |
| 4 | `public/images/projects/amplify/amplify-04.jpg` | 1822×1492 | contain |
| 5 | `public/images/projects/amplify/amplify-06.jpg` | 2210×1452 | contain |
| 6 | `public/images/projects/amplify/amplify-07.jpg` | 2235×3353 | contain |
| 7 | `public/images/projects/amplify/amplify-08.jpg` | 3432×2288 | contain |
| 8 | `public/images/projects/amplify/amplify-09.jpg` | 2287×3430 | contain |
| 9 | `public/images/projects/amplify/amplify-10.jpg` | 3443×2279 | contain |
| 10 | `public/images/projects/amplify/amplify-15.jpg` | 3493×2287 | contain |

## Projects: Opus Ortho (`/projects/opus-ortho`)

| # | File | Size | Fit |
| --- | --- | --- | --- |
| 1 | `public/images/projects/opus-ortho/opus-website-board.png` | 1672×941 | contain |
| 2 | `public/images/projects/opus-ortho/opus-brand-guidelines.png` | 1672×941 | contain |
| 3 | `public/images/projects/opus-ortho/opus-card-mockup.png` | 1672×941 | contain |
| 4 | `public/images/projects/opus-ortho/opus-three-panel-board.png` | 1672×941 | contain |
| 5 | `public/images/projects/opus-ortho/opus-icon-grid.png` | 1254×1254 | contain |
| 6 | `public/images/projects/opus-ortho/opus-story-cards.png` | 1254×1254 | contain |
| 7 | `public/images/projects/opus-ortho/opus-business-card-lavender.png` | 1671×941 | contain |
| 8 | `public/images/projects/opus-ortho/opus-portrait.png` | 1672×941 | contain |

## Testimonials (`public/images/testimonials/`)

| File | Size | Person |
| --- | --- | --- |
| `public/images/testimonials/frank-marricochi.jpg` | 389×389 | Frank Marricochi |
| `public/images/testimonials/melanie-britton.jpg` | 400×400 | Melanie Britton |
| `public/images/testimonials/robin-boyd.png` | 640×640 | Robin Boyd |

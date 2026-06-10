# Piou Fleur — TODO

## Phase 1: Code Implementation (Complete)

### Project Setup
- [x] `package.json` dependencies
- [x] `tsconfig.json`, `postcss.config.js`, `tailwind.config.ts` configuration
- [x] `scripts/copy-fonts.mjs` — Pretendard font copy script
- [x] `src/app/globals.css` — Tailwind + @font-face + CSS utility classes
- [x] `src/lib/utils.ts` — cn() helper
- [x] `src/lib/fonts.ts` — Cormorant Garamond + Inter (next/font/google)
- [x] `src/lib/seo.ts` — buildMetadata helper
- [x] `src/types/sanity.ts` — type definitions (PortfolioItem, Service, JournalPost)

### i18n
- [x] `src/i18n/routing.ts` — defineRouting (ko/en)
- [x] `src/i18n/request.ts` — getRequestConfig
- [x] `src/i18n/messages/ko.json`
- [x] `src/i18n/messages/en.json`
- [x] `middleware.ts` — i18n routing (excluding /studio)

### Sanity CMS
- [x] `sanity.config.ts`
- [x] `sanity.cli.ts`
- [x] `src/sanity/client.ts` — createClient + sanityFetch
- [x] `src/sanity/image.ts` — urlFor builder
- [x] `src/sanity/queries.ts` — all GROQ queries
- [x] `src/sanity/schemas/portfolio.ts`
- [x] `src/sanity/schemas/service.ts`
- [x] `src/sanity/schemas/journal.ts`
- [x] `src/sanity/schemas/blockContent.ts`

### Layout & Common
- [x] `next.config.mjs` — next-intl plugin + Sanity CDN
- [x] `src/app/layout.tsx` — root layout
- [x] `src/app/[locale]/layout.tsx` — locale layout (fonts, NextIntlProvider, JSON-LD)
- [x] `src/app/studio/[[...tool]]/page.tsx` + `StudioPageClient.tsx`
- [x] `src/app/api/revalidate/route.ts` — ISR webhook

### UI Components
- [x] `src/components/ui/SanityImage.tsx`
- [x] `src/components/ui/FadeIn.tsx` — FadeIn, StaggerContainer, StaggerItem
- [x] `src/components/ui/Button.tsx`
- [x] `src/components/ui/Heading.tsx`

### Layout Components
- [x] `src/components/layout/Header.tsx` — scroll detection + transparent header
- [x] `src/components/layout/Footer.tsx`
- [x] `src/components/layout/Navigation.tsx`
- [x] `src/components/layout/MobileMenu.tsx` — Framer Motion animation
- [x] `src/components/layout/LocaleSwitcher.tsx`

### Pages & Section Components
- [x] Home page + HeroSection, FeaturedPortfolio, ServicesOverview, ContactCTA
- [x] Portfolio index + category filter + detail page
- [x] Services page
- [x] Contact page + ContactChannels, InquiryForm (KakaoTalk)
- [x] About page
- [x] Journal index + detail page + PortableTextRenderer

### SEO
- [x] `src/app/robots.ts`
- [x] `src/app/[locale]/sitemap.ts` — dynamic sitemap
- [x] `generateMetadata()` on each page
- [x] JSON-LD LocalBusiness schema

### Docs
- [x] `PLAN.md` — full implementation plan
- [x] `TODO.md` — this file

---

## Phase 2: Sanity Project Setup

- [ ] Create new project at sanity.io/manage (`piou-fleur` / dataset: `production`)
- [ ] Copy Project ID
- [ ] Create `.env.local` file (see `.env.local.example`)
  ```
  NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
  NEXT_PUBLIC_SANITY_DATASET=production
  SANITY_API_TOKEN=write_token
  SANITY_REVALIDATE_SECRET=random_string
  NEXT_PUBLIC_SITE_URL=https://pioufleur.com
  ```

---

## Phase 3: Local Development Setup

- [ ] `npm install` — install dependencies
- [ ] `npm run dev` — start dev server (localhost:3000)
- [ ] Verify `/ko` home page
- [ ] Verify `/en` English page
- [ ] Verify `/studio` Sanity Studio access
- [ ] Test KO ↔ EN locale switcher
- [ ] Test mobile menu

---

## Phase 4: Content Entry (Sanity Studio)

- [ ] Enter 5+ Portfolio items (with coverImage, at least 4 with featured: true)
- [ ] Enter 6 Services (wedding / event / styling / class / propose / subscription)
- [ ] Enter 1–2 Journal posts

---

## Phase 5: Deployment (Vercel)

- [ ] Create Vercel project + connect GitHub repo
- [ ] Set environment variables on Vercel (same as Phase 2)
- [ ] Connect domain (pioufleur.com)
- [ ] Add deployed domain to CORS in sanity.io/manage
- [ ] Set up Sanity webhook (`/api/revalidate?secret=...`)

---

## Phase 6: QA Checklist

- [ ] All `/ko/*`, `/en/*` routes return 200
- [ ] `/studio` not caught by i18n routing
- [ ] Sanity CDN images load correctly via `next/image`
- [ ] Contact form → KakaoTalk channel opens
- [ ] `npm run typecheck` — 0 TypeScript errors
- [ ] `npm run build` — build succeeds
- [ ] Lighthouse mobile score > 85
- [ ] schema.org JSON-LD validation (validator.schema.org)

---

## Phase 7: Additional Features (Optional)

- [ ] **Landing page full-bleed photo emphasis** — improve hero/main sections so photos take center stage, like reference sites (haeseok.com, dojuje.co.kr). Shift from text-heavy layout → full-screen image or large split-layout
- [ ] Portfolio gallery lightbox
- [x] KakaoTalk floating button — fixed bottom-right corner, always visible (primary contact method for Korean users)
- [ ] **Services page anchor nav** — add sticky horizontal pill nav at top (꽃다발 | 생화 | 프로포즈 | …) that scrolls to `id={key}` anchors; currently anchors exist but are unreachable without manual scrolling
- [ ] **Portfolio scroll animations** — stagger card entrance on scroll (Framer Motion already available); currently all cards render at once with no reveal
- [ ] Sanity Visual Editing / Draft Mode
- [ ] Instagram feed integration
- [ ] Vercel OG dynamic image
- [ ] `@sanity/document-internationalization` plugin

---

## Phase 8: Security Upgrade (separate branch `feat/upgrade-next15`)

> Resolves high-severity vulnerabilities found by `npm audit`. Cannot use `npm audit fix --force` (would incorrectly downgrade Sanity to v2).

- [ ] Next.js 14 → 15 migration
- [ ] next-intl v3 → v4 migration (v4 requires Next 15+)
- [ ] Validate changes (`npm run typecheck`, `npm run build`)
- [ ] Keep Sanity at v3 (excluded from audit fix)

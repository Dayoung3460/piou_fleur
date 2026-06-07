# Piou Fleur — 전체 구현 플랜

## Context

Piou Fleur는 럭셔리 플로럴 스튜디오의 브랜드 웹사이트다. 쇼핑몰이 아닌 "맡기고 싶다"는 신뢰감을 주는 포트폴리오/브랜드 사이트가 목표. 현재 레포는 완전히 비어있음 (.gitignore + README.md만 존재). Next.js 14 App Router + TypeScript + Tailwind CSS v3 + Sanity CMS v3 + next-intl(KO/EN)로 구축한다.

---

## 기술 스택 버전 (호환성 고정)

| 패키지 | 버전 | 이유 |
|---|---|---|
| `next` | `14.2.35` | LTS, App Router 안정, next-sanity v9 호환 |
| `react` / `react-dom` | `^18.3.1` | next-sanity v9 필수 |
| `tailwindcss` | `^3.4.x` | v3 (v4 아님) |
| `next-intl` | `^3.26.3` | v3 = Next 14 지원 (v4는 Next 15+) |
| `sanity` | `^3.99.0` | next-sanity v9 필수 |
| `next-sanity` | `^9.12.3` | Next 14 + Sanity v3 어댑터 |
| `@sanity/image-url` | `^2.1.1` | 이미지 URL 빌더 |
| `framer-motion` | `^12.x` | 섬세한 애니메이션 |
| `pretendard` | `^1.3.9` | 한국어 폰트 (npm → public/fonts 복사) |

---

## 프로젝트 초기화 명령

```bash
npx create-next-app@14.2.35 . \
  --typescript --tailwind --eslint --app --src-dir \
  --import-alias "@/*" --no-turbopack
```

이후 추가 패키지:
```bash
npm install next-intl sanity next-sanity @sanity/image-url @sanity/vision \
  framer-motion pretendard clsx tailwind-merge react-hook-form zod \
  @tailwindcss/typography @vercel/analytics
```

---

## 폴더 구조

```
piou_fleur/
├── next.config.ts              # next-intl 플러그인 + Sanity CDN 이미지 도메인
├── middleware.ts               # next-intl 라우팅 (src/ 밖에 위치)
├── tailwind.config.ts
├── sanity.config.ts
├── sanity.cli.ts
├── .env.local.example
├── scripts/
│   └── copy-fonts.mjs          # pretendard woff2 → public/fonts/ 복사
│
└── src/
    ├── app/
    │   ├── globals.css          # Tailwind directives + @font-face Pretendard
    │   ├── layout.tsx           # 루트 레이아웃 (최소화)
    │   ├── [locale]/            # 모든 공개 페이지
    │   │   ├── layout.tsx       # html lang, 폰트 변수, NextIntlClientProvider, JSON-LD
    │   │   ├── page.tsx         # Home
    │   │   ├── about/page.tsx
    │   │   ├── portfolio/
    │   │   │   ├── page.tsx
    │   │   │   ├── [category]/page.tsx
    │   │   │   └── [category]/[slug]/page.tsx
    │   │   ├── services/page.tsx
    │   │   ├── journal/
    │   │   │   ├── page.tsx
    │   │   │   └── [slug]/page.tsx
    │   │   └── contact/page.tsx
    │   ├── studio/[[...tool]]/page.tsx   # Sanity Studio (locale 밖)
    │   └── api/revalidate/route.ts       # ISR 웹훅
    │
    ├── components/
    │   ├── layout/    # Header, Footer, Navigation, MobileMenu, LocaleSwitcher
    │   ├── home/      # HeroSection, FeaturedPortfolio, ServicesOverview, InstagramCTA
    │   ├── portfolio/ # PortfolioGrid, PortfolioCard, CategoryFilter, PortfolioDetail
    │   ├── services/  # ServiceCard, InquiryButton
    │   ├── journal/   # JournalGrid, JournalCard, PortableTextRenderer
    │   ├── contact/   # ContactChannels, InquiryForm, InquiryTypeSelector
    │   └── ui/        # SanityImage, FadeIn, Button, Heading, PageTransition
    │
    ├── sanity/
    │   ├── client.ts       # createClient + sanityFetch
    │   ├── image.ts        # imageUrlBuilder
    │   ├── queries.ts      # 모든 GROQ 쿼리
    │   └── schemas/
    │       ├── index.ts
    │       ├── portfolio.ts
    │       ├── service.ts
    │       └── journal.ts
    │
    ├── i18n/
    │   ├── routing.ts      # defineRouting({ locales: ['ko','en'], defaultLocale: 'ko' })
    │   ├── request.ts      # getRequestConfig
    │   └── messages/
    │       ├── ko.json
    │       └── en.json
    │
    ├── lib/
    │   ├── fonts.ts        # Cormorant Garamond + Inter via next/font/google
    │   ├── utils.ts        # cn() = clsx + twMerge
    │   └── seo.ts
    │
    └── types/
        └── sanity.ts       # PortfolioItem, Service, JournalPost 타입
```

---

## 디자인 시스템 (Tailwind 토큰)

```typescript
// tailwind.config.ts 핵심 extend
colors: {
  background: '#F7F4EF',
  text: { DEFAULT: '#222222', muted: '#6B6B6B' },
  accent: { DEFAULT: '#8A7A66', light: '#D8CFC2' },
  border: '#D8CFC2',
},
fontFamily: {
  pretendard: ['Pretendard', ...fontFamily.sans],
  cormorant: ['var(--font-cormorant)', ...fontFamily.serif],
  inter: ['var(--font-inter)', ...fontFamily.sans],
  sans: ['Pretendard', 'var(--font-inter)', ...fontFamily.sans],  // KO default
},
spacing: {
  section: '5rem',       // 80px
  'section-lg': '7.5rem', // 120px
},
```

**폰트 로딩 전략:**
- **Pretendard**: `scripts/copy-fonts.mjs`로 `node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2` → `public/fonts/`에 복사. `globals.css`에서 `@font-face`로 로드. `package.json`에 `"prebuild": "node scripts/copy-fonts.mjs"` 추가.
- **Cormorant Garamond + Inter**: `src/lib/fonts.ts`에서 `next/font/google`로 CSS 변수로 선언 (`--font-cormorant`, `--font-inter`). `[locale]/layout.tsx`의 `<html>` className에 적용.

---

## i18n 라우팅 (next-intl v3)

```typescript
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  localePrefix: 'always',  // /ko/*, /en/* 명시적 prefix
})
```

```typescript
// middleware.ts (프로젝트 루트 — src/ 밖)
export const config = {
  matcher: ['/((?!studio|api|_next/static|_next/image|favicon.ico|fonts|images).*)'],
}
// studio 경로를 i18n 미들웨어에서 반드시 제외
```

---

## Sanity CMS 스키마

### Portfolio 스키마 핵심 필드
```typescript
fields: [
  title: { type: 'object', fields: [{ name: 'ko', type: 'string' }, { name: 'en', type: 'string' }] },
  slug: { type: 'slug', options: { source: 'title.en' } },
  category: { type: 'string', options: { list: ['wedding','event','styling','editorial','classes'] } },
  client, location, year,
  description: { type: 'object', fields: [{ name: 'ko', type: 'text' }, { name: 'en', type: 'text' }] },
  coverImage: { type: 'image', options: { hotspot: true } },
  gallery: { type: 'array', of: [{ type: 'image' }] },
  featured: { type: 'boolean', initialValue: false },
  publishedAt: { type: 'datetime' },
]
```

Service, Journal도 동일한 i18n 패턴 (`title.ko` / `title.en`) 사용.

### GROQ 쿼리 패턴 (`src/sanity/queries.ts`)
- `portfolioListQuery`: 전체 목록 (featured 포함)
- `featuredPortfolioQuery`: `featured == true` 최대 4개 (홈 페이지용)
- `portfolioBySlugQuery`: 슬러그로 단건 조회
- `portfolioByCategoryQuery`: 카테고리 필터
- `servicesQuery`: order asc 정렬
- `journalListQuery` / `journalBySlugQuery`

### 데이터 흐름
```
Sanity CMS → sanityFetch() (Server Component) → Page → UI Components
                                                      → Client Components (CategoryFilter, InquiryForm)
```

`sanityFetch`의 `tags: ['portfolio']`와 `/api/revalidate` 웹훅으로 ISR 온디맨드 재검증.

---

## 핵심 컴포넌트

**`src/components/ui/SanityImage.tsx`**: `next/image` + `@sanity/image-url` 래퍼. `.auto('format').url()` 포함.

**`src/components/ui/FadeIn.tsx`** (Client Component):
```typescript
// framer-motion whileInView, viewport: { once: true, margin: '-80px' }
// duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94]
// 스크롤 진입시 opacity 0→1, y 20→0
```

**`src/components/layout/LocaleSwitcher.tsx`** (Client Component):
```typescript
// next-intl의 usePathname + useRouter + useLocale 사용
// router.replace(pathname, { locale: 'en' | 'ko' }) 패턴
```

**Contact 페이지 전략**: 백엔드 없음. `react-hook-form` + `zod`로 문의 내용 수집 후 `mailto:` URL로 이메일 클라이언트 열기. KakaoTalk 오픈채팅 링크, Instagram DM (`ig.me/m/pioufleur`), `tel:`, `mailto:` 직접 연결.

**애니메이션 원칙**: Framer Motion은 `FadeIn` 래퍼로만 사용. 병렬 진입 시 0.1s stagger. 호버 효과는 CSS `transition-all duration-300`. 패럴랙스/스크롤재킹/스프링 없음 (모바일 성능 우선).

---

## SEO 전략

- `[locale]/layout.tsx`에 기본 Metadata (metadataBase, title template, OG)
- 각 페이지에 `generateMetadata()` 함수 (Sanity 데이터 기반 동적 메타)
- `[locale]/layout.tsx`에 JSON-LD LocalBusiness 스키마
- `generateStaticParams()` for portfolio/journal slugs → SSG
- `src/app/robots.ts` + `src/app/[locale]/sitemap.ts` (동적, Sanity에서 슬러그 Pull)
- `/studio` 경로 sitemap 제외

---

## 환경변수 (.env.local)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=...
SANITY_REVALIDATE_SECRET=...
NEXT_PUBLIC_SITE_URL=https://pioufleur.com
```

---

## 구현 순서 (파일 생성 순서)

1. `package.json` + `npm install`
2. `tsconfig.json`, `postcss.config.js`, `tailwind.config.ts`
3. `scripts/copy-fonts.mjs`
4. `src/app/globals.css`
5. `src/lib/utils.ts`, `src/lib/fonts.ts`
6. `src/types/sanity.ts`
7. `src/i18n/routing.ts` → `request.ts` → `messages/ko.json` + `en.json`
8. `middleware.ts`
9. Sanity 스키마들 → `sanity.config.ts`, `sanity.cli.ts`
10. `src/sanity/client.ts` → `image.ts` → `queries.ts`
11. `next.config.ts`
12. 레이아웃: `src/app/layout.tsx` → `src/app/[locale]/layout.tsx`
13. `src/app/studio/[[...tool]]/page.tsx`
14. `src/app/api/revalidate/route.ts`
15. UI 프리미티브 컴포넌트 (`ui/`)
16. 레이아웃 컴포넌트 (Header, Footer, Nav, LocaleSwitcher)
17. Home 페이지 + 섹션 컴포넌트
18. Portfolio 페이지 + 컴포넌트
19. Services 페이지
20. Contact 페이지
21. About 페이지
22. Journal 페이지
23. SEO 마무리 (robots.ts, sitemap.ts)

---

## MVP (Phase 1) 범위

- [ ] 프로젝트 셋업 + 디자인 시스템
- [ ] Sanity 프로젝트 생성 + 스키마 3개
- [ ] Header/Footer/Nav (데스크탑 + 모바일)
- [ ] Home (Hero + Featured Portfolio + Services 티저 + CTA)
- [ ] Portfolio 인덱스 (카테고리 필터) + 상세 페이지
- [ ] Services 페이지
- [ ] Contact 페이지 (채널 링크 + 문의 폼)
- [ ] About 페이지 (정적 콘텐츠)
- [ ] i18n KO/EN 스위처
- [ ] 기본 SEO + JSON-LD

## Phase 2 범위 (MVP 이후)

- Journal 전체 구현 (Portable Text 렌더링)
- Sanity Visual Editing / Draft Mode
- Instagram 피드 연동
- Vercel OG dynamic images
- 포트폴리오 갤러리 라이트박스
- KakaoTalk 플로팅 버튼
- `@sanity/document-internationalization` 플러그인

---

## 검증 방법

```bash
npm run typecheck   # TypeScript 에러 0
npm run lint        # ESLint 에러 0
npm run build       # 빌드 성공
npm start           # 프로덕션 빌드 로컬 확인
```

배포 전 체크리스트:
- `/ko/*`, `/en/*` 모든 라우트 200 반환
- `/studio`가 locale 라우팅에 걸리지 않음
- 로케일 스위처가 현재 경로 유지
- Sanity CDN 이미지 `next/image`에서 정상 로드
- Lighthouse 모바일 점수 > 85
- schema.org JSON-LD 검증 (validator.schema.org)
- Sanity CORS에 배포 도메인 추가 (sanity.io/manage)
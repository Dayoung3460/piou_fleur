# Piou Fleur — TODO

## Phase 1: 코드 구현 (완료)

### 프로젝트 셋업
- [x] `package.json` 의존성 정의
- [x] `tsconfig.json`, `postcss.config.js`, `tailwind.config.ts` 설정
- [x] `scripts/copy-fonts.mjs` — Pretendard 폰트 복사 스크립트
- [x] `src/app/globals.css` — Tailwind + @font-face + CSS 유틸리티 클래스
- [x] `src/lib/utils.ts` — cn() 헬퍼
- [x] `src/lib/fonts.ts` — Cormorant Garamond + Inter (next/font/google)
- [x] `src/lib/seo.ts` — buildMetadata 헬퍼
- [x] `src/types/sanity.ts` — 타입 정의 (PortfolioItem, Service, JournalPost)

### i18n
- [x] `src/i18n/routing.ts` — defineRouting (ko/en)
- [x] `src/i18n/request.ts` — getRequestConfig
- [x] `src/i18n/messages/ko.json`
- [x] `src/i18n/messages/en.json`
- [x] `middleware.ts` — i18n 라우팅 (/studio 제외)

### Sanity CMS
- [x] `sanity.config.ts`
- [x] `sanity.cli.ts`
- [x] `src/sanity/client.ts` — createClient + sanityFetch
- [x] `src/sanity/image.ts` — urlFor 빌더
- [x] `src/sanity/queries.ts` — 모든 GROQ 쿼리
- [x] `src/sanity/schemas/portfolio.ts`
- [x] `src/sanity/schemas/service.ts`
- [x] `src/sanity/schemas/journal.ts`
- [x] `src/sanity/schemas/blockContent.ts`

### 레이아웃 & 공통
- [x] `next.config.mjs` — next-intl 플러그인 + Sanity CDN
- [x] `src/app/layout.tsx` — 루트 레이아웃
- [x] `src/app/[locale]/layout.tsx` — 로케일 레이아웃 (폰트, NextIntlProvider, JSON-LD)
- [x] `src/app/studio/[[...tool]]/page.tsx` + `StudioPageClient.tsx`
- [x] `src/app/api/revalidate/route.ts` — ISR 웹훅

### UI 컴포넌트
- [x] `src/components/ui/SanityImage.tsx`
- [x] `src/components/ui/FadeIn.tsx` — FadeIn, StaggerContainer, StaggerItem
- [x] `src/components/ui/Button.tsx`
- [x] `src/components/ui/Heading.tsx`

### 레이아웃 컴포넌트
- [x] `src/components/layout/Header.tsx` — 스크롤 감지 + 투명 헤더
- [x] `src/components/layout/Footer.tsx`
- [x] `src/components/layout/Navigation.tsx`
- [x] `src/components/layout/MobileMenu.tsx` — Framer Motion 애니메이션
- [x] `src/components/layout/LocaleSwitcher.tsx`

### 페이지 & 섹션 컴포넌트
- [x] Home 페이지 + HeroSection, FeaturedPortfolio, ServicesOverview, ContactCTA
- [x] Portfolio 인덱스 + 카테고리 필터 + 상세 페이지
- [x] Services 페이지
- [x] Contact 페이지 + ContactChannels, InquiryForm (mailto 방식)
- [x] About 페이지
- [x] Journal 인덱스 + 상세 페이지 + PortableTextRenderer

### SEO
- [x] `src/app/robots.ts`
- [x] `src/app/[locale]/sitemap.ts` — 동적 사이트맵
- [x] 각 페이지 `generateMetadata()` 함수
- [x] JSON-LD LocalBusiness 스키마

### 문서
- [x] `PLAN.md` — 전체 구현 플랜
- [x] `TODO.md` — 이 파일

---

## Phase 2: Sanity 프로젝트 설정

- [ ] sanity.io/manage 에서 새 프로젝트 생성 (`piou-fleur` / dataset: `production`)
- [ ] Project ID 복사
- [ ] `.env.local` 파일 생성 (`.env.local.example` 참고)
  ```
  NEXT_PUBLIC_SANITY_PROJECT_ID=발급받은_ID
  NEXT_PUBLIC_SANITY_DATASET=production
  SANITY_API_TOKEN=write_token
  SANITY_REVALIDATE_SECRET=랜덤_문자열
  NEXT_PUBLIC_SITE_URL=https://pioufleur.com
  ```

---

## Phase 3: 로컬 개발 환경 실행

- [ ] `git pull origin claude/peaceful-noether-3sc1M` — 코드 로컬에 받기
- [ ] `npm install` — 의존성 설치
- [ ] `npm run dev` — 개발 서버 실행 (localhost:3000)
- [ ] `/ko` 홈 페이지 확인
- [ ] `/en` 영문 페이지 확인
- [ ] `/studio` Sanity Studio 접속 확인
- [ ] KO ↔ EN 스위처 동작 확인
- [ ] 모바일 메뉴 동작 확인

---

## Phase 4: 콘텐츠 입력 (Sanity Studio)

- [ ] Portfolio 아이템 5개 이상 입력 (coverImage 포함, featured: true 최소 4개)
- [ ] Service 4개 입력 (wedding / event / styling / class)
- [ ] Journal 포스트 1~2개 입력

---

## Phase 5: 배포 (Vercel)

- [ ] Vercel 프로젝트 생성 + GitHub 레포 연결
- [ ] Vercel에 환경변수 설정 (Phase 2와 동일)
- [ ] 도메인 연결 (pioufleur.com)
- [ ] sanity.io/manage → CORS에 배포 도메인 추가
- [ ] Sanity 웹훅 설정 (`/api/revalidate?secret=...`)

---

## Phase 6: QA 체크리스트

- [ ] `/ko/*`, `/en/*` 모든 라우트 200 반환
- [ ] `/studio`가 i18n 라우팅에 걸리지 않음
- [ ] Sanity CDN 이미지 `next/image`에서 정상 로드
- [ ] Contact 폼 → 이메일 클라이언트 열림 확인
- [ ] `npm run typecheck` — TypeScript 에러 0
- [ ] `npm run build` — 빌드 성공
- [ ] Lighthouse 모바일 점수 > 85
- [ ] schema.org JSON-LD 검증 (validator.schema.org)

---

## Phase 7: 추가 기능 (선택)

- [ ] 포트폴리오 갤러리 라이트박스
- [ ] KakaoTalk 플로팅 버튼
- [ ] Sanity Visual Editing / Draft Mode
- [ ] Instagram 피드 연동
- [ ] Vercel OG 동적 이미지
- [ ] `@sanity/document-internationalization` 플러그인

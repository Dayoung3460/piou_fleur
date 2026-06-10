# Piou Fleur — Claude Code 가이드

## 프로젝트 개요
럭셔리 플로럴 스튜디오 브랜드 웹사이트. 쇼핑몰 아님, 포트폴리오/브랜드 신뢰감 사이트.
Next.js 14 App Router + TypeScript + Tailwind CSS v3 + Sanity CMS v3 + next-intl v3 (KO/EN)

## 기술 스택 (버전 고정 — 변경 금지)

| 패키지 | 버전 |
|---|---|
| `next` | `14.2.35` |
| `react` / `react-dom` | `^18.3.1` |
| `tailwindcss` | `^3.4.x` |
| `next-intl` | `^3.26.3` |
| `sanity` | `^3.99.0` |
| `next-sanity` | `^9.12.3` |
| `framer-motion` | `^11.x` |

## 규칙

- **버전 업그레이드 금지**: 위 버전 그대로 유지. 특히 Next 14, next-intl v3, Tailwind v3.
- **Git 작업 금지**: `git add`, `git commit`, `git push`는 사용자 권한. commit custom command 실행했을 때에는 Git 작업 가능.
- **Todo 진행 방식**: 아이템 하나씩, 완료 후 사용자 승인 받고 다음 아이템.
- **주석 최소화**: WHY가 명확한 경우에만 한 줄 주석.

## 브랜치 전략

```
main          → Vercel 프로덕션 배포 브랜치 (보호됨)
dev           → 개발 통합 브랜치 (PR → main)
feat/<name>   → 기능 개발 (예: feat/lightbox, feat/kakao-button)
fix/<name>    → 버그 수정 (예: fix/locale-switcher)
```

- 모든 작업은 `dev` 또는 `feat/*` 브랜치에서 진행
- 완성된 기능은 PR로 `dev` → `main` 머지
- `claude/` 폴더 브랜치 사용 금지

## 로컬 실행

```bash
npm install
npm run dev   # localhost:3000
```

- `/ko` — 한국어 홈
- `/en` — 영어 홈
- `/studio` — Sanity Studio

## 환경변수 (.env.local 필요)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
SANITY_REVALIDATE_SECRET=
NEXT_PUBLIC_SITE_URL=https://pioufleur.com
```

## 현재 진행 상태

- **Phase 1** ✅ 코드 구현 완료
- **Phase 2** 🔄 Sanity 프로젝트 설정 (사용자가 sanity.io/manage에서 직접 진행)
- **Phase 3~7** ⏳ 대기 중

## 주요 파일 위치

- i18n 라우팅: `src/i18n/routing.ts`
- i18n 메시지: `src/i18n/messages/ko.json`, `en.json`
- Sanity 스키마: `src/sanity/schemas/`
- GROQ 쿼리: `src/sanity/queries.ts`
- 레이아웃: `src/components/layout/`
- 페이지: `src/app/[locale]/`
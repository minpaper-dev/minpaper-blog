# Minpaper Blog

> 꾸준히, 의미있는 학습을 기록하기 위한 공간입니다.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=vercel)](https://minpaper-blog.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 🌟 주요 기능

### 📝 블로그 포스트 관리
- **마크다운 기반 작성**: MD 파일로 간편한 포스트 작성
- **자동 메타데이터 추출**: 제목, 날짜, 태그, 요약 자동 파싱
- **읽기 시간 계산**: 자동으로 예상 읽기 시간 제공

### 🎨 사용자 경험
- **다크/라이트 모드**: 사용자 선호도에 따른 테마 전환
- **반응형 디자인**: 모바일부터 데스크톱까지 완벽 지원
- **고정 헤더**: 스크롤 시에도 항상 접근 가능한 네비게이션

### 🔍 검색 및 필터링
- **실시간 검색**: 타이핑하는 즉시 결과 표시
- **태그 기반 필터링**: 카테고리별 포스트 탐색
- **키보드 네비게이션**: ↑↓ 키로 검색 결과 탐색

### 📚 향상된 읽기 경험
- **목차 자동 생성**: 포스트의 헤딩을 기반으로 한 목차
- **스크롤 기반 하이라이트**: 현재 읽고 있는 섹션 강조
- **부드러운 스크롤**: 목차 클릭 시 해당 섹션으로 부드럽게 이동

## 🛠️ 기술 스택

### 프론트엔드
- **Next.js 16** - React 프레임워크 (App Router)
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Tailwind CSS 4** - 스타일링

### 마크다운 처리
- **@next/mdx** - MDX 지원
- **gray-matter** - Frontmatter 파싱
- **marked** - 마크다운 → HTML 변환
- **reading-time** - 읽기 시간 계산

### UI/UX 라이브러리
- **Lucide React** - 아이콘
- **Radix UI** - 접근성 컴포넌트
- **Class Variance Authority** - 스타일 변형 관리
- **@tailwindcss/typography** - 마크다운 스타일링

### 상태 관리
- **React Context API** - 테마 관리
- **localStorage** - 사용자 설정 저장

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/minpaper-dev/minpaper-blog.git
cd minpaper-blog
```

2. **의존성 설치**
```bash
npm install
```

3. **개발 서버 실행**
```bash
npm run dev
```

4. **브라우저에서 확인**
```
http://localhost:3000
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run start

# 린팅
npm run lint
```

## 📁 프로젝트 구조

```
minpaper-blog/
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   │   ├── posts/         # 포스트 관련 API
│   │   ├── tags/          # 태그 관련 API
│   │   └── search/        # 검색 API
│   ├── blog/[slug]/       # 동적 블로그 포스트 페이지
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # React 컴포넌트
│   ├── ui/               # 재사용 가능한 UI 컴포넌트
│   ├── Header.tsx        # 헤더 컴포넌트
│   ├── PostCard.tsx      # 포스트 카드
│   ├── SearchModal.tsx   # 검색 모달
│   ├── Sidebar.tsx       # 사이드바
│   ├── TableOfContents.tsx # 목차
│   └── ThemeProvider.tsx # 테마 관리
├── content/              # 마크다운 콘텐츠
│   └── posts/            # 블로그 포스트들
├── hooks/                # 커스텀 훅
│   └── usePosts.ts       # 포스트 데이터 훅
├── lib/                  # 유틸리티 함수
│   ├── markdown.ts       # 마크다운 처리
│   ├── posts.ts          # 포스트 관리 (클라이언트)
│   ├── posts-server.ts   # 포스트 관리 (서버)
│   └── utils.ts          # 공통 유틸리티
└── types/                # TypeScript 타입 정의
    └── post.ts           # 포스트 타입
```

## 📝 블로그 포스트 작성

### 새 포스트 추가

1. `content/posts/` 디렉토리에 새 `.md` 파일 생성
2. Frontmatter 작성:

```markdown
---
title: "포스트 제목"
date: "2024-01-01"
tags: ["태그1", "태그2"]
slug: "post-slug"
excerpt: "포스트 요약"
---

# 포스트 내용

마크다운으로 작성하세요...
```

### Frontmatter 필드 설명

- **title**: 포스트 제목 (필수)
- **date**: 작성 날짜, YYYY-MM-DD 형식 (필수)
- **tags**: 태그 배열 (필수)
- **slug**: URL에 사용될 고유 식별자 (필수)
- **excerpt**: 포스트 요약 (필수)

## 🔧 주요 기능 구현

### 테마 관리
```typescript
// ThemeProvider로 전역 테마 상태 관리
const { isDarkMode, toggleDarkMode } = useTheme();
```

### 검색 기능
```typescript
// 실시간 검색 API 호출
const response = await fetch(`/api/search?q=${query}`);
const results = await response.json();
```

### 목차 생성
```typescript
// 마크다운 헤딩에서 목차 자동 생성
const headings = content.match(/^(#{1,6})\s+(.+)$/gm);
```

## 🌐 배포

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com)에 GitHub 계정 연결
2. 저장소 선택 후 자동 배포 설정
3. 환경 변수 설정 (필요시)

### 기타 플랫폼

- **Netlify**: `npm run build` 후 `out` 폴더 배포
- **GitHub Pages**: GitHub Actions로 자동 배포 설정
- **Docker**: Dockerfile 생성 후 컨테이너 배포

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

- **GitHub**: [@minpaper-dev](https://github.com/minpaper-dev)
- **Blog**: [minpaper-blog.vercel.app](https://minpaper-blog.vercel.app/)

---

⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!
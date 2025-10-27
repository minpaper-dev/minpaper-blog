---
title: "Next.js 16으로 블로그 만들기 - MDX, 다크모드, 검색 기능까지"
date: "2025-10-27"
tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "MDX", "블로그"]
slug: "nextjs-blog-development-journey"
excerpt: "Next.js 16과 React 19를 사용해서 MDX 기반 블로그를 처음부터 만들어보며 겪은 오류들과 해결 과정을 기록합니다."
---

최근 Next.js 16과 React 19가 출시되면서 새로운 기능들과 변경사항들이 많이 생겼습니다. 이번에는 이 최신 기술 스택을 사용해서 개인 블로그를 처음부터 만들어보며 겪은 오류들과 해결 과정을 기록해보겠습니다.

## 🎯 프로젝트 목표

- **학습 기록용 블로그** 구축
- **MDX 파일**로 포스트 관리
- **다크모드/라이트모드** 전환
- **태그 기반 필터링**
- **실시간 검색 기능**
- **반응형 디자인**

## 🛠 기술 스택

- **Next.js 16** (App Router)
- **React 19** with TypeScript
- **Tailwind CSS 4**
- **MDX** (Markdown + JSX)
- **Lucide React** (아이콘)
- **Radix UI** (접근성)
- **Class Variance Authority** (스타일링)

## 📋 구현 과정

### 1단계: 프로젝트 초기 설정

```bash
npx create-next-app@latest minpaper_blog --typescript --tailwind --eslint --app
cd minpaper_blog
npm install @next/mdx gray-matter remark reading-time marked clsx tailwind-merge class-variance-authority lucide-react @radix-ui/react-slot
```

**설치한 주요 패키지들:**

- `@next/mdx`: MDX 파일 지원
- `gray-matter`: 마크다운 frontmatter 파싱
- `marked`: 마크다운을 HTML로 변환
- `reading-time`: 읽기 시간 계산
- `clsx`, `tailwind-merge`: 조건부 클래스 관리

### 2단계: MDX 설정

`next.config.ts`에 MDX 설정을 추가했습니다:

```typescript
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
```

### 3단계: 다크모드 구현

다크모드 구현에서 가장 중요한 부분은 **ThemeProvider**를 만드는 것이었습니다:

```typescript
// components/ThemeProvider.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
```

## 🚨 주요 오류들과 해결 과정

### 오류 1: `Module not found: Can't resolve 'fs'`

**문제:** 클라이언트 컴포넌트에서 `fs` 모듈을 사용하려고 할 때 발생

**원인:** `fs` 모듈은 서버 사이드에서만 사용 가능한데, 클라이언트 컴포넌트에서 직접 사용하려고 했음

#### 🤔 왜 `fs`는 서버에서만 사용해야 할까?

**보안상의 이유:**

- 브라우저에서 파일 시스템 접근을 허용하면 사용자의 모든 파일에 접근 가능
- 개인정보 유출, 시스템 파괴, 악성 코드 실행 등의 위험
- 웹사이트가 사용자 컴퓨터를 공격할 수 있음

**환경의 차이:**

```typescript
// 서버 환경 (Node.js) - ✅ 가능
const fs = require("fs");
const fileContent = fs.readFileSync("blog-post.md", "utf8");

// 브라우저 환경 - ❌ 불가능
const fs = require("fs"); // Error: fs is not defined
```

**해결 방법:**

1. **API 라우트 생성** - 서버 사이드에서 데이터 처리
2. **클라이언트에서 HTTP 요청** - `fetch`를 사용해서 API 호출

```typescript
// app/api/posts/route.ts (서버에서 실행)
import { NextResponse } from "next/server";
import { getAllPostsServer } from "@/lib/posts-server";

export async function GET() {
  try {
    const posts = getAllPostsServer(); // ✅ fs 사용 가능
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// components/PostList.tsx (브라우저에서 실행)
("use client");
import { useEffect, useState } from "react";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts") // ✅ HTTP 요청으로 데이터 가져오기
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return <div>{posts}</div>;
}
```

**데이터 흐름:**

```
1. 브라우저 → API 요청 → /api/posts
2. 서버 → fs로 파일 읽기 → content/posts/*.md
3. 서버 → JSON 응답 → 브라우저
4. 브라우저 → 데이터 렌더링 → UI
```

### 오류 2: `params` is a Promise and must be unwrapped

**문제:** Next.js 15에서 `params`가 Promise로 변경됨

**원인:** Next.js 15의 변경사항으로 인해 `params`를 직접 사용할 수 없게 됨

**해결 방법:**

```typescript
// Before (Next.js 14)
function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
}

// After (Next.js 15)
async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
}
```

### 오류 3: `useTheme must be used within a ThemeProvider`

**문제:** 포스트 상세 페이지에서 테마 전환이 작동하지 않음

**원인:** 서버 컴포넌트에서 클라이언트 상태에 접근하려고 했음

**해결 방법:**

1. 포스트 페이지를 클라이언트 컴포넌트로 변경
2. API를 통해 데이터 가져오기
3. `useTheme` 훅을 사용해서 조건부 스타일링

```typescript
// 조건부 스타일링 예시
<div className={`min-h-screen transition-colors duration-300 ${
  isDarkMode
    ? "bg-[#1e1e1e] text-white"
    : "bg-white text-black"
}`}>
```

### 오류 4: `generateStaticParams`와 `"use client"` 충돌

**문제:** 클라이언트 컴포넌트에서 `generateStaticParams`를 사용할 수 없음

#### 🤔 `generateStaticParams`란 무엇인가?

**정적 생성 (Static Generation):**

- 빌드 타임에 페이지를 미리 생성하는 Next.js 기능
- 동적 라우트에서 어떤 경로들을 미리 생성할지 정의
- 성능 최적화와 SEO에 유리

**동작 원리:**

```typescript
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  // 빌드 시점에 실행되어 모든 가능한 slug를 반환
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 이 함수가 반환하는 slug들로 페이지가 미리 생성됨
// /blog/nextjs-app-router
// /blog/kotlin-concurrent-collections
// /blog/redlock-algorithm
```

**장점:**

- **빠른 로딩**: 페이지가 미리 생성되어 즉시 로드
- **SEO 최적화**: 검색 엔진이 콘텐츠를 쉽게 크롤링
- **서버 부하 감소**: 빌드 시 한 번만 생성

**제약사항:**

- 서버 컴포넌트에서만 사용 가능
- 클라이언트 컴포넌트(`"use client"`)와 함께 사용 불가
- 빌드 시점에 데이터가 있어야 함

**해결 방법:**

1. **`generateStaticParams` 제거** - 동적 라우팅으로 전환
2. **API 기반 동적 라우팅 사용** - 런타임에 데이터 로딩
3. **클라이언트에서 데이터 로딩** - `useEffect`와 `fetch` 사용

```typescript
// Before (Static Generation)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// After (Dynamic Routing)
("use client");
export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function loadPost() {
      const { slug } = await params;
      const response = await fetch(`/api/posts/${slug}`);
      const postData = await response.json();
      setPost(postData);
    }
    loadPost();
  }, [params]);

  return <div>{post?.title}</div>;
}
```

**트레이드오프:**

- **성능**: 정적 생성이 더 빠름, 동적 라우팅은 런타임 로딩
- **유연성**: 동적 라우팅이 더 유연함 (실시간 데이터 변경 가능)
- **SEO**: 정적 생성이 SEO에 더 유리함

## 🔍 검색 기능 구현

검색 기능은 다음과 같이 구현했습니다:

### 1. 검색 API 엔드포인트

```typescript
// app/api/search/route.ts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.trim().length === 0) {
      return NextResponse.json([]);
    }

    const allPosts = getAllPostsServer();
    const searchQuery = query.toLowerCase().trim();

    // 제목, 내용, 태그에서 검색
    const filteredPosts = allPosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(searchQuery);
      const excerptMatch = post.excerpt.toLowerCase().includes(searchQuery);
      const tagMatch = post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery)
      );

      return titleMatch || excerptMatch || tagMatch;
    });

    // 제목 매치를 우선순위로 정렬
    const sortedPosts = filteredPosts.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(searchQuery);
      const bTitleMatch = b.title.toLowerCase().includes(searchQuery);

      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return NextResponse.json(sortedPosts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to search posts" },
      { status: 500 }
    );
  }
}
```

### 2. 검색 모달 컴포넌트

검색 모달은 다음과 같은 기능을 제공합니다:

- **실시간 검색**: 타이핑하는 즉시 결과 표시
- **키보드 네비게이션**: ↑↓ 키로 탐색, Enter로 선택
- **검색 결과 미리보기**: 제목, 요약, 날짜, 태그 표시
- **다크모드 지원**: 테마에 따라 스타일 자동 변경

## 📚 배운 점

1. **Next.js 16의 변경사항**: `params`가 Promise로 변경된 점을 주의해야 함
2. **서버/클라이언트 분리**: `fs` 모듈 등 서버 전용 모듈은 API 라우트에서 처리
3. **테마 관리**: Context API를 사용한 전역 상태 관리의 중요성
4. **사용자 경험**: 키보드 네비게이션과 실시간 검색의 중요성

## 🚀 다음 단계

- **SEO 최적화**: 메타 태그, 구조화된 데이터 추가
- **성능 최적화**: 이미지 최적화, 코드 스플리팅
- **추가 기능**: 댓글 시스템, 소셜 공유, RSS 피드
- **배포**: Vercel을 통한 자동 배포 설정

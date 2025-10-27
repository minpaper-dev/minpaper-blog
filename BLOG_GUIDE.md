# Minpaper Blog

학습 기록을 위한 개인 블로그입니다. MD 파일로 포스트를 관리하며, Next.js와 MDX를 사용하여 구축되었습니다.

## 새 포스트 작성하기

### 1. 포스트 파일 생성

`content/posts/` 디렉토리에 새로운 `.md` 파일을 생성합니다.

```bash
# 예시
touch content/posts/my-new-post.md
```

### 2. 포스트 메타데이터 작성

파일 상단에 YAML front matter를 작성합니다:

```markdown
---
title: "포스트 제목"
date: "2024-12-01"
excerpt: "포스트 요약 설명"
tags: ["태그1", "태그2", "태그3"]
---

# 포스트 내용

여기에 마크다운으로 포스트 내용을 작성합니다.
```

### 3. 필수 메타데이터

- **title**: 포스트 제목 (필수)
- **date**: 작성 날짜, YYYY-MM-DD 형식 (필수)
- **excerpt**: 포스트 요약 (필수)
- **tags**: 태그 배열 (선택사항)

### 4. 마크다운 작성

일반적인 마크다운 문법을 사용하여 포스트를 작성할 수 있습니다:

````markdown
# 제목 1

## 제목 2

### 제목 3

**굵은 글씨**
_기울임 글씨_

- 리스트 항목 1
- 리스트 항목 2

1. 번호 리스트 1
2. 번호 리스트 2

`코드`

```코드블록
function hello() {
  console.log("Hello World!");
}
```
````

[링크](https://example.com)

![이미지](image-url)

````

## 개발 서버 실행

```bash
npm run dev
````

## 빌드

```bash
npm run build
```

## 포스트 예시

현재 다음 포스트들이 포함되어 있습니다:

1. **Redlock 알고리즘 알아보기** - Redis 분산 락 알고리즘에 대한 포스트
2. **코틀린 동시성 환경에서 컬렉션 잘 다루기** - Kotlin 코루틴과 컬렉션 사용법
3. **Next.js 14 App Router 완전 정복** - Next.js App Router 사용법

## 기능

- ✅ 다크모드/라이트모드 전환
- ✅ 마크다운 기반 포스트 관리
- ✅ 태그 시스템
- ✅ 반응형 디자인
- ✅ 읽기 시간 계산
- ✅ SEO 최적화
- ✅ 정적 사이트 생성 (SSG)

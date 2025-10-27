import { marked } from "marked";

// marked 설정
marked.setOptions({
  breaks: true, // 줄바꿈을 <br>로 변환
  gfm: true, // GitHub Flavored Markdown 지원
});

// 마크다운을 HTML로 변환하는 함수
export function markdownToHtml(markdown: string): string {
  // 먼저 기본 변환 (동기적으로 처리)
  let html = marked.parse(markdown) as string;

  // 헤딩에 ID 추가하는 정규식 처리
  let headingIndex = 0;
  html = html.replace(/<h([1-6])>(.*?)<\/h[1-6]>/g, (match, level, content) => {
    // HTML 태그 제거하고 텍스트만 추출
    const textContent = content.replace(/<[^>]*>/g, "").trim();

    if (!textContent) return match;

    const id = textContent
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const uniqueId = `${id}-${headingIndex}`;
    headingIndex++;

    return `<h${level} id="${uniqueId}" class="heading-${level}">${content}</h${level}>`;
  });

  return html;
}

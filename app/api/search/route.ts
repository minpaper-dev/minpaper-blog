import { NextResponse } from "next/server";
import { getAllPostsServer } from "@/lib/posts-server";

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

      // 제목 매치가 같으면 날짜순 정렬 (최신순)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return NextResponse.json(sortedPosts);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search posts" },
      { status: 500 }
    );
  }
}

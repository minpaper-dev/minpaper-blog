"use client";

import { notFound } from "next/navigation";
import { markdownToHtml } from "@/lib/markdown";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { TableOfContents } from "@/components/TableOfContents";
import { useEffect, useState } from "react";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function PostContent({ params }: PostPageProps) {
  const [slug, setSlug] = useState<string>("");
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    async function loadPost() {
      try {
        const resolvedParams = await params;
        const resolvedSlug = resolvedParams.slug;
        setSlug(resolvedSlug);

        // API를 통해 포스트 데이터 가져오기
        const response = await fetch(`/api/posts/${resolvedSlug}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error("Failed to fetch post");
        }

        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error("Error loading post:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [params]);

  if (loading) {
    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${
          isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-white text-black"
        }`}
      >
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-8">
              <div className="text-lg">포스트를 불러오는 중...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const htmlContent = markdownToHtml(post.content);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-white text-black"
      }`}
    >
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3">
            <article
              className={`prose prose-lg max-w-none transition-colors duration-300 ${
                isDarkMode ? "prose-invert" : ""
              }`}
            >
              <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div
                  className={`flex items-center gap-4 text-sm mb-4 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 text-sm rounded-md transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-gray-800 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </header>

              <div
                className={`prose prose-lg max-w-none transition-colors duration-300 ${
                  isDarkMode ? "prose-invert" : ""
                }`}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </article>
          </div>

          {/* 목차 사이드바 */}
          <div className="lg:col-span-1">
            <TableOfContents content={post.content} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <ThemeProvider>
      <PostContent params={params} />
    </ThemeProvider>
  );
}

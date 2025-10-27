"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { ProfileSection } from "@/components/ProfileSection";
import { Tabs } from "@/components/Tabs";
import { PostCard } from "@/components/PostCard";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider, useTheme } from "@/components/ThemeProvider";
import { usePosts, usePostsByTag, useTags } from "@/hooks/usePosts";

function BlogContent() {
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { isDarkMode } = useTheme();

  const { posts: allPosts, loading: allPostsLoading } = usePosts();
  const { posts: filteredPosts, loading: filteredPostsLoading } =
    usePostsByTag(selectedTag);
  const { tags, loading: tagsLoading } = useTags();

  // 선택된 태그가 있으면 필터링된 포스트를, 없으면 전체 포스트를 사용
  const displayPosts = selectedTag ? filteredPosts : allPosts;
  const postsLoading = selectedTag ? filteredPostsLoading : allPostsLoading;

  const tabs = [
    { id: "posts", label: "POSTS", count: allPosts.length },
    { id: "about", label: "ABOUT" },
  ];

  const tagList = Object.entries(tags).map(([name, count]) => ({
    name,
    count,
  }));

  const handleTagClick = (tag: string | null) => {
    setSelectedTag(tag);
  };

  if (allPostsLoading || tagsLoading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-white text-black"
        }`}
      >
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-white text-black"
      }`}
    >
      <Header />

      <div className="pt-16">
        <ProfileSection
          name="@minpaper"
          description="꾸준히, 의미있는 학습을 기록하기 위한 공간입니다."
        />
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Posts Section */}
          <div className="lg:col-span-2 space-y-12">
            {activeTab === "posts" && (
              <>
                {selectedTag && (
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg text-gray-500 dark:text-gray-400">
                        필터링된 태그:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
                          {selectedTag}
                        </span>
                        <button
                          onClick={() => setSelectedTag(null)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          title="필터 제거"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">
                      {displayPosts.length}개의 포스트
                    </p>
                  </div>
                )}

                {postsLoading ? (
                  <div className="text-center py-8">
                    <div className="text-lg">포스트를 불러오는 중...</div>
                  </div>
                ) : displayPosts.length > 0 ? (
                  displayPosts.map((post, i) => (
                    <PostCard
                      key={i}
                      title={post.title}
                      date={new Date(post.date).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      excerpt={post.excerpt}
                      tag={post.tags[0]}
                      href={`/blog/${post.slug}`}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-lg text-gray-500 dark:text-gray-400">
                      해당 태그의 포스트가 없습니다.
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === "about" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">소개</h2>
                <div
                  className={`leading-relaxed space-y-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <p>
                    안녕하세요! 저는 개발자로서 지속적으로 학습하고 성장하고자
                    하는 사람입니다.
                  </p>
                  <p>
                    이 블로그는 제가 학습한 내용들을 정리하고 기록하는
                    공간입니다. 개발 관련 기술, 프로그래밍 언어, 시스템 설계,
                    그리고 개인적인 회고까지 다양한 주제로 글을 작성하고
                    있습니다.
                  </p>
                  <p>
                    함께 성장해나가는 개발자 커뮤니티의 일원이 되고 싶습니다.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar
            tags={tagList}
            selectedTag={selectedTag}
            onTagClick={handleTagClick}
          />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <BlogContent />
    </ThemeProvider>
  );
}

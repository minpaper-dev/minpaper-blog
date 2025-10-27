"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, Clock, FileText } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface SearchResult {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isDarkMode } = useTheme();

  // 모달이 열릴 때 입력 필드에 포커스
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // 검색어 변경 시 검색 실행
  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
      searchPosts(query.trim());
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results.length > 0) {
        e.preventDefault();
        const selectedResult = results[selectedIndex];
        if (selectedResult) {
          window.location.href = `/blog/${selectedResult.slug}`;
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const searchPosts = async (searchQuery: string) => {
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchQuery)}`
      );
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleResultClick = (slug: string) => {
    window.location.href = `/blog/${slug}`;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16">
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* 검색 모달 */}
      <div
        className={`relative w-full max-w-2xl mx-4 rounded-lg shadow-xl transition-all ${
          isDarkMode
            ? "bg-[#1e1e1e] border border-gray-800"
            : "bg-white border border-gray-200"
        }`}
      >
        {/* 검색 입력 */}
        <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <Search
            className={`h-5 w-5 mr-3 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="포스트 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`flex-1 bg-transparent outline-none text-lg ${
              isDarkMode
                ? "text-white placeholder-gray-400"
                : "text-black placeholder-gray-500"
            }`}
          />
          <button
            onClick={onClose}
            className={`ml-3 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 검색 결과 */}
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div
              className={`p-8 text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-2"></div>
                검색 중...
              </div>
            </div>
          ) : query.trim() && results.length === 0 ? (
            <div
              className={`p-8 text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>검색 결과가 없습니다.</p>
              <p className="text-sm mt-1">다른 키워드로 시도해보세요.</p>
            </div>
          ) : query.trim() ? (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={result.slug}
                  onClick={() => handleResultClick(result.slug)}
                  className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    index === selectedIndex
                      ? isDarkMode
                        ? "bg-gray-800"
                        : "bg-gray-50"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <FileText
                      className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-semibold mb-1 ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {result.title}
                      </h3>
                      <p
                        className={`text-sm mb-2 line-clamp-2 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {result.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <div
                          className={`flex items-center gap-1 ${
                            isDarkMode ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          <Clock className="h-3 w-3" />
                          {new Date(result.date).toLocaleDateString("ko-KR")}
                        </div>
                        {result.tags.length > 0 && (
                          <div className="flex gap-1">
                            {result.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className={`px-2 py-0.5 rounded text-xs ${
                                  isDarkMode
                                    ? "bg-gray-700 text-gray-300"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                            {result.tags.length > 2 && (
                              <span
                                className={`text-xs ${
                                  isDarkMode ? "text-gray-500" : "text-gray-400"
                                }`}
                              >
                                +{result.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div
              className={`p-8 text-center ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>검색어를 입력하세요.</p>
              <p className="text-sm mt-1">
                포스트 제목과 내용을 검색할 수 있습니다.
              </p>
            </div>
          )}
        </div>

        {/* 키보드 단축키 안내 */}
        {query.trim() && results.length > 0 && (
          <div
            className={`px-4 py-2 text-xs border-t ${
              isDarkMode
                ? "text-gray-500 border-gray-800"
                : "text-gray-400 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>↑↓ 키로 탐색</span>
              <span>Enter로 선택</span>
              <span>Esc로 닫기</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

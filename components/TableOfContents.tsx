"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  content,
}) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const { isDarkMode } = useTheme();

  // 마크다운에서 헤딩 추출
  useEffect(() => {
    const headings = content.match(/^(#{1,6})\s+(.+)$/gm);
    if (!headings) {
      setTocItems([]);
      return;
    }

    const items: TOCItem[] = headings
      .map((heading, index) => {
        const match = heading.match(/^(#{1,6})\s+(.+)$/);
        if (!match) return null;

        const level = match[1].length;
        const text = match[2].trim();
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");

        return {
          id: `${id}-${index}`, // 인덱스를 추가해서 고유성 보장
          text,
          level,
        };
      })
      .filter(Boolean) as TOCItem[];

    setTocItems(items);
  }, [content]);

  // 스크롤 위치에 따른 활성 섹션 감지
  useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      if (headings.length === 0) return;

      let current = "";
      for (const heading of headings) {
        if (heading && heading.getBoundingClientRect().top <= 100) {
          current = heading.id;
        }
      }

      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <div
      className={`sticky top-20 max-h-[calc(100vh-8rem)] overflow-y-auto ${
        isDarkMode ? "text-gray-300" : "text-gray-600"
      }`}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        목차
      </h3>
      <nav className="space-y-1">
        {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={`block w-full text-left py-1 px-2 rounded-md text-sm transition-colors ${
              activeId === item.id
                ? isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-black"
                : isDarkMode
                ? "hover:bg-gray-800 hover:text-white"
                : "hover:bg-gray-100 hover:text-black"
            }`}
            style={{
              paddingLeft: `${(item.level - 1) * 12 + 8}px`,
            }}
          >
            {item.text}
          </button>
        ))}
      </nav>
    </div>
  );
};

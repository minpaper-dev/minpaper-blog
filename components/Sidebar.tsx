"use client";

import React from "react";
import { useTheme } from "@/components/ThemeProvider";

interface Tag {
  name: string;
  count: number;
}

interface SidebarProps {
  tags: Tag[];
  selectedTag: string | null;
  onTagClick: (tag: string | null) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  tags,
  selectedTag,
  onTagClick,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <aside className="space-y-4">
      <h3 className="text-xl font-bold mb-6">TAG LIST</h3>
      <div className="space-y-2">
        <button
          onClick={() => onTagClick(null)}
          className={`flex justify-between items-center py-2 transition-colors w-full text-left ${
            selectedTag === null
              ? isDarkMode
                ? "text-white font-semibold"
                : "text-black font-semibold"
              : isDarkMode
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-black"
          }`}
        >
          <span>전체</span>
          <span className={`${isDarkMode ? "text-gray-600" : "text-gray-400"}`}>
            ({tags.reduce((sum, tag) => sum + tag.count, 0)})
          </span>
        </button>

        {tags.map((tag) => (
          <button
            key={tag.name}
            onClick={() => onTagClick(tag.name)}
            className={`flex justify-between items-center py-2 transition-colors w-full text-left ${
              selectedTag === tag.name
                ? isDarkMode
                  ? "text-white font-semibold"
                  : "text-black font-semibold"
                : isDarkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-black"
            }`}
          >
            <span>{tag.name}</span>
            <span
              className={`${isDarkMode ? "text-gray-600" : "text-gray-400"}`}
            >
              ({tag.count})
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};

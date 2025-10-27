"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/ThemeProvider";

interface PostCardProps {
  title: string;
  date: string;
  excerpt: string;
  tag?: string;
  href?: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  title,
  date,
  excerpt,
  tag,
  href = "#",
}) => {
  const { isDarkMode } = useTheme();

  return (
    <article className="space-y-3">
      <h2
        className={`text-3xl font-bold transition-colors cursor-pointer ${
          isDarkMode ? "hover:text-gray-300" : "hover:text-gray-600"
        }`}
      >
        <a href={href}>{title}</a>
      </h2>
      <div
        className={`text-sm ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
      >
        {date}
      </div>
      <p
        className={`leading-relaxed ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {excerpt}
      </p>
      {tag && (
        <div>
          <Badge
            variant="secondary"
            className={`${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700 text-gray-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
          >
            {tag}
          </Badge>
        </div>
      )}
    </article>
  );
};

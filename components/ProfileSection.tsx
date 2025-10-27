"use client";

import React from "react";
import { Github, Linkedin } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface ProfileSectionProps {
  name?: string;
  description?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  profileImage?: string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  name = "@minpaper",
  description = "꾸준히, 의미있는 학습을 기록하기 위한 공간입니다.",
  githubUrl = "#",
  linkedinUrl = "#",
  profileImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`border-b ${
        isDarkMode ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mb-3">{name}</h1>
          <p
            className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            {description}
          </p>
          <div className="flex gap-4">
            <a
              href={githubUrl}
              className={`transition-colors ${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href={linkedinUrl}
              className={`transition-colors ${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { Moon, Sun, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { SearchModal } from "@/components/SearchModal";

interface HeaderProps {
  onThemeToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onThemeToggle }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleThemeToggle = () => {
    toggleDarkMode();
    onThemeToggle?.();
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md ${
          isDarkMode
            ? "border-gray-800 bg-[#1e1e1e]/80"
            : "border-gray-200 bg-white/80"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a
              href="/"
              className={`text-lg font-mono font-semibold transition-colors ${
                isDarkMode ? "hover:text-gray-300" : "hover:text-gray-600"
              }`}
            >
              minpaper.blog
            </a>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleSearchClick}>
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={handleSearchClose} />
    </>
  );
};

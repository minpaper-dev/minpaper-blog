"use client";

import React from "react";
import { useTheme } from "@/components/ThemeProvider";

interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`border-b ${
        isDarkMode ? "border-gray-800" : "border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? `border-current ${isDarkMode ? "text-white" : "text-black"}`
                  : `border-transparent ${
                      isDarkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-black"
                    }`
              }`}
            >
              {tab.label}{" "}
              {tab.count && <span className="ml-2">{tab.count}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

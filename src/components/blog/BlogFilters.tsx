"use client";

import React from "react";
import { motion } from "framer-motion";

interface BlogFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogFilters({ categories, activeCategory, onCategoryChange }: BlogFiltersProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-4 md:gap-6 text-sm overflow-x-auto pb-2"
    >
      <button
        onClick={() => onCategoryChange("All")}
        className={`relative pb-1 px-1 py-2 transition-colors whitespace-nowrap touch-manipulation ${
          activeCategory === "All"
            ? "text-blue-600 font-medium"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        All
        {activeCategory === "All" && (
          <motion.div
            layoutId="activeTab"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`relative pb-1 px-1 py-2 transition-colors whitespace-nowrap touch-manipulation ${
            activeCategory === category
              ? "text-blue-600 font-medium"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {category}
          {activeCategory === category && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </motion.div>
  );
}
"use client";

import React from "react";

export function BackgroundElements() {
  return (
    <div className="floating-shapes w-full h-full">
      <div className="floating-shape floating-shape-1 rounded-full blur-3xl"></div>
      <div className="floating-shape floating-shape-2 rounded-full blur-3xl"></div>
      <div className="floating-shape floating-shape-3 rounded-full blur-3xl"></div>
      <div className="floating-shape floating-shape-4 rounded-full blur-3xl"></div>

      {/* Additional decorative elements */}
      <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-blue-500/5 dark:bg-blue-500/2 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-purple-500/5 dark:bg-purple-500/2 rounded-full blur-xl"></div>

      {/* Subtle geometric shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-200/10 dark:border-blue-500/5 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-200/10 dark:border-purple-500/5 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-cyan-200/10 dark:border-cyan-500/5 rounded-full"></div>
    </div>
  );
}

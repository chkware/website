"use client";
import React, { useState } from "react";
import { AnimatedBackground } from "./AnimatedBackground";

export function BackgroundDemo() {
  const [variant, setVariant] = useState<"hero" | "subtle" | "vibrant">("hero");
  const [showSlateTexture, setShowSlateTexture] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-black z-0">
      {/* Controls */}
      <div className="fixed top-4 left-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800" style={{ zIndex: 50 }}>
        <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Background Controls</h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Variant
            </label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as "hero" | "subtle" | "vibrant")}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="hero">Hero (Blue/Purple/Pink/Cyan/Emerald)</option>
              <option value="subtle">Subtle (Gray tones)</option>
              <option value="vibrant">Vibrant (Orange/Emerald/Violet/Rose)</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="slateTexture"
              checked={showSlateTexture}
              onChange={(e) => setShowSlateTexture(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="slateTexture" className="text-sm text-gray-700 dark:text-gray-300">
              Show Slate Texture
            </label>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="relative min-h-screen flex items-center justify-center z-0">
        <AnimatedBackground variant={variant} showSlateTexture={showSlateTexture} />

        <div className="relative text-center max-w-2xl mx-auto p-8" style={{ zIndex: 10 }}>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Liquid Background Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Watch the organic, shape-changing blobs float and morph with slate texture overlay.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Hero Variant</h3>
              <p className="text-gray-600 dark:text-gray-300">5 colorful blobs with high morphing intensity</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Subtle Variant</h3>
              <p className="text-gray-600 dark:text-gray-300">2 gray blobs with low morphing intensity</p>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Vibrant Variant</h3>
              <p className="text-gray-600 dark:text-gray-300">4 bright blobs with mixed morphing intensity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
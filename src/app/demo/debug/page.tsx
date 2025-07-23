"use client";
import React, { useState } from "react";
import { AnimatedBackgroundDebug } from "@/components/ui/AnimatedBackgroundDebug";

export default function DebugBackgroundPage() {
  const [variant, setVariant] = useState<"hero" | "subtle" | "vibrant">("hero");
  const [showSlateTexture, setShowSlateTexture] = useState(true);
  const [debugMode, setDebugMode] = useState(true);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Enhanced Controls */}
      <div className="fixed top-4 left-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 max-w-xs" style={{ zIndex: 50 }}>
        <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Debug Controls</h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Variant
            </label>
            <select
              value={variant}
              onChange={(e) => setVariant(e.target.value as "hero" | "subtle" | "vibrant")}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="hero">Hero (5 colorful blobs)</option>
              <option value="subtle">Subtle (2 gray blobs)</option>
              <option value="vibrant">Vibrant (4 bright blobs)</option>
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
              Slate Texture
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="debugMode"
              checked={debugMode}
              onChange={(e) => setDebugMode(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="debugMode" className="text-sm text-gray-700 dark:text-gray-300">
              Debug Info
            </label>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded text-xs">
          <div className="font-medium mb-2">Current Settings:</div>
          <div>Opacity: 80% (debug mode)</div>
          <div>Blur: 2xl (less blur for visibility)</div>
          <div>Colors: Enhanced (300 series)</div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="relative min-h-screen flex items-center justify-center z-0">
        <AnimatedBackgroundDebug
          variant={variant}
          showSlateTexture={showSlateTexture}
          debugMode={debugMode}
        />

        <div className="relative text-center max-w-2xl mx-auto p-8" style={{ zIndex: 10 }}>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Debug Mode
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Enhanced visibility for designing and customizing liquid backgrounds
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Enhanced Visibility</h3>
              <ul className="text-gray-600 dark:text-gray-300 text-left space-y-1">
                <li>• Higher opacity (80%)</li>
                <li>• Less blur (2xl instead of 3xl)</li>
                <li>• Brighter colors (300 series)</li>
                <li>• Larger particles</li>
              </ul>
            </div>
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Animation Features</h3>
              <ul className="text-gray-600 dark:text-gray-300 text-left space-y-1">
                <li>• 8 liquid animation patterns</li>
                <li>• Organic shape morphing</li>
                <li>• Multi-directional floating</li>
                <li>• Independent particle system</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              💡 <strong>Tip:</strong> Use this debug mode to see blob movements clearly,
              then switch to the regular AnimatedBackground component with lower opacity for production.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
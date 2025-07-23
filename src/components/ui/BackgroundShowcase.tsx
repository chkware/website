"use client";
import React from "react";
import { AnimatedBackground } from "./AnimatedBackground";

export function BackgroundShowcase() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section Demo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden  z-0">
        <AnimatedBackground variant="hero" showSlateTexture={true} />
        <div className="relative text-center max-w-4xl mx-auto p-8" style={{ zIndex: 10 }}>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Hero Variant
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            5 colorful liquid blobs with high morphing intensity and slate texture
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg">
              <div className="w-4 h-4 bg-blue-200 dark:bg-blue-900 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Blue</span>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg">
              <div className="w-4 h-4 bg-purple-200 dark:bg-purple-900 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Purple</span>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg">
              <div className="w-4 h-4 bg-pink-200 dark:bg-pink-900 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Pink</span>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg">
              <div className="w-4 h-4 bg-cyan-200 dark:bg-cyan-900 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Cyan</span>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg">
              <div className="w-4 h-4 bg-emerald-200 dark:bg-emerald-900 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Emerald</span>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Section Demo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 z-0">
        <AnimatedBackground variant="subtle" showSlateTexture={true} />
        <div className="relative text-center max-w-4xl mx-auto p-8" style={{ zIndex: 10 }}>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Subtle Variant
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            2 gray blobs with low morphing intensity - perfect for content sections
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm max-w-md mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Light Gray</span>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-lg">
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Medium Gray</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vibrant Section Demo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden z-0">
        <AnimatedBackground variant="vibrant" showSlateTexture={true} />
        <div className="relative text-center max-w-4xl mx-auto p-8" style={{ zIndex: 10 }}>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Vibrant Variant
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            4 bright blobs with mixed morphing intensity - energetic and dynamic
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg">
              <div className="w-4 h-4 bg-orange-200 dark:bg-orange-900 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Orange</span>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg">
              <div className="w-4 h-4 bg-emerald-200 dark:bg-emerald-900 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Emerald</span>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg">
              <div className="w-4 h-4 bg-violet-200 dark:bg-violet-900 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Violet</span>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg">
              <div className="w-4 h-4 bg-rose-200 dark:bg-rose-900 rounded-full mx-auto mb-2"></div>
              <span className="text-gray-700 dark:text-gray-300">Rose</span>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Configuration Demo */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900 z-0">
        <AnimatedBackground 
          customBlobs={[
            {
              id: "custom1",
              size: 500,
              color: "bg-gradient-to-r from-blue-200 to-purple-200",
              darkColor: "dark:bg-gradient-to-r dark:from-blue-900 dark:to-purple-900",
              initialX: 30,
              initialY: 40,
              animationDuration: 15,
              delay: 0,
              morphIntensity: "high",
            },
            {
              id: "custom2",
              size: 350,
              color: "bg-gradient-to-r from-pink-200 to-orange-200",
              darkColor: "dark:bg-gradient-to-r dark:from-pink-900 dark:to-orange-900",
              initialX: 70,
              initialY: 60,
              animationDuration: 20,
              delay: 2,
              morphIntensity: "high",
            }
          ]}
          showSlateTexture={true} 
        />
        <div className="relative text-center max-w-4xl mx-auto p-8" style={{ zIndex: 10 }}>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Custom Configuration
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Create your own blob configurations with custom colors, sizes, and animations
          </p>
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg max-w-2xl mx-auto">
            <pre className="text-left text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
{`customBlobs={[
  {
    id: "custom1",
    size: 500,
    color: "bg-gradient-to-r from-blue-200 to-purple-200",
    initialX: 30,
    initialY: 40,
    animationDuration: 15,
    morphIntensity: "high"
  }
]}`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
"use client";
import React, { useState } from "react";
import { TrendingBackgrounds } from "@/components/ui/TrendingBackgrounds";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export default function TrendsDemo() {
  const [currentTrend, setCurrentTrend] = useState<"liquid" | "gradient-mesh" | "particles" | "grid" | "aurora" | "geometric" | "glass-morphism" | "organic-flow" | "holographic" | "wave-distortion" | "matrix-rain" | "floating-orbs">("liquid");
  const [interactive, setInteractive] = useState(false);

  const trends = [
    // Original trends
    {
      id: "liquid",
      name: "Liquid Blobs",
      description: "Organic morphing shapes with fluid animations",
      popularity: "🔥 Very Hot",
      usedBy: "Stripe, Figma, Linear",
      category: "Popular"
    },
    {
      id: "gradient-mesh",
      name: "Gradient Mesh",
      description: "Dynamic color transitions with smooth gradients",
      popularity: "🔥 Hot",
      usedBy: "Apple, Spotify, Discord",
      category: "Popular"
    },
    {
      id: "particles",
      name: "Particle System",
      description: "Floating connected particles with constellation effect",
      popularity: "🔥 Hot",
      usedBy: "GitHub, Vercel, Tech startups",
      category: "Popular"
    },
    // Premium Awwwards-inspired trends
    {
      id: "wave-distortion",
      name: "Wave Distortion",
      description: "Smooth flowing waves with particle effects",
      popularity: "🌊 Flowing",
      usedBy: "Creative agencies, Design studios",
      category: "Premium"
    },
    {
      id: "matrix-rain",
      name: "Matrix Rain",
      description: "Digital rain effect with glitch animations",
      popularity: "💻 Digital",
      usedBy: "Tech companies, Cyberpunk themes",
      category: "Premium"
    },
    {
      id: "floating-orbs",
      name: "Floating Orbs",
      description: "Elegant floating spheres with light beams",
      popularity: "✨ Elegant",
      usedBy: "Luxury brands, Premium portfolios",
      category: "Premium"
    },
    {
      id: "glass-morphism",
      name: "Glass Morphism",
      description: "Premium glass panels with backdrop blur",
      popularity: "🔮 Luxury",
      usedBy: "Apple, Premium brands",
      category: "Premium"
    },
    {
      id: "organic-flow",
      name: "Organic Flow",
      description: "Natural flowing patterns with organic movement",
      popularity: "🌿 Natural",
      usedBy: "Wellness, Nature brands",
      category: "Premium"
    },
    {
      id: "holographic",
      name: "Holographic",
      description: "Futuristic hologram with scan line effects",
      popularity: "🔮 Sci-Fi",
      usedBy: "Gaming, VR/AR, Future tech",
      category: "Premium"
    },
    // Original remaining trends
    {
      id: "grid",
      name: "Basic Grid",
      description: "Simple animated grid with intersection highlights",
      popularity: "📈 Rising",
      usedBy: "Developer tools, Crypto platforms",
      category: "Basic"
    },
    {
      id: "aurora",
      name: "Aurora Effect",
      description: "Flowing color waves with atmospheric glow",
      popularity: "📈 Rising",
      usedBy: "AI tools, Creative platforms",
      category: "Basic"
    },
    {
      id: "geometric",
      name: "Floating Shapes",
      description: "3D-style geometric shapes with depth effects",
      popularity: "💫 Emerging",
      usedBy: "Portfolio sites, Agencies",
      category: "Basic"
    }
  ];

  const renderBackground = () => {
    if (currentTrend === "liquid") {
      return <AnimatedBackground variant="hero" showSlateTexture={true} />;
    }
    return <TrendingBackgrounds variant={currentTrend} interactive={interactive} />;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Controls */}
      <div className="fixed top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 max-w-xs" style={{ zIndex: 50 }}>
        <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Trending Backgrounds</h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Trend
            </label>
            <div className="space-y-3">
              {/* Premium Section */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Premium (Awwwards Quality)</h4>
                <div className="space-y-1">
                  {trends.filter(t => t.category === "Premium").map((trend) => (
                    <button
                      key={trend.id}
                      onClick={() => setCurrentTrend(trend.id as typeof currentTrend)}
                      className={`w-full text-left p-2 rounded text-sm transition-colors ${
                        currentTrend === trend.id
                          ? 'bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-900 dark:text-purple-100'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="font-medium">{trend.name}</div>
                      <div className="text-xs opacity-75">{trend.popularity}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Section */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Popular</h4>
                <div className="space-y-1">
                  {trends.filter(t => t.category === "Popular" || t.id === "liquid").map((trend) => (
                    <button
                      key={trend.id}
                      onClick={() => setCurrentTrend(trend.id as typeof currentTrend)}
                      className={`w-full text-left p-2 rounded text-sm transition-colors ${
                        currentTrend === trend.id
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="font-medium">{trend.name}</div>
                      <div className="text-xs opacity-75">{trend.popularity}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Basic Section */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Basic</h4>
                <div className="space-y-1">
                  {trends.filter(t => t.category === "Basic").map((trend) => (
                    <button
                      key={trend.id}
                      onClick={() => setCurrentTrend(trend.id as typeof currentTrend)}
                      className={`w-full text-left p-2 rounded text-sm transition-colors ${
                        currentTrend === trend.id
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="font-medium">{trend.name}</div>
                      <div className="text-xs opacity-75">{trend.popularity}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {currentTrend !== "liquid" && (
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="interactive"
                checked={interactive}
                onChange={(e) => setInteractive(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="interactive" className="text-sm text-gray-700 dark:text-gray-300">
                Interactive Mode
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Demo Content */}
      <div className="relative min-h-screen flex items-center justify-center z-0">
        {renderBackground()}
        
        <div className="relative text-center max-w-4xl mx-auto p-8" style={{ zIndex: 10 }}>
          <div className="mb-8">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
              trends.find(t => t.id === currentTrend)?.category === "Premium" 
                ? 'bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-800 dark:text-purple-200'
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
            }`}>
              {trends.find(t => t.id === currentTrend)?.popularity}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {trends.find(t => t.id === currentTrend)?.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {trends.find(t => t.id === currentTrend)?.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Used by: {trends.find(t => t.id === currentTrend)?.usedBy}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Performance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {currentTrend === "liquid" ? "CSS + Framer Motion" :
                 currentTrend === "particles" ? "Medium impact" :
                 currentTrend === "gradient-mesh" ? "Low impact" :
                 currentTrend === "wave-distortion" ? "Low impact" :
                 currentTrend === "matrix-rain" ? "Medium impact" :
                 currentTrend === "floating-orbs" ? "Low impact" :
                 currentTrend === "glass-morphism" ? "Medium impact" :
                 currentTrend === "organic-flow" ? "Low impact" :
                 currentTrend === "holographic" ? "Medium impact" :
                 currentTrend === "grid" ? "Very low impact" :
                 currentTrend === "aurora" ? "Medium impact" :
                 "Low-medium impact"}
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Complexity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {currentTrend === "liquid" ? "Medium" :
                 currentTrend === "particles" ? "High" :
                 currentTrend === "gradient-mesh" ? "Low" :
                 currentTrend === "wave-distortion" ? "Low" :
                 currentTrend === "matrix-rain" ? "Medium" :
                 currentTrend === "floating-orbs" ? "Low" :
                 currentTrend === "glass-morphism" ? "Medium" :
                 currentTrend === "organic-flow" ? "Medium" :
                 currentTrend === "holographic" ? "High" :
                 currentTrend === "grid" ? "Low" :
                 currentTrend === "aurora" ? "Medium" :
                 "Medium"}
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Best For</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {currentTrend === "liquid" ? "SaaS, Modern apps" :
                 currentTrend === "particles" ? "Tech, Developer tools" :
                 currentTrend === "gradient-mesh" ? "Creative, Media" :
                 currentTrend === "wave-distortion" ? "Creative agencies, Design" :
                 currentTrend === "matrix-rain" ? "Tech companies, Cyberpunk" :
                 currentTrend === "floating-orbs" ? "Luxury brands, Portfolios" :
                 currentTrend === "glass-morphism" ? "Luxury brands, Apple-style" :
                 currentTrend === "organic-flow" ? "Wellness, Nature brands" :
                 currentTrend === "holographic" ? "Gaming, VR/AR, Sci-fi" :
                 currentTrend === "grid" ? "Technical, Data" :
                 currentTrend === "aurora" ? "AI, Creative tools" :
                 "Portfolios, Agencies"}
              </p>
            </div>
          </div>

          {interactive && currentTrend !== "liquid" && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Interactive Mode:</strong> Move your mouse around to see the background respond!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
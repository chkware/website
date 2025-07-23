"use client";
import React from "react";
import { TrendingBackgrounds } from "@/components/ui/TrendingBackgrounds";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export default function ComparisonDemo() {
  const trends = [
    {
      id: "liquid",
      name: "Liquid Blobs",
      component: <AnimatedBackground variant="hero" showSlateTexture={true} />,
      popularity: "🔥 Very Hot",
      description: "Organic morphing shapes"
    },
    {
      id: "gradient-mesh",
      name: "Gradient Mesh",
      component: <TrendingBackgrounds variant="gradient-mesh" />,
      popularity: "🔥 Hot",
      description: "Dynamic color transitions"
    },
    {
      id: "particles",
      name: "Particle System",
      component: <TrendingBackgrounds variant="particles" />,
      popularity: "🔥 Hot",
      description: "Connected floating particles"
    },
    {
      id: "grid",
      name: "Animated Grid",
      component: <TrendingBackgrounds variant="grid" />,
      popularity: "📈 Rising",
      description: "Pulsing geometric grid"
    },
    {
      id: "aurora",
      name: "Aurora Effect",
      component: <TrendingBackgrounds variant="aurora" />,
      popularity: "📈 Rising",
      description: "Flowing color waves"
    },
    {
      id: "geometric",
      name: "Floating Shapes",
      component: <TrendingBackgrounds variant="geometric" />,
      popularity: "💫 Emerging",
      description: "3D geometric shapes"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Background Trends Comparison
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Compare the most popular background design trends side by side.
            Each card shows a live preview of the animation style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trends.map((trend) => (
            <div
              key={trend.id}
              className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 group hover:shadow-xl transition-shadow duration-300"
            >
              {/* Background Preview */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 z-0">
                  {trend.component}
                </div>
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20 z-10"></div>

                {/* Overlay Content */}
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-800 dark:text-gray-200 mb-2">
                      {trend.popularity}
                    </div>
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">
                      {trend.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {trend.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Performance:</span>
                    <span className="text-gray-900 dark:text-white">
                      {trend.id === "liquid" ? "Medium" :
                        trend.id === "particles" ? "Medium" :
                          trend.id === "gradient-mesh" ? "Low" :
                            trend.id === "grid" ? "Very Low" :
                              trend.id === "aurora" ? "Medium" :
                                "Low-Medium"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Complexity:</span>
                    <span className="text-gray-900 dark:text-white">
                      {trend.id === "liquid" ? "Medium" :
                        trend.id === "particles" ? "High" :
                          trend.id === "gradient-mesh" ? "Low" :
                            trend.id === "grid" ? "Low" :
                              trend.id === "aurora" ? "Medium" :
                                "Medium"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Best For:</span>
                    <span className="text-gray-900 dark:text-white">
                      {trend.id === "liquid" ? "SaaS Apps" :
                        trend.id === "particles" ? "Tech Sites" :
                          trend.id === "gradient-mesh" ? "Creative" :
                            trend.id === "grid" ? "Technical" :
                              trend.id === "aurora" ? "AI Tools" :
                                "Portfolios"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <strong>Used by:</strong> {
                      trend.id === "liquid" ? "Stripe, Figma, Linear" :
                        trend.id === "particles" ? "GitHub, Vercel" :
                          trend.id === "gradient-mesh" ? "Apple, Spotify" :
                            trend.id === "grid" ? "Developer tools" :
                              trend.id === "aurora" ? "AI platforms" :
                                "Design agencies"
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Implementation Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">✅ Recommended</h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Liquid Blobs (versatile)</li>
                  <li>• Gradient Mesh (lightweight)</li>
                  <li>• Animated Grid (minimal)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">⚠️ Use Carefully</h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Particles (performance)</li>
                  <li>• Aurora (can be distracting)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">🎯 Context Specific</h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Geometric (creative sites)</li>
                  <li>• All depend on brand/audience</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
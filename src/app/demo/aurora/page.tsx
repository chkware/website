"use client";
import React, { useState } from "react";
import { AuroraVariations } from "@/components/ui/AuroraVariations";

export default function AuroraDemo() {
  const [currentAurora, setCurrentAurora] = useState<"aurora-1" | "aurora-2" | "aurora-3" | "aurora-4" | "aurora-5" | "aurora-6" | "aurora-7" | "aurora-8" | "aurora-9" | "aurora-10" | "aurora-11" | "aurora-12" | "aurora-13" | "aurora-14" | "aurora-15" | "aurora-16" | "aurora-17" | "aurora-18" | "aurora-19" | "aurora-20">("aurora-1");
  const [interactive, setInteractive] = useState(false);

  const auroraVariations = [
    // Classic Collection
    {
      id: "aurora-1",
      name: "Classic Northern Lights",
      description: "Traditional aurora with green, blue, and purple waves",
      colors: "Green, Blue, Purple",
      style: "Classic",
      category: "Classic",
      useCase: "Nature brands, outdoor companies, travel sites",
      mood: "Natural, Mystical"
    },
    {
      id: "aurora-2",
      name: "Plasma Waves",
      description: "Horizontal plasma waves with pink and purple energy",
      colors: "Pink, Purple, Blue",
      style: "Energy",
      category: "Classic",
      useCase: "Tech startups, energy companies, fitness brands",
      mood: "Dynamic, Energetic"
    },
    {
      id: "aurora-3",
      name: "Cosmic Storm",
      description: "Rotating cosmic aurora with stellar particles",
      colors: "Multi-spectrum",
      style: "Cosmic",
      category: "Classic",
      useCase: "Space agencies, sci-fi brands, astronomy sites",
      mood: "Mysterious, Infinite"
    },
    {
      id: "aurora-4",
      name: "Electric Dreams",
      description: "Vertical electric bolts with cyan glow",
      colors: "Cyan, Purple",
      style: "Electric",
      category: "Classic",
      useCase: "Gaming, cyberpunk themes, tech conferences",
      mood: "Futuristic, Electric"
    },
    {
      id: "aurora-5",
      name: "Sunset Aurora",
      description: "Warm sunset colors with orange and pink waves",
      colors: "Orange, Red, Pink",
      style: "Warm",
      category: "Classic",
      useCase: "Restaurants, hospitality, lifestyle brands",
      mood: "Warm, Inviting"
    },
    {
      id: "aurora-6",
      name: "Quantum Field",
      description: "Quantum ripples with expanding energy rings",
      colors: "Purple, Blue",
      style: "Quantum",
      category: "Classic",
      useCase: "Research institutes, quantum computing, AI companies",
      mood: "Scientific, Advanced"
    },
    {
      id: "aurora-7",
      name: "Nebula Storm",
      description: "Space nebula with stellar dust and cosmic clouds",
      colors: "Purple, Pink, Blue",
      style: "Nebula",
      category: "Classic",
      useCase: "Creative agencies, art galleries, design studios",
      mood: "Artistic, Dreamy"
    },

    // Popular Color Schemes
    {
      id: "aurora-8",
      name: "Ocean Breeze",
      description: "Calming blue and teal waves like ocean currents",
      colors: "Blue, Teal, Cyan",
      style: "Oceanic",
      category: "Popular",
      useCase: "Wellness, meditation apps, spa brands, marine companies",
      mood: "Calm, Refreshing"
    },
    {
      id: "aurora-9",
      name: "Forest Glow",
      description: "Natural green tones with emerald highlights",
      colors: "Green, Emerald, Lime",
      style: "Natural",
      category: "Popular",
      useCase: "Eco brands, sustainability, organic products, gardening",
      mood: "Fresh, Organic"
    },
    {
      id: "aurora-10",
      name: "Rose Gold",
      description: "Elegant pink and gold combination with luxury feel",
      colors: "Pink, Rose, Gold",
      style: "Luxury",
      category: "Popular",
      useCase: "Luxury brands, jewelry, fashion, beauty products",
      mood: "Elegant, Premium"
    },
    {
      id: "aurora-11",
      name: "Midnight Blue",
      description: "Deep blue and navy tones for sophisticated look",
      colors: "Navy, Indigo, Deep Blue",
      style: "Professional",
      category: "Popular",
      useCase: "Corporate, finance, law firms, professional services",
      mood: "Trustworthy, Professional"
    },
    {
      id: "aurora-12",
      name: "Coral Reef",
      description: "Vibrant coral and orange tones with tropical feel",
      colors: "Coral, Orange, Peach",
      style: "Tropical",
      category: "Popular",
      useCase: "Travel, tropical resorts, summer brands, food & beverage",
      mood: "Vibrant, Tropical"
    },

    // Trending Palettes
    {
      id: "aurora-13",
      name: "Arctic Ice",
      description: "Cool whites and light blues for clean, minimal feel",
      colors: "White, Light Blue, Silver",
      style: "Minimal",
      category: "Trending",
      useCase: "Tech companies, minimalist brands, healthcare, clean energy",
      mood: "Clean, Pure"
    },
    {
      id: "aurora-14",
      name: "Lavender Dreams",
      description: "Soft purple and lavender tones for gentle ambiance",
      colors: "Lavender, Purple, Violet",
      style: "Gentle",
      category: "Trending",
      useCase: "Beauty, wellness, meditation, children's brands, aromatherapy",
      mood: "Soothing, Gentle"
    },
    {
      id: "aurora-15",
      name: "Golden Hour",
      description: "Warm gold and amber tones like sunset lighting",
      colors: "Gold, Yellow, Amber",
      style: "Warm",
      category: "Trending",
      useCase: "Photography, luxury goods, premium services, hospitality",
      mood: "Warm, Premium"
    },
    {
      id: "aurora-16",
      name: "Mint Fresh",
      description: "Fresh mint and teal combination for modern feel",
      colors: "Mint, Teal, Cyan",
      style: "Fresh",
      category: "Trending",
      useCase: "Health brands, fresh food, dental, cleaning products, startups",
      mood: "Fresh, Modern"
    },

    // Bold & Dramatic
    {
      id: "aurora-17",
      name: "Crimson Fire",
      description: "Intense red and burgundy with fire-like particles",
      colors: "Red, Crimson, Burgundy",
      style: "Intense",
      category: "Bold",
      useCase: "Sports brands, energy drinks, automotive, gaming, action movies",
      mood: "Powerful, Intense"
    },
    {
      id: "aurora-18",
      name: "Monochrome",
      description: "Elegant black, white, and gray for timeless appeal",
      colors: "Black, White, Gray",
      style: "Timeless",
      category: "Bold",
      useCase: "Architecture, fashion, photography, luxury brands, art galleries",
      mood: "Sophisticated, Timeless"
    },
    {
      id: "aurora-19",
      name: "Tropical Sunset",
      description: "Vibrant orange, pink, and yellow like tropical sunset",
      colors: "Orange, Pink, Yellow",
      style: "Vibrant",
      category: "Bold",
      useCase: "Music festivals, summer events, tropical brands, entertainment",
      mood: "Energetic, Joyful"
    },
    {
      id: "aurora-20",
      name: "Deep Space",
      description: "Dark cosmic colors with stars for mysterious depth",
      colors: "Dark Purple, Black, Blue",
      style: "Mysterious",
      category: "Bold",
      useCase: "Space exploration, sci-fi, gaming, mystery brands, nightlife",
      mood: "Mysterious, Deep"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Controls */}
      <div className="fixed top-4 left-4 bg-white/95 dark:bg-black/85 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 w-80 max-h-[90vh] overflow-y-auto" style={{ zIndex: 50 }}>
        <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Aurora Variations</h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Aurora Style
            </label>
            <div className="space-y-4">
              {/* Classic Collection */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Classic Collection
                </h4>
                <div className="space-y-1">
                  {auroraVariations.filter(a => a.category === "Classic").map((aurora) => (
                    <button
                      key={aurora.id}
                      onClick={() => setCurrentAurora(aurora.id as typeof currentAurora)}
                      className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-200 ${
                        currentAurora === aurora.id
                          ? 'bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-900 dark:text-blue-200 border border-blue-300 dark:border-blue-500/30 shadow-sm'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent'
                      }`}
                    >
                      <div className="font-medium">{aurora.name}</div>
                      <div className="text-xs opacity-75 mt-1">{aurora.colors}</div>
                      <div className="text-xs opacity-60 mt-1">{aurora.mood}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Color Schemes */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Popular Colors
                </h4>
                <div className="space-y-1">
                  {auroraVariations.filter(a => a.category === "Popular").map((aurora) => (
                    <button
                      key={aurora.id}
                      onClick={() => setCurrentAurora(aurora.id as typeof currentAurora)}
                      className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-200 ${
                        currentAurora === aurora.id
                          ? 'bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/50 dark:to-teal-900/50 text-green-900 dark:text-green-200 border border-green-300 dark:border-green-500/30 shadow-sm'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent'
                      }`}
                    >
                      <div className="font-medium">{aurora.name}</div>
                      <div className="text-xs opacity-75 mt-1">{aurora.colors}</div>
                      <div className="text-xs opacity-60 mt-1">{aurora.mood}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Palettes */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Trending 2024
                </h4>
                <div className="space-y-1">
                  {auroraVariations.filter(a => a.category === "Trending").map((aurora) => (
                    <button
                      key={aurora.id}
                      onClick={() => setCurrentAurora(aurora.id as typeof currentAurora)}
                      className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-200 ${
                        currentAurora === aurora.id
                          ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-500/30 shadow-sm'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent'
                      }`}
                    >
                      <div className="font-medium">{aurora.name}</div>
                      <div className="text-xs opacity-75 mt-1">{aurora.colors}</div>
                      <div className="text-xs opacity-60 mt-1">{aurora.mood}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bold & Dramatic */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Bold & Dramatic
                </h4>
                <div className="space-y-1">
                  {auroraVariations.filter(a => a.category === "Bold").map((aurora) => (
                    <button
                      key={aurora.id}
                      onClick={() => setCurrentAurora(aurora.id as typeof currentAurora)}
                      className={`w-full text-left p-3 rounded-lg text-sm transition-all duration-200 ${
                        currentAurora === aurora.id
                          ? 'bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/50 dark:to-orange-900/50 text-red-900 dark:text-red-200 border border-red-300 dark:border-red-500/30 shadow-sm'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent'
                      }`}
                    >
                      <div className="font-medium">{aurora.name}</div>
                      <div className="text-xs opacity-75 mt-1">{aurora.colors}</div>
                      <div className="text-xs opacity-60 mt-1">{aurora.mood}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
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
        </div>
      </div>

      {/* Demo Content */}
      <div className="relative min-h-screen flex items-center justify-center z-0">
        <AuroraVariations variant={currentAurora} interactive={interactive} />
        
        <div className="relative text-center max-w-4xl mx-auto p-8" style={{ zIndex: 10 }}>
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-white/80 dark:bg-black/60 backdrop-blur-sm text-gray-900 dark:text-white rounded-full text-sm font-medium mb-4 border border-gray-300 dark:border-gray-700">
              {auroraVariations.find(a => a.id === currentAurora)?.style}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {auroraVariations.find(a => a.id === currentAurora)?.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {auroraVariations.find(a => a.id === currentAurora)?.description}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Colors: {auroraVariations.find(a => a.id === currentAurora)?.colors}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/80 dark:bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Style</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {auroraVariations.find(a => a.id === currentAurora)?.style}
              </p>
            </div>
            <div className="bg-white/80 dark:bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mood</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {auroraVariations.find(a => a.id === currentAurora)?.mood}
              </p>
            </div>
            <div className="bg-white/80 dark:bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Category</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {auroraVariations.find(a => a.id === currentAurora)?.category}
              </p>
            </div>
            <div className="bg-white/80 dark:bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Performance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {['aurora-3', 'aurora-7', 'aurora-17', 'aurora-20'].includes(currentAurora) ? 'Medium' : 'Low-Medium'}
              </p>
            </div>
          </div>

          {/* Use Case Section */}
          <div className="mt-6 bg-white/80 dark:bg-black/60 backdrop-blur-sm p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Perfect For</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {auroraVariations.find(a => a.id === currentAurora)?.useCase}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Color Psychology</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {currentAurora.includes('8') || currentAurora.includes('13') || currentAurora.includes('16') ? 'Blue/Teal evokes trust, calm, and professionalism' :
                   currentAurora.includes('9') ? 'Green represents growth, nature, and harmony' :
                   currentAurora.includes('10') || currentAurora.includes('15') ? 'Pink/Gold suggests luxury, elegance, and premium quality' :
                   currentAurora.includes('11') ? 'Deep blue conveys trust, stability, and professionalism' :
                   currentAurora.includes('12') || currentAurora.includes('19') ? 'Orange/Coral creates energy, warmth, and enthusiasm' :
                   currentAurora.includes('14') ? 'Purple/Lavender represents creativity, luxury, and spirituality' :
                   currentAurora.includes('17') ? 'Red signifies power, passion, and urgency' :
                   currentAurora.includes('18') ? 'Monochrome suggests sophistication, elegance, and timelessness' :
                   currentAurora.includes('20') ? 'Dark colors create mystery, depth, and premium feel' :
                   'Multi-color palettes offer versatility and visual interest'}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Implementation Tips</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {currentAurora.includes('8') || currentAurora.includes('13') || currentAurora.includes('16') ? 'Great for headers, hero sections, and trust-building areas' :
                   currentAurora.includes('9') ? 'Perfect for eco-friendly brands and nature-focused content' :
                   currentAurora.includes('10') || currentAurora.includes('15') ? 'Ideal for luxury product showcases and premium service pages' :
                   currentAurora.includes('11') ? 'Excellent for corporate websites and professional portfolios' :
                   currentAurora.includes('12') || currentAurora.includes('19') ? 'Best for call-to-action sections and energetic brand messaging' :
                   currentAurora.includes('14') ? 'Perfect for wellness, beauty, and creative industry sites' :
                   currentAurora.includes('17') ? 'Use sparingly for high-impact sections and urgent messaging' :
                   currentAurora.includes('18') ? 'Versatile for any brand, works well with colorful content overlay' :
                   currentAurora.includes('20') ? 'Great for creating depth and mystery in hero sections' :
                   'Combine with complementary colors for balanced design'}
                </p>
              </div>
            </div>
          </div>

          {interactive && (
            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 backdrop-blur-sm rounded-lg border border-purple-200 dark:border-purple-500/30">
              <p className="text-sm text-purple-800 dark:text-purple-200">
                🌌 <strong>Interactive Mode:</strong> Move your mouse to influence the aurora patterns!
              </p>
            </div>
          )}

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-900/60 backdrop-blur-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Aurora Collection Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <strong>Pure Aurora Effects:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Traditional aurora patterns</li>
                  <li>• Various color palettes</li>
                  <li>• Different movement styles</li>
                  <li>• Cosmic and electric variations</li>
                </ul>
              </div>
              <div>
                <strong>Animation Types:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Flowing wave patterns</li>
                  <li>• Rotating cosmic effects</li>
                  <li>• Vertical electric bolts</li>
                  <li>• Expanding quantum rings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
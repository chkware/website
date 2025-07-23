"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ModernTestimonialsSection } from "./ModernTestimonialsSection";
import { SlackStyleTestimonials } from "./SlackStyleTestimonials";
import { VideoTestimonials } from "./VideoTestimonials";
import { GitHubStyleTestimonials } from "./GitHubStyleTestimonials";
import { FocusedTestimonialSlider } from "./FocusedTestimonialSlider";
import { sampleTestimonials, validateTestimonialData } from "./testimonialData";

export function TestimonialShowcase() {
  const [activeTab, setActiveTab] = useState("focused");

  const tabs = [
    { id: "focused", label: "Focused Slider" },
    { id: "modern", label: "Modern Cards" },
    { id: "slack", label: "Social Style" },
    { id: "video", label: "Video Style" },
    { id: "github", label: "GitHub Style" }
  ];

  // Validate testimonial data
  const validatedTestimonials = validateTestimonialData(sampleTestimonials);

  return (
    <section className="py-12 bg-white dark:bg-gray-950">
      <Container size="large">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Testimonial Style Options
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Compare different testimonial designs for your SaaS website
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active testimonial section */}
        <div>
          {activeTab === "focused" && (
            <FocusedTestimonialSlider 
              testimonials={validatedTestimonials}
              autoAdvanceInterval={5000}
              showControls={true}
              showIndicators={true}
            />
          )}
          {activeTab === "modern" && <ModernTestimonialsSection />}
          {activeTab === "slack" && <SlackStyleTestimonials />}
          {activeTab === "video" && <VideoTestimonials />}
          {activeTab === "github" && <GitHubStyleTestimonials />}
        </div>
      </Container>
    </section>
  );
}
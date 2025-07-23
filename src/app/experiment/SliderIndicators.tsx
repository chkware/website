"use client";

import React from "react";

export interface SliderIndicatorsProps {
  totalSlides: number;
  currentSlide: number;
  onSlideClick: (index: number) => void;
}

export function SliderIndicators({
  totalSlides,
  currentSlide,
  onSlideClick,
}: SliderIndicatorsProps) {
  return (
    <div className="flex justify-center gap-2 mt-6 sm:mt-8" role="tablist" aria-label="Testimonial navigation">
      {Array.from({ length: totalSlides }, (_, index) => (
        <button
          key={index}
          onClick={() => onSlideClick(index)}
          className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            index === currentSlide
              ? "bg-blue-600 dark:bg-blue-500"
              : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
          }`}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === currentSlide ? "true" : "false"}
          role="tab"
        />
      ))}
    </div>
  );
}
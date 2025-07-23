"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { TestimonialData } from "./FocusedTestimonialSlider";

export interface TestimonialSlideProps {
  testimonial: TestimonialData;
  isActive: boolean;
}

export function TestimonialSlide({ testimonial, isActive }: TestimonialSlideProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const transitionClass = prefersReducedMotion 
    ? "transition-opacity duration-200" 
    : "transition-all duration-700 ease-in-out";

  return (
    <div
      className={`${transitionClass} ${
        isActive 
          ? "opacity-100 transform translate-y-0" 
          : `opacity-0 absolute inset-0 ${prefersReducedMotion ? "" : "transform translate-y-4"}`
      }`}
      style={{
        transitionProperty: prefersReducedMotion ? "opacity" : "opacity, transform",
      }}
      role="tabpanel"
      aria-hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
    >
      {/* Main card design matching your system */}
      <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
        <div className="p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            
            {/* Profile image section */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-64 lg:w-56 lg:h-72 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                {testimonial.author.avatar ? (
                  <Image
                    src={testimonial.author.avatar}
                    alt={`${testimonial.author.name} avatar`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : null}
                {/* Fallback initials */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 font-semibold text-6xl">
                  {testimonial.author.name ? testimonial.author.name.split(' ').map(n => n[0]).join('').slice(0, 2) : '??'}
                </div>
              </div>
            </div>

            {/* Content section */}
            <div className="flex-1 flex flex-col justify-between min-h-[18rem] relative">
              
              {/* Quote section */}
              <div className="mb-8">
                {/* Large quote mark */}
                <div className="text-6xl lg:text-7xl text-gray-300 dark:text-gray-600 font-serif leading-none mb-6 -ml-1">
                  "
                </div>
                
                {/* Testimonial quote */}
                <blockquote className="text-lg lg:text-xl xl:text-2xl font-normal text-gray-900 dark:text-gray-100 leading-relaxed">
                  {testimonial.quote || 'No testimonial available'}
                </blockquote>
              </div>

              {/* Author information with company logo on the same row */}
              <div className="flex items-start justify-between mb-4">
                {/* Author name and title */}
                <div>
                  <div className="font-semibold text-xl lg:text-2xl text-gray-900 dark:text-white mb-1">
                    {testimonial.author.name || 'Anonymous'}
                  </div>
                  {testimonial.author.title && (
                    <div className="text-base lg:text-lg text-gray-600 dark:text-gray-400">
                      {testimonial.author.title}
                    </div>
                  )}
                </div>

                {/* Company logo on the opposite side */}
                <div className="flex-shrink-0 ml-6">
                  {testimonial.author.companyLogo ? (
                    <div className="relative h-8 w-24 lg:h-10 lg:w-28 opacity-60">
                      <Image
                        src={testimonial.author.companyLogo}
                        alt={`${testimonial.author.company} logo`}
                        fill
                        className="object-contain dark:filter dark:brightness-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const container = target.parentElement;
                          if (container) {
                            container.style.display = 'none';
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div className="text-sm lg:text-base text-gray-500 dark:text-gray-400 font-medium">
                      {testimonial.author.company}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent dark:from-black/20 pointer-events-none" />
      </div>
    </div>
  );
}
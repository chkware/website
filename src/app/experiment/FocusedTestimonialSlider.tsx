"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { TestimonialSlide } from "./TestimonialSlide";

// TypeScript interfaces
export interface TestimonialData {
  id: string;
  quote: string;
  author: {
    name: string;
    title: string;
    company: string;
    avatar: string;
    companyLogo: string;
  };
}

export interface FocusedTestimonialSliderProps {
  testimonials: TestimonialData[];
  autoAdvanceInterval?: number; // default 5000ms
}

export function FocusedTestimonialSlider({
  testimonials,
  autoAdvanceInterval = 5000,
}: FocusedTestimonialSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsPaused(true); // Pause auto-advance when user manually navigates
    setTimeout(() => setIsPaused(false), autoAdvanceInterval); // Resume after interval
  }, [testimonials.length, autoAdvanceInterval]);

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPaused(true); // Pause auto-advance when user manually navigates
    setTimeout(() => setIsPaused(false), autoAdvanceInterval); // Resume after interval
  }, [testimonials.length, autoAdvanceInterval]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsPaused(true); // Pause auto-advance when user manually navigates
    setTimeout(() => setIsPaused(false), autoAdvanceInterval); // Resume after interval
  }, [autoAdvanceInterval]);

  // Touch gesture handling
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && testimonials.length > 1) {
      goToNext();
    }
    if (isRightSwipe && testimonials.length > 1) {
      goToPrevious();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!sliderRef.current?.contains(document.activeElement)) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
        case 'Home':
          event.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          event.preventDefault();
          goToSlide(testimonials.length - 1);
          break;
        case ' ':
        case 'Spacebar':
          event.preventDefault();
          setIsPaused(prev => !prev);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious, goToSlide, testimonials.length]);

  // Auto-advance logic
  useEffect(() => {
    if (!isHovered && !isPaused && testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, autoAdvanceInterval);
      return () => clearInterval(interval);
    }
  }, [isHovered, isPaused, autoAdvanceInterval, testimonials.length]);

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-xl sm:text-2xl mb-4">No testimonials available</div>
          <div className="text-sm">Please check back later for customer testimonials.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div 
        ref={sliderRef}
        className="relative max-w-6xl mx-auto px-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-label="Customer testimonials"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Main testimonial card */}
        <div className="relative mb-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialSlide
              key={testimonial.id}
              testimonial={testimonial}
              isActive={index === currentSlide}
            />
          ))}

          {/* Screen reader announcements */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            Showing testimonial {currentSlide + 1} of {testimonials.length}
            {isPaused ? '. Auto-advance paused.' : '. Auto-advancing every 5 seconds.'}
          </div>
        </div>

        {/* Control card below main testimonial */}
        {testimonials.length > 1 && (
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between">
                
                {/* Left side: Reviews text and indicators */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Reviews</span>
                  <div className="flex gap-2">
                    {Array.from({ length: testimonials.length }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "w-8 bg-blue-600 dark:bg-blue-500"
                            : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right side: Navigation controller buttons */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={goToPrevious}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-200 shadow-sm"
                    aria-label="Previous testimonial"
                  >
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={goToNext}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-200 shadow-sm"
                    aria-label="Next testimonial"
                  >
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Subtle overlay for consistency */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent dark:from-black/20 pointer-events-none" />
          </div>
        )}
      </div>
    </div>
  );
}
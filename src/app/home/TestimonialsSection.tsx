"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "CHKware has transformed our API testing workflow. It's reduced our testing time by 60% and caught issues we would have missed.",
    author: "Sarah Johnson",
    role: "Senior QA Engineer",
    company: "TechStream",
    avatar: "/images/avatars/avatar-1.jpg",
    logo: "/images/logos/techstream.svg",
  },
  {
    quote:
      "The low-code approach means our entire team can write and maintain tests, not just developers. It's been a game-changer for our workflow.",
    author: "Michael Chen",
    role: "Engineering Manager",
    company: "DataFlow Systems",
    avatar: "/images/avatars/avatar-2.jpg",
    logo: "/images/logos/dataflow.svg",
  },
  {
    quote:
      "We integrated CHKware into our CI/CD pipeline and now we catch API issues before they ever reach production. Highly recommended.",
    author: "Jessica Taylor",
    role: "DevOps Lead",
    company: "CloudNative",
    avatar: "/images/avatars/avatar-3.jpg",
    logo: "/images/logos/cloudnative.svg",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 px-4 sm:px-6 bg-white dark:bg-black overflow-hidden">
      <div className="mx-auto max-w-6xl text-center">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
            Trusted by Developers Worldwide
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mx-auto max-w-3xl">
            See what teams are saying about their experience with CHKware
          </p>
        </motion.div>

        <div className="relative">
          {/* Testimonial Slider */}
          <div className="relative h-[400px] md:h-[300px] mx-auto max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 md:p-12 h-full flex flex-col border border-gray-200 dark:border-gray-800">
                  <div className="mb-6">
                    {/* Stars */}
                    <div className="flex justify-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-6 h-6 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    {/* Quote */}
                    <blockquote className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white text-center mb-8">
                      &quot;{testimonials[current].quote}&quot;
                    </blockquote>
                  </div>

                  <div className="mt-auto flex items-center justify-center flex-col sm:flex-row gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-700">
                        <Image
                          src={testimonials[current].avatar}
                          alt={testimonials[current].author}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Author info */}
                    <div className="text-center sm:text-left">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {testimonials[current].author}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {testimonials[current].role}, {testimonials[current].company}
                      </div>
                    </div>

                    {/* Company logo */}
                    <div className="sm:ml-auto">
                      <div className="h-10 w-24 relative grayscale opacity-80">
                        <Image
                          src={testimonials[current].logo}
                          alt={testimonials[current].company}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prev}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center border",
                "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300",
                "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              )}
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    current === idx
                      ? "bg-blue-600 dark:bg-blue-500 w-6"
                      : "bg-gray-300 dark:bg-gray-700"
                  )}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center border",
                "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300",
                "hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              )}
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

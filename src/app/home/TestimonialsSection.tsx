"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "Manual testing was eating up our team's time. With chkware, we automated key test cases in days, not weeks. The intuitive workflow helped us cut our regression cycle by half.",
    author: "Emily Tran",
    role: "QA Lead",
    company: "FinEdge Solutions",
    avatar: "/images/Emily-Tran-Photo-1930336811.jpg",
    logo: "/images/fin-edgelogo.png",
  },
  {
    quote:
      "Managing API tests across projects was slow and messy. chkware's API suite brought all endpoints and test cases into one place. We track changes faster and onboard new testers easily.",
    author: "Priya Desai",
    role: "Senior QA Engineer",
    company: "HealthSync Inc.",
    avatar: "/images/priya-desai-2445561974.jpg",
    logo: "/images/healthsynclogo.png",
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
    <section className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 -z-10"></div>
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-blue-950/20 opacity-60 -z-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-purple-950/20 opacity-60 -z-10 blur-3xl"></div>

      <Container size="large" className="text-center">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Trusted by Developers <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Worldwide</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mx-auto max-w-3xl">
            See what teams are saying about their experience with CHKware
          </p>
        </motion.div>

        <div className="relative">
          {/* Testimonial Slider */}
          <div className="relative h-[450px] md:h-[400px] mx-auto max-w-5xl">
            {/* Large quote icon */}
            <div className="absolute -top-10 left-10 text-blue-100 dark:text-blue-900 z-0">
              <Quote size={120} strokeWidth={0.5} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 z-10"
              >
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-10 md:p-14 h-full flex flex-col border border-gray-100 dark:border-gray-800 shadow-xl dark:shadow-gray-900/30">
                  <div className="mb-8 relative z-10">
                    {/* Stars */}
                    <div className="flex justify-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <motion.svg
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                          className="w-7 h-7 text-yellow-400 mx-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </motion.svg>
                      ))}
                    </div>

                    {/* Quote */}
                    <motion.blockquote
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-900 dark:text-white text-center mb-8 leading-relaxed"
                    >
                      &quot;{testimonials[current].quote}&quot;
                    </motion.blockquote>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-auto flex items-center justify-center flex-col sm:flex-row gap-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl"
                  >
                    {/* Avatar with decorative ring */}
                    <div className="flex-shrink-0 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-sm opacity-70 scale-110"></div>
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-800">
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
                      <div className="font-bold text-lg text-gray-900 dark:text-white">
                        {testimonials[current].author}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                        {testimonials[current].role},{" "}
                        <span className="text-blue-600 dark:text-blue-400">{testimonials[current].company}</span>
                      </div>
                    </div>

                    {/* Company logo */}
                    <div className="sm:ml-auto bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <div className="h-12 w-28 relative grayscale hover:grayscale-0 transition-all duration-300">
                        <Image
                          src={testimonials[current].logo}
                          alt={testimonials[current].company}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-10 gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prev}
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center",
                "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200",
                "hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors",
                "shadow-md dark:shadow-gray-900/30"
              )}
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </motion.button>

            <div className="flex items-center gap-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={cn(
                    "transition-all duration-500",
                    current === idx
                      ? "w-10 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      : "w-3 h-3 bg-gray-300 dark:bg-gray-700 rounded-full hover:bg-gray-400 dark:hover:bg-gray-600"
                  )}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center",
                "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200",
                "hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors",
                "shadow-md dark:shadow-gray-900/30"
              )}
              aria-label="Next testimonial"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </Container>
    </section>
  );
}

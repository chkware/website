"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { MovingBorder } from "@/components/ui/moving-border";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import Image from "next/image";

export function PrimaryFeaturesSection() {
  const features = [
    {
      title: "Revolutionize Your API Testing – Achieve Up to 4x Faster Automation!",
      description: "Boost efficiency and deliver results with unmatched speed and reliability.",
      image: "/images/speed-automation-demo.svg",
      imageAlt: "High-speed automation dashboard showing 4x performance improvement"
    },
    {
      title: "Accelerate Your API Development – Launch Projects Faster Than Ever!",
      description: "Streamline your workflow with tools designed for speedy delivery and precision in mind.",
      image: "/images/fast-development-demo.svg",
      imageAlt: "Streamlined development workflow showing rapid project delivery"
    },
    {
      title: "Define Your Expectations – Let Us Handle the Details!",
      description: "Simplify API testing with low-code automation that delivers accuracy and robustness.",
      image: "/images/low-code-demo.svg",
      imageAlt: "Low-code interface showing simplified API testing setup"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-gray-950 z-0">
      {/* Animated background with gradient variant */}
      <AnimatedBackground variant="gradient" showSlateTexture={false} />

      <Container size="large" className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4">
            Everything you need for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              API testing
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mx-auto max-w-3xl">
            CHKware provides a complete toolkit for modern API development and testing,
            designed to streamline your workflow and catch issues before they impact users.
          </p>
        </motion.div>

        {/* Features */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center gap-16 lg:gap-24`}
            >
              {/* Content - Reduced width */}
              <div className="lg:w-2/5 text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Image - Increased size */}
              <div className="lg:w-3/5 w-full">
                <div className="relative w-full max-w-2xl mx-auto">
                  <div className="relative bg-transparent p-[1px] rounded-2xl overflow-hidden">
                    <MovingBorder duration={3000} rx="20%" ry="20%">
                      <div className="h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--blue-500)_40%,transparent_60%)]" />
                    </MovingBorder>

                    <div className="relative aspect-[5/3] w-full bg-white/20 dark:bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/30 dark:border-white/10 shadow-2xl shadow-black/10 dark:shadow-black/30">
                      {/* Glass reflection effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent dark:from-white/10 dark:via-transparent dark:to-transparent" />

                      {/* Inner glass border */}
                      <div className="absolute inset-[1px] rounded-2xl border border-white/20 dark:border-white/5" />

                      <Image
                        src={feature.image}
                        alt={feature.imageAlt}
                        fill
                        className="object-contain p-12 relative z-10"
                        sizes="(max-width: 768px) 100vw, 60vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
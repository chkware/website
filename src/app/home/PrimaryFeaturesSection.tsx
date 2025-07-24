"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { PrimaryFeatureCard } from "@/components/features/PrimaryFeatureCard";
import { motion } from "framer-motion";

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
    <section className="section-spacing relative overflow-hidden bg-gray-50/50 dark:bg-gray-900/50">
      {/* Animated background with subtle texture */}
      <AnimatedBackground variant="subtle" showSlateTexture={true} />

      <Container size="large">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
        </div>

        {/* Features grid */}
        <div className="space-y-24 md:space-y-32">
          {features.map((feature, index) => (
            <PrimaryFeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              imageAlt={feature.imageAlt}
              delay={index}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
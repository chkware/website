"use client";

import React from "react";
import { FeatureCard } from "@/components/features/FeatureCard";
import { Container } from "@/components/ui/Container";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { motion } from "framer-motion";

export function FeaturesSection() {

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Subtle animated background with slate texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-black -z-10"></div>
      <div className="absolute inset-0 -z-10">
        <AnimatedBackground variant="subtle" showSlateTexture={true} />
      </div>
      <Container size="large">
        <div className="text-center mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4">
              Powerful & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Low-Code</span> API Testing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mx-auto max-w-3xl">
              CHKware simplifies API testing and automation with easy-to-write configurations, cross-platform support, and reusable test cases.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          <FeatureCard
            title="Scriptable HTTP Client"
            description="Send requests, handle authentication, and manage complex API workflows with minimal code. Supports OAuth, JWT, and custom auth schemes."
            delay={0}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <path d="M9 16H15" />
              </svg>
            }
          />
          <FeatureCard
            title="YAML-Driven Testing"
            description="Define tests in simple YAML files without complex coding knowledge. Get started in minutes with our intuitive configuration format."
            delay={1}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="15" x2="15" y2="15" />
                <line x1="12" y1="12" x2="12" y2="18" />
              </svg>
            }
          />
          <FeatureCard
            title="Automate Workflows"
            description="Build end-to-end API tests and automations that run across your entire development lifecycle. Chain requests and validate complex scenarios."
            delay={2}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
                <path d="M17 17H7V7h10v10z" />
              </svg>
            }
          />
          <FeatureCard
            title="API Response Validation"
            description="Verify JSON responses against schemas, custom assertions, and expected values with precision. Catch regressions before they reach production."
            delay={3}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            }
          />
          <FeatureCard
            title="Environment Management"
            description="Seamlessly switch between development, staging, and production environments with variable support. Keep sensitive data secure with environment variables."
            delay={4}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            }
          />
          <FeatureCard
            title="CI/CD Integration"
            description="Run tests automatically in your CI/CD pipeline to catch API issues before they reach production. Integrates with GitHub Actions, GitLab CI, and more."
            delay={5}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            }
          />
        </div>
      </Container>
    </section>
  );
}

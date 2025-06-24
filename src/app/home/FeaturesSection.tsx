"use client";

import React from "react";
import { FeatureCard } from "@/components/features/FeatureCard";

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-white dark:bg-black">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
          Powerful & Low-Code API Testing
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-16 mx-auto max-w-3xl">
          CHKware simplifies API testing and automation with easy-to-write configurations, cross-platform support, and reusable test cases.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="Scriptable HTTP Client"
            description="Send requests, handle authentication, and manage complex API workflows with minimal code."
            delay={0}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <path d="M9 16H15" />
              </svg>
            }
          />
          <FeatureCard
            title="YAML-Driven Testing"
            description="Define tests in simple YAML files without complex coding knowledge. Get started in minutes."
            delay={1}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="15" x2="15" y2="15" />
                <line x1="12" y1="12" x2="12" y2="18" />
              </svg>
            }
          />
          <FeatureCard
            title="Automate Workflows"
            description="Build end-to-end API tests and automations that run across your entire development lifecycle."
            delay={2}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
                <path d="M17 17H7V7h10v10z" />
              </svg>
            }
          />
          <FeatureCard
            title="API Response Validation"
            description="Verify JSON responses against schemas, custom assertions, and expected values with precision."
            delay={3}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            }
          />
          <FeatureCard
            title="Environment Management"
            description="Seamlessly switch between development, staging, and production environments with variable support."
            delay={4}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            }
          />
          <FeatureCard
            title="CI/CD Integration"
            description="Run tests automatically in your CI/CD pipeline to catch API issues before they reach production."
            delay={5}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}

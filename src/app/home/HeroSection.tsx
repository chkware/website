"use client";
import React from "react";
// import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, ExternalLink } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-black pt-28 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6">
      <div className="relative mx-auto max-w-6xl">
        {/* Background decorations */}
        <div className="absolute -z-10 -top-24 right-0 left-0 w-full h-full overflow-hidden opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left side hero content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Version badge */}
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 px-3 py-1 text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm mb-6">
              <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              New: CHKware v0.5.0 Released
            </span>

            {/* Headline */}
            <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight text-black dark:text-white mb-6">
              Reduce API{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                regression cost
              </span>{" "}
              and{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                release
              </span>{" "}
              quickly.
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
              Streamline your API development and testing with easy-to-use,
              reusable YAML configuration specs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button asChild className="px-6 py-2 h-12 text-base">
                <Link href="/docs/getting-started">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-6 py-2 h-12 text-base gap-2"
              >
                <Link href="#demo" className="flex items-center">
                  <Code className="h-5 w-5" />
                  View Demo
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right side hero image/demo */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">
                <div className="bg-gray-100 dark:bg-gray-800 p-1 flex items-center space-x-1">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                  <div className="ml-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                    user-login-request.chk
                  </div>
                </div>
                <pre className="bg-gray-900 p-4 rounded-b-lg text-xs sm:text-sm overflow-auto text-gray-100">
                  <code>
                    {`# Do a Login request
---
version: default:http:0.7.2

request:
  url: https://myserver.com/user/login
  method: POST

  body[json]:
    username: emilys
    password: emilyspass

expose:
  - <% _response %>`}
                  </code>
                </pre>
              </div>

              {/* Floating status badge */}
              <div className="absolute -bottom-8 -left-12 rounded-lg bg-white dark:bg-gray-900 p-4 shadow-lg border border-gray-200 dark:border-gray-800 text-center w-60 animate-fadeInUp-delay-2">
                <div className="flex justify-between items-center mb-2">
                  <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-green-600 dark:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="font-medium text-gray-700 dark:text-gray-300">
                    Test passed
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  All 16 assertions passed in 1.2s
                </div>
              </div>

              {/* Floating YAML badge */}
              <div className="absolute -top-6 -right-6 rounded-lg bg-white dark:bg-gray-900 p-3 shadow-lg border border-gray-200 dark:border-gray-800 text-center animate-fadeInUp-delay-1">
                <div className="font-medium text-sm text-gray-800 dark:text-gray-200">
                  Low-code
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  YAML Configuration
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

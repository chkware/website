"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/Container";
import { FileCode, Play, HardDrive, Box } from "lucide-react";
import Link from "next/link";

export function HowItWorksSection() {
  const steps = [
    {
      icon: <FileCode className="h-6 w-6 text-blue-600" />,
      title: "Write Configuration",
      description:
        "Create YAML configuration files defining your API tests, endpoints, and validations.",
    },
    {
      icon: <Play className="h-6 w-6 text-green-600" />,
      title: "Run Tests",
      description:
        "Execute your API tests locally or in CI/CD pipelines with a single command.",
    },
    {
      icon: <HardDrive className="h-6 w-6 text-purple-600" />,
      title: "View Results",
      description:
        "Analyze detailed test results, response times, and validation outcomes.",
    },
    {
      icon: <Box className="h-6 w-6 text-orange-600" />,
      title: "Automate & Integrate",
      description:
        "Schedule periodic tests and integrate with your workflow tools.",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-black">
      <Container size="large">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CHKware</span> Works
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A simple workflow to streamline your API testing process
          </motion.p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 relative overflow-hidden">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Demo Examples Section */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12 mb-12">
          {/* YAML Configuration Example */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-full">
              <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 h-full flex flex-col">
                <div className="bg-gray-800 text-white p-2 text-sm font-mono flex items-center">
                  <FileCode className="h-4 w-4 mr-2" />
                  Workflow-User-Post-Create.chk
                </div>
                <div className="bg-gray-950 p-6 flex-grow">
                  <pre className="text-blue-400 text-sm font-mono">
                    {`# API Workflow configuration
---
version: default:workflow:0.8.0

tasks:
  - name: Login with user's credential
    uses: fetch
    file: "./req-login.chk"

  - name: Get user's me
    uses: fetch
    file: "./req-user-me.chk"
    variables:
      AccessToken: <% _steps.0._response.body.accessToken %>

  - name: Create a post
    uses: fetch
    file: "./req-post-create.chk"
    variables:
      AccessToken: <% _steps.0._response.body.accessToken %>

expose:
  - <% _steps %>`}
                  </pre>
                </div>
              </div>
              <div className="absolute -z-10 inset-0 -m-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 blur-2xl opacity-50 rounded-2xl"></div>
            </div>
          </motion.div>

          {/* Terminal Results */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-full">
              <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 h-full flex flex-col">
                <div className="bg-gray-800 text-white p-2 text-sm font-mono flex items-center">
                  <Play className="h-4 w-4 mr-2" />
                  Terminal
                </div>
                <motion.div
                  className="bg-black p-6 flex-grow"
                  initial={{ opacity: 1 }}
                  whileInView={{ opacity: [1, 0.95, 1] }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 4,
                  }}
                >
                  <pre className="text-sm font-mono leading-relaxed">
                    <span className="text-blue-400">$ chk run workflow.chk</span>{'\n\n'}

                    <span className="text-yellow-400">🚀 CHKware API Testing Suite</span>{'\n'}
                    <span className="text-gray-400">Running workflow: API Testing Pipeline</span>{'\n\n'}

                    <span className="text-green-400">✓ [PASS]</span> <span className="text-white">Login with credentials</span>{'\n'}
                    <span className="text-gray-400">  → POST /api/auth/login</span> <span className="text-green-400">(200ms)</span>{'\n'}
                    <span className="text-gray-400">  → Token validated successfully</span>{'\n\n'}

                    <span className="text-green-400">✓ [PASS]</span> <span className="text-white">Get user profile</span>{'\n'}
                    <span className="text-gray-400">  → GET /api/user/profile</span> <span className="text-green-400">(150ms)</span>{'\n'}
                    <span className="text-gray-400">  → Response schema validated</span>{'\n\n'}

                    <span className="text-green-400">✓ [PASS]</span> <span className="text-white">Create new post</span>{'\n'}
                    <span className="text-gray-400">  → POST /api/posts</span> <span className="text-green-400">(300ms)</span>{'\n'}
                    <span className="text-gray-400">  → Post created with ID: 12345</span>{'\n\n'}

                    <span className="text-green-400">🎉 All tests passed!</span> <span className="text-white">3/3 steps completed</span>{'\n'}
                    <span className="text-gray-400">Total time: 650ms</span>
                  </pre>
                </motion.div>
              </div>
              <div className="absolute -z-10 inset-0 -m-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 blur-2xl opacity-50 rounded-2xl"></div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
              Simple, Powerful, Flexible
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              CHKware streamlines the API testing process with a human-readable
              configuration format and powerful validation capabilities. No
              complex programming required.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Write tests in YAML for readability and ease of use",
                "Validate JSON and XML responses",
                "Chain requests for comprehensive workflow testing",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2 mt-0.5">
                    <svg
                      className="h-3 w-3 text-green-600 dark:text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <Button asChild>
              <Link href="/docs">View Documentation</Link>
            </Button>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border border-gray-200 dark:border-gray-800 p-6">
              <h4 className="text-xl font-bold text-black dark:text-white mb-4">
                What makes CHKware different?
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mr-3">
                    <svg
                      className="h-4 w-4 text-blue-600 dark:text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Low-code approach
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Everyone on your team can write and maintain tests, not
                      just developers
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center mr-3">
                    <svg
                      className="h-4 w-4 text-green-600 dark:text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Comprehensive validation
                    </span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Deep validation capabilities that go beyond simple status
                      code checks
                    </p>
                  </div>
                </li>
              </ul>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

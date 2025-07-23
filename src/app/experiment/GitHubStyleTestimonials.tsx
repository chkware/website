"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/card";
import { GitBranch, Star, Users, Zap, Shield, TrendingUp } from "lucide-react";

const testimonials = [
  {
    author: "Sarah Chen",
    role: "Senior DevOps Engineer",
    company: "TechFlow Inc.",
    githubHandle: "sarahc-dev",
    avatar: "SC",
    pullRequest: {
      title: "feat: integrate CHKware API testing pipeline",
      number: "#1247",
      status: "merged",
      additions: "+127",
      deletions: "-45",
      files: "8 files"
    },
    comment: "This integration reduced our API testing time from 3 hours to 15 minutes. The YAML configuration is incredibly intuitive - even our PM started writing tests! 🚀",
    metrics: {
      testsAdded: "247",
      bugsFound: "23",
      timeReduced: "85%"
    },
    reactions: {
      thumbsUp: 47,
      heart: 12,
      rocket: 8,
      eyes: 3
    }
  },
  {
    author: "Marcus Rodriguez", 
    role: "QA Team Lead",
    company: "DataSync Solutions",
    githubHandle: "marcus-qa",
    avatar: "MR",
    pullRequest: {
      title: "refactor: replace manual tests with CHKware automation",
      number: "#892",
      status: "merged", 
      additions: "+89",
      deletions: "-234",
      files: "12 files"
    },
    comment: "Finally deleted 234 lines of brittle test code and replaced with clean YAML configs. Our test suite is now maintainable and actually catches bugs before production. This is the future of API testing! 💯",
    metrics: {
      testsAdded: "156",
      bugsFound: "31",
      timeReduced: "78%"
    },
    reactions: {
      thumbsUp: 89,
      heart: 23,
      rocket: 15,
      eyes: 7
    }
  },
  {
    author: "Emily Watson",
    role: "CTO", 
    company: "StartupXYZ",
    githubHandle: "emily-cto",
    avatar: "EW",
    pullRequest: {
      title: "ci: add CHKware to deployment pipeline",
      number: "#445",
      status: "merged",
      additions: "+67",
      deletions: "-12", 
      files: "4 files"
    },
    comment: "We caught 15 critical API bugs in the last sprint that would have caused production outages. CHKware literally saved our product launch. The ROI is incredible - we're deploying with confidence now! 🎯",
    metrics: {
      testsAdded: "89",
      bugsFound: "15",
      timeReduced: "92%"
    },
    reactions: {
      thumbsUp: 156,
      heart: 34,
      rocket: 22,
      eyes: 11
    }
  }
];

export function GitHubStyleTestimonials() {
  return (
    <div>
      <Container size="large">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <GitBranch className="w-4 h-4" />
              Merged by 500+ Engineering Teams
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Real Pull Requests, Real Results
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how developers are integrating CHKware into their workflows
            </p>
          </motion.div>
        </div>

        {/* GitHub-style testimonials */}
        <div className="max-w-4xl mx-auto space-y-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
                {/* PR Header */}
                <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <GitBranch className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.pullRequest.title}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.pullRequest.number} • merged by {testimonial.githubHandle}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-green-600 dark:text-green-400">
                        {testimonial.pullRequest.additions}
                      </span>
                      <span className="text-red-600 dark:text-red-400">
                        {testimonial.pullRequest.deletions}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {testimonial.pullRequest.files}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Author */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.author}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          @{testimonial.githubHandle}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>

                  {/* Comment */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {testimonial.comment}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        {testimonial.metrics.testsAdded}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Tests Added
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-600 dark:text-red-400">
                        {testimonial.metrics.bugsFound}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Bugs Found
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {testimonial.metrics.timeReduced}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Time Reduced
                      </div>
                    </div>
                  </div>

                  {/* Reactions */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <span>👍</span>
                      <span>{testimonial.reactions.thumbsUp}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <span>❤️</span>
                      <span>{testimonial.reactions.heart}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <span>🚀</span>
                      <span>{testimonial.reactions.rocket}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <span>👀</span>
                      <span>{testimonial.reactions.eyes}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to merge CHKware into your workflow?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join these developers and start shipping with confidence
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Fork and Get Started
            </button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
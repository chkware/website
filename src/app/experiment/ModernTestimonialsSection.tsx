"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/card";
import { Star, TrendingUp, Users, Zap } from "lucide-react";

const testimonials = [
  {
    quote: "CHKware reduced our API testing time from 3 hours to 15 minutes. Our deployment confidence increased by 300%.",
    author: "Sarah Chen",
    role: "Senior DevOps Engineer",
    company: "TechFlow Inc.",
    avatar: "/images/sarah-chen.jpg",
    companyLogo: "/images/techflow-logo.svg",
    metrics: {
      improvement: "300%",
      timeSaved: "2h 45m",
      testsRun: "1,200+"
    },
    tags: ["DevOps", "CI/CD", "Enterprise"]
  },
  {
    quote: "Finally, a testing tool that doesn't require a PhD in programming. Our QA team adopted it in one day.",
    author: "Marcus Rodriguez",
    role: "QA Team Lead",
    company: "DataSync Solutions",
    avatar: "/images/marcus-rodriguez.jpg", 
    companyLogo: "/images/datasync-logo.svg",
    metrics: {
      improvement: "85%",
      timeSaved: "4h daily",
      testsRun: "500+"
    },
    tags: ["QA", "No-Code", "Team Productivity"]
  },
  {
    quote: "We caught 23 critical API bugs before production last month. CHKware literally saved our product launch.",
    author: "Emily Watson",
    role: "CTO",
    company: "StartupXYZ",
    avatar: "/images/emily-watson.jpg",
    companyLogo: "/images/startupxyz-logo.svg", 
    metrics: {
      improvement: "95%",
      timeSaved: "1 week",
      testsRun: "2,000+"
    },
    tags: ["Startup", "Bug Prevention", "Launch Success"]
  }
];

export function ModernTestimonialsSection() {
  return (
    <div>
      <Container size="large">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              Trusted by 500+ Engineering Teams
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Real Results from Real Teams
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how development teams are shipping faster and more reliably with CHKware
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-200">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {testimonial.metrics.improvement}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Faster
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {testimonial.metrics.timeSaved}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Saved
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {testimonial.metrics.testsRun}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Tests
                    </div>
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <Users className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {testimonial.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: "500+", label: "Engineering Teams" },
            { number: "50K+", label: "Tests Run Daily" },
            { number: "99.9%", label: "Uptime SLA" },
            { number: "4.9/5", label: "Customer Rating" }
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </div>
  );
}
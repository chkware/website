"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { MessageSquare, Heart, Repeat2, Share } from "lucide-react";

const testimonials = [
  {
    id: 1,
    author: "Alex Thompson",
    handle: "@alexdev",
    role: "Senior Backend Engineer",
    company: "TechCorp",
    avatar: "AT",
    time: "2h",
    content: "Just deployed our API changes with 100% confidence thanks to @chkware. The YAML configs are so intuitive that even our PM started writing tests! 🚀",
    likes: 47,
    retweets: 12,
    replies: 8,
    verified: true
  },
  {
    id: 2,
    author: "Maria Santos",
    handle: "@maria_codes",
    role: "DevOps Lead",
    company: "StartupXYZ",
    avatar: "MS", 
    time: "4h",
    content: "Before CHKware: 3 hours of manual API testing before each release 😩\n\nAfter CHKware: 5 minutes of automated testing with better coverage 🎉\n\nThis is a game changer for our CI/CD pipeline!",
    likes: 89,
    retweets: 23,
    replies: 15,
    verified: true
  },
  {
    id: 3,
    author: "David Kim",
    handle: "@davidk_tech",
    role: "QA Engineer", 
    company: "DataFlow Inc",
    avatar: "DK",
    time: "6h",
    content: "Our team caught 15 critical bugs in production APIs last week using CHKware. The detailed validation reports saved us from a potential outage. Worth every penny! 💯",
    likes: 156,
    retweets: 34,
    replies: 22,
    verified: true
  }
];

export function SlackStyleTestimonials() {
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
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What developers are saying
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Real conversations from the developer community
            </p>
          </motion.div>
        </div>

        {/* Tweet-style testimonials */}
        <div className="max-w-2xl mx-auto space-y-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </span>
                    {testimonial.verified && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    <span className="text-gray-500 dark:text-gray-400">
                      {testimonial.handle}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500">·</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {testimonial.time}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-gray-900 dark:text-white mb-4 leading-relaxed whitespace-pre-line">
                {testimonial.content}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-6 text-gray-500 dark:text-gray-400">
                <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{testimonial.replies}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                  <Repeat2 className="w-4 h-4" />
                  <span className="text-sm">{testimonial.retweets}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{testimonial.likes}</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Join the conversation and see what CHKware can do for your team
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Start Your Free Trial
          </button>
        </motion.div>
      </Container>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/card";
import { Play, Star, Building, Users, TrendingUp } from "lucide-react";

const videoTestimonials = [
  {
    id: 1,
    thumbnail: "/images/testimonial-video-1.jpg",
    duration: "2:34",
    title: "How TechFlow reduced testing time by 80%",
    author: "Sarah Chen",
    role: "Senior DevOps Engineer",
    company: "TechFlow Inc.",
    companySize: "500+ employees",
    industry: "FinTech",
    results: {
      timeSaved: "80%",
      bugsCaught: "150+",
      teamProductivity: "3x"
    },
    preview: "We were spending 4 hours on manual API testing before each release. Now it takes 45 minutes with better coverage...",
    tags: ["Enterprise", "DevOps", "CI/CD"]
  },
  {
    id: 2,
    thumbnail: "/images/testimonial-video-2.jpg", 
    duration: "1:47",
    title: "From manual testing to automated confidence",
    author: "Marcus Rodriguez",
    role: "QA Team Lead", 
    company: "DataSync Solutions",
    companySize: "50-200 employees",
    industry: "SaaS",
    results: {
      timeSaved: "75%",
      bugsCaught: "89+",
      teamProductivity: "2.5x"
    },
    preview: "Our QA team was overwhelmed with manual testing. CHKware changed everything - now we focus on strategy instead of repetitive tasks...",
    tags: ["Mid-size", "QA", "Automation"]
  },
  {
    id: 3,
    thumbnail: "/images/testimonial-video-3.jpg",
    duration: "3:12", 
    title: "Scaling API testing for rapid growth",
    author: "Emily Watson",
    role: "CTO",
    company: "StartupXYZ",
    companySize: "10-50 employees", 
    industry: "E-commerce",
    results: {
      timeSaved: "90%",
      bugsCaught: "200+",
      teamProductivity: "4x"
    },
    preview: "As a startup, we needed to move fast without breaking things. CHKware gave us the confidence to deploy multiple times per day...",
    tags: ["Startup", "Growth", "Speed"]
  }
];

export function VideoTestimonials() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

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
            <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Play className="w-4 h-4" />
              Customer Success Stories
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              See CHKware in Action
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Watch how engineering teams transformed their API testing workflows
            </p>
          </motion.div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {videoTestimonials.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300">
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 cursor-pointer group"
                     onClick={() => setSelectedVideo(video.id)}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-blue-600 ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {video.duration}
                  </div>
                </div>

                <div className="p-6">
                  {/* Title */}
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {video.title}
                  </h3>

                  {/* Preview */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {video.preview}
                  </p>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm font-bold text-green-600 dark:text-green-400">
                        {video.results.timeSaved}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Time Saved
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {video.results.bugsCaught}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Bugs Caught
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-purple-600 dark:text-purple-400">
                        {video.results.teamProductivity}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Productivity
                      </div>
                    </div>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {video.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {video.author}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {video.role} at {video.company}
                      </div>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      {video.industry}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {video.companySize}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
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
          className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to transform your API testing?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join these successful teams and see similar results in your organization
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Start Your Success Story
          </button>
        </motion.div>
      </Container>
    </div>
  );
}
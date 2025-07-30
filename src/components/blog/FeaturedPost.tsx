"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/blog-utils";
import { Calendar, Clock } from "lucide-react";

interface FeaturedPostProps {
  post: BlogPost;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <Link href={`/blog/${post.slug}`} className="block group">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Featured Image */}
          <div className="relative h-48 md:h-64 lg:h-80 bg-gradient-to-br from-green-400 via-blue-600 to-purple-600 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
              <div className="text-xs md:text-sm font-medium mb-1 md:mb-2 opacity-90">FEATURED</div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 leading-tight">{post.title}</h2>
              <div className="space-y-1 text-xs md:text-sm opacity-90">
                {post.tags.slice(0, 3).map((tag) => (
                  <div key={tag} className="flex items-center">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full mr-2"></span>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Content */}
          <div className="mt-4 lg:mt-0">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-blue-600 transition-colors leading-tight">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
              {post.description}
            </p>
            <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500 gap-3 md:gap-4">
              <div className="flex items-center">
                <span className="font-medium uppercase tracking-wide">
                  {post.tags[0] || "ARTICLE"}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
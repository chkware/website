"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogPost } from "@/lib/blog-utils";
import { Calendar, Clock, Tag } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Generate gradient based on index for visual variety
  const getGradient = (index: number) => {
    const gradients = [
      "from-blue-600 via-blue-700 to-blue-800",
      "from-purple-600 via-blue-600 to-blue-700",
      "from-pink-400 via-purple-500 to-blue-600",
      "from-green-400 via-blue-500 to-purple-600",
      "from-blue-800 via-blue-900 to-black",
      "from-indigo-600 via-purple-600 to-pink-600"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Article Image */}
        <div className="relative h-40 md:h-48 mb-3 md:mb-4 rounded-2xl overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)}`}>
            <div className="absolute top-3 md:top-4 left-3 md:left-4 text-white">
              <div className="text-xs font-medium mb-1 opacity-90 uppercase tracking-wide">
                {post.tags[0] || "ARTICLE"}
              </div>
            </div>
            <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 text-white">
              <div className="text-base md:text-lg font-bold leading-tight">{post.title.split(' ').slice(0, 3).join(' ')}</div>
              {post.tags.length > 1 && (
                <div className="text-xs opacity-75 mt-1">
                  {post.tags.slice(1, 3).join(' • ')}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag className="h-3 w-3 text-gray-400" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {post.tags[0] || "ARTICLE"}
            </span>
          </div>
          
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
            {post.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {post.description}
          </p>
          
          <div className="flex flex-wrap items-center text-xs text-gray-500 gap-2 md:gap-3">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
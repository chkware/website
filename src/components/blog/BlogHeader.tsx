"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Calendar, Clock, ArrowLeft, Tag, User } from "lucide-react";
import { BlogPost } from "@/data/blog-posts";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface BlogHeaderProps {
  post: BlogPost;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  // Format date in a more readable way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-white dark:bg-black relative overflow-hidden">
      <Container size="large">
        <div className="max-w-4xl mx-auto">
          {/* Back to blog link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to all articles</span>
            </Link>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {post.tags.map((tag, index) => (
              <Link
                key={index}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors"
              >
                <Tag className="h-3.5 w-3.5 mr-1.5" />
                {tag}
              </Link>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Meta information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 mb-10"
          >
            {/* Author with link */}
            <div className="flex items-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-white dark:border-gray-800 shadow-sm">
                <ImageWithFallback
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  fallbackSrc="/images/placeholder.svg"
                  className="object-cover"
                />
              </div>
              <div>
                <Link
                  href={`/blog?author=${encodeURIComponent(post.author.name)}`}
                  className="flex items-center font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <User className="h-3.5 w-3.5 mr-1.5 text-blue-600 dark:text-blue-400" />
                  {post.author.name}
                </Link>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {post.author.role}
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(post.date)}</span>
            </div>

            {/* Reading time */}
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-2" />
              <span>{post.readingTime}</span>
            </div>
          </motion.div>

          {/* Cover image with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden mb-8 shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
            <ImageWithFallback
              src={post.coverImage}
              alt={post.title}
              fill
              fallbackSrc="/images/placeholder.svg"
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </Container>

      {/* Enhanced background decorations */}
      <div className="absolute -z-10 -top-24 right-0 left-0 w-full h-full overflow-hidden opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
}

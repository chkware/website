"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BlogPost } from "@/lib/blog-utils";
import { Tag, ArrowRight } from "lucide-react";

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPostSlug?: string;
}

export function RelatedPosts({ posts, currentPostSlug }: RelatedPostsProps) {
  // Filter out the current post if provided
  const filteredPosts = currentPostSlug 
    ? posts.filter(post => post.slug !== currentPostSlug)
    : posts;

  // Limit to 3 posts
  const displayPosts = filteredPosts.slice(0, 3);

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <Container size="large">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center mb-12">
            <div className="w-1 h-8 bg-blue-600 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Related Articles</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post, index) => (
              <RelatedPostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

interface RelatedPostCardProps {
  post: BlogPost;
  index: number;
}

function RelatedPostCard({ post, index }: RelatedPostCardProps) {
  // Generate gradient based on index for visual variety
  const getGradient = (index: number) => {
    const gradients = [
      "from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-600",
      "from-purple-100 to-purple-200 dark:from-gray-700 dark:to-gray-600", 
      "from-green-100 to-green-200 dark:from-gray-700 dark:to-gray-600",
      "from-pink-100 to-pink-200 dark:from-gray-700 dark:to-gray-600",
      "from-indigo-100 to-indigo-200 dark:from-gray-700 dark:to-gray-600",
      "from-yellow-100 to-yellow-200 dark:from-gray-700 dark:to-gray-600"
    ];
    return gradients[index % gradients.length];
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className={`relative h-48 bg-gradient-to-br ${getGradient(index)}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl text-gray-400 dark:text-gray-500">📄</div>
          </div>
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-2 py-1 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-md backdrop-blur-sm">
              <Tag className="h-3 w-3 mr-1" />
              {post.tags[0] || "Article"}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            {post.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-md"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {post.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full mr-2 flex items-center justify-center">
                <span className="text-xs font-medium">
                  {post.authors[0]?.name?.charAt(0) || "?"}
                </span>
              </div>
              <span>{post.authors[0]?.name || "Unknown"}</span>
            </div>

            <div className="flex items-center">
              <span className="mr-2">{post.readingTime}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
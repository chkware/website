"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { BlogPost } from "@/data/blog-posts";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

export function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  // Use the slug property from the blog post data
  const slug = post.slug;

  // Get a short excerpt from the content
  const getExcerpt = (content: string, maxLength: number = 160) => {
    // Remove markdown formatting
    const plainText = content
      .replace(/#+\s(.*)/g, '$1') // Remove headings
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.*?)\*/g, '$1') // Remove italic
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/^\s*-\s*(.*$)/gm, '$1'); // Remove list markers

    // Get first paragraph or truncate
    const firstParagraph = plainText.split('\n\n')[0];

    if (firstParagraph.length <= maxLength) {
      return firstParagraph;
    }

    return firstParagraph.substring(0, maxLength) + '...';
  };

  // Format date in a more readable way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "group",
        featured ? "col-span-full" : "col-span-full"
      )}
    >
      <article className={cn(
        "relative overflow-hidden transition-all duration-300",
        "border-b border-gray-100 dark:border-gray-800 pb-8 mb-8",
        featured ? "grid grid-cols-1 md:grid-cols-12 gap-8" : "flex flex-col"
      )}>
        {/* Image container with link */}
        {featured ? (
          <Link href={`/blog/${slug}`} className={cn(
            "block relative overflow-hidden md:col-span-7 h-[400px] md:h-[500px] rounded-lg",
          )}>
            <ImageWithFallback
              src={post.coverImage}
              alt={post.title}
              fill
              fallbackSrc="/images/placeholder.svg"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Featured badge */}
            <div className="absolute top-4 left-4 bg-gray-900 dark:bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
              Featured
            </div>
          </Link>
        ) : post.coverImage ? (
          <Link href={`/blog/${slug}`} className={cn(
            "block relative overflow-hidden h-[200px] md:h-[220px] mb-6 rounded-lg",
            "w-full md:w-1/3 md:float-right md:ml-6 md:mb-2"
          )}>
            <ImageWithFallback
              src={post.coverImage}
              alt={post.title}
              fill
              fallbackSrc="/images/placeholder.svg"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        ) : null}

        {/* Content */}
        <div className={cn(
          "flex flex-col",
          featured ? "md:col-span-5" : "w-full"
        )}>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag, i) => (
              <Link
                key={i}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Link>
            ))}
          </div>

          {/* Title with link */}
          <Link href={`/blog/${slug}`}>
            <h3 className={cn(
              "font-bold text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors",
              featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
            )}>
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
            {getExcerpt(post.content, featured ? 200 : 160)}
          </p>

          <div className="mt-auto">
            {/* Author and meta info in one line */}
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex items-center">
                <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                  <ImageWithFallback
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    fallbackSrc="/images/placeholder.svg"
                    className="object-cover"
                  />
                </div>
                <div className="mr-4">
                  <span className="block text-sm font-medium text-gray-900 dark:text-white">
                    {post.author.name}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{formatDate(post.date)}</span>
                  <span className="mx-1">·</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BlogPost } from "@/lib/blog-utils";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RelatedPosts } from "./RelatedPosts";
import parse from "html-react-parser";

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const [readingProgress, setReadingProgress] = useState(0);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Convert markdown to HTML (simplified)
  const markdownToHtml = (content: string) => {
    // First, handle code blocks to protect them from other replacements
    const codeBlocks: string[] = [];
    let processedContent = content.replace(/```([\s\S]*?)```/g, (match, code) => {
      const index = codeBlocks.length;
      codeBlocks.push(`<pre class="bg-gray-100 dark:bg-gray-800 rounded-lg md:rounded-xl p-4 md:p-6 my-4 md:my-6 overflow-x-auto"><code class="text-xs md:text-sm text-gray-800 dark:text-gray-200">${code}</code></pre>`);
      return `__CODE_BLOCK_${index}__`;
    });

    // Process other markdown elements
    processedContent = processedContent
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl md:text-4xl font-bold mt-8 md:mt-12 mb-4 md:mb-6 text-gray-900 dark:text-white leading-tight">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl md:text-3xl font-bold mt-6 md:mt-10 mb-3 md:mb-5 text-gray-900 dark:text-white leading-tight">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg md:text-2xl font-bold mt-5 md:mt-8 mb-3 md:mb-4 text-gray-900 dark:text-white leading-tight">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">$1</a>');

    // Handle lists
    processedContent = processedContent.replace(/^\s*-\s*(.*$)/gm, '<li class="mb-2 text-base md:text-lg text-gray-700 dark:text-gray-300">$1</li>');
    processedContent = processedContent.replace(/(<li>.*?<\/li>\s*)+/g, '<ul class="list-disc pl-4 md:pl-6 mb-4 md:mb-6 space-y-2">$&</ul>');

    // Convert remaining lines to paragraphs
    const lines = processedContent.split('\n');
    const processedLines = lines.map(line => {
      const trimmedLine = line.trim();
      // Skip empty lines and lines that are already HTML elements
      if (!trimmedLine || trimmedLine.match(/^<[hpuli\d]|<pre|<\/|__CODE_BLOCK_/)) {
        return line;
      }
      // Convert regular text lines to paragraphs
      return `<p class="mb-4 md:mb-6 text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">${line}</p>`;
    });

    processedContent = processedLines.join('\n');

    // Restore code blocks
    codeBlocks.forEach((codeBlock, index) => {
      processedContent = processedContent.replace(`__CODE_BLOCK_${index}__`, codeBlock);
    });

    return processedContent;
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Container size="large">
          <div className="text-center">
            <div className="text-6xl mb-6">📄</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">The blog post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Button asChild>
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header */}
      <section className="pt-20 md:pt-24 pb-8 md:pb-12 bg-white dark:bg-gray-900">
        <Container size="large">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto px-4 md:px-0"
          >
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="space-y-4 md:space-y-0 md:flex md:flex-wrap md:items-center md:gap-6 mb-8 md:mb-12">
              <div className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-300 dark:bg-gray-600 rounded-full mr-3 flex items-center justify-center">
                  <User className="h-5 w-5 md:h-6 md:w-6 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                    {post.authors[0]?.name || "Unknown"}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {post.authors[0]?.title || "Author"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6 text-sm md:text-base">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  {formatDate(post.date)}
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  {post.readingTime}
                </div>
              </div>

              <div className="flex items-center gap-2 md:ml-auto">
                <Button variant="outline" size="sm" className="text-xs md:text-sm">
                  <Bookmark className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" className="text-xs md:text-sm">
                  <Share2 className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-48 md:h-64 lg:h-96 xl:h-[500px] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-12">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl md:text-6xl lg:text-8xl text-blue-600/20 dark:text-blue-400/20">📝</div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-8 md:py-12">
        <Container size="large">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto px-4 md:px-0"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-sm">
              <article className="prose prose-sm md:prose-lg dark:prose-invert max-w-none">
                {parse(markdownToHtml(post.content))}
              </article>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Author Section */}
      <section className="py-8 md:py-12 bg-white dark:bg-gray-900">
        <Container size="large">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto px-4 md:px-0"
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-8 w-8 md:h-10 md:w-10 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {post.authors[0]?.name || "Unknown"}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {post.authors[0]?.bio || "Writer and developer passionate about creating great content and tools for the community."}
                  </p>
                  <Button variant="outline" size="sm" className="text-xs md:text-sm">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <RelatedPosts posts={relatedPosts} currentPostSlug={post.slug} />
      )}
    </div>
  );
}
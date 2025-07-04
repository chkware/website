"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { blogPosts } from "@/data/blog-posts";
import { BlogPostCard } from "@/components/ui/blog-post-card";
import { FeaturedBlogSection } from "@/components/blog/featured-blog-section";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get featured post (most recent)
  const featuredPost = sortedPosts[0];

  // Get remaining posts for pagination
  const remainingPosts = sortedPosts.slice(1);

  // Calculate total pages
  const totalPages = Math.ceil(remainingPosts.length / postsPerPage);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = remainingPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      {/* Header Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-white dark:bg-black relative overflow-hidden border-b border-gray-100 dark:border-gray-800">
        <Container size="large">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Latest news, updates, and insights about CHKware and API testing
            </p>
          </motion.div>
        </Container>

        {/* Background decorations - subtle */}
        <div className="absolute -z-10 -top-24 right-0 left-0 w-full h-full overflow-hidden opacity-20 dark:opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gray-300 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
      </section>

      {/* Featured Post Section */}
      <FeaturedBlogSection
        featuredPost={{
          title: featuredPost.title,
          excerpt: featuredPost.excerpt,
          authorName: featuredPost.author.name,
          authorImageSrc: featuredPost.author.avatar,
          publicationDate: featuredPost.date,
          readTimeMinutes: featuredPost.readingTime,
          slug: featuredPost.slug,
          imageUrl: featuredPost.coverImage,
          heroImageAlt: featuredPost.title
        }}
        className="border-b border-gray-100 dark:border-gray-800"
      />

      {/* Latest Articles */}
      <section className="py-12 bg-white dark:bg-black">
        <Container size="large">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Latest Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogPostCard
                  title={post.title}
                  excerpt={post.excerpt}
                  authorName={post.author.name}
                  authorImageSrc={post.author.avatar}
                  publicationDate={post.date}
                  readTimeMinutes={post.readingTime}
                  slug={post.slug}
                  thumbnailUrl={post.coverImage}
                  tags={post.tags}
                />
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 border-t border-gray-100 dark:border-gray-800 pt-12">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div className="flex items-center space-x-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        currentPage === i + 1
                          ? "bg-gray-900 dark:bg-gray-700 text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      aria-label={`Page ${i + 1}`}
                      aria-current={currentPage === i + 1 ? "page" : undefined}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

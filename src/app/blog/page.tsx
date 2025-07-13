"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BlogPostCard } from "@/components/ui/blog-post-card";
import { FeaturedBlogSection } from "@/components/blog/featured-blog-section";
import { ChevronLeft, ChevronRight, Tag, Users, Calendar } from "lucide-react";
import { getAllBlogPosts, BlogPost } from "@/lib/blog-utils";
import Link from "next/link";

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 6;

  // Load blog posts
  useEffect(() => {
    // Get all blog posts
    const posts = getAllBlogPosts();
    setBlogPosts(posts);
    setIsLoading(false);
  }, []);

  // Get featured post (most recent) and remaining posts
  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null;
  const remainingPosts = blogPosts.length > 0 ? blogPosts.slice(1) : [];

  // Calculate total pages
  const totalPages = Math.ceil(remainingPosts.length / postsPerPage);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = remainingPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

  // No posts state
  if (blogPosts.length === 0) {
    return (
      <Container size="large" className="py-32">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No Blog Posts Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            There are no blog posts available at the moment. Please check back later.
          </p>
        </div>
      </Container>
    );
  }

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
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Latest news, updates, and insights about CHKware and API testing
            </p>

            {/* Blog Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="/blog/tags"
                className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Tag className="h-4 w-4 mr-2" />
                <span>Browse by Tags</span>
              </Link>
              <Link
                href="/blog/authors"
                className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Users className="h-4 w-4 mr-2" />
                <span>Meet Our Authors</span>
              </Link>
              <Link
                href="/blog/archive"
                className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Calendar className="h-4 w-4 mr-2" />
                <span>Archive</span>
              </Link>
            </div>
          </motion.div>
        </Container>

        {/* Background decorations - subtle */}
        <div className="absolute -z-10 -top-24 right-0 left-0 w-full h-full overflow-hidden opacity-20 dark:opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gray-300 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
      </section>

      {/* Featured Post Section */}
      {featuredPost && (
        <FeaturedBlogSection
          featuredPost={{
            title: featuredPost.title,
            excerpt: featuredPost.description,
            authorName: featuredPost.authors[0]?.name || "Unknown",
            authorImageSrc: featuredPost.authors[0]?.image_url || "/images/placeholder.svg",
            publicationDate: featuredPost.date,
            readTimeMinutes: featuredPost.readingTime,
            slug: featuredPost.slug,
            imageUrl: featuredPost.image || "",
            heroImageAlt: featuredPost.title
          }}
          className="border-b border-gray-100 dark:border-gray-800"
        />
      )}

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
                  excerpt={post.description}
                  authorName={post.authors[0]?.name || "Unknown"}
                  authorImageSrc={post.authors[0]?.image_url || "/images/placeholder.svg"}
                  publicationDate={post.date}
                  readTimeMinutes={post.readingTime}
                  slug={post.slug}
                  thumbnailUrl={post.image || ""}
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

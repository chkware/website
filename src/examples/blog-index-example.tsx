import React from "react";
import { FeaturedBlogSection } from "@/components/blog/featured-blog-section";

// Example data for a featured blog post
const exampleFeaturedPost = {
  title: "Getting Started with CHKware for API Testing",
  excerpt: "Learn how to set up CHKware and create your first API test in minutes. This guide covers installation, configuration, and basic usage.",
  authorName: "John Doe",
  authorImageSrc: "/images/authors/john-doe.jpg",
  publicationDate: "2025-06-15",
  readTimeMinutes: "5 min read",
  slug: "getting-started-with-chkware",
  imageUrl: "/images/blog/api-testing.jpg",
  heroImageAlt: "API Testing with CHKware"
};

export default function BlogIndexExample() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Page header */}
      <header className="pt-32 pb-16 md:pt-40 md:pb-20 bg-white dark:bg-black relative overflow-hidden border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Latest news, updates, and insights about CHKware and API testing
            </p>
          </div>
        </div>

        {/* Background decorations - subtle */}
        <div className="absolute -z-10 -top-24 right-0 left-0 w-full h-full overflow-hidden opacity-20 dark:opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gray-300 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
      </header>

      {/* Featured Blog Section */}
      <FeaturedBlogSection
        featuredPost={exampleFeaturedPost}
        className="border-b border-gray-100 dark:border-gray-800"
      />

      {/* Regular blog posts would go here */}
      <section className="py-12 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center">
            <div className="h-6 w-1 bg-gray-900 dark:bg-gray-100 rounded mr-3"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Latest Articles
            </h2>
          </div>

          {/* Blog post grid would go here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
              Blog Post Card 1
            </div>
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
              Blog Post Card 2
            </div>
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
              Blog Post Card 3
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

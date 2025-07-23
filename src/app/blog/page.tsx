"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { getAllBlogPosts, BlogPost, getAllTags } from "@/lib/blog-utils";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { BlogListingSkeleton } from "@/components/blog/BlogSkeleton";


export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load blog posts and categories
  useEffect(() => {
    const posts = getAllBlogPosts();
    const tags = getAllTags();
    
    setBlogPosts(posts);
    setFilteredPosts(posts);
    setCategories(tags.map(tag => tag.name));
    setIsLoading(false);
  }, []);

  // Handle category filtering
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === "All") {
      setFilteredPosts(blogPosts);
    } else {
      const filtered = blogPosts.filter(post => 
        post.tags.includes(category)
      );
      setFilteredPosts(filtered);
    }
  };

  // Get featured post (most recent) and other posts
  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  // Loading state
  if (isLoading) {
    return <BlogListingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12">
        <Container size="large">
          <div className="max-w-6xl mx-auto px-4 md:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Blog</h1>
              <p className="text-gray-600 text-base md:text-lg">Read about our latest announcements.</p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Divider Line */}
      <div className="border-t border-gray-200"></div>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-8 md:py-12">
          <Container size="large">
            <div className="max-w-6xl mx-auto px-4 md:px-0">
              <FeaturedPost post={featuredPost} />
            </div>
          </Container>
        </section>
      )}

      {/* Filter Tabs */}
      <section className="py-6 md:py-8 border-t border-gray-200">
        <Container size="large">
          <div className="max-w-6xl mx-auto px-4 md:px-0">
            <BlogFilters
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </Container>
      </section>

      {/* Articles Grid */}
      <section className="pb-12 md:pb-16">
        <Container size="large">
          <div className="max-w-6xl mx-auto px-4 md:px-0">
            {otherPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {otherPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 md:py-12">
                <div className="text-4xl md:text-6xl mb-4">📝</div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {activeCategory === "All" 
                    ? "There are no blog posts available at the moment."
                    : `No articles found in the "${activeCategory}" category.`
                  }
                </p>
              </div>
            )}

            {/* Show More Button */}
            <div className="text-center mt-8 md:mt-12">
              <button className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm md:text-base">
                SHOW MORE
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

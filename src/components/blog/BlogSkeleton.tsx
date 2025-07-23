"use client";

import React from "react";
import { Container } from "@/components/ui/Container";

// Skeleton for individual blog card
export function BlogCardSkeleton() {
  return (
    <div className="group animate-pulse">
      {/* Article Image Skeleton */}
      <div className="relative h-40 md:h-48 mb-3 md:mb-4 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>

      {/* Article Content Skeleton */}
      <div>
        {/* Tag skeleton */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="space-y-2 mb-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
        
        {/* Meta info skeleton */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton for featured post
export function FeaturedPostSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
        {/* Featured Image Skeleton */}
        <div className="relative h-48 md:h-64 lg:h-80 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>

        {/* Featured Content Skeleton */}
        <div className="mt-4 lg:mt-0">
          {/* Title skeleton */}
          <div className="space-y-3 mb-4">
            <div className="h-6 md:h-8 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-6 md:h-8 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
            <div className="h-6 md:h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/5"></div>
          </div>
          
          {/* Description skeleton */}
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
          
          {/* Meta info skeleton */}
          <div className="flex items-center gap-4">
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-14 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton for blog listing page
export function BlogListingSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12">
        <Container size="large">
          <div className="max-w-6xl mx-auto px-4 md:px-0">
            <div className="animate-pulse">
              <div className="h-8 md:h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
              <div className="h-4 md:h-5 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
            </div>
          </div>
        </Container>
      </section>

      {/* Divider Line */}
      <div className="border-t border-gray-200"></div>

      {/* Featured Article Skeleton */}
      <section className="py-8 md:py-12">
        <Container size="large">
          <div className="max-w-6xl mx-auto px-4 md:px-0">
            <FeaturedPostSkeleton />
          </div>
        </Container>
      </section>

      {/* Filter Tabs Skeleton */}
      <section className="py-6 md:py-8 border-t border-gray-200">
        <Container size="large">
          <div className="max-w-6xl mx-auto px-4 md:px-0">
            <div className="flex gap-4 md:gap-6 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Articles Grid Skeleton */}
      <section className="pb-12 md:pb-16">
        <Container size="large">
          <div className="max-w-6xl mx-auto px-4 md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

// Skeleton for blog post detail page
export function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Skeleton */}
      <section className="pt-20 md:pt-24 pb-8 md:pb-12 bg-white dark:bg-gray-900">
        <Container size="large">
          <div className="max-w-4xl mx-auto px-4 md:px-0 animate-pulse">
            {/* Back Link Skeleton */}
            <div className="flex items-center mb-8">
              <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>

            {/* Tags Skeleton */}
            <div className="flex gap-2 mb-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              ))}
            </div>

            {/* Title Skeleton */}
            <div className="space-y-3 mb-8">
              <div className="h-8 md:h-12 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-8 md:h-12 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
              <div className="h-8 md:h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/5"></div>
            </div>

            {/* Meta Info Skeleton */}
            <div className="space-y-4 md:space-y-0 md:flex md:items-center md:gap-6 mb-8">
              <div className="flex items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 dark:bg-gray-700 rounded-full mr-3"></div>
                <div>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>

            {/* Hero Image Skeleton */}
            <div className="h-48 md:h-64 lg:h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl md:rounded-3xl mb-8"></div>
          </div>
        </Container>
      </section>

      {/* Article Content Skeleton */}
      <section className="py-8 md:py-12">
        <Container size="large">
          <div className="max-w-4xl mx-auto px-4 md:px-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-sm">
              <div className="animate-pulse space-y-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${
                    i % 4 === 0 ? 'w-full' : 
                    i % 4 === 1 ? 'w-5/6' : 
                    i % 4 === 2 ? 'w-4/6' : 'w-3/6'
                  }`}></div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
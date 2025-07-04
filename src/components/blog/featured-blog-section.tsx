import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { cn } from "@/lib/utils";

interface FeaturedBlogSectionProps {
  featuredPost: {
    title: string;
    excerpt: string;
    authorName: string;
    authorImageSrc: string;
    publicationDate: string;
    readTimeMinutes: string;
    slug: string;
    imageUrl: string;
    heroImageAlt?: string;
  };
  className?: string;
}

export function FeaturedBlogSection({
  featuredPost,
  className,
}: FeaturedBlogSectionProps) {
  // Format date in a more readable way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className={cn("py-12 bg-white dark:bg-black", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center">
          <div className="h-6 w-1 bg-gray-900 dark:bg-gray-100 rounded mr-3"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Featured Story
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl shadow-lg"
        >
          {/* Two-column layout on larger screens, stacked on smaller screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-0">
            {/* Image column */}
            <div className="relative h-[300px] md:h-[500px] w-full md:col-span-1 lg:col-span-7 overflow-hidden">
              <ImageWithFallback
                src={featuredPost.imageUrl}
                alt={featuredPost.heroImageAlt || featuredPost.title}
                fill
                fallbackSrc="/images/placeholder.svg"
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
              />

              {/* Gradient overlay for better text readability if text is overlaid */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-black/30 md:to-transparent"></div>

              {/* Featured badge */}
              <div className="absolute top-4 left-4 bg-gray-900 dark:bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                Featured
              </div>
            </div>

            {/* Content column */}
            <div className="relative p-6 md:p-8 lg:p-12 bg-white dark:bg-gray-900 md:col-span-1 lg:col-span-5 flex flex-col">
              {/* Title */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {featuredPost.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                {featuredPost.excerpt}
              </p>

              {/* Meta information */}
              <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  <span>{formatDate(featuredPost.publicationDate)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1.5" />
                  <span>{featuredPost.readTimeMinutes}</span>
                </div>
              </div>

              {/* Author information */}
              <div className="flex items-center mb-8">
                <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 border border-gray-200 dark:border-gray-700">
                  <ImageWithFallback
                    src={featuredPost.authorImageSrc}
                    alt={featuredPost.authorName}
                    fill
                    fallbackSrc="/images/placeholder.svg"
                    className="object-cover"
                  />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {featuredPost.authorName}
                </span>
              </div>

              {/* Read More button */}
              <div className="mt-auto">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href={`/blog/${featuredPost.slug}`} className="flex items-center justify-center">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

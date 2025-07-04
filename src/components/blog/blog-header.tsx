import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArrowLeft, Calendar, Clock, User, Bookmark } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface BlogHeaderProps {
  title: string;
  authorName: string;
  authorImageSrc: string;
  authorRole: string;
  publicationDate: string;
  readTimeMinutes: string;
  coverImageSrc: string;
}

export function BlogHeader({
  title,
  authorName,
  authorImageSrc,
  authorRole,
  publicationDate,
  readTimeMinutes,
  coverImageSrc,
}: BlogHeaderProps) {
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
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Minimal sticky header - appears on scroll */}
      <div className="sticky top-0 z-40 w-full bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transform transition-all duration-300 opacity-0 -translate-y-full header-sticky">
        <Container size="blog">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <span className="text-lg font-bold text-gray-900 dark:text-white">CHKware</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/blog"
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                Back to Blog
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <Container size="blog">
        <div>
          {/* Back to blog link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to all articles</span>
            </Link>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight"
          >
            {title}
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`/blog?author=${encodeURIComponent(authorName)}`} className="block">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-white dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                        <ImageWithFallback
                          src={authorImageSrc}
                          alt={authorName}
                          fill
                          fallbackSrc="/images/placeholder.svg"
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View all posts by {authorName}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div>
                <Link
                  href={`/blog?author=${encodeURIComponent(authorName)}`}
                  className="flex items-center font-medium text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  {authorName}
                </Link>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {authorRole}
                </div>
              </div>
            </div>

            {/* Date */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(publicationDate)}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Published on {formatDate(publicationDate)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Reading time */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{readTimeMinutes}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Estimated reading time</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Save button */}
            <div className="ml-auto">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                <span>Save</span>
              </Button>
            </div>
          </motion.div>

          {/* Cover image with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden mb-8 shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent z-10"></div>
            <ImageWithFallback
              src={coverImageSrc}
              alt={title}
              fill
              fallbackSrc="/images/placeholder.svg"
              className="object-cover object-center"
              priority
            />
          </motion.div>
        </div>
      </Container>

      {/* Background decorations */}
      <div className="absolute -z-10 -top-24 right-0 left-0 w-full h-full overflow-hidden opacity-20 dark:opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gray-300 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>
    </section>
  );
}

// Add this script to make the header sticky on scroll
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header-sticky');
    const handleScroll = () => {
      if (window.scrollY > 300) {
        header?.classList.remove('opacity-0', '-translate-y-full');
        header?.classList.add('opacity-100', 'translate-y-0');
      } else {
        header?.classList.add('opacity-0', '-translate-y-full');
        header?.classList.remove('opacity-100', 'translate-y-0');
      }
    };
    window.addEventListener('scroll', handleScroll);
  });
}

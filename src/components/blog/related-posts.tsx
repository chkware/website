import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { cn } from "@/lib/utils";

interface RelatedPostsProps {
  posts: Array<{
    title: string;
    excerpt: string;
    authorName: string;
    authorImageSrc: string;
    publicationDate: string;
    readTimeMinutes: string;
    slug: string;
    thumbnailUrl?: string;
    tags?: string[];
  }>;
  className?: string;
}

export function RelatedPosts({ posts, className }: RelatedPostsProps) {
  // Format date in a more readable way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className={cn("py-12 md:py-16 bg-gray-50 dark:bg-gray-900", className)}>
      <Container size="blog">
        <div className="max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <div className="h-6 w-1 bg-gray-900 dark:bg-gray-100 rounded mr-3"></div>
              More Articles Like This
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post, index) => (
                <motion.div
                  key={`${post.slug}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:shadow-md transition-all duration-300">
                    <Link href={`/blog/${post.slug}`} className="block">
                      {post.thumbnailUrl && (
                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                          <ImageWithFallback
                            src={post.thumbnailUrl}
                            alt={post.title}
                            fill
                            fallbackSrc="/images/placeholder.svg"
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      )}

                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      </CardContent>

                      <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                            <ImageWithFallback
                              src={post.authorImageSrc}
                              alt={post.authorName}
                              fill
                              fallbackSrc="/images/placeholder.svg"
                              className="object-cover"
                            />
                          </div>
                          <div className="text-xs text-gray-700 dark:text-gray-300">
                            <span className="block font-medium text-gray-900 dark:text-white">
                              {post.authorName}
                            </span>
                            <span>
                              {formatDate(post.publicationDate)} · {post.readTimeMinutes}
                            </span>
                          </div>
                        </div>
                      </CardFooter>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

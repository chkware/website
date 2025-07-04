import React from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  authorName: string;
  authorImageSrc: string;
  publicationDate: string;
  readTimeMinutes: string;
  slug: string;
  thumbnailUrl?: string;
  tags?: string[];
  className?: string;
}

export function BlogPostCard({
  title,
  excerpt,
  authorName,
  authorImageSrc,
  publicationDate,
  readTimeMinutes,
  slug,
  thumbnailUrl,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tags = [],
  className,
}: BlogPostCardProps) {
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
    <Card className={cn(
      "h-full overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-300",
      className
    )}>
      <Link href={`/blog/${slug}`} className="block h-full flex flex-col">
        {thumbnailUrl && (
          <div className="relative h-48 w-full overflow-hidden">
            <ImageWithFallback
              src={thumbnailUrl}
              alt={title}
              fill
              fallbackSrc="/images/placeholder.svg"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}

        <CardContent className={cn(
          "p-6 flex-grow",
          !thumbnailUrl && "pt-6"
        )}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {excerpt}
          </p>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0 mt-auto">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                <ImageWithFallback
                  src={authorImageSrc}
                  alt={authorName}
                  fill
                  fallbackSrc="/images/placeholder.svg"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-900 dark:text-white">
                  {authorName}
                </span>
              </div>
            </div>

            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center mr-3">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>{formatDate(publicationDate)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{readTimeMinutes}</span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Twitter, Github, Linkedin, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

interface AuthorBioProps {
  authorName: string;
  authorImageSrc: string;
  authorRole: string;
  authorBio: string;
  authorLinks?: Array<{
    type: string;
    url: string;
  }>;
  className?: string;
}

export function AuthorBio({
  authorName,
  authorImageSrc,
  authorRole,
  authorBio,
  authorLinks = [],
  className,
}: AuthorBioProps) {
  // Function to get the appropriate icon for a social link
  const getSocialIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      case "github":
        return <Github className="h-4 w-4" />;
      case "linkedin":
        return <Linkedin className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <section className={cn("py-12", className)}>
      <Container size="blog">
        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Author Avatar */}
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm flex-shrink-0">
                <ImageWithFallback
                  src={authorImageSrc}
                  alt={authorName}
                  fill
                  fallbackSrc="/images/placeholder.svg"
                  className="object-cover"
                />
              </div>

              {/* Author Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {authorName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  {authorRole}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {authorBio}
                </p>

                {/* Social Links */}
                {authorLinks.length > 0 && (
                  <div className="flex items-center justify-center md:justify-start space-x-3">
                    {authorLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label={`${authorName}'s ${link.type}`}
                      >
                        {getSocialIcon(link.type)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}

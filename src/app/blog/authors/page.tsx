import React from "react";
import { Container } from "@/components/ui/Container";
import { getAllAuthorsWithCounts, getAuthors, getPostsByAuthor } from "@/lib/blog-utils";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Twitter, Github, Linkedin, Mail } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

// Define metadata for the page
export function generateMetadata() {
  return {
    title: "Blog Authors",
    description: "Meet our blog authors and browse their articles.",
  };
}

export default function AuthorsIndexPage() {
  // Get all authors with post counts
  const authorsWithCounts = getAllAuthorsWithCounts();

  // If there are no authors, we'll still show the page but with a message
  const hasAuthors = authorsWithCounts.length > 0;

  // Get full author details
  const authorDetails = getAuthors();

  // For each author, get a sample of posts (up to 3) to display
  const authorsWithSamplePosts = authorsWithCounts.map(author => {
    const authorDetail = authorDetails[author.id] || {};
    const posts = getPostsByAuthor(author.id).slice(0, 3);

    return {
      ...author,
      ...authorDetail,
      posts
    };
  });

  // Sort authors by post count (descending)
  authorsWithSamplePosts.sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <Container size="large">
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Back to all articles</span>
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Blog Authors
            </h1>

            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Meet our writers and browse their articles.
            </p>
          </div>
        </Container>
      </section>

      {/* Authors Content */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <Container size="large">
          {hasAuthors ? (
            <div className="space-y-16">
              {authorsWithSamplePosts.map((author) => (
                <div key={author.id} className="border-b border-gray-100 dark:border-gray-800 pb-12 last:border-0">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                    {/* Author Avatar */}
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm flex-shrink-0">
                      <ImageWithFallback
                        src={author.image_url || "/images/placeholder.svg"}
                        alt={author.name}
                        fill
                        fallbackSrc="/images/placeholder.svg"
                        className="object-cover"
                      />
                    </div>

                    {/* Author Info */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {author.name}
                          </h2>
                          <p className="mt-1 text-gray-600 dark:text-gray-400">
                            {author.title}
                          </p>
                        </div>

                        <Link
                          href={`/blog/authors/${author.id}`}
                          className="mt-3 md:mt-0 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center justify-center md:justify-start"
                        >
                          View all articles ({author.count})
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>

                      {author.bio && (
                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                          {author.bio}
                        </p>
                      )}

                      {/* Social Links */}
                      <div className="mt-4 flex items-center justify-center md:justify-start space-x-3">
                        {author.twitter && (
                          <a
                            href={`https://twitter.com/${author.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label={`${author.name}'s Twitter`}
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}

                        {author.github && (
                          <a
                            href={`https://github.com/${author.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label={`${author.name}'s GitHub`}
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}

                        {author.linkedin && (
                          <a
                            href={`https://linkedin.com/in/${author.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label={`${author.name}'s LinkedIn`}
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}

                        {author.email && (
                          <a
                            href={`mailto:${author.email}`}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            aria-label={`Email ${author.name}`}
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sample posts for this author */}
                  {author.posts.length > 0 && (
                    <>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Recent articles by {author.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {author.posts.map((post) => (
                          <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="block p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                          >
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                              {post.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                              {post.description}
                            </p>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No authors found
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Check back later for author information.
              </p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

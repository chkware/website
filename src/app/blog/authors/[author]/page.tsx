import React from "react";
import { Container } from "@/components/ui/Container";
import { BlogPostCard } from "@/components/ui/blog-post-card";
import {
  getPostsByAuthor,
  getAllAuthorsWithCounts,
  getAuthors,
  getAuthorTags,
  getRelatedAuthors
} from "@/lib/blog-utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Twitter, Github, Linkedin, Mail, Tag, Calendar, Briefcase, Award } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

// Generate static params for all authors
export async function generateStaticParams() {
  const authors = getAllAuthorsWithCounts();
  return authors.map((author) => ({
    author: author.id,
  }));
}

// Define metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ author: string }> }) {
  const { author: authorParam } = await params;
  const authorId = authorParam;
  const authors = getAuthors();
  const author = authors[authorId];

  if (!author) {
    return {
      title: 'Author Not Found',
      description: 'The requested author could not be found.'
    };
  }

  return {
    title: `Posts by ${author.name}`,
    description: author.bio || `Browse all blog posts written by ${author.name}.`,
  };
}

export default async function AuthorPage({ params }: { params: Promise<{ author: string }> }) {
  const { author: authorParam } = await params;
  const authorId = authorParam;
  const authors = getAuthors();
  const author = authors[authorId];
  const posts = getPostsByAuthor(authorId);

  // Get author's tags
  const authorTags = getAuthorTags(authorId);

  // Get related authors
  const relatedAuthors = getRelatedAuthors(authorId);

  if (!author || posts.length === 0) {
    notFound();
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get the most recent post date
  const mostRecentPost = posts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  const mostRecentPostDate = mostRecentPost ? formatDate(mostRecentPost.date) : null;

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

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Author Avatar */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg flex-shrink-0">
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
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {author.name}
                </h1>

                <div className="flex flex-wrap items-center justify-center md:justify-start mt-2 text-lg text-gray-600 dark:text-gray-400">
                  <div className="flex items-center mr-4">
                    <Briefcase className="h-4 w-4 mr-1.5" />
                    <span>{author.title}</span>
                  </div>

                  {posts.length > 0 && (
                    <div className="flex items-center mr-4">
                      <Award className="h-4 w-4 mr-1.5" />
                      <span>{posts.length} article{posts.length === 1 ? '' : 's'}</span>
                    </div>
                  )}

                  {mostRecentPostDate && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      <span>Last published: {mostRecentPostDate}</span>
                    </div>
                  )}
                </div>

                {author.bio && (
                  <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed">
                    {author.bio}
                  </p>
                )}

                {/* Author Tags */}
                {authorTags.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Expertise:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {authorTags.slice(0, 5).map((tag) => (
                        <Link
                          key={tag.name}
                          href={`/blog/tags/${encodeURIComponent(tag.name)}`}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag.name}
                          <span className="ml-1 text-gray-500 dark:text-gray-400">({tag.count})</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Links */}
                <div className="mt-5 flex items-center justify-center md:justify-start space-x-3">
                  {author.twitter && (
                    <a
                      href={`https://twitter.com/${author.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      aria-label={`${author.name}'s Twitter`}
                    >
                      <Twitter className="h-5 w-5" />
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
                      <Github className="h-5 w-5" />
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
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}

                  {author.email && (
                    <a
                      href={`mailto:${author.email}`}
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      aria-label={`Email ${author.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Main Content Section */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <Container size="large">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Posts Grid - Takes up 2/3 of the space on large screens */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Articles by {author.name}
                </h2>
                <div className="text-lg text-gray-600 dark:text-gray-300">
                  {posts.length} article{posts.length === 1 ? '' : 's'}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <BlogPostCard
                    key={post.slug}
                    title={post.title}
                    excerpt={post.description}
                    authorName={author.name}
                    authorImageSrc={author.image_url || "/images/placeholder.svg"}
                    publicationDate={post.date}
                    readTimeMinutes={post.readingTime}
                    slug={post.slug}
                    thumbnailUrl={post.image || ""}
                    tags={post.tags}
                  />
                ))}
              </div>
            </div>

            {/* Sidebar - Takes up 1/3 of the space on large screens */}
            <div className="space-y-8">
              {/* Related Authors Section */}
              {relatedAuthors.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Similar Authors
                  </h2>
                  <div className="space-y-4">
                    {relatedAuthors.map((relatedAuthor) => (
                      <Link
                        key={relatedAuthor.id}
                        href={`/blog/authors/${relatedAuthor.id}`}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-white dark:border-gray-700 shadow-sm">
                          <ImageWithFallback
                            src={relatedAuthor.image_url || "/images/placeholder.svg"}
                            alt={relatedAuthor.name}
                            fill
                            fallbackSrc="/images/placeholder.svg"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {relatedAuthor.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {relatedAuthor.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {relatedAuthor.count} article{relatedAuthor.count === 1 ? '' : 's'}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* All Tags Section */}
              {authorTags.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Topics
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {authorTags.map((tag) => (
                      <Link
                        key={tag.name}
                        href={`/blog/tags/${encodeURIComponent(tag.name)}`}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Tag className="h-3.5 w-3.5 mr-1.5" />
                        {tag.name}
                        <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">({tag.count})</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* All Authors Section */}
          <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              All Authors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getAllAuthorsWithCounts().map((authorItem) => (
                <Link
                  key={authorItem.id}
                  href={`/blog/authors/${authorItem.id}`}
                  className={`flex items-center p-3 rounded-lg ${
                    authorItem.id === authorId
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "hover:bg-gray-50 dark:hover:bg-gray-900"
                  } transition-colors`}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-white dark:border-gray-700 shadow-sm">
                    <ImageWithFallback
                      src={authorItem.image_url || "/images/placeholder.svg"}
                      alt={authorItem.name}
                      fill
                      fallbackSrc="/images/placeholder.svg"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {authorItem.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {authorItem.count} article{authorItem.count === 1 ? '' : 's'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

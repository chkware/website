import React from "react";
import { Container } from "@/components/ui/Container";
import { getAllTagsWithCounts, getPostsByTag } from "@/lib/blog-utils";
import Link from "next/link";
import { ChevronLeft, Tag, ChevronRight } from "lucide-react";

// Define metadata for the page
export function generateMetadata() {
  return {
    title: "Blog Tags",
    description: "Browse all blog posts by tag.",
  };
}

export default function TagsIndexPage() {
  // Get all tags with post counts
  const tags = getAllTagsWithCounts();

  // If there are no tags, we'll still show the page but with a message
  const hasTags = tags.length > 0;

  // For each tag, get a sample of posts (up to 3) to display
  const tagsWithSamplePosts = tags.map(tag => ({
    ...tag,
    posts: getPostsByTag(tag.name).slice(0, 3)
  }));

  // Sort tags by count (descending)
  tagsWithSamplePosts.sort((a, b) => b.count - a.count);

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
              Blog Tags
            </h1>

            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Browse all blog posts by topic.
            </p>
          </div>

          {/* Tag Cloud */}
          {hasTags && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                All Tags
              </h2>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <Link
                    key={tag.name}
                    href={`/blog/tags/${encodeURIComponent(tag.name)}`}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Tag className="h-3.5 w-3.5 mr-1.5" />
                    {tag.name} <span className="ml-1.5 text-xs">({tag.count})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Tags Content */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <Container size="large">
          {hasTags ? (
            <div className="space-y-16">
              {tagsWithSamplePosts.slice(0, 10).map((tag) => (
                <div key={tag.name} className="border-b border-gray-100 dark:border-gray-800 pb-12 last:border-0">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                      <Tag className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                      {tag.name}
                      <span className="ml-3 text-base font-normal text-gray-500 dark:text-gray-400">
                        ({tag.count} article{tag.count === 1 ? '' : 's'})
                      </span>
                    </h2>
                    <Link
                      href={`/blog/tags/${encodeURIComponent(tag.name)}`}
                      className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center"
                    >
                      View all
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>

                  {/* Sample posts for this tag */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tag.posts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      >
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                        <div className="mt-2 flex items-center">
                          <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2">
                            <img
                              src={post.authors[0]?.image_url || "/images/placeholder.svg"}
                              alt={post.authors[0]?.name || "Author"}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {post.authors[0]?.name || "Unknown"}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No tags found
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Check back later for tagged content.
              </p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

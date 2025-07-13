import React from "react";
import { Container } from "@/components/ui/Container";
import { BlogPostCard } from "@/components/ui/blog-post-card";
import { getPostsByTag, getAllTagsWithCounts } from "@/lib/blog-utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Tag as TagIcon } from "lucide-react";

// Generate static params for all tags
export async function generateStaticParams() {
  const tags = getAllTagsWithCounts();
  return tags.map((tag) => ({
    tag: tag.name,
  }));
}

// Define metadata for the page
export async function generateMetadata({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    return {
      title: 'Tag Not Found',
      description: 'The requested tag could not be found.'
    };
  }

  return {
    title: `Posts tagged with &quot;${tag}&quot;`,
    description: `Browse all blog posts tagged with &quot;${tag}&quot;.`,
  };
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  // Get all tags for the tag navigation
  const tags = getAllTagsWithCounts();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <Container size="large">
          <div className="mb-8">
            <Link
              href="/blog/tags"
              className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span>Back to all tags</span>
            </Link>

            <div className="flex items-center mb-4">
              <TagIcon className="h-6 w-6 mr-2 text-gray-500 dark:text-gray-400" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                {tag}
              </h1>
            </div>

            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              {posts.length} article{posts.length === 1 ? '' : 's'} tagged with &quot;{tag}&quot;
            </p>
          </div>
        </Container>
      </section>

      {/* Posts Grid */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <Container size="large">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogPostCard
                key={post.slug}
                title={post.title}
                excerpt={post.description}
                authorName={post.authors[0]?.name || "Unknown"}
                authorImageSrc={post.authors[0]?.image_url || "/images/placeholder.svg"}
                publicationDate={post.date}
                readTimeMinutes={post.readingTime}
                slug={post.slug}
                thumbnailUrl={post.image || ""}
                tags={post.tags}
              />
            ))}
          </div>

          {/* All Tags Section */}
          <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              All Tags
            </h2>
            <div className="flex flex-wrap gap-3">
              {tags.map((tagItem) => (
                <Link
                  key={tagItem.name}
                  href={`/blog/tags/${encodeURIComponent(tagItem.name)}`}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm ${
                    tagItem.name === tag
                      ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <TagIcon className="h-3.5 w-3.5 mr-1.5" />
                  {tagItem.name} <span className="ml-1.5 text-xs">({tagItem.count})</span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BlogPost } from "@/lib/blog-utils";

// Import components
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogContentBody } from "@/components/blog/blog-content-body";
import { AuthorBio } from "@/components/blog/author-bio";
import { RelatedPosts } from "@/components/blog/related-posts";
// Note: MDX components are now handled by the Next.js MDX integration
// See next.config.js for configuration

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  if (!post) {
    return (
      <Container size="large" className="py-32">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The blog post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/blog"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Back to Blog
          </Link>
        </div>
      </Container>
    );
  }

  // Prepare author links from author data
  const authorLinks = post.authors.map(author => {
    const links = [];
    if (author.twitter) links.push({ type: "twitter", url: `https://twitter.com/${author.twitter}` });
    if (author.github) links.push({ type: "github", url: `https://github.com/${author.github}` });
    if (author.linkedin) links.push({ type: "linkedin", url: `https://linkedin.com/in/${author.linkedin}` });
    return links;
  }).flat();

  // Format related posts for the RelatedPosts component
  const formattedRelatedPosts = relatedPosts.map(relatedPost => ({
    title: relatedPost.title,
    excerpt: relatedPost.description,
    authorName: relatedPost.authors[0]?.name || "Unknown",
    authorImageSrc: relatedPost.authors[0]?.image_url || "/images/placeholder.svg",
    publicationDate: relatedPost.date,
    readTimeMinutes: relatedPost.readingTime,
    slug: relatedPost.slug,
    thumbnailUrl: relatedPost.image,
    tags: relatedPost.tags
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Blog Header */}
      <BlogHeader
        title={post.title}
        authorName={post.authors[0]?.name || "Unknown"}
        authorImageSrc={post.authors[0]?.image_url || "/images/placeholder.svg"}
        authorRole={post.authors[0]?.title || "Author"}
        publicationDate={post.date}
        readTimeMinutes={post.readingTime}
        coverImageSrc={post.image || ""}
      />

      {/* Blog Content */}
      <BlogContentBody content={post.content} />

      {/* Author Bio */}
      <AuthorBio
        authorName={post.authors[0]?.name || "Unknown"}
        authorImageSrc={post.authors[0]?.image_url || "/images/placeholder.svg"}
        authorRole={post.authors[0]?.title || "Author"}
        authorBio={post.authors[0]?.bio || "Writer and developer passionate about creating great content and tools for the community."}
        authorLinks={authorLinks}
        className="mt-8"
      />

      {/* Related Posts */}
      {formattedRelatedPosts.length > 0 && (
        <RelatedPosts posts={formattedRelatedPosts} className="mt-12" />
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BlogPost } from "@/data/blog-posts";

// Import new components
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogContentBody } from "@/components/blog/blog-content-body";
import { AuthorBio } from "@/components/blog/author-bio";
import { RelatedPosts } from "@/components/blog/related-posts";

interface RelatedPost {
  title: string;
  excerpt: string;
  authorName: string;
  authorImageSrc: string;
  publicationDate: string;
  readTimeMinutes: string;
  slug: string;
  thumbnailUrl?: string;
  tags?: string[];
}

interface BlogPostClientProps {
  blogPosts: BlogPost[];
}

export function BlogPostClient({ blogPosts }: BlogPostClientProps) {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the post that matches the slug
    const slug = params?.slug as string;
    if (!slug) return;

    // Find post with matching slug
    const foundPost = blogPosts.find(post => post.slug === slug);

    if (foundPost) {
      setPost(foundPost);

      // Find related posts (posts with at least one matching tag)
      const related = blogPosts
        .filter(p =>
          p.id !== foundPost.id &&
          p.tags.some(tag => foundPost.tags.includes(tag))
        )
        .slice(0, 3) // Limit to 3 related posts
        .map(p => ({
          title: p.title,
          excerpt: p.excerpt,
          authorName: p.author.name,
          authorImageSrc: p.author.avatar,
          publicationDate: p.date,
          readTimeMinutes: p.readingTime,
          slug: p.slug,
          thumbnailUrl: p.coverImage,
          tags: p.tags
        }));

      setRelatedPosts(related);
    }

    setIsLoading(false);
  }, [params, blogPosts]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
      </div>
    );
  }

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

  // Prepare author links (example - in a real app, these would come from the data)
  const authorLinks = [
    { type: "twitter", url: "https://twitter.com" },
    { type: "github", url: "https://github.com" }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Blog Header */}
      <BlogHeader
        title={post.title}
        authorName={post.author.name}
        authorImageSrc={post.author.avatar}
        authorRole={post.author.role}
        publicationDate={post.date}
        readTimeMinutes={post.readingTime}
        coverImageSrc={post.coverImage}
      />

      {/* Blog Content */}
      <BlogContentBody content={post.content} />

      {/* Author Bio */}
      <AuthorBio
        authorName={post.author.name}
        authorImageSrc={post.author.avatar}
        authorRole={post.author.role}
        authorBio="Writer and developer passionate about creating great content and tools for the community."
        authorLinks={authorLinks}
        className="mt-8"
      />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <RelatedPosts posts={relatedPosts} className="mt-12" />
      )}
    </div>
  );
}

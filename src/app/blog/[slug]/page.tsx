import { blogPosts } from "@/data/blog-posts";
import { BlogPostClient } from "@/components/blog/BlogPostClient";

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Define the page component
export default function BlogPostPage() {
  return <BlogPostClient blogPosts={blogPosts} />;
}

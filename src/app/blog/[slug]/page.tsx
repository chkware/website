import { getAllBlogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/blog-utils";
import { BlogPostClient } from "@/components/blog/BlogPostClient";
import { BlogJsonLd } from "@/components/blog/BlogJsonLd";
import { notFound } from "next/navigation";

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Define metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: post.authors.map(author => author.name),
      tags: post.tags,
      images: [
        {
          url: post.image || '',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image || ''],
    },
  };
}

// Define the page component
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Get related posts
  const related = getRelatedPosts(post);

  // Get the full URL for the current page
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chkware.com'}/blog/${slug}/`;

  return (
    <>
      {/* Add JSON-LD structured data */}
      <BlogJsonLd post={post} url={url} />

      <BlogPostClient
        post={post}
        relatedPosts={related}
      />
    </>
  );
}

"use client";

import React from 'react';
import { BlogPost } from '@/lib/blog-utils';

interface BlogJsonLdProps {
  post: BlogPost;
  url: string;
}

/**
 * Component that generates JSON-LD structured data for blog posts
 * This helps search engines better understand the content and display rich results
 *
 * @see https://developers.google.com/search/docs/advanced/structured-data/article
 */
export function BlogJsonLd({ post, url }: BlogJsonLdProps) {
  // Format date in ISO format
  const datePublished = new Date(post.date).toISOString();

  // Use the published date as the modified date for now
  const dateModified = datePublished;

  // Prepare author data
  const authors = post.authors.map(author => ({
    "@type": "Person",
    "name": author.name,
    "url": `${new URL(url).origin}/blog/authors/${author.id}`,
    ...(author.image_url && { "image": author.image_url })
  }));

  // Prepare the JSON-LD data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": authors.length > 1 ? authors : authors[0],
    "publisher": {
      "@type": "Organization",
      "name": "CHKware",
      "logo": {
        "@type": "ImageObject",
        "url": `${new URL(url).origin}/images/logo-img.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    ...(post.tags.length > 0 && { "keywords": post.tags.join(", ") })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

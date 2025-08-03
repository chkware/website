import Script from 'next/script';

interface BlogPost {
  title: string;
  description: string;
  image?: string;
  date: string;
  updatedAt?: string;
  authors: Array<{
    name: string;
    url?: string;
  }>;
  tags: string[];
  slug: string;
}

interface ArticleStructuredDataProps {
  post: BlogPost;
}

export function generateArticleStructuredData(post: BlogPost) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chkware.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": post.image ? `${baseUrl}${post.image}` : `${baseUrl}/images/og-image.png`,
    "datePublished": post.date,
    "dateModified": post.updatedAt || post.date,
    "author": post.authors.map(author => ({
      "@type": "Person",
      "name": author.name,
      "url": author.url || `${baseUrl}/blog/authors/${author.name.toLowerCase().replace(/\s+/g, '')}`
    })),
    "publisher": {
      "@type": "Organization",
      "name": "CHKware",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/images/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`
    },
    "keywords": post.tags.join(', '),
    "articleSection": "Technology",
    "inLanguage": "en-US"
  };
}

export function ArticleStructuredData({ post }: ArticleStructuredDataProps) {
  const structuredData = generateArticleStructuredData(post);
  
  return (
    <Script
      id={`article-structured-data-${post.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
}
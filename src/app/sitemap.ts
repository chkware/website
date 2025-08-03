import { MetadataRoute } from 'next';
// import { getAllBlogPosts } from '@/lib/blog-utils'; // Commented out for launch

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chkware.com';

  // For launch - only include homepage
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Blog and other pages will be added later when ready to launch
    // {
    //   url: `${baseUrl}/blog`,
    //   lastModified: new Date(),
    //   changeFrequency: 'daily',
    //   priority: 0.8,
    // },
  ];

  return staticPages;

  // TODO: Uncomment when ready to launch blog and other pages
  /*
  try {
    const blogPosts = getAllBlogPosts();
    const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    // Dynamic author pages
    const authors = [...new Set(blogPosts.flatMap(post => post.authors.map(author => author.id)))];
    const authorPages: MetadataRoute.Sitemap = authors.map((authorId) => ({
      url: `${baseUrl}/blog/authors/${authorId}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    }));

    // Dynamic tag pages
    const tags = [...new Set(blogPosts.flatMap(post => post.tags))];
    const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
      url: `${baseUrl}/blog/tags/${encodeURIComponent(tag)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    }));

    return [...staticPages, ...blogPostPages, ...authorPages, ...tagPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
  */
}
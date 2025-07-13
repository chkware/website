import { blogPosts, authors as staticAuthors } from '@/data/blog-posts';
import readingTime from 'reading-time';

// Define interfaces
export interface Author {
  id: string;
  name: string;
  title: string;
  url?: string;
  image_url?: string;
  email?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  formattedDate: string;
  description: string;
  authors: Author[];
  tags: string[];
  readingTime: string;
  content: string;
  draft?: boolean;
  image?: string;
  permalink?: string;
}

// Get authors from static data
export function getAuthors(): Record<string, Author> {
  // Convert the static authors to the format expected by the rest of the code
  const authors: Record<string, Author> = {};

  Object.entries(staticAuthors).forEach(([id, author]) => {
    authors[id] = {
      id,
      name: author.name,
      title: author.role,
      image_url: author.avatar,
      // Add other fields as needed
    };
  });

  return authors;
}

// Format date in a more readable way
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// Get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  const authors = getAuthors();

  // Convert the static blog posts to the format expected by the rest of the code
  const posts = blogPosts.map(post => {
    // Calculate reading time (if not already provided)
    const readingTimeResult = post.readingTime || readingTime(post.content).text;

    // Get author data
    const authorId = post.author.name.replace(/\s+/g, '');
    const author = authors[authorId] || {
      id: authorId,
      name: post.author.name,
      title: post.author.role,
      image_url: post.author.avatar
    };

    return {
      id: post.slug,
      title: post.title,
      slug: post.slug,
      date: post.date,
      formattedDate: formatDate(post.date),
      description: post.excerpt,
      authors: [author],
      tags: post.tags,
      readingTime: typeof readingTimeResult === 'string' ? readingTimeResult : `${Math.ceil(readingTimeResult.minutes)} min read`,
      content: post.content,
      draft: false, // Assuming all posts in static data are published
      image: post.coverImage,
      permalink: `/blog/${post.slug}`
    };
  })
  .filter(post => process.env.NODE_ENV === 'development' || !post.draft) // Filter out drafts in production
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date (newest first)

  return posts;
}

// Get a single blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Get related posts based on tags
export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getAllBlogPosts();

  // Filter out the current post and any drafts
  const otherPosts = allPosts.filter(post =>
    post.slug !== currentPost.slug && !post.draft
  );

  // Score posts based on tag matches
  const scoredPosts = otherPosts.map(post => {
    const matchingTags = post.tags.filter(tag =>
      currentPost.tags.includes(tag)
    );

    return {
      post,
      score: matchingTags.length
    };
  });

  // Sort by score (highest first) and then by date (newest first)
  scoredPosts.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
  });

  // Return the top N posts
  return scoredPosts.slice(0, limit).map(item => item.post);
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => post.tags.includes(tag));
}

// Get posts by author
export function getPostsByAuthor(authorId: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post =>
    post.authors.some(author => author.id === authorId)
  );
}

// Get all tags with counts
export interface TagCount {
  name: string;
  count: number;
}

export function getAllTags(): TagCount[] {
  const posts = getAllBlogPosts();
  const tagCounts: Record<string, number> = {};

  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// Alias for getAllTags for consistency with other functions
export function getAllTagsWithCounts(): TagCount[] {
  return getAllTags();
}

// Get all authors with post counts
export interface AuthorCount extends Author {
  count: number;
}

export function getAllAuthorsWithCounts(): AuthorCount[] {
  const posts = getAllBlogPosts();
  const authorCounts: Record<string, number> = {};
  const authors = getAuthors();

  posts.forEach(post => {
    post.authors.forEach(author => {
      authorCounts[author.id] = (authorCounts[author.id] || 0) + 1;
    });
  });

  return Object.entries(authorCounts)
    .map(([id, count]) => ({
      ...(authors[id] || { id, name: id, title: 'Author' }),
      count
    }))
    .sort((a, b) => b.count - a.count);
}

// Get archive data (posts grouped by year and month)
export interface ArchiveItem {
  year: number;
  month: number;
  monthName: string;
  posts: BlogPost[];
}

export function getArchiveData(): ArchiveItem[] {
  const posts = getAllBlogPosts();
  const archiveMap: Record<string, ArchiveItem> = {};

  posts.forEach(post => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const key = `${year}-${month}`;

    if (!archiveMap[key]) {
      archiveMap[key] = {
        year,
        month,
        monthName: date.toLocaleString('en-US', { month: 'long' }),
        posts: []
      };
    }

    archiveMap[key].posts.push(post);
  });

  // Convert to array and sort by date (newest first)
  return Object.values(archiveMap)
    .sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year;
      }
      return b.month - a.month;
    });
}

// Get all years with post counts
export interface YearCount {
  year: number;
  count: number;
}

export function getAllYearsWithCounts(): YearCount[] {
  const posts = getAllBlogPosts();
  const yearCounts: Record<number, number> = {};

  posts.forEach(post => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    yearCounts[year] = (yearCounts[year] || 0) + 1;
  });

  return Object.entries(yearCounts)
    .map(([yearStr, count]) => ({ year: parseInt(yearStr), count }))
    .sort((a, b) => b.year - a.year); // Sort by year (newest first)
}

// Get posts from a specific year
export function getPostsByYear(year: number): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => {
    const postDate = new Date(post.date);
    return postDate.getFullYear() === year;
  });
}

// Get tags used by a specific author with counts
export function getAuthorTags(authorId: string): TagCount[] {
  const posts = getPostsByAuthor(authorId);
  const tagCounts: Record<string, number> = {};

  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// Get related authors based on common tags
export function getRelatedAuthors(authorId: string, limit: number = 3): AuthorCount[] {
  const authorPosts = getPostsByAuthor(authorId);
  const authorTags = new Set<string>();

  // Collect all tags used by the author
  authorPosts.forEach(post => {
    post.tags.forEach(tag => authorTags.add(tag));
  });

  // If the author has no tags, return empty array
  if (authorTags.size === 0) {
    return [];
  }

  const allAuthors = getAllAuthorsWithCounts();

  // Filter out the current author
  const otherAuthors = allAuthors.filter(author => author.id !== authorId);

  // Score authors based on tag matches
  const scoredAuthors = otherAuthors.map(author => {
    const authorPostsWithTags = getPostsByAuthor(author.id);
    let tagMatchCount = 0;

    // Count how many posts by this author use tags that the original author uses
    authorPostsWithTags.forEach(post => {
      post.tags.forEach(tag => {
        if (authorTags.has(tag)) {
          tagMatchCount++;
        }
      });
    });

    return {
      ...author,
      score: tagMatchCount
    };
  });

  // Sort by score (highest first) and then by post count (highest first)
  scoredAuthors.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.count - a.count;
  });

  // Return only authors with at least one tag match
  return scoredAuthors
    .filter(author => author.score > 0)
    .slice(0, limit);
}

// Get posts from a specific year and month
export function getPostsByYearAndMonth(year: number, month: number): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter(post => {
    const postDate = new Date(post.date);
    return postDate.getFullYear() === year && postDate.getMonth() + 1 === month;
  });
}

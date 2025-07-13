import React from "react";
import { Container } from "@/components/ui/Container";
import { getAllYearsWithCounts, getPostsByYear } from "@/lib/blog-utils";
import Link from "next/link";
import { ChevronLeft, Calendar, ChevronRight } from "lucide-react";

// Define metadata for the page
export function generateMetadata() {
  return {
    title: "Blog Archive",
    description: "Browse all blog posts by year and month.",
  };
}

export default function ArchiveIndexPage() {
  // Get all years with post counts
  const years = getAllYearsWithCounts();

  // If there are no years, we'll still show the page but with a message
  const hasYears = years.length > 0;

  // For each year, get a sample of posts (up to 3) to display
  const yearsWithSamplePosts = years.map(year => ({
    ...year,
    posts: getPostsByYear(year.year).slice(0, 3)
  }));

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
              Blog Archive
            </h1>

            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Browse all blog posts by year and month.
            </p>
          </div>
        </Container>
      </section>

      {/* Archive Content */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <Container size="large">
          {hasYears ? (
            <div className="space-y-16">
              {yearsWithSamplePosts.map((year) => (
                <div key={year.year} className="border-b border-gray-100 dark:border-gray-800 pb-12 last:border-0">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                      <Calendar className="h-6 w-6 mr-2 text-gray-500 dark:text-gray-400" />
                      {year.year}
                      <span className="ml-3 text-base font-normal text-gray-500 dark:text-gray-400">
                        ({year.count} article{year.count === 1 ? '' : 's'})
                      </span>
                    </h2>
                    <Link
                      href={`/blog/archive/${year.year}`}
                      className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors flex items-center"
                    >
                      View all
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>

                  {/* Sample posts for this year */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {year.posts.map((post) => (
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
                      </Link>
                    ))}
                  </div>

                  {/* Months for this year */}
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Browse by month:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.from({ length: 12 }, (_, i) => {
                        const monthNum = i + 1;
                        const date = new Date(2000, i, 1);
                        const monthName = date.toLocaleString('default', { month: 'long' });
                        const monthPosts = getPostsByYear(year.year).filter(post => {
                          const postDate = new Date(post.date);
                          return postDate.getMonth() + 1 === monthNum;
                        });

                        if (monthPosts.length === 0) return null;

                        return (
                          <Link
                            key={monthNum}
                            href={`/blog/archive/${year.year}?month=${monthNum}`}
                            className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          >
                            {monthName} <span className="ml-1 text-xs">({monthPosts.length})</span>
                          </Link>
                        );
                      }).filter(Boolean)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No archived posts yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Check back later for archived content.
              </p>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

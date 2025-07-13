import React from "react";
import { Container } from "@/components/ui/Container";
import { BlogPostCard } from "@/components/ui/blog-post-card";
import { getPostsByYear, getAllYearsWithCounts, getPostsByYearAndMonth } from "@/lib/blog-utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar } from "lucide-react";

// Generate static params for all years
export async function generateStaticParams() {
  const years = getAllYearsWithCounts();
  return years.map((year) => ({
    year: year.year.toString(),
  }));
}

// Define metadata for the page
export async function generateMetadata({ params }: { params: { year: string } }) {
  const year = params.year;
  const posts = getPostsByYear(parseInt(year));

  if (posts.length === 0) {
    return {
      title: 'Archive Not Found',
      description: 'No posts found for the selected time period.'
    };
  }

  return {
    title: `Blog Archive: ${year}`,
    description: `Browse all blog posts from ${year}.`,
  };
}

export default async function ArchivePage({ params, searchParams }: {
  params: { year: string },
  searchParams: { month?: string }
}) {
  const year = parseInt(params.year);
  const month = searchParams.month ? parseInt(searchParams.month) : undefined;

  // Get posts for the specified year and optional month
  const posts = month
    ? getPostsByYearAndMonth(year, month)
    : getPostsByYear(year);

  if (posts.length === 0) {
    notFound();
  }

  // Get all years for the archive navigation
  const years = getAllYearsWithCounts();

  // Get month name if a month is specified
  const getMonthName = (monthNum: number) => {
    const date = new Date(2000, monthNum - 1, 1);
    return date.toLocaleString('default', { month: 'long' });
  };

  // Generate months for the current year
  const months = Array.from({ length: 12 }, (_, i) => {
    const monthNum = i + 1;
    const monthPosts = getPostsByYearAndMonth(year, monthNum);
    return {
      number: monthNum,
      name: getMonthName(monthNum),
      count: monthPosts.length
    };
  }).filter(m => m.count > 0);

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
              {month ? `${getMonthName(month)} ${year}` : `Archive: ${year}`}
            </h1>

            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              {posts.length} article{posts.length === 1 ? '' : 's'} published
              {month ? ` in ${getMonthName(month)} ${year}` : ` in ${year}`}
            </p>

            {/* Month navigation for the current year */}
            {months.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Browse by month:
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/blog/archive/${year}`}
                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${
                      !month 
                        ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900" 
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    All
                  </Link>

                  {months.map((m) => (
                    <Link
                      key={m.number}
                      href={`/blog/archive/${year}?month=${m.number}`}
                      className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${
                        month === m.number 
                          ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900" 
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {m.name} <span className="ml-1 text-xs">({m.count})</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
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

          {/* Archive Navigation */}
          <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Browse by Year
            </h2>
            <div className="flex flex-wrap gap-4">
              {years.map((yearItem) => (
                <Link
                  key={yearItem.year}
                  href={`/blog/archive/${yearItem.year}`}
                  className={`flex items-center p-3 rounded-lg ${
                    yearItem.year === year
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "hover:bg-gray-50 dark:hover:bg-gray-900"
                  }`}
                >
                  <Calendar className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {yearItem.year}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {yearItem.count} article{yearItem.count === 1 ? '' : 's'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

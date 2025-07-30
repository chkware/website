"use client";

import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Callout } from "@/components/ui/callout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/blog/CodeBlock";
import Link from 'next/link';
import Image from 'next/image';

// Define the components that will be available in MDX files
const components = {
  // Custom components
  Callout,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  CodeBlock,

  // Override default elements
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href && href.startsWith('/');

    if (isInternal) {
      return (
        <Link
          href={href || '#'}
          {...props}
          className="text-gray-900 dark:text-white font-medium border-b border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-gray-300 transition-colors"
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
        className="text-gray-900 dark:text-white font-medium border-b border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-gray-300 transition-colors"
      >
        {children}
      </a>
    );
  },

  img: ({ src, alt, width, height, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null;

    return (
      <div className="my-8 relative">
        <Image
          src={src as string}
          alt={alt || ''}
          width={width ? Number(width) : 800}
          height={height ? Number(height) : 500}
          className="rounded-md w-full h-auto object-cover"
          {...props}
        />
      </div>
    );
  },

  // Add styling to default elements
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold mt-8 mb-3 text-gray-900 dark:text-white" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-lg font-bold mt-6 mb-2 text-gray-900 dark:text-white" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-6 text-gray-800 dark:text-gray-200 leading-relaxed text-lg" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 space-y-1 list-disc pl-6" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 space-y-1 list-decimal pl-6" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="py-1" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="my-6 pl-4 border-l-4 border-gray-400 dark:border-gray-600 italic text-gray-800 dark:text-gray-200" {...props} />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // If it's an inline code block (no language specified)
    if (!className) {
      return <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-gray-800 dark:text-gray-200" {...props} />;
    }

    // For code blocks with language, CodeBlock component will handle it
    const language = className.replace('language-', '');
    return <CodeBlock language={language} {...props}>{props.children}</CodeBlock>;
  },
};

export function MDXComponents({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}

export { components };

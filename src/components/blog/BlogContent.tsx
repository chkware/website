"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Mail,
  List,
  ArrowUp,
  Check
} from "lucide-react";
import { BlogPost } from "@/data/blog-posts";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BlogContentProps {
  post: BlogPost;
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export function BlogContent({ post }: BlogContentProps) {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [showToc, setShowToc] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  // Store mapping of heading text to IDs for consistency
  const headingIdsRef = useRef<Map<string, string>>(new Map());

  // Function to extract headings from content
  const extractHeadings = (content: string): TableOfContentsItem[] => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const headings: TableOfContentsItem[] = [];
    let match;
    const usedIds = new Set<string>();

    // Clear previous mapping
    headingIdsRef.current.clear();

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');

      // Ensure ID is unique by adding a suffix if needed
      let uniqueId = id;
      let counter = 1;
      while (usedIds.has(uniqueId)) {
        uniqueId = `${id}-${counter}`;
        counter++;
      }

      usedIds.add(uniqueId);

      // Store the mapping of text to ID for use in renderMarkdown
      headingIdsRef.current.set(text, uniqueId);

      headings.push({ id: uniqueId, text, level });
    }

    return headings;
  };

  // Initialize table of contents
  useEffect(() => {
    const headings = extractHeadings(post.content);
    setTableOfContents(headings);
  }, [post.content]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        const element = articleRef.current;
        const totalHeight = element.scrollHeight - element.clientHeight;
        const windowScrollTop = window.scrollY - element.offsetTop;

        if (windowScrollTop >= 0) {
          const scrolled = Math.min(100, Math.max(0, (windowScrollTop / totalHeight) * 100));
          setReadingProgress(scrolled);
        }
      }

      // Update active heading based on scroll position
      if (tableOfContents.length > 0) {
        const headingElements = tableOfContents.map(heading =>
          headingRefs.current[heading.id]
        );

        for (let i = headingElements.length - 1; i >= 0; i--) {
          const element = headingElements[i];
          if (element && element.getBoundingClientRect().top <= 100) {
            setActiveHeading(tableOfContents[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tableOfContents]);

  // Function to handle code block copy button clicks
  useEffect(() => {
    // Only run in browser environment
    if (typeof document === 'undefined') return;

    // Store the event handler function in a ref so we can use it for cleanup
    const handleCopyClick = (e: Event) => {
      e.preventDefault();
      const button = e.currentTarget as HTMLElement;
      const codeBlock = button.closest('.code-block-wrapper')?.querySelector('pre');
      if (codeBlock) {
        const code = codeBlock.textContent || '';
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          navigator.clipboard.writeText(code.replace(/^\d+\s+/gm, ''));
        }

        // Show copied state
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="text-green-500 dark:text-green-400 flex items-center"><svg class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg> Copied!</span>';

        // Reset after 2 seconds
        setTimeout(() => {
          button.innerHTML = originalText;
        }, 2000);
      }
    };

    // Add event listeners after a short delay to ensure the DOM is ready
    const timeoutId = setTimeout(() => {
      const copyButtons = document.querySelectorAll('.copy-button');
      copyButtons.forEach(button => {
        button.addEventListener('click', handleCopyClick);
      });
    }, 500);

    return () => {
      // Clear the timeout to prevent memory leaks
      clearTimeout(timeoutId);

      // Clean up event listeners
      const copyButtons = document.querySelectorAll('.copy-button');
      copyButtons.forEach(button => {
        button.removeEventListener('click', handleCopyClick);
      });
    };
  }, [post.content]);

  // Function to convert markdown to HTML (enhanced version)
  const renderMarkdown = (content: string) => {
    // Helper function to get ID for a heading text
    const getHeadingId = (text: string): string => {
      // Use the ID from headingIdsRef if available
      if (headingIdsRef.current.has(text)) {
        return headingIdsRef.current.get(text)!;
      }

      // Fallback to generating a new ID if not found in the mapping
      // This should rarely happen if extractHeadings is working correctly
      const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
      return id;
    };

    // Process headings with IDs for linking
    let html = content
      .replace(/^# (.*$)/gm, (match, p1) => {
        const id = getHeadingId(p1);
        return `<h1 id="${id}" class="text-3xl font-bold mt-12 mb-6 group flex items-center">
          <span>${p1}</span>
          <a href="#${id}" class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span class="text-gray-500 dark:text-gray-400">#</span>
          </a>
        </h1>`;
      })
      .replace(/^## (.*$)/gm, (match, p1) => {
        const id = getHeadingId(p1);
        return `<h2 id="${id}" class="text-2xl font-bold mt-10 mb-4 group flex items-center">
          <span>${p1}</span>
          <a href="#${id}" class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span class="text-gray-500 dark:text-gray-400">#</span>
          </a>
        </h2>`;
      })
      .replace(/^### (.*$)/gm, (match, p1) => {
        const id = getHeadingId(p1);
        return `<h3 id="${id}" class="text-xl font-bold mt-8 mb-3 group flex items-center">
          <span>${p1}</span>
          <a href="#${id}" class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span class="text-gray-500 dark:text-gray-400">#</span>
          </a>
        </h3>`;
      })
      .replace(/^#### (.*$)/gm, (match, p1) => {
        const id = getHeadingId(p1);
        return `<h4 id="${id}" class="text-lg font-bold mt-6 mb-3 group flex items-center">
          <span>${p1}</span>
          <a href="#${id}" class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <span class="text-gray-500 dark:text-gray-400">#</span>
          </a>
        </h4>`;
      });

    // Process code blocks with syntax highlighting simulation
    html = html.replace(/```([\s\S]*?)```/g, (match, p1) => {
      // Extract language if specified
      const firstLine = p1.trim().split('\n')[0];
      let language = '';
      let code = p1.trim();

      if (firstLine && !firstLine.includes(' ') && firstLine.length < 20) {
        language = firstLine;
        code = p1.trim().substring(firstLine.length).trim();
      }

      // Add line numbers and basic syntax highlighting
      const lines = code.split('\n').map((line: string, i: number) => {
        // Very basic syntax highlighting
        const highlightedLine = line
          .replace(/(".*?")/g, '<span class="text-green-500 dark:text-green-400">$1</span>') // strings
          .replace(/\b(function|return|if|for|while|var|let|const|import|export|from)\b/g,
                  '<span class="text-purple-500 dark:text-purple-400">$1</span>') // keywords
          .replace(/\b(true|false|null|undefined)\b/g,
                  '<span class="text-yellow-500 dark:text-yellow-400">$1</span>') // literals
          .replace(/\b(\d+)\b/g, '<span class="text-blue-500 dark:text-blue-400">$1</span>'); // numbers

        return `<div class="code-line flex"><span class="line-number text-gray-400 select-none mr-4 opacity-50">${i + 1}</span><span class="flex-1">${highlightedLine}</span></div>`;
      }).join('');

      return `
        <div class="code-block-wrapper relative my-6 rounded-lg overflow-hidden shadow-md">
          <div class="code-header flex items-center justify-between bg-gray-200 dark:bg-gray-700 px-4 py-2 text-sm">
            <div class="flex items-center">
              <span class="font-mono">&lt;/&gt;</span>
              <span class="ml-2">${language || 'code'}</span>
            </div>
            <button class="copy-button flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <span class="mr-1">📋</span>
              <span>Copy</span>
            </button>
          </div>
          <pre class="!bg-gray-100 !dark:bg-gray-800 !p-4 !overflow-x-auto !text-sm !leading-relaxed !m-0 !rounded-none">${lines}</pre>
        </div>
      `;
    });

    // Process lists with better styling
    html = html.replace(/^\s*-\s*(.*$)/gm, '<li class="ml-6 list-disc py-1">$1</li>');
    html = html.replace(/(<li.*?>\s*.*?\s*<\/li>\s*)+/g, '<ul class="my-6 space-y-1">$&</ul>');

    // Process paragraphs with better typography
    html = html.replace(
      /^(?!<[hl\d]|<ul|<div class="code-block-wrapper)/gm,
      '<p class="my-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">'
    );
    html = html.replace(/^(.+)$/gm, (match, p1) => {
      if (!p1.startsWith('<')) {
        return `<p class="my-6 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">${p1}</p>`;
      }
      return match;
    });

    // Process bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // Process links with better styling
    html = html.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="text-gray-900 dark:text-gray-100 font-medium border-b border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-300 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    return html;
  };

  // Function to copy the current URL to clipboard
  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Function to scroll to top
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Share URLs - using useEffect to ensure window is available
  const [shareUrls, setShareUrls] = useState({
    twitter: '',
    facebook: '',
    linkedin: '',
    email: ''
  });

  // Set up share URLs after component mounts (client-side only)
  useEffect(() => {
    setShareUrls({
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      email: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Check out this article: ${window.location.href}`)}`
    });
  }, [post.title]);

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-30">
        <div
          className="h-full bg-gray-800 dark:bg-gray-600 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <section className="py-12 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div>
            {/* Main content */}
            <div ref={articleRef}>
              {/* Mobile TOC toggle */}
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setShowToc(!showToc)}
                  className="flex items-center justify-between w-full px-4 py-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white"
                >
                  <div className="flex items-center">
                    <List className="h-5 w-5 mr-2 text-gray-700 dark:text-gray-300" />
                    <span className="font-medium">Table of Contents</span>
                  </div>
                  <div className={`transform transition-transform ${showToc ? 'rotate-180' : ''}`}>
                    <ArrowUp className="h-5 w-5" />
                  </div>
                </button>

                {/* Mobile TOC dropdown */}
                {showToc && (
                  <div className="mt-2 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                    <nav className="space-y-1 text-sm">
                      {tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          onClick={() => setShowToc(false)}
                          className={cn(
                            "block py-2 px-3 rounded-md transition-colors",
                            "hover:bg-gray-100 dark:hover:bg-gray-800",
                            activeHeading === item.id
                              ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
                              : "text-gray-700 dark:text-gray-300",
                            item.level === 1 ? "font-medium" : "",
                            item.level === 2 ? "pl-6" : "",
                            item.level === 3 ? "pl-9" : ""
                          )}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
              </div>


              {/* Article content */}
              <motion.article
                className="prose prose-lg dark:prose-invert max-w-none prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent prose-pre:overflow-visible"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
              />

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Share section */}
              <motion.div
                className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Share this article</h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={shareUrls.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-5 w-5 mr-2" />
                    <span className="text-sm">Twitter</span>
                  </a>
                  <a
                    href={shareUrls.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-5 w-5 mr-2" />
                    <span className="text-sm">Facebook</span>
                  </a>
                  <a
                    href={shareUrls.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                  <a
                    href={shareUrls.email}
                    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Share via Email"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    <span className="text-sm">Email</span>
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors relative"
                    aria-label="Copy link"
                  >
                    {copied ? (
                      <>
                        <Check className="h-5 w-5 mr-2 text-green-500" />
                        <span className="text-sm">Copied!</span>
                      </>
                    ) : (
                      <>
                        <LinkIcon className="h-5 w-5 mr-2" />
                        <span className="text-sm">Copy link</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full bg-gray-800 text-white shadow-lg transition-opacity duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 ${
            readingProgress > 20 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </section>
    </>
  );
}

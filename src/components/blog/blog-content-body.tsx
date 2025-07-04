import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Check, Link as LinkIcon, List, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import parse, { HTMLReactParserOptions, Element, domToReact } from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { Container } from "@/components/ui/Container";

interface BlogContentBodyProps {
  content: string;
  className?: string;
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export function BlogContentBody({ content, className }: BlogContentBodyProps) {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const [showToc, setShowToc] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<{ [key: string]: HTMLElement | null }>({});
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
    const headings = extractHeadings(content);
    setTableOfContents(headings);
  }, [content]);

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
    const handleCopyButtonClick = () => {
      const copyButtons = document.querySelectorAll('.copy-button');
      copyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          const codeBlock = (button as HTMLElement).closest('.code-block-wrapper')?.querySelector('pre');
          if (codeBlock) {
            const code = codeBlock.textContent || '';
            navigator.clipboard.writeText(code.replace(/^\d+\s+/gm, ''));

            // Show copied state
            const originalText = button.innerHTML;
            button.innerHTML = '<span class="text-green-500 dark:text-green-400 flex items-center"><svg class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg> Copied!</span>';

            // Reset after 2 seconds
            setTimeout(() => {
              button.innerHTML = originalText;
            }, 2000);
          }
        });
      });
    };

    // Run after component mounts and whenever content changes
    setTimeout(handleCopyButtonClick, 500);

    return () => {
      // Clean up event listeners
      const copyButtons = document.querySelectorAll('.copy-button');
      copyButtons.forEach(button => {
        button.removeEventListener('click', handleCopyButtonClick);
      });
    };
  }, [content]);

  // Convert markdown to HTML first (similar to the previous implementation)
  const markdownToHtml = (content: string) => {
    // Helper function to get ID for a heading text
    const getHeadingId = (text: string): string => {
      // Use the ID from headingIdsRef if available
      if (headingIdsRef.current.has(text)) {
        return headingIdsRef.current.get(text)!;
      }

      // Fallback to generating a new ID if not found in the mapping
      const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
      return id;
    };

    // Process headings with IDs for linking
    let html = content
      .replace(/^# (.*$)/gm, (match, p1) => {
        const id = getHeadingId(p1);
        return `<h1 id="${id}">${p1}</h1>`;
      })
      .replace(/^## (.*$)/gm, (match, p1) => {
        const id = getHeadingId(p1);
        return `<h2 id="${id}">${p1}</h2>`;
      })
      .replace(/^### (.*$)/gm, (match, p1) => {
        const id = getHeadingId(p1);
        return `<h3 id="${id}">${p1}</h3>`;
      })
      .replace(/^#### (.*$)/gm, (match, p1) => {
        const id = getHeadingId(p1);
        return `<h4 id="${id}">${p1}</h4>`;
      });

    // Process code blocks
    html = html.replace(/```([\s\S]*?)```/g, (match, p1) => {
      // Extract language if specified
      const firstLine = p1.trim().split('\n')[0];
      let language = '';
      let code = p1.trim();

      if (firstLine && !firstLine.includes(' ') && firstLine.length < 20) {
        language = firstLine;
        code = p1.trim().substring(firstLine.length).trim();
      }

      return `<pre><code class="language-${language || 'text'}">${code}</code></pre>`;
    });

    // Process lists
    html = html.replace(/^\s*-\s*(.*$)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>\s*)+/g, '<ul>$&</ul>');

    // Process paragraphs
    html = html.replace(/^(?!<[hpuli\d]|<pre|<div)/gm, '<p>$&</p>');

    // Process bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Process links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    return html;
  };

  // Parse HTML to React components
  const parseHtml = (html: string) => {
    const options: HTMLReactParserOptions = {
      replace: (domNode) => {
        if (domNode instanceof Element) {
          // Handle headings with anchor links
          if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(domNode.name)) {
            const id = domNode.attribs.id || '';
            const level = parseInt(domNode.name.substring(1));
            const headingClasses = {
              h1: "text-3xl font-bold mt-12 mb-6",
              h2: "text-2xl font-bold mt-10 mb-4",
              h3: "text-xl font-bold mt-8 mb-3",
              h4: "text-lg font-bold mt-6 mb-2",
              h5: "text-base font-bold mt-4 mb-2",
              h6: "text-sm font-bold mt-4 mb-2",
            };

            return (
              <div
                id={id}
                className={cn(
                  headingClasses[domNode.name as keyof typeof headingClasses],
                  "group flex items-center scroll-mt-20"
                )}
              >
                <span>{domToReact(domNode.children, options)}</span>
                <a
                  href={`#${id}`}
                  className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Link to ${domToReact(domNode.children, options)}`}
                >
                  <span className="text-gray-700 dark:text-gray-300">#</span>
                </a>
              </div>
            );
          }

          // Handle code blocks
          if (domNode.name === 'pre' && domNode.children[0]?.name === 'code') {
            const codeElement = domNode.children[0] as Element;
            const className = codeElement.attribs.class || '';
            const language = className.replace('language-', '') || 'text';
            const code = codeElement.children[0]?.data || '';

            return (
              <CodeBlock language={language}>
                {code}
              </CodeBlock>
            );
          }

          // Handle images with Next.js Image component
          if (domNode.name === 'img') {
            const { src, alt, width, height } = domNode.attribs;
            const imgWidth = width ? parseInt(width) : 800;
            const imgHeight = height ? parseInt(height) : 500;

            return (
              <div className="my-8 relative">
                <Image
                  src={src}
                  alt={alt || ''}
                  width={imgWidth}
                  height={imgHeight}
                  className="rounded-md w-full h-auto object-cover"
                />
                {domNode.next?.name === 'figcaption' && (
                  <figcaption className="text-sm text-center text-gray-700 dark:text-gray-300 mt-2">
                    {domToReact(domNode.next.children, options)}
                  </figcaption>
                )}
              </div>
            );
          }

          // Handle internal links with Next.js Link component
          if (domNode.name === 'a') {
            const { href } = domNode.attribs;
            const isInternal = href && href.startsWith('/');

            if (isInternal) {
              return (
                <Link
                  href={href}
                  className="text-gray-900 dark:text-white font-medium border-b border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-gray-300 transition-colors"
                >
                  {domToReact(domNode.children, options)}
                </Link>
              );
            }

            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white font-medium border-b border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-gray-300 transition-colors"
              >
                {domToReact(domNode.children, options)}
              </a>
            );
          }

          // Handle paragraphs
          if (domNode.name === 'p') {
            return (
              <p className="my-6 text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
                {domToReact(domNode.children, options)}
              </p>
            );
          }

          // Handle lists
          if (domNode.name === 'ul') {
            return (
              <ul className="my-6 space-y-1 list-disc pl-6">
                {domToReact(domNode.children, options)}
              </ul>
            );
          }

          if (domNode.name === 'ol') {
            return (
              <ol className="my-6 space-y-1 list-decimal pl-6">
                {domToReact(domNode.children, options)}
              </ol>
            );
          }

          if (domNode.name === 'li') {
            return (
              <li className="py-1">
                {domToReact(domNode.children, options)}
              </li>
            );
          }

          // Handle blockquotes
          if (domNode.name === 'blockquote') {
            return (
              <blockquote className="my-6 pl-4 border-l-4 border-gray-400 dark:border-gray-600 italic text-gray-800 dark:text-gray-200">
                {domToReact(domNode.children, options)}
              </blockquote>
            );
          }
        }

        return undefined;
      }
    };

    return parse(html, options);
  };

  // Function to copy the current URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Share URLs - using state to store them
  const [shareUrls, setShareUrls] = useState({
    twitter: '',
    facebook: '',
    linkedin: '',
    email: ''
  });

  // Set up share URLs after component mounts (client-side only)
  useEffect(() => {
    // Use the document title as the content title for sharing
    const title = document.title;

    setShareUrls({
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${window.location.href}`)}`
    });
  }, []);

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 z-30">
        <div
          className="h-full bg-gray-700 dark:bg-gray-400 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <section className={cn("py-12 relative", className)}>
        <Container size="blog">
          <div>
            {/* Main content */}
            <div ref={articleRef}>
              {/* Mobile TOC toggle */}
              {tableOfContents.length > 0 && (
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
                                : "text-gray-800 dark:text-gray-200",
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
              )}

              {/* Article content */}
              <motion.article
                className="prose prose-lg dark:prose-invert max-w-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {parseHtml(markdownToHtml(content))}
              </motion.article>

              {/* Share section */}
              <motion.div
                className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800"
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
                    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter className="h-5 w-5 mr-2" />
                    <span className="text-sm">Twitter</span>
                  </a>
                  <a
                    href={shareUrls.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="h-5 w-5 mr-2" />
                    <span className="text-sm">Facebook</span>
                  </a>
                  <a
                    href={shareUrls.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                  <a
                    href={shareUrls.email}
                    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Share via Email"
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    <span className="text-sm">Email</span>
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
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
        </Container>

        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 p-3 rounded-full bg-gray-900 dark:bg-gray-700 text-white shadow-lg transition-opacity duration-300 hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
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

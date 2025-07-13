"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  language: string;
  withCopyButton?: boolean;
  className?: string;
}

/**
 * CodeBlock component for rendering code snippets with syntax highlighting
 * and a copy-to-clipboard button.
 */
export function CodeBlock({
  children,
  language,
  withCopyButton = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract the code content from children
  const code = React.Children.toArray(children)
    .map((child) => (typeof child === "string" ? child : ""))
    .join("");

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div
      className={cn(
        "relative my-6 rounded-lg overflow-hidden border border-[hsl(var(--border))]",
        "bg-[hsl(var(--muted))] dark:bg-[hsl(var(--muted))]",
        "shadow-md group",
        className
      )}
    >
      {/* Language badge */}
      <div className="flex items-center justify-between px-4 py-2 bg-[hsl(var(--muted))] border-b border-[hsl(var(--border))]">
        <div className="text-sm font-mono text-[hsl(var(--foreground))] opacity-80">
          {language || "code"}
        </div>

        {/* Copy button */}
        {withCopyButton && (
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
            onClick={handleCopy}
            aria-label={copied ? "Copied!" : "Copy code to clipboard"}
          >
            {copied ? (
              <div className="flex items-center gap-1 text-green-500">
                <Check className="h-4 w-4" />
                <span className="text-xs">Copied!</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Copy className="h-4 w-4" />
                <span className="text-xs">Copy</span>
              </div>
            )}
          </Button>
        )}
      </div>

      {/* Code content with syntax highlighting */}
      <div className="relative">
        <SyntaxHighlighter
          language={language || "text"}
          style={nord}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "0.9rem",
            lineHeight: 1.5,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            backgroundColor: "transparent",
          }}
          codeTagProps={{
            style: {
              fontFamily: "inherit",
            },
          }}
          showLineNumbers
          wrapLines
        >
          {code}
        </SyntaxHighlighter>

        {/* Absolute positioned copy button for mobile (always visible) */}
        {withCopyButton && (
          <div className="absolute top-2 right-2 md:hidden">
            <Button
              variant="secondary"
              size="sm"
              className="opacity-90 hover:opacity-100 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              onClick={handleCopy}
              aria-label={copied ? "Copied!" : "Copy code to clipboard"}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

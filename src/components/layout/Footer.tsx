"use client";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";

// Footer link group type
type FooterLinkGroup = {
  title: string;
  links: {
    title: string;
    href: string;
    isExternal?: boolean;
    isNew?: boolean;
  }[];
};

const footerLinks: FooterLinkGroup[] = [
  {
    title: "Documentation",
    links: [
      { title: "Getting Started", href: "/docs/getting-started" },
      { title: "API Reference", href: "/docs/api" },
      { title: "CLI", href: "/docs/cli", isNew: true },
      { title: "Examples", href: "/docs/examples" },
      { title: "Deployment", href: "/docs/deployment" },
    ],
  },
  {
    title: "Learn",
    links: [
      { title: "Quick Start", href: "/learn/quick-start" },
      { title: "Installation", href: "/learn/installation" },
      { title: "Tutorial", href: "/learn/tutorial" },
      { title: "Thinking in CHKwire", href: "/learn/thinking-in-chkwire" },
    ],
  },
  {
    title: "Explore",
    links: [
      { title: "Showcase", href: "/showcase" },
      { title: "Blog", href: "/blog" },
      { title: "Analytics", href: "/analytics", isNew: true },
      { title: "Templates", href: "/templates" },
      { title: "Enterprise", href: "/enterprise" },
    ],
  },
  {
    title: "Community",
    links: [
      { title: "GitHub", href: "https://github.com", isExternal: true },
      { title: "Discord", href: "https://discord.com", isExternal: true },
      { title: "Twitter", href: "https://twitter.com", isExternal: true },
      { title: "LinkedIn", href: "https://linkedin.com", isExternal: true },
      { title: "Meetups", href: "/community/meetups" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Careers", href: "/careers" },
      { title: "Contact", href: "/contact" },
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
    ],
  },
];

function FooterLink({ href, children, isExternal }: { href: string; children: React.ReactNode; isExternal?: boolean }) {
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-[#0070f3] dark:hover:text-[#0070f3] transition-colors"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-[#0070f3] dark:hover:text-[#0070f3] transition-colors"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-[1200px] px-6 pt-12 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.title}>
                    <div className="flex items-center">
                      <FooterLink href={link.href} isExternal={link.isExternal}>
                        {link.title}
                      </FooterLink>
                      {link.isNew && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-[#0070f3]/10 px-2 py-0.5 text-xs font-medium text-[#0070f3]">
                          New
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col sm:flex-row items-center mb-6 md:mb-0">
              <span className="text-xl font-bold bg-gradient-to-r from-[#0070f3] to-[#00a2ff] bg-clip-text text-transparent mr-3">
                CHKwire
              </span>
              <div className="flex items-center mt-3 sm:mt-0">
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  &copy; {new Date().getFullYear()} CHKwire. All rights reserved.
                </span>
                <span className="mx-2 text-neutral-300 dark:text-neutral-700">•</span>
                <span className="inline-flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                  <Heart size={14} className="text-red-500 mr-1" /> Made with love
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 dark:text-neutral-400 hover:text-[#1DA1F2] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 dark:text-neutral-400 hover:text-[#0077B5] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:info@chkwire.com"
                className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

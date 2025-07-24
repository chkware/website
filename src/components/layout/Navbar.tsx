"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
      scrolled
        ? "bg-white/90 dark:bg-black/90 backdrop-blur-md"
        : "bg-white dark:bg-black"
    )}>
      <Container size="large" className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Logo className="h-8 w-auto" />
        </Link>

        {/* Main Navigation - Desktop */}
        <div className="hidden md:flex items-center space-x-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/features">Features</NavLink>
          <NavLink href="/blog">Blog</NavLink>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          {/* GitHub */}
          <a
            href="https://github.com/chkware"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <Github size={16} />
            <span>Github</span>
          </a>

          {/* Dark Mode Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 p-2 flex items-center justify-center text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden fixed inset-0 z-50 overflow-y-auto transition-all duration-300 ease-in-out",
        isOpen ? "opacity-100 visible border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900" : "opacity-0 invisible"
      )}>
        <Container size="large" className="py-4 space-y-2">
          <div className="flex items-center justify-between mb-4">
            <Logo className="h-8 w-auto" />
            <button
              className="w-10 h-10 p-2 flex items-center justify-center text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <MobileNavLink href="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
          <MobileNavLink href="/features" onClick={() => setIsOpen(false)}>Features</MobileNavLink>
          <MobileNavLink href="/blog" onClick={() => setIsOpen(false)}>Blog</MobileNavLink>
          <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
          <MobileNavLink href="https://github.com/chkware" onClick={() => setIsOpen(false)}>Github</MobileNavLink>
        </Container>
      </div>
    </nav>
  );
}

// Desktop navigation link component
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Use Next.js Link for internal routes, regular anchor for external links
  if (href.startsWith('http') || href.startsWith('#')) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 cursor-pointer"
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 cursor-pointer"
    >
      {children}
    </Link>
  );
}

// Mobile navigation link component
function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onClick?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 cursor-pointer"
    >
      {children}
    </a>
  );
}

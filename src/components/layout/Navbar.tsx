"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Github, Menu, X } from "lucide-react";
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
          <NavLink href="/learn">Learn</NavLink>
          <NavLink href="/reference">Reference</NavLink>
          <NavLink href="/community">Community</NavLink>
          <NavLink href="/blog">Blog</NavLink>
        </div>

        {/* Right Section - Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:flex">
            <div className="relative group">
              <div className="flex items-center bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <div className="relative flex items-center">
                  <Search className="absolute left-3 text-gray-500 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-40 h-10 pl-9 pr-4 py-2 text-sm text-gray-900 dark:text-gray-100 bg-transparent rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:w-48 transition-all duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 p-2 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Github size={20} />
            <span className="sr-only">GitHub</span>
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
          <MobileNavLink href="/learn" onClick={() => setIsOpen(false)}>Learn</MobileNavLink>
          <MobileNavLink href="/reference" onClick={() => setIsOpen(false)}>Reference</MobileNavLink>
          <MobileNavLink href="/community" onClick={() => setIsOpen(false)}>Community</MobileNavLink>
          <MobileNavLink href="/blog" onClick={() => setIsOpen(false)}>Blog</MobileNavLink>

          <div className="pt-4 pb-2">
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded-lg bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 pl-10 pr-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
}

// Desktop navigation link component
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    >
      {children}
    </Link>
  );
}

// Mobile navigation link component
function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

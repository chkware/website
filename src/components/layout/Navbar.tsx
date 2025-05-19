"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Github, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
        ? "border-gray-100 dark:border-gray-800 bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm"
        : "bg-white dark:bg-black"
    )}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            CHKwire
          </span>
        </Link>

        {/* Main Navigation - Desktop */}
        <div className="hidden md:flex items-center space-x-1">
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
              <Button className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
                <Search size={18} />
                <span className="sr-only">Search</span>
              </Button>
              <div className="absolute right-0 top-full mt-1 w-60 origin-top-right rounded-xl bg-white p-1 shadow-lg ring-1 ring-gray-200 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <input
                  type="text"
                  placeholder="Search docs..."
                  className="w-full rounded-lg border-0 bg-gray-50 p-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Github size={18} />
            <span className="sr-only">GitHub</span>
          </a>

          {/* Dark Mode Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-screen border-t border-gray-100 dark:border-gray-800" : "max-h-0"
      )}>
        <div className="px-4 py-3 space-y-1">
          <MobileNavLink href="/learn" onClick={() => setIsOpen(false)}>Learn</MobileNavLink>
          <MobileNavLink href="/reference" onClick={() => setIsOpen(false)}>Reference</MobileNavLink>
          <MobileNavLink href="/community" onClick={() => setIsOpen(false)}>Community</MobileNavLink>
          <MobileNavLink href="/blog" onClick={() => setIsOpen(false)}>Blog</MobileNavLink>

          <div className="pt-2 pb-1">
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search docs..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Desktop navigation link component
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
      className="block px-3 py-2.5 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

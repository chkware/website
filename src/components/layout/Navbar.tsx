"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  const navItems = [
    { name: "Features", link: "#features" },
    { name: "How it Works", link: "#how-it-works" },
    { name: "Testimonials", link: "#testimonials" },
    { name: "Contact", link: "#contact" },
  ];

  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);

    // Handle smooth scrolling for section links
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        ref={navRef}
        animate={{
          y: visible ? 0 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 50,
        }}
        className="w-full bg-white/70 dark:bg-black/75 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-800/20"
      >
        <Container size="large" className="py-3">
          {/* Desktop Navigation */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors"
            >
              <Logo className="h-8 w-auto" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={(e) => handleNavItemClick(e, item.link)}
                  className="relative text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="https://www.chkware.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Docs
              </Link>
              <Link
                href="https://github.com/chkware"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Github size={16} />
                <span className="text-sm">GitHub</span>
              </Link>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground hover:bg-accent"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-4 pt-4"
              >
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.link}
                      onClick={(e) => handleNavItemClick(e, item.link)}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium py-2"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 space-y-2">
                    <Link
                      href="https://www.chkware.com/docs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 text-sm font-medium"
                    >
                      Docs
                    </Link>
                    <Link
                      href="https://github.com/chkware"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 py-2"
                    >
                      <Github size={16} />
                      <span className="text-sm">GitHub</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </motion.nav>
    </div>
  );
}


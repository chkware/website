"use client";
import Link from "next/link";
import { IconBrandLinkedin, IconBrandGithub, IconBrandX, IconBrandInstagram } from "@tabler/icons-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/logo";

// Social media links
const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com", icon: IconBrandLinkedin },
  { name: "GitHub", href: "https://github.com", icon: IconBrandGithub },
  { name: "Instagram", href: "https://instagram.com", icon: IconBrandInstagram },
  { name: "X", href: "https://x.com", icon: IconBrandX },
];

// Footer navigation structure
const navigation = {
  solutions: [
    { name: "API Testing", href: "/solutions/api-testing" },
    { name: "Test Automation", href: "/solutions/automation" },
    { name: "Documentation", href: "/solutions/docs" },
  ],
  resources: [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Blog", href: "/blog" },
    { name: "Support", href: "/support" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "#contact" },
    { name: "Careers", href: "/careers" },
    { name: "Privacy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/30 overflow-hidden">
      {/* Glowing effect from bottom */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-blue-500/10 via-blue-500/5 to-transparent pointer-events-none"></div>

      <Container size="large">
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Logo className="h-8 w-auto mb-6" />

                {/* Social Links */}
                <div className="flex items-center space-x-3">
                  {socialLinks.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/60 hover:bg-white/80 dark:bg-gray-800/60 dark:hover:bg-gray-700/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                      >
                        <span className="sr-only">{item.name}</span>
                        <IconComponent className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Solutions
              </h3>
              <ul className="space-y-3">
                {navigation.solutions.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Copyright - Left */}
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
                Copyright © 2021 - 2025 CHKware. Licensed under Mozilla Public License 2.0.
              </div>

              {/* Legal Links - Right */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <Link href="/terms" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  Terms
                </Link>
                <Link href="/privacy" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  Privacy
                </Link>
                <Link href="/cookies" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  Cookies
                </Link>
                <Link href="/sitemap" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

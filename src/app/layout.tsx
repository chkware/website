import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/lib/theme-context";

import { MDXComponents } from "@/components/mdx-components";
import { generateMetadata } from "@/lib/seo/metadata";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SearchConsoleMeta } from "@/components/analytics/SearchConsole";
import { PerformanceOptimizer } from "@/components/performance/PerformanceOptimizer";
import "@/styles/globals.css";

// Load Figtree font from Google Fonts
const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-figtree',
  preload: true,
});

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <SearchConsoleMeta />
        {/* Font preloading for better performance */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('chkware-theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = theme === 'dark' || (!theme && systemDark);

                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Font loading verification
              document.addEventListener('DOMContentLoaded', function() {
                const testElement = document.createElement('div');
                testElement.style.fontFamily = 'var(--font-figtree, system-ui), sans-serif';
                testElement.style.position = 'absolute';
                testElement.style.visibility = 'hidden';
                testElement.textContent = 'Font Test';
                document.body.appendChild(testElement);
                
                const computedStyle = window.getComputedStyle(testElement);
                console.log('🎨 Font family applied:', computedStyle.fontFamily);
                console.log('🎨 CSS Variable --font-figtree:', getComputedStyle(document.documentElement).getPropertyValue('--font-figtree'));
                console.log('🎨 Body classes:', document.body.className);
                
                document.body.removeChild(testElement);
              });
            `,
          }}
        />
      </head>
      <body className={`${figtree.className} ${figtree.variable} font-sans antialiased text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
        <GoogleAnalytics />
        <PerformanceOptimizer />
        <ThemeProvider>
          <MDXComponents>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </MDXComponents>
        </ThemeProvider>
      </body>
    </html>
  );
}

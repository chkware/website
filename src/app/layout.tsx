import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/lib/theme-context";
import { BackgroundElements } from "@/components/ui/BackgroundElements";
import { MDXComponents } from "@/components/mdx-components";
import { generateMetadata } from "@/lib/seo/metadata";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SearchConsoleMeta } from "@/components/analytics/SearchConsole";
import { PerformanceOptimizer } from "@/components/performance/PerformanceOptimizer";
import "@/styles/globals.css";

// Load Figtree font from Google Fonts
const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-figtree',
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
      </head>
      <body className={`${figtree.variable} font-sans antialiased text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
        <GoogleAnalytics />
        <PerformanceOptimizer />
        <BackgroundElements />
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

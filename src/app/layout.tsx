import type { Metadata } from "next";
import localFont from "next/font/local";
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

// Load the Supreme variable font
const supreme = localFont({
  src: [
    {
      path: '../../src/fonts/Supreme-Variable.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-supreme',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
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
      <body className={`${supreme.variable} font-sans antialiased text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
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

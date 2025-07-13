/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: "@mdx-js/react",
  },
});

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  compress: false,
  images: {
    unoptimized: true,
  },
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Optionally, add any other Next.js config below
  experimental: {
    mdxRs: true, // Use the new Rust-based MDX parser
    turbo: {
      // Configure Turbopack
      resolveAlias: {
        // Add any module aliases here
      },
    },
  },
};

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig);

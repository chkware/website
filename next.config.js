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
  // Removed 'output: export' to enable API routes
  trailingSlash: true,
  // Use default .next directory for better Vercel compatibility
  // distDir: 'dist', // Commented out for Vercel deployment
  compress: true, // Enable compression for production
  images: {
    unoptimized: true,
  },
  // Configure pageExtensions to include md and mdx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Webpack configuration to prevent chunk loading issues
  webpack: (config, { dev, isServer }) => {
    // Prevent chunk loading errors in development
    if (dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            default: false,
            vendors: false,
          },
        },
      };
    }
    return config;
  },
  // Optionally, add any other Next.js config below
  experimental: {
    mdxRs: true, // Use the new Rust-based MDX parser
  },
  turbopack: {
    // Configure Turbopack
    resolveAlias: {
      // Add any module aliases here
    },
  }
};

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig);

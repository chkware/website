/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  compress: false,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,  // Enabling strict mode for better debugging
  swcMinify: true,        // Optional: Enables SWC-based minification for better build performance
};

export default nextConfig;

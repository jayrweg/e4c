import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Performance Optimizations
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
    // Optimize images - use modern formats
    formats: ['image/webp', 'image/avif'],
    // Enable lazy loading by default
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize layout shift
    minimumCacheTTL: 60,
  },

  // Compress all responses
  compress: true,

  // Optimize production build
  productionBrowserSourceMaps: false,

  // Fix Render monorepo detection warning
  output: 'standalone',

  // Reduce bundle size with modular imports
  modularizeImports: {
    'framer-motion': {
      transform: 'framer-motion/dist/es/{{member}}',
    },
  },

  // Experimental performance features
  experimental: {
    optimizePackageImports: ['framer-motion', '@sanity/client'],
  },
};

export default nextConfig;

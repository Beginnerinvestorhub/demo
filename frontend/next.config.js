/** @type {import('next').NextConfig} */
const path = require('path');
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ });

// Optional bundle analyzer - only load if installed
let withBundleAnalyzer;
try {
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
} catch (error) {
  withBundleAnalyzer = config => config;
}

const nextConfig = withBundleAnalyzer(
  withMDX({
    reactStrictMode: true,
    compress: true,

    // output: 'export', // Disabled to allow API routes for auth/flags

    // Image optimization for static export
    images: {
      // unoptimized: true, // Only for static export
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'your-cdn.com',
        },
        {
          protocol: 'https',
          hostname: 'cdn.example.com',
        },
      ],
      formats: ['image/webp', 'image/avif'],
      minimumCacheTTL: 60 * 60 * 24 * 30,
      dangerouslyAllowSVG: false,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },

    // Environment variables
    env: {
      NEXT_PUBLIC_GOOGLE_ANALYTICS_ID:
        process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
      NUDGE_ENGINE_API_KEY: process.env.NUDGE_ENGINE_API_KEY,
      GCP_PROJECT_ID: process.env.GCP_PROJECT_ID,
    },

    // Page extensions
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

    // Static export configuration
    // output: 'export', // Commented out - API routes require server-side rendering
    // trailingSlash: true,
    // skipTrailingSlashRedirect: true,

    // For static export to Firebase Hosting, assetPrefix should be empty
    // assetPrefix: '', // Commented out - not needed without static export

    // Webpack optimizations
    webpack: (config, { buildId: _buildId, dev, isServer, defaultLoaders: _defaultLoaders, webpack: _webpack }) => {
      if (dev && !isServer) {
        config.optimization.splitChunks = {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              chunks: 'all',
            },
            charts: {
              test: /[\\/]node_modules[\\/](chart\.js|react-chartjs-2)[\\/]/,
              name: 'charts',
              priority: 20,
              chunks: 'all',
            },
          },
        };
      }

      // Fix: Disable usedExports to avoid conflict with cacheUnaffected
      config.optimization.usedExports = false;

      // Resolve aliases
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname),
        '@/components': path.resolve(__dirname, 'components'),
        '@/store': path.resolve(__dirname, 'store'),
        '@/hooks': path.resolve(__dirname, 'hooks'),
        '@/lib': path.resolve(__dirname, 'lib'),
        '@/styles': path.resolve(__dirname, 'styles'),
      };

      return config;
    },

    // Turbopack configuration
    turbopack: {
      resolveAlias: {
        '@': path.resolve(__dirname),
        '@/components': path.resolve(__dirname, 'components'),
        '@/store': path.resolve(__dirname, 'store'),
        '@/hooks': path.resolve(__dirname, 'hooks'),
        '@/lib': path.resolve(__dirname, 'lib'),
        '@/styles': path.resolve(__dirname, 'styles'),
      },
    },

    // Headers are not supported in static export
    // async headers() { ... }

    // Experimental features
    experimental: {
      optimizeCss: process.env.NODE_ENV === 'production',
      optimizePackageImports: [
        '@headlessui/react',
        'chart.js',
        'react-chartjs-2',
      ],
    },

    // Compiler optimizations
    compiler: {
      removeConsole:
        process.env.NODE_ENV === 'production'
          ? { exclude: ['error', 'warn'] }
          : false,
    },
  })
);

module.exports = nextConfig;

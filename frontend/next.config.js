/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable webpack compilation caching in development mode
      // to permanently prevent stale CSS/bundler state issues.
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;

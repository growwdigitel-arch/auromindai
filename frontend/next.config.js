/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
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

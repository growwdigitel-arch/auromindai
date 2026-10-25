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
  async redirects() {
    return [
      {
        source: '/orbion',
        destination: 'https://orbionagents.com',
        permanent: false,
      },
      {
        source: '/orbionagents',
        destination: 'https://orbionagents.com',
        permanent: false,
      },
      {
        source: '/orbion-agents',
        destination: 'https://orbionagents.com',
        permanent: false,
      },
      {
        source: '/orbionagents.com',
        destination: 'https://orbionagents.com',
        permanent: false,
      },
      {
        source: '/products/orbion',
        destination: 'https://orbionagents.com',
        permanent: false,
      },
      {
        source: '/products/orbionagents',
        destination: 'https://orbionagents.com',
        permanent: false,
      },
    ];
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

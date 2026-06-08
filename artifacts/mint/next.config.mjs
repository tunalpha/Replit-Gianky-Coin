/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/mint',
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: false,
      stream: false,
      util: false,
      url: false,
      assert: false,
      http: false,
      https: false,
      os: false,
      buffer: false,
    };
    return config;
  },
  experimental: {
    esmExternals: 'loose',
  },
};

export default nextConfig;

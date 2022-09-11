/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      extensionAlias: {
        ".js": [".ts", ".js"],
      },
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/schemas.v1.ChatService/:slug",
        destination: "http://localhost:8080/schemas.v1.ChatService/:slug",
      },
    ];
  },
};

module.exports = nextConfig;

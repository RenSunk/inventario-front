/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.inventario.tecno-service-soft.com",
      },
    ],
  },
};

module.exports = nextConfig

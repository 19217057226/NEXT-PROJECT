/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['antd', '@ant-design/icons', '@ant-design/cssinjs'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
}

module.exports = nextConfig

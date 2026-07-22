import type { NextConfig } from 'next'

const nextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.weserv.nl',
        port: '',
        pathname: '/',
      },
    ],
  },
  experimental: {
    reactCompiler: true,
  },
} satisfies NextConfig

export default nextConfig

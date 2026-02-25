import type { NextConfig } from 'next'

const config = {
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: 'http://localhost:8787/api/:path*',
    },
  ],
} satisfies NextConfig

export default config

import { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "images.weserv.nl",
        port: "",
        pathname: "/"
      }
    ]
  },
  experimental: {
    // typedRoutes: true, // with next 15.1.6, occurs error when build
    reactCompiler: true,
  }
} satisfies NextConfig

export default nextConfig;

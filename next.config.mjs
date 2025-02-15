/** @type {import('next').NextConfig} */
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
    typedRoutes: true,
  }
};

export default nextConfig;

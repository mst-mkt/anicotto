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
    // typedRoutes: true, // with next 15.1.6, occurs error when build
    reactCompiler: true,
  }
};

export default nextConfig;

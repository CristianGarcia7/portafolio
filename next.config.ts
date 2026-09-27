import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cpro7.wordpress.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

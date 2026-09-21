import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Allow preview subdomains for Keystone preview system
  allowedDevOrigins: [
    "preview.localhost",
    "*.preview.localhost",
    "preview.jboxai.com",
    "*.preview.jboxai.com",
  ],
  // Internal verification route used by the managed preview harness
  async rewrites() {
    return [
      { source: "/JBOX", destination: "/" },
      { source: "/jbox", destination: "/" },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

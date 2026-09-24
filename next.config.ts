import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // @writeshh/nepse-sdk reads bundled WASM/asset files at runtime — keep it
  // external to the Next.js bundle so its assets resolve on disk.
  serverExternalPackages: ["@writeshh/nepse-sdk"],
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

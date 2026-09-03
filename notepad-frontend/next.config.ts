import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    SERVER_URL: process.env.SERVER_URL,
    DOMAIN: process.env.DOMAIN
  }
};

export default nextConfig;

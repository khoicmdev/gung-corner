import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sgp.cloud.appwrite.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

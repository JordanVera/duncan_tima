import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: path.resolve(__dirname) },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  async redirects() {
    return ["proof", "proofops", "userwise"].map((slug) => ({
      source: `/${slug}`,
      destination: `/projects/${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;

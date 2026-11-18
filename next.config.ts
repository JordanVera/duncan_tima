import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: path.resolve(__dirname) },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      ...["opus-ortho", "amplify", "aioko"].map((slug) => ({
        source: `/${slug}`,
        destination: `/projects/${slug}`,
        permanent: true,
      })),
      ...["proof", "proofops", "userwise"].map((slug) => ({
        source: `/${slug}`,
        destination: "/projects",
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;

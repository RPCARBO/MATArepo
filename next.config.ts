// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode for catching potential issues
  reactStrictMode: true,

  // Generate a static export (outputs to `out/` folder)
  output: "export",

  // Optional: configure images if you plan to use Next.js <Image />
  images: {
    unoptimized: true, // required for static export
  },
};

export default nextConfig;

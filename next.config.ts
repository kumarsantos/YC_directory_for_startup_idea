import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true, //THis allow dangerously SVG's
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  //Enableing PPR model it is partial pre-rendering which provides static and dynamic rendering mechanism
  // experimental: {
  //   ppr: "incremental",
  // },
  // devIndicators: {
  //   appIsrStatus: true,
  //   buildActivity: true,
  //   buildActivityPosition: "bottom-right",
  // },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Serve /public images directly — avoids /_next/image failures on
    // restricted hosts and reverse-proxy setups (common production break).
    unoptimized: true,
  },
};

export default nextConfig;

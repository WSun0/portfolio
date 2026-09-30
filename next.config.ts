import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ] }];
  },
  async redirects() {
    return [
      { source: "/poker/journey", destination: "/poker", permanent: true },
      { source: "/poker/hands", destination: "/poker", permanent: true },
      ...['small-changes-for-health-improvements', 'detoxifying-life'].flatMap(slug => [
        { source: `/blog/${slug}`, destination: '/writing', permanent: true },
        { source: `/writing/${slug}`, destination: '/writing', permanent: true },
      ]),
      { source: "/blog", destination: "/writing", permanent: true },
      { source: "/blog/:slug", destination: "/writing/:slug", permanent: true },
    ];
  },
};

export default nextConfig;

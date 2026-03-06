const { i18n } = require("./next-i18next.config");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  i18n,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/pt-br",
        destination: "/pt-br/v2",
        permanent: false,
      },
      {
        source: "/en-gb",
        destination: "/en-gb/v2",
        permanent: false,
      },
      {
        source: "/es",
        destination: "/es-intl/v2",
        permanent: false,
      },
      {
        source: "/es-intl",
        destination: "/es-intl/v2",
        permanent: false,
      },
      {
        source: "/",
        destination: "/v2",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);

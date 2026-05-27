const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
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
      // ─── Locale shortcuts ───────────────────────────────────────────────
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
      // ─── Legacy v1 Pages Router routes → v2 equivalents ─────────────────
      // Uses temporary (302) until Pages Router is fully retired and
      // confirmed working, then promote to permanent (301).
      {
        source: "/contato",
        destination: "/v2/contato",
        permanent: false,
      },
      {
        source: "/sobre",
        destination: "/v2/sobre",
        permanent: false,
      },
      {
        source: "/projetos",
        destination: "/v2/projetos",
        permanent: false,
      },
      {
        source: "/projetos/:slug",
        destination: "/v2/projetos/:slug",
        permanent: false,
      },
      // /techs has no v2 equivalent yet — send to About (has Stack section)
      {
        source: "/techs",
        destination: "/v2/sobre",
        permanent: false,
      },
      // /cv has no v2 equivalent yet — redirect to About while we build it
      // TODO: replace destination with /v2/cv once App Router CV page is built
      {
        source: "/cv",
        destination: "/v2/sobre",
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

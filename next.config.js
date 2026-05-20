/** @type {import('next').NextConfig} */

const fs = require("fs");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

const localFeatured = path.join(__dirname, "src", "featured.local.ts");
const defaultFeatured = path.join(__dirname, "src", "featured.default.ts");
const featuredModule = fs.existsSync(localFeatured) ? localFeatured : defaultFeatured;

const withPWA = require("next-pwa")({
  dest: "public",
  skipWaiting: true,
  register: isProduction,
  disable: !isProduction,
});

module.exports = withPWA({
  transpilePackages: ["@void-cat/api"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("@getalby/bitcoin-connect", "@getalby/bitcoin-connect-react");
    }
    config.resolve.alias["@habla-featured"] = featuredModule;
    return config;
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      "en",
      "es",
      "ja",
      "de",
      "ru",
      "uk",
      "fa",
      "it",
      "zh",
      "eo",
      "sw",
      "he",
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
    return [
      {
        source: "/.well-known/nostr.json",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/.well-known/nostr.json",
        destination: "/api/nostr",
      },
    ];
  },
});

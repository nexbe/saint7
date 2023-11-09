/** @type {import('next').NextConfig} */

const path = require("path");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV == "development",
});

module.exports = withPWA({
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias["userUserStore"] = path.resolve(
      __dirname,
      "./store/user"
    );
    return config;
  },
});

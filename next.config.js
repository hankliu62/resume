const path = require("node:path");
const withLess = require("next-with-less");
const AutoBaseWebpackPlugin = require("autobase-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  lessLoaderOptions: {
    lessOptions: {
      cssModules: false,
      javascriptEnabled: true,
      paths: [
        path.resolve(__dirname, "node_modules"),
        path.resolve(__dirname, "src"),
      ],
    },
  },
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["antd"],
  webpack: (config) => {
    config.plugins.push(new AutoBaseWebpackPlugin());
    return config;
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/styles/animate.css/@4.1.1/animate.css",
  //       headers: [
  //         {
  //           key: "cache-control",
  //           value: "public, immutable, max-age=31536000",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = withLess(nextConfig);

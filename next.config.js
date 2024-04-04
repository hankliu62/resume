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
    console.log(
      config.output,
      config.plugins.find(function (plugin) {
        return (
          (plugin === null || plugin === void 0
            ? void 0
            : plugin.constructor) &&
          (plugin === null || plugin === void 0
            ? void 0
            : plugin.constructor.name) === "DefinePlugin"
        );
      })
    );
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

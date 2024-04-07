const path = require("node:path");
const withLess = require("next-with-less");
// const AutoBaseWebpackPlugin = require("autobase-webpack-plugin");

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
  env: {
    ROUTE_PREFIX: "",
  },
  // webpack: (config) => {
  //   config.plugins.push(new AutoBaseWebpackPlugin());
  //   return config;
  // },
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

// 是否通过github actions部署
const isGithubActions = process.env.GITHUB_ACTIONS || false;

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
  // 用于为静态资源（如图像、样式表、JavaScript 文件等）设置 URL 前缀
  // 这在将应用部署到自定义域名或 CDN 上时特别有用，因为它允许您将静态资源存储在不同的位置
  nextConfig.assetPrefix = `/${repo}/`;
  // 用于为应用设置基础路径(Link组件中，类似 history 里面的basename，在路由跳转时自动加前缀)
  // 这在将应用部署到子目录下时特别有用，因为它允许您指定应用所在的目录
  nextConfig.basePath = `/${repo}`;
  nextConfig.env.ROUTE_PREFIX = `/${repo}`;

  console.log("next config:", nextConfig);
}

module.exports = withLess(nextConfig);

/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  i18n: {
    locales: ["ko"],
    defaultLocale: "ko",
  },
};

(module.exports = removeImports({
  ...nextConfig,
})),
  withBundleAnalyzer({
    compress: true,
    webpack(config, { webpack }) {
      const prod = process.env.NODE_ENV === "production";
      const plugins = [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
      ];
      return {
        ...config,
        mode: prod ? "production" : "development",
        devtool: prod ? "hidden-source-map" : "eval",
        plugins,
      };
    },
  });

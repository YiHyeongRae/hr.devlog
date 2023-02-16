/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();
const withPlugins = require("next-compose-plugins");

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

module.exports = withPlugins([
  [removeImports({ ...nextConfig })],
  [
    withBundleAnalyzer({
      compress: true,
      webpack(nextConfig, { webpack }) {
        const prod = process.env.NODE_ENV === "production";
        const plugins = [
          ...nextConfig.plugins,
          new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /^\.\/ko$/
          ),
        ];
        return {
          ...nextConfig,
          mode: prod ? "production" : "development",
          devtool: prod ? "hidden-source-map" : "eval",
          plugins,
        };
      },
    }),
  ],

  // your other plugins here
]);
// (module.exports = removeImports({
//   ...nextConfig,
// })),
//   withBundleAnalyzer({
//     compress: true,
//     webpack(nextConfig, { webpack }) {
//       const prod = process.env.NODE_ENV === "production";
//       const plugins = [
//         ...nextConfig.plugins,
//         new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
//       ];
//       return {
//         ...nextConfig,
//         mode: prod ? "production" : "development",
//         devtool: prod ? "hidden-source-map" : "eval",
//         plugins,
//       };
//     },
//   });

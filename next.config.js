/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();
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

module.exports = removeImports({
  ...nextConfig,
});

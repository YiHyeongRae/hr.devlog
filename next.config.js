/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")();
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = removeImports({
  ...nextConfig,
});

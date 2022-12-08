/** @type {import('next').NextConfig} */

const removeImports = require('next-remove-imports')();
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

}

module.exports = removeImports({
  ...nextConfig
})

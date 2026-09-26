/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: process.env.GITHUB_PAGES === 'true' ? 'export' : undefined,
  basePath: process.env.PAGES_BASE_PATH || '',
  trailingSlash: true,
}

module.exports = nextConfig

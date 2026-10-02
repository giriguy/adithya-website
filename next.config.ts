import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'
const basePath = isGitHubPages ? '/adithya-website' : ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};
module.exports = nextConfig;
export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  basePath: "/AI-Chatbot", // Replace with your GitHub repo name
  assetPrefix: "/AI-Chatbot/", // Replace with your GitHub repo name
};

module.exports = nextConfig;

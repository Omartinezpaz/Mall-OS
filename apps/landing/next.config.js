/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@mallos/types", "@mallos/validators", "@mallos/design-tokens"],
};

module.exports = nextConfig;

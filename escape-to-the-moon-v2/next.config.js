/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  resolve: (config) => {

    config.resolve = {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    };
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
}
}

module.exports = nextConfig

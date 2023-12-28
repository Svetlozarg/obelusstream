/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["ik.imagekit.io", "image.tmdb.org"],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // port: "",
        pathname: "dixuzyoht/image/upload/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

const withTM = require("next-transpile-modules")(["gsap"]);

// module.exports = nextConfig;
// module.exports = withTM({});
module.exports = withTM(nextConfig);

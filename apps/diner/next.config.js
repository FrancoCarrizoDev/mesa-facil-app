/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  transpilePackages: ["@repo/ui", "database"],
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/**",
        protocol: "https",
        port: "",
      },
      {
        hostname: "s.gravatar.com",
        pathname: "/avatar/**",
        protocol: "https",
        port: "",
      },
    ],
  },
};

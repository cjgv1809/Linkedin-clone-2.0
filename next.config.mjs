/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "links.papareact.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "linkedinclone1809.blob.core.windows.net",
      },
      {
        protocol: "https",
        hostname: "linkedinclone1809storage.blob.core.windows.net",
      },
    ],
  },
};

export default nextConfig;

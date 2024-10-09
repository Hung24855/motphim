/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["firebasestorage.googleapis.com","img.ophim.live"]
    },
    async rewrites() {
      return [
        // {
        //   source: '/github-web',
        //   destination: 'https://github.com',
        // },
      ]
    },
};

export default nextConfig;

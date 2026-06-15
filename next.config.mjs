/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos', // 허용할 이미지 도메인 주소
        port: '',
        pathname: '/**', // 해당 도메인의 모든 경로 허용
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // 허용할 이미지 도메인 주소
        port: '',
        pathname: '/**', // 해당 도메인의 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;

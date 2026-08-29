import type { NextConfig } from "next";

const s3Hostname = process.env.AWS_BUCKET_NAME && process.env.AWS_REGION
  ? `${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`
  : null;

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      ...(s3Hostname ? [{ protocol: 'https' as const, hostname: s3Hostname }] : []),
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ],
  },
};

export default nextConfig;

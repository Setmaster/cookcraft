import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images:{
        domains: [
            'cdn.pixabay.com',
            'shift-swap-imgs.s3.us-east-1.amazonaws.com',
            'images.unsplash.com',
        ],
    },
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ibb.co',
                port: '',
                pathname: '/ibb.co/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'solar-hub.s3.eu-north-1.amazonaws.com'
            },
            {
                protocol: 'https',
                hostname: 'solar-hub.s3.amazonaws.com'
            }
        ]
    }
};

export default nextConfig;

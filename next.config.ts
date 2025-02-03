import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    // basePath: '/payments-ltd',
    typescript: {
        ignoreBuildErrors: true,
    },

};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.csv$/,
            use: 'csv-loader',
        });
        return config;
    },

};

export default nextConfig;

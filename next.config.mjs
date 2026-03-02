/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "styles.redditmedia.com",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports not ending in ".inline.svg"
      {
        test: /(?<!inline)\.svg$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 512,
              publicPath: "/_next/static/svgs",
              outputPath: "static/svgs",
              fallback: "file-loader",
            },
          },
          {
            loader: "svgo-loader",
          },
        ],
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.inline.svg$/i,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        removeViewBox: false,
                      },
                    },
                  },
                  "prefixIds",
                ],
              },
            },
          },
        ],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  async redirects() {
    if (process.env.NODE_ENV !== "production") {
      return [];
    }

    return [
      {
        source: "/",
        destination: "https://novu.co/inbox/playground",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

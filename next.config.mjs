import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  // default page를 redirects으로 Login 페이지를 설정합니다.
  // https://nextjs.org/docs/pages/api-reference/next-config-js/redirects
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Login',
        permanent: true,
      },
    ];
  },
});
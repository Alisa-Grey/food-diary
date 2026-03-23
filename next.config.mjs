function getAPIEndpoint() {
  if (process.env.APP_ENV === 'production') {
    return 'https://example.prog';
  } else {
    return 'https://example.dev';
  }
}

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  compiler: {
    styledComponents: true,
  },
  compress: true,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_API_URL: getAPIEndpoint(),
  },
};

export default nextConfig;

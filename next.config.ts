import type { NextConfig } from 'next';

const githubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_BASE_PATH: githubPages ? '/Persona-Hate' : '' },
  ...(githubPages
    ? {
        output: 'export',
        basePath: '/Persona-Hate',
        // An absolute prefix keeps Vinext's output in _next/static while
        // serving it from the repository's GitHub Pages subdirectory.
        assetPrefix: 'https://zxyreal.github.io/Persona-Hate',
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;

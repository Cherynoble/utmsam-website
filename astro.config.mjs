import { defineConfig } from 'astro/config';

// Static content site. No SSR, no client framework.
// See DESIGN.md section "Why Astro" for the reasoning.
export default defineConfig({
  site: 'https://cherynoble.github.io',
  base: '/utmsam-website',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  compressHTML: true,
});

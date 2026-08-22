import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static content site. No SSR, no client framework.
// See DESIGN.md section "Why Astro" for the reasoning.

// The society's home is utmsam.sa.utoronto.ca. GitHub Pages is a temporary
// host while that domain still serves the old site, and it is deployed with
// GH_PAGES=1 so it builds under the /utmsam-website prefix and is kept out of
// the index — two copies of the same site compete with each other otherwise.
// When the move happens: delete this flag, the branch below, and the env line
// in .github/workflows/deploy.yml.
const temporaryHost = process.env.GH_PAGES === '1';

export default defineConfig({
  site: temporaryHost ? 'https://cherynoble.github.io' : 'https://utmsam.sa.utoronto.ca',
  base: temporaryHost ? '/utmsam-website' : '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  compressHTML: true,
  // /styleguide is an internal reference page, not public content.
  integrations: [sitemap({ filter: (page) => !page.includes('/styleguide') })],
});

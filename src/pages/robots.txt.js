// Generated rather than static: the temporary GitHub Pages host must stay out
// of the index while utmsam.sa.utoronto.ca still serves the old site.
// See astro.config.mjs.
export const GET = ({ site }) => {
  const temporaryHost = process.env.GH_PAGES === '1';
  const body = temporaryHost
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site)}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};

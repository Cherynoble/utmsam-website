/**
 * Generates public/favicon.svg from the emblem bitmap, so the favicon can
 * never drift out of sync with the mark. Runs as part of `npm run build`.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { toRects } from '../src/lib/pixel.js';
import { mark } from '../src/lib/icons.js';

// The favicon cannot reference CSS custom properties, so the ramp is
// resolved to literals here. Keep in step with src/styles/tokens.css.
const RESOLVED = {
  '1': '#1f1f1f', '2': '#c62c15', '3': '#ef6a1e',
  '4': '#f9871a', '5': '#ffa110', '6': '#ffb02e',
};

const rects = toRects(mark)
  .map(r => `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${RESOLVED[r.ch]}"/>`)
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges"><rect width="16" height="16" fill="#fffaeb"/>${rects}</svg>`;
mkdirSync('public', { recursive: true });
writeFileSync('public/favicon.svg', svg);
console.log(`favicon.svg written (${svg.length} bytes)`);

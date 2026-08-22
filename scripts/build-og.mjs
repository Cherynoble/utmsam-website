/**
 * Generates public/og.png, the card that renders when someone pastes a link
 * to the site into Discord, Instagram, or a group chat.
 *
 * Built from the same block field as the homepage hero rather than from a
 * screenshot, so the share card is the site's own material at share-card
 * proportions instead of a shrunken page.
 *
 * Run by hand and commit the result:
 *
 *     node scripts/build-og.mjs
 *
 * Deliberately not wired into `npm run build`. It renders SVG text, which
 * needs a system font; the GitHub Actions runner does not have Arial, so a
 * build-time version would silently produce a card with no words on it.
 *
 * sharp comes with Astro. No dependency is added for this.
 */
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { buildField } from '../src/lib/field.js';
import { toRects } from '../src/lib/pixel.js';

const W = 1200;
const H = 630;

// The real token values. tokens.css is the source of truth; these are copied
// rather than parsed, because a build script that parses CSS to find six
// hexes is a parser nobody asked for.
const INK = '#1f1f1f';
const IVORY = '#fffaeb';
const RAMP = ['#ffd21f', '#ffb02e', '#ffa110', '#f9871a', '#ef6a1e', '#c62c15'];
const HEX = { '1': INK, '2': RAMP[5], '3': RAMP[4], '4': RAMP[3], '5': RAMP[2], '6': RAMP[1], '7': RAMP[0], '8': '#fff0c2' };

// Same generator and seed as the sponsors hero, at share-card proportions.
const GW = 16;
const GH = 13;
const { cells, path } = buildField(GW, GH, 41772);
const grid = cells.map(row => [...row]);
for (const [x, y] of path) grid[y][x] = '1';

const FIELD_X = 700;
const FIELD_W = W - FIELD_X;
const FIELD_H = H - 14;
const cw = FIELD_W / GW;
const ch = FIELD_H / GH;

// Half-pixel overdraw on width and height: the cells are fractional, and
// without it the rounding leaves hairline ivory seams between blocks.
const blocks = toRects(grid.map(r => r.join('')))
  .map(r => `<rect x="${(r.x * cw).toFixed(2)}" y="${(r.y * ch).toFixed(2)}" width="${(r.w * cw + 0.5).toFixed(2)}" height="${(r.h * ch + 0.5).toFixed(2)}" fill="${HEX[r.ch] ?? IVORY}"/>`)
  .join('');

const strip = RAMP
  .map((c, i) => `<rect x="${(i * W) / 6}" y="${H - 14}" width="${W / 6 + 1}" height="14" fill="${c}"/>`)
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${IVORY}"/>
  <g transform="translate(${FIELD_X},0)">${blocks}</g>
  <text x="72" y="250" font-family="Arial" font-size="86" fill="${INK}" letter-spacing="-2">UTMSAM</text>
  <text x="72" y="322" font-family="Arial" font-size="30" fill="#3d3d3d">Models that leave the classroom.</text>
  <text x="72" y="382" font-family="Arial" font-size="26" fill="#3d3d3d">A student-run society at UTM applying machine</text>
  <text x="72" y="418" font-family="Arial" font-size="26" fill="#3d3d3d">learning and modeling to real problems.</text>
  ${strip}
</svg>`;

const mark = await sharp(await readFile('public/mark.png')).resize(96).png().toBuffer();

const out = await sharp(Buffer.from(svg))
  .composite([{ input: mark, left: 72, top: 92 }])
  .png({ compressionLevel: 9 })
  .toBuffer();

await writeFile('public/og.png', out);
const { width, height } = await sharp(out).metadata();
console.log(`public/og.png  ${width}x${height}  ${(out.length / 1024).toFixed(1)} kB`);

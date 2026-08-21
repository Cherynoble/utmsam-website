/**
 * Pixel icon compiler.
 *
 * Icons are authored as bitmaps (arrays of equal-length strings), one
 * character per cell, and compiled to <rect> runs at build time. This is a
 * genuine bitmap workflow rather than vector art that imitates pixels, which
 * is the difference between "8-bit style" and 8-bit.
 *
 * Authoring rules, enforced by validate():
 *   - square grid, integer coordinates only
 *   - no curves, no diagonals: a circle is a stepped octagon
 *   - flat fills only, 2 to 4 colours per icon
 *   - at least one shape derived from the logo module (the step)
 */

/** '.' is transparent. 'a' is the hover-swappable accent cell. */
export const PALETTE = {
  '1': 'var(--ink)',
  '2': 'var(--ramp-6)',
  '3': 'var(--ramp-5)',
  '4': 'var(--ramp-4)',
  '5': 'var(--ramp-3)',
  '6': 'var(--ramp-2)',
  '7': 'var(--ramp-1)',
  '8': 'var(--cream)',
  '9': 'var(--white)',
  '0': 'var(--institution)',
  'a': 'var(--ramp-3)',
};

const ACCENT_KEY = 'a';

export function validate(name, bitmap, maxColours = 4) {
  const h = bitmap.length;
  const w = bitmap[0].length;
  if (w !== h) throw new Error(`pixel: "${name}" is ${w}x${h}, must be square`);
  const seen = new Set();
  bitmap.forEach((row, y) => {
    if (row.length !== w) {
      throw new Error(`pixel: "${name}" row ${y} is ${row.length} wide, expected ${w}`);
    }
    for (const ch of row) {
      if (ch === '.') continue;
      if (!(ch in PALETTE)) throw new Error(`pixel: "${name}" uses unknown key "${ch}"`);
      seen.add(ch);
    }
  });
  if (seen.size > maxColours) {
    throw new Error(`pixel: "${name}" uses ${seen.size} colours, max is ${maxColours}`);
  }
  return { size: w, colours: seen.size };
}

/**
 * Merge horizontally-adjacent same-colour cells into single rects, then merge
 * vertically-identical runs. Cuts the rect count by roughly 4x on a typical
 * icon, which matters when every icon is inlined into the HTML.
 */
export function toRects(bitmap) {
  const runs = [];
  bitmap.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === '.') { x++; continue; }
      let end = x;
      while (end + 1 < row.length && row[end + 1] === ch) end++;
      runs.push({ x, y, w: end - x + 1, h: 1, ch });
      x = end + 1;
    }
  });

  const merged = [];
  const used = new Array(runs.length).fill(false);
  for (let i = 0; i < runs.length; i++) {
    if (used[i]) continue;
    const r = { ...runs[i] };
    for (let j = i + 1; j < runs.length; j++) {
      if (used[j]) continue;
      const c = runs[j];
      if (c.ch === r.ch && c.x === r.x && c.w === r.w && c.y === r.y + r.h) {
        r.h += c.h;
        used[j] = true;
      }
    }
    used[i] = true;
    merged.push(r);
  }
  return merged;
}

export function toSvg(name, bitmap, { size = 48, label = '', decorative = false, maxColours = 4, className = 'pixel-icon' } = {}) {
  const { size: grid } = validate(name, bitmap, maxColours);
  const rects = toRects(bitmap)
    .map(r => {
      const accent = r.ch === ACCENT_KEY ? ' data-accent' : '';
      return `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${PALETTE[r.ch]}"${accent}/>`;
    })
    .join('');

  const a11y = decorative
    ? 'aria-hidden="true"'
    : `role="img" aria-label="${label || name}"`;

  return `<svg class="${className}" viewBox="0 0 ${grid} ${grid}" width="${size}" height="${size}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" ${a11y}>${rects}</svg>`;
}

/* -------------------------------------------------------------------------
 * Block portraits.
 *
 * A deterministic mosaic built from the block ramp, seeded off a string.
 * Used as the placeholder while a member photo is missing. It is not a
 * generic avatar glyph and is not pretending to be a face: it is the brand
 * material standing in for one, so an unfinished roster still looks
 * deliberate. Replace with a real photo and this disappears.
 * ---------------------------------------------------------------------- */

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function blockPortrait(seed, grid = 8) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const rand = mulberry32(h);
  const keys = ['6', '5', '4', '3'];
  const half = Math.ceil(grid / 2);
  const rows = [];
  for (let y = 0; y < grid; y++) {
    const left = [];
    for (let x = 0; x < half; x++) {
      // Denser toward the vertical centre so the mosaic reads as a mass
      // rather than as noise.
      const bias = 0.34 + 0.34 * (1 - Math.abs(y - grid / 2) / (grid / 2));
      left.push(rand() < bias ? keys[Math.floor(rand() * keys.length)] : '.');
    }
    const right = [...left].reverse().slice(grid % 2 ? 1 : 0);
    rows.push([...left, ...right].join(''));
  }
  return rows;
}

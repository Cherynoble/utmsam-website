/**
 * A loss surface, drawn in blocks.
 *
 * Cells are coloured by their distance from a minimum, so the field reads as
 * a basin: bright yellow at high loss, ember at the floor. An ink path steps
 * downhill from a starting corner to the minimum, choosing at each step the
 * neighbour with the lowest value.
 *
 * This is the hero asset. It is a real visualisation of the thing the
 * society studies rather than an abstract pattern, and it is built from the
 * same block unit as the logo and every icon.
 */

/**
 * Anisotropic bowl. Two minima, one shallow, so the surface is not a target.
 * The seed places both basins: 9091 is the one on the homepage, picked from
 * a sheet of rolls because its walk is short and crosses the whole field.
 * rng() is defined below and hoisted.
 */
function basins(seed) {
  const r = rng(seed);
  return {
    ax: 0.30 + 0.55 * r(), ay: 0.25 + 0.5 * r(), aa: 1.0 + 0.9 * r(), ab: 1.6 + 1.2 * r(),
    bx: 0.10 + 0.5 * r(), by: 0.15 + 0.6 * r(), ba: 0.9 + 0.8 * r(), bb: 1.4 + 1.0 * r(),
    bo: 0.10 + 0.14 * r(),
  };
}

function loss(x, y, w, h, p) {
  const nx = x / (w - 1);
  const ny = y / (h - 1);
  const a = p.aa * (nx - p.ax) ** 2 + p.ab * (ny - p.ay) ** 2;
  const b = p.ba * (nx - p.bx) ** 2 + p.bb * (ny - p.by) ** 2 + p.bo;
  return Math.min(a, b);
}

export function buildField(w = 26, h = 15, seed = 9091) {
  const p = basins(seed);
  const grid = [];
  for (let y = 0; y < h; y++) {
    const row = [];
    for (let x = 0; x < w; x++) row.push(loss(x, y, w, h, p));
    grid.push(row);
  }

  // Six discrete bands. The gradient is an object here, not a wash: each
  // cell lands on exactly one ramp step, with hard edges between bands.
  // Keys 7 through 2 are the six ramp steps, yellow to ember. Key 1 is ink
  // and must never appear here: the field is material, the path is signal.
  //
  // Bands are cut on quantiles rather than on the raw range. Linear cuts put
  // two thirds of this surface in the darkest two steps; equal-area cuts read
  // as a contour map, which is what the thing actually is.
  const RAMP = ['7', '6', '5', '4', '3', '2'];
  const sorted = grid.flat().slice().sort((a, b) => a - b);
  const cuts = RAMP.slice(1).map((_, i) =>
    sorted[Math.floor(((i + 1) / RAMP.length) * (sorted.length - 1))]
  );
  const band = v => {
    let i = 0;
    while (i < cuts.length && v >= cuts[i]) i++;
    return i;
  };
  const cells = grid.map(row => row.map(v => RAMP[RAMP.length - 1 - band(v)]));

  // Steepest-descent walk. Starting bottom-left is deliberate: from the other
  // corners the walk stalls in the shallow basin, and a hero image of an
  // optimiser getting stuck is the wrong first note. From here it crosses the
  // whole field and reaches the true minimum.
  const path = [];
  let cx = 1, cy = h - 2;
  const seen = new Set();
  for (let step = 0; step < w * h; step++) {
    const key = `${cx},${cy}`;
    if (seen.has(key)) break;
    seen.add(key);
    path.push([cx, cy]);

    let best = null, bestV = grid[cy][cx];
    for (const [dx, dy] of [[1, 0], [0, 1], [1, 1], [0, -1], [-1, 0], [-1, 1], [-1, -1], [1, -1]]) {
      const nx = cx + dx, ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
      if (grid[ny][nx] < bestV) { bestV = grid[ny][nx]; best = [nx, ny]; }
    }
    if (!best) break;
    [cx, cy] = best;
  }

  return { cells, path, w, h };
}

/**
 * The noise field. Same six-band quantisation as buildField, but the
 * surface underneath is value noise rather than a bowl, so the contours
 * drift instead of ringing a minimum. Used as the /research hero
 * background, where a legible field beats a legible visualisation.
 *
 * `bias` tilts the surface darker toward the left, and `clamp` forces
 * every cell under the text block to the two darkest ramp steps, so
 * white type keeps its contrast whatever the seed rolls.
 */
function rng(seed) {
  return () => {
    seed = seed + 0x6d2b79f5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/** One octave of bilinear value noise, smoothstepped. */
function octave(rand, cols, rows) {
  const g = [];
  for (let y = 0; y <= rows + 1; y++) {
    const r = [];
    for (let x = 0; x <= cols + 1; x++) r.push(rand());
    g.push(r);
  }
  return (nx, ny) => {
    const fx = nx * cols, fy = ny * rows;
    const x0 = Math.min(Math.floor(fx), cols), y0 = Math.min(Math.floor(fy), rows);
    const tx = fx - x0, ty = fy - y0;
    const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
    const a = g[y0][x0] + (g[y0][x0 + 1] - g[y0][x0]) * sx;
    const b = g[y0 + 1][x0] + (g[y0 + 1][x0 + 1] - g[y0 + 1][x0]) * sx;
    return a + (b - a) * sy;
  };
}

/** `text` is the block to keep dark, as [right, top, bottom] fractions. */
export function buildNoiseField(w = 33, h = 14, seed = 90125, bias = 0.38, text = [0.45, 0.2, 0.87]) {
  const rand = rng(seed);
  const o1 = octave(rand, 3, 2), o2 = octave(rand, 6, 4), o3 = octave(rand, 12, 7);

  const grid = [];
  for (let y = 0; y < h; y++) {
    const row = [];
    for (let x = 0; x < w; x++) {
      const nx = x / (w - 1), ny = y / (h - 1);
      const v = 0.55 * o1(nx, ny) + 0.3 * o2(nx, ny) + 0.15 * o3(nx, ny)
        + bias * (0.85 - nx) + 0.05 * (rand() - 0.5);
      row.push(v);
    }
    grid.push(row);
  }

  // Equal-area cuts, same as buildField: linear cuts on noise put most of
  // the field in the middle two steps and the thing reads as one colour.
  const RAMP = ['7', '6', '5', '4', '3', '2'];
  const sorted = grid.flat().slice().sort((a, b) => a - b);
  const cuts = RAMP.slice(1).map((_, i) =>
    sorted[Math.floor(((i + 1) / RAMP.length) * (sorted.length - 1))]
  );

  const cells = grid.map((row, y) => row.map((v, x) => {
    let i = 0;
    while (i < cuts.length && v >= cuts[i]) i++;
    const underText = x <= Math.round(text[0] * w)
      && y >= Math.round(text[1] * h) && y <= Math.round(text[2] * h);
    // Flooring the text block at ramp-5 flattens it to one colour where the
    // noise underneath was light. Folding the light half onto the dark two
    // steps instead keeps the texture and still clears the contrast bar.
    return RAMP[underText && i < 4 ? 4 + (i % 2) : i];
  }));

  return { cells, w, h };
}

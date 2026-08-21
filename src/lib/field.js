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

/** Anisotropic bowl. Two minima, one shallow, so the surface is not a target. */
function loss(x, y, w, h) {
  const nx = x / (w - 1);
  const ny = y / (h - 1);
  const a = 1.35 * (nx - 0.68) ** 2 + 2.4 * (ny - 0.62) ** 2;
  const b = 1.1 * (nx - 0.22) ** 2 + 1.9 * (ny - 0.3) ** 2 + 0.16;
  return Math.min(a, b);
}

export function buildField(w = 26, h = 15) {
  const grid = [];
  for (let y = 0; y < h; y++) {
    const row = [];
    for (let x = 0; x < w; x++) row.push(loss(x, y, w, h));
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

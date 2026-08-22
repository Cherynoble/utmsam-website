/**
 * Drift: the field animation, shared by both fields.
 *
 * Three slow sine waves summed per cell, added to the cell's elevation and
 * rounded to a ramp step. The periods are long and mutually prime enough
 * that the field never visibly repeats, and no cell moves more than a step
 * or so from where it was built, so the composition is the same one at
 * every moment — it is a surface breathing, not a load-in.
 *
 * ponytail: 8fps, not rAF-per-frame. The output is six discrete colours;
 * anything faster is computing fills nobody can see. Paused off-screen and
 * in background tabs, and never started under reduced motion — the fill
 * attribute is already the resting field.
 *
 * Opt in with `data-drift` on the <svg> and `data-e` on every rect that
 * moves, carrying the cell's elevation: 1 at the bright rim, 6 at the dark
 * floor. Two further flags:
 *
 *   data-drift-floor  cells built dark stay dark. The banner floors the
 *                     block under its headline for contrast, and the drift
 *                     would otherwise brighten it and take the type with it.
 *   data-walk         the field owns a descent path, re-walked every frame
 *                     against the drifted surface. Needs data-cols/data-rows.
 */
const RAMP = ['', 'var(--ramp-1)', 'var(--ramp-2)', 'var(--ramp-3)', 'var(--ramp-4)', 'var(--ramp-5)', 'var(--ramp-6)'];
const INK = 'var(--ink)';
const FRAME = 125;

/* Eight-way, same order as the build-time walk in field.js. */
const STEPS = [[1, 0], [0, 1], [1, 1], [0, -1], [-1, 0], [-1, 1], [-1, -1], [1, -1]];

let started = false;

export function startDrift() {
  // Both fields import this module, and on a page carrying both the module
  // still evaluates once — but guard anyway so a second call cannot double
  // up the observer and run two rAF loops against the same cells.
  if (started) return;
  started = true;

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const fields = [...document.querySelectorAll('svg[data-drift]')]
    .map(build)
    .filter(Boolean);
  if (!fields.length) return;

  // A set, not a flag: the banner runs one field per orientation, so the
  // hidden one reports "not intersecting" and would otherwise switch the
  // visible one off.
  const onScreen = new Set();
  const io = new IntersectionObserver(es => {
    for (const e of es) e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target);
    if (onScreen.size && !running) tick();
  });
  fields.forEach(f => io.observe(f.svg));

  let last = 0;
  let running = false;

  function tick(now = 0) {
    if (!onScreen.size || document.hidden) { running = false; return; }
    running = true;
    if (now - last >= FRAME) {
      last = now;
      for (const f of fields) if (onScreen.has(f.svg)) step(f, now);
    }
    requestAnimationFrame(tick);
  }

  /* The observer is the efficient way in, but it is not a reliable way in:
     it reports once and then only on a change, so a first callback that
     lands while the incoming document's render is still held back for a
     view transition says "not intersecting" about a field sitting in plain
     sight, and nothing ever contradicts it. The field would then hold
     still until it was scrolled off screen and back.

     So the intersection is also worked out directly, at the couple of
     moments a page can arrive already looking at the field: restored whole
     from the back button, or loaded from a link on another page. */
  function kick() {
    for (const f of fields) {
      const r = f.svg.getBoundingClientRect();
      const seen = r.bottom > 0 && r.top < window.innerHeight
        && r.right > 0 && r.left < window.innerWidth;
      if (seen) onScreen.add(f.svg); else onScreen.delete(f.svg);
    }
    if (onScreen.size && !running) tick();
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) kick();
  });
  addEventListener('pageshow', kick);
  addEventListener('load', kick);
  requestAnimationFrame(kick);
}

function build(svg) {
  const cells = [...svg.querySelectorAll('rect[data-e]')].map(el => ({
    el,
    x: +el.getAttribute('x'),
    y: +el.getAttribute('y'),
    e: +el.dataset.e,
    w: 0,      // the drift wave at this cell this frame
    E: 0,      // elevation this frame, drift included
    v: 0,      // band this frame
    ink: false,
    cur: '',   // fill last written, so an unchanged cell costs nothing
  }));
  if (!cells.length) return null;

  const floor = svg.hasAttribute('data-drift-floor');
  const cols = +svg.dataset.cols || 0;
  const rows = +svg.dataset.rows || 0;
  const walk = svg.hasAttribute('data-walk') && cols > 2 && rows > 2;

  let grid = null;
  if (walk) {
    grid = Array.from({ length: rows }, () => new Array(cols));
    for (const c of cells) grid[c.y][c.x] = c;
    // A hole in the grid would make the walk read undefined and stop, so
    // fall back rather than half-run it.
    if (grid.some(row => row.some(c => !c))) grid = null;
  }

  return { svg, cells, floor, cols, rows, grid };
}

function step(f, now) {
  // 1. The surface. Smooth in space and in time, which is what keeps the
  //    walk below from teleporting between frames.
  for (const c of f.cells) {
    const wave =
      Math.sin(c.x * 0.5 + now / 4500) +
      Math.sin(c.y * 0.7 - now / 6500) +
      Math.sin((c.x + c.y) * 0.3 + now / 3500);
    c.w = wave;
    c.E = c.e + wave * 0.55;
    const lo = f.floor && c.e >= 5 ? 5 : 1;
    const v = Math.round(c.E);
    c.v = v < lo ? lo : v > 6 ? 6 : v;
    c.ink = false;
  }

  // 2. The walk, re-run every frame so the path answers to the surface as
  //    it is now rather than as it was built. Elevation 6 is the floor of
  //    the basin and 1 is the rim, so descending means stepping to the
  //    highest of the eight neighbours. It starts bottom-left for the same
  //    reason the build-time walk does: from any other corner it stalls in
  //    the shallow basin, and a hero image of an optimiser getting stuck is
  //    the wrong first note.
  //
  //    Only cells genuinely below the current one are candidates — the test
  //    is against the built elevation, and the drift only chooses among
  //    them. Walking the drifted surface directly does not work: the wave
  //    swings wider than a band, so it invents local minima, and the walk
  //    would stall two cells from its start about a third of the time and
  //    teleport its endpoint half the field when it did not. Constrained
  //    this way the walk cannot climb and so always arrives, the route
  //    re-shapes as the landscape breathes, and the destination stays put —
  //    which is correct. Where the minimum is, is a fact about the surface;
  //    the drift is weather over it.
  if (f.grid) {
    const { grid, cols, rows } = f;
    let cx = 1;
    let cy = rows - 2;
    const seen = new Set();

    for (let guard = 0; guard < cols * rows; guard++) {
      const key = cy * cols + cx;
      if (seen.has(key)) break;
      seen.add(key);
      grid[cy][cx].ink = true;

      const base = grid[cy][cx].e;
      let best = null;
      let bestScore = -Infinity;
      for (const [dx, dy] of STEPS) {
        const nx = cx + dx;
        const ny = cy + dy;
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
        const nb = grid[ny][nx];
        if (nb.e <= base) continue;
        const score = nb.e + nb.w * 0.55;
        if (score > bestScore) { bestScore = score; best = [nx, ny]; }
      }
      if (!best) break;
      [cx, cy] = best;
    }

    // The resting point, clamped so the marker stays on the grid. The walk
    // converges; the block is what says so.
    const ex = Math.min(cx, cols - 2);
    const ey = Math.min(cy, rows - 2);
    for (let y = ey; y <= ey + 1; y++) {
      for (let x = ex; x <= ex + 1; x++) grid[y][x].ink = true;
    }
  }

  // 3. One pass, one write per cell that actually changed. The field is
  //    material and may breathe; the path is signal and is drawn over it.
  for (const c of f.cells) {
    const fill = c.ink ? INK : RAMP[c.v];
    if (fill !== c.cur) {
      c.cur = fill;
      c.el.setAttribute('fill', fill);
    }
  }
}

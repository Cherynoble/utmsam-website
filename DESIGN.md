# DESIGN.md

The rules this site is built on. Everything here is already enforced in code —
`src/styles/tokens.css` holds the vocabulary, `src/lib/pixel.js` validates the
icons. This file records *why*, so the next person doesn't undo it by accident.

## Why Astro

Static content site. No SSR, no client framework. Astro ships zero JS by
default and lets components stay plain HTML + CSS, which is the entire
requirement. Build output is a directory of files served from GitHub Pages
under `base: /utmsam-website`.

## No dark mode

Light-locked, deliberately. The system is warm-flat: the whole palette is
built on ivory and cream, and the amber elevation shadows only read as
sunlight against a warm ground. A dark inversion would need a second, unrelated
palette and would produce a different site wearing the same name.

## Colour

- **Surfaces are never pure white.** `--warm-ivory` is the canvas, `--cream`
  the raised surface. `--white` is for popovers and max-contrast moments only.
- **Ink is never pure black and never gray.** `--ink` / `--ink-muted`, both
  well past 10:1.
- **The ramp is material, not signal.** `--ramp-1` … `--ramp-6` run light to
  dark and exist to fill blocks, icons, and the strip. Only `--accent` carries
  meaning.
- **Exactly one accent**, `--ramp-6` (#c62c15). It clears 5.34:1 on ivory and
  5.57:1 under white text, so it is safe as small text — but still prefer it
  as fill.
- **Hover traverses the ramp**, never `lighten()`. `--accent-hover` is the
  neighbouring ramp step.
- **`--institution` (#002a5c) is not a UI accent.** Reserved for UofT / UTM
  affiliation and faculty content. Never on a button or a link.

## Type

One weight: 400, everywhere, including the 82px hero. Hierarchy comes from
size and colour, never from weight.

Leading inverts with size — 1.5 for body down to 0.95 at `--text-2xl`. That
inversion is what gives headings their stacked, poster-block density.

Uppercase is a signage device, not a style: buttons and small section markers
only. The path-as-caption device renders a route as visible caption text,
treating the site as a filesystem you can inspect.

`.marker` is mono, uppercase, 12px, tracked 0.08em. Mono because a section
label should look measured rather than styled — the same instinct as the
path-as-caption device — and because it lets a marker sit directly on a rule
without competing with the heading beneath it. It stays on system mono:
the site ships no font files, and a section label is not worth the first one.

## Geometry and depth

Radius is effectively zero — 2px, 4px at the largest. No pills, ever.

## The ruled grid

`.container` carries its own vertical rules (`border-inline`), and `.section`
rules off horizontally. The measure is drawn rather than implied.

The lines are what let sections sit close together without running into each
other — they do the work whitespace would otherwise have to, which is why the
section rhythm can stay tight at 80px rather than the 120px an unruled page
would need.

Two consequences worth knowing before you move anything:

- **Block padding belongs on the container, not on a full-bleed wrapper
  around it.** A wrapper that pads outside the container leaves the vertical
  rule with a gap at the top and bottom of every section. This is why `.hero`,
  `.objection`, and `.final` put `padding-block` on their inner container.
- **Cream surfaces retint the hairline.** `--border` (#f0e8c8) is tuned to
  ivory and vanishes against cream, so `.objection` and `.site-footer` set
  `--border: var(--border-cream)` on themselves and let it inherit. A rule
  that stops halfway down the page reads as a mistake, not as a break.

Full-bleed elements deliberately interrupt the rules: the block strip is a
band, and a band should span.

Two elevation levels: flat, or golden-float. The raised shadow is amber-tinted
with a negative X offset, so the light source sits up-and-to-the-right on every
raised element. A black shadow on cream goes muddy; an amber one reads as sun.

Cards shift surface and gain a ring on hover. They never lift — `translateY`
fights the flat architectural geometry.

Links underline from the left. No colour change.

Buttons: four variants, no more. 12px padding on all sides — tight, not chunky.
They do not shout.

## The block strip

Six hard-edged divs, never a `linear-gradient`. The discreteness is the point.

## Pixel icons

Genuine bitmaps, not vector art imitating pixels — that is the difference
between "8-bit style" and 8-bit. Icons are authored as arrays of equal-length
strings, one character per cell, and compiled to `<rect>` runs at build time
by `src/lib/pixel.js`. Adjacent same-colour cells merge horizontally then
vertically, cutting rect count ~4x, which matters because every icon is
inlined into the HTML.

Authoring rules, enforced by `validate()`:

- square grid, integer coordinates only
- no curves, no diagonals — a circle is a stepped octagon
- flat fills only, 2–4 colours per icon
- at least one shape derived from the logo module (the step)

Two tiers. **Tier 1 is the emblem** (`mark`): the UTMSAM logo redrawn as a
bitmap on a 24x24 grid — the isometric cube read flat, a lit top face over two
darker sides, with the ramp doing the dimensional work. The isometric edges
are stepped exactly two across per one down; a general line algorithm rounds
them and the cube stops reading as a cube. It is the one mark allowed the full
ramp (6 colours), and it now lives only in the styleguide.

The nav, the footer and the tab icon wear the real logo file instead
(`public/mark.png`, cropped from the club's transparent PNG; `public/favicon.png`
is the same crop, squared and scaled). The reason is a limit rather than a
preference: the logo is line art — the quartered cube beside the hexagonal
circuit brain — and line art at 48px is one pixel per stroke. Both redraws
tried and failed. The full-size cube subdivisions merge into a smear, and the
grout between facets reads as a waffle. When a vector original turns up, swap
`public/mark.png` for it; nothing else has to change.

**Tier 2** is the flat icon set, capped at 4.

The emblem was previously a descent staircase — gradient descent drawn as a
diagram. It was replaced because the society has a real logo and the site
should wear it. The stepped tread it contributed survives in the `d-` icons,
so the icon family keeps its provenance even though its source moved.

Naming encodes provenance: the `d-` prefix means "constructed from the descent
module", the two-cell-tall stepped tread. That shared module is the cohesion
mechanism — it is what makes a beaker feel like *our* beaker rather than a
generic beaker.

Never scale a pixel grid: subpixel blur kills the effect. Hover swaps a single
fill in the ramp via `steps(1, end)`, so it snaps like a sprite swap.

Preview the whole set at `/styleguide`.

## Motion

Two durations (`--motion-fast` 150ms, `--motion-base` 200ms) and one curve
(`--ease-standard`). That is the system.

Hero content is visible by default; the animation only enhances it. Gating
visibility on JS means the hero ships blank to crawlers and background tabs.

Every reveal has an instant alternative under `prefers-reduced-motion`. The
scroll progress readout stays — it is informational, not decorative, and it
moves nothing.

## Space

8px base. `--space-1` … `--space-16`, plus `--section-y`, `--container-max`
(1600px), `--gutter`, `--nav-height`. The last four shrink at the 1024px and
640px breakpoints; nothing else is responsive at the token level.

1600px, not the more usual 1280px, because the ruled grid needs room: the
vertical rules only read as structure when there is enough width between them
for the two-column units to breathe. Text is capped independently — `.body`
at 62ch, `.lede` at 34ch — so the wider container widens the layout without
lengthening a single line of prose.

## Block portraits

The member-photo placeholder (`blockPortrait` in `pixel.js`, rendered by
`BlockPortrait.astro`): a deterministic mosaic built from the block ramp,
seeded off a string, mirrored on the vertical axis and biased denser toward
the centre so it reads as a mass rather than as noise.

It is not a generic avatar glyph and is not pretending to be a face — it is
the brand material standing in for one, so an unfinished roster still looks
deliberate. Add a real photo and it disappears.

## The loss field

`src/lib/field.js` + `BlockField.astro`. The hero asset: a real visualisation
of the thing the society studies, not an abstract pattern, built from the same
block unit as the logo and every icon.

- An anisotropic bowl with **two minima, one shallow**, so the surface doesn't
  read as a target.
- Six discrete bands, ramp keys `7`→`2`. The gradient is an object here, not a
  wash: every cell lands on exactly one step, hard edges between.
- **Bands are cut on quantiles, not the raw range.** Linear cuts put two thirds
  of the surface in the darkest two steps; equal-area cuts read as a contour
  map, which is what it is.
- Key `1` (ink) never appears in the field. **The field is material, the path
  is signal.**
- The steepest-descent walk starts bottom-left deliberately: from the other
  corners it stalls in the shallow basin, and a hero image of an optimiser
  getting stuck is the wrong first note.

### The noise field

`buildNoiseField()` + `HeroField.astro`: the same six bands and the same
equal-area cuts, over value noise rather than a bowl. It is the /research
banner background, where the field is a surface to sit on rather than a figure
to read, so drifting contours beat a legible minimum. Three octaves — coarse
blobs, mid detail, per-cell jitter — off a seeded PRNG, so a given seed always
draws the same field.

- **The type's contrast is clamped, not hoped for.** Every cell under the text
  block is floored to the two darkest ramp steps, whatever the seed rolls.
- No descent path. The walk is signal, and there is nothing to read here.
- Cells stretch (`preserveAspectRatio="none"`) rather than crop, so the
  composition is the same at any band size.
- Each cell carries a 1px non-scaling ink stroke. The grid is drawn, not
  implied — the same reason containers carry their own rules.

## Favicon

`public/favicon.png`, wired up in `Base.astro`. It is the same crop as
`public/mark.png`, padded square and scaled to 128, so the tab icon and the nav
mark cannot drift apart. Regenerate both from the source logo together.

## Components

`Base.astro` is the layout: head metadata, skip link, `Nav`, `<main id="main">`,
`Footer`, and an optional `ReadingProgress` behind a `progress` prop.

- **Nav** — sticky, `view-transition-name: nav`. Links underline on hover in
  accent, in ink for `aria-current="page"`. Below 860px the list and CTA give
  way to a drawer. Its toggle is a small island and **the only client JS on the
  site**.
- **Mark** — the logo image plus the UTMSAM wordmark, `wordmark={false}` for
  the glyph alone. The wordmark is live text, never baked into the image.
- **PinnedUnit** — one pillar: text left, sticky media panel right, collapsing
  to media-first single column below 900px. The list marker is the tread,
  reused.
- **FinalCta** — closing block, primary + cream buttons, with the mascot.
- **DescentMascot** — a point descending the curve, converging on the minimum.
  Appears **once per page, at the final call to action**, after the argument is
  already made; placed there it reads as warmth rather than noise. Unlike the
  looping GIF this pattern is borrowed from, it's SVG and CSS, so
  `prefers-reduced-motion` genuinely stops it — and at rest the point sits on
  the last tread, already converged, which is the correct still frame.
- **ReadingProgress** — numeric scroll percentage. A percentage is legible in a
  way a bar is not, so the reader always knows exactly where they are. Driven
  entirely by CSS scroll-driven animations: no scroll listener, no island,
  nothing per-frame on the main thread. Browsers without support get nothing
  rather than a broken readout — the right trade for progressive enhancement.
- **Footer** — block strip, brand blurb, site and elsewhere columns.

## Content model

Copy lives in `src/data/`, never inline in pages: `site.js` (identity, nav,
links), `content.js` (pillars and page copy), `team.js` (roster).

- **Nothing invents a statistic.** If a number isn't sourced it is absent
  rather than plausible.
- `TODO(exec)` marks a slot the incoming executive team fills in.
- **Exactly five bullets per unit**, noun phrases, never sentences. That
  discipline is what makes a long page scan fast.
- A team slot with `name: null` renders as "To be announced" and stays on the
  page, so the shape of the team is visible before the roster is final. While
  `photo` is null the card falls back to a block portrait seeded off the role
  name. Photos go in `/public/team/`, square, ≥640×640, cropped to the
  shoulders.

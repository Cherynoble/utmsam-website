# The UTMSAM design system

A warm, flat, sharp-cornered system. Cream and amber surfaces, near-black
text, one accent, a single font weight, no rounded corners, and a pixel-block
visual language that runs from the logo through every icon and illustration.

The tension that makes it work is **soft warm colour against hard sharp
geometry**. Remove either half and it collapses: all warmth and no edge reads
as a wellness brand, all edge and no warmth reads as generic brutalism.

---

## The five rules that carry the look

If you remember nothing else, these five do most of the work.

1. **Background `#fffaeb`, text `#1f1f1f`.** Never pure white, never pure
   black, and never grey. There is no grey anywhere in this system. Dropping
   a `#f5f5f5` or a `#666` into a page reads as a bug.
2. **`font-weight: 400` on everything,** including the 82px hero. Hierarchy
   comes from size and colour, never from weight. One `font-weight: 600` on a
   section heading and the page stops looking like itself.
3. **`border-radius: 2px` maximum.** Buttons are rectangles, cards are
   rectangles. No pills, ever.
4. **Every heading ends with a full stop.** Sentence case throughout, no
   Title Case. A headline without a period is an invitation; a headline with
   one is a statement of fact.
5. **One accent, `#c62c15`.** Everything else in the warm ramp is *material*
   (blocks, icons, illustrations), not *signal*. Do not add a second accent
   for variety.

---

## Colour

Defined in `src/styles/tokens.css`. Use the custom properties, never literals.

### Why this accent

`#c62c15` was chosen over a brighter orange for a specific reason. The system
this is modelled on uses an orange that lands at about **3.3:1** on its cream
background: fine as a fill, but one careless small label breaks WCAG AA.

| | on ivory | on cream | white text on it |
|---|---|---|---|
| A typical bright orange | 3.21 | 2.95 | 3.34 |
| `#c62c15` | **5.34** | **4.90** | **5.57** |

So the accent is safe as small text *and* as a fill under white text. Prefer
it as a fill regardless, but the system no longer breaks if someone uses it
on a label.

### The institutional colour

`--institution` (`#002a5c`) is UofT navy. It marks university affiliation and
faculty content **only**. It is never a UI accent: never on a button, never on
a link, never on a hover state. It appears roughly once per page at most.

### The block ramp

Six steps, gold through ember. It is **material, not signal**: blocks, icons,
portraits, and the gradient strip. It never sits as a soft wash behind text
and it is never used as `background-clip: text`.

The strip is six hard-edged `<i>` elements, never a `linear-gradient`. The
discreteness is the point.

---

## Type

Arial, at one weight, at eight sizes: 12 / 14 / 16 / 24 / 32 / 48 / 56 / 82.

**Line height inverts with size.** 1.5 at 16px, 1.15 at 32px, 0.95 at 48 to
56px, 1.0 at 82px. Sub-1.0 leading at heading scale is what gives headings
their stacked, poster-block density.

Negative tracking (`-0.025em`) only at display scale. Zero tracking
everywhere else. Uppercase is a signage device for button labels and small
section markers, not a style.

**Headline discipline:** two visual lines maximum at display scale. When a
hero declares its lines explicitly, check they do not re-wrap. A `max-width`
that is too narrow will split a two-line headline into four.

---

## Elevation

Two levels. Flat, or golden-float. There is no `sm / md / lg / xl` ladder.

```css
--elev-flat:  none;
--elev-ring:  0 0 0 1px var(--border);
--elev-raised: /* five amber layers, negative X offset */
```

Three things make the raised shadow work: it is **amber, not black** (a black
shadow on cream goes muddy grey, an amber one reads as sunlight); the X
offset is **negative**, so the light source is consistently up-and-to-the-
right; and the falloff is absurdly long.

Reserve `--elev-raised` for a handful of hero graphics. Everything else gets
`--elev-ring`. Five-layer shadows on many elements is a real paint cost on
low-end phones.

---

## Motion

Two durations, one curve. That is the entire motion system.

```css
--motion-fast: 150ms;
--motion-base: 200ms;
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
```

- **Hover traverses the ramp.** `--accent` moves to `--accent-hover`, one step
  up the warm ramp. Not `lighten()`, not opacity.
- **Cards never lift.** No `translateY(-4px)`. They shift surface colour and
  gain a ring. Lifting fights the flat geometry.
- **Never scale a pixel icon.** Scaling a crisp grid produces subpixel blur
  and destroys the effect. Icons hover by swapping a fill, with
  `steps(1, end)` so it snaps like a sprite rather than fading.
- **No scroll-jacking.** Pinned media is `position: sticky` and nothing else.
- **Content is visible by default.** Reveals only enhance. Gating visibility
  on a JS class means the hero ships blank to crawlers and background tabs.
- **Every animation has a reduced-motion alternative.** This is not optional.

The scroll progress readout is driven by CSS scroll-driven animations, with
no scroll listener and no JS island. Browsers without support get nothing,
which is correct for a progressive enhancement.

---

## The pixel icon system

Icons are authored as **bitmaps** in `src/lib/icons.js` and compiled to
`<rect>` runs at build time. This is a real bitmap workflow, not vector art
imitating pixels, and that difference is visible.

### Authoring rules

- Square grid, 16x16, integer coordinates only.
- **No curves, no diagonals.** A circle is a stepped octagon. A cable is an
  L-shaped staircase.
- `shape-rendering="crispEdges"` so it stays hard at any scale.
- Flat fills only. No strokes, no gradients inside an icon.
- **Two to four colours per icon.** The compiler throws if you exceed it.
  The emblem is the one exception and may use the full ramp.
- **Every icon contains the descent module:** the two-cell-tall stepped
  tread the logo is built from. That shared unit is the cohesion mechanism.
  It is what makes a beaker feel like *our* beaker.

Naming encodes provenance. A `d-` prefix means the descent module is the
visible subject of the icon.

### A warning from experience

Interior detail needs room. An early version put ink treads inside a book's
4-cell-wide page; they collided with the border and the spine and the icon
read as the characters "20". Check every icon at 16px, 32px, and large, on
`/styleguide`, before committing it.

---

## The emblem and the mascot

The mark is **a point descending a stepped curve**: gradient descent. Treads
run the ramp from gold at high loss to ember at the minimum, and the ink
block is the current parameter, mid-descent.

The mascot is that same point, converging. It appears **once per page, at the
final call to action**, after the argument is already made. Placed there it
reads as warmth rather than as noise.

It is SVG and CSS rather than a GIF, specifically so `prefers-reduced-motion`
genuinely stops it. At rest the point sits on the last tread, already
converged, which is the correct still frame.

**The ramp direction must match the emblem** in both. Reversing it in one
place makes the mascot and the logo disagree about which end of the curve is
the good one.

---

## Content patterns

**The repeating unit.** Heading, one sentence, one link, a graphic, then
**exactly five bullets, always noun phrases, never sentences**. That
discipline is why a long page still scans fast. Trust the noun: write
"Persistent memory and reusable skills", not "Advanced persistent memory that
helps your team...".

The unit repeats without variation. That is deliberate rhythm, not
repetition to be broken up.

**Path as caption.** News cards print their route as visible caption text. It
is a small, deliberate move that treats the site as a filesystem you can
inspect, and it fits a society that builds things.

**Never invent a number.** If a statistic is not sourced, leave it out. An
absent number is honest; a plausible one is not. Anything unverified is
marked `TODO(exec)`.

---

## Deliberate departures

This system is adapted from a teardown of mistral.ai. Four places where it
knowingly diverges, each fixing a flaw in the original:

1. **Accent contrast.** Raised from ~3.3:1 to 5.34:1, so the accent is safe
   at small sizes.
2. **The mascot honours reduced motion.** The original is a looping GIF that
   ignores it on every page.
3. **No DOM duplication for responsive variants.** The original ships hero
   headlines, pinned media, and tab panels twice, which screen readers may
   read twice. Everything here reflows with CSS.
4. **Human-readable anchors.** `#leetquest`, not a CMS document id.

---

## Things that instantly break the look

Bold weights. Rounded corners. Grey text. Pure white backgrounds. Gradient
text. Glassmorphism. Cards lifting on hover. Cool-toned shadows. A second
accent colour. Title Case. Scroll-jacking. Fake 8-bit made of anti-aliased
vectors.

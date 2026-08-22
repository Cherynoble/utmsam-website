# mistral.ai — teardown

Reference notes, not rules. Everything here was measured off the live site on
2026-08-21: computed styles, the shipped Tailwind stylesheet
(`/_astro/astro.2abp3KKE.css`), and the server-rendered markup. Nothing is
inferred from screenshots alone.

Read this alongside `DESIGN.md`. The last section maps the two.

## Stack

Astro + Tailwind v4, custom elements named by atomic design
(`mistral-atom-text-hero-title`, `mistral-section-hero-product`,
`global-navigation`), Taxi.js for page transitions, GSAP ScrollTrigger with a
scroll proxy for the pinned heroes.

## Tokens

Two layers: raw ramps, then semantic roles. Only the ramps hold literal colour.

```
steel      50 #f9f9fa · 100 #f1f1f3 · 300 #ccccd1 · 400 #a1a1aa
          500 #6d6d78 · 600 #55555e · 800 #27272b · 900 #1a1a1e · 950 #101013
cream      50 #fafaf4 · 100 #f2f1e8 · 300 #e4e2d6
navy      200 #dcdcde · 500 #88889c · 800 #343446 · 900 #242433 · 950 #151524
orange     50 #fff0eb · 400 #ff6529 · 500 #ff5229 · 600 #fa500f
yellow    500 #ffaf01 · tangerine 500 #ff8204
red       600 #e51300 · raspberry 700 #c4001d
blue      200 #b9daff · 400 #55b3fb · 600 #0082e6
```

Semantic roles sit on top: `surface-brand-{primary,secondary,tertiary}`,
`text-{primary,secondary,tertiary,muted,invert}`, `border-{primary,secondary,
invert,brand}`, `icon-*`, and a full `action-*` set including
`action-ghost-1` / `-2` (`#f9f9fb0d`, `#f9f9fb1a` — 5% and 10% white).

Product accents are exposed as `text-brand-1…5` (orange, blue, red, navy,
tangerine) and used as *fills*, not just text colour: the Studio hero panel is
`bg-text-brand-2`.

### Three independent theme switches

- `:root` — light. **Warm**: `#fbfbf8` surface, `#e4e3de` hairline.
- `.dark` — dark. **Cool**: `#101013` surface, `#27272b` hairline.
- `.inverted` — a *local* flip applied to any subtree, and it composes:
  `.inverted:where(.dark, .dark *)` resolves back to the dark palette. There is
  also `lg:inverted`, so a section can be light on mobile and dark on desktop.

Light and dark are not the same neutral at two lightnesses. Light is cream,
dark is steel. That is the single most transferable idea in their colour work.

## Type

Three families, three jobs.

| Family | Weights | Role |
|---|---|---|
| **ALTMistral** (self-hosted woff2) | 400/500/600 + italics | brand chrome: nav, every button, product names, footer links, card titles |
| **Inter** (variable) | 400/500 in practice | display headlines and body prose |
| **Space Mono** | 400 | metadata: eyebrows, tags, breadcrumbs, chips — always `uppercase` |

Named scale, mobile → desktop, each token carrying its own weight, leading and
tracking:

```
display     2.5rem/3rem    → 6rem/6rem        500  -0.02em
h1          2.5rem/3rem    → 4.5rem/4.5rem    500  -0.02em
h2          1.75rem/2.5rem → 3.5rem/3.75rem   500  -0.01em
h3          1.5rem/1.75rem → 2.75rem/3.25rem  500  -0.01em
h4          1.25rem/1.5rem → 2rem/2.5rem      500   0
h5          1.5rem/2rem                       500   0
h6          1rem/1.5rem                       500   0    ← workhorse, ~79 uses/page
body-large  1rem → 1.25rem/1.75rem            400  -0.02em
body-base   1rem/1.5rem                       400  -0.01em
body-small  0.8125rem/1.25rem                 400   0
button-large 1rem/1.5rem                      500  +0.01em
button-small 0.875rem/1.25rem                 500  +0.02em
eyebrow      0.75 → 0.8125rem                 400   0
eyebrow-small 0.6875 → 0.75rem                400   0
```

Tracking flips sign by role: negative on display and body, **positive on
buttons and mono**. Only 400 and 500 render anywhere on the site, despite
ALTMistral shipping a 600.

**Voice rule, held rigidly:** every headline and every card title is a
sentence-case noun phrase ending in a full stop. "Workflows." "Agents."
"Deep customization." "Do it all with Mistral."

## Layout grammar

- Container `max-w-432` = **1728px**, `mx-auto`, carrying `border-x` so its own
  edges are visible rules. Past 1808px a `maxdesktop:` variant adds side
  borders to the footer too.
- Padding rhythm: `p-4` (16px) mobile → `md:p-10` (40px) desktop. Universal.
- Gaps: `gap-4` inside a component, `md:gap-10` between, `gap-30` / `md:gap-40`
  (120/160px) between sections.
- `--nav-height: 48px`, exposed as a `pt-nav` utility.
- Structure is drawn with `divide-x` / `divide-y` hairlines rather than
  margins, plus ~38 literal `h-px` elements per page. Content sits in ruled
  cells.
- Radius is **0 on layout**. `rounded-sm` (4px) and `rounded-md` (6px) on chips
  and toggles; `rounded-b-lg` on nav dropdowns so they hang off the bar;
  `rounded-lg` on mobile cards only.
- No shadows anywhere in the UI chrome.
- Blocks use `outline-1 outline-border-primary -outline-offset-1` instead of
  `border`, so adjacent blocks abut without doubling the line.

### Every page hero is the same pinned stage

```
section  lg:min-h-[200dvh]                    ← scroll length
└ div    sticky top-0 h-dvh                   ← the stage
  ├ top band  min-h-[35dvh]  border-x         → breadcrumb + display headline
  └ bottom    h-[65dvh]      border-x border-t
      ├ left rail  w-[25%]                    → body copy + CTA + scroll cue
      └ visual     w-[50%]                    → brand-coloured panel + product shot
```

The homepage runs the same machine at 70/30 (`js-col-middle-top` /
`js-col-right-top`) with a canvas mosaic that regenerates as it scrolls.

## The pixel system

Everything decorative is a square on a lattice. Three grids.

**Logo** — 21×15 viewBox, 3-unit pixels, a 7×5 grid. Colour is assigned purely
**by row**, top to bottom:

```
row 0  #ffaf01  yellow
row 1  #ff8204  tangerine
row 2  #fa500f  orange-600
row 3  #e61300  red-600
row 4  #c4001d  raspberry-700
```

That five-step vertical ramp *is* the brand gradient. Nothing else defines it.

**UI icons** — 30×30 viewBox, 4.4-unit cells at 4 / 8.4 / 12.8 / 17.2 / 21.6:
a **5×5 matrix with a 4-unit margin**, `fill="currentColor"`. Adjacent cells
are merged into single L-shaped paths as an optimisation, but the lattice is
strict.

**Arrows and chevrons** — 30×30, 4-unit cells on a 4-step lattice
(5, 9, 13, 17, 21, 25). A chevron is five 4×4 squares stepping up then down.

**Corner marks** — `.tech-dot::after` is a 4×4px square in `text-brand-4`
offset `-2px` at a block corner. Technical-drawing registration marks, on the
same 4px module.

**Breadcrumb separator** — `after:size-0.5 after:bg-text-tertiary`. A 2px CSS
square, not a `·`.

Model artwork scales the same idea up: flat hard-edged colour fields on a grid,
faint construction arcs and dots, one pixel-art sticker centred. The brand page
states the intent — the pixel illustrations are "a natural extension of our M
symbol."

## Components

### Button — a conveyor

`h-12 px-4 gap-2`, no radius, `overflow-hidden`, `group`:

```html
<a class="group relative h-12 px-4 flex items-center gap-2 overflow-hidden
          bg-action-primary hover:bg-action-secondary text-text-invert transition-colors">
  <span class="w-5 absolute left-3 -translate-x-10
               group-hover:translate-x-0 transition-all duration-300 delay-50">▸</span>
  <p class="text-button-large font-mistral group-hover:translate-x-6 duration-300">Label</p>
  <span class="w-5 group-hover:translate-x-10 transition-all duration-300">▸</span>
</a>
```

On hover the right chevron exits right, the label slides 24px right, and a
clone enters from the left. `overflow-hidden` does the clipping.

### One cell, two states

The same idiom drives the nav. The logo cell is `size-12 grid
place-content-center overflow-hidden` holding **both** the logo and a back
arrow in one grid cell, the arrow parked at `translateX(48px)`. The mobile CTA
stacks "Contact sales" and "Menu" with one parked at `translateY(-48px)`.

Two states share one 48px cell and you slide between them. That single rule
explains most of the site's motion.

### Header

`fixed z-50 h-12 border-b divide-x divide-border-primary` — a row of 48px cells
separated by vertical hairlines. It re-themes to match the section scrolling
under it, so it goes light over an article body and dark over a hero.

### Mega menu

Full-viewport fixed panel, `top-12 h-[calc(100dvh-3rem)]`, with stacked
absolute sub-panels. Each is a `flex flex-nowrap w-fit divide-x` row of
fixed-width columns (`w-115`/460px, `w-86`/344px, `w-60`/240px).

### "Markitecture"

Their class name for the "Do it all with Mistral" section: an architecture
floorplan of brand-coloured blocks at fixed sizes (`w-100 h-50`, `w-50 h-50`),
interlocked with deliberate sub-pixel nudges (`lg:translate-x-8.5`,
`translate-y-0.5`), each carrying a 32px accent icon chip, an `text-h5` title,
`text-body-small` body, and tech-dots at the corners.

They fall in from `-300px`, staggered `(11 - i) * 60ms`, and land with
squash-and-stretch:

```css
@keyframes markitecture-fall {
  0%   { opacity: 0; transform: translateY(-300px) }
  50%  { opacity: 1; transform: translateY(0) scaleY(1) }
  65%  { transform: translateY(0) scaleY(.95) }
  80%  { transform: translateY(0) scaleY(1.02) }
  to   { transform: translateY(0) scaleY(1) }
}
```

### Article pages

Dark chrome, **light body regardless of theme**. Pixel-mosaic hero recoloured
per model. Sticky utility bar (Back / `5 MIN READ` / Share). Prose is stock
`@tailwindcss/typography` capped at `65ch`. Pull-quotes are an orange square
badge butted against a grey panel. Sticky right sidebar model card with mono
capability chips. Reading-progress pill bottom-left.

### Responsive inversion

Desktop shows ruled, square, edge-to-edge grid cells. Mobile switches to
`rounded-lg` floating cards with shadows and docks the page controls into
floating bottom bars. Opposite treatments, same content.

## Accessibility

Done well: the animated headline keeps a real `<h1 class="hidden">` carrying
the clean string for assistive tech and crawlers, and animates an
`aria-hidden="true"` duplicate with `font-kerning: none`. The doubled letters
visible in extracted text are that duplicate mid-animation
(`data-randomness="1"`), not typos.

Done badly: `prefers-reduced-motion` only disables Astro view transitions. The
GSAP reveals, the pinned heroes and the falling blocks all still run.
Everything starts at `opacity: 0` and depends on JS to become visible — the
page renders blank without it.

## What this means for us

Where Mistral confirms what `DESIGN.md` already says:

- **Ruled grid over whitespace.** Their entire structure is hairlines and
  `divide-*`, at a 1728px container, for the same reason ours is at 1600px.
- **Radius near zero on layout.** They allow 4–6px on chips only; we allow 2–4.
  Same instinct, and neither uses pills.
- **Mono as a measuring device.** Their eyebrows are Space Mono, uppercase,
  11–13px, positive tracking, muted colour — functionally identical to
  `.marker`.
- **Discrete blocks, never a gradient.** Their logo ramp is five hard rows;
  our block strip is six hard divs.
- **A shared module is the cohesion mechanism.** Their 4px square and 5×5 icon
  matrix do what our descent step does.

Where we deliberately differ, and should stay differing:

- **Dark-first with a warm/cool split.** Ours is light-locked and warm-flat;
  `DESIGN.md` already argues why a second palette would be a second site.
  Their `.inverted` composability is elegant but only pays off if you ship two
  themes.
- **Weight as hierarchy.** They mix 400 and 500 and lean on ALTMistral for
  chrome. We hold one weight and get hierarchy from size and colour.
- **Three families, one of them custom.** We ship no font files at all.
- **JS-gated visibility.** They start everything at `opacity: 0`;
  `DESIGN.md` explicitly rejects this, and their site is the argument for why —
  it renders blank to anything without JS.

Worth stealing outright:

- The **conveyor button** and the **one-cell-two-states** slide. Both are pure
  CSS, both fit a flat architectural geometry, and neither uses `translateY`
  lift on cards (which `DESIGN.md` rules out).
- **Squash-and-stretch on a landing block.** Cheap, and it makes a hard-edged
  block feel like an object rather than a fade.
- **Inset outlines** (`outline -1px offset`) so abutting blocks never double
  their hairline. Directly applicable to the block strip.
- The **noun-phrase-with-a-full-stop** headline rule. It is free and it makes a
  page sound decided.

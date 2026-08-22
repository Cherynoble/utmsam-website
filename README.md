# UTMSAM

The website for the University of Toronto Mississauga Algorithmic Modeling
Society.

Static site, built with [Astro](https://astro.build). No framework runtime, no
client-side router, no analytics. The whole site ships **zero JavaScript
files**; the only script is a handful of inlined lines for the mobile nav.

---

## Running it

```bash
npm install
npm run dev
```

Then open **http://localhost:4321/**.

The site's home is `utmsam.sa.utoronto.ca`, and that is what a plain build
targets. GitHub Pages is a temporary host while that domain still serves the
old site: the deploy workflow sets `GH_PAGES=1`, which moves the build under
the `/utmsam-website` prefix and marks it `noindex` so the two copies do not
compete in search.

**When the domain moves,** delete the flag in three places — the branch in
`astro.config.mjs`, the `env:` block in `.github/workflows/deploy.yml`, and
the `temporaryHost` lines in `src/layouts/Base.astro` — and nothing else
changes.

```bash
npm run build     # production build into dist/
npm run preview   # serve the built output
```

---

## Editing content

**You should not need to open a component to change copy.** Everything the
society actually edits lives in `src/data/`:

| File | What it holds |
|---|---|
| `src/data/site.js` | Society name, sign-up link, social links, contact email |
| `src/data/content.js` | Homepage pillars, programs, news, events, projects |
| `src/data/team.js` | Faculty advisors, executive roster, open roles |

### Adding a team member

Open `src/data/team.js` and fill in the slot:

```js
{
  role: 'President',
  name: 'Their Name',            // null renders "To be announced"
  program: 'Computer Science, 3rd year',
  focus: 'One sentence on what the role covers.',
  photo: '/team/president.jpg',  // null renders a generated block portrait
}
```

Photos go in `public/team/`. Square, at least 640x640, cropped to the
shoulders. Until a photo exists, the card shows a block portrait generated
from the role name, so an unfinished roster still looks deliberate.

### Things still to fill in

Search the repo for `TODO(exec)`. Each one is a real gap, not a placeholder
for its own sake:

```bash
grep -rn "TODO(exec)" src/
```

At the time of writing these are the proposed event months, the faculty
advisor titles, the Project Fixit paper link and venue citation, the speaker
and venue names still to be confirmed, and every figure on `/sponsors`.

**The sponsors page ships with invented numbers.** The membership count, the
tier prices, and the sponsor list in the `sponsors` block of
`src/data/content.js` are all placeholders. A sponsor who discovers the
membership count was made up does not come back, so replace them or delete
them — the metrics band and the logo wall both disappear when their array is
empty, which is the correct empty state.

---

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages.

**One-time setup:** in the repository settings, under Pages, set the source to
**GitHub Actions**. Until that is done the workflow will build successfully
and then fail at the deploy step.

Moving to `utmsam.sa.utoronto.ca` means removing the `GH_PAGES` flag (above).
If it stays on GitHub Pages under that name, a `CNAME` file in `public/` is
also needed — which requires being able to set a DNS record for the
subdomain. Confirm that with whoever administers it before planning around
it.

---

## Layout

```
src/
  data/          content the exec team edits
  lib/
    pixel.js     bitmap to SVG compiler, block portraits
    icons.js     the icon set, authored as bitmaps
    field.js     the loss surface on the homepage
  components/    Astro components
  layouts/       page shell
  pages/         one file per route
  styles/
    tokens.css   every design decision, as custom properties
    global.css   base styles built on those tokens
scripts/
  build-og.mjs        generates public/og.png, the link-share card
```

`og.png` is generated and committed, not built. Regenerate it after changing
the tagline or the mark:

```bash
node scripts/build-og.mjs
```

It is deliberately outside `npm run build`: the card renders SVG text, which
needs a system font, and the GitHub Actions runner has none of them. A
build-time version would quietly ship a card with no words on it.

`/styleguide` renders the full icon set and the colour ramp. Use it when
adding icons.

---

## Before changing the design

Read `DESIGN.md` first. The visual system is tightly specified and a few
small, ordinary-looking changes will quietly break it. The most common are
using a bold font weight, rounding a corner, and softening body text to grey.

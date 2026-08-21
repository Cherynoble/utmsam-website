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

Then open **http://localhost:4321/utmsam-website/**.

The `/utmsam-website` prefix is required locally. It is the `base` in
`astro.config.mjs`, set because the site deploys to GitHub Pages under that
path. Plain `localhost:4321` will 404, which is expected.

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

At the time of writing these are the Discord invite link, the contact email,
the faculty advisor titles, the Niagara announcement link, the Project Fixit
paper link and venue citation, and the Open Graph share image.

---

## Deploying

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages.

**One-time setup:** in the repository settings, under Pages, set the source to
**GitHub Actions**. Until that is done the workflow will build successfully
and then fail at the deploy step.

If the site later moves to a custom domain, change `site` and `base` in
`astro.config.mjs` and add a `CNAME` file to `public/`.

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
  build-favicon.mjs   generates the favicon from the emblem bitmap
```

`/styleguide` renders the full icon set and the colour ramp. Use it when
adding icons.

---

## Before changing the design

Read `DESIGN.md` first. The visual system is tightly specified and a few
small, ordinary-looking changes will quietly break it. The most common are
using a bold font weight, rounding a corner, and softening body text to grey.

# shanelonergan.dev

My portfolio, presented five ways. The content is the same in each, but you can pick which era of the web it looks like from the **"Best viewed in:"** menu at the top right:

- **Netscape Navigator (1995):** the default. A sincere single-column personal page with a beveled welcome banner, a link list with little icons, a `finger` .plan box and a Hotlist.
- **GeoCities (1998):** "Shane's Home Page", in the SiliconValley neighborhood. It has a marquee you can stop, a webring, and a hit counter that only counts your own visits.
- **Mac OS 9 (1999):** the site is a desktop. Draggable Finder windows roll up when you double-click the title bar, the menus actually work, and the startup screen has an extensions parade.
- **MySpace (2006):** Shane's own pimped-out profile on "ShaneSpace", with a Top 8 of projects, glitter, blinkies, and a profile song: an original 8-bit arrangement of George M. Cohan's public-domain "Give My Regards to Broadway" that plays only when you press Play.
- **Today (2026):** the site as I'd build it now. Quiet type in Atkinson Hyperlegible Next, a light or dark palette taken from my portrait, and a nav made of pastel keycaps from the keyboard in that photo.

Links like `?theme=macos9` open the site in a particular era, and every section has its own URL (`/projects`, `/resume`, `/bio`, `/contact`).

Under the costume, it's a fast, accessible site:
- **Prerendered:** every page is real HTML before any JavaScript runs.
- **Accessible:** every theme works by keyboard and passes axe, and all motion stops when your system asks for reduced motion.
- **Lighthouse:** 98–100 on every theme.

## Running it

It needs Node 24 (pinned in `.nvmrc`).

```bash
nvm use
npm install
```

```bash
npm run dev
```

The dev server is fast but skips prerendering. To check the real thing, build and preview it:

```bash
npm run build && npm run preview
```

Tests (Playwright plus axe, desktop and phone sizes):

```bash
npx playwright install chromium
npm test
```

## Changing the content

All the copy lives in typed files in [`src/content/`](src/content), and the themes only lay it out. To add a project, edit [`projects.ts`](src/content/projects.ts). Every theme picks it up.

Anything still waiting on a decision is marked `TODO(shane)`:

```bash
grep -rn "TODO(shane)" src/
```

The résumé PDF is in [`public/shane-lonergan-resume.pdf`](public/shane-lonergan-resume.pdf).

## How it's put together

```
src/
  content/            the copy and data (no theme knows any copy)
  shared/             theme provider, switcher, focus handling, storage helpers
  themes/netscape/    the default; ships in the main bundle
  themes/geocities/   lazy-loaded chunk
  themes/macos9/      lazy-loaded chunk: window manager, menu bar, icons, startup screen
  themes/myspace/     lazy-loaded chunk: profile modules, Top 8, chiptune player (Web Audio)
  themes/today/       lazy-loaded chunk: the modern site, with the keycap nav
scripts/build.mjs     client build + SSR build + prerender + sitemap
scripts/shots.mjs     screenshots of every route in a theme at 390 and 1280px
scripts/og.mjs        regenerates public/og.png (needs a running preview)
tests/                Playwright smoke, switcher, theme behavior and axe tests
```

[NOTES.md](NOTES.md) is the running log of design decisions and the gotchas behind them.

## Deploying

The site deploys to Netlify. [`netlify.toml`](netlify.toml) sets the build command, Node 24, cache headers and a few redirects. Unknown URLs get the prerendered `404.html`.

Every icon, pattern and piece of retro art is original CSS or SVG. The two fonts are ChicagoFLF (public domain) and Comic Neue (SIL Open Font License).

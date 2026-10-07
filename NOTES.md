# Working notes

A running log of design decisions and what was tried, so a later session can pick up where this one stopped. The full design plan is in the first session's plan file. Its decisions are summarised here.

## Status

- [x] Phase 1: plan approved (2026-10-06)
- [x] Phase 2: foundation and the Netscape theme
- [x] Phase 3: GeoCities
- [ ] Phase 4: Mac OS 9
- [ ] Phase 5: polish (Playwright smoke and axe tests, Lighthouse, og.png, README)

## Architecture decisions

- **Prerendering is a custom script (`scripts/build.mjs`), not `vite-react-ssg`.**
  - The scaffold came with Vite 8 and React Router 8, and a ~30-line script is easier to keep correct than an adapter that might lag.
  - It runs the client build and the SSR build in one Node process, so `BUILD_DATE` is identical in both. That matters because the Netscape footer prints the build time, and a mismatch breaks hydration.
- **Routes are written as `dist/projects.html`, not `dist/projects/index.html`.**
  - `vite preview` falls back to the root `index.html` for `/projects` without a trailing slash. That served the home page's markup, and hydration failed with React error #418.
  - Netlify serves `projects.html` for `/projects` natively, and `netlify.toml` folds `/projects/` onto it.
- **Theme resolution:**
  - An inline script in `index.html` sets `<html data-theme>` before paint, resolving `?theme=` → localStorage → `netscape`.
  - `main.tsx` hydrates only when the theme is netscape, which is what the prerendered markup is in. Any other theme gets a fresh `createRoot`, while `base.css` hides `#root` until `.theme-ready` is set, with a 3s CSS fallback in case JS fails.
- **A `?theme=` value is saved and stays in the URL.** If the param is present when someone switches, it's updated in place so shared links stay accurate. It's never added otherwise.
- **Focus after navigation and switches:**
  - `useFocusPageTitle` focuses `#page-title`, which every theme's `<h1 tabIndex={-1}>` must carry.
  - Gotcha: while a lazy theme loads, Suspense keeps the old `<h1>` in the DOM but hidden, and `focus()` on it silently fails. The hook retries until `document.activeElement` really is the heading.
  - It compares deps against their previous values instead of using a first-run flag, so StrictMode's double mount doesn't steal focus on load.
- **CSS scoping:** every theme's CSS is scoped under `[data-theme='x']`, because a lazily loaded stylesheet stays in the document after you switch away.
- **Netscape ships in the main bundle.** The other two themes are `React.lazy` chunks, prefetched when someone hovers over or focuses the switcher.

## Netscape (1996)

- Browser defaults wherever they were the defaults: Times 16px, 2em/1.5em/1.17em headings, an etched `<hr>`, and an 8px-ish body margin (16px side gutter for phones).
- Two-column "table" layout on desktop. Below 720px it becomes a pipe-separated nav bar. The pipes use `content: '|' / ''` so screen readers don't read them.
- **Memorable element:** sincerity, made concrete with:
  - A `finger` box showing a `.plan`, with Login/Name and Directory/Shell columns that stack on phones.
  - A Hotlist.
  - A "Last modified:" line in Netscape's Document Info date format, fixed to America/New_York so the server and client agree.
- The 404 page copies the bare server error wording of the period: "The requested URL … was not found on this server."
- The résumé has a print stylesheet: nav and switcher hidden, link targets printed after the link text.
- **What I tried and changed after the first screenshots:**
  - The site name appeared above the nav *and* as the h1 on home, so I removed the header name.
  - The header was capped at 64em, which left the switcher short of the top-right corner, so the header is now full width and only the columns are capped.
  - The finger box wrapped mid-field at 390px, so the fields stack.

## GeoCities (1998)

- **Layout:** a centered black panel, max 760px, on an original SVG starfield tile (an inline data URI). All text sits on solid black, so contrast never depends on the stars.
- **Neighborhoods** were real GeoCities addressing:
  - The site lives at `SiliconValley/Heights/1999`.
  - The hobbies page moves to `Broadway/Stage/1998`, and its boxes swap their ridge border for a dotted yellow "marquee bulb" border.
- **Marquee:** CSS `translateX` on a single copy of the text. Motion that lasts more than 5s needs a way to stop it (WCAG 2.2.2), so there's a Stop/Scroll toggle, and hovering pauses it. Under reduced motion it's static and wraps.
- **Blink:** only the "NEW!" tag, and only for 4 cycles (under 5s), for the same reason.
- **Hit counter:** a localStorage count that goes up once per *browser session* (a sessionStorage flag), not per page view. A new tab counts as a new visit. If storage is blocked it shows `#?????` and "(your browser keeps secrets)".
- **Webring:** the "Brooklyn Coders Ring", which rings around the site's own sections. The component is keyed by section, so "Random" re-rolls on every page and is never the current one.
- **Fonts:** Comic Neue 700, latin subset only, via `@fontsource/comic-neue` (OFL, bundled with the lazy chunk). Body text is Verdana.
- **After the first screenshots:** the h2 at the top of each box had a big gap, so the first child's margin is now 0. I also added the Broadway border so the hobbies page feels like a different neighborhood.

## Content TODOs for Shane

`grep -rn "TODO(shane)" src/` lists them all. Resolved on 2026-10-06:
- **Employer:** Church Pension Group. Contract from Jul 2020, then Software Developer I from Jan 2021 to May 2023. Taken from the résumé PDF.
- **Seen:** stays first for now.
- **.plan:** the "Looking for" line is cut.
- **Résumé PDF:** in `public/`. Note that it includes a phone number, which becomes public once the site is deployed.

Still open:
- **Hobbies:** showtunes (Shane will come back to these), theatre specifics, and whether to keep the keyboards line.
- **Hotlist:** real favourites.
- **Copy:** review the project one-liners.

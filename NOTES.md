# Working notes

A running log of design decisions and what was tried, so a later session can pick up where this one stopped. The full design plan is in the first session's plan file. Its decisions are summarised here.

## Status

- [x] Phase 1: plan approved (2026-10-06)
- [x] Phase 2: foundation and the Netscape theme
- [x] Phase 3: GeoCities
- [x] Phase 4: Mac OS 9
- [x] Phase 5: polish (Playwright smoke and axe tests, Lighthouse, og.png, README)

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

## Mac OS 9 (1999)

- **Window manager:** `windows.ts`, a reducer with open, focus, close, shade, zoom, move, Clean Up, reset and projectsView.
  - Section windows map 1:1 to routes. "About This Shane", "Keyboard Help" and the 404 alert are utility windows that don't change the URL.
- **Route ↔ window:**
  - Arriving at a route (link, back button, reload) opens its window.
  - The window manager's own navigations carry `state.wm` so that sync ignores them.
  - Clicking or tabbing into a window brings it to the front and updates the URL with `keepFocus`. That's why `useFocusPageTitle` now takes an `enabled` flag: it stops focus being yanked to the title while you tab into a window's links.
  - Closing the last window goes to `/` with an empty desktop. A reload of `/` opens About Me.
- **Focus and headings:** the front window's title is `#page-title`, the global focus target. All window titles are h2, under an sr-only h1 "Shane Lonergan's desktop", which keeps heading order sequential for axe and Lighthouse.
- **Closing a window** with Esc or the close box returns focus to that window's desktop icon, falling back to the menu bar.
- **Menu bar:** the WAI-ARIA menubar pattern (`MenuBar.tsx`) with roving tabindex. Disabled Undo/Cut/Paste are period texture.
  - Below 720px it condenses to one "Windows" menu, and the switcher's label is visually hidden.
- **Icons:** click selects, double-click, Enter or Space opens, and a touch tap opens. The sticky note and the About Me text say "Tap" on coarse pointers.
- **Dragging:** only with `(pointer: fine) and (min-width: 720px)`. It keeps at least 60px of the title bar on screen. The window-shade has a keyboard equivalent in the collapse box (`aria-expanded`).
- **Below 720px:** windows are full-screen and only the front one is shown. The icons become a 3-column grid. Icons and the sticky are made `inert` while a window covers them.
- **Startup:** "Welcome to Shane OS" plus an extensions parade of original puzzle pieces, labelled in text only.
  - It lasts 1.8s and is `aria-hidden`; any key, click or tap skips it.
  - It plays once per session (sessionStorage `startup-seen`), never under reduced motion, and Special → Restart replays it.
  - The screenshot script sets the flag so review shots skip it.
- **Empty Trash…:** the only modal. It uses `role=alertdialog` and `aria-modal`, makes the rest of the desktop `inert`, traps Tab on OK and restores focus on close.
- **Fonts:**
  - ChicagoFLF is vendored as woff (22KB) from the `chicago.css` npm package. It's public domain per Robin Casady's statement, copied to `src/themes/macos9/fonts/README.ChicagoFLF.txt`. There's no woff2 because no converter was available locally.
  - Geneva has no bold, so emphasis (h4, `<b>`) is set in Chicago, which is also what the period did.
- **Originals only:** a pixel-sparkle glyph replaces the system-menu logo, and the folder, document, mail, trash, disk and alert icons are drawn from scratch.
- **After the first screenshots:**
  - The asterisk glyph read as a plain `*`, so it became the SVG sparkle.
  - The Finder rows were misaligned, so cells are now vertically centered.
  - Bold text was disappearing in Geneva, so emphasis uses Chicago.
  - The "Double-click" hint was wrong on touch, so it adapts.
- **Accessibility:** axe is clean for every theme × route at 390 and 1280. GeoCities needed its theme bar wrapped in an `<aside>` and the construction stripe moved inside `<header>`.

## Polish (phase 5)

- **Tests:** `npm test` runs Playwright against the real prerendered build on port 4174, at desktop (1280) and phone (390, touch) sizes. There are 100 tests and 4 deliberate skips.
  - They cover every theme × route rendering, axe, 360px overflow, the 404 page, the switcher, persistence and `?theme=`, footer badges, the hit counter, the marquee stop, reduced motion, the startup screen, and Mac keyboard, Finder, Trash, tap and drag behavior.
  - The test fixture fails a test on any console or page error, which is how hydration mismatches get caught.
- **Lighthouse 12, `/projects`:**

  | Theme | Mobile performance | Desktop performance | Accessibility, best practices, SEO |
  |---|---|---|---|
  | Netscape | 100 | 100 | 100 |
  | GeoCities | 99 | 100 | 100 |
  | Mac OS 9 | 98 | 100 | 100 |

- **Bundle:** the main JS is about 88KB gzipped. React DOM is about 200KB minified of that, and the router about 35KB.
  - Because pages are prerendered and the main thread is never blocked (TBT 0 ms), swapping React for Preact or dropping the router isn't worth the risk. Revisit if performance ever drops below 95.
- **Bugs the tests found:**
  - **404 hydration.** `404.html` is prerendered once with `/404` as the path, so printing the path broke hydration for every missing URL. It now comes from `useSyncExternalStore`, with a null server snapshot.
  - **Visually hidden text in link names.** Chrome inserts a space before an absolutely positioned sr-only span, so "Prev" + "ious" was read as "Prev ious" and "Open site" + ": Indigo" as "Open site : Indigo". All hidden suffixes are now full words, like " for Indigo" or " (Projects)".
  - **Mac zoom and collapse boxes** were too close for WCAG 2.5.8 target spacing, so there's 6px more space between them.
- **`vite preview` acts like Netlify.** It uses `appType: 'mpa'` plus a small plugin that serves `404.html` with a 404 status when no file matches. Without it, the preview's SPA fallback served the home page for unknown URLs and hid the hydration bug above.
- **Assets:**
  - `robots.txt` is in `public/`.
  - `sitemap.xml` is generated by `scripts/build.mjs` from the route list.
  - `og.png` comes from `scripts/og.mjs`, which places the three eras' home pages side by side.

## Content TODOs for Shane

`grep -rn "TODO(shane)" src/` lists them all. Resolved on 2026-10-06:
- **Employer:** Church Pension Group. Contract from Jul 2020, then Software Developer I from Jan 2021 to May 2023. Taken from the résumé PDF.
- **Seen:** stays first for now.
- **.plan:** the "Looking for" line is cut.
- **Résumé PDF:** in `public/`. Note that it includes a phone number, which becomes public once the site is deployed.

Resolved on 2026-10-07: the Hobbies section was cut and replaced by a **Bio** (`/bio`). `/hobbies` redirects there.

Still open:
- **Hotlist:** real favourites.
- **Copy:** review the project one-liners.

## Deploys

- **GitHub:** https://github.com/shanelonergan/shanelonergan.dev (public), pushed 2026-10-06.
- **Test site:** https://shanelonergan-90s.netlify.app (Netlify site `shanelonergan-90s`, id `0d137acb-2966-4730-aafa-d68c4ee08043`).
  - It's a manual CLI deploy of `dist/`, not linked to Git yet.
  - The local `netlify-cli` is 2.25, and its interactive `sites:create` crashes on Node 24. Create sites with `netlify api createSite` instead.
  - Redeploy with `npm run build && netlify deploy --prod --dir dist --site 0d137acb-2966-4730-aafa-d68c4ee08043`.
- **Production (cut over 2026-10-07):** `shanelonergan.dev` now points at `shanelonergan-90s`.
  - The custom domain was removed from the old site (`shane-lonergan-portfolio`, repo `new-portfolio`), which is still reachable at its `.netlify.app` URL, and set on the new one.
  - Then `configureDNSForSite` recreated the `www` NETLIFY record, and `force_ssl` was turned on.
  - DNS is Netlify DNS (zone `5e364e1749a8d80754010372`). The `blog.` records in the same zone were left alone.
  - The certificate is Netlify's wildcard for `*.shanelonergan.dev`, already issued, so `provisionSiteTLSCertificate` returned 422 because there was nothing to do.
  - To roll back, swap `custom_domain` back to the old site the same way.

## Bio replaces Hobbies (2026-10-07)

- **Content:** `src/content/bio.ts` holds the paragraphs (first person, like the rest of the site) plus short label/value facts. Showtunes, keyboards and the separate hobby entries are gone. Guitar and theatre live on in the bio text and facts. The Hotlist moved to `src/content/hotlist.ts`.
- **Netscape:** "Bio", with a "Vital statistics" `<dl>` under the prose.
- **GeoCities:** "All About Me!", with The Story So Far and a Fast Facts box. It stays in the Broadway neighborhood, with the marquee-bulb borders.
- **Mac OS 9:** the "Bio" window is laid out like a Finder Get Info window: a new original person icon, right-aligned label/value rows, and the story in the "Comments:" box, where OS 9 put free text.
  - The home window was renamed "About Me" → "Read Me", so it doesn't compete with Bio. That's also more period-accurate.
- **Redirects:** `netlify.toml` 301s `/hobbies` and `/hobbies/` to `/bio`.
- **Bio rewrite (2026-10-07):** Shane shared cover letters and asked for "short and sweet". It's now three paragraphs:
  - Loving to build things, from skateboards and pen spinning to theater to software, plus the engineering work.
  - The acting teacher's "actors are bricklayers" line, then Oberlin and Flatiron.
  - Still acting and playing guitar, and theater and software as experiences built for an audience.
  - Buzzwords from the cover letters ("passionate" and so on) were left out on purpose.

## Netscape moves to 1995 (2026-10-07)

- The reference was Shane's pick: https://pspb.chrisrcook.com/tag/1995/, Netscape Navigator 1.0 screenshots of 1995 pages (BBC.co.uk on Windows 3.11).
  - Those pages are a single column, with no table layout.
  - They open with a beveled banner image ("WELCOME TO THE BBC").
  - Links come as a list, each with a small icon and "- description".
  - Contact is a plain "comments or suggestions are welcome at **address**" line.
- **Changes:**
  - The two-column sidebar layout is gone (that's more 1996–97). Everything is one 44em column, with a bracketed `[ Home | Projects | … ]` text nav on every page and every screen size.
  - The home h1 is now the banner: a CSS-beveled box with an original "SL" seal SVG and "Welcome to Shane Lonergan's Home Page" lettering. It's real text, so screen readers and search engines read it.
  - The home page's "Recent projects" list is replaced by the link list. Each section has new first-person `blurb` copy in `site.ts`, and the icons are original 24px beveled tiles in `themes/netscape/icons.tsx`.
  - The footer reads "Comments or suggestions are welcome at <b>email</b>", then the name and "Last modified".
  - The switcher label is now "Netscape Navigator (1995)".

## MySpace (2006), added 2026-10-07

- **Shane's picks:** a pimped-out custom layout, projects as the Top 8, a 2006 label, and a profile song using a public-domain musical theatre tune on a chip player.
- **Branding:** it's called "ShaneSpace | a place for projects". There's no MySpace logo or slogan; "MySpace" appears only in the switcher label.
  - The site chrome (blue bar and nav) stays stock, as it did on every custom profile. Everything below it is Shane's "custom layout": a stage background with a spotlight, an original note-and-star tile, see-through boxes with dashed hot-pink borders, glitter headings (gradient clipped to text) and blinkies.
- **Motion:**
  - Glitter shimmers once (4s), and the blinkies flash 5 times (4s). Both stay under the 5-second WCAG 2.2.2 limit.
  - The equalizer only moves while the song plays.
  - Reduced motion turns all of it off.
- **Routes:**
  - `/` is the profile: ID card, Contacting Shane (every button is a real link: mailto, LinkedIn, a share mailto, GitHub, the PDF), URL, Interests, Details, extended network, song, Blurbs, Top 8, and an honest "0 of 0 comments (Add Comment)".
  - `/projects` is "Shane's Friends", `/resume` uses the Companies and Schools tables, `/bio` is "Shane's Blurbs", and `/contact` is "Contacting Shane".
  - The 404 is "Invalid Friend ID."
- **Phone order:** below 760px the profile is one column, ordered so the Top 8 comes right after Contacting. `Profile.tsx` renders the boxes in that order with `useMediaQuery`. CSS `order` would have made the visual order disagree with the reading and Tab order.
- **Song:** `src/themes/myspace/song.ts`, "Give My Regards to Broadway" (George M. Cohan, 1904, *Little Johnny Jones*, public domain).
  - Melody and chords follow the John Chambers ABC transcription (key of G, 2/4) found via abcnotation.com.
  - The arrangement is original: a square-wave lead and a triangle oom-pah bass on the chord roots, about 16.6s, synthesized with Web Audio. There are no audio files.
  - The AudioContext is created only on the click; a test proves none exists on load. Leaving the theme stops the song.
- **New content:** `bio.interests` and `bio.wantToMeet`. The latter is marked `TODO(shane)`.
- **Flavor I made up:** "Mood: inspired", "Online Now!", the blinkie texts ("React kid", "Rails 4 life", "theatre nerd"), "(They're projects. Shane is fine.)" and "Layout by Shane".
- **Profile pic:** Shane's own photo (blazer, holding a mechanical keyboard), supplied 2026-10-07. It's cropped to 3:4 (300×400 for 2x screens, shown at 150×200) and re-encoded through a canvas, so no EXIF or camera metadata ships. It's 19KB at `src/themes/myspace/shane.jpg` and loads only with the MySpace chunk.
- **Fixes after the first screenshots:**
  - The phone order buried the Top 8.
  - Seen and shanelonergan.com both showed "S" initials.
  - The Friends avatars stretched to card height.
  - axe flagged the Companies and Schools tables as unfocusable scroll areas on phones, so cells now wrap there and the wrappers are focusable regions.

# Work Log

## 2026-05-28

Initial project setup and portfolio generation.

Actions completed:

1. Downloaded the shared Google Sheets workbook as `portfolio_source.xlsx`.
2. Inspected workbook sheets and identified the relevant Irem and Eralp source tabs.
3. Created the project documentation folder.
4. Created the static GitHub Pages site folder.
5. Added `docs/scripts/build_portfolio_data.py`.
6. Extracted and normalized 54 unique games from the workbook.
7. Fetched public store metadata from App Store and Google Play.
8. Downloaded local game icons and screenshots under `docs/assets/games/`.
9. Generated `docs/data/games.json` and `docs/data/games.js`.
10. Added the static website files: `index.html`, `styles.css`, and `app.js`.
11. Started a local static preview server and verified the rendered page with the in-app browser.
12. Tested featured card rendering, complete catalog rendering, Google Play filtering, search, and project dialog opening/closing.

Important fixes:

- Corrected shifted Eralp App Store rows where platform was blank and subsequent values moved left.
- Changed featured selection to prioritize games with screenshot assets, since some newer App Store lookup responses only return icons.
- Added a small-image guard so invalid Google Play placeholder assets are not referenced in generated data.
- Reduced hero typography and spacing after visual verification so the metrics section is visible on desktop.
- Removed the opening intro section after user feedback; the page now starts with the portfolio metrics band.
- Removed the featured projects section and featured navigation/filter from the visible UI; all games now appear directly in the main library.
- Added App Store web-page screenshot fallback for games where the lookup API returns icons but no screenshots.
- Recovered screenshots for Trailer Match, Baggage Order, Color Shape Jam, Cup Loop, Drop Jam, Garden Organize, Screw Twist 3D! Unscrew It, Bead Organize, Color Fit Craze, Lock Tangle, Popper Out, and Thread Pop.
- Marble Pop still has no screenshots because its App Store lookup result is empty and the tested public App Store pages return 404.
- Fixed Google Play screenshot extraction. The first pass had captured icons/feature graphics for Google Play games; the extractor now filters those out and all 12 Google Play games have 4 portrait gameplay screenshots.
- Added `.gitignore` for OS/editor cache, local environments, logs, dependency folders, and scratch files while keeping the source workbook, generated data, and local web assets trackable.
- Added a minimal root `README.md` for public repository display without exposing detailed project notes.
- Neutralized public-facing documentation language to avoid naming a specific external audience or target.
- Renamed the website folder from `web/` to `docs/` for GitHub Pages publishing and moved maintenance documentation to `project-docs/`.

Current limitation:

- `Marble Pop` has no current store screenshots because Apple lookup returns no result and tested App Store storefront URLs return 404.

Regeneration command:

```powershell
& 'C:\Users\aLypS\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' 'C:\Pf\docs\scripts\build_portfolio_data.py'
```

Use `--refresh` to redownload existing image assets.

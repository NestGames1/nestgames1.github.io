# AGENTS.md

Guidance for Codex agents working in this workspace.

## First Step For Every Task

Before making changes, read the project documentation in this order:

1. `docs/README.md`
2. `docs/site-architecture.md`
3. `docs/data-source-and-pipeline.md`
4. `docs/content-strategy.md`
5. `docs/work-log.md`

Use those files as the current source of project context. Update the relevant doc when you make a meaningful change, especially if you alter data extraction, site structure, content strategy, or known limitations.

## Project Purpose

This is a static, publisher-facing mobile game portfolio for Irem Salk and Eralp Ozer.

Primary goal:

- Show all listed games clearly.
- Use local store assets where possible.
- Keep the site GitHub Pages-friendly.
- Present work in English for publisher collaboration.

Current user preference:

- No opening hero / publisher intro section.
- No visible featured projects section.
- The page should start with the metrics band, then show the complete game library.

## Directory Map

- `portfolio_source.xlsx`: Local source workbook exported from Google Sheets.
- `docs/`: Human and agent-readable project documentation.
- `web/`: Static website root.
- `web/index.html`: Page markup.
- `web/styles.css`: Responsive styling.
- `web/app.js`: Rendering, search, filtering, dialog behavior.
- `web/data/games.json`: Generated structured data.
- `web/data/games.js`: Generated browser runtime data.
- `web/assets/games/`: Downloaded local icons and screenshots.
- `web/scripts/build_portfolio_data.py`: Source workbook extraction and asset pipeline.

## Data Pipeline

Run the generator with the bundled Python runtime when possible:

```powershell
& 'C:\Users\aLypS\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' 'C:\Pf\web\scripts\build_portfolio_data.py'
```

Use `--refresh` only when you intentionally want to redownload existing image assets.

The pipeline:

- Reads `portfolio_source.xlsx`.
- Merges duplicate store entries by platform and store ID.
- Fetches App Store metadata through Apple lookup API.
- Falls back to App Store public page scraping when screenshots are missing.
- Scrapes Google Play public pages for real gameplay screenshots.
- Writes both `web/data/games.json` and `web/data/games.js`.

Important: preserve the existing-asset fallback behavior in the script. It prevents temporary store API failures or rate limits from wiping already downloaded assets from generated data.

## Known Data State

Current normalized output:

- 54 unique games.
- 42 App Store games.
- 12 Google Play games.
- Google Play games currently have 4 real portrait gameplay screenshots each.
- `Marble Pop` is the only known game without screenshots because Apple lookup returns no result and tested App Store storefront URLs return 404.

## Local Preview

The current in-app browser preview has been served from:

```text
http://127.0.0.1:8091/
```

If that preview server is unavailable, start any simple static server rooted at `web/`. Do not add a build system unless the user explicitly asks for one.

## Verification Checklist

After site or data changes:

- Confirm `web/data/games.json` is valid JSON.
- Run JS syntax checks:

```powershell
& 'C:\Users\aLypS\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --check 'C:\Pf\web\app.js'
& 'C:\Users\aLypS\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --check 'C:\Pf\web\data\games.js'
```

- Check for missing or tiny referenced assets.
- Reload the preview and verify visible card counts and affected UI behavior.

## Editing Rules

- Keep the site static and GitHub Pages-compatible.
- Prefer small, direct edits.
- Use local image assets instead of hotlinking store images.
- Do not remove user-requested UI simplifications unless asked.
- Do not claim unverified ownership, revenue, performance, or publisher results.
- Keep copy practical, concise, and publisher-oriented.


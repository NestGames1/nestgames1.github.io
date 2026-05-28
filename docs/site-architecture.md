# Site Architecture

The website lives in `web/` and is a static GitHub Pages application.

## Files

- `web/index.html`: Main page markup and section anchors.
- `web/styles.css`: Full responsive styling.
- `web/app.js`: Rendering, filtering, search, and project dialog behavior.
- `web/data/games.js`: Generated runtime data loaded before `app.js`.
- `web/data/games.json`: Same generated data in pure JSON form for review or reuse.
- `web/assets/games/`: Local icons and screenshots.
- `web/scripts/build_portfolio_data.py`: Data generation script.

## Runtime Model

The page does not fetch JSON at runtime. It loads `data/games.js`, which assigns `window.PORTFOLIO_DATA`. This avoids local file and GitHub Pages fetch-path issues.

`app.js` renders:

- Portfolio metrics.
- Filterable/searchable complete game catalog.
- Team role cards.
- Native `dialog` project detail view.

## GitHub Pages Notes

The `web/` folder can be used as the publish root if the repository is configured to serve from that folder. If GitHub Pages is configured for repository root, copy or move the contents of `web/` to the root, or use a branch/workflow that publishes `web/`.

No bundler or package manager is required.

## Accessibility And Responsiveness

The UI uses semantic sections, keyboard-openable game cards, native dialog, labels for search, and responsive grid layouts. Desktop and mobile layouts are handled in CSS media queries.

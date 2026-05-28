# Site Architecture

The website lives in `docs/` and is a static GitHub Pages application.

## Files

- `docs/index.html`: Main page markup and section anchors.
- `docs/styles.css`: Full responsive styling.
- `docs/app.js`: Rendering, filtering, search, and project dialog behavior.
- `docs/data/games.js`: Generated runtime data loaded before `app.js`.
- `docs/data/games.json`: Same generated data in pure JSON form for review or reuse.
- `docs/assets/games/`: Local icons and screenshots.
- `docs/scripts/build_portfolio_data.py`: Data generation script.

## Runtime Model

The page does not fetch JSON at runtime. It loads `data/games.js`, which assigns `window.PORTFOLIO_DATA`. This avoids local file and GitHub Pages fetch-path issues.

`app.js` renders:

- Portfolio metrics.
- Filterable/searchable complete game catalog.
- Team role cards.
- Native `dialog` project detail view.

## GitHub Pages Notes

The `docs/` folder is the intended GitHub Pages publish root.

No bundler or package manager is required.

## Accessibility And Responsiveness

The UI uses semantic sections, keyboard-openable game cards, native dialog, labels for search, and responsive grid layouts. Desktop and mobile layouts are handled in CSS media queries.

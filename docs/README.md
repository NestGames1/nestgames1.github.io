# Portfolio Project Overview

This workspace contains a static publisher-facing game portfolio for Irem Salk and Eralp Ozer.

The portfolio is intended for Homa-style publisher collaboration conversations. It presents released and partner game work, highlights selected projects with screenshots, and keeps the rest of the catalog browsable through filters.

## Current Structure

- `portfolio_source.xlsx`: Source workbook exported from the shared Google Sheets link.
- `web/`: Static GitHub Pages-ready website.
- `web/data/games.json`: Generated structured portfolio data.
- `web/data/games.js`: Browser-ready version of the same data.
- `web/assets/games/`: Downloaded app icons and screenshots, grouped by game slug.
- `web/scripts/build_portfolio_data.py`: Data extraction, metadata fetch, and asset download pipeline.
- `docs/`: English project documentation for future Codex tasks.

## People And Roles

- Irem Salk: Game Designer, Level Designer, Ideator.
- Eralp Ozer: Game Developer.

## Delivery Target

The website is intentionally static. It should work on GitHub Pages without a backend, package install, or build command.


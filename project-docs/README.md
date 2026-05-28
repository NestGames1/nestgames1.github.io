# Project Overview

This workspace contains a static mobile game portfolio website.

The site presents released and partner game work with store links, icons, screenshots, and a searchable catalog.

## Current Structure

- `portfolio_source.xlsx`: Source workbook exported from the shared Google Sheets link.
- `docs/`: Static GitHub Pages-ready website.
- `docs/data/games.json`: Generated structured portfolio data.
- `docs/data/games.js`: Browser-ready version of the same data.
- `docs/assets/games/`: Downloaded app icons and screenshots, grouped by game slug.
- `docs/scripts/build_portfolio_data.py`: Data extraction, metadata fetch, and asset download pipeline.
- `project-docs/`: Project documentation for future maintenance tasks.

## Delivery Target

The website is intentionally static. It should work on GitHub Pages without a backend, package install, or build command.

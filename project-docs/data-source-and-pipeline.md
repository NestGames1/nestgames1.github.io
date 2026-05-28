# Data Source And Pipeline

## Source Workbook

The local workbook is `portfolio_source.xlsx`. It was downloaded from the Google Sheets URL provided by the user.

Relevant workbook sheets:

- `Irem Salk-Product`: Irem's portfolio game list.
- `Eralp Özer - Developer`: Eralp's partner/developer game list.
- `Summary`: Workbook-level summary data.
- `Partner Summary`: Partner-game summary data.

The site generation currently reads the two person-specific sheets directly and does not depend on the summary sheets.

## Normalization Rules

The script `docs/scripts/build_portfolio_data.py`:

1. Reads rows from the two source sheets.
2. Infers platform from store URL when needed.
3. Extracts App Store IDs from `/id...` URLs.
4. Extracts Google Play package IDs from `?id=...`.
5. Merges duplicate store entries by platform and store ID.
6. Adds contributor metadata based on source sheet.
7. Fetches public store metadata.
8. Downloads icons and screenshots into `docs/assets/games/`.
9. Writes `docs/data/games.json` and `docs/data/games.js`.

## Store Metadata Sources

- App Store: Apple iTunes Lookup API.
- Google Play: Public Google Play Store page HTML.

App Store metadata is cleaner and more structured. When the lookup API returns no screenshots, the pipeline falls back to scraping the public App Store page for `mzstatic` screenshot URLs. Google Play scraping is heuristic because the public page embeds image URLs inside generated page data.

## Known Data Quirks

The Eralp sheet has late App Store rows where the `Platform` column is blank and values shift left. The pipeline detects this case when:

- The row comes from `Store Link`.
- The URL is an App Store URL.
- The `Platform` cell is not `App Store` or `Google Play`.

In that case, the script treats the apparent platform cell as seller, then shifts release date and version count back into place.

Some recent App Store pages return an icon through the lookup API but no screenshots. These games remain in the complete catalog, but featured selection currently favors games with usable screenshots.

Google Play can expose icons, feature graphics, and tiny placeholder image responses in the same page data as screenshots. The pipeline now excludes the icon/feature base URL, rejects square image candidates, and ignores downloaded images smaller than 2 KB so they are not referenced by the website data.

As of the latest retry, only `Marble Pop` has no screenshots. Apple lookup returns no result for its ID, and the public App Store page returns 404 in tested country storefronts.

## Current Generated Counts

Current normalized output:

- 54 unique games.
- 42 App Store games.
- 12 Google Play games.
- Release years: 2023-2026.
- Tracked version count total: 108.

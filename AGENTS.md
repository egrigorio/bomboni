# Project context for coding agents

## Purpose

Build a reusable Python data layer for the public restaurant directory and menu pages at `studentska-prehrana.si`, then expose it through an MCP adapter. Keep the extraction and domain logic independent of MCP so a future HTTP API or another adapter can reuse it.

## Architecture

- `core/`: domain models, source protocols, and application services. No MCP imports here.
- `data_sources/studentska_prehrana/`: HTTP client and HTML parsing for the site's list, detail, and date-specific menu endpoints.
- `adapters/mcp/`: thin MCP tools which call the shared service.
- Future transports (for example FastAPI) should be added as adapters over `core` services, not by duplicating scraping logic.

## Source behavior confirmed

- English restaurant index: `/en/restaurant`.
- Restaurant detail: `/en/restaurant/Details/{id}`; ABI FALAFEL uses ID `1478`.
- The index HTML contains restaurant rows with `data-posid`, `data-lokal`, `data-city`, `data-naslov`, `data-detailslink`, `data-cena`, and `data-doplacilo` attributes.
- Detail HTML contains menu date choices and the selected day's dishes.
- The site's date switch posts `restaurantId` and `date` to `/en/restaurant/MenuForDate`; the response is HTML, not JSON. Dish category is present as the title of the menu card's category image (for example `Meat`, `Fish`, `Meatless`).
- Menu item names can remain Slovenian on the English site. Preserve source text and source URLs; do not silently translate or infer ingredients.

## Data and freshness

- Treat restaurant IDs as stable keys and names as display labels, never as unique keys.
- Menus are date-specific and volatile. Return the requested/observed date and fetch timestamp with menu results.
- Cache directory metadata briefly; do not cache menus long enough to present stale menus as current. Keep cache policy in the service layer.
- Menu category filtering must use the site's menu category, not the restaurant-level `Meatless` badge.
- When no menu/category data is available, report that clearly rather than guessing from restaurant names.

## Development

- Python 3.11+.
- Dependencies and scripts are declared in `pyproject.toml`.
- Keep network access read-only and limited to public GET and the site's read-only menu lookup POST.
- Add parser fixtures/tests when selectors or source behavior changes. Do not commit live user data, credentials, or scraped bulk datasets.

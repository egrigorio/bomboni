# bomboni

Reusable extraction/query layer for the public restaurant directory and menus at [studentska-prehrana.si](https://www.studentska-prehrana.si/en/restaurant), with an MCP adapter as the first integration. The core service is transport-independent so a future REST API can reuse the same models, source client, and query logic.

## Architecture

```text
studentska-prehrana.si
        ↓
StudentskaPrehranaSource (HTTP + HTML parsing)
        ↓
RestaurantService (shared search, detail, and menu queries)
       ↙       ↓        ↘
     MCP   Local web   Vercel API
```

## Tools exposed by the MCP

- `search_restaurants`: filter by city, name, and restaurant-level tags.
- `get_restaurant`: retrieve a restaurant by its stable site ID.
- `get_restaurant_menu`: retrieve a selected date's dishes and categories.
- `search_menu_items`: scan menus in a city for a dish phrase or site category such as `Meat`, `Fish`, or `Meatless`.

Restaurant IDs are the canonical identity. For example, ABI FALAFEL is ID `1478` and its detail URL is `/en/restaurant/Details/1478`.

## Setup

Requires Python 3.11+.

```bash
python -m venv .venv
source .venv/bin/activate
python -m pip install -e '.[dev,mcp]'
```

Run the MCP over stdio:

```bash
bomboni-mcp
```

Or use the SDK Inspector during development:

```bash
mcp dev src/bomboni/adapters/mcp/server.py
```

## Web app / PWA

The mobile-first web app shares the same restaurant source and core models as the MCP. It uses the restaurant coordinates published in the directory to sort nearby venues, then loads a selected date's menu and translates dish names and sides into Portuguese, English, Spanish, German, Italian, French, or Catalan. Slovenian names remain visible alongside machine translations.

On mobile, the PWA has a floating liquid-glass bottom navigation with Explore, Favorites, Draw, and Profile tabs. Restaurant hours are fetched from official detail pages for visible cards in bounded batches; the open/closed badge is based on the published schedule in the `Europe/Ljubljana` timezone and is unavailable when no schedule is published.

```bash
bomboni-web
```

Open `http://127.0.0.1:8765`. The browser asks for location permission to sort venues by distance; coordinates are sent only to this server for distance calculation. If permission is denied, the app lists the directory without proximity sorting. The app shell can be installed as a PWA and is cached for offline launch; restaurant and translation data still require a connection. Translation is provided by MyMemory and may be unavailable or imperfect, so the source menu name remains visible for checking.

To install the PWA on a phone, deploy the web adapter behind HTTPS. On Android and supported desktop browsers, use the in-app install button or the browser's install menu. On iPhone/iPad, open the HTTPS site in Safari, tap Share, then choose “Add to Home Screen”. The development server binds to localhost by default and should not be exposed directly to the public internet.

## Vercel deployment

The web adapter has Vercel serverless entry points under `api/`, all calling the same transport-independent `RestaurantService` as the local web server and MCP. The PWA source files remain canonical under `src/bomboni/adapters/web/static`; `scripts/prepare_vercel.py` copies them into Vercel's static output folder during the configured build. The deploy only includes the web runtime dependencies; install the `mcp` extra locally when running the MCP server.

To deploy, import this repository into Vercel with the project root set to the repository root. The included `vercel.json` configures the asset build and a 30-second maximum function duration. Preview a deployment before assigning a production domain. Vercel's Python runtime is currently marked Beta. Its functions are stateless between instances, so the in-memory source and menu caches are best-effort per warm function instance; a shared cache can be added later without changing the core service.

## Freshness and menu search

The directory is cached briefly in memory and each fetched menu is cached for five minutes while the MCP process stays running. Menu lookups include the requested date and retrieval time. A broad menu search fetches menus for restaurants in the requested city with bounded concurrency; the first search for a city/date will take longer than a simple restaurant lookup. For city-wide questions, call `search_menu_items` once with the city and category or dish phrase (for example, `city="Ljubljana", query="sushi"`); do not list restaurants first or fetch menus individually. `limit` caps returned dish records, not the menus scanned, and the server caps results at 50. The result includes `elapsed_ms` to separate data-source time from model reasoning time. Restaurant badges and menu dish categories are separate fields: use dish categories for questions like “where can I eat meat?”.

The site currently returns menu fragments as HTML from its date lookup endpoint, so the source adapter parses those fragments into the shared domain models. It preserves original Slovenian dish names and source links.

## Development checks

```bash
pytest
```

## License

MIT. See [LICENSE](LICENSE).

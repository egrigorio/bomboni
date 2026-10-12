# bomboni

Reusable extraction/query layer for the public restaurant directory and menus at [studentska-prehrana.si](https://www.studentska-prehrana.si/en/restaurant), with an MCP adapter as the first integration. The core service is transport-independent so a future REST API can reuse the same models, source client, and query logic.

## Architecture

```text
studentska-prehrana.si
        ↓
StudentskaPrehranaSource (HTTP + HTML parsing)
        ↓
RestaurantService (shared search, detail, and menu queries)
       ↙ ↘
    MCP     future API adapter
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
python -m pip install -e '.[dev]'
```

Run the MCP over stdio:

```bash
bomboni-mcp
```

Or use the SDK Inspector during development:

```bash
mcp dev src/bomboni/adapters/mcp/server.py
```

## Freshness and menu search

The directory is cached briefly in memory and each fetched menu is cached for five minutes while the MCP process stays running. Menu lookups include the requested date and retrieval time. A broad menu search fetches menus for restaurants in the requested city with bounded concurrency; the first search for a city/date will take longer than a simple restaurant lookup. For city-wide questions, call `search_menu_items` once with the city and category or dish phrase (for example, `city="Ljubljana", query="sushi"`); do not list restaurants first or fetch menus individually. `limit` caps returned dish records, not the menus scanned, and the server caps results at 50. The result includes `elapsed_ms` to separate data-source time from model reasoning time. Restaurant badges and menu dish categories are separate fields: use dish categories for questions like “where can I eat meat?”.

The site currently returns menu fragments as HTML from its date lookup endpoint, so the source adapter parses those fragments into the shared domain models. It preserves original Slovenian dish names and source links.

## Development checks

```bash
pytest
```

## License

MIT. See [LICENSE](LICENSE).

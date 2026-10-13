# Project context for coding agents

## Purpose

Build a reusable Python data layer for the public restaurant directory and menu pages at `studentska-prehrana.si`, then expose it through an MCP adapter. Keep the extraction and domain logic independent of MCP so a future HTTP API or another adapter can reuse it.

## Architecture

- `core/`: domain models, source protocols, and application services. No MCP imports here.
- `data_sources/studentska_prehrana/`: HTTP client and HTML parsing for the site's list, detail, and date-specific menu endpoints.
- `adapters/mcp/`: thin MCP tools which call the shared service.
- `adapters/web/`: PWA and JSON HTTP adapter over the same service; do not duplicate extraction rules here.
- `api/`: Vercel serverless HTTP entry points; keep them thin and delegate to the shared web/domain adapters.
- `data_sources/translation/`: translation provider adapter. Preserve original source text with machine translations.
- Future transports (for example FastAPI) should be added as adapters over `core` services, not by duplicating scraping logic.
- Vercel static assets are generated from `src/bomboni/adapters/web/static/` by `scripts/prepare_vercel.py`; do not edit generated `public/` assets as source files.
- Keep the MCP SDK in the optional `mcp` extra so the web deployment installs only its HTTP/parsing dependencies.

## Web and PWA design guardrails

- Keep the current visual language: warm off-white canvas, dark green text, muted green accents, white restaurant cards, soft borders, and rounded corners. Keep typography and spacing calm and readable; avoid adding decorative copy or layers of tiny helper text.
- Restaurant cards must show the restaurant name and address on separate lines with visible vertical spacing. Keep the selected restaurant menu visually distinct from the list.
- On desktop with no restaurant selected, center the discovery column and cap its width. With a menu selected, use the two-column list/menu layout. On narrow screens, use a single-column list and a full-screen menu with a clear back action. Preserve the existing responsive breakpoints unless there is a concrete layout reason to change them.
- Keep the canonical UI in `src/bomboni/adapters/web/static/`. Do not edit generated `public/` output. After changing JS, CSS, or service-worker behavior, update the asset query version or cache name in `index.html` and `service-worker.js` so installed PWAs do not keep a stale shell.
- Keep component CSS beside its base component rule and responsive overrides inside the corresponding media queries. Avoid accumulating end-of-file overrides that make cascade order hard to understand; preserve the existing palette, type scale, card rhythm, and whitespace when making targeted fixes.
- On phones, keep the bottom tab bar fixed above the iOS safe-area inset, with enough content padding that it never covers restaurant cards or menu items. Its tabs should remain usable when a restaurant menu is open.
- Mobile navigation has four stable top-level tabs: Explore, Favorites, Draw, and Profile. Keep the tab bar floating above content as a distinct translucent Liquid Glass layer; the selected tab gets the opaque highlight while inactive tabs remain transparent. Respect safe areas and reduced-transparency accessibility settings. Do not repurpose tabs for one-off actions such as opening search or requesting location.
- The Draw tab filters are optional: city, official menu food category, restaurant-or-dish mode, and maximum student co-pay. Keep the random selection logic in `RestaurantService.draw_recommendation` and expose it through both local and Vercel web adapters; the browser must not scrape the source DOM. Dish/category draws inspect up to 60 randomly sampled current official menus with bounded concurrency to stay within serverless time limits, retain menu date/source provenance, and disclose when the scan was sampled.
- Favorites and Profile are top-level destinations prepared for a future account system. Until persistence/authentication exists, show honest empty/preview states and do not fabricate saved items, reviews, history, or spending statistics.
- Restaurant opening hours come from the official detail page, not from the directory badge `Opened at weekends`. Load hours only for visible restaurant cards through the bounded batch endpoint; calculate open/closed using the `Europe/Ljubljana` timezone, and display an unavailable state when the source has no schedule.

## Web API route contract

- The browser requests menus using `/api/restaurants/{restaurant_id}/menu?date=YYYY-MM-DD`. The local web server handles this route directly; Vercel rewrites it to the thin function at `/api/menu?restaurant_id=...`, retaining the requested date query.
- Keep the frontend URL, local adapter route, and Vercel rewrite in sync when changing menu endpoints. A working restaurant list does not prove menu fetching works: verify a restaurant selection reaches the menu endpoint and renders dishes, and report HTTP failures in the page rather than leaving a spinner.
- The frontend must only call endpoints implemented by both the local adapter and the deployed adapter (directly or through an explicit Vercel rewrite). Keep scraping, parsing, and menu selection in the shared service/source layers.
- `/api/restaurant-hours?ids=...` accepts at most 20 restaurant IDs and retrieves official detail-page schedules with bounded concurrency. Keep local and Vercel implementations in sync; do not fetch details for the entire directory when rendering the list.
- Every dish card must keep its image-search action inside the card, aligned to the right of the displayed dish name. Search Google Images with the original Slovenian dish name, open in a new tab, and keep the translated label as the main text.

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
- A menu item returned by the portal is a published listing, not a live confirmation that the venue still has it in stock. Report the listing's date and fetch timestamp; do not guarantee current availability.
- Cache directory metadata briefly; do not cache menus long enough to present stale menus as current. Keep cache policy in the service layer.
- Menu category filtering must use the site's menu category, not the restaurant-level `Meatless` badge.
- Restaurant index rows expose `data-lat` and `data-lon`; use these for proximity sorting and do not geocode addresses through a third party.
- Ask for browser geolocation only in the web UI and use it only to calculate distances. Keep menu APIs network-only in the service worker so dated menus do not become stale offline.
- When no menu/category data is available, report that clearly rather than guessing from restaurant names.

## Answering student meal questions in Antigravity

- Treat ordinary questions about *boni*, student meal eligibility, participating restaurants, current menus, dishes, and co-payments as requests for Bomboni data even when the user does not name the MCP.
- Bomboni is the source of truth for those facts. Use its MCP results and do not supplement them with web searches, delivery apps, restaurant sites, shell commands, or remembered menu data. Use another source only if the user explicitly asks for information outside Bomboni's coverage or an independent comparison.
- Choose the appropriate Bomboni tool directly: use `search_menu_items` for a city-wide dish/category question, `get_restaurant_menu` for a known restaurant, and `search_restaurants` for a directory lookup. Do not issue preliminary searches or repeat equivalent calls when one call answers the question.
- Give the relevant restaurant names, addresses, co-payments, menu date, and matching dishes from the returned data. Keep dish names in the source language and translate briefly when useful. Do not replace the requested information with a vague summary.
- If the MCP reports no matches, errors, or truncated results, state that plainly. Do not fill gaps by guessing or silently present partial data as complete. Only claim a result is unique when `scan_complete` is true and `results_truncated` is false.

## Development

- Python 3.11+.
- Dependencies and scripts are declared in `pyproject.toml`.
- Keep network access read-only and limited to public GET and the site's read-only menu lookup POST.
- Add parser fixtures/tests when selectors or source behavior changes. Do not commit live user data, credentials, or scraped bulk datasets.

from __future__ import annotations

import threading
import unicodedata
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date, datetime, timedelta, timezone
from time import perf_counter
from zoneinfo import ZoneInfo

from bomboni.core.models import DailyMenu, Restaurant, RestaurantDetails
from bomboni.core.protocols import RestaurantDataSource

MAX_MENU_SEARCH_RESULTS = 50


def _normalize(value: str) -> str:
    decomposed = unicodedata.normalize("NFKD", value.casefold())
    return "".join(char for char in decomposed if not unicodedata.combining(char)).strip()


def _normalize_city(value: str) -> str:
    normalized = _normalize(value)
    return {"liubliana": "ljubljana"}.get(normalized, normalized)


class RestaurantService:
    """Shared application logic for MCP now and future API adapters."""

    def __init__(
        self,
        source: RestaurantDataSource,
        *,
        directory_ttl: timedelta = timedelta(minutes=10),
        details_ttl: timedelta = timedelta(minutes=15),
        menu_ttl: timedelta = timedelta(minutes=5),
        menu_workers: int = 8,
    ) -> None:
        self._source = source
        self._directory_ttl = directory_ttl
        self._details_ttl = details_ttl
        self._menu_ttl = menu_ttl
        self._menu_workers = menu_workers
        self._lock = threading.RLock()
        self._restaurants: list[Restaurant] | None = None
        self._directory_expires_at = datetime.min.replace(tzinfo=timezone.utc)
        self._details: dict[int, tuple[datetime, RestaurantDetails]] = {}
        self._menus: dict[tuple[int, date], tuple[datetime, DailyMenu]] = {}

    @staticmethod
    def today() -> date:
        return datetime.now(ZoneInfo("Europe/Ljubljana")).date()

    def list_restaurants(self) -> list[Restaurant]:
        now = datetime.now(ZoneInfo("UTC"))
        with self._lock:
            if self._restaurants is not None and now < self._directory_expires_at:
                return list(self._restaurants)
        restaurants = self._source.fetch_restaurants()
        with self._lock:
            self._restaurants = restaurants
            self._directory_expires_at = now + self._directory_ttl
        return list(restaurants)

    def search_restaurants(
        self,
        *,
        city: str | None = None,
        name: str | None = None,
        tags: tuple[str, ...] = (),
        limit: int = 50,
    ) -> list[Restaurant]:
        city_query = _normalize_city(city) if city else None
        name_query = _normalize(name) if name else None
        tag_queries = {_normalize(tag) for tag in tags}
        found: list[Restaurant] = []
        for restaurant in self.list_restaurants():
            if city_query and city_query not in _normalize_city(restaurant.city):
                continue
            if name_query and name_query not in _normalize(restaurant.name):
                continue
            if tag_queries and not tag_queries.issubset({_normalize(t) for t in restaurant.tags}):
                continue
            found.append(restaurant)
            if len(found) >= max(1, limit):
                break
        return found

    def get_restaurant(self, restaurant_id: int) -> RestaurantDetails:
        now = datetime.now(ZoneInfo("UTC"))
        with self._lock:
            cached = self._details.get(restaurant_id)
            if cached and now < cached[0]:
                return cached[1]
        details = self._source.fetch_restaurant_details(restaurant_id)
        with self._lock:
            self._details[restaurant_id] = (now + self._details_ttl, details)
        return details

    def get_menu(self, restaurant_id: int, menu_date: date | None = None) -> DailyMenu:
        requested_date = menu_date or self.today()
        key = (restaurant_id, requested_date)
        now = datetime.now(ZoneInfo("UTC"))
        with self._lock:
            cached = self._menus.get(key)
            if cached and now < cached[0]:
                return cached[1]
        # Ensure a source adapter can map the stable restaurant ID to its display name.
        self.list_restaurants()
        menu = self._source.fetch_menu(restaurant_id, requested_date)
        with self._lock:
            self._menus[key] = (now + self._menu_ttl, menu)
        return menu

    def search_menu_items(
        self,
        *,
        city: str,
        menu_date: date | None = None,
        query: str | None = None,
        category: str | None = None,
        limit: int = 30,
    ) -> dict[str, object]:
        """Search a city's menus for dish text or a site category (e.g. Meat).

        This is the one-call path for city-wide menu questions. Do not first list
        restaurants or fetch menus one by one. `limit` caps returned dish records,
        not the number of menus scanned; keep it at the default or at most 50.
        """
        requested_date = menu_date or self.today()
        search_started = perf_counter()
        restaurants = self.search_restaurants(city=city, limit=10_000)
        normalized_query = _normalize(query) if query else None
        normalized_category = _normalize(category) if category else None
        matches: list[dict[str, object]] = []
        errors: list[dict[str, object]] = []

        def fetch_one(restaurant: Restaurant) -> tuple[Restaurant, DailyMenu | Exception]:
            try:
                return restaurant, self.get_menu(restaurant.id, requested_date)
            except Exception as exc:  # Keep one failed source page from losing the rest of the city results.
                return restaurant, exc

        with ThreadPoolExecutor(max_workers=self._menu_workers) as pool:
            futures = [pool.submit(fetch_one, restaurant) for restaurant in restaurants]
            for future in as_completed(futures):
                restaurant, result = future.result()
                if isinstance(result, Exception):
                    errors.append({"restaurant_id": restaurant.id, "error": str(result)})
                    continue
                for dish in result.dishes:
                    has_query = normalized_query is None or normalized_query in _normalize(dish.name)
                    has_category = normalized_category is None or normalized_category in {
                        _normalize(value) for value in dish.categories
                    }
                    if has_query and has_category:
                        matches.append(
                            {
                                "restaurant": restaurant.to_dict(),
                                "menu_date": result.date,
                                "dish": dish.to_dict(),
                                "source_url": result.source_url,
                            }
                        )
        matches.sort(key=lambda item: (  # stable, predictable output for the model
            _normalize(str(item["restaurant"]["name"])),
            _normalize(str(item["dish"]["name"])),
        ))
        result_limit = min(MAX_MENU_SEARCH_RESULTS, max(1, limit))
        visible_matches = matches[:result_limit]
        return {
            "city": city,
            "menu_date": requested_date.isoformat(),
            "elapsed_ms": round((perf_counter() - search_started) * 1000),
            "restaurants_scanned": len(restaurants),
            "restaurants_with_errors": len(errors),
            "errors": errors[:20],
            "match_count": len(matches),
            "results_returned": len(visible_matches),
            "results_truncated": len(matches) > len(visible_matches),
            "results": visible_matches,
            "note": "Dish names are preserved in the source language. Categories reflect the site's menu labels.",
        }

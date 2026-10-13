from __future__ import annotations

import http.cookiejar
from datetime import date, datetime, timezone
from urllib.parse import urljoin

import httpx

from bomboni.core.models import DailyMenu, Restaurant, RestaurantDetails
from bomboni.data_sources.studentska_prehrana.parser import (
    BASE_URL,
    parse_menu_fragment,
    parse_restaurant_details,
    parse_restaurant_index,
)


class _StatelessCookieJar(http.cookiejar.CookieJar):
    """Ignores incoming Set-Cookie headers so ASP.NET session state does not pin menus across calls."""

    def set_cookie(self, cookie: http.cookiejar.Cookie) -> None:
        pass


class StudentskaPrehranaSource:
    """Read-only HTTP adapter for the public studentska-prehrana.si pages."""

    def __init__(self, *, timeout: float = 20.0, client: httpx.Client | None = None) -> None:
        self._client = client or httpx.Client(
            timeout=timeout,
            cookies=_StatelessCookieJar(),
            headers={
                "User-Agent": "bomboni/0.1 (+public directory reader)",
                "Accept-Language": "en,sl;q=0.8",
            },
            follow_redirects=True,
        )
        self._restaurant_names: dict[int, str] = {}

    def close(self) -> None:
        self._client.close()

    @staticmethod
    def _retrieved_at() -> str:
        return datetime.now(timezone.utc).isoformat(timespec="seconds")

    def _get(self, path: str) -> str:
        response = self._client.get(urljoin(BASE_URL, path))
        response.raise_for_status()
        return response.text

    def fetch_restaurants(self) -> list[Restaurant]:
        restaurants = parse_restaurant_index(self._get("/en/restaurant"))
        self._restaurant_names.update({restaurant.id: restaurant.name for restaurant in restaurants})
        return restaurants

    def fetch_restaurant_details(self, restaurant_id: int) -> RestaurantDetails:
        html = self._get(f"/en/restaurant/Details/{restaurant_id}")
        details = parse_restaurant_details(html, restaurant_id, self._retrieved_at())
        self._restaurant_names[restaurant_id] = details.restaurant.name
        return details

    def set_restaurant_name(self, restaurant_id: int, name: str) -> None:
        if name:
            self._restaurant_names[restaurant_id] = name

    def fetch_menu(self, restaurant_id: int, menu_date: date, restaurant_name: str | None = None) -> DailyMenu:
        # The menu endpoint is directly queryable once the directory has supplied
        # the name, avoiding one detail-page request per restaurant during city scans.
        name = restaurant_name or self._restaurant_names.get(restaurant_id)
        if name:
            self._restaurant_names[restaurant_id] = name
        else:
            self.fetch_restaurant_details(restaurant_id)
            name = self._restaurant_names.get(restaurant_id, str(restaurant_id))
        response = self._client.post(
            urljoin(BASE_URL, "/en/restaurant/MenuForDate"),
            data={"restaurantId": restaurant_id, "date": menu_date.strftime("%m/%d/%Y")},
            headers={
                "Referer": f"{BASE_URL}/en/restaurant/Details/{restaurant_id}",
                "X-Requested-With": "XMLHttpRequest",
            },
        )
        response.raise_for_status()
        return parse_menu_fragment(
            response.text,
            restaurant_id=restaurant_id,
            restaurant_name=name,
            menu_date=menu_date,
            retrieved_at=self._retrieved_at(),
        )

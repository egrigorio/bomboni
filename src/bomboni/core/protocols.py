from __future__ import annotations

from datetime import date
from typing import Protocol

from bomboni.core.models import DailyMenu, Restaurant, RestaurantDetails


class RestaurantDataSource(Protocol):
    """Transport-independent interface for a restaurant data provider."""

    def fetch_restaurants(self) -> list[Restaurant]: ...

    def fetch_restaurant_details(self, restaurant_id: int) -> RestaurantDetails: ...

    def fetch_menu(self, restaurant_id: int, menu_date: date, restaurant_name: str | None = None) -> DailyMenu: ...

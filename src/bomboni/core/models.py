from __future__ import annotations

import unicodedata
from dataclasses import asdict, dataclass
from typing import Any


def _normalize(value: str) -> str:
    decomposed = unicodedata.normalize("NFKD", value.casefold())
    return "".join(char for char in decomposed if not unicodedata.combining(char)).strip()


@dataclass(frozen=True, slots=True)
class Restaurant:
    id: int
    name: str
    city: str
    address: str
    detail_path: str
    meal_price_eur: float | None
    additional_fee_eur: float | None
    tags: tuple[str, ...]
    source_url: str
    latitude: float | None = None
    longitude: float | None = None

    def to_dict(self) -> dict[str, Any]:
        result = asdict(self)
        result["tags"] = list(self.tags)
        return result


@dataclass(frozen=True, slots=True)
class RestaurantDetails:
    restaurant: Restaurant
    phone: str | None
    opening_hours: dict[str, str]
    menu_dates: tuple[str, ...]
    retrieved_at: str

    def to_dict(self) -> dict[str, Any]:
        result = asdict(self)
        result["restaurant"] = self.restaurant.to_dict()
        result["menu_dates"] = list(self.menu_dates)
        return result


@dataclass(frozen=True, slots=True)
class Dish:
    name: str
    number: int | None
    categories: tuple[str, ...]
    sides: tuple[str, ...]
    normalized_categories: tuple[str, ...] = ()

    def __post_init__(self) -> None:
        if not self.normalized_categories and self.categories:
            object.__setattr__(
                self,
                "normalized_categories",
                tuple(_normalize(category) for category in self.categories),
            )

    def to_dict(self) -> dict[str, Any]:
        result = asdict(self)
        result["categories"] = list(self.categories)
        result["sides"] = list(self.sides)
        result["normalized_categories"] = list(self.normalized_categories)
        return result


@dataclass(frozen=True, slots=True)
class DailyMenu:
    restaurant_id: int
    restaurant_name: str
    date: str
    dishes: tuple[Dish, ...]
    source_url: str
    retrieved_at: str

    def to_dict(self) -> dict[str, Any]:
        result = asdict(self)
        result["dishes"] = [dish.to_dict() for dish in self.dishes]
        return result

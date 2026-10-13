from datetime import date

from bomboni.core.models import DailyMenu, Dish, Restaurant, RestaurantDetails
from bomboni.core.service import RestaurantService


class FakeSource:
    def __init__(self) -> None:
        self.restaurants = [
            Restaurant(1, "Abi Falafel", "Ljubljana", "Trubarjeva 40", "/en/restaurant/Details/1", 9.0, 3.81, ("Meatless",), "https://example.test/1"),
            Restaurant(2, "Veggie", "Ljubljana", "Other 1", "/en/restaurant/Details/2", 8.0, 2.0, ("Meatless",), "https://example.test/2"),
            Restaurant(3, "Koper Grill", "Koper", "Coast 1", "/en/restaurant/Details/3", 9.0, 3.0, (), "https://example.test/3"),
        ]

    def fetch_restaurants(self):
        return self.restaurants

    def fetch_restaurant_details(self, restaurant_id: int):
        restaurant = next(item for item in self.restaurants if item.id == restaurant_id)
        return RestaurantDetails(restaurant, None, {}, (), "2026-10-12T12:00:00+00:00")

    def fetch_menu(self, restaurant_id: int, menu_date: date):
        restaurant = next(item for item in self.restaurants if item.id == restaurant_id)
        dishes = (Dish("Šiš kebab", 1, ("Meat",), ()),) if restaurant_id == 1 else (Dish("Falafel", 1, ("Meatless",), ()),)
        return DailyMenu(restaurant_id, restaurant.name, menu_date.isoformat(), dishes, restaurant.source_url, "2026-10-12T12:00:00+00:00")


def test_search_restaurants_matches_city_without_case_or_accent_sensitivity() -> None:
    service = RestaurantService(FakeSource())
    [restaurant] = service.search_restaurants(city="Liubliana", name="ABI", limit=1)
    assert restaurant.id == 1


def test_search_menu_items_scans_city_and_matches_dish_category() -> None:
    service = RestaurantService(FakeSource(), menu_workers=2)
    result = service.search_menu_items(city="Ljubljana", menu_date=date(2026, 10, 12), category="meat")
    assert result["restaurants_scanned"] == 2
    assert result["match_count"] == 1
    assert result["results"][0]["restaurant"]["id"] == 1
    assert result["results"][0]["dish"]["categories"] == ["Meat"]


def test_draw_recommendation_restaurant_mode_filters_by_price_and_city() -> None:
    service = RestaurantService(FakeSource())
    draw = service.draw_recommendation(mode="restaurant", city="Ljubljana", max_price_eur=2.5)
    assert draw["mode"] == "restaurant"
    assert draw["result"] is not None
    assert draw["result"]["restaurant"]["id"] == 2
    assert draw["result"]["restaurant"]["additional_fee_eur"] <= 2.5


def test_draw_recommendation_dish_mode_matches_category() -> None:
    service = RestaurantService(FakeSource())
    draw = service.draw_recommendation(mode="dish", city="Ljubljana", category="Meat")
    assert draw["mode"] == "dish"
    assert draw["result"] is not None
    assert draw["result"]["dish"]["categories"] == ["Meat"]
    assert draw["result"]["restaurant"]["id"] == 1


def test_draw_recommendation_validates_inputs() -> None:
    service = RestaurantService(FakeSource())
    try:
        service.draw_recommendation(mode="invalid")
        assert False, "Should have raised ValueError"
    except ValueError as exc:
        assert "mode must be 'restaurant' or 'dish'" in str(exc)

    try:
        service.draw_recommendation(mode="restaurant", max_price_eur=-1.0)
        assert False, "Should have raised ValueError"
    except ValueError as exc:
        assert "max_price_eur must be zero or greater" in str(exc)


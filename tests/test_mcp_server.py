from datetime import date
from unittest.mock import MagicMock, patch

import pytest

pytest.importorskip("mcp")

from mcp.server.mcpserver.exceptions import UnexpectedToolError

from bomboni.adapters.mcp.server import _parse_date, create_server
from bomboni.core.models import DailyMenu, Dish, Restaurant, RestaurantDetails
from bomboni.core.service import RestaurantService


def test_parse_date_valid_iso_format() -> None:
    result = _parse_date("2026-10-12")
    assert result == date(2026, 10, 12)


@pytest.mark.parametrize("value", [None, ""])
def test_parse_date_none_or_empty_returns_today(value: str | None) -> None:
    result = _parse_date(value)
    assert result == RestaurantService.today()


@pytest.mark.parametrize(
    "invalid_value",
    [
        "invalid-date",
        "2026/10/12",
        "12-10-2026",
        "2026-13-01",
        "2026-02-30",
        "abc",
    ],
)
def test_parse_date_invalid_format_raises_value_error(invalid_value: str) -> None:
    with pytest.raises(ValueError, match="menu_date must use YYYY-MM-DD format"):
        _parse_date(invalid_value)


@pytest.mark.anyio
async def test_create_server_tool_registration() -> None:
    with (
        patch("bomboni.adapters.mcp.server.StudentskaPrehranaSource"),
        patch("bomboni.adapters.mcp.server.RestaurantService"),
    ):
        server = create_server()
        assert server.name == "bomboni"
        tools = await server.list_tools()
        tool_names = [t.name for t in tools]
        assert "search_restaurants" in tool_names
        assert "get_restaurant" in tool_names
        assert "get_restaurant_menu" in tool_names
        assert "search_menu_items" in tool_names


@pytest.mark.anyio
async def test_mcp_tool_search_restaurants() -> None:
    sample_restaurant = Restaurant(
        id=123,
        name="Test Resto",
        city="Ljubljana",
        address="Test Address 1",
        detail_path="/en/restaurant/details/123",
        meal_price_eur=4.5,
        additional_fee_eur=0.0,
        tags=("student",),
        source_url="https://www.studentska-prehrana.si/en/restaurant/details/123",
    )
    with (
        patch("bomboni.adapters.mcp.server.StudentskaPrehranaSource"),
        patch("bomboni.adapters.mcp.server.RestaurantService") as mock_service_cls,
    ):
        mock_service = MagicMock()
        mock_service_cls.return_value = mock_service
        mock_service.search_restaurants.return_value = [sample_restaurant]

        server = create_server()
        result = await server.call_tool(
            "search_restaurants",
            {"city": "Ljubljana", "tags": ["student"], "limit": 10},
        )

        mock_service.search_restaurants.assert_called_once_with(
            city="Ljubljana",
            name=None,
            tags=("student",),
            limit=10,
        )
        assert not result.is_error
        assert result.structured_content["count"] == 1
        assert result.structured_content["results"][0]["id"] == 123


@pytest.mark.anyio
async def test_mcp_tool_get_restaurant() -> None:
    sample_restaurant = Restaurant(
        id=123,
        name="Test Resto",
        city="Ljubljana",
        address="Test Address 1",
        detail_path="/en/restaurant/details/123",
        meal_price_eur=4.5,
        additional_fee_eur=0.0,
        tags=("student",),
        source_url="https://www.studentska-prehrana.si/en/restaurant/details/123",
    )
    sample_details = RestaurantDetails(
        restaurant=sample_restaurant,
        phone="123456",
        opening_hours={"MON": "08:00 - 16:00"},
        menu_dates=["2026-03-30"],
        retrieved_at="2026-03-30T10:00:00Z",
    )
    with (
        patch("bomboni.adapters.mcp.server.StudentskaPrehranaSource"),
        patch("bomboni.adapters.mcp.server.RestaurantService") as mock_service_cls,
    ):
        mock_service = MagicMock()
        mock_service_cls.return_value = mock_service
        mock_service.get_restaurant.return_value = sample_details

        server = create_server()
        result = await server.call_tool("get_restaurant", {"restaurant_id": 123})

        mock_service.get_restaurant.assert_called_once_with(123)
        assert not result.is_error
        assert result.structured_content["restaurant"]["id"] == 123
        assert result.structured_content["phone"] == "123456"


@pytest.mark.anyio
async def test_mcp_tool_get_restaurant_menu() -> None:
    sample_menu = DailyMenu(
        restaurant_id=123,
        restaurant_name="Test Resto",
        date="2026-03-30",
        dishes=(Dish(name="Pizza", number=1, categories=("Fast Food",), sides=()),),
        source_url="https://www.studentska-prehrana.si/en/restaurant/details/123",
        retrieved_at="2026-03-30T10:00:00Z",
    )
    with (
        patch("bomboni.adapters.mcp.server.StudentskaPrehranaSource"),
        patch("bomboni.adapters.mcp.server.RestaurantService") as mock_service_cls,
    ):
        mock_service = MagicMock()
        mock_service_cls.return_value = mock_service
        mock_service.get_menu.return_value = sample_menu

        server = create_server()
        result = await server.call_tool(
            "get_restaurant_menu",
            {"restaurant_id": 123, "menu_date": "2026-03-30"},
        )

        mock_service.get_menu.assert_called_once_with(123, date(2026, 3, 30))
        assert not result.is_error
        assert result.structured_content["restaurant_id"] == 123
        assert result.structured_content["dishes"][0]["name"] == "Pizza"


@pytest.mark.anyio
async def test_mcp_tool_search_menu_items() -> None:
    mock_search_result = {
        "city": "Ljubljana",
        "date": "2026-03-30",
        "query": "pizza",
        "category": None,
        "results": [],
    }
    with (
        patch("bomboni.adapters.mcp.server.StudentskaPrehranaSource"),
        patch("bomboni.adapters.mcp.server.RestaurantService") as mock_service_cls,
    ):
        mock_service = MagicMock()
        mock_service_cls.return_value = mock_service
        mock_service.search_menu_items.return_value = mock_search_result

        server = create_server()
        result = await server.call_tool(
            "search_menu_items",
            {"city": "Ljubljana", "query": "pizza", "menu_date": "2026-03-30"},
        )

        mock_service.search_menu_items.assert_called_once_with(
            city="Ljubljana",
            menu_date=date(2026, 3, 30),
            query="pizza",
            category=None,
            limit=30,
        )
        assert not result.is_error
        assert result.structured_content["city"] == "Ljubljana"


@pytest.mark.anyio
async def test_mcp_tool_search_menu_items_no_query_or_category_raises() -> None:
    with (
        patch("bomboni.adapters.mcp.server.StudentskaPrehranaSource"),
        patch("bomboni.adapters.mcp.server.RestaurantService"),
    ):
        server = create_server()
        with pytest.raises((UnexpectedToolError, ValueError)) as exc_info:
            await server.call_tool("search_menu_items", {"city": "Ljubljana"})

        cause = getattr(exc_info.value, "__cause__", exc_info.value)
        assert "Provide a dish query, a category, or both." in str(cause)

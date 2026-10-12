from __future__ import annotations

from datetime import date

from mcp.server import MCPServer

from bomboni.core.service import RestaurantService
from bomboni.data_sources.studentska_prehrana.client import StudentskaPrehranaSource


def _parse_date(value: str | None) -> date:
    if value:
        try:
            return date.fromisoformat(value)
        except ValueError as exc:
            raise ValueError("menu_date must use YYYY-MM-DD format") from exc
    return RestaurantService.today()


def create_server() -> MCPServer:
    source = StudentskaPrehranaSource()
    service = RestaurantService(source)
    server = MCPServer("bomboni")

    @server.tool()
    def search_restaurants(
        city: str | None = None,
        name: str | None = None,
        tags: list[str] | None = None,
        limit: int = 50,
    ) -> dict[str, object]:
        """Search the student meal restaurant directory by city, name, or venue tags."""
        restaurants = service.search_restaurants(
            city=city,
            name=name,
            tags=tuple(tags or ()),
            limit=limit,
        )
        return {
            "count": len(restaurants),
            "results": [restaurant.to_dict() for restaurant in restaurants],
            "source_url": "https://www.studentska-prehrana.si/en/restaurant",
        }

    @server.tool()
    def get_restaurant(restaurant_id: int) -> dict[str, object]:
        """Get a restaurant's address, prices, phone, opening hours, and available menu dates by site ID."""
        return service.get_restaurant(restaurant_id).to_dict()

    @server.tool()
    def get_restaurant_menu(
        restaurant_id: int,
        menu_date: str | None = None,
    ) -> dict[str, object]:
        """Get one restaurant's dishes for a date (YYYY-MM-DD); defaults to today's date in Slovenia."""
        return service.get_menu(restaurant_id, _parse_date(menu_date)).to_dict()

    @server.tool()
    def search_menu_items(
        city: str,
        menu_date: str | None = None,
        query: str | None = None,
        category: str | None = None,
        limit: int = 30,
    ) -> dict[str, object]:
        """Search a city's menus by dish name or menu category such as Meat, Fish, or Meatless.

        For questions like "where can I eat meat in Ljubljana?", call this tool
        once with city="Ljubljana", category="Meat". For sushi, use
        city="Ljubljana", query="sushi". Do not list restaurants first, fetch
        menus individually, run shell scripts, or search the web for menu data.
        Report only what this site's current menus support; if there are no
        matches, say so. Leave limit at 30 (maximum 50): it caps returned dishes,
        not menus scanned. The result includes elapsed_ms for lookup time.
        """
        if not query and not category:
            raise ValueError("Provide a dish query, a category, or both.")
        return service.search_menu_items(
            city=city,
            menu_date=_parse_date(menu_date),
            query=query,
            category=category,
            limit=limit,
        )

    return server


def main() -> None:
    create_server().run()


if __name__ == "__main__":
    main()

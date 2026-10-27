from __future__ import annotations

import re
from datetime import date, datetime

from bs4 import BeautifulSoup, Tag

from bomboni.core.models import DailyMenu, Dish, Restaurant, RestaurantDetails

BASE_URL = "https://www.studentska-prehrana.si"
DETAIL_PATH_RE = re.compile(r"/restaurant/Details/(\d+)")
MENU_DATE_RE = re.compile(r"GetMenuForDate\(\s*\d+\s*,\s*'([^']+)'\s*,")
DISH_NAME_RE = re.compile(r"^\s*(\d+)\s+(.+?)\s*$", re.DOTALL)
ALLERGEN_RE = re.compile(r"\((?:alergeni|allergens)\s*:\s*([^()]+)\)", re.IGNORECASE)
INGREDIENT_RE = re.compile(r"\((?:sestavine|ingredients)\s*:\s*([^()]+)\)", re.IGNORECASE)


def _composition(name: str, sides: tuple[str, ...], categories: tuple[str, ...]) -> dict:
    """Extract declared lists only; never derive a recipe from a dish name.

    Some pizza providers publish a comma-separated composition after a dash.
    Unmarked prose and ordinary meal combinations remain untouched in the name.
    Empty lists mean unknown, never allergen-free or a complete ingredient list.
    """
    allergens = []
    for text in (name, *sides):
        for match in ALLERGEN_RE.finditer(text):
            allergens.extend(part.strip() for part in match[1].split(",") if part.strip())
    declarations = [match[1] for match in INGREDIENT_RE.finditer(name)]
    if not declarations and "Pizza" in categories:
        # Require an actual list, not just a hyphenated dish name.
        match = re.search(r"\s*[-–—]\s*([^()]+)$", name)
        if match and "," in match[1] and not re.search(r"alergeni|allergens", match[1], re.I):
            declarations = [match[1]]
    ingredients = tuple(dict.fromkeys(
        part.strip() for declaration in declarations for part in declaration.split(",") if part.strip()
    ))
    return {
        "ingredients": ingredients,
        "allergens": tuple(dict.fromkeys(allergens)),
        "composition_source_text": " · ".join((name, *sides)) if ingredients or allergens else None,
    }


def _text(node: Tag | None) -> str:
    return node.get_text(" ", strip=True) if node else ""


def _price(raw: str | None) -> float | None:
    if not raw:
        return None
    match = re.search(r"\d+(?:[.,]\d+)?", raw.replace("\xa0", " "))
    return float(match.group().replace(",", ".")) if match else None


def _coordinate(raw: str | None) -> float | None:
    if not raw:
        return None
    try:
        value = float(raw)
    except ValueError:
        return None
    return value if -180 <= value <= 180 else None


def _restaurant_from_row(row: Tag) -> Restaurant | None:
    try:
        restaurant_id = int(row.get("data-posid", ""))
    except ValueError:
        link = row.select_one('a[href*="/restaurant/Details/"]')
        match = DETAIL_PATH_RE.search(link.get("href", "")) if link else None
        if not match:
            return None
        restaurant_id = int(match.group(1))

    link = row.select_one('a[href*="/restaurant/Details/"]')
    if not link:
        return None
    name = _text(link)
    detail_path = link.get("href") or f"/en/restaurant/Details/{restaurant_id}"
    city = (row.get("data-city") or "").strip().title()
    address_node = row.select_one(".shadow-wrapper small i")
    address = _text(address_node) or str(row.get("data-naslov", "")).strip()
    tags = tuple(dict.fromkeys(
        img.get("title", "").strip()
        for img in row.select("img[title]")
        if img.get("title", "").strip()
    ))
    return Restaurant(
        id=restaurant_id,
        name=name,
        city=city,
        address=address,
        detail_path=detail_path,
        meal_price_eur=_price(row.get("data-cena")),
        additional_fee_eur=_price(row.get("data-doplacilo")),
        tags=tags,
        source_url=f"{BASE_URL}{detail_path}",
        latitude=_coordinate(row.get("data-lat")),
        longitude=_coordinate(row.get("data-lon")),
    )


def parse_restaurant_index(html: str) -> list[Restaurant]:
    soup = BeautifulSoup(html, "html.parser")
    rows = soup.select("#restaurant-list .restaurant-row")
    restaurants = [restaurant for row in rows if (restaurant := _restaurant_from_row(row))]
    if not rows:
        raise ValueError("Restaurant list markup was not found (#restaurant-list .restaurant-row).")
    return restaurants


def _available_menu_dates(soup: BeautifulSoup) -> tuple[date, ...]:
    dates: list[date] = []
    for button in soup.select('#menu [id="btnDate"]'):
        callback = button.get("onclick", "")
        match = MENU_DATE_RE.search(callback)
        if not match:
            continue
        try:
            dates.append(datetime.strptime(match.group(1), "%m/%d/%Y").date())
        except ValueError:
            continue
    return tuple(dates)


def _parse_dishes(html: str) -> tuple[Dish, ...]:
    soup = BeautifulSoup(html, "html.parser")
    dishes: list[Dish] = []
    cards = soup.select("#menu-list .shadow-wrapper") or soup.select(".shadow-wrapper")
    for card in cards:
        heading = card.select_one("h5 strong")
        if not heading:
            continue
        raw_name = _text(heading)
        match = DISH_NAME_RE.match(raw_name)
        number, name = (int(match.group(1)), match.group(2).strip()) if match else (None, raw_name)
        categories = tuple(dict.fromkeys(
            img.get("title", "").strip()
            for img in card.select("img[title]")
            if img.get("title", "").strip()
        ))
        sides = tuple(
            value for li in card.select("ul li")
            if (value := _text(li))
        )
        dishes.append(Dish(name=name, number=number, categories=categories, sides=sides,
                           **_composition(name, sides, categories)))
    return tuple(dishes)


def parse_restaurant_details(html: str, restaurant_id: int, retrieved_at: str) -> RestaurantDetails:
    soup = BeautifulSoup(html, "html.parser")
    heading = soup.select_one("h3")
    name = _text(heading)
    if not name:
        raise ValueError(f"Restaurant detail heading not found for ID {restaurant_id}.")
    path = f"/en/restaurant/Details/{restaurant_id}"
    address_and_phone = _text(soup.select_one(".tab-pane.active .row small"))
    if not address_and_phone:
        # The detail page's location header is outside the menu and information tabs.
        for node in soup.select("h3, h2"):
            if _text(node).casefold() == name.casefold():
                next_text = _text(node.parent)
                if next_text:
                    address_and_phone = next_text
                    break
    phone_match = re.search(r"\(([^()]+)\)", address_and_phone)
    phone = phone_match.group(1).strip() if phone_match else None

    # Address and site IDs are also present as data attributes on the page's inline map.
    address = ""
    for script in soup.find_all("script"):
        script_text = script.string or script.get_text()
        match = re.search(r'codeAddress\("([^"]+)"\)', script_text)
        if match:
            address = match.group(1)
            break
    if not address:
        address = address_and_phone.split("(", 1)[0].strip()

    detail_link = soup.select_one('a[href*="/restaurant/Details/"]')
    if detail_link and DETAIL_PATH_RE.search(detail_link.get("href", "")):
        path = detail_link.get("href", path)
    fee = None
    meal_price = None
    opening_hours: dict[str, str] = {}
    for box in soup.select("#information .tag-box"):
        title = _text(box.select_one(".headline h2"))
        if title.casefold() == "pricing":
            labels = box.select(".col-md-3 p")
            values = box.select(".col-md-9 p")
            for label, value in zip(labels, values):
                if "additional fee" in _text(label).casefold():
                    fee = _price(_text(value))
                elif "meal price" in _text(label).casefold():
                    meal_price = _price(_text(value))
        if "openning time" in title.casefold() or "opening time" in title.casefold():
            labels = box.select(".col-md-3 p")
            values = box.select(".col-md-9 p")
            opening_hours = {_text(label).rstrip(" :"): _text(value) for label, value in zip(labels, values)}

    city = ""
    address_match = re.search(r",\s*\d{4}\s+(.+)$", address)
    if address_match:
        city = address_match.group(1).strip()
    restaurant = Restaurant(
        id=restaurant_id,
        name=name,
        city=city,
        address=address,
        detail_path=path,
        meal_price_eur=meal_price,
        additional_fee_eur=fee,
        tags=(),
        source_url=f"{BASE_URL}{path}",
    )
    return RestaurantDetails(
        restaurant=restaurant,
        phone=phone,
        opening_hours=opening_hours,
        menu_dates=tuple(value.isoformat() for value in _available_menu_dates(soup)),
        retrieved_at=retrieved_at,
    )


def parse_menu_fragment(
    html: str,
    *,
    restaurant_id: int,
    restaurant_name: str,
    menu_date: date,
    retrieved_at: str,
) -> DailyMenu:
    return DailyMenu(
        restaurant_id=restaurant_id,
        restaurant_name=restaurant_name,
        date=menu_date.isoformat(),
        dishes=_parse_dishes(html),
        source_url=f"{BASE_URL}/en/restaurant/Details/{restaurant_id}",
        retrieved_at=retrieved_at,
    )

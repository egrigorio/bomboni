from datetime import date

import pytest

from bomboni.data_sources.studentska_prehrana.parser import (
    _coordinate,
    _price,
    parse_menu_fragment,
    parse_restaurant_index,
)


def test_coordinate_parsing() -> None:
    assert _coordinate(None) is None
    assert _coordinate("") is None
    assert _coordinate("   ") is None
    assert _coordinate("invalid_float") is None
    assert _coordinate("14.5123") == 14.5123
    assert _coordinate("-46.123") == -46.123
    assert _coordinate("-180") == -180.0
    assert _coordinate("180") == 180.0
    assert _coordinate("-180.1") is None
    assert _coordinate("180.1") is None


def test_price_parsing() -> None:
    assert _price(None) is None
    assert _price("") is None
    assert _price("   ") is None
    assert _price("no digits here") is None
    assert _price("9.00") == 9.00
    assert _price("3,81") == 3.81
    assert _price("3,81 €") == 3.81
    assert _price("12\xa0€") == 12.0
    assert _price("3,81\xa0€") == 3.81
    assert _price("10") == 10.0
    assert _price("Cena: 4,50 €") == 4.5


def test_parse_restaurant_index_uses_stable_id_and_separate_venue_tags() -> None:
    html = '''
    <div id="restaurant-list">
      <div class="row restaurant-row" data-posid="1478" data-city="LJUBLJANA"
           data-naslov="Trubarjeva cesta 40" data-cena="9.00" data-doplacilo="3.81">
        <div class="shadow-wrapper">
          <h2><a href="/en/restaurant/Details/1478">ABI FALAFEL</a></h2>
          <small><i>Trubarjeva cesta 40, 1000 Ljubljana</i></small>
          <img title="Meatless" alt="Meatless">
          <img title="Opened at weekends" alt="Opened at weekends">
        </div>
      </div>
    </div>
    '''
    [restaurant] = parse_restaurant_index(html)
    assert restaurant.id == 1478
    assert restaurant.name == "ABI FALAFEL"
    assert restaurant.city == "Ljubljana"
    assert restaurant.meal_price_eur == 9.0
    assert restaurant.additional_fee_eur == 3.81
    assert restaurant.tags == ("Meatless", "Opened at weekends")
    assert restaurant.source_url.endswith("/en/restaurant/Details/1478")


def test_parse_restaurant_index_raises_value_error_when_no_rows() -> None:
    html = '<div id="restaurant-list"><p>No restaurants found</p></div>'
    with pytest.raises(ValueError, match="Restaurant list markup was not found"):
        parse_restaurant_index(html)


def test_parse_menu_fragment_reads_dish_category_from_title() -> None:
    html = '''
    <div class="shadow-wrapper">
      <div class="col-md-8">
        <h5><strong>17 &nbsp; GOVEJI IN JAGNJEČJI ŠIŠKEBAB, PRILOGA</strong></h5>
        <ul><li></li><li>mešana</li><li>jabolko</li></ul>
      </div>
      <div><img alt="Pizza" title="Meat"></div>
    </div>
    '''
    menu = parse_menu_fragment(
        html,
        restaurant_id=1478,
        restaurant_name="ABI FALAFEL",
        menu_date=date(2026, 10, 12),
        retrieved_at="2026-10-12T12:00:00+00:00",
    )
    [dish] = menu.dishes
    assert menu.date == "2026-10-12"
    assert dish.number == 17
    assert dish.name == "GOVEJI IN JAGNJEČJI ŠIŠKEBAB, PRILOGA"
    assert dish.categories == ("Meat",)
    assert dish.sides == ("mešana", "jabolko")
    assert dish.ingredients == ()
    assert dish.allergens == ()
    assert dish.composition_source_text is None


@pytest.mark.parametrize(("name", "category", "ingredients", "allergens"), [
    ("TUNA - PELATI, SIR, TUNA, KORUZA", "Pizza", ("PELATI", "SIR", "TUNA", "KORUZA"), ()),
    ("4LETNI ČASI-PELATI, ŠUNKA, SIR", "Pizza", ("PELATI", "ŠUNKA", "SIR"), ()),
    ("JUHA (sestavine: krompir, čebula)", "Mixed", ("krompir", "čebula"), ()),
    ("CORDON BLUE (ALERGENI: GLUTEN, LAKTOZA, JAJCA), PRILOGA", "Meat", (), ("GLUTEN", "LAKTOZA", "JAJCA")),
    ("ZREZEK - KROMPIR, SOLATA", "Meat", (), ()),
    ("PIZZA S SIROM", "Pizza", (), ()),
    ("PIZZA - GLUTEN, SIR (ALERGENI: GLUTEN)", "Pizza", (), ("GLUTEN",)),
])
def test_declared_composition_preserves_original_without_guessing(name, category, ingredients, allergens):
    menu = parse_menu_fragment(
        f'<div class="shadow-wrapper"><h5><strong>1 {name}</strong></h5><img title="{category}"></div>',
        restaurant_id=1794, restaurant_name="Test", menu_date=date(2026, 10, 28), retrieved_at="now",
    )
    dish = menu.dishes[0]
    assert dish.name == name
    assert dish.ingredients == ingredients
    assert dish.allergens == allergens
    assert dish.to_dict()["ingredients"] == list(ingredients)
    assert dish.composition_source_text == (name if ingredients or allergens else None)


def test_side_allergens_are_declared_separately_from_ingredients():
    menu = parse_menu_fragment(
        '<div class="shadow-wrapper"><h5><strong>1 LAZANJA (ALERGENI: GLUTEN)</strong></h5>'
        '<ul><li>juha (alergeni: GLUTEN, ZELENA)</li><li>solata</li></ul></div>',
        restaurant_id=1090, restaurant_name="Test", menu_date=date(2026, 10, 28), retrieved_at="now",
    )
    dish = menu.dishes[0]
    assert dish.allergens == ("GLUTEN", "ZELENA")
    assert dish.ingredients == ()
    assert "juha (alergeni: GLUTEN, ZELENA)" in dish.composition_source_text
    assert len(dish.sides) == 2

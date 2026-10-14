from datetime import date

import pytest

from bomboni.data_sources.studentska_prehrana.parser import (
    _price,
    parse_menu_fragment,
    parse_restaurant_index,
)


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

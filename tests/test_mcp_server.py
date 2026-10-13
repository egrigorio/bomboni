from datetime import date

import pytest

from bomboni.adapters.mcp.server import _parse_date
from bomboni.core.service import RestaurantService


def test_parse_date_valid_iso_format() -> None:
    result = _parse_date("2026-10-12")
    assert result == date(2026, 10, 12)


def test_parse_date_none_returns_today() -> None:
    result = _parse_date(None)
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

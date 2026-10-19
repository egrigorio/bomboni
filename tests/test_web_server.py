import math
import pytest

from bomboni.adapters.web.server import _distance_km


def test_distance_km_same_point_returns_zero() -> None:
    # Distance between identical coordinates must be zero.
    lat, lon = 46.056944, 14.505833
    assert math.isclose(_distance_km(lat, lon, lat, lon), 0.0, abs_tol=1e-7)


def test_distance_km_known_cities() -> None:
    # Distance between Ljubljana and Maribor (~103.65 km).
    ljubljana_lat, ljubljana_lon = 46.056944, 14.505833
    maribor_lat, maribor_lon = 46.554722, 15.646667

    distance = _distance_km(ljubljana_lat, ljubljana_lon, maribor_lat, maribor_lon)
    assert pytest.approx(distance, abs=0.1) == 103.65


def test_distance_km_symmetry() -> None:
    # Distance A->B should equal distance B->A.
    lat1, lon1 = 46.056944, 14.505833
    lat2, lon2 = 45.548056, 13.730278  # Koper

    dist_a_b = _distance_km(lat1, lon1, lat2, lon2)
    dist_b_a = _distance_km(lat2, lon2, lat1, lon1)

    assert math.isclose(dist_a_b, dist_b_a, rel_tol=1e-9)


def test_distance_km_equator_and_meridian() -> None:
    # 1 degree latitude step along equator is ~111.19 km.
    dist_lat = _distance_km(0.0, 0.0, 1.0, 0.0)
    expected_1deg = (math.pi / 180.0) * 6371.0088
    assert pytest.approx(dist_lat, rel=1e-5) == expected_1deg

    # 1 degree longitude step along equator.
    dist_lon = _distance_km(0.0, -0.5, 0.0, 0.5)
    assert pytest.approx(dist_lon, rel=1e-5) == expected_1deg


class DummyService:
    def today(self):
        from datetime import date
        return date(2025, 1, 15)

    def search_restaurants(self, city=None, limit=10000):
        from bomboni.core.models import Restaurant
        return [
            Restaurant(
                id=1,
                name="Test Resto",
                address="Test St 1",
                city="Ljubljana",
                detail_path="/rest/1",
                meal_price_eur=4.5,
                additional_fee_eur=0.0,
                tags=("student",),
                source_url="https://example.com/1",
                latitude=46.05,
                longitude=14.50,
            )
        ]

    def get_restaurant(self, restaurant_id):
        from unittest.mock import MagicMock
        res = MagicMock()
        res.opening_hours = {"mon": "8-16"}
        res.retrieved_at = "2025-01-15T10:00:00Z"
        return res

    def get_menu(self, restaurant_id, menu_date, restaurant_name=None):
        from bomboni.core.models import DailyMenu
        return DailyMenu(
            restaurant_id=restaurant_id,
            restaurant_name=restaurant_name or "Test Resto",
            date=menu_date.isoformat(),
            dishes=(),
            source_url="https://example.com/menu",
            retrieved_at="2025-01-15T10:00:00Z",
        )

    def search_menu_items(self, city=None, query=None, category=None, limit=30):
        return [{"dish": "Pizza", "price": 5.0}]

    def draw_recommendation(self, mode="restaurant", city=None, category=None, max_price_eur=None):
        return {"mode": mode, "winner": "Test Resto"}


class DummyTranslator:
    pass


def _make_test_client(service=None, translator=None):
    from http.server import HTTPServer
    from urllib.request import urlopen, Request
    import threading
    from bomboni.adapters.web.server import make_handler

    svc = service or DummyService()
    trans = translator or DummyTranslator()
    handler_cls = make_handler(svc, trans)

    server = HTTPServer(("127.0.0.1", 0), handler_cls)
    port = server.server_address[1]
    thread = threading.Thread(target=server.serve_forever)
    thread.daemon = True
    thread.start()

    def request(path, method="GET", body=None, headers=None):
        url = f"http://127.0.0.1:{port}{path}"
        data = body.encode("utf-8") if isinstance(body, str) else body
        req = Request(url, data=data, method=method, headers=headers or {})
        try:
            with urlopen(req) as resp:
                import json
                raw = resp.read().decode("utf-8")
                try:
                    return resp.status, json.loads(raw)
                except Exception:
                    return resp.status, raw
        except Exception as exc:
            if hasattr(exc, "code") and hasattr(exc, "read"):
                import json
                raw = exc.read().decode("utf-8")
                try:
                    return exc.code, json.loads(raw)
                except Exception:
                    return exc.code, raw
            raise

    def close():
        server.shutdown()
        server.server_close()

    return request, close


def test_do_get_today() -> None:
    req, close = _make_test_client()
    try:
        status, body = req("/api/today")
        assert status == 200
        assert body == {"date": "2025-01-15"}
    finally:
        close()


def test_do_get_restaurants() -> None:
    req, close = _make_test_client()
    try:
        status, body = req("/api/restaurants?city=Ljubljana&lat=46.05&lon=14.50&limit=10")
        assert status == 200
        assert body["count"] == 1
        assert body["results"][0]["name"] == "Test Resto"
    finally:
        close()


def test_do_get_restaurant_hours() -> None:
    req, close = _make_test_client()
    try:
        status, body = req("/api/restaurant-hours?ids=1")
        assert status == 200
        assert len(body["results"]) == 1
        assert body["results"][0]["restaurant_id"] == 1
    finally:
        close()


def test_do_get_menu() -> None:
    req, close = _make_test_client()
    try:
        status, body = req("/api/menu?restaurant_id=1&date=2025-01-15&name=Test")
        assert status == 200
        assert body["restaurant_id"] == 1
    finally:
        close()


def test_do_get_dishes() -> None:
    req, close = _make_test_client()
    try:
        status, body = req("/api/dishes?query=pizza")
        assert status == 200
        assert body == [{"dish": "Pizza", "price": 5.0}]
    finally:
        close()


def test_do_get_draw() -> None:
    req, close = _make_test_client()
    try:
        status, body = req("/api/draw?mode=restaurant")
        assert status == 200
        assert body["winner"] == "Test Resto"
    finally:
        close()


def test_do_get_restaurant_menu_path() -> None:
    req, close = _make_test_client()
    try:
        status, body = req("/api/restaurants/1/menu?date=2025-01-15")
        assert status == 200
        assert body["restaurant_id"] == 1
    finally:
        close()


def test_do_get_unknown_api_endpoint() -> None:
    req, close = _make_test_client()
    try:
        status, body = req("/api/unknown")
        assert status == 404
        assert body["error"] == "API endpoint not found."
    finally:
        close()


def test_do_get_invalid_params_returns_400() -> None:
    req, close = _make_test_client()
    try:
        status, body = req("/api/restaurant-hours?ids=")
        assert status == 400
        assert "error" in body
    finally:
        close()


def test_do_get_mcp_metadata() -> None:
    req, close = _make_test_client()
    try:
        status, body = req("/api/mcp")
        assert status == 200
        assert body["status"] == "online"
        assert "search_restaurants" in body["tools"]
    finally:
        close()


def test_do_post_mcp_rpc_initialize() -> None:
    import json
    req, close = _make_test_client()
    try:
        payload = json.dumps({"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {}})
        status, body = req("/api/mcp", method="POST", body=payload, headers={"Content-Type": "application/json"})
        assert status == 200
        assert body["id"] == 1
        assert body["result"]["serverInfo"]["name"] == "bomboni"
    finally:
        close()


def test_do_get_mcp_desktop_page() -> None:
    req, close = _make_test_client()
    try:
        status, body = req("/mcp", headers={"Accept": "text/html"})
        assert status == 200
        assert "<!doctype html>" in body.lower()
    finally:
        close()


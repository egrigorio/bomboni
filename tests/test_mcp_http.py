from __future__ import annotations

import json
from unittest.mock import MagicMock

from bomboni.adapters.mcp.http import (
    TOOLS_SPEC,
    execute_mcp_tool,
    handle_mcp_http,
    handle_single_rpc_request,
)
from bomboni.core.models import DailyMenu, Restaurant


def _mock_service() -> MagicMock:
    service = MagicMock()
    service.today.return_value.isoformat.return_value = "2026-10-19"
    service.search_restaurants.return_value = [
        Restaurant(
            id=1478,
            name="ABI FALAFEL",
            address="Trubarjeva cesta 40",
            city="Ljubljana",
            detail_path="/Details/1478",
            meal_price_eur=8.50,
            additional_fee_eur=4.13,
            tags=("arabian", "vegetarian"),
            source_url="https://www.studentska-prehrana.si/en/restaurant/Details/1478",
        )
    ]
    resto = MagicMock()
    resto.to_dict.return_value = {
        "id": 1478,
        "name": "ABI FALAFEL",
        "city": "Ljubljana",
        "opening_hours": {"mon": "10:00 - 22:00"},
    }
    service.get_restaurant.return_value = resto

    menu = MagicMock()
    menu.to_dict.return_value = {
        "restaurant_id": 1478,
        "date": "2026-10-19",
        "dishes": [{"name": "Falafel krožnik", "categories": ["Meatless"]}],
    }
    service.get_menu.return_value = menu

    service.search_menu_items.return_value = {
        "city": "Ljubljana",
        "count": 1,
        "results": [{"dish": "Falafel", "restaurant": "ABI FALAFEL"}],
    }
    return service


def test_tools_spec_contains_all_four_tools() -> None:
    tool_names = [t["name"] for t in TOOLS_SPEC]
    assert "search_restaurants" in tool_names
    assert "get_restaurant" in tool_names
    assert "get_restaurant_menu" in tool_names
    assert "search_menu_items" in tool_names


def test_execute_mcp_tool() -> None:
    svc = _mock_service()

    # search_restaurants
    res1 = execute_mcp_tool(svc, "search_restaurants", {"city": "Ljubljana", "limit": 10})
    assert res1["count"] == 1
    assert res1["results"][0]["name"] == "ABI FALAFEL"

    # get_restaurant
    res2 = execute_mcp_tool(svc, "get_restaurant", {"restaurant_id": 1478})
    assert res2["id"] == 1478

    # get_restaurant_menu
    res3 = execute_mcp_tool(svc, "get_restaurant_menu", {"restaurant_id": 1478, "menu_date": "2026-10-19"})
    assert res3["restaurant_id"] == 1478

    # search_menu_items
    res4 = execute_mcp_tool(svc, "search_menu_items", {"city": "Ljubljana", "query": "falafel"})
    assert res4["count"] == 1


def test_jsonrpc_initialize() -> None:
    svc = _mock_service()
    req = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "initialize",
        "params": {"protocolVersion": "2024-11-05"},
    }
    resp = handle_single_rpc_request(svc, req)
    assert resp is not None
    assert resp["id"] == 1
    assert resp["result"]["protocolVersion"] == "2024-11-05"
    assert resp["result"]["serverInfo"]["name"] == "bomboni"
    assert "tools" in resp["result"]["capabilities"]


def test_jsonrpc_tools_list() -> None:
    svc = _mock_service()
    req = {"jsonrpc": "2.0", "id": 2, "method": "tools/list", "params": {}}
    resp = handle_single_rpc_request(svc, req)
    assert resp is not None
    assert resp["id"] == 2
    assert len(resp["result"]["tools"]) == 4


def test_jsonrpc_tools_call_success() -> None:
    svc = _mock_service()
    req = {
        "jsonrpc": "2.0",
        "id": 3,
        "method": "tools/call",
        "params": {
            "name": "search_restaurants",
            "arguments": {"city": "Ljubljana"},
        },
    }
    resp = handle_single_rpc_request(svc, req)
    assert resp is not None
    assert resp["id"] == 3
    assert resp["result"]["isError"] is False
    assert len(resp["result"]["content"]) == 1
    parsed_content = json.loads(resp["result"]["content"][0]["text"])
    assert parsed_content["count"] == 1


def test_jsonrpc_tools_call_unknown_tool() -> None:
    svc = _mock_service()
    req = {
        "jsonrpc": "2.0",
        "id": 4,
        "method": "tools/call",
        "params": {"name": "invalid_tool", "arguments": {}},
    }
    resp = handle_single_rpc_request(svc, req)
    assert resp is not None
    assert resp["result"]["isError"] is True
    assert "Unknown tool" in resp["result"]["content"][0]["text"]


def test_http_options_cors() -> None:
    svc = _mock_service()
    res = handle_mcp_http(svc, "OPTIONS", {}, b"")
    assert res.status == 204
    assert res.headers["Access-Control-Allow-Origin"] == "*"


def test_http_get_sse() -> None:
    svc = _mock_service()
    res = handle_mcp_http(svc, "GET", {"Accept": "text/event-stream"}, b"")
    assert res.status == 200
    assert "text/event-stream" in res.content_type
    assert b"event: endpoint" in res.body


def test_http_get_json_metadata() -> None:
    svc = _mock_service()
    res = handle_mcp_http(svc, "GET", {"Accept": "application/json"}, b"")
    assert res.status == 200
    data = json.loads(res.body.decode("utf-8"))
    assert data["status"] == "online"
    assert "tools" in data


def test_http_post_jsonrpc() -> None:
    svc = _mock_service()
    body = json.dumps({"jsonrpc": "2.0", "id": 10, "method": "ping"}).encode("utf-8")
    res = handle_mcp_http(svc, "POST", {"Content-Type": "application/json"}, body)
    assert res.status == 200
    data = json.loads(res.body.decode("utf-8"))
    assert data["id"] == 10
    assert data["result"] == {}


def test_http_post_batch() -> None:
    svc = _mock_service()
    batch = [
        {"jsonrpc": "2.0", "id": 1, "method": "ping"},
        {"jsonrpc": "2.0", "id": 2, "method": "tools/list"},
    ]
    res = handle_mcp_http(svc, "POST", {"Content-Type": "application/json"}, json.dumps(batch).encode("utf-8"))
    assert res.status == 200
    data = json.loads(res.body.decode("utf-8"))
    assert isinstance(data, list)
    assert len(data) == 2


def test_http_head() -> None:
    svc = _mock_service()
    res = handle_mcp_http(svc, "HEAD", {"Accept": "application/json"}, b"")
    assert res.status == 200
    assert len(res.body) > 0
    assert "tools" in res.body.decode("utf-8")
    assert res.headers["Access-Control-Allow-Origin"] == "*"


def test_http_delete_session() -> None:
    svc = _mock_service()
    res = handle_mcp_http(svc, "DELETE", {"Mcp-Session-Id": "test-session-123"}, b"")
    assert res.status == 204
    assert res.body == b""
    assert res.headers["Access-Control-Allow-Origin"] == "*"



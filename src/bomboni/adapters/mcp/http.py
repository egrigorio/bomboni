from __future__ import annotations

import json
import uuid
from dataclasses import dataclass, field
from datetime import date
from typing import Any

from bomboni.core.service import RestaurantService


def _parse_date(value: str | None) -> date:
    if value:
        try:
            return date.fromisoformat(value)
        except ValueError as exc:
            raise ValueError("menu_date must use YYYY-MM-DD format") from exc
    return RestaurantService.today()


TOOLS_SPEC: list[dict[str, Any]] = [
    {
        "name": "search_restaurants",
        "description": "Search the student meal restaurant directory in Slovenia by city, name, or venue tags.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "City name, e.g. 'Ljubljana', 'Maribor', 'Koper', 'Kranj'.",
                },
                "name": {
                    "type": "string",
                    "description": "Restaurant name to filter by (case-insensitive substring match).",
                },
                "tags": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "List of tags to filter by, e.g. ['pizza', 'vegetarian'].",
                },
                "limit": {
                    "type": "integer",
                    "description": "Maximum number of restaurants to return (default 50).",
                    "default": 50,
                },
            },
        },
    },
    {
        "name": "get_restaurant",
        "description": "Get a restaurant's address, co-payment price, opening hours, phone, and available menu dates by site ID.",
        "inputSchema": {
            "type": "object",
            "properties": {
                "restaurant_id": {
                    "type": "integer",
                    "description": "Stable site ID of the restaurant (e.g. 1478).",
                },
            },
            "required": ["restaurant_id"],
        },
    },
    {
        "name": "get_restaurant_menu",
        "description": "Get dishes published by the official student-meal portal for a specific date (YYYY-MM-DD; defaults to today in Slovenia).",
        "inputSchema": {
            "type": "object",
            "properties": {
                "restaurant_id": {
                    "type": "integer",
                    "description": "Site ID of the restaurant.",
                },
                "menu_date": {
                    "type": "string",
                    "description": "Menu date in YYYY-MM-DD format (defaults to today in Slovenia).",
                },
            },
            "required": ["restaurant_id"],
        },
    },
    {
        "name": "search_menu_items",
        "description": "Search published menus across a city by dish name (e.g. 'sushi', 'pizza') or portal category ('Meat', 'Fish', 'Meatless', 'Salad bar').",
        "inputSchema": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "City name, e.g. 'Ljubljana', 'Maribor'.",
                },
                "menu_date": {
                    "type": "string",
                    "description": "Menu date in YYYY-MM-DD format (defaults to today in Slovenia).",
                },
                "query": {
                    "type": "string",
                    "description": "Dish keyword or dish phrase to match (e.g. 'sushi', 'burger', 'pasta').",
                },
                "category": {
                    "type": "string",
                    "description": "Site category filter, e.g. 'Meat', 'Fish', 'Meatless', 'Mixed', 'Salad bar', 'Fast food'.",
                },
                "limit": {
                    "type": "integer",
                    "description": "Maximum dishes to return (default 30, max 50).",
                    "default": 30,
                },
            },
            "required": ["city"],
        },
    },
]


def execute_mcp_tool(service: RestaurantService, name: str, arguments: dict[str, Any]) -> object:
    if name == "search_restaurants":
        city = arguments.get("city")
        name_filter = arguments.get("name")
        tags = arguments.get("tags") or ()
        limit = int(arguments.get("limit") or 50)
        restaurants = service.search_restaurants(
            city=city,
            name=name_filter,
            tags=tuple(tags),
            limit=limit,
        )
        return {
            "count": len(restaurants),
            "results": [restaurant.to_dict() for restaurant in restaurants],
            "source_url": "https://www.studentska-prehrana.si/en/restaurant",
        }

    if name == "get_restaurant":
        restaurant_id = int(arguments["restaurant_id"])
        return service.get_restaurant(restaurant_id).to_dict()

    if name == "get_restaurant_menu":
        restaurant_id = int(arguments["restaurant_id"])
        menu_date = _parse_date(arguments.get("menu_date"))
        return service.get_menu(restaurant_id, menu_date).to_dict()

    if name == "search_menu_items":
        city = str(arguments["city"])
        menu_date = _parse_date(arguments.get("menu_date"))
        query = arguments.get("query")
        category = arguments.get("category")
        limit = int(arguments.get("limit") or 30)
        if not query and not category:
            raise ValueError("Provide a dish query, a category, or both.")
        return service.search_menu_items(
            city=city,
            menu_date=menu_date,
            query=query,
            category=category,
            limit=limit,
        )

    raise ValueError(f"Unknown tool: '{name}'")


@dataclass
class McpResponse:
    status: int
    body: bytes
    content_type: str = "application/json; charset=utf-8"
    headers: dict[str, str] = field(default_factory=dict)


def _cors_headers() -> dict[str, str]:
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, HEAD, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, Mcp-Session-Id, Mcp-Protocol-Version, X-Requested-With",
        "Access-Control-Expose-Headers": "Mcp-Session-Id, Mcp-Protocol-Version",
    }


def handle_single_rpc_request(service: RestaurantService, req: dict[str, Any]) -> dict[str, Any] | None:
    if not isinstance(req, dict):
        return {
            "jsonrpc": "2.0",
            "id": None,
            "error": {"code": -32600, "message": "Invalid Request: expected a JSON object"},
        }

    req_id = req.get("id")
    method = req.get("method")
    params = req.get("params") or {}

    # Notification check: notifications do not have an "id" field
    is_notification = "id" not in req

    if method == "initialize":
        client_version = params.get("protocolVersion") or "2024-11-05"
        result = {
            "protocolVersion": client_version,
            "capabilities": {
                "tools": {"listChanged": False},
            },
            "serverInfo": {
                "name": "bomboni",
                "version": "0.1.0",
            },
            "instructions": (
                "Bomboni provides authoritative student meal (študentska prehrana) data in Slovenia. "
                "Use search_restaurants to find venues by city and tags, get_restaurant for details and hours, "
                "get_restaurant_menu for daily published dishes, and search_menu_items to scan citywide menus."
            ),
        }
        return {"jsonrpc": "2.0", "id": req_id, "result": result}

    if method in ("notifications/initialized", "initialized"):
        # Handshake completed notification
        return None

    if method == "ping":
        return {"jsonrpc": "2.0", "id": req_id, "result": {}}

    if method == "tools/list":
        return {"jsonrpc": "2.0", "id": req_id, "result": {"tools": TOOLS_SPEC}}

    if method == "tools/call":
        tool_name = params.get("name")
        tool_args = params.get("arguments") or {}
        try:
            tool_output = execute_mcp_tool(service, tool_name, tool_args)
            content_text = json.dumps(tool_output, ensure_ascii=False, indent=2)
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "content": [{"type": "text", "text": content_text}],
                    "isError": False,
                },
            }
        except Exception as exc:
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "content": [{"type": "text", "text": f"Error executing tool '{tool_name}': {exc}"}],
                    "isError": True,
                },
            }

    if is_notification:
        return None

    return {
        "jsonrpc": "2.0",
        "id": req_id,
        "error": {"code": -32601, "message": f"Method not found: '{method}'"},
    }


def handle_mcp_http(
    service: RestaurantService,
    method: str,
    headers: dict[str, str],
    body: bytes,
) -> McpResponse:
    norm_headers = {k.lower(): v for k, v in headers.items()}
    cors = _cors_headers()
    session_id = norm_headers.get("mcp-session-id") or str(uuid.uuid4())

    if method == "OPTIONS":
        return McpResponse(status=204, body=b"", headers=cors)

    if method == "DELETE":
        return McpResponse(status=204, body=b"", headers=cors)

    if method in ("GET", "HEAD"):
        accept = norm_headers.get("accept", "")
        if "text/event-stream" in accept:
            # SSE connection handshake for remote MCP
            sse_content = f"event: endpoint\ndata: /api/mcp\n\n".encode("utf-8")
            res_headers = {
                **cors,
                "Mcp-Session-Id": session_id,
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            }
            return McpResponse(
                status=200,
                body=sse_content,
                content_type="text/event-stream; charset=utf-8",
                headers=res_headers,
            )

        # Standard GET inspection: return server metadata and available tools
        info = {
            "status": "online",
            "name": "bomboni-mcp",
            "version": "0.1.0",
            "protocol": "Model Context Protocol (JSON-RPC 2.0)",
            "transports": ["Streamable HTTP (POST)", "SSE (GET)"],
            "docs": "/mcp",
            "tools": [t["name"] for t in TOOLS_SPEC],
            "description": "Servidor MCP na nuvem para o diretório e cardápios do Bomboni (študentska prehrana).",
        }
        res_headers = {**cors, "Mcp-Session-Id": session_id, "Cache-Control": "no-cache"}
        return McpResponse(
            status=200,
            body=json.dumps(info, ensure_ascii=False, indent=2).encode("utf-8"),
            headers=res_headers,
        )

    if method == "POST":
        res_headers = {**cors, "Mcp-Session-Id": session_id, "Cache-Control": "no-store"}
        if not body:
            err = {"jsonrpc": "2.0", "id": None, "error": {"code": -32700, "message": "Empty request body"}}
            return McpResponse(status=400, body=json.dumps(err).encode("utf-8"), headers=res_headers)

        try:
            payload = json.loads(body.decode("utf-8"))
        except Exception as exc:
            err = {"jsonrpc": "2.0", "id": None, "error": {"code": -32700, "message": f"Parse error: {exc}"}}
            return McpResponse(status=400, body=json.dumps(err).encode("utf-8"), headers=res_headers)

        if isinstance(payload, list):
            # Batch request
            responses = []
            for item in payload:
                resp = handle_single_rpc_request(service, item)
                if resp is not None:
                    responses.append(resp)
            if not responses:
                return McpResponse(status=202, body=b"", headers=res_headers)
            return McpResponse(
                status=200,
                body=json.dumps(responses, ensure_ascii=False).encode("utf-8"),
                headers=res_headers,
            )

        resp = handle_single_rpc_request(service, payload)
        if resp is None:
            # Notification processed
            return McpResponse(status=202, body=b"", headers=res_headers)

        return McpResponse(
            status=200,
            body=json.dumps(resp, ensure_ascii=False).encode("utf-8"),
            headers=res_headers,
        )

    return McpResponse(status=405, body=b'{"error": "Method not allowed"}', headers=cors)

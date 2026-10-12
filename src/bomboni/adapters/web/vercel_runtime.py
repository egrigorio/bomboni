from __future__ import annotations

import json
from http.server import BaseHTTPRequestHandler
from typing import Any

from bomboni.core.service import RestaurantService
from bomboni.data_sources.studentska_prehrana.client import StudentskaPrehranaSource
from bomboni.data_sources.translation.mymemory import MyMemoryTranslator

_source: StudentskaPrehranaSource | None = None
_service: RestaurantService | None = None
_translator: MyMemoryTranslator | None = None


def services() -> tuple[RestaurantService, MyMemoryTranslator]:
    """Reuse clients and short-lived service caches within a warm function instance."""
    global _source, _service, _translator
    if _service is None or _translator is None:
        _source = StudentskaPrehranaSource()
        _service = RestaurantService(_source)
        _translator = MyMemoryTranslator()
    return _service, _translator


def send_json(handler: BaseHTTPRequestHandler, status: int, value: Any) -> None:
    body = json.dumps(value, ensure_ascii=False).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json; charset=utf-8")
    handler.send_header("Content-Length", str(len(body)))
    handler.send_header("Cache-Control", "no-store")
    handler.send_header("X-Content-Type-Options", "nosniff")
    handler.end_headers()
    handler.wfile.write(body)


class JsonHandler(BaseHTTPRequestHandler):
    """Base handler that keeps request query values out of platform access logs."""

    def log_message(self, format: str, *args: object) -> None:
        return


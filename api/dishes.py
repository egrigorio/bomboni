from __future__ import annotations

import sys
from pathlib import Path
from urllib.parse import parse_qs, urlparse

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from bomboni.adapters.web.vercel_runtime import JsonHandler, send_json, services


class handler(JsonHandler):
    def do_GET(self) -> None:
        query = parse_qs(urlparse(self.path).query)
        try:
            service, _ = services()
            query_str = query.get("query", [None])[0]
            category = query.get("category", [None])[0]
            city = query.get("city", [None])[0] or "Ljubljana"
            raw_limit = query.get("limit", ["30"])[0]
            limit = min(50, max(1, int(raw_limit)))
            result = service.search_menu_items(
                city=city,
                query=query_str,
                category=category,
                limit=limit,
            )
            send_json(self, 200, result)
        except (ValueError, KeyError) as exc:
            send_json(self, 400, {"error": str(exc)})
        except Exception as exc:
            send_json(self, 502, {"error": "The restaurant source could not be reached.", "detail": str(exc)})

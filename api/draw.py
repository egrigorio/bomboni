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
            mode = query.get("mode", ["restaurant"])[0]
            city = query.get("city", [None])[0] or None
            category = query.get("category", [None])[0] or None
            raw_price = query.get("max_price_eur", [None])[0]
            max_price = float(raw_price) if raw_price else None
            result = service.draw_recommendation(
                mode=mode,
                city=city,
                category=category,
                max_price_eur=max_price,
            )
            send_json(self, 200, result)
        except (ValueError, KeyError) as exc:
            send_json(self, 400, {"error": str(exc)})
        except Exception as exc:
            send_json(self, 502, {"error": "The restaurant source could not be reached.", "detail": str(exc)})

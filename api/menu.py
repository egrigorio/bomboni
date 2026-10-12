from __future__ import annotations

import sys
from datetime import date
from pathlib import Path
from urllib.parse import parse_qs, urlparse

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from bomboni.adapters.web.vercel_runtime import JsonHandler, send_json, services


class handler(JsonHandler):
    def do_GET(self) -> None:
        query = parse_qs(urlparse(self.path).query)
        try:
            restaurant_id = int(query["restaurant_id"][0])
            raw_date = query.get("date", [None])[0]
            service, _ = services()
            menu_date = date.fromisoformat(raw_date) if raw_date else service.today()
            send_json(self, 200, service.get_menu(restaurant_id, menu_date).to_dict())
        except (ValueError, KeyError) as exc:
            send_json(self, 400, {"error": str(exc)})
        except Exception as exc:
            send_json(self, 502, {"error": "The restaurant source could not be reached.", "detail": str(exc)})

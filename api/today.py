from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from bomboni.adapters.web.vercel_runtime import JsonHandler, send_json, services


class handler(JsonHandler):
    def do_GET(self) -> None:
        try:
            service, _ = services()
            send_json(self, 200, {"date": service.today().isoformat()})
        except Exception as exc:
            send_json(self, 502, {"error": "The restaurant source could not be reached.", "detail": str(exc)})

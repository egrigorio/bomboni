from __future__ import annotations

import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import parse_qs, urlparse

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from bomboni.adapters.web.vercel_runtime import JsonHandler, send_json, services


class handler(JsonHandler):
    def do_GET(self) -> None:
        query = parse_qs(urlparse(self.path).query)
        try:
            raw_ids = query.get("ids", [""])[0]
            restaurant_ids = list(dict.fromkeys(int(value) for value in raw_ids.split(",") if value))
            if not restaurant_ids or len(restaurant_ids) > 20:
                raise ValueError("ids must contain between 1 and 20 restaurant IDs.")

            service, _ = services()
            details_by_id = {}
            errors = []
            with ThreadPoolExecutor(max_workers=min(5, len(restaurant_ids))) as pool:
                futures = {pool.submit(service.get_restaurant, restaurant_id): restaurant_id for restaurant_id in restaurant_ids}
                for future in as_completed(futures):
                    restaurant_id = futures[future]
                    try:
                        details = future.result()
                        details_by_id[restaurant_id] = {
                            "restaurant_id": restaurant_id,
                            "opening_hours": details.opening_hours,
                            "retrieved_at": details.retrieved_at,
                        }
                    except Exception:
                        errors.append(restaurant_id)

            send_json(self, 200, {
                "results": [details_by_id[restaurant_id] for restaurant_id in restaurant_ids if restaurant_id in details_by_id],
                "errors": errors,
            })
        except ValueError as exc:
            send_json(self, 400, {"error": str(exc)})
        except Exception as exc:
            send_json(self, 502, {"error": "The restaurant source could not be reached.", "detail": str(exc)})

from __future__ import annotations

import math
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
            city = query.get("city", [None])[0]
            restaurants = service.search_restaurants(city=city, limit=10_000)
            latitude = float(query["lat"][0]) if query.get("lat") else None
            longitude = float(query["lon"][0]) if query.get("lon") else None
            results = []
            for restaurant in restaurants:
                record = restaurant.to_dict()
                distance = None
                if latitude is not None and longitude is not None and restaurant.latitude is not None and restaurant.longitude is not None:
                    phi1, phi2 = math.radians(latitude), math.radians(restaurant.latitude)
                    delta_phi = math.radians(restaurant.latitude - latitude)
                    delta_lon = math.radians(restaurant.longitude - longitude)
                    a = math.sin(delta_phi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lon / 2) ** 2
                    distance = 6371.0088 * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
                record["distance_km"] = round(distance, 2) if distance is not None else None
                results.append(record)
            results.sort(key=lambda item: (item["distance_km"] is None, item["distance_km"] or 0, item["name"].casefold()))
            limit = min(100, max(1, int(query.get("limit", ["60"])[0])))
            send_json(self, 200, {"city": city, "count": len(results[:limit]), "results": results[:limit]})
        except (ValueError, KeyError) as exc:
            send_json(self, 400, {"error": str(exc)})
        except Exception as exc:
            send_json(self, 502, {"error": "The restaurant source could not be reached.", "detail": str(exc)})

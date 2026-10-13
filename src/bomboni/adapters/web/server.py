from __future__ import annotations

import json
import math
import mimetypes
import os
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse

from bomboni.core.service import RestaurantService
from bomboni.data_sources.studentska_prehrana.client import StudentskaPrehranaSource
from bomboni.data_sources.translation.mymemory import MyMemoryTranslator

STATIC_DIR = Path(__file__).with_name("static")
EARTH_RADIUS_KM = 6371.0088


def _distance_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    a = math.sin(delta_phi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2) ** 2
    return EARTH_RADIUS_KM * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def _json_bytes(value: object) -> bytes:
    return json.dumps(value, ensure_ascii=False).encode("utf-8")


def make_handler(service: RestaurantService, translator: MyMemoryTranslator) -> type[BaseHTTPRequestHandler]:
    class Handler(BaseHTTPRequestHandler):
        server_version = "BomboniWeb/0.1"

        def _send(self, status: int, body: bytes, content_type: str, *, cache: str = "no-store") -> None:
            self.send_response(status)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", cache)
            self.send_header("X-Content-Type-Options", "nosniff")
            self.end_headers()
            self.wfile.write(body)

        def _send_json(self, status: int, value: object) -> None:
            self._send(status, _json_bytes(value), "application/json; charset=utf-8")

        def do_GET(self) -> None:  # noqa: N802
            parsed = urlparse(self.path)
            query = parse_qs(parsed.query)
            try:
                if parsed.path == "/api/today":
                    self._send_json(200, {"date": service.today().isoformat()})
                    return
                if parsed.path == "/api/restaurants":
                    city = query.get("city", [None])[0]
                    restaurants = service.search_restaurants(city=city, limit=10_000)
                    latitude = float(query["lat"][0]) if query.get("lat") else None
                    longitude = float(query["lon"][0]) if query.get("lon") else None
                    results = []
                    for restaurant in restaurants:
                        record = restaurant.to_dict()
                        distance = None
                        if latitude is not None and longitude is not None and restaurant.latitude is not None and restaurant.longitude is not None:
                            distance = _distance_km(latitude, longitude, restaurant.latitude, restaurant.longitude)
                        record["distance_km"] = round(distance, 2) if distance is not None else None
                        results.append(record)
                    results.sort(key=lambda item: (
                        item["distance_km"] is None,
                        item["distance_km"] if item["distance_km"] is not None else 0,
                        item["name"].casefold(),
                    ))
                    limit = min(500, max(1, int(query.get("limit", ["60"])[0])))
                    self._send_json(200, {"city": city, "count": len(results[:limit]), "results": results[:limit]})
                    return
                if parsed.path == "/api/restaurant-hours":
                    raw_ids = query.get("ids", [""])[0]
                    restaurant_ids = list(dict.fromkeys(int(value) for value in raw_ids.split(",") if value))
                    if not restaurant_ids or len(restaurant_ids) > 20:
                        raise ValueError("ids must contain between 1 and 20 restaurant IDs.")
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
                    self._send_json(200, {
                        "results": [details_by_id[restaurant_id] for restaurant_id in restaurant_ids if restaurant_id in details_by_id],
                        "errors": errors,
                    })
                    return
                if parsed.path == "/api/menu":
                    restaurant_id = int(query["restaurant_id"][0])
                    raw_date = query.get("date", [None])[0]
                    name = query.get("name", [None])[0]
                    menu_date = date.fromisoformat(raw_date) if raw_date else service.today()
                    self._send_json(200, service.get_menu(restaurant_id, menu_date, restaurant_name=name).to_dict())
                    return
                if parsed.path == "/api/dishes":
                    query_str = query.get("query", [None])[0]
                    category = query.get("category", [None])[0]
                    city = query.get("city", [None])[0] or "Ljubljana"
                    raw_limit = query.get("limit", ["30"])[0]
                    limit = min(50, max(1, int(raw_limit)))
                    self._send_json(200, service.search_menu_items(
                        city=city,
                        query=query_str,
                        category=category,
                        limit=limit,
                    ))
                    return
                if parsed.path == "/api/draw":
                    mode = query.get("mode", ["restaurant"])[0]
                    city = query.get("city", [None])[0] or None
                    category = query.get("category", [None])[0] or None
                    raw_price = query.get("max_price_eur", [None])[0]
                    max_price = float(raw_price) if raw_price else None
                    self._send_json(200, service.draw_recommendation(
                        mode=mode,
                        city=city,
                        category=category,
                        max_price_eur=max_price,
                    ))
                    return
                if parsed.path.startswith("/api/restaurants/") and parsed.path.endswith("/menu"):
                    parts = parsed.path.strip("/").split("/")
                    if len(parts) != 4:
                        raise ValueError("Invalid restaurant menu path.")
                    restaurant_id = int(parts[2])
                    raw_date = query.get("date", [None])[0]
                    name = query.get("name", [None])[0]
                    menu_date = date.fromisoformat(raw_date) if raw_date else service.today()
                    self._send_json(200, service.get_menu(restaurant_id, menu_date, restaurant_name=name).to_dict())
                    return
                if parsed.path.startswith("/api/"):
                    self._send_json(404, {"error": "API endpoint not found."})
                    return
                self._serve_static(parsed.path)
            except (ValueError, KeyError) as exc:
                self._send_json(400, {"error": str(exc)})
            except Exception as exc:
                self._send_json(502, {"error": "The restaurant source could not be reached.", "detail": str(exc)})

        def do_POST(self) -> None:  # noqa: N802
            if urlparse(self.path).path != "/api/translate":
                self._send_json(404, {"error": "Not found"})
                return
            try:
                length = int(self.headers.get("Content-Length", "0"))
                if length < 1 or length > 20_000:
                    raise ValueError("Request body is missing or too large.")
                payload = json.loads(self.rfile.read(length))
                texts = payload.get("texts")
                language = payload.get("language")
                if not isinstance(texts, list) or len(texts) > 30 or not all(isinstance(text, str) and len(text) <= 350 for text in texts):
                    raise ValueError("texts must contain up to 30 strings of at most 350 characters.")
                if not isinstance(language, str):
                    raise ValueError("language is required.")
                self._send_json(200, translator.translate_many(texts, language))
            except (ValueError, TypeError, json.JSONDecodeError) as exc:
                self._send_json(400, {"error": str(exc)})

        def _serve_static(self, request_path: str) -> None:
            relative = unquote(request_path).lstrip("/") or "index.html"
            target = (STATIC_DIR / relative).resolve()
            if not target.is_relative_to(STATIC_DIR.resolve()) or not target.is_file():
                target = STATIC_DIR / "index.html"
            content_type = mimetypes.guess_type(target.name)[0] or "application/octet-stream"
            if target.suffix == ".webmanifest":
                content_type = "application/manifest+json"
            cache = "no-cache" if target.name in {"index.html", "service-worker.js"} else "public, max-age=3600"
            self._send(200, target.read_bytes(), f"{content_type}; charset=utf-8", cache=cache)

        def log_message(self, format: str, *args: object) -> None:
            # Location coordinates arrive as query parameters; never write them to the access log.
            print(f"[bomboni-web] {self.address_string()} {self.command} {urlparse(self.path).path}")

    return Handler


def main() -> None:
    host = os.environ.get("BOMBONI_WEB_HOST", "127.0.0.1")
    port = int(os.environ.get("BOMBONI_WEB_PORT", "8765"))
    source = StudentskaPrehranaSource()
    translator = MyMemoryTranslator()
    service = RestaurantService(source)
    server = ThreadingHTTPServer((host, port), make_handler(service, translator))
    print(f"Bomboni web app running at http://{host}:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
        source.close()
        translator.close()


if __name__ == "__main__":
    main()

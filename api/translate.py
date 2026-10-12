from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from bomboni.adapters.web.vercel_runtime import JsonHandler, send_json, services


class handler(JsonHandler):
    def do_POST(self) -> None:
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
            _, translator = services()
            send_json(self, 200, translator.translate_many(texts, language))
        except (ValueError, TypeError, json.JSONDecodeError) as exc:
            send_json(self, 400, {"error": str(exc)})
        except Exception as exc:
            send_json(self, 502, {"error": "The translation service could not be reached.", "detail": str(exc)})

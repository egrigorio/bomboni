from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from bomboni.adapters.web.vercel_runtime import JsonHandler, send_json, services
from bomboni.data_sources.translation.mymemory import MyMemoryTranslator


class handler(JsonHandler):
    def do_POST(self) -> None:
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length < 1 or length > 100_000:
                raise ValueError("Request body is missing or too large.")
            payload = json.loads(self.rfile.read(length))
            texts = payload.get("texts")
            language = payload.get("language")
            if not isinstance(texts, list) or len(texts) > MyMemoryTranslator.MAX_TEXTS or not all(isinstance(text, str) and len(text) <= MyMemoryTranslator.MAX_TEXT_LENGTH for text in texts):
                raise ValueError(f"texts must contain up to {MyMemoryTranslator.MAX_TEXTS} strings of at most {MyMemoryTranslator.MAX_TEXT_LENGTH} characters.")
            if not isinstance(language, str):
                raise ValueError("language is required.")
            _, translator = services()
            send_json(self, 200, translator.translate_many(texts, language, str(payload.get("source") or "sl")))
        except (ValueError, TypeError, json.JSONDecodeError) as exc:
            send_json(self, 400, {"error": str(exc)})
        except Exception as exc:
            send_json(self, 502, {"error": "The translation service could not be reached.", "detail": str(exc)})

from __future__ import annotations

import html
import threading
from concurrent.futures import ThreadPoolExecutor

import httpx


class MyMemoryTranslator:
    """Small cached adapter for translating public menu text from Slovenian."""

    ENDPOINT = "https://api.mymemory.translated.net/get"
    LANGUAGES = {"en", "pt", "es", "de", "it", "fr", "ca"}

    def __init__(self, *, timeout: float = 8.0, client: httpx.Client | None = None) -> None:
        self._client = client or httpx.Client(timeout=timeout)
        self._cache: dict[tuple[str, str], str] = {}
        self._lock = threading.Lock()

    def close(self) -> None:
        self._client.close()

    def _translate_one(self, text: str, language: str) -> dict[str, object]:
        key = (text.strip(), language)
        with self._lock:
            cached = self._cache.get(key)
        if cached is not None:
            return {"original": text, "translated": cached, "is_translated": True}
        try:
            response = self._client.get(
                self.ENDPOINT,
                params={"q": text, "langpair": f"sl|{language}"},
            )
            response.raise_for_status()
            payload = response.json()
            response_data = payload.get("responseData") or {}
            translated = html.unescape(str(response_data.get("translatedText", "")).strip())
            status = int(payload.get("responseStatus", 0))
            if status != 200 or not translated:
                raise ValueError("Translation provider returned no translation.")
            with self._lock:
                self._cache[key] = translated
            return {"original": text, "translated": translated, "is_translated": True}
        except (httpx.HTTPError, ValueError, TypeError, KeyError):
            return {"original": text, "translated": text, "is_translated": False}

    def translate_many(self, texts: list[str], language: str) -> dict[str, object]:
        if language not in self.LANGUAGES:
            raise ValueError(f"Unsupported language: {language}")
        unique_texts = list(dict.fromkeys(text.strip() for text in texts if text.strip()))[:30]
        with ThreadPoolExecutor(max_workers=4) as pool:
            translations = list(pool.map(lambda value: self._translate_one(value, language), unique_texts))
        return {
            "language": language,
            "provider": "MyMemory",
            "results": translations,
        }

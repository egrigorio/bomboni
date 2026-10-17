from __future__ import annotations

import html
import threading
from concurrent.futures import ThreadPoolExecutor

import httpx


class MyMemoryTranslator:
    """Small cached adapter for translating public menu text from Slovenian.

    Texts are packed into newline-separated batches so a whole menu needs only a
    few provider round trips instead of one request per dish.
    """

    ENDPOINT = "https://api.mymemory.translated.net/get"
    LANGUAGES = {"en", "pt", "es", "de", "it", "fr", "ca"}
    MAX_TEXTS = 120
    MAX_TEXT_LENGTH = 350
    # MyMemory rejects queries above 500 bytes; keep headroom for safety.
    MAX_BATCH_BYTES = 450
    MAX_WORKERS = 8
    MAX_CACHE_ENTRIES = 5000

    def __init__(self, *, timeout: float = 6.0, client: httpx.Client | None = None) -> None:
        self._client = client or httpx.Client(timeout=timeout)
        self._cache: dict[tuple[str, str], str] = {}
        self._lock = threading.Lock()

    def close(self) -> None:
        self._client.close()

    def _request(self, query: str, language: str) -> str:
        response = self._client.get(self.ENDPOINT, params={"q": query, "langpair": f"sl|{language}"})
        response.raise_for_status()
        payload = response.json()
        response_data = payload.get("responseData") or {}
        translated = html.unescape(str(response_data.get("translatedText", "")).strip())
        if int(payload.get("responseStatus", 0)) != 200 or not translated:
            raise ValueError("Translation provider returned no translation.")
        return translated

    def _store(self, language: str, pairs: dict[str, str]) -> None:
        with self._lock:
            if len(self._cache) + len(pairs) > self.MAX_CACHE_ENTRIES:
                self._cache.clear()
            for text, translated in pairs.items():
                self._cache[(text, language)] = translated

    def _translate_one(self, text: str, language: str) -> dict[str, str]:
        try:
            return {text: self._request(text, language)}
        except (httpx.HTTPError, ValueError, TypeError, KeyError):
            return {}

    def _translate_batch(self, batch: list[str], language: str) -> dict[str, str]:
        if len(batch) == 1:
            return self._translate_one(batch[0], language)
        try:
            lines = [line.strip() for line in self._request("\n".join(batch), language).split("\n")]
            if len(lines) == len(batch) and all(lines):
                return dict(zip(batch, lines))
        except (httpx.HTTPError, ValueError, TypeError, KeyError):
            pass
        # The provider merged or split lines; fall back to one request per text.
        result: dict[str, str] = {}
        for text in batch:
            result.update(self._translate_one(text, language))
        return result

    def _batches(self, texts: list[str]) -> list[list[str]]:
        batches: list[list[str]] = []
        current: list[str] = []
        size = 0
        for text in texts:
            if "\n" in text:
                batches.append([text])
                continue
            text_size = len(text.encode("utf-8")) + 1
            if current and size + text_size > self.MAX_BATCH_BYTES:
                batches.append(current)
                current, size = [], 0
            current.append(text)
            size += text_size
        if current:
            batches.append(current)
        return batches

    def translate_many(self, texts: list[str], language: str) -> dict[str, object]:
        if language not in self.LANGUAGES:
            raise ValueError(f"Unsupported language: {language}")
        unique_texts = list(dict.fromkeys(text.strip() for text in texts if text.strip()))[: self.MAX_TEXTS]
        with self._lock:
            known = {text: self._cache[(text, language)] for text in unique_texts if (text, language) in self._cache}
        missing = [text for text in unique_texts if text not in known]
        if missing:
            batches = self._batches(missing)
            with ThreadPoolExecutor(max_workers=min(self.MAX_WORKERS, len(batches))) as pool:
                fresh: dict[str, str] = {}
                for result in pool.map(lambda batch: self._translate_batch(batch, language), batches):
                    fresh.update(result)
            self._store(language, fresh)
            known.update(fresh)
        return {
            "language": language,
            "provider": "MyMemory",
            "results": [
                {"original": text, "translated": known.get(text, text), "is_translated": text in known}
                for text in unique_texts
            ],
        }

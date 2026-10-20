from __future__ import annotations

import httpx

from bomboni.data_sources.translation.mymemory import MyMemoryTranslator


def _translator(handler) -> tuple[MyMemoryTranslator, list[str]]:
    queries: list[str] = []

    def record(request: httpx.Request) -> httpx.Response:
        queries.append(request.url.params["q"])
        return handler(request)

    client = httpx.Client(transport=httpx.MockTransport(record))
    return MyMemoryTranslator(client=client), queries


def _reply(text: str) -> httpx.Response:
    return httpx.Response(200, json={"responseStatus": 200, "responseData": {"translatedText": text}})


def test_batches_texts_into_a_single_request():
    translator, queries = _translator(lambda request: _reply(request.url.params["q"].upper()))

    result = translator.translate_many(["juha", "solata", "juha", "  "], "en")

    assert queries == ["juha\nsolata"]
    assert result["results"] == [
        {"original": "juha", "translated": "JUHA", "is_translated": True},
        {"original": "solata", "translated": "SOLATA", "is_translated": True},
    ]


def test_splits_batches_by_provider_byte_limit():
    translator, queries = _translator(lambda request: _reply(request.url.params["q"].upper()))
    texts = [f"jed številka {index} " + "x" * 60 for index in range(20)]

    result = translator.translate_many(texts, "pt")

    assert len(queries) > 1
    assert all(len(query.encode("utf-8")) <= MyMemoryTranslator.MAX_BATCH_BYTES for query in queries)
    assert all(item["is_translated"] for item in result["results"])


def test_falls_back_to_single_requests_when_lines_do_not_match():
    def handler(request: httpx.Request) -> httpx.Response:
        query = request.url.params["q"]
        return _reply("merged" if "\n" in query else query.upper())

    translator, queries = _translator(handler)

    result = translator.translate_many(["juha", "solata"], "de")

    assert queries == ["juha\nsolata", "juha", "solata"]
    assert [item["translated"] for item in result["results"]] == ["JUHA", "SOLATA"]


def test_uses_cache_and_reports_failures_without_raising():
    calls = {"count": 0}

    def handler(request: httpx.Request) -> httpx.Response:
        calls["count"] += 1
        if request.url.params["q"] == "napaka":
            return httpx.Response(500)
        return _reply("Soup")

    translator, _ = _translator(handler)
    translator.translate_many(["juha"], "en")
    result = translator.translate_many(["juha", "napaka"], "en")

    assert calls["count"] == 2
    assert result["results"] == [
        {"original": "juha", "translated": "Soup", "is_translated": True},
        {"original": "napaka", "translated": "napaka", "is_translated": False},
    ]


def test_supports_catalan():
    translator, _ = _translator(lambda request: _reply("Sopa"))

    assert translator.translate_many(["juha"], "ca")["results"][0]["translated"] == "Sopa"


def test_falls_back_to_single_requests_when_batch_request_raises_exception():
    def handler(request: httpx.Request) -> httpx.Response:
        query = request.url.params["q"]
        if "\n" in query:
            return httpx.Response(500)
        return _reply(query.upper())

    translator, queries = _translator(handler)

    result = translator.translate_many(["juha", "solata"], "en")

    assert queries == ["juha\nsolata", "juha", "solata"]
    assert result["results"] == [
        {"original": "juha", "translated": "JUHA", "is_translated": True},
        {"original": "solata", "translated": "SOLATA", "is_translated": True},
    ]


def test_handles_batch_exception_with_partial_single_request_failures():
    def handler(request: httpx.Request) -> httpx.Response:
        query = request.url.params["q"]
        if "\n" in query or query == "napaka":
            return httpx.Response(500)
        return _reply(query.upper())

    translator, queries = _translator(handler)

    result = translator.translate_many(["juha", "napaka"], "en")

    assert queries == ["juha\nnapaka", "juha", "napaka"]
    assert result["results"] == [
        {"original": "juha", "translated": "JUHA", "is_translated": True},
        {"original": "napaka", "translated": "napaka", "is_translated": False},
    ]


def test_falls_back_to_single_requests_when_batch_returns_invalid_payload():
    def handler(request: httpx.Request) -> httpx.Response:
        query = request.url.params["q"]
        if "\n" in query:
            return httpx.Response(200, json={"responseStatus": 403, "responseData": None})
        return _reply(query.upper())

    translator, queries = _translator(handler)

    result = translator.translate_many(["juha", "solata"], "de")

    assert queries == ["juha\nsolata", "juha", "solata"]
    assert result["results"] == [
        {"original": "juha", "translated": "JUHA", "is_translated": True},
        {"original": "solata", "translated": "SOLATA", "is_translated": True},
    ]

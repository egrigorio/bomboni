from __future__ import annotations

from unittest.mock import MagicMock

import pytest

from bomboni.data_sources.translation.mymemory import MyMemoryTranslator


def test_mymemory_supports_catalan_language() -> None:
    assert "ca" in MyMemoryTranslator.LANGUAGES


def test_mymemory_translate_many_accepts_catalan() -> None:
    mock_client = MagicMock()
    mock_response = MagicMock()
    mock_response.json.return_value = {
        "responseData": {"translatedText": "Pizza"},
        "responseStatus": 200,
    }
    mock_client.get.return_value = mock_response

    translator = MyMemoryTranslator(client=mock_client)
    res = translator.translate_many(["Pizza"], "ca")

    assert res["language"] == "ca"
    assert len(res["results"]) == 1
    assert res["results"][0]["translated"] == "Pizza"
    assert res["results"][0]["is_translated"] is True

    mock_client.get.assert_called_once()
    args, kwargs = mock_client.get.call_args
    assert kwargs["params"]["langpair"] == "sl|ca"


def test_mymemory_translate_many_raises_for_unsupported_language() -> None:
    translator = MyMemoryTranslator()
    with pytest.raises(ValueError, match="Unsupported language"):
        translator.translate_many(["Pizza"], "unsupported_lang")

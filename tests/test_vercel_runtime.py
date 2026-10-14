import io
import json
from unittest.mock import MagicMock

import pytest

import bomboni.adapters.web.vercel_runtime as vr


@pytest.fixture(autouse=True)
def reset_vercel_runtime_globals():
    """Ensure global service instances are cleared before and after each test."""
    vr._source = None
    vr._service = None
    vr._translator = None
    yield
    vr._source = None
    vr._service = None
    vr._translator = None


def test_services_cold_and_warm_start():
    # Cold start: should instantiate new service and translator objects.
    service1, translator1 = vr.services()
    assert isinstance(service1, vr.RestaurantService)
    assert isinstance(translator1, vr.MyMemoryTranslator)

    # Warm start: second call should return identical cached instances.
    service2, translator2 = vr.services()
    assert service1 is service2
    assert translator1 is translator2


def test_send_json():
    mock_handler = MagicMock()
    body_stream = io.BytesIO()
    mock_handler.wfile = body_stream

    data = {"status": "ok", "message": "Dober dan! Čevapčiči & Picerija"}
    vr.send_json(mock_handler, 200, data)

    mock_handler.send_response.assert_called_once_with(200)

    expected_body = json.dumps(data, ensure_ascii=False).encode("utf-8")

    # Check header calls
    headers = {call[0][0]: call[0][1] for call in mock_handler.send_header.call_args_list}
    assert headers["Content-Type"] == "application/json; charset=utf-8"
    assert headers["Content-Length"] == str(len(expected_body))
    assert headers["Cache-Control"] == "no-store"
    assert headers["X-Content-Type-Options"] == "nosniff"

    mock_handler.end_headers.assert_called_once()
    assert body_stream.getvalue() == expected_body


def test_json_handler_log_message():
    # JsonHandler should suppress logging (log_message does nothing)
    handler = vr.JsonHandler.__new__(vr.JsonHandler)
    assert handler.log_message("%s - - [%s] %s\n", "127.0.0.1", "date", "GET / HTTP/1.1") is None

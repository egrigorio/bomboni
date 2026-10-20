import io
import json
import sys
from pathlib import Path
from unittest.mock import MagicMock

import pytest

import bomboni.adapters.web.vercel_runtime as vr

repo_root = str(Path(__file__).resolve().parents[1])
if repo_root not in sys.path:
    sys.path.insert(0, repo_root)

from api.mcp import handler as McpHandler


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


@pytest.fixture
def mock_mcp_service(monkeypatch):
    """Provide a mock service for api.mcp handler tests."""
    mock_service = MagicMock()
    mock_service.today.return_value.isoformat.return_value = "2026-10-19"
    monkeypatch.setattr("api.mcp.services", lambda: (mock_service, None))
    return mock_service


@pytest.fixture
def mcp_handler(mock_mcp_service):
    """Provide an initialized McpHandler instance with mocked responses and output buffer."""
    h = McpHandler.__new__(McpHandler)
    h.headers = {"Accept": "application/json"}
    h.wfile = io.BytesIO()
    h.send_response = MagicMock()
    h.send_header = MagicMock()
    h.end_headers = MagicMock()
    return h


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


def test_api_mcp_handler_get(mcp_handler):
    mcp_handler.do_GET()
    mcp_handler.send_response.assert_called_with(200)
    data = json.loads(mcp_handler.wfile.getvalue().decode("utf-8"))
    assert data["status"] == "online"


def test_api_mcp_handler_post(mcp_handler):
    post_body = json.dumps({"jsonrpc": "2.0", "id": 42, "method": "ping"}).encode("utf-8")
    mcp_handler.rfile = io.BytesIO(post_body)
    mcp_handler.headers = {"Content-Length": str(len(post_body)), "Content-Type": "application/json"}
    mcp_handler.do_POST()
    post_res = json.loads(mcp_handler.wfile.getvalue().decode("utf-8"))
    assert post_res["id"] == 42
    assert post_res["result"] == {}


def test_api_mcp_handler_head(mcp_handler):
    mcp_handler.do_HEAD()
    mcp_handler.send_response.assert_called_with(200)
    assert mcp_handler.wfile.getvalue() == b""


def test_api_mcp_handler_options(mcp_handler):
    mcp_handler.headers = {}
    mcp_handler.do_OPTIONS()
    mcp_handler.send_response.assert_called_with(204)


def test_api_mcp_handler_delete(mcp_handler):
    mcp_handler.headers = {}
    mcp_handler.do_DELETE()
    mcp_handler.send_response.assert_called_with(204)

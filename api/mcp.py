from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from bomboni.adapters.mcp.http import handle_mcp_http
from bomboni.adapters.web.vercel_runtime import JsonHandler, services


class handler(JsonHandler):
    def do_OPTIONS(self) -> None:  # noqa: N802
        service, _ = services()
        res = handle_mcp_http(service, "OPTIONS", dict(self.headers), b"")
        self.send_response(res.status)
        for k, v in res.headers.items():
            self.send_header(k, v)
        self.end_headers()

    def do_GET(self) -> None:  # noqa: N802
        service, _ = services()
        res = handle_mcp_http(service, "GET", dict(self.headers), b"")
        self.send_response(res.status)
        self.send_header("Content-Type", res.content_type)
        self.send_header("Content-Length", str(len(res.body)))
        for k, v in res.headers.items():
            self.send_header(k, v)
        self.end_headers()
        self.wfile.write(res.body)

    def do_POST(self) -> None:  # noqa: N802
        length = int(self.headers.get("Content-Length", "0") or 0)
        body = self.rfile.read(length) if length > 0 else b""
        service, _ = services()
        res = handle_mcp_http(service, "POST", dict(self.headers), body)
        self.send_response(res.status)
        self.send_header("Content-Type", res.content_type)
        self.send_header("Content-Length", str(len(res.body)))
        for k, v in res.headers.items():
            self.send_header(k, v)
        self.end_headers()
        self.wfile.write(res.body)

from __future__ import annotations

import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

import pytest

playwright = pytest.importorskip("playwright.sync_api")
sync_playwright = playwright.sync_playwright

STATIC_DIR = Path(__file__).resolve().parents[1] / "src" / "bomboni" / "adapters" / "web" / "static"


class StaticWithMockApiHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(STATIC_DIR), **kwargs)

    def do_GET(self) -> None:  # noqa: N802
        parsed = urlsplit(self.path)
        if parsed.path.startswith("/api/"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(b'{"results": []}')
            return
        super().do_GET()

    def log_message(self, format: str, *args: object) -> None:
        pass


@pytest.fixture(scope="module")
def pwa_server() -> str:
    server = ThreadingHTTPServer(("127.0.0.1", 0), StaticWithMockApiHandler)
    host, port = server.server_address
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    yield f"http://{host}:{port}"
    server.shutdown()
    server.server_close()


def test_pwa_smoke_load(pwa_server: str) -> None:
    page_errors: list[str] = []
    console_errors: list[str] = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Listen to pageerror and console errors
        page.on("pageerror", lambda err: page_errors.append(str(err)))
        page.on(
            "console",
            lambda msg: console_errors.append(f"[{msg.type}] {msg.text}")
            if msg.type == "error"
            else None,
        )

        response = page.goto(pwa_server, wait_until="networkidle")
        assert response is not None
        assert response.status == 200

        # Verify main navigation tabs in the DOM (Explorar, Favoritos, Sorteio, Perfil)
        explore_tab = page.locator('[data-tab="explore"]')
        favorites_tab = page.locator('[data-tab="favorites"]')
        draw_tab = page.locator('[data-tab="draw"]')
        profile_tab = page.locator('[data-tab="profile"]')

        assert explore_tab.count() > 0, "Aba Explorar não encontrada no DOM"
        assert favorites_tab.count() > 0, "Aba Favoritos não encontrada no DOM"
        assert draw_tab.count() > 0, "Aba Sorteio não encontrada no DOM"
        assert profile_tab.count() > 0, "Aba Perfil não encontrada no DOM"

        assert "Explorar" in (explore_tab.first.text_content() or "")
        assert "Favoritos" in (favorites_tab.first.text_content() or "")
        assert "Sorteio" in (draw_tab.first.text_content() or "")
        assert "Perfil" in (profile_tab.first.text_content() or "")

        browser.close()

    assert not page_errors, f"Erros não tratados de JavaScript na página: {page_errors}"
    assert not console_errors, f"Erros de console registrados durante o carregamento: {console_errors}"

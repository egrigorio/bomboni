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
        if parsed.path == "/mcp":
            self.path = "/index.html"
            super().do_GET()
            return
        if parsed.path.startswith("/api/"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(b'{"results": []}')
            return
        super().do_GET()

    def do_POST(self) -> None:  # noqa: N802
        parsed = urlsplit(self.path)
        if parsed.path == "/api/send-code":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(b'{"status": "sent", "code": "1234"}')
            return
        if parsed.path.startswith("/api/"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(b'{}')
            return
        super().do_POST()

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


def test_pwa_account_creation_mail_verification(pwa_server: str) -> None:
    page_errors: list[str] = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 390, "height": 844})
        page = context.new_page()

        page.on("pageerror", lambda err: page_errors.append(str(err)))

        page.goto(pwa_server, wait_until="networkidle")

        # Switch to Profile tab
        page.locator('.mobile-tab[data-tab="profile"]').click()

        # Click Sign Up tab ("Criar conta")
        page.locator('#auth-tab-register').click()

        # Fill out sign up form
        page.locator('#auth-username').fill('aluno123')
        page.locator('#auth-email').fill('aluno@estudante.pt')
        page.locator('#auth-password').fill('senha123')

        # Click submit to register
        page.locator('#auth-submit-btn').click()

        # Verification form should now be visible
        verify_form = page.locator('#auth-verify-form')
        verify_form.wait_for(state="visible")

        # Try incorrect code first
        page.locator('#auth-verify-code').fill('0000')
        page.locator('#auth-verify-submit-btn').click()

        verify_error = page.locator('#auth-verify-error')
        verify_error.wait_for(state="visible")

        # Type correct code (mocked as '1234')
        page.locator('#auth-verify-code').fill('1234')
        page.locator('#auth-verify-submit-btn').click()

        # User profile card should now be visible with username and email
        user_card = page.locator('#profile-user-card')
        user_card.wait_for(state="visible")
        assert "@aluno123" in (page.locator('#profile-user-title').text_content() or "")
        assert "aluno@estudante.pt" in (page.locator('#profile-user-email').text_content() or "")

        browser.close()

    assert not page_errors, f"Erros de JS durante a verificação de conta: {page_errors}"


def test_pwa_meal_picker_xss_protection(pwa_server: str) -> None:
    page_errors: list[str] = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        page.on("pageerror", lambda err: page_errors.append(str(err)))
        page.goto(pwa_server, wait_until="networkidle")

        # Inject state and open meal picker with malicious dish payload
        malicious_name = '<img src=x onerror="window.__xss_executed=true">'
        page.evaluate(
            """(maliciousName) => {
            document.getElementById('menu-panel').hidden = false;
            document.getElementById('menu-content').hidden = false;
            state.selected = { id: 100, name: "Test Venue", address: "Rua Teste", city: "Ljubljana", additional_fee_eur: 3.5 };
            state.currentMenuDishes = [{ name: maliciousName, categories: ["Meat"] }];
            openVenueMealPicker();
        }""",
            malicious_name,
        )

        picker = page.locator('#venue-meal-picker')
        picker.wait_for(state="visible")

        # Verify XSS payload was NOT executed
        xss_executed = page.evaluate("() => window.__xss_executed || false")
        assert not xss_executed, "XSS payload executed in meal picker!"

        # Verify malicious name is safely rendered as plain text in span element, not HTML
        option_span = page.locator('#meal-picker-options label span').first
        assert option_span.text_content() == malicious_name
        assert page.locator('#meal-picker-options img').count() == 0

        browser.close()

    assert not page_errors, f"Erros de JS durante o teste de XSS: {page_errors}"


def test_pwa_mcp_desktop_page(pwa_server: str) -> None:
    page_errors: list[str] = []
    console_errors: list[str] = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Desktop viewport
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        page.on("pageerror", lambda err: page_errors.append(str(err)))
        page.on(
            "console",
            lambda msg: console_errors.append(f"[{msg.type}] {msg.text}")
            if msg.type == "error"
            else None,
        )

        page.goto(pwa_server, wait_until="networkidle")

        # Desktop nav should be visible on desktop viewport
        desktop_nav = page.locator('#desktop-nav')
        assert desktop_nav.is_visible()

        # Click the MCP nav button
        mcp_btn = page.locator('.desktop-nav-link[data-tab="mcp"]')
        assert mcp_btn.count() > 0
        mcp_btn.click()

        # MCP page should now be visible
        mcp_page = page.locator('#mcp-page')
        mcp_page.wait_for(state="visible")
        assert mcp_page.is_visible()

        # Check URL updated to /mcp
        assert "/mcp" in page.url

        # Check cloud URL input contains /api/mcp
        cloud_url_val = page.locator('#mcp-cloud-url').input_value()
        assert "/api/mcp" in cloud_url_val

        # Test direct URL load: navigate to /mcp directly
        page.goto(f"{pwa_server}/mcp", wait_until="networkidle")
        assert page.locator('#mcp-page').is_visible()

        browser.close()

    assert not page_errors, f"Erros de JS na página MCP: {page_errors}"
    assert not console_errors, f"Erros de console na página MCP: {console_errors}"


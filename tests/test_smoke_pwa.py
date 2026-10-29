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

        # Guests have exactly two visible destinations on each screen size.
        for selector in ('.desktop-nav-link', '.mobile-tab'):
            tabs = page.locator(selector)
            visible = [tab.get_attribute('data-tab') for tab in tabs.all() if tab.is_visible()]
            expected = ['explore', 'profile'] if selector == '.desktop-nav-link' else []
            assert visible == expected
        assert page.locator('.desktop-nav-link[data-tab="explore"]').text_content().strip() == 'Restaurantes'

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
        assert [tab.get_attribute('data-tab') for tab in page.locator('.mobile-tab').all() if tab.is_visible()] == ['explore', 'profile']
        page.locator('.mobile-tab[data-tab="profile"]').click()
        assert page.locator('#guest-benefits').is_visible()
        assert not page.locator('#profile-calendar-section').is_visible()

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
        assert not page.locator('#guest-benefits').is_visible()
        assert page.locator('.mobile-tab[data-tab="favorites"]').is_visible()
        assert page.locator('.mobile-tab[data-tab="draw"]').is_visible()

        page.locator('#profile-logout-btn').click()
        assert page.locator('#guest-benefits').is_visible()
        assert not page.locator('.mobile-tab[data-tab="favorites"]').is_visible()
        assert not page.locator('.mobile-tab[data-tab="draw"]').is_visible()

        browser.close()

    assert not page_errors, f"Erros de JS durante a verificação de conta: {page_errors}"


def test_guest_can_change_language_inside_menu(pwa_server: str) -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 390, "height": 844}, service_workers="block")
        page = context.new_page()
        page.route(
            "**/api/restaurants/101/menu?**",
            lambda route: route.fulfill(json={"date": "2026-10-29", "dishes": [{"name": "Juha"}]}),
        )
        page.goto(pwa_server, wait_until="networkidle")
        page.evaluate("openRestaurant({id: 101, name: 'Test Restaurant', address: 'Street', city: 'Ljubljana', additional_fee_eur: 3.5})")
        page.locator('.dish-card').wait_for(state="visible")
        assert page.locator('#menu-language-select').is_visible()
        assert not page.locator('#venue-fav-btn').is_visible()

        page.select_option('#menu-language-select', 'en')
        assert page.locator('#language-select').input_value() == 'en'
        assert page.locator('#menu-panel').is_visible()
        assert page.locator('#venue-name').text_content() == 'Test Restaurant'
        assert page.locator('.dish-card').is_visible()
        browser.close()


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
                setCurrentUser({username: 'member', email: 'member@example.com'});
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

        page.evaluate("setCurrentUser({username: 'member', email: 'member@example.com'})")

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


def test_pwa_mcp_language_switching(pwa_server: str) -> None:
    page_errors: list[str] = []
    console_errors: list[str] = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        page.on("pageerror", lambda err: page_errors.append(str(err)))
        page.on(
            "console",
            lambda msg: console_errors.append(f"[{msg.type}] {msg.text}")
            if msg.type == "error"
            else None,
        )

        page.goto(f"{pwa_server}/mcp", wait_until="networkidle")
        assert page.locator('#mcp-page').is_visible()

        # Switch to English
        page.select_option('#language-select', 'en')
        assert page.locator('#mcp-title').text_content() == 'Connect AI assistants'
        assert page.locator('#mcp-url-card-title').text_content() == 'MCP Server Address'
        assert page.locator('#mcp-copy-cloud-text').text_content() == 'Copy link'
        assert page.locator('#mcp-ping-btn').text_content() == 'Test connection'
        assert page.locator('#mcp-tab-universal').text_content() == 'Other AIs / HTTP'
        assert page.locator('#mcp-tools-title').text_content() == 'Included tools'
        assert '# Configuration for Gemini CLI / Projects:' in page.locator('#mcp-code-display').text_content()

        # Switch to German
        page.select_option('#language-select', 'de')
        assert page.locator('#mcp-title').text_content() == 'KI-Assistenten verbinden'
        assert page.locator('#mcp-url-card-title').text_content() == 'MCP-Server-Adresse'
        assert page.locator('#mcp-copy-cloud-text').text_content() == 'Link kopieren'
        assert page.locator('#mcp-ping-btn').text_content() == 'Verbindung testen'
        assert page.locator('#mcp-tab-universal').text_content() == 'Andere KIs / HTTP'
        assert '# Konfiguration für Gemini CLI / Projekte:' in page.locator('#mcp-code-display').text_content()

        # Switch to Spanish
        page.select_option('#language-select', 'es')
        assert page.locator('#mcp-title').text_content() == 'Conectar asistentes de IA'
        assert page.locator('#mcp-url-card-title').text_content() == 'Dirección del Servidor MCP'
        assert page.locator('#mcp-copy-cloud-text').text_content() == 'Copiar enlace'
        assert page.locator('#mcp-ping-btn').text_content() == 'Probar conexión'

        # Switch to French
        page.select_option('#language-select', 'fr')
        assert page.locator('#mcp-title').text_content() == 'Connecter des assistants IA'
        assert page.locator('#mcp-url-card-title').text_content() == 'Adresse du Serveur MCP'
        assert page.locator('#mcp-copy-cloud-text').text_content() == 'Copier le lien'
        assert page.locator('#mcp-ping-btn').text_content() == 'Tester la connexion'

        # Switch to Italian
        page.select_option('#language-select', 'it')
        assert page.locator('#mcp-title').text_content() == 'Connetti assistenti IA'
        assert page.locator('#mcp-url-card-title').text_content() == 'Indirizzo del Server MCP'
        assert page.locator('#mcp-copy-cloud-text').text_content() == 'Copia link'
        assert page.locator('#mcp-ping-btn').text_content() == 'Testa connessione'

        # Switch to Catalan
        page.select_option('#language-select', 'ca')
        assert page.locator('#mcp-title').text_content() == 'Connectar assistents d’IA'
        assert page.locator('#mcp-url-card-title').text_content() == 'Adreça del Servidor MCP'
        assert page.locator('#mcp-copy-cloud-text').text_content() == 'Copiar enllaç'
        assert page.locator('#mcp-ping-btn').text_content() == 'Provar connexió'

        # Switch back to Portuguese
        page.select_option('#language-select', 'pt')
        assert page.locator('#mcp-title').text_content() == 'Conectar assistentes de IA'
        assert page.locator('#mcp-url-card-title').text_content() == 'Endereço do Servidor MCP'
        assert page.locator('#mcp-copy-cloud-text').text_content() == 'Copiar link'
        assert page.locator('#mcp-ping-btn').text_content() == 'Testar conexão'
        assert '# Configuração para Gemini CLI / Projetos:' in page.locator('#mcp-code-display').text_content()

        # Switch client tabs and verify code snippet changes
        page.locator('#mcp-tab-claude').click()
        assert 'claude_desktop_config.json' in page.locator('#mcp-snippet-filename').text_content()
        assert 'bomboni.adapters.mcp.server' in page.locator('#mcp-code-display').text_content()

        page.locator('#mcp-tab-cursor').click()
        assert '.cursor/mcp.json' in page.locator('#mcp-snippet-filename').text_content()

        browser.close()

    assert not page_errors, f"Erros de JS na troca de idioma da página MCP: {page_errors}"
    assert not console_errors, f"Erros de console na troca de idioma da página MCP: {console_errors}"



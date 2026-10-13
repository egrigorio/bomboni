from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from mcp.server.transport_security import TransportSecuritySettings

from bomboni.adapters.mcp.server import create_server

server = create_server()

app = server.sse_app(
    sse_path="/api/mcp/sse",
    message_path="/api/mcp/messages/",
    transport_security=TransportSecuritySettings(enable_dns_rebinding_protection=False),
)

from __future__ import annotations

import json
import secrets
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from bomboni.adapters.web.server import send_verification_email
from bomboni.adapters.web.vercel_runtime import JsonHandler, send_json


class handler(JsonHandler):
    def do_POST(self) -> None:
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length < 1 or length > 20_000:
                raise ValueError("Request body is missing or too large.")
            payload = json.loads(self.rfile.read(length))
            email = payload.get("email")
            if not isinstance(email, str) or "@" not in email or len(email) < 3:
                raise ValueError("A valid email address is required.")
            clean_email = email.strip().lower()
            code = f"{secrets.randbelow(10000):04d}"
            send_verification_email(clean_email, code)
            send_json(self, 200, {
                "status": "sent",
                "email": clean_email,
                "code": code,
                "message": f"Verification code sent to {clean_email}",
            })
        except (ValueError, TypeError, json.JSONDecodeError) as exc:
            send_json(self, 400, {"error": str(exc)})
        except Exception as exc:
            send_json(self, 500, {"error": "Internal error sending verification code.", "detail": str(exc)})

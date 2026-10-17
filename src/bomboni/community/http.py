from __future__ import annotations

import json
import os
import re
import threading
from dataclasses import dataclass
from typing import Any, Callable, Mapping

from bomboni.community.service import CommunityError, CommunityService
from bomboni.community.store import store_from_environment

MAX_BODY_BYTES = 600_000


@dataclass
class Response:
    status: int
    body: bytes
    content_type: str = "application/json; charset=utf-8"
    cache: str = "no-store"


def _json(status: int, value: Any) -> Response:
    return Response(status, json.dumps(value, ensure_ascii=False).encode("utf-8"))


Route = Callable[..., Any]


class CommunityApi:
    """Routes ``/api/community/*`` requests to :class:`CommunityService`."""

    def __init__(self, service: CommunityService | None) -> None:
        self.service = service
        self._routes: list[tuple[str, re.Pattern[str], Route, bool]] = []
        s = service
        add = self._add
        add("GET", r"/status", lambda **_: {"enabled": s is not None}, auth=False)
        if s is None:
            return
        add("POST", r"/auth/signup", lambda body, **_: s.request_signup(body), auth=False)
        add("POST", r"/auth/verify", lambda body, **_: s.verify_signup(body), auth=False)
        add("POST", r"/auth/login", lambda body, **_: s.login(body), auth=False)
        add("POST", r"/auth/logout", lambda token, **_: s.logout(token), auth=False)
        add("GET", r"/me", lambda user, **_: {"user": s.public_user(user, private=True), "recap": s.recap(user)})
        add("POST", r"/me", lambda user, body, **_: s.update_me(user, body))
        add("POST", r"/import", lambda user, body, **_: s.import_local(user, body))
        add("GET", r"/summaries", lambda query, **_: s.restaurant_summaries(query.get("ids", "").split(",")), auth=False)
        add("GET", r"/restaurants/(?P<rid>[^/]+)", lambda rid, viewer, **_: s.restaurant_detail(rid, viewer), auth=False)
        add("POST", r"/reviews", lambda user, body, **_: s.save_review(user, body))
        add("DELETE", r"/reviews/(?P<rid>[^/]+)", lambda user, rid, **_: s.delete_review(user, rid))
        add("POST", r"/reviews/(?P<review_id>[^/]+)/helpful", lambda user, review_id, **_: s.toggle_helpful(user, review_id))
        add("POST", r"/dishes/vote", lambda user, body, **_: s.vote_dish(user, body))
        add(
            "POST",
            r"/dishes/stats",
            lambda body, viewer, **_: s.dish_stats(str(body.get("restaurant_id") or ""), [d for d in body.get("dishes") or [] if isinstance(d, str)], viewer),
            auth=False,
        )
        add("POST", r"/photos", lambda user, body, **_: s.add_photo(user, body))
        add("GET", r"/photos/(?P<photo_id>[^/]+)", self._photo, auth=False, raw=True)
        add("DELETE", r"/photos/(?P<photo_id>[^/]+)", lambda user, photo_id, **_: s.delete_photo(user, photo_id))
        add("POST", r"/checkins", lambda user, body, **_: s.checkin(user, body))
        add("DELETE", r"/checkins", lambda user, query, **_: s.delete_checkin(user, query.get("restaurant_id", ""), query.get("day", "")))
        add("POST", r"/queue", lambda user, body, **_: s.report_queue(user, body))
        add("GET", r"/users", lambda query, **_: s.search_users(query.get("q", "")), auth=False)
        add("GET", r"/users/(?P<username>[^/]+)", lambda username, viewer, **_: s.profile(username, viewer), auth=False)
        add("POST", r"/users/(?P<username>[^/]+)/follow", lambda user, username, **_: s.follow(user, username, follow=True))
        add("DELETE", r"/users/(?P<username>[^/]+)/follow", lambda user, username, **_: s.follow(user, username, follow=False))
        add("GET", r"/meetups", lambda query, viewer, **_: {"results": s.list_meetups(viewer, city=query.get("city") or None)}, auth=False)
        add("POST", r"/meetups", lambda user, body, **_: s.create_meetup(user, body))
        add("POST", r"/meetups/(?P<mid>[^/]+)/join", lambda user, mid, **_: s.join_meetup(user, mid, join=True))
        add("DELETE", r"/meetups/(?P<mid>[^/]+)/join", lambda user, mid, **_: s.join_meetup(user, mid, join=False))
        add("GET", r"/lists", lambda query, **_: {"results": s.recent_lists(query.get("city") or None)}, auth=False)
        add("POST", r"/lists", lambda user, body, **_: s.create_list(user, body))
        add("GET", r"/lists/(?P<lid>[^/]+)", lambda lid, viewer, **_: s.get_list(lid, viewer), auth=False)
        add("DELETE", r"/lists/(?P<lid>[^/]+)", lambda user, lid, **_: s.delete_list(user, lid))
        add("POST", r"/lists/(?P<lid>[^/]+)/items", lambda user, lid, body, **_: s.set_list_item(user, lid, body, add=True))
        add("POST", r"/lists/(?P<lid>[^/]+)/items/remove", lambda user, lid, body, **_: s.set_list_item(user, lid, body, add=False))
        add("POST", r"/questions", lambda user, body, **_: s.ask(user, body))
        add("POST", r"/questions/(?P<qid>[^/]+)/answers", lambda user, qid, body, **_: s.answer(user, qid, body))
        add("POST", r"/reports", lambda user, body, **_: s.report(user, body))
        add(
            "GET",
            r"/feed",
            lambda query, viewer, **_: s.feed(viewer, city=query.get("city") or None, following=query.get("following") == "1"),
            auth=False,
        )
        add("GET", r"/leaderboard", lambda query, **_: s.leaderboard(faculty=query.get("faculty") or None, city=query.get("city") or None), auth=False)

    def _add(self, method: str, pattern: str, handler: Route, *, auth: bool = True, raw: bool = False) -> None:
        self._routes.append((method, re.compile(f"^{pattern}/?$"), handler, auth, raw))  # type: ignore[arg-type]

    def _photo(self, photo_id: str, **_: Any) -> Response:
        assert self.service is not None
        found = self.service.photo(photo_id)
        if not found:
            return _json(404, {"error": "not_found"})
        mime, data = found
        return Response(200, data, mime, "public, max-age=31536000, immutable")

    def handle(self, method: str, path: str, query: Mapping[str, str], body: bytes, headers: Mapping[str, str]) -> Response:
        path = "/" + path.strip("/")
        token = None
        authorization = headers.get("Authorization") or headers.get("authorization") or ""
        if authorization.lower().startswith("bearer "):
            token = authorization[7:].strip() or None
        for route_method, pattern, handler, needs_auth, raw in self._routes:  # type: ignore[misc]
            match = pattern.match(path)
            if not match or route_method != method:
                continue
            try:
                if self.service is None and path != "/status":
                    return _json(503, {"error": "community_disabled", "enabled": False})
                payload: dict[str, Any] = {}
                if body:
                    if len(body) > MAX_BODY_BYTES:
                        raise CommunityError(413, "Request body is too large.")
                    parsed = json.loads(body)
                    if not isinstance(parsed, dict):
                        raise CommunityError(400, "Request body must be a JSON object.")
                    payload = parsed
                viewer = self.service.user_for_token(token) if self.service else None
                if needs_auth and not viewer:
                    return _json(401, {"error": "auth_required"})
                result = handler(body=payload, query=dict(query), user=viewer, viewer=viewer, token=token, **match.groupdict())
                return result if raw else _json(200, result)
            except CommunityError as exc:
                return _json(exc.status, {"error": exc.message})
            except (json.JSONDecodeError, UnicodeDecodeError):
                return _json(400, {"error": "Invalid JSON body."})
        if self.service is None and path != "/status":
            return _json(503, {"error": "community_disabled", "enabled": False})
        return _json(404, {"error": "not_found"})


_api: CommunityApi | None = None
_api_lock = threading.Lock()


def community_api() -> CommunityApi:
    """Lazily build the API from environment configuration (one per process / warm function)."""
    global _api
    with _api_lock:
        if _api is None:
            from bomboni.adapters.web.server import send_verification_email

            store = store_from_environment()
            dev_mode = store is not None and store.kind == "sqlite" and not os.environ.get("VERCEL")
            service = CommunityService(store, send_email=send_verification_email, dev_mode=dev_mode) if store else None
            _api = CommunityApi(service)
        return _api

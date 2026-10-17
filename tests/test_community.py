from __future__ import annotations

import base64
import json
import time

import pytest

from bomboni.community.http import CommunityApi
from bomboni.community.service import CommunityService, hash_password, today_local, verify_password
from bomboni.community.store import Store

RESTAURANT = {"id": "r1", "name": "Menza Rožna", "city": "Ljubljana"}
PIXEL = "data:image/png;base64," + base64.b64encode(b"\x89PNG\r\n\x1a\n" + b"0" * 32).decode()


class Client:
    def __init__(self, *, delivered: bool = False, dev_mode: bool = True) -> None:
        self.sent: list[tuple[str, str]] = []

        def send(email: str, code: str) -> bool:
            self.sent.append((email, code))
            return delivered

        self.api = CommunityApi(CommunityService(Store(), send_email=send, dev_mode=dev_mode))

    def call(self, method: str, path: str, body: dict | None = None, *, token: str | None = None, query: dict | None = None):
        headers = {"Authorization": f"Bearer {token}"} if token else {}
        raw = json.dumps(body).encode() if body is not None else b""
        response = self.api.handle(method, path, query or {}, raw, headers)
        payload = json.loads(response.body) if response.content_type.startswith("application/json") else response.body
        return response.status, payload

    def signup(self, username: str) -> str:
        status, data = self.call("POST", "/auth/signup", {"email": f"{username}@uni.si", "username": username, "password": "secret1"})
        assert status == 200, data
        status, data = self.call("POST", "/auth/verify", {"email": f"{username}@uni.si", "code": self.sent[-1][1]})
        assert status == 200, data
        return data["token"]


@pytest.fixture()
def client() -> Client:
    return Client()


def test_disabled_without_store() -> None:
    api = CommunityApi(None)
    assert json.loads(api.handle("GET", "/status", {}, b"", {}).body) == {"enabled": False}
    assert api.handle("GET", "/feed", {}, b"", {}).status == 503


def test_password_hashing_round_trip() -> None:
    stored = hash_password("secret1")
    assert "secret1" not in stored
    assert verify_password("secret1", stored)
    assert not verify_password("wrong", stored)


def test_signup_hides_code_once_email_is_delivered() -> None:
    delivered = Client(delivered=True)
    status, data = delivered.call("POST", "/auth/signup", {"email": "a@uni.si", "username": "ana", "password": "secret1"})
    assert status == 200 and "dev_code" not in data and "code" not in data

    production = Client(delivered=False, dev_mode=False)
    status, data = production.call("POST", "/auth/signup", {"email": "a@uni.si", "username": "ana", "password": "secret1"})
    assert status == 503 and data["error"] == "email_unavailable"


def test_signup_verification_limits_attempts(client: Client) -> None:
    client.call("POST", "/auth/signup", {"email": "a@uni.si", "username": "ana", "password": "secret1"})
    code = client.sent[-1][1]
    wrong = "0000" if code != "0000" else "1111"
    for _ in range(5):
        assert client.call("POST", "/auth/verify", {"email": "a@uni.si", "code": wrong})[0] == 400
    status, data = client.call("POST", "/auth/verify", {"email": "a@uni.si", "code": code})
    assert status == 400 and data["error"] == "code_expired"


def test_login_logout_and_duplicate_usernames(client: Client) -> None:
    token = client.signup("ana")
    assert client.call("GET", "/me", token=token)[1]["user"]["username"] == "ana"
    assert client.call("POST", "/auth/signup", {"email": "b@uni.si", "username": "ANA", "password": "secret1"})[0] == 409
    assert client.call("POST", "/auth/login", {"identifier": "ana", "password": "bad"})[0] == 401
    status, data = client.call("POST", "/auth/login", {"identifier": "@ana", "password": "secret1"})
    assert status == 200
    client.call("POST", "/auth/logout", token=data["token"])
    assert client.call("GET", "/me", token=data["token"])[0] == 401


def test_reviews_helpful_votes_and_summary(client: Client) -> None:
    ana, bob = client.signup("ana"), client.signup("bob")
    client.call("POST", "/reviews", {"restaurant": RESTAURANT, "rating": 4, "taste": 5, "portion": 3, "comment": "Boa sopa"}, token=ana)
    client.call("POST", "/reviews", {"restaurant": RESTAURANT, "rating": 2, "value": 1}, token=bob)
    client.call("POST", "/reviews", {"restaurant": RESTAURANT, "rating": 5, "taste": 5}, token=ana)  # updates, not duplicates

    detail = client.call("GET", "/restaurants/r1", token=bob)[1]
    assert detail["summary"]["reviews"] == 2 and detail["summary"]["rating"] == 3.5
    assert detail["summary"]["aspects"]["taste"] == 5.0
    ana_review = next(r for r in detail["reviews"] if r["username"] == "ana")
    assert client.call("POST", f"/reviews/{ana_review['id']}/helpful", token=bob)[1] == {"voted": True, "helpful": 1}
    assert client.call("POST", f"/reviews/{ana_review['id']}/helpful", token=ana)[0] == 400
    assert client.call("POST", "/reviews", {"restaurant": RESTAURANT, "rating": 9}, token=ana)[0] == 400


def test_dish_votes_photos_and_checkins(client: Client) -> None:
    ana, bob = client.signup("ana"), client.signup("bob")
    client.call("POST", "/dishes/vote", {"restaurant_id": "r1", "dish": "Goveji  golaž", "vote": 1}, token=ana)
    client.call("POST", "/dishes/vote", {"restaurant_id": "r1", "dish": "goveji golaž", "vote": -1}, token=bob)
    status, photo = client.call("POST", "/photos", {"restaurant": RESTAURANT, "dish": "Goveji golaž", "image": PIXEL}, token=ana)
    assert status == 200
    stats = client.call("POST", "/dishes/stats", {"restaurant_id": "r1", "dishes": ["Goveji golaž"]}, token=bob)[1]["results"]["goveji golaž"]
    assert (stats["up"], stats["down"], stats["mine"], stats["photos"]) == (1, 1, -1, [photo["id"]])

    status, image = client.call("GET", f"/photos/{photo['id']}")
    assert status == 200 and image.startswith(b"\x89PNG")
    assert client.call("POST", "/photos", {"restaurant": RESTAURANT, "image": "data:text/html;base64,PGI+"}, token=ana)[0] == 400

    client.call("POST", "/checkins", {"restaurant": RESTAURANT, "dish": "Golaž", "fee": 2.5}, token=ana)
    client.call("POST", "/checkins", {"restaurant": RESTAURANT}, token=ana)  # same day is idempotent
    client.call("POST", "/queue", {"restaurant_id": "r1", "level": 3}, token=bob)
    summary = client.call("GET", "/summaries", query={"ids": "r1,r2"})[1]["results"]
    assert summary["r1"]["checkins_today"] == 1 and summary["r1"]["queue"]["level"] == 3
    assert summary["r2"] == {"rating": None, "reviews": 0, "checkins_today": 0, "queue": None}


def test_follow_profile_privacy_feed_and_friends(client: Client) -> None:
    ana, bob = client.signup("ana"), client.signup("bob")
    client.call("POST", "/checkins", {"restaurant": RESTAURANT}, token=ana)
    client.call("POST", "/reviews", {"restaurant": RESTAURANT, "rating": 4, "comment": "Fixe"}, token=ana)
    assert client.call("POST", "/users/ana/follow", token=bob)[1] == {"following": True}
    assert client.call("POST", "/users/bob/follow", token=bob)[0] == 400

    assert client.call("GET", "/restaurants/r1", token=bob)[1]["friends_recent"] == ["ana"]
    feed = client.call("GET", "/feed", query={"following": "1"}, token=bob)[1]
    assert {item["type"] for item in feed["items"]} == {"checkin", "review"}
    assert feed["trending"][0]["checkins"] == 1

    client.call("POST", "/me", {"is_private": True, "faculty": "FRI"}, token=ana)
    stranger = client.signup("cyd")
    assert client.call("GET", "/users/ana", token=stranger)[1]["visible"] is False
    assert client.call("GET", "/users/ana", token=bob)[1]["visible"] is True
    assert client.call("GET", "/feed")[1]["items"] == []
    assert [u["username"] for u in client.call("GET", "/users", query={"q": "an"})[1]["results"]] == ["ana"]


def test_meetups_lists_questions_and_reports(client: Client) -> None:
    ana, bob, cyd, dia = (client.signup(name) for name in ("ana", "bob", "cyd", "dia"))
    starts = int(time.time() * 1000) + 3_600_000
    meetup = client.call("POST", "/meetups", {"restaurant": RESTAURANT, "starts_at": starts, "note": "Mesa ao fundo"}, token=ana)[1]
    client.call("POST", f"/meetups/{meetup['id']}/join", token=bob)
    listed = client.call("GET", "/meetups", token=bob)[1]["results"][0]
    assert listed["members"] == ["ana", "bob"] and listed["joined"] is True
    assert client.call("POST", "/meetups", {"restaurant": RESTAURANT, "starts_at": 1}, token=ana)[0] == 400

    created = client.call("POST", "/lists", {"title": "Vegetarianos", "city": "Ljubljana"}, token=ana)[1]
    assert client.call("POST", f"/lists/{created['id']}/items", {"restaurant": RESTAURANT, "note": "Rižota"}, token=bob)[0] == 404
    detail = client.call("POST", f"/lists/{created['id']}/items", {"restaurant": RESTAURANT, "note": "Rižota"}, token=ana)[1]
    assert detail["items"][0]["note"] == "Rižota"
    assert client.call("GET", "/restaurants/r1")[1]["lists"][0]["title"] == "Vegetarianos"

    question = client.call("POST", "/questions", {"restaurant_id": "r1", "body": "Aceitam boni ao sábado?"}, token=bob)[1]
    client.call("POST", f"/questions/{question['id']}/answers", {"body": "Sim"}, token=ana)
    assert client.call("GET", "/restaurants/r1")[1]["questions"][0]["answers"][0]["body"] == "Sim"

    review = client.call("POST", "/reviews", {"restaurant": RESTAURANT, "rating": 1, "comment": "spam"}, token=ana)[1]
    for token in (bob, cyd, dia):
        client.call("POST", "/reports", {"type": "review", "id": review["id"]}, token=token)
    assert client.call("GET", "/restaurants/r1")[1]["reviews"] == []


def test_badges_streak_leaderboard_recap_and_import(client: Client) -> None:
    ana = client.signup("ana")
    today = today_local()
    imported = client.call(
        "POST",
        "/import",
        {
            "reviews": [{"restaurant": RESTAURANT, "rating": 5}],
            "checkins": [{"restaurant": {"id": f"r{i}", "name": f"R{i}", "city": "Ljubljana"}, "day": today.isoformat(), "fee": 2} for i in range(10)],
        },
        token=ana,
    )[1]
    assert imported == {"reviews": 1, "checkins": 10}
    profile = client.call("GET", "/users/ana", token=ana)[1]
    badges = {badge["id"]: badge for badge in profile["badges"]}
    assert badges["explorer"]["earned"] and badges["pioneer"]["earned"] and not badges["critic"]["earned"]
    assert profile["streak"] == 1
    board = client.call("GET", "/leaderboard")[1]["results"]
    assert board[0] == {"username": "ana", "faculty": "", "points": 13}
    recap = client.call("GET", "/me", token=ana)[1]["recap"]
    assert recap["meals"] == 10 and recap["places"] == 10 and recap["spent"] == 20.0


def test_requires_auth_and_handles_bad_json(client: Client) -> None:
    assert client.call("POST", "/reviews", {"restaurant": RESTAURANT, "rating": 4})[0] == 401
    response = client.api.handle("POST", "/auth/login", {}, b"{not json", {})
    assert response.status == 400
    assert client.call("GET", "/nope")[0] == 404

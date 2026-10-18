from __future__ import annotations

import base64
import binascii
import hashlib
import hmac
import re
import secrets
import time
from datetime import date, datetime, timedelta
from typing import Any, Callable

try:
    from zoneinfo import ZoneInfo

    _LJUBLJANA: Any = ZoneInfo("Europe/Ljubljana")
except Exception:  # pragma: no cover - zoneinfo data missing
    _LJUBLJANA = None

from bomboni.community.store import Store

SESSION_DAYS = 90
CODE_MINUTES = 10
MAX_CODE_ATTEMPTS = 5
REPORTS_TO_HIDE = 3
QUEUE_MINUTES = 30
MAX_PHOTO_CHARS = 450_000
PHOTO_TYPES = {"image/jpeg", "image/png", "image/webp"}
USERNAME_RE = re.compile(r"^[A-Za-z0-9_.]{3,24}$")
DAY_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
REPORTABLE = {"review": "reviews", "photo": "photos", "meetup": "meetups", "list": "lists", "question": "questions", "answer": "answers"}
# Points per action for the monthly leaderboard.
POINTS = {"checkin": 1, "review": 3, "photo": 2, "helpful": 1}
HOURLY_LIMITS = {"reviews": 20, "photos": 20, "meetups": 10, "lists": 10, "questions": 20, "answers": 40}


class CommunityError(Exception):
    def __init__(self, status: int, message: str) -> None:
        super().__init__(message)
        self.status = status
        self.message = message


def _now() -> int:
    return int(time.time() * 1000)


def _new_id() -> str:
    return secrets.token_urlsafe(12)


def _sha(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def _num(value: Any, default: float = 0.0) -> float:
    return float(value) if value is not None else default


def today_local() -> date:
    return datetime.now(_LJUBLJANA).date() if _LJUBLJANA else date.today()


def dish_key(name: str) -> str:
    return " ".join(name.lower().split())[:200]


PBKDF2_ITERATIONS = 240_000


def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, PBKDF2_ITERATIONS)
    return f"pbkdf2_sha256${PBKDF2_ITERATIONS}${salt.hex()}${digest.hex()}"


def verify_password(password: str, stored: str) -> bool:
    try:
        _, iterations, salt_hex, digest_hex = stored.split("$")
        digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), bytes.fromhex(salt_hex), int(iterations))
        return hmac.compare_digest(digest.hex(), digest_hex)
    except (ValueError, TypeError):
        return False


def _text(value: Any, field: str, *, max_length: int, required: bool = False) -> str:
    if value is None:
        value = ""
    if not isinstance(value, str):
        raise CommunityError(400, f"{field} must be text.")
    clean = " ".join(value.split()) if "\n" not in value else value.strip()
    if required and not clean:
        raise CommunityError(400, f"{field} is required.")
    if len(clean) > max_length:
        raise CommunityError(400, f"{field} must have at most {max_length} characters.")
    return clean


def _restaurant(payload: dict[str, Any]) -> dict[str, str]:
    restaurant = payload.get("restaurant") or {}
    if not isinstance(restaurant, dict):
        raise CommunityError(400, "restaurant is required.")
    return {
        "id": _text(str(restaurant.get("id") or ""), "restaurant.id", max_length=80, required=True),
        "name": _text(restaurant.get("name"), "restaurant.name", max_length=160, required=True),
        "city": _text(restaurant.get("city"), "restaurant.city", max_length=80),
    }


def _rating(value: Any, field: str, *, required: bool = False) -> int | None:
    if value in (None, "") and not required:
        return None
    try:
        rating = int(value)
    except (TypeError, ValueError):
        raise CommunityError(400, f"{field} must be between 1 and 5.") from None
    if not 1 <= rating <= 5:
        raise CommunityError(400, f"{field} must be between 1 and 5.")
    return rating


def semester_range(today: date) -> tuple[date, date, str]:
    """Slovenian academic semesters: winter Oct–Feb, summer Mar–Sep."""
    if today.month >= 10:
        return date(today.year, 10, 1), date(today.year + 1, 2, 28), f"{today.year}/{today.year + 1} · inverno"
    if today.month <= 2:
        return date(today.year - 1, 10, 1), date(today.year, 2, 28), f"{today.year - 1}/{today.year} · inverno"
    return date(today.year, 3, 1), date(today.year, 9, 30), f"{today.year - 1}/{today.year} · verão"


class CommunityService:
    def __init__(self, store: Store, *, send_email: Callable[[str, str], bool], dev_mode: bool = False, verify_email: bool = True) -> None:
        self.store = store
        self._send_email = send_email
        self._dev_mode = dev_mode
        # False while no email service is configured: accounts are created at once, marked unverified.
        self._verify_email = verify_email

    # ------------------------------------------------------------------ auth
    def user_for_token(self, token: str | None) -> dict[str, Any] | None:
        if not token:
            return None
        row = self.store.one(
            "SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?",
            (_sha(token), _now()),
        )
        return row

    def _session(self, user: dict[str, Any]) -> dict[str, Any]:
        token = secrets.token_urlsafe(32)
        self.store.run(
            "INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)",
            (_sha(token), user["id"], _now() + SESSION_DAYS * 86_400_000),
        )
        return {"token": token, "user": self.public_user(user, private=True)}

    @staticmethod
    def public_user(user: dict[str, Any], *, private: bool = False) -> dict[str, Any]:
        data = {
            "username": user["username"],
            "bio": user.get("bio") or "",
            "faculty": user.get("faculty") or "",
            "city": user.get("city") or "",
            "is_private": bool(user.get("is_private")),
        }
        if private:
            data["email"] = user["email"]
        return data

    def request_signup(self, payload: dict[str, Any]) -> dict[str, Any]:
        email = _text(payload.get("email"), "email", max_length=200, required=True).lower()
        username = _text(payload.get("username"), "username", max_length=24, required=True).lstrip("@")
        password = payload.get("password")
        if "@" not in email or "." not in email.split("@")[-1]:
            raise CommunityError(400, "A valid email address is required.")
        if not USERNAME_RE.match(username):
            raise CommunityError(400, "username must have 3-24 letters, numbers, dots or underscores.")
        if not isinstance(password, str) or len(password) < 6 or len(password) > 200:
            raise CommunityError(400, "password must have at least 6 characters.")
        if self.store.one("SELECT id FROM users WHERE email = ?", (email,)):
            raise CommunityError(409, "email_taken")
        if self.store.one("SELECT id FROM users WHERE username_lower = ?", (username.lower(),)):
            raise CommunityError(409, "username_taken")
        if not self._verify_email:
            return {"status": "created", **self._create_user(email, username, hash_password(password), verified=False)}
        code = f"{secrets.randbelow(10000):04d}"
        self.store.run("DELETE FROM pending_signups WHERE email = ?", (email,))
        self.store.run(
            "INSERT INTO pending_signups (email, username, password_hash, code_hash, attempts, expires_at) VALUES (?, ?, ?, ?, 0, ?)",
            (email, username, hash_password(password), _sha(f"{email}:{code}"), _now() + CODE_MINUTES * 60_000),
        )
        delivered = self._send_email(email, code)
        if not delivered and not self._dev_mode:
            raise CommunityError(503, "email_unavailable")
        result: dict[str, Any] = {"status": "sent", "email": email}
        if not delivered:
            # Local development without SMTP: surface the code so sign-up can be tested.
            result["dev_code"] = code
        return result

    def verify_signup(self, payload: dict[str, Any]) -> dict[str, Any]:
        email = _text(payload.get("email"), "email", max_length=200, required=True).lower()
        code = _text(payload.get("code"), "code", max_length=8, required=True)
        pending = self.store.one("SELECT * FROM pending_signups WHERE email = ?", (email,))
        if not pending or pending["expires_at"] < _now() or pending["attempts"] >= MAX_CODE_ATTEMPTS:
            raise CommunityError(400, "code_expired")
        if not hmac.compare_digest(pending["code_hash"], _sha(f"{email}:{code}")):
            self.store.run("UPDATE pending_signups SET attempts = attempts + 1 WHERE email = ?", (email,))
            raise CommunityError(400, "code_invalid")
        if self.store.one("SELECT id FROM users WHERE username_lower = ? OR email = ?", (pending["username"].lower(), email)):
            raise CommunityError(409, "username_taken")
        self.store.run("DELETE FROM pending_signups WHERE email = ?", (email,))
        return self._create_user(email, pending["username"], pending["password_hash"], verified=True)

    def _create_user(self, email: str, username: str, password_hash: str, *, verified: bool) -> dict[str, Any]:
        user = {
            "id": _new_id(),
            "email": email,
            "username": username,
            "password_hash": password_hash,
            "bio": "",
            "faculty": "",
            "city": "",
            "is_private": 0,
            "created_at": _now(),
        }
        self.store.run(
            "INSERT INTO users (id, email, username, username_lower, password_hash, email_verified, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (user["id"], email, username, username.lower(), password_hash, 1 if verified else 0, user["created_at"]),
        )
        return self._session(user)

    def login(self, payload: dict[str, Any]) -> dict[str, Any]:
        identifier = _text(payload.get("identifier"), "identifier", max_length=200, required=True).lower().lstrip("@")
        password = payload.get("password") or ""
        user = self.store.one("SELECT * FROM users WHERE email = ? OR username_lower = ?", (identifier, identifier))
        if not user or not verify_password(str(password), user["password_hash"]):
            raise CommunityError(401, "invalid_credentials")
        return self._session(user)

    def logout(self, token: str | None) -> dict[str, Any]:
        if token:
            self.store.run("DELETE FROM sessions WHERE token_hash = ?", (_sha(token),))
        return {"status": "ok"}

    def update_me(self, user: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        bio = _text(payload.get("bio", user.get("bio")), "bio", max_length=160)
        faculty = _text(payload.get("faculty", user.get("faculty")), "faculty", max_length=80)
        city = _text(payload.get("city", user.get("city")), "city", max_length=80)
        is_private = 1 if payload.get("is_private", user.get("is_private")) else 0
        self.store.run(
            "UPDATE users SET bio = ?, faculty = ?, city = ?, is_private = ? WHERE id = ?",
            (bio, faculty, city, is_private, user["id"]),
        )
        user = {**user, "bio": bio, "faculty": faculty, "city": city, "is_private": is_private}
        return {"user": self.public_user(user, private=True)}

    # ------------------------------------------------------------ moderation
    def _rate_limit(self, user: dict[str, Any], table: str) -> None:
        count = self.store.value(
            f"SELECT COUNT(*) AS n FROM {table} WHERE user_id = ? AND created_at > ?",
            (user["id"], _now() - 3_600_000),
        )
        if int(count or 0) >= HOURLY_LIMITS[table]:
            raise CommunityError(429, "rate_limited")

    def report(self, user: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        target_type = payload.get("type")
        target_id = _text(payload.get("id"), "id", max_length=80, required=True)
        if target_type not in REPORTABLE:
            raise CommunityError(400, "Unknown content type.")
        table = REPORTABLE[target_type]
        if not self.store.one(f"SELECT id FROM {table} WHERE id = ?", (target_id,)):
            raise CommunityError(404, "not_found")
        self.store.run(
            "INSERT INTO reports (target_type, target_id, user_id, reason, created_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT DO NOTHING",
            (target_type, target_id, user["id"], _text(payload.get("reason"), "reason", max_length=200), _now()),
        )
        reports = int(self.store.value("SELECT COUNT(*) AS n FROM reports WHERE target_type = ? AND target_id = ?", (target_type, target_id)) or 0)
        if reports >= REPORTS_TO_HIDE:
            self.store.run(f"UPDATE {table} SET hidden = 1 WHERE id = ?", (target_id,))
        return {"status": "reported"}

    def _delete_own(self, user: dict[str, Any], table: str, item_id: str) -> dict[str, Any]:
        if self.store.run(f"DELETE FROM {table} WHERE id = ? AND user_id = ?", (item_id, user["id"])) < 1:
            raise CommunityError(404, "not_found")
        return {"status": "deleted"}

    # ------------------------------------------------------- restaurant data
    def restaurant_summaries(self, ids: list[str]) -> dict[str, Any]:
        ids = [value for value in dict.fromkeys(ids) if value][:200]
        if not ids:
            return {"results": {}}
        marks = ",".join("?" for _ in ids)
        today = today_local().isoformat()
        results: dict[str, dict[str, Any]] = {rid: {"rating": None, "reviews": 0, "checkins_today": 0, "queue": None} for rid in ids}
        for row in self.store.all(
            f"SELECT restaurant_id, AVG(rating) AS avg, COUNT(*) AS n FROM reviews WHERE hidden = 0 AND restaurant_id IN ({marks}) GROUP BY restaurant_id",
            ids,
        ):
            results[row["restaurant_id"]].update(rating=round(_num(row["avg"]), 1), reviews=int(row["n"]))
        for row in self.store.all(
            f"SELECT restaurant_id, COUNT(*) AS n FROM checkins WHERE day = ? AND restaurant_id IN ({marks}) GROUP BY restaurant_id",
            [today, *ids],
        ):
            results[row["restaurant_id"]]["checkins_today"] = int(row["n"])
        for row in self.store.all(
            f"SELECT restaurant_id, AVG(level) AS avg, COUNT(*) AS n FROM queue_reports WHERE created_at > ? AND restaurant_id IN ({marks}) GROUP BY restaurant_id",
            [_now() - QUEUE_MINUTES * 60_000, *ids],
        ):
            results[row["restaurant_id"]]["queue"] = {"level": max(1, min(3, round(_num(row["avg"])))), "reports": int(row["n"])}
        return {"results": results}

    def restaurant_detail(self, restaurant_id: str, viewer: dict[str, Any] | None) -> dict[str, Any]:
        summary = self.restaurant_summaries([restaurant_id])["results"][restaurant_id]
        aspects = self.store.one(
            "SELECT AVG(taste) AS taste, AVG(portion) AS portion, AVG(value) AS value, AVG(wait) AS wait FROM reviews WHERE hidden = 0 AND restaurant_id = ?",
            (restaurant_id,),
        ) or {}
        summary["aspects"] = {key: (round(_num(aspects.get(key)), 1) if aspects.get(key) is not None else None) for key in ("taste", "portion", "value", "wait")}
        friends: list[str] = []
        if viewer:
            friends = [
                row["username"]
                for row in self.store.all(
                    "SELECT DISTINCT u.username FROM checkins c JOIN follows f ON f.followee_id = c.user_id JOIN users u ON u.id = c.user_id "
                    "WHERE f.follower_id = ? AND c.restaurant_id = ? AND c.day >= ?",
                    (viewer["id"], restaurant_id, (today_local() - timedelta(days=7)).isoformat()),
                )
            ]
        return {
            "summary": summary,
            "friends_recent": friends,
            "reviews": self.list_reviews(restaurant_id, viewer),
            "photos": self.list_photos(restaurant_id),
            "questions": self.list_questions(restaurant_id),
            "meetups": self.list_meetups(viewer, restaurant_id=restaurant_id),
            "lists": self.lists_with_restaurant(restaurant_id),
            "my_queue": self._my_queue(restaurant_id, viewer),
        }

    def _my_queue(self, restaurant_id: str, viewer: dict[str, Any] | None) -> int | None:
        if not viewer:
            return None
        row = self.store.one(
            "SELECT level FROM queue_reports WHERE restaurant_id = ? AND user_id = ? AND created_at > ?",
            (restaurant_id, viewer["id"], _now() - QUEUE_MINUTES * 60_000),
        )
        return int(row["level"]) if row else None

    # --------------------------------------------------------------- reviews
    def save_review(self, user: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        restaurant = _restaurant(payload)
        rating = _rating(payload.get("rating"), "rating", required=True)
        aspects = {key: _rating(payload.get(key), key) for key in ("taste", "portion", "value", "wait")}
        comment = _text(payload.get("comment"), "comment", max_length=300)
        existing = self.store.one("SELECT id FROM reviews WHERE restaurant_id = ? AND user_id = ?", (restaurant["id"], user["id"]))
        if existing:
            self.store.run(
                "UPDATE reviews SET rating = ?, taste = ?, portion = ?, value = ?, wait = ?, comment = ?, restaurant_name = ?, city = ?, created_at = ? WHERE id = ?",
                (rating, aspects["taste"], aspects["portion"], aspects["value"], aspects["wait"], comment, restaurant["name"], restaurant["city"], _now(), existing["id"]),
            )
            return {"id": existing["id"], "status": "updated"}
        self._rate_limit(user, "reviews")
        review_id = _new_id()
        self.store.run(
            "INSERT INTO reviews (id, restaurant_id, restaurant_name, city, user_id, rating, taste, portion, value, wait, comment, created_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (review_id, restaurant["id"], restaurant["name"], restaurant["city"], user["id"], rating, aspects["taste"], aspects["portion"], aspects["value"], aspects["wait"], comment, _now()),
        )
        return {"id": review_id, "status": "created"}

    def delete_review(self, user: dict[str, Any], restaurant_id: str) -> dict[str, Any]:
        self.store.run("DELETE FROM reviews WHERE restaurant_id = ? AND user_id = ?", (restaurant_id, user["id"]))
        return {"status": "deleted"}

    def list_reviews(self, restaurant_id: str, viewer: dict[str, Any] | None, *, limit: int = 30) -> list[dict[str, Any]]:
        rows = self.store.all(
            "SELECT r.*, u.username, (SELECT COUNT(*) FROM review_votes v WHERE v.review_id = r.id) AS helpful, "
            "(SELECT COUNT(*) FROM reviews r2 WHERE r2.restaurant_id = r.restaurant_id AND r2.created_at < r.created_at) AS earlier "
            "FROM reviews r JOIN users u ON u.id = r.user_id WHERE r.restaurant_id = ? AND r.hidden = 0 "
            "ORDER BY helpful DESC, r.created_at DESC LIMIT ?",
            (restaurant_id, limit),
        )
        voted: set[str] = set()
        if viewer and rows:
            marks = ",".join("?" for _ in rows)
            voted = {row["review_id"] for row in self.store.all(f"SELECT review_id FROM review_votes WHERE user_id = ? AND review_id IN ({marks})", [viewer["id"], *[r["id"] for r in rows]])}
        return [
            {
                "id": row["id"],
                "username": row["username"],
                "rating": int(row["rating"]),
                "aspects": {key: row[key] for key in ("taste", "portion", "value", "wait")},
                "comment": row["comment"],
                "helpful": int(row["helpful"]),
                "voted": row["id"] in voted,
                "mine": bool(viewer and viewer["id"] == row["user_id"]),
                "created_at": int(row["created_at"]),
            }
            for row in rows
        ]

    def toggle_helpful(self, user: dict[str, Any], review_id: str) -> dict[str, Any]:
        review = self.store.one("SELECT user_id FROM reviews WHERE id = ?", (review_id,))
        if not review:
            raise CommunityError(404, "not_found")
        if review["user_id"] == user["id"]:
            raise CommunityError(400, "own_review")
        if self.store.run("DELETE FROM review_votes WHERE review_id = ? AND user_id = ?", (review_id, user["id"])) < 1:
            self.store.run("INSERT INTO review_votes (review_id, user_id) VALUES (?, ?)", (review_id, user["id"]))
            voted = True
        else:
            voted = False
        helpful = int(self.store.value("SELECT COUNT(*) AS n FROM review_votes WHERE review_id = ?", (review_id,)) or 0)
        return {"voted": voted, "helpful": helpful}

    # ------------------------------------------------------------ dish votes
    def vote_dish(self, user: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        restaurant_id = _text(str(payload.get("restaurant_id") or ""), "restaurant_id", max_length=80, required=True)
        key = dish_key(_text(payload.get("dish"), "dish", max_length=350, required=True))
        vote = payload.get("vote")
        if vote not in (-1, 0, 1):
            raise CommunityError(400, "vote must be -1, 0 or 1.")
        if vote == 0:
            self.store.run("DELETE FROM dish_votes WHERE restaurant_id = ? AND dish_key = ? AND user_id = ?", (restaurant_id, key, user["id"]))
        else:
            self.store.run(
                "INSERT INTO dish_votes (restaurant_id, dish_key, user_id, vote, created_at) VALUES (?, ?, ?, ?, ?) "
                "ON CONFLICT (restaurant_id, dish_key, user_id) DO UPDATE SET vote = excluded.vote, created_at = excluded.created_at",
                (restaurant_id, key, user["id"], vote, _now()),
            )
        return self.dish_stats(restaurant_id, [key], user)["results"].get(key, {"up": 0, "down": 0, "mine": 0})

    def dish_stats(self, restaurant_id: str, dishes: list[str], viewer: dict[str, Any] | None) -> dict[str, Any]:
        keys = [dish_key(name) for name in dishes if name][:120]
        if not keys:
            return {"results": {}}
        marks = ",".join("?" for _ in keys)
        results: dict[str, dict[str, int]] = {}
        for row in self.store.all(
            f"SELECT dish_key, SUM(CASE WHEN vote > 0 THEN 1 ELSE 0 END) AS up, SUM(CASE WHEN vote < 0 THEN 1 ELSE 0 END) AS down "
            f"FROM dish_votes WHERE restaurant_id = ? AND dish_key IN ({marks}) GROUP BY dish_key",
            [restaurant_id, *keys],
        ):
            results[row["dish_key"]] = {"up": int(row["up"] or 0), "down": int(row["down"] or 0), "mine": 0}
        if viewer:
            for row in self.store.all(
                f"SELECT dish_key, vote FROM dish_votes WHERE restaurant_id = ? AND user_id = ? AND dish_key IN ({marks})",
                [restaurant_id, viewer["id"], *keys],
            ):
                results.setdefault(row["dish_key"], {"up": 0, "down": 0, "mine": 0})["mine"] = int(row["vote"])
        photo_rows = self.store.all(
            f"SELECT dish_key, id FROM photos WHERE restaurant_id = ? AND hidden = 0 AND dish_key IN ({marks}) ORDER BY created_at DESC",
            [restaurant_id, *keys],
        )
        photos: dict[str, list[str]] = {}
        for row in photo_rows:
            photos.setdefault(row["dish_key"], []).append(row["id"])
        for key, ids in photos.items():
            results.setdefault(key, {"up": 0, "down": 0, "mine": 0})["photos"] = ids[:6]  # type: ignore[assignment]
        return {"results": results}

    # ---------------------------------------------------------------- photos
    def add_photo(self, user: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        restaurant = _restaurant(payload)
        dish_name = _text(payload.get("dish"), "dish", max_length=350)
        image = payload.get("image")
        if not isinstance(image, str) or not image.startswith("data:") or ";base64," not in image:
            raise CommunityError(400, "image must be a base64 data URL.")
        header, data = image.split(",", 1)
        mime = header[5:].split(";")[0]
        if mime not in PHOTO_TYPES:
            raise CommunityError(400, "Unsupported image type.")
        if len(data) > MAX_PHOTO_CHARS:
            raise CommunityError(413, "photo_too_large")
        try:
            base64.b64decode(data, validate=True)
        except (binascii.Error, ValueError):
            raise CommunityError(400, "Invalid image data.") from None
        self._rate_limit(user, "photos")
        photo_id = _new_id()
        self.store.run(
            "INSERT INTO photos (id, restaurant_id, restaurant_name, city, dish_name, dish_key, user_id, mime, data, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (photo_id, restaurant["id"], restaurant["name"], restaurant["city"], dish_name, dish_key(dish_name) if dish_name else "", user["id"], mime, data, _now()),
        )
        return {"id": photo_id}

    def list_photos(self, restaurant_id: str, *, limit: int = 24) -> list[dict[str, Any]]:
        rows = self.store.all(
            "SELECT p.id, p.dish_name, p.created_at, u.username FROM photos p JOIN users u ON u.id = p.user_id "
            "WHERE p.restaurant_id = ? AND p.hidden = 0 ORDER BY p.created_at DESC LIMIT ?",
            (restaurant_id, limit),
        )
        return [{"id": r["id"], "dish": r["dish_name"], "username": r["username"], "created_at": int(r["created_at"])} for r in rows]

    def photo(self, photo_id: str) -> tuple[str, bytes] | None:
        row = self.store.one("SELECT mime, data FROM photos WHERE id = ? AND hidden = 0", (photo_id,))
        if not row:
            return None
        return row["mime"], base64.b64decode(row["data"])

    def delete_photo(self, user: dict[str, Any], photo_id: str) -> dict[str, Any]:
        return self._delete_own(user, "photos", photo_id)

    # -------------------------------------------------------------- checkins
    def checkin(self, user: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        restaurant = _restaurant(payload)
        day = _text(payload.get("day") or today_local().isoformat(), "day", max_length=10)
        if not DAY_RE.match(day):
            raise CommunityError(400, "day must be YYYY-MM-DD.")
        parsed = date.fromisoformat(day)
        if not (today_local() - timedelta(days=200)) <= parsed <= (today_local() + timedelta(days=1)):
            raise CommunityError(400, "day is out of range.")
        dish_name = _text(payload.get("dish"), "dish", max_length=350)
        try:
            fee = max(0.0, min(50.0, float(payload.get("fee") or 0)))
        except (TypeError, ValueError):
            fee = 0.0
        existing = self.store.one("SELECT id FROM checkins WHERE user_id = ? AND restaurant_id = ? AND day = ?", (user["id"], restaurant["id"], day))
        if existing:
            if dish_name:
                self.store.run("UPDATE checkins SET dish_name = ? WHERE id = ?", (dish_name, existing["id"]))
            return {"id": existing["id"], "status": "exists"}
        checkin_id = _new_id()
        self.store.run(
            "INSERT INTO checkins (id, restaurant_id, restaurant_name, city, dish_name, fee, user_id, day, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (checkin_id, restaurant["id"], restaurant["name"], restaurant["city"], dish_name, fee, user["id"], day, _now()),
        )
        return {"id": checkin_id, "status": "created"}

    def delete_checkin(self, user: dict[str, Any], restaurant_id: str, day: str) -> dict[str, Any]:
        self.store.run("DELETE FROM checkins WHERE user_id = ? AND restaurant_id = ? AND day = ?", (user["id"], restaurant_id, day))
        return {"status": "deleted"}

    def report_queue(self, user: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        restaurant_id = _text(str(payload.get("restaurant_id") or ""), "restaurant_id", max_length=80, required=True)
        level = payload.get("level")
        if level not in (1, 2, 3):
            raise CommunityError(400, "level must be 1, 2 or 3.")
        self.store.run(
            "INSERT INTO queue_reports (restaurant_id, user_id, level, created_at) VALUES (?, ?, ?, ?) "
            "ON CONFLICT (restaurant_id, user_id) DO UPDATE SET level = excluded.level, created_at = excluded.created_at",
            (restaurant_id, user["id"], level, _now()),
        )
        return self.restaurant_summaries([restaurant_id])["results"][restaurant_id]

    def import_local(self, user: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        imported = {"reviews": 0, "checkins": 0}
        for review in (payload.get("reviews") or [])[:100]:
            if isinstance(review, dict):
                try:
                    self.save_review(user, review)
                    imported["reviews"] += 1
                except CommunityError:
                    pass
        for checkin in (payload.get("checkins") or [])[:500]:
            if isinstance(checkin, dict):
                try:
                    self.checkin(user, checkin)
                    imported["checkins"] += 1
                except CommunityError:
                    pass
        return imported

    # --------------------------------------------------------------- social
    def _user_by_name(self, username: str) -> dict[str, Any]:
        user = self.store.one("SELECT * FROM users WHERE username_lower = ?", (username.lower().lstrip("@"),))
        if not user:
            raise CommunityError(404, "not_found")
        return user

    def follow(self, viewer: dict[str, Any], username: str, *, follow: bool) -> dict[str, Any]:
        target = self._user_by_name(username)
        if target["id"] == viewer["id"]:
            raise CommunityError(400, "cannot_follow_self")
        if follow:
            self.store.run(
                "INSERT INTO follows (follower_id, followee_id, created_at) VALUES (?, ?, ?) ON CONFLICT DO NOTHING",
                (viewer["id"], target["id"], _now()),
            )
        else:
            self.store.run("DELETE FROM follows WHERE follower_id = ? AND followee_id = ?", (viewer["id"], target["id"]))
        return {"following": follow}

    def search_users(self, query: str) -> dict[str, Any]:
        query = query.strip().lower().lstrip("@")
        if len(query) < 2:
            return {"results": []}
        rows = self.store.all(
            "SELECT username, faculty, city FROM users WHERE username_lower LIKE ? ORDER BY username_lower LIMIT 15",
            (f"%{query.replace('%', '').replace('_', '')}%",),
        )
        return {"results": rows}

    def streak(self, user_id: str) -> int:
        days = {row["day"] for row in self.store.all("SELECT DISTINCT day FROM checkins WHERE user_id = ? AND day >= ?", (user_id, (today_local() - timedelta(days=120)).isoformat()))}
        def skip_weekend(day: date) -> date:
            # Weekends do not break a streak: menza lunches are a weekday habit.
            while day.weekday() >= 5 and day.isoformat() not in days:
                day -= timedelta(days=1)
            return day

        current = today_local()
        if current.isoformat() not in days:
            current = skip_weekend(current - timedelta(days=1))
        streak = 0
        while current.isoformat() in days:
            streak += 1
            current = skip_weekend(current - timedelta(days=1))
        return streak

    def badges(self, user_id: str) -> list[dict[str, Any]]:
        places = int(self.store.value("SELECT COUNT(DISTINCT restaurant_id) AS n FROM checkins WHERE user_id = ?", (user_id,)) or 0)
        photos = int(self.store.value("SELECT COUNT(*) AS n FROM photos WHERE user_id = ? AND hidden = 0", (user_id,)) or 0)
        reviews = int(self.store.value("SELECT COUNT(*) AS n FROM reviews WHERE user_id = ? AND hidden = 0", (user_id,)) or 0)
        helpful = int(self.store.value("SELECT COUNT(*) AS n FROM review_votes v JOIN reviews r ON r.id = v.review_id WHERE r.user_id = ?", (user_id,)) or 0)
        pioneer = int(
            self.store.value(
                "SELECT COUNT(*) AS n FROM reviews r WHERE r.user_id = ? AND NOT EXISTS "
                "(SELECT 1 FROM reviews o WHERE o.restaurant_id = r.restaurant_id AND o.created_at < r.created_at)",
                (user_id,),
            )
            or 0
        )
        streak = self.streak(user_id)
        definitions = [
            ("explorer", places, 10),
            ("photographer", photos, 5),
            ("critic", reviews, 10),
            ("trusted", helpful, 10),
            ("pioneer", pioneer, 1),
            ("streak", streak, 5),
        ]
        return [{"id": badge, "progress": min(value, goal), "goal": goal, "earned": value >= goal} for badge, value, goal in definitions]

    def profile(self, username: str, viewer: dict[str, Any] | None) -> dict[str, Any]:
        user = self._user_by_name(username)
        is_me = bool(viewer and viewer["id"] == user["id"])
        following = bool(viewer and self.store.one("SELECT 1 AS x FROM follows WHERE follower_id = ? AND followee_id = ?", (viewer["id"], user["id"])))
        counts = {
            "followers": int(self.store.value("SELECT COUNT(*) AS n FROM follows WHERE followee_id = ?", (user["id"],)) or 0),
            "following": int(self.store.value("SELECT COUNT(*) AS n FROM follows WHERE follower_id = ?", (user["id"],)) or 0),
            "checkins": int(self.store.value("SELECT COUNT(*) AS n FROM checkins WHERE user_id = ?", (user["id"],)) or 0),
            "places": int(self.store.value("SELECT COUNT(DISTINCT restaurant_id) AS n FROM checkins WHERE user_id = ?", (user["id"],)) or 0),
            "reviews": int(self.store.value("SELECT COUNT(*) AS n FROM reviews WHERE user_id = ? AND hidden = 0", (user["id"],)) or 0),
            "photos": int(self.store.value("SELECT COUNT(*) AS n FROM photos WHERE user_id = ? AND hidden = 0", (user["id"],)) or 0),
        }
        result: dict[str, Any] = {
            "user": self.public_user(user, private=is_me),
            "is_me": is_me,
            "following": following,
            "counts": counts,
            "badges": self.badges(user["id"]),
            "streak": self.streak(user["id"]),
        }
        visible = is_me or following or not user["is_private"]
        result["visible"] = visible
        if visible:
            result["reviews"] = [
                {"restaurant_id": r["restaurant_id"], "restaurant_name": r["restaurant_name"], "rating": int(r["rating"]), "comment": r["comment"], "created_at": int(r["created_at"])}
                for r in self.store.all("SELECT * FROM reviews WHERE user_id = ? AND hidden = 0 ORDER BY created_at DESC LIMIT 10", (user["id"],))
            ]
            result["photos"] = [
                {"id": r["id"], "restaurant_name": r["restaurant_name"], "dish": r["dish_name"]}
                for r in self.store.all("SELECT id, restaurant_name, dish_name FROM photos WHERE user_id = ? AND hidden = 0 ORDER BY created_at DESC LIMIT 12", (user["id"],))
            ]
            result["lists"] = self._lists("WHERE l.user_id = ?", (user["id"],))
        return result

    # --------------------------------------------------------------- meetups
    def create_meetup(self, user: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        restaurant = _restaurant(payload)
        try:
            starts_at = int(payload.get("starts_at"))
        except (TypeError, ValueError):
            raise CommunityError(400, "starts_at must be a timestamp in milliseconds.") from None
        if not _now() - 600_000 <= starts_at <= _now() + 14 * 86_400_000:
            raise CommunityError(400, "starts_at must be within the next two weeks.")
        self._rate_limit(user, "meetups")
        meetup_id = _new_id()
        self.store.run(
            "INSERT INTO meetups (id, restaurant_id, restaurant_name, city, user_id, starts_at, note, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (meetup_id, restaurant["id"], restaurant["name"], restaurant["city"], user["id"], starts_at, _text(payload.get("note"), "note", max_length=140), _now()),
        )
        self.store.run("INSERT INTO meetup_members (meetup_id, user_id, created_at) VALUES (?, ?, ?)", (meetup_id, user["id"], _now()))
        return {"id": meetup_id}

    def join_meetup(self, user: dict[str, Any], meetup_id: str, *, join: bool) -> dict[str, Any]:
        meetup = self.store.one("SELECT * FROM meetups WHERE id = ? AND hidden = 0", (meetup_id,))
        if not meetup:
            raise CommunityError(404, "not_found")
        if join:
            self.store.run("INSERT INTO meetup_members (meetup_id, user_id, created_at) VALUES (?, ?, ?) ON CONFLICT DO NOTHING", (meetup_id, user["id"], _now()))
        elif meetup["user_id"] == user["id"]:
            self.store.run("DELETE FROM meetup_members WHERE meetup_id = ?", (meetup_id,))
            self.store.run("DELETE FROM meetups WHERE id = ?", (meetup_id,))
            return {"status": "deleted"}
        else:
            self.store.run("DELETE FROM meetup_members WHERE meetup_id = ? AND user_id = ?", (meetup_id, user["id"]))
        return {"joined": join}

    def list_meetups(self, viewer: dict[str, Any] | None, *, restaurant_id: str | None = None, city: str | None = None) -> list[dict[str, Any]]:
        where = ["m.hidden = 0", "m.starts_at > ?"]
        params: list[Any] = [_now() - 3_600_000]
        if restaurant_id:
            where.append("m.restaurant_id = ?")
            params.append(restaurant_id)
        if city:
            where.append("m.city = ?")
            params.append(city)
        rows = self.store.all(
            f"SELECT m.*, u.username FROM meetups m JOIN users u ON u.id = m.user_id WHERE {' AND '.join(where)} ORDER BY m.starts_at LIMIT 30",
            params,
        )
        if not rows:
            return []
        marks = ",".join("?" for _ in rows)
        members: dict[str, list[dict[str, Any]]] = {}
        for row in self.store.all(
            f"SELECT mm.meetup_id, mm.created_at, u.username, u.id AS user_id FROM meetup_members mm JOIN users u ON u.id = mm.user_id WHERE mm.meetup_id IN ({marks})",
            [r["id"] for r in rows],
        ):
            members.setdefault(row["meetup_id"], []).append(row)
        hosts = {r["id"]: r["user_id"] for r in rows}
        for meetup_id, people in members.items():
            # Host first, then everyone else in the order they joined.
            people.sort(key=lambda m: (m["user_id"] != hosts[meetup_id], m["created_at"], m["username"]))
        return [
            {
                "id": r["id"],
                "restaurant_id": r["restaurant_id"],
                "restaurant_name": r["restaurant_name"],
                "city": r["city"],
                "host": r["username"],
                "starts_at": int(r["starts_at"]),
                "note": r["note"],
                "members": [m["username"] for m in members.get(r["id"], [])],
                "joined": bool(viewer and any(m["user_id"] == viewer["id"] for m in members.get(r["id"], []))),
                "mine": bool(viewer and viewer["id"] == r["user_id"]),
            }
            for r in rows
        ]

    # ----------------------------------------------------------------- lists
    def _lists(self, where: str, params: tuple[Any, ...], *, limit: int = 20) -> list[dict[str, Any]]:
        rows = self.store.all(
            f"SELECT l.*, u.username, (SELECT COUNT(*) FROM list_items i WHERE i.list_id = l.id) AS items "
            f"FROM lists l JOIN users u ON u.id = l.user_id {where} AND l.hidden = 0 ORDER BY l.created_at DESC LIMIT {int(limit)}",
            params,
        )
        return [
            {"id": r["id"], "title": r["title"], "description": r["description"], "city": r["city"], "username": r["username"], "items": int(r["items"])}
            for r in rows
        ]

    def lists_with_restaurant(self, restaurant_id: str) -> list[dict[str, Any]]:
        return self._lists("WHERE l.id IN (SELECT list_id FROM list_items WHERE restaurant_id = ?)", (restaurant_id,), limit=6)

    def recent_lists(self, city: str | None) -> list[dict[str, Any]]:
        if city:
            return self._lists("WHERE (l.city = ? OR l.city = '')", (city,))
        return self._lists("WHERE 1 = ?", (1,))

    def create_list(self, user: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        self._rate_limit(user, "lists")
        list_id = _new_id()
        self.store.run(
            "INSERT INTO lists (id, user_id, title, description, city, created_at) VALUES (?, ?, ?, ?, ?, ?)",
            (
                list_id,
                user["id"],
                _text(payload.get("title"), "title", max_length=80, required=True),
                _text(payload.get("description"), "description", max_length=200),
                _text(payload.get("city"), "city", max_length=80),
                _now(),
            ),
        )
        return {"id": list_id}

    def get_list(self, list_id: str, viewer: dict[str, Any] | None) -> dict[str, Any]:
        row = self.store.one("SELECT l.*, u.username FROM lists l JOIN users u ON u.id = l.user_id WHERE l.id = ? AND l.hidden = 0", (list_id,))
        if not row:
            raise CommunityError(404, "not_found")
        items = self.store.all("SELECT restaurant_id, restaurant_name, note FROM list_items WHERE list_id = ? ORDER BY created_at", (list_id,))
        return {
            "id": row["id"],
            "title": row["title"],
            "description": row["description"],
            "city": row["city"],
            "username": row["username"],
            "mine": bool(viewer and viewer["id"] == row["user_id"]),
            "items": items,
        }

    def set_list_item(self, user: dict[str, Any], list_id: str, payload: dict[str, Any], *, add: bool) -> dict[str, Any]:
        if not self.store.one("SELECT id FROM lists WHERE id = ? AND user_id = ?", (list_id, user["id"])):
            raise CommunityError(404, "not_found")
        restaurant = _restaurant(payload)
        if add:
            self.store.run(
                "INSERT INTO list_items (list_id, restaurant_id, restaurant_name, note, created_at) VALUES (?, ?, ?, ?, ?) "
                "ON CONFLICT (list_id, restaurant_id) DO UPDATE SET note = excluded.note",
                (list_id, restaurant["id"], restaurant["name"], _text(payload.get("note"), "note", max_length=140), _now()),
            )
        else:
            self.store.run("DELETE FROM list_items WHERE list_id = ? AND restaurant_id = ?", (list_id, restaurant["id"]))
        return self.get_list(list_id, user)

    def delete_list(self, user: dict[str, Any], list_id: str) -> dict[str, Any]:
        result = self._delete_own(user, "lists", list_id)
        self.store.run("DELETE FROM list_items WHERE list_id = ?", (list_id,))
        return result

    # ------------------------------------------------------------------- Q&A
    def list_questions(self, restaurant_id: str) -> list[dict[str, Any]]:
        questions = self.store.all(
            "SELECT q.*, u.username FROM questions q JOIN users u ON u.id = q.user_id WHERE q.restaurant_id = ? AND q.hidden = 0 ORDER BY q.created_at DESC LIMIT 20",
            (restaurant_id,),
        )
        if not questions:
            return []
        marks = ",".join("?" for _ in questions)
        answers: dict[str, list[dict[str, Any]]] = {}
        for row in self.store.all(
            f"SELECT a.*, u.username FROM answers a JOIN users u ON u.id = a.user_id WHERE a.hidden = 0 AND a.question_id IN ({marks}) ORDER BY a.created_at",
            [q["id"] for q in questions],
        ):
            answers.setdefault(row["question_id"], []).append({"id": row["id"], "username": row["username"], "body": row["body"], "created_at": int(row["created_at"])})
        return [
            {"id": q["id"], "username": q["username"], "body": q["body"], "created_at": int(q["created_at"]), "answers": answers.get(q["id"], [])}
            for q in questions
        ]

    def ask(self, user: dict[str, Any], payload: dict[str, Any]) -> dict[str, Any]:
        self._rate_limit(user, "questions")
        question_id = _new_id()
        self.store.run(
            "INSERT INTO questions (id, restaurant_id, user_id, body, created_at) VALUES (?, ?, ?, ?, ?)",
            (question_id, _text(str(payload.get("restaurant_id") or ""), "restaurant_id", max_length=80, required=True), user["id"], _text(payload.get("body"), "body", max_length=200, required=True), _now()),
        )
        return {"id": question_id}

    def answer(self, user: dict[str, Any], question_id: str, payload: dict[str, Any]) -> dict[str, Any]:
        if not self.store.one("SELECT id FROM questions WHERE id = ? AND hidden = 0", (question_id,)):
            raise CommunityError(404, "not_found")
        self._rate_limit(user, "answers")
        answer_id = _new_id()
        self.store.run(
            "INSERT INTO answers (id, question_id, user_id, body, created_at) VALUES (?, ?, ?, ?, ?)",
            (answer_id, question_id, user["id"], _text(payload.get("body"), "body", max_length=200, required=True), _now()),
        )
        return {"id": answer_id}

    # ------------------------------------------------------- feed & rankings
    def feed(self, viewer: dict[str, Any] | None, *, city: str | None = None, following: bool = False) -> dict[str, Any]:
        since = _now() - 7 * 86_400_000
        filters = ["x.created_at > ?", "u.is_private = 0"]
        params: list[Any] = [since]
        if city:
            filters.append("x.city = ?")
            params.append(city)
        if following:
            if not viewer:
                return {"items": [], "trending": []}
            filters[1] = "x.user_id IN (SELECT followee_id FROM follows WHERE follower_id = ?)"
            params.insert(1, viewer["id"])
        where = " AND ".join(filters)
        items: list[dict[str, Any]] = []
        for r in self.store.all(f"SELECT x.*, u.username FROM reviews x JOIN users u ON u.id = x.user_id WHERE x.hidden = 0 AND {where} ORDER BY x.created_at DESC LIMIT 20", params):
            items.append({"type": "review", "id": r["id"], "username": r["username"], "restaurant_id": r["restaurant_id"], "restaurant_name": r["restaurant_name"], "rating": int(r["rating"]), "comment": r["comment"], "created_at": int(r["created_at"])})
        for r in self.store.all(f"SELECT x.id, x.restaurant_id, x.restaurant_name, x.dish_name, x.created_at, u.username FROM photos x JOIN users u ON u.id = x.user_id WHERE x.hidden = 0 AND {where} ORDER BY x.created_at DESC LIMIT 20", params):
            items.append({"type": "photo", "id": r["id"], "username": r["username"], "restaurant_id": r["restaurant_id"], "restaurant_name": r["restaurant_name"], "dish": r["dish_name"], "created_at": int(r["created_at"])})
        for r in self.store.all(f"SELECT x.id, x.restaurant_id, x.restaurant_name, x.dish_name, x.created_at, u.username FROM checkins x JOIN users u ON u.id = x.user_id WHERE {where} ORDER BY x.created_at DESC LIMIT 20", params):
            items.append({"type": "checkin", "id": r["id"], "username": r["username"], "restaurant_id": r["restaurant_id"], "restaurant_name": r["restaurant_name"], "dish": r["dish_name"], "created_at": int(r["created_at"])})
        items.sort(key=lambda item: item["created_at"], reverse=True)
        return {"items": items[:40], "trending": self.trending(city), "meetups": self.list_meetups(viewer, city=city)[:5]}

    def trending(self, city: str | None) -> list[dict[str, Any]]:
        params: list[Any] = [today_local().isoformat()]
        city_filter = ""
        if city:
            city_filter = " AND city = ?"
            params.append(city)
        rows = self.store.all(
            f"SELECT restaurant_id, MAX(restaurant_name) AS restaurant_name, COUNT(*) AS n FROM checkins WHERE day = ?{city_filter} "
            "GROUP BY restaurant_id ORDER BY n DESC LIMIT 5",
            params,
        )
        return [{"restaurant_id": r["restaurant_id"], "restaurant_name": r["restaurant_name"], "checkins": int(r["n"])} for r in rows]

    def leaderboard(self, *, faculty: str | None = None, city: str | None = None) -> dict[str, Any]:
        today = today_local()
        month_start = today.replace(day=1)
        start_ms = int(datetime(month_start.year, month_start.month, 1).timestamp() * 1000)
        scores: dict[str, float] = {}

        def add(rows: list[dict[str, Any]], points: int) -> None:
            for row in rows:
                scores[row["user_id"]] = scores.get(row["user_id"], 0) + int(row["n"]) * points

        add(self.store.all("SELECT user_id, COUNT(*) AS n FROM checkins WHERE day >= ? GROUP BY user_id", (month_start.isoformat(),)), POINTS["checkin"])
        add(self.store.all("SELECT user_id, COUNT(*) AS n FROM reviews WHERE hidden = 0 AND created_at >= ? GROUP BY user_id", (start_ms,)), POINTS["review"])
        add(self.store.all("SELECT user_id, COUNT(*) AS n FROM photos WHERE hidden = 0 AND created_at >= ? GROUP BY user_id", (start_ms,)), POINTS["photo"])
        add(
            self.store.all("SELECT r.user_id, COUNT(*) AS n FROM review_votes v JOIN reviews r ON r.id = v.review_id WHERE r.created_at >= ? GROUP BY r.user_id", (start_ms,)),
            POINTS["helpful"],
        )
        if not scores:
            return {"month": month_start.isoformat()[:7], "results": [], "faculties": self.faculties()}
        marks = ",".join("?" for _ in scores)
        users = {u["id"]: u for u in self.store.all(f"SELECT id, username, faculty, city, is_private FROM users WHERE id IN ({marks})", list(scores))}
        ranked = []
        for user_id, points in sorted(scores.items(), key=lambda item: item[1], reverse=True):
            user = users.get(user_id)
            if not user or user["is_private"]:
                continue
            if faculty and user["faculty"] != faculty:
                continue
            if city and user["city"] != city:
                continue
            ranked.append({"username": user["username"], "faculty": user["faculty"], "points": int(points)})
        return {"month": month_start.isoformat()[:7], "results": ranked[:30], "faculties": self.faculties()}

    def faculties(self) -> list[str]:
        return [r["faculty"] for r in self.store.all("SELECT DISTINCT faculty FROM users WHERE faculty <> '' ORDER BY faculty LIMIT 60")]

    def recap(self, user: dict[str, Any]) -> dict[str, Any]:
        start, end, label = semester_range(today_local())
        params = (user["id"], start.isoformat(), end.isoformat())
        base = "FROM checkins WHERE user_id = ? AND day >= ? AND day <= ?"
        top_place = self.store.one(f"SELECT MAX(restaurant_name) AS name, COUNT(*) AS n {base} GROUP BY restaurant_id ORDER BY n DESC LIMIT 1", params)
        top_dish = self.store.one(f"SELECT MAX(dish_name) AS name, COUNT(*) AS n {base} AND dish_name <> '' GROUP BY dish_name ORDER BY n DESC LIMIT 1", params)
        start_ms = int(datetime(start.year, start.month, start.day).timestamp() * 1000)
        return {
            "label": label,
            "meals": int(self.store.value(f"SELECT COUNT(*) AS n {base}", params) or 0),
            "places": int(self.store.value(f"SELECT COUNT(DISTINCT restaurant_id) AS n {base}", params) or 0),
            "spent": round(_num(self.store.value(f"SELECT SUM(fee) AS n {base}", params)), 2),
            "top_place": top_place["name"] if top_place else None,
            "top_dish": top_dish["name"] if top_dish else None,
            "reviews": int(self.store.value("SELECT COUNT(*) AS n FROM reviews WHERE user_id = ? AND created_at >= ?", (user["id"], start_ms)) or 0),
            "photos": int(self.store.value("SELECT COUNT(*) AS n FROM photos WHERE user_id = ? AND created_at >= ?", (user["id"], start_ms)) or 0),
            "streak": self.streak(user["id"]),
        }

from __future__ import annotations

import os
import sqlite3
import threading
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Iterator, Sequence

SCHEMA = [
    """CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL,
        username_lower TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        bio TEXT NOT NULL DEFAULT '',
        faculty TEXT NOT NULL DEFAULT '',
        city TEXT NOT NULL DEFAULT '',
        is_private INTEGER NOT NULL DEFAULT 0,
        created_at BIGINT NOT NULL
    )""",
    """CREATE TABLE IF NOT EXISTS pending_signups (
        email TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        code_hash TEXT NOT NULL,
        attempts INTEGER NOT NULL DEFAULT 0,
        expires_at BIGINT NOT NULL
    )""",
    """CREATE TABLE IF NOT EXISTS sessions (
        token_hash TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        expires_at BIGINT NOT NULL
    )""",
    """CREATE TABLE IF NOT EXISTS reviews (
        id TEXT PRIMARY KEY,
        restaurant_id TEXT NOT NULL,
        restaurant_name TEXT NOT NULL,
        city TEXT NOT NULL DEFAULT '',
        user_id TEXT NOT NULL,
        rating INTEGER NOT NULL,
        taste INTEGER,
        portion INTEGER,
        value INTEGER,
        wait INTEGER,
        comment TEXT NOT NULL DEFAULT '',
        hidden INTEGER NOT NULL DEFAULT 0,
        created_at BIGINT NOT NULL,
        UNIQUE (restaurant_id, user_id)
    )""",
    """CREATE TABLE IF NOT EXISTS review_votes (
        review_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        PRIMARY KEY (review_id, user_id)
    )""",
    """CREATE TABLE IF NOT EXISTS dish_votes (
        restaurant_id TEXT NOT NULL,
        dish_key TEXT NOT NULL,
        user_id TEXT NOT NULL,
        vote INTEGER NOT NULL,
        created_at BIGINT NOT NULL,
        PRIMARY KEY (restaurant_id, dish_key, user_id)
    )""",
    """CREATE TABLE IF NOT EXISTS photos (
        id TEXT PRIMARY KEY,
        restaurant_id TEXT NOT NULL,
        restaurant_name TEXT NOT NULL,
        city TEXT NOT NULL DEFAULT '',
        dish_name TEXT NOT NULL DEFAULT '',
        dish_key TEXT NOT NULL DEFAULT '',
        user_id TEXT NOT NULL,
        mime TEXT NOT NULL,
        data TEXT NOT NULL,
        hidden INTEGER NOT NULL DEFAULT 0,
        created_at BIGINT NOT NULL
    )""",
    """CREATE TABLE IF NOT EXISTS checkins (
        id TEXT PRIMARY KEY,
        restaurant_id TEXT NOT NULL,
        restaurant_name TEXT NOT NULL,
        city TEXT NOT NULL DEFAULT '',
        dish_name TEXT NOT NULL DEFAULT '',
        fee REAL NOT NULL DEFAULT 0,
        user_id TEXT NOT NULL,
        day TEXT NOT NULL,
        created_at BIGINT NOT NULL
    )""",
    """CREATE TABLE IF NOT EXISTS queue_reports (
        restaurant_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        level INTEGER NOT NULL,
        created_at BIGINT NOT NULL,
        PRIMARY KEY (restaurant_id, user_id)
    )""",
    """CREATE TABLE IF NOT EXISTS follows (
        follower_id TEXT NOT NULL,
        followee_id TEXT NOT NULL,
        created_at BIGINT NOT NULL,
        PRIMARY KEY (follower_id, followee_id)
    )""",
    """CREATE TABLE IF NOT EXISTS meetups (
        id TEXT PRIMARY KEY,
        restaurant_id TEXT NOT NULL,
        restaurant_name TEXT NOT NULL,
        city TEXT NOT NULL DEFAULT '',
        user_id TEXT NOT NULL,
        starts_at BIGINT NOT NULL,
        note TEXT NOT NULL DEFAULT '',
        hidden INTEGER NOT NULL DEFAULT 0,
        created_at BIGINT NOT NULL
    )""",
    """CREATE TABLE IF NOT EXISTS meetup_members (
        meetup_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        created_at BIGINT NOT NULL DEFAULT 0,
        PRIMARY KEY (meetup_id, user_id)
    )""",
    """CREATE TABLE IF NOT EXISTS lists (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        city TEXT NOT NULL DEFAULT '',
        hidden INTEGER NOT NULL DEFAULT 0,
        created_at BIGINT NOT NULL
    )""",
    """CREATE TABLE IF NOT EXISTS list_items (
        list_id TEXT NOT NULL,
        restaurant_id TEXT NOT NULL,
        restaurant_name TEXT NOT NULL,
        note TEXT NOT NULL DEFAULT '',
        created_at BIGINT NOT NULL,
        PRIMARY KEY (list_id, restaurant_id)
    )""",
    """CREATE TABLE IF NOT EXISTS questions (
        id TEXT PRIMARY KEY,
        restaurant_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        body TEXT NOT NULL,
        hidden INTEGER NOT NULL DEFAULT 0,
        created_at BIGINT NOT NULL
    )""",
    """CREATE TABLE IF NOT EXISTS answers (
        id TEXT PRIMARY KEY,
        question_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        body TEXT NOT NULL,
        hidden INTEGER NOT NULL DEFAULT 0,
        created_at BIGINT NOT NULL
    )""",
    """CREATE TABLE IF NOT EXISTS reports (
        target_type TEXT NOT NULL,
        target_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        reason TEXT NOT NULL DEFAULT '',
        created_at BIGINT NOT NULL,
        PRIMARY KEY (target_type, target_id, user_id)
    )""",
    "CREATE INDEX IF NOT EXISTS idx_reviews_restaurant ON reviews (restaurant_id, created_at)",
    "CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews (user_id)",
    "CREATE INDEX IF NOT EXISTS idx_photos_restaurant ON photos (restaurant_id, created_at)",
    "CREATE INDEX IF NOT EXISTS idx_checkins_restaurant_day ON checkins (restaurant_id, day)",
    "CREATE INDEX IF NOT EXISTS idx_checkins_user ON checkins (user_id, day)",
    "CREATE INDEX IF NOT EXISTS idx_meetups_time ON meetups (starts_at)",
    "CREATE INDEX IF NOT EXISTS idx_questions_restaurant ON questions (restaurant_id)",
    "CREATE INDEX IF NOT EXISTS idx_answers_question ON answers (question_id)",
]


class Store:
    """Thin SQL wrapper so the same queries run on SQLite (local) and Postgres (production).

    Queries use ``?`` placeholders; they are rewritten to ``%s`` for Postgres.
    """

    def __init__(self, *, sqlite_path: str | None = None, postgres_url: str | None = None) -> None:
        self.kind = "postgres" if postgres_url else "sqlite"
        self._postgres_url = postgres_url
        self._sqlite_path = sqlite_path or ":memory:"
        self._lock = threading.RLock()
        self._sqlite: sqlite3.Connection | None = None
        self._pg: Any = None
        with self.connection() as conn:
            for statement in SCHEMA:
                conn.execute(statement)

    @contextmanager
    def connection(self) -> Iterator[Any]:
        with self._lock:
            if self.kind == "sqlite":
                if self._sqlite is None:
                    if self._sqlite_path != ":memory:":
                        Path(self._sqlite_path).parent.mkdir(parents=True, exist_ok=True)
                    self._sqlite = sqlite3.connect(self._sqlite_path, check_same_thread=False)
                    self._sqlite.row_factory = sqlite3.Row
                try:
                    yield self._sqlite
                    self._sqlite.commit()
                except Exception:
                    self._sqlite.rollback()
                    raise
                return
            import psycopg
            from psycopg.rows import dict_row

            if self._pg is None or self._pg.closed:
                self._pg = psycopg.connect(self._postgres_url, row_factory=dict_row, autocommit=False, prepare_threshold=None)
            try:
                yield self._pg
                self._pg.commit()
            except Exception:
                try:
                    self._pg.rollback()
                except Exception:
                    self._pg = None
                raise

    def _sql(self, query: str) -> str:
        return query.replace("?", "%s") if self.kind == "postgres" else query

    def all(self, query: str, params: Sequence[Any] = ()) -> list[dict[str, Any]]:
        with self.connection() as conn:
            rows = conn.execute(self._sql(query), tuple(params)).fetchall()
        return [dict(row) for row in rows]

    def one(self, query: str, params: Sequence[Any] = ()) -> dict[str, Any] | None:
        rows = self.all(query, params)
        return rows[0] if rows else None

    def value(self, query: str, params: Sequence[Any] = ()) -> Any:
        row = self.one(query, params)
        return next(iter(row.values())) if row else None

    def run(self, query: str, params: Sequence[Any] = ()) -> int:
        with self.connection() as conn:
            cursor = conn.execute(self._sql(query), tuple(params))
            return cursor.rowcount


def store_from_environment() -> Store | None:
    """Postgres when a database URL is configured; local SQLite in development; disabled on Vercel otherwise."""
    url = os.environ.get("BOMBONI_DATABASE_URL") or os.environ.get("DATABASE_URL") or os.environ.get("POSTGRES_URL")
    if url:
        return Store(postgres_url=url)
    if os.environ.get("VERCEL"):
        return None
    path = os.environ.get("BOMBONI_SQLITE_PATH") or str(Path.cwd() / ".bomboni-community.sqlite3")
    return Store(sqlite_path=path)

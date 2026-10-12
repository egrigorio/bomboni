"""Generate the PWA's small PNG icons from the Bomboni cutlery mark."""

from __future__ import annotations

import struct
import zlib
from pathlib import Path

OUTPUT = Path(__file__).parents[1] / "src/bomboni/adapters/web/static"
BACKGROUND = (49, 92, 68, 255)
FOREGROUND = (249, 248, 239, 255)


def _near_segment(x: float, y: float, x1: float, y1: float, x2: float, y2: float, radius: float) -> bool:
    dx, dy = x2 - x1, y2 - y1
    length_sq = dx * dx + dy * dy
    t = max(0.0, min(1.0, ((x - x1) * dx + (y - y1) * dy) / length_sq))
    return (x - (x1 + t * dx)) ** 2 + (y - (y1 + t * dy)) ** 2 <= radius * radius


def _in_blade(x: float, y: float, points: tuple[tuple[float, float], ...]) -> bool:
    inside = False
    j = len(points) - 1
    for i, (xi, yi) in enumerate(points):
        xj, yj = points[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            inside = not inside
        j = i
    return inside


def _chunk(kind: bytes, data: bytes) -> bytes:
    return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data) & 0xFFFFFFFF)


def _write_icon(size: int, path: Path) -> None:
    stroke = size * 0.026
    fork_lines = [
        (0.34, 0.18, 0.34, 0.42), (0.41, 0.18, 0.41, 0.42), (0.48, 0.18, 0.48, 0.42),
        (0.34, 0.42, 0.48, 0.42), (0.41, 0.42, 0.41, 0.81),
        (0.68, 0.48, 0.68, 0.81),
    ]
    blade = ((0.68, 0.18), (0.78, 0.27), (0.72, 0.48), (0.68, 0.48))
    raw = bytearray()
    for py in range(size):
        raw.append(0)
        y = (py + 0.5) / size
        for px in range(size):
            x = (px + 0.5) / size
            white = any(
                _near_segment(x, y, x1, y1, x2, y2, stroke / 2)
                for x1, y1, x2, y2 in fork_lines
            ) or _in_blade(x, y, blade)
            raw.extend(FOREGROUND if white else BACKGROUND)
    ihdr = struct.pack(">2I5B", size, size, 8, 6, 0, 0, 0)
    path.write_bytes(b"\x89PNG\r\n\x1a\n" + _chunk(b"IHDR", ihdr) + _chunk(b"IDAT", zlib.compress(bytes(raw), 9)) + _chunk(b"IEND", b""))


if __name__ == "__main__":
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for dimension, filename in ((180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")):
        _write_icon(dimension, OUTPUT / filename)

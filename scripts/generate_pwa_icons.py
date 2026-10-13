"""Generate the PWA's PNG icons from the Bomboni bonbon candy mark."""

from __future__ import annotations

import math
import struct
import zlib
from pathlib import Path

OUTPUT = Path(__file__).parents[1] / "src/bomboni/adapters/web/static"
BACKGROUND = (49, 92, 68, 255)
FOREGROUND = (249, 248, 239, 255)


def _near_segment(x: float, y: float, x1: float, y1: float, x2: float, y2: float, radius: float) -> bool:
    dx, dy = x2 - x1, y2 - y1
    length_sq = dx * dx + dy * dy
    if length_sq == 0:
        return (x - x1) ** 2 + (y - y1) ** 2 <= radius * radius
    t = max(0.0, min(1.0, ((x - x1) * dx + (y - y1) * dy) / length_sq))
    return (x - (x1 + t * dx)) ** 2 + (y - (y1 + t * dy)) ** 2 <= radius * radius


def _near_rounded_rect_stroke(
    x: float, y: float, x1: float, y1: float, x2: float, y2: float, rx: float, ry: float, stroke_r: float
) -> bool:
    cx1, cx2 = x1 + rx, x2 - rx
    cy1, cy2 = y1 + ry, y2 - ry
    qx = max(cx1, min(cx2, x))
    qy = max(cy1, min(cy2, y))
    dx = (x - qx) / rx
    dy = (y - qy) / ry
    d = math.sqrt(dx * dx + dy * dy)
    scale = (rx + ry) / 2
    if cx1 <= x <= cx2:
        dist = min(abs(y - y1), abs(y - y2))
    elif cy1 <= y <= cy2:
        dist = min(abs(x - x1), abs(x - x2))
    else:
        dist = abs(d - 1.0) * scale
    return dist <= stroke_r


def _chunk(kind: bytes, data: bytes) -> bytes:
    return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data) & 0xFFFFFFFF)


def _write_icon(size: int, path: Path) -> None:
    stroke_r = 0.052 / 2.0

    # Left wrapper flare
    left_tail = [
        (19 / 64, 32 / 64, 7 / 64, 20 / 64),
        (7 / 64, 20 / 64, 10 / 64, 32 / 64),
        (10 / 64, 32 / 64, 7 / 64, 44 / 64),
        (7 / 64, 44 / 64, 19 / 64, 32 / 64),
    ]
    # Right wrapper flare
    right_tail = [
        (45 / 64, 32 / 64, 57 / 64, 20 / 64),
        (57 / 64, 20 / 64, 54 / 64, 32 / 64),
        (54 / 64, 32 / 64, 57 / 64, 44 / 64),
        (57 / 64, 44 / 64, 45 / 64, 32 / 64),
    ]
    # Wrapper creases & ribbon
    left_crease = [(19 / 64, 26 / 64, 17.5 / 64, 32 / 64), (17.5 / 64, 32 / 64, 19 / 64, 38 / 64)]
    right_crease = [(45 / 64, 26 / 64, 46.5 / 64, 32 / 64), (46.5 / 64, 32 / 64, 45 / 64, 38 / 64)]
    ribbon = [(31 / 64, 21 / 64, 34 / 64, 32 / 64), (34 / 64, 32 / 64, 31 / 64, 43 / 64)]

    all_segments = left_tail + right_tail + left_crease + right_crease + ribbon

    # Center rounded rect candy
    x1, y1, x2, y2 = 19 / 64, 21 / 64, 45 / 64, 43 / 64
    rx, ry = 11 / 64, 11 / 64

    raw = bytearray()
    for py in range(size):
        raw.append(0)
        y = (py + 0.5) / size
        for px in range(size):
            x = (px + 0.5) / size
            white = _near_rounded_rect_stroke(x, y, x1, y1, x2, y2, rx, ry, stroke_r) or any(
                _near_segment(x, y, sx1, sy1, sx2, sy2, stroke_r) for sx1, sy1, sx2, sy2 in all_segments
            )
            raw.extend(FOREGROUND if white else BACKGROUND)

    ihdr = struct.pack(">2I5B", size, size, 8, 6, 0, 0, 0)
    path.write_bytes(
        b"\x89PNG\r\n\x1a\n"
        + _chunk(b"IHDR", ihdr)
        + _chunk(b"IDAT", zlib.compress(bytes(raw), 9))
        + _chunk(b"IEND", b"")
    )


if __name__ == "__main__":
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for dimension, filename in ((180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")):
        _write_icon(dimension, OUTPUT / filename)

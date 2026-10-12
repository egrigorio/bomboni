"""Copy the canonical PWA assets into Vercel's static output directory."""

from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src" / "bomboni" / "adapters" / "web" / "static"
OUTPUT = ROOT / "public"


def main() -> None:
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    shutil.copytree(SOURCE, OUTPUT)
    print(f"Prepared {len(list(OUTPUT.iterdir()))} PWA assets in {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

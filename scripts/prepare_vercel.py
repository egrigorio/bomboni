"""Copy the canonical PWA assets into Vercel's static output directory."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src" / "bomboni" / "adapters" / "web" / "static"
OUTPUT = ROOT / "public"


def get_node_executable() -> str:
    node = shutil.which("node")
    if node:
        return node
    for candidate in ("/opt/homebrew/bin/node", "/usr/local/bin/node"):
        if Path(candidate).is_file():
            return candidate
    raise RuntimeError("Node.js binary not found. Please install node or add it to PATH.")


def validate_javascript_syntax() -> None:
    js_files = sorted(SOURCE.rglob("*.js"))
    if not js_files:
        return

    try:
        node_bin = get_node_executable()
    except RuntimeError as exc:
        print(f"Error: {exc}", file=sys.stderr)
        sys.exit(1)

    for js_file in js_files:
        try:
            subprocess.run(
                [node_bin, "-c", str(js_file)],
                check=True,
                capture_output=True,
                text=True,
            )
            print(f"✓ Validated JS syntax: {js_file.relative_to(ROOT)}")
        except subprocess.CalledProcessError as exc:
            error_output = exc.stderr.strip() if exc.stderr else exc.stdout.strip()
            print(
                f"JavaScript syntax error in {js_file.relative_to(ROOT)}:\n{error_output}",
                file=sys.stderr,
            )
            sys.exit(1)


def main() -> None:
    validate_javascript_syntax()
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    shutil.copytree(SOURCE, OUTPUT)
    print(f"Prepared {len(list(OUTPUT.iterdir()))} PWA assets in {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

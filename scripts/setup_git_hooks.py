"""Set up native Git hooks for repository validation."""

from __future__ import annotations

import stat
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HOOKS_DIR = ROOT / ".git" / "hooks"
PRE_COMMIT_HOOK = HOOKS_DIR / "pre-commit"

HOOK_CONTENT = """#!/usr/bin/env bash
set -e

# Ensure standard tools (node, pytest) are located
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
if [ -d ".venv/bin" ]; then
  export PATH="$(pwd)/.venv/bin:$PATH"
fi

echo "==> Running pre-commit validations..."

# 1. Check for staged .js files (added, copied, or modified)
STAGED_JS=$(git diff --cached --name-only --diff-filter=ACM | grep '\\.js$' || true)

if [ -n "$STAGED_JS" ]; then
  echo "🔍 Validating syntax for staged JavaScript files..."
  NODE_BIN=$(command -v node || true)
  if [ -z "$NODE_BIN" ]; then
    for candidate in /opt/homebrew/bin/node /usr/local/bin/node; do
      if [ -x "$candidate" ]; then
        NODE_BIN="$candidate"
        break
      fi
    done
  fi

  if [ -z "$NODE_BIN" ]; then
    echo "❌ Error: Node.js is required for JS syntax validation, but node binary was not found." >&2
    exit 1
  fi

  for js_file in $STAGED_JS; do
    if [ -f "$js_file" ]; then
      if ! "$NODE_BIN" -c "$js_file"; then
        echo "❌ JavaScript syntax check failed: $js_file" >&2
        exit 1
      fi
      echo "  ✓ $js_file syntax OK"
    fi
  done
fi

# 2. Check for staged .py files (added, copied, or modified)
STAGED_PY=$(git diff --cached --name-only --diff-filter=ACM | grep '\\.py$' || true)

if [ -n "$STAGED_PY" ]; then
  echo "🧪 Running pytest for staged Python files..."
  PYTEST_BIN=""
  if [ -x ".venv/bin/pytest" ]; then
    PYTEST_BIN=".venv/bin/pytest"
  elif command -v pytest >/dev/null 2>&1; then
    PYTEST_BIN="pytest"
  elif command -v python3 >/dev/null 2>&1 && python3 -m pytest --version >/dev/null 2>&1; then
    PYTEST_BIN="python3 -m pytest"
  fi

  if [ -z "$PYTEST_BIN" ]; then
    echo "❌ Error: pytest is required to validate Python changes, but not found." >&2
    exit 1
  fi

  if ! $PYTEST_BIN; then
    echo "❌ Test suite failed! Commit blocked." >&2
    exit 1
  fi
  echo "  ✓ Pytest passed"
fi

echo "✅ Pre-commit validations completed successfully."
exit 0
"""


def install_hooks() -> None:
    if not (ROOT / ".git").is_dir():
        print(f"Skipping hook installation: {ROOT}/.git is not a directory.")
        return

    HOOKS_DIR.mkdir(parents=True, exist_ok=True)
    PRE_COMMIT_HOOK.write_text(HOOK_CONTENT, encoding="utf-8")
    current_mode = PRE_COMMIT_HOOK.stat().st_mode
    PRE_COMMIT_HOOK.chmod(current_mode | stat.S_IXUSR | stat.S_IXGRP | stat.S_IXOTH)
    print(f"Installed executable pre-commit hook at {PRE_COMMIT_HOOK.relative_to(ROOT)}")


if __name__ == "__main__":
    install_hooks()

# Bomboni Menu Bar

A lightweight macOS menu bar app that prepares the local Bomboni MCP server and adds it to Codex, Google Antigravity, and Claude Desktop.

## Build

Requirements: macOS 13+, Swift 5.9+, and the Bomboni repository at `~/Documents/bomboni`.

```bash
zsh macos/BomboniMenuBar/build_app.sh
```

The generated app is `macos/BomboniMenuBar/dist/Bomboni.app`. The app bundle is ad-hoc signed for local use; it is not notarized or distributed as a signed installer.

## What Configure MCP does

1. Finds Python 3.11+ on the Mac.
2. Creates `.venv` in the selected project directory when needed and installs the project in editable mode.
3. Writes a local stdio server entry named `bomboni` into the selected clients' global configuration files.
4. Preserves other server entries and makes a timestamped backup of each existing configuration file before changing it.

The app does not restart the clients. Quit and reopen selected clients after configuration.

## Configuration locations

- Codex: `~/.codex/config.toml` (or `$CODEX_HOME/config.toml`)
- Antigravity: `~/.gemini/config/mcp_config.json`
- Claude Desktop: `~/Library/Application Support/Claude/claude_desktop_config.json`

The app only writes the `bomboni` MCP entry. Existing configuration files remain local to the Mac and are not uploaded.

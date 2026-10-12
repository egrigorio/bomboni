#!/bin/zsh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
APP_DIR="$SCRIPT_DIR/dist/Bomboni.app"
CONTENTS="$APP_DIR/Contents"
MODULE_CACHE="/private/tmp/bomboni-swift-module-cache"

rm -rf "$APP_DIR"
mkdir -p "$CONTENTS/MacOS"
mkdir -p "$MODULE_CACHE"

swiftc \
  -parse-as-library \
  -target arm64-apple-macosx13.0 \
  -module-cache-path "$MODULE_CACHE" \
  -framework SwiftUI \
  -framework AppKit \
  "$SCRIPT_DIR"/Sources/*.swift \
  -o "$CONTENTS/MacOS/Bomboni"

cat > "$CONTENTS/Info.plist" <<'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key><string>Bomboni</string>
    <key>CFBundleIdentifier</key><string>si.studentska.bomboni.menubar</string>
    <key>CFBundleName</key><string>Bomboni</string>
    <key>CFBundleDisplayName</key><string>Bomboni MCP</string>
    <key>CFBundlePackageType</key><string>APPL</string>
    <key>CFBundleVersion</key><string>0.1.0</string>
    <key>CFBundleShortVersionString</key><string>0.1.0</string>
    <key>LSMinimumSystemVersion</key><string>13.0</string>
    <key>LSUIElement</key><true/>
    <key>NSHighResolutionCapable</key><true/>
</dict>
</plist>
PLIST

codesign --force --deep --sign - "$APP_DIR"
echo "Built $APP_DIR"

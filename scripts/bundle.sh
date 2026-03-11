#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"
CLIENT_DIST_DIR="$DIST_DIR/client"
SERVER_DIST_DIR="$DIST_DIR/server"

rm -rf "$DIST_DIR"
mkdir -p "$CLIENT_DIST_DIR" "$SERVER_DIST_DIR"

pushd "$ROOT_DIR/src/client" >/dev/null
npm run build
popd >/dev/null

pushd "$ROOT_DIR" >/dev/null
dotnet publish src/server/Api/Api.csproj -c Release -o "$SERVER_DIST_DIR/Api"
dotnet publish src/server/Host/Host.csproj -c Release -o "$SERVER_DIST_DIR/Host"
popd >/dev/null

mkdir -p "$SERVER_DIST_DIR/Host/wwwroot"
cp -R "$CLIENT_DIST_DIR/." "$SERVER_DIST_DIR/Host/wwwroot/"

echo "Bundle created at: $DIST_DIR"
echo "- Client: $CLIENT_DIST_DIR"
echo "- Server API: $SERVER_DIST_DIR/Api"
echo "- Server Host: $SERVER_DIST_DIR/Host"

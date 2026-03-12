#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cleanup() {
	kill 0 >/dev/null 2>&1 || true
}
trap cleanup EXIT INT TERM

cd "$ROOT_DIR/src/client"
npm run watch:host &

cd "$ROOT_DIR"
dotnet watch run

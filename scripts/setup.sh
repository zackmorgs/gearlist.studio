#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

require_command() {
	local command_name="$1"
	local help_message="$2"

	if ! command -v "$command_name" >/dev/null 2>&1; then
		echo "Error: '$command_name' is required but not installed."
		echo "$help_message"
		exit 1
	fi
}

echo "Installing project dependencies..."

require_command "dotnet" "Install the .NET 10 SDK and re-run this script."
require_command "npm" "Install Node.js (which includes npm) and re-run this script."

echo "[1/3] Restoring .NET dependencies..."
dotnet restore "$ROOT_DIR/gearlist.studio.sln"

echo "[2/3] Installing root npm dependencies..."
cd "$ROOT_DIR"
npm install --ignore-scripts

echo "[3/3] Installing client npm dependencies..."
cd "$ROOT_DIR/src/client"
npm install

echo "Done. Dependencies are installed."

#!/usr/bin/env bash
set -e
PROJECT_DIR="/home/pgc/uae-directory-pro"
PORT="${1:-3001}"
cd "$PROJECT_DIR"
pkill -f "next dev" >/dev/null 2>&1 || true
[ -d node_modules ] || npm install
npm run dev -- -p "$PORT"

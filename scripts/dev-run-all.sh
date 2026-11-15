#!/usr/bin/env bash
set -e
PORT="${1:-3001}"
BASE="http://localhost:$PORT"
LOG="/home/pgc/.openclaw/workspace/siargao-directory/.dev-server.log"
cd /home/pgc/.openclaw/workspace/siargao-directory
pkill -f "next dev" >/dev/null 2>&1 || true
nohup npm run dev -- -p "$PORT" > "$LOG" 2>&1 &
for i in {1..30}; do
if curl -s "$BASE" >/dev/null; then break; fi
sleep 1
done
./scripts/dev-check.sh "$PORT"
echo "Server: $BASE"
echo "Log: $LOG"

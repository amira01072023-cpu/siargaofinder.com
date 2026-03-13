#!/usr/bin/env bash
set -e
[ -n "$1" ] || { echo "Usage: ./scripts/restore-files.sh backups/<timestamp>"; exit 1; }
cp -r "$1/"* .
echo "Restored from $1"

#!/usr/bin/env bash
set -e
TS="$(date +%Y%m%d_%H%M%S)"
DEST="backups/$TS"
mkdir -p "$DEST"
FILES=(
"src/app/page.tsx"
"src/app/api/listings/route.ts"
"src/app/api/listings/filters/route.ts"
"src/app/api/listings/popular-categories/route.ts"
)
for f in "${FILES[@]}"; do
[ -f "$f" ] || continue
mkdir -p "$DEST/$(dirname "$f")"
cp "$f" "$DEST/$f"
done
echo "Backup created: $DEST"

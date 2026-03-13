#!/usr/bin/env bash
set -e
PORT="${1:-3001}"
BASE="http://localhost:$PORT"
check() {
code=$(curl -s -o /tmp/devcheck.out -w "%{http_code}" "$1" || true)
if [[ "$code" =~ ^2|3 ]]; then echo "✅ $2 ($code)"; else echo "❌ $2 ($code)"; fi
}
check "$BASE/" "Home"
check "$BASE/api/listings?page=1&limit=5" "Listings API"
check "$BASE/api/listings/filters" "Filters API"
check "$BASE/api/listings/popular-categories" "Popular Categories API"
check "$BASE/privacy-policy" "Privacy Policy"
check "$BASE/terms-of-use" "Terms of Use"

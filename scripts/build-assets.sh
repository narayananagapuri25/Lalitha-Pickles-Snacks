#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PARTS="$ROOT/.github/asset-parts"
OUTPUT="$ROOT/assets/product-photo-sprite.avif"

mkdir -p "$ROOT/assets"
shopt -s nullglob
parts=("$PARTS"/product-photo-sprite-*.b64)
if [[ "${#parts[@]}" -ne 11 ]]; then
  echo "Expected 11 photo-sheet parts in $PARTS; found ${#parts[@]}." >&2
  exit 1
fi

cat "${parts[@]}" | tr -d '\r\n' | base64 --decode > "$OUTPUT"
magic="$(od -An -tx1 -N12 "$OUTPUT" | tr -d ' \n')"
if [[ "$magic" != "000000206674797061766966" ]]; then
  echo "Generated photo asset is not a valid AVIF file." >&2
  rm -f "$OUTPUT"
  exit 1
fi

echo "Built AI product photo sheet: $OUTPUT ($(wc -c < "$OUTPUT") bytes)"

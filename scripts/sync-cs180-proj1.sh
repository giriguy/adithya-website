#!/bin/bash
# Copy CS 180 Project 1 outputs into public/cs180/proj1/, downscaling the
# full-resolution ones to 1400px wide so the site stays light.
#
# Re-run it whenever the colorizer writes more files:
#   ./scripts/sync-cs180-proj1.sh
set -euo pipefail

SRC="${1:-$HOME/Desktop/CS180/proj1_output}"
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/cs180/proj1"
MAX_WIDTH=1400

mkdir -p "$DEST"
for f in "$SRC"/*_colorized.jpg; do
  [ -e "$f" ] || { echo "no *_colorized.jpg in $SRC"; exit 1; }
  base="$(basename "$f" _colorized.jpg)"
  width="$(sips -g pixelWidth "$f" | tail -1 | awk '{print $2}')"
  if [ "$width" -gt "$MAX_WIDTH" ]; then
    sips -s format jpeg -s formatOptions 85 --resampleWidth "$MAX_WIDTH" "$f" --out "$DEST/$base.jpg" >/dev/null
  else
    cp "$f" "$DEST/$base.jpg"
  fi
  echo "synced $base ($width px)"
done

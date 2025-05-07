#!/bin/bash

ROOT_DIR="${1:-.}"

generate_filelist() {
  local DIR="$1"
  local FILELIST="$DIR/filelist.json"

  echo "[" > "$FILELIST"
  local FIRST=true

  for ENTRY in "$DIR"/*; do
    [ -e "$ENTRY" ] || continue
    [ "$(basename "$ENTRY")" = "filelist.json" ] && continue

    NAME=$(basename "$ENTRY")
    MODIFIED=$(date -r "$ENTRY" "+%b %e %Y, %H:%M")
    TYPE="file"
    SIZE=$(stat -c %s "$ENTRY" 2>/dev/null)

    if [ -d "$ENTRY" ]; then
      TYPE="folder"
      SIZE=null
    fi

    if [ "$FIRST" = true ]; then
      FIRST=false
    else
      echo "," >> "$FILELIST"
    fi

    echo "  {" >> "$FILELIST"
    echo "    \"name\": \"${NAME}\"," >> "$FILELIST"
    echo "    \"modified\": \"${MODIFIED}\"," >> "$FILELIST"
    echo "    \"size\": ${SIZE}," >> "$FILELIST"
    echo "    \"type\": \"${TYPE}\"" >> "$FILELIST"
    echo -n "  }" >> "$FILELIST"
  done

  echo "" >> "$FILELIST"
  echo "]" >> "$FILELIST"
}

export -f generate_filelist

find "$ROOT_DIR" -type d -exec bash -c 'generate_filelist "$0"' {} \;

echo "✅ All filelist.json files generated."

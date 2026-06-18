#!/bin/bash

# HEIC to JPG Converter
# Converts all HEIC/heic images in a directory to optimized JPG format
# Usage: ./scripts/convert-heic-to-jpg.sh [directory] [quality]
# Example: ./scripts/convert-heic-to-jpg.sh public/images/homepage 75

set -e

# Default values
TARGET_DIR="${1:-.}"
QUALITY="${2:-75}"
WIDTH="${3:-1600}"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}HEIC to JPG Converter${NC}"
echo "Directory: $TARGET_DIR"
echo "Quality: $QUALITY"
echo "Max Width: ${WIDTH}px"
echo ""

# Counter
converted=0
skipped=0

# Find and convert all HEIC files
while IFS= read -r file; do
    if [[ -z "$file" ]]; then
        continue
    fi
    
    output="${file%.*}.jpg"
    
    if [[ -f "$output" ]]; then
        echo -e "${YELLOW}⊘${NC} Skipped: $file (JPG already exists)"
        ((skipped++))
    else
        echo -e "${BLUE}↻${NC} Converting: $file → $output"
        sips -s format jpeg \
             -s formatOptions "$QUALITY" \
             --resampleWidth "$WIDTH" \
             "$file" \
             --out "$output" >/dev/null 2>&1
        echo -e "${GREEN}✓${NC} Converted: $output"
        rm "$file"
        echo -e "${GREEN}✓${NC} Deleted: $file"
        ((converted++))
    fi
done < <(find "$TARGET_DIR" -iname "*.heic" 2>/dev/null)

# Summary
echo ""
echo -e "${GREEN}Done!${NC}"
echo "Converted: $converted"
echo "Skipped: $skipped"

#!/bin/bash
# ═══════════════════════════════════════════════════════════
# PARVUS SPACE — Video to WebP Frame Sequence Converter
# ═══════════════════════════════════════════════════════════
#
# Usage: 
#   bash scripts/extract-frames.sh input_video.mp4
#
# Requirements: FFmpeg installed
#
# Output: public/sequence/frame_0001.webp, frame_0002.webp, ...
# ═══════════════════════════════════════════════════════════

INPUT=$1
OUTPUT_DIR="public/sequence"
FPS=30
QUALITY=78
WIDTH=1920

if [ -z "$INPUT" ]; then
  echo "❌ Usage: bash scripts/extract-frames.sh <video_file>"
  exit 1
fi

if ! command -v ffmpeg &> /dev/null; then
  echo "❌ FFmpeg not found. Install it first."
  exit 1
fi

echo "🎬 Extracting frames from: $INPUT"
echo "   → Output: $OUTPUT_DIR/"
echo "   → FPS: $FPS | Quality: $QUALITY | Width: ${WIDTH}px"

# Clean previous frames
rm -f "$OUTPUT_DIR"/frame_*.webp

# Extract PNG frames, resize, then convert to WebP
ffmpeg -i "$INPUT" \
  -vf "fps=$FPS,scale=$WIDTH:-1:flags=lanczos" \
  -compression_level 4 \
  -quality $QUALITY \
  "$OUTPUT_DIR/frame_%04d.webp" \
  -y -loglevel warning

FRAME_COUNT=$(ls -1 "$OUTPUT_DIR"/frame_*.webp 2>/dev/null | wc -l)
TOTAL_SIZE=$(du -sh "$OUTPUT_DIR" | cut -f1)

echo ""
echo "✅ Done!"
echo "   Frames: $FRAME_COUNT"
echo "   Total size: $TOTAL_SIZE"
echo ""
echo "📝 Update ScrollSequence in App.jsx:"
echo "   frameCount={$FRAME_COUNT}"

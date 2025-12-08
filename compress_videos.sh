#!/bin/bash

# Directory containing videos
VIDEO_DIR="sceneset-elevate-miami/public/videos"

# Check if directory exists
if [ ! -d "$VIDEO_DIR" ]; then
  echo "Video directory not found!"
  exit 1
fi

echo "Starting compression..."

# Loop through all video files
find "$VIDEO_DIR" -type f \( -name "*.mp4" -o -name "*.mov" -o -name "*.webm" \) | while read file; do
  echo "Processing $file..."
  
  # Get filename without extension
  filename=$(basename -- "$file")
  extension="${filename##*.}"
  filename="${filename%.*}"
  
  # Define output path (always mp4 for better compression/compat)
  output="${VIDEO_DIR}/${filename}_compressed.mp4"
  
  # Compress
  # -crf 26: Constant Rate Factor (lower is better quality, higher is lower size. 23 is default, 26 is smaller)
  # -preset fast: Speed/compression trade-off
  # -pix_fmt yuv420p: Ensure compatibility
  ffmpeg -y -i "$file" -vcodec libx264 -crf 26 -preset fast -acodec aac -b:a 128k -pix_fmt yuv420p "$output" < /dev/null
  
  if [ $? -eq 0 ]; then
    # If successful, replace original
    # If original was not mp4, remove it (since we have a new mp4)
    if [ "$file" != "${VIDEO_DIR}/${filename}.mp4" ]; then
      rm "$file"
    fi
    mv "$output" "${VIDEO_DIR}/${filename}.mp4"
    echo "Compressed ${filename}.mp4"
  else
    echo "Failed to compress $file"
    rm -f "$output"
  fi
done

echo "Compression complete."


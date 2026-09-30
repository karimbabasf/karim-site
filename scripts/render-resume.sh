#!/bin/sh
# Renders public/Karim-Baba-Resume.pdf to the image the /resume page shows.
# Run it after every PDF change, or the view and the download drift apart.
set -e
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
pdftoppm -r 200 -png -singlefile public/Karim-Baba-Resume.pdf "$tmp/resume"
cwebp -quiet -q 88 "$tmp/resume.png" -o public/resume.webp
rm -rf "$tmp"
sips -g pixelWidth -g pixelHeight public/resume.webp | tail -2

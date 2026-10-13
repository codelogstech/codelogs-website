#!/usr/bin/env bash
#
# Build the landing film: stock footage with CodeLogs' captions and small
# animated pieces of our work over it.
#
#   scripts/build-film.sh                       # the homepage film (a muted loop under the hero)
#   scripts/build-film.sh probank               # the Explore ProBank page's film
#   FILM_SRC=/path/to/clips scripts/build-film.sh
#
# Footage: free Pexels clips (Pexels licence: free for commercial use, no
# attribution required), kept by id in ~/Downloads/CodeLogs/Pexels/<id>.mp4.
# Get one with:
#   curl -L -o <id>.mp4 https://www.pexels.com/download/video/<id>/
# Overlay: scripts/film/overlay.html, each scene's captions and animated UI on a
# timeline, rendered frame by frame with a transparent background
# (render-overlay.mjs, Playwright). Its scenes are in the same order as SCENES
# below; change a length here and the overlay follows.
#
set -euo pipefail

FILM="${1:-home}"
SRC="${FILM_SRC:-$HOME/Downloads/CodeLogs/Pexels}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/assets/film"
export PLAYWRIGHT_MODULE="${PLAYWRIGHT_MODULE:-$(npm root -g)/playwright}"
FPS=25

# scene : pexels id : start (s) : length (s) [: vertical crop anchor, 0 top · 0.5 centre · 1 bottom]
case "$FILM" in
  home)
    NAME=codelogs-film FADE=0.8 LOOP=1 POSTER=3.6 CRF=26
    SCENES=(
      "intro:39648416:5.0:5.5"
      "design:33237483:3.0:5.5"
      "develop:6804109:9.0:5.5"
      "deliver:1085656:6.0:5.5"
      "apps:7504976:1.0:6.0"
      "ai:8061381:1.0:5.5"
      "data:7252683:4.0:5.5"
      "services:7581174:3.0:6.0"
      "outro:38735892:5.0:6.0"
    ) ;;
  probank)
    # the Explore ProBank page: a day at a co-operative branch, counter to day end
    NAME=probank-film FADE=0.8 LOOP=1 POSTER=3.0 CRF=30
    SCENES=(
      "intro:34802956:10.0:5.5"
      "counter:15534764:1.0:5.5"
      "checker:7581380:2.0:5.5"
      "gold:36353836:0.5:5.5"
      "farmers:5636708:5.0:5.5"
      "mobile:32045282:0.3:6.0"
      "payments:30292925:6.0:5.5"
      "dayend:35331912:1.5:5.5"
      "outro:13327036:4.0:6.0"
    ) ;;
  *) echo "Unknown film: $FILM (home | probank)" >&2; exit 1 ;;
esac

inputs=()
filters=""
lens=""
n=${#SCENES[@]}
for i in "${!SCENES[@]}"; do
  IFS=: read -r scene id start len anchor <<<"${SCENES[$i]}"
  clip="$SRC/$id.mp4"
  [[ -f "$clip" ]] || { echo "Missing $clip ($scene)" >&2; exit 1; }
  inputs+=(-ss "$start" -t "$len" -i "$clip")
  lens+="${lens:+,}$len"
  # footage: fill 1920×1080, a touch darker and calmer so the words read over it
  filters+="[$i:v]fps=$FPS,scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,crop=1920:1080:0:(ih-1080)*${anchor:-0.5},eq=brightness=-0.04:saturation=0.9,format=yuv420p,setsar=1,settb=AVTB[s$i];"
done

prev="s0"
running=$(cut -d: -f4 <<<"${SCENES[0]}")
for (( i=1; i<n; i++ )); do
  len=$(cut -d: -f4 <<<"${SCENES[$i]}")
  offset=$(awk -v r="$running" -v f="$FADE" 'BEGIN{printf "%.3f", r-f}')
  filters+="[$prev][s$i]xfade=transition=fade:duration=$FADE:offset=$offset[x$i];"
  prev="x$i"
  running=$(awk -v r="$running" -v l="$len" -v f="$FADE" 'BEGIN{printf "%.3f", r+l-f}')
done

FRAMES="$(mktemp -d)/overlay"
trap 'rm -rf "$(dirname "$FRAMES")"' EXIT
echo "Rendering the $FILM overlay (${running}s)…"
node "$ROOT/scripts/film/render-overlay.mjs" "$FRAMES" "$FADE" "$lens" "$FPS" "$FILM" "$LOOP"

filters+="[$n:v]format=rgba[ov];[$prev][ov]overlay=0:0:format=auto:shortest=1,format=yuv420p[film]"

echo "Building $NAME: 1920×1080, ${running}s"
mkdir -p "$OUT"
ffmpeg -v error -y "${inputs[@]}" -framerate "$FPS" -i "$FRAMES/%05d.png" -filter_complex "$filters" -map "[film]" -an \
  -c:v libx264 -preset slow -crf "$CRF" -profile:v high -pix_fmt yuv420p -movflags +faststart \
  "$OUT/$NAME.mp4"
# the poster: a frame once the intro's words are in
ffmpeg -v error -y -ss "$POSTER" -i "$OUT/$NAME.mp4" -frames:v 1 -f image2pipe -vcodec png - | cwebp -quiet -q 82 -o "$OUT/$NAME-poster.webp" -- -
ls -lh "$OUT/$NAME".mp4 "$OUT/$NAME-poster.webp"

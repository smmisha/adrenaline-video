#!/usr/bin/env bash
# Рендерит только звуковую дорожку (озвучка + звуки + музыка) под видео.
# Запуск: bash render-audio.sh <ru|uk|en>   → out/audio-<lang>.wav и .m4a
set -e
L=${1:-ru}
cd "$(dirname "$0")"
npx remotion render Adrenaline "out/mix-$L.wav" --codec=wav --props="{\"lang\":\"$L\"}"
ffmpeg -y -loglevel error -i "out/mix-$L.wav" -af "alimiter=limit=0.79:attack=5:release=50:level=false" -ar 48000 "out/audio-$L.wav"
ffmpeg -y -loglevel error -i "out/audio-$L.wav" -c:a aac -b:a 256k "out/audio-$L.m4a"
rm "out/mix-$L.wav"
echo "готово: out/audio-$L.wav, out/audio-$L.m4a"

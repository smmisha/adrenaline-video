#!/usr/bin/env bash
# Приводит все звуки к общему уровню, чтобы громкости в audio.tsx
# задавали иерархию: озвучка > звуки элементов > музыка.
set -e
cd "$(dirname "$0")/public"
F="ffmpeg -y -loglevel error"
mkdir -p norm/voice norm/sfx norm/music
# Озвучка: -16 LUFS, пик не выше -1.5 dB
for f in voiceover/qwen/*.wav; do
  $F -i "$f" -af "loudnorm=I=-16:TP=-1.5:LRA=11" -ar 44100 "norm/voice/$(basename "$f")"
done
# Звуки элементов: пик -3 dB (короткие звуки точнее выравнивать по пику)
for f in sfx/*.wav; do
  gain=$(ffmpeg -hide_banner -i "$f" -af volumedetect -f null - 2>&1 | grep -oE "max_volume: [-0-9.]+" | awk '{print -3 - $2}')
  $F -i "$f" -af "volume=${gain}dB" "norm/sfx/$(basename "$f")"
done
# Музыка: -16 LUFS
$F -i music/bg.mp3 -af "loudnorm=I=-16:TP=-1.5:LRA=11" -ar 44100 norm/music/bg.wav
echo done

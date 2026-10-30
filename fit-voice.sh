#!/usr/bin/env bash
# Вписывает озвучку другого языка в тайминг видео (он рассчитан по русской).
# Нормализует до -16 LUFS и, если фраза длиннее окна сцены, ускоряет её
# без изменения высоты голоса (atempo).
# Запуск: bash fit-voice.sh <lang> <папка с исходниками в public/voiceover>
#   bash fit-voice.sh en qwen-en
#   bash fit-voice.sh uk omni-uk
set -e
LANG_CODE=$1
SRC=$2
cd "$(dirname "$0")"
mkdir -p "public/norm/voice-$LANG_CODE"
# окно сцены = длина русской фразы + запас (VOICE_TAIL 20 кадров минус 5 на тишину)
node -e 'const c=require("./src/adrenaline/audio-config.json");console.log(c.voiceover.map(v=>((v.frames+15)/30).toFixed(3)).join(" "))' > /tmp/windows.txt
read -ra WINDOWS < /tmp/windows.txt
for i in 1 2 3 4 5 6; do
  in="public/voiceover/$SRC/scene-$i.wav"
  out="public/norm/voice-$LANG_CODE/scene-$i.wav"
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")
  win=${WINDOWS[$((i-1))]}
  tempo=$(awk -v d="$dur" -v w="$win" 'BEGIN{t=d/w; if(t<1)t=1; printf "%.3f", t}')
  ffmpeg -y -loglevel error -i "$in" -af "atempo=$tempo,loudnorm=I=-16:TP=-1.5:LRA=11" -ar 44100 "$out"
  flag=$(awk -v t="$tempo" 'BEGIN{ if(t>1.15) print "  <-- заметно ускорено, лучше сократить текст"; }')
  echo "scene $i: ${dur}s, окно ${win}s, темп x$tempo$flag"
done

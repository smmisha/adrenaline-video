# Adrenaline — a vertical explainer built with Remotion

A 9:16 short about what adrenaline does to the body, written as code: six animated
scenes, a cloned voice-over and one render command. 1080×1920 at 30 fps — ready for
Reels, Shorts and TikTok.

The composition walks the whole chain: a scare, the signal from the brain, the adrenal
glands releasing the hormone, the physical effects, fight-or-flight and the crash
afterwards.

## Stack

- Remotion 4, React 19, TypeScript, Tailwind 4
- `@remotion/transitions` (fade and slide) and `@remotion/media`
- ElevenLabs — or a free Hugging Face Space — for the cloned voice
- ffmpeg for loudness normalisation and the final limiter

## Scenes

| # | Composition | Content |
|---|---|---|
| 1 | `Hook` | Heart pounding, palms sweating, time slowing down |
| 2 | `Trigger` | The brain spots danger and signals the adrenal glands |
| 3 | `Release` | Adrenaline reaches the blood within seconds |
| 4 | `Effects` | Faster heart, wider bronchi, dilated pupils, fuel for the muscles |
| 5 | `FightFlight` | Fight, flight or freeze — digestion on pause |
| 6 | `After` | The hormone breaks down, leaving shaking hands and fatigue |

Scene length is not hard-coded: a scene stretches to fit its narration, and the total
duration is derived from those numbers (`src/adrenaline/audio.tsx`).

## Quick start

```bash
npm install
npm run dev     # Remotion Studio: the "Adrenaline" composition or any scene in "Adrenaline-Scenes"
npm run lint    # eslint + tsc
```

Requirements: Node.js 18+, ffmpeg on `PATH` for the audio scripts, and Python 3 only if
you clone the voice locally.

## Narration

The video is narrated in Russian by default; Ukrainian and English are fitted into the
same timing. The texts live in `voice_texts.py` (cloning flow) and in
`generate-voiceover.mjs` (ElevenLabs flow) — edit both when the script changes.

### Option A — ElevenLabs voice clone

```powershell
$env:ELEVENLABS_API_KEY = "..."
$env:ELEVENLABS_VOICE_ID = "..."
node generate-voiceover.mjs
```

The script writes one MP3 per scene to `public/voiceover/` and updates the frame counts
in `src/adrenaline/audio-config.json`, so the video re-times itself.

### Option B — free Hugging Face Space (Qwen3-TTS / OmniVoice)

```bash
python clone-voice.py qwen ru     # ru, en
python clone-voice.py omni uk     # ru, uk, en
```

The reference recording and texts are set in `voice_texts.py`; output goes to
`public/voiceover/<engine>/`.

## Audio pipeline

The mix hierarchy is set in code, not by ear: voice at 100 %, sound effects at 20 %,
music at 18 % (`src/adrenaline/audio.tsx`).

```bash
bash normalize-audio.sh          # voice and music to -16 LUFS, SFX peaks to -3 dB
bash fit-voice.sh en qwen-en     # squeeze the English voice into the Russian timing
bash render-audio.sh en          # audio-only render: out/audio-en.wav and .m4a
```

`fit-voice.sh` speeds a phrase up with `atempo` (no pitch shift) and warns when the
result is over 1.15× — a sign that the translation should be shortened.

## Render

```bash
npm run render
```

Runs `remotion render Adrenaline` and then a limiter pass, producing
`out/adrenaline-final.mp4`. `out/` is git-ignored.

## Project layout

```text
src/adrenaline/          scenes, theme, audio helpers and audio-config.json
public/voiceover/        raw narration
public/norm/             normalised voice, music and SFX used by the composition
public/norm/voice-uk|en/ non-Russian narration fitted to the Russian timing
voice_texts.py           narration texts and the reference recording for cloning
generate-voiceover.mjs   ElevenLabs voice-over generator
clone-voice.py           Qwen3-TTS / OmniVoice cloning through a Hugging Face Space
```

## License

No license is granted for the code or the audio assets in this repository.

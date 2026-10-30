# Клонирует голос из michael_rec_01.mp3 через HF Space и озвучивает сцены.
# Запуск: python clone-voice.py <qwen|omni> [ru|uk|en] [номера сцен с 0...]
#   qwen — Qwen/Qwen3-TTS (ru, en), omni — k2-fsa/OmniVoice (ru, uk, en)
import subprocess, sys
from pathlib import Path
from gradio_client import Client, handle_file

from voice_texts import LANG_NAME, REF, REF_TEXT, SCENES

engine = sys.argv[1] if len(sys.argv) > 1 else "qwen"
lang = sys.argv[2] if len(sys.argv) > 2 else "ru"
only = [int(x) for x in sys.argv[3:]] or range(len(SCENES[lang]))
out = Path(f"public/voiceover/{engine}" + ("" if lang == "ru" else f"-{lang}"))
out.mkdir(parents=True, exist_ok=True)

if engine == "qwen":
    if lang == "uk":
        sys.exit("Qwen3-TTS не поддерживает украинский — используйте omni")
    c = Client("Qwen/Qwen3-TTS", verbose=False)
    gen = lambda t: c.predict(handle_file(REF), REF_TEXT, t, LANG_NAME[lang], False, "1.7B",
                              api_name="/generate_voice_clone")
else:
    c = Client("k2-fsa/OmniVoice", verbose=False)
    gen = lambda t: c.predict(t, LANG_NAME[lang], handle_file(REF), REF_TEXT, "", 32, 2.0,
                              True, 1.0, None, True, True, api_name="/_clone_fn")

for i in only:
    audio, status = gen(SCENES[lang][i])
    dst = out / f"scene-{i+1}.wav"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", audio, "-ar", "44100", str(dst)], check=True)
    print(f"scene {i+1}: {status}", flush=True)

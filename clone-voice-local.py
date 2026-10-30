# Клонирует голос локально на видеокарте через OmniVoice (без квот и облака).
# Модель под лицензией CC-BY-NC — только для некоммерческих роликов.
# Запуск (из папки проекта):
#   C:\Users\Michael\.venvs\omnivoice\Scripts\python clone-voice-local.py <uk|en|ru> [номера сцен с 0...]
import sys
from pathlib import Path

import soundfile as sf
import torch
from omnivoice import OmniVoice

from voice_texts import LANG_NAME, REF, REF_TEXT, SCENES

lang = sys.argv[1] if len(sys.argv) > 1 else "uk"
only = [int(x) for x in sys.argv[2:]] or range(len(SCENES[lang]))
out = Path(f"public/voiceover/omni-local-{lang}")
out.mkdir(parents=True, exist_ok=True)

model = OmniVoice.from_pretrained("k2-fsa/OmniVoice", device_map="cuda:0", dtype=torch.float16)
prompt = model.create_voice_clone_prompt(ref_audio=REF, ref_text=REF_TEXT)

for i in only:
    audio = model.generate(
        text=SCENES[lang][i], language=LANG_NAME[lang], voice_clone_prompt=prompt
    )
    sf.write(out / f"scene-{i+1}.wav", audio[0], model.sampling_rate)
    print(f"scene {i+1}: {len(audio[0]) / model.sampling_rate:.2f}s", flush=True)

// Генерирует озвучку по сценам голосом из ElevenLabs и записывает
// длительности в src/adrenaline/audio-config.json (видео подстроится само).
//
// Запуск (PowerShell):
//   $env:ELEVENLABS_API_KEY = "ваш_ключ"
//   $env:ELEVENLABS_VOICE_ID = "id_вашего_клона"
//   node generate-voiceover.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const key = process.env.ELEVENLABS_API_KEY;
const voiceId = process.env.ELEVENLABS_VOICE_ID;
if (!key || !voiceId) {
  console.error("Задайте ELEVENLABS_API_KEY и ELEVENLABS_VOICE_ID.");
  process.exit(1);
}

// Один абзац на сцену. Можно править текст и запускать заново.
const SCENES = [
  "Сердце колотится. Ладони потеют. Время будто замедляется. Это — адреналин.",
  "Мозг замечает опасность и шлёт сигнал по нервам прямо к надпочечникам, которые сидят над почками.",
  "Надпочечники выбрасывают адреналин в кровь. Эффект наступает уже через несколько секунд.",
  "Сердце бьётся чаще и сильнее. Бронхи расширяются, и в кровь попадает больше кислорода. Зрачки расширяются. Мышцы получают кровь и глюкозу — то есть энергию.",
  "Тело готово к реакции: бей, беги или замри. Всё лишнее, например пищеварение, ставится на паузу.",
  "Опасность позади, и гормон распадается за считанные минуты. Остаются дрожь в руках и внезапная усталость. Так тело спасает тебя за секунды.",
];

const FPS = 30;
mkdirSync("public/voiceover", { recursive: true });
const voiceover = [];

for (const [i, text] of SCENES.entries()) {
  const file = `voiceover/scene-${i + 1}.mp3`;
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": key,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: { stability: 0.5, similarity_boost: 0.75, style: 0.3 },
      }),
    },
  );
  if (!res.ok) {
    console.error(`Сцена ${i + 1}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  writeFileSync(`public/${file}`, Buffer.from(await res.arrayBuffer()));
  const seconds = parseFloat(
    execFileSync("ffprobe", [
      "-v", "error", "-show_entries", "format=duration",
      "-of", "csv=p=0", `public/${file}`,
    ]).toString(),
  );
  const frames = Math.ceil(seconds * FPS);
  voiceover.push({ file, frames });
  console.log(`Сцена ${i + 1}: ${seconds.toFixed(2)} с`);
}

const cfgPath = "src/adrenaline/audio-config.json";
const cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
cfg.voiceover = voiceover;
writeFileSync(cfgPath, JSON.stringify(cfg, null, 2) + "\n");
console.log("Готово. Теперь: npx remotion render Adrenaline out/adrenaline.mp4");

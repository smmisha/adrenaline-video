import { Audio } from "@remotion/media";
import { interpolate, staticFile, useVideoConfig } from "remotion";
import config from "./audio-config.json";

export const SFX_VOLUME = 0.2; // 2nd: element sounds, peaks ~-17 dBFS
export const MUSIC_VOLUME = 0.18; // 3rd: background, ~-31 LUFS
export const VOICE_VOLUME = 1; // 1st: voice, normalized to -16 LUFS

export const TRANSITION_FRAMES = 15;
const BASE_SCENE_FRAMES = [150, 210, 150, 360, 150, 240];

// Voiceover starts half a second into the scene and the scene is
// stretched if the narration is longer than the animation.
export const VOICE_DELAY = 15;
export const VOICE_TAIL = 20;

export type VoiceScene = { file: string; frames: number };
const voice = config.voiceover as VoiceScene[];

export const sceneFrames = () =>
  BASE_SCENE_FRAMES.map((base, i) =>
    voice[i] ? Math.max(base, voice[i].frames + VOICE_DELAY + VOICE_TAIL) : base,
  );

export const totalFrames = () =>
  sceneFrames().reduce((a, b) => a + b, 0) -
  (BASE_SCENE_FRAMES.length - 1) * TRANSITION_FRAMES;

// Scene-local sound effect, always at 20% volume
export const Sfx: React.FC<{ name: string; at: number }> = ({ name, at }) => (
  <Audio src={staticFile(`norm/sfx/${name}.wav`)} from={at} volume={SFX_VOLUME} />
);

export type Lang = "ru" | "uk" | "en";

// Scene timing always follows the Russian narration; other languages are
// fitted into the same windows by fit-voice.sh (norm/voice-<lang>/).
export const SceneVoice: React.FC<{ index: number; lang?: Lang }> = ({
  index,
  lang = "ru",
}) => {
  const v = voice[index];
  if (!v) return null;
  const file =
    lang === "ru" ? v.file : `norm/voice-${lang}/scene-${index + 1}.wav`;
  return (
    <Audio
      src={staticFile(file)}
      from={VOICE_DELAY}
      volume={VOICE_VOLUME}
    />
  );
};

// Background track at 5%, with a 1s fade-in and a 2s fade-out at the end
export const Music: React.FC = () => {
  const { durationInFrames } = useVideoConfig();
  if (!config.music) return null;
  return (
    <Audio
      src={staticFile(config.music)}
      loop
      volume={(f) =>
        MUSIC_VOLUME *
        interpolate(
          f,
          [0, 30, durationInFrames - 60, durationInFrames],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        )
      }
    />
  );
};

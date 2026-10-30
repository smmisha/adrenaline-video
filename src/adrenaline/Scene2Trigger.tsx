import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "./Background";
import { Sfx } from "./audio";
import { Body } from "./Body";
import { C, body, prog, rise, title } from "./theme";

// Danger → brain → nerve signal → adrenal glands
export const Scene2Trigger: React.FC = () => {
  const frame = useCurrentFrame();
  const brainGlow = prog(frame, 20, 40);
  const signal = prog(frame, 60, 110);
  const adrenalGlow =
    prog(frame, 105, 120) * interpolate(Math.sin(frame / 3), [-1, 1], [0.7, 1]);

  return (
    <AbsoluteFill>
      <Background />
      <Sfx name="tick" at={0} />
      <Sfx name="tick" at={20} />
      <Sfx name="zap" at={60} />
      <Sfx name="tick" at={100} />
      <Sfx name="note-g5" at={105} />
      <AbsoluteFill
        style={{ alignItems: "center", paddingTop: 140, paddingInline: 90 }}
      >
        <div style={{ ...title, fontSize: 88, ...rise(frame, 0) }}>
          <span style={{ color: C.red }}>Опасность!</span>
        </div>
        <div style={{ ...body, marginTop: 24, height: 140, ...rise(frame, 20) }}>
          {frame < 100 ? (
            <>
              Мозг замечает угрозу
              <br />и шлёт сигнал по нервам
            </>
          ) : (
            <>
              …прямо к <span style={{ color: C.orange }}>надпочечникам</span>
              <br />
              над почками
            </>
          )}
        </div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 60,
          opacity: prog(frame, 5, 25),
        }}
      >
        <Body brainGlow={brainGlow} adrenalGlow={adrenalGlow} signal={signal} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

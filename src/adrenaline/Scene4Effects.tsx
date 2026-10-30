import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "./Background";
import { Sfx } from "./audio";
import { C, body, fontFamily, prog, rise, title } from "./theme";

// Four effects on the body, each card enters one after another
const EFFECTS = [
  {
    icon: "❤️",
    name: "Сердце",
    text: "бьётся чаще и сильнее",
    color: C.red,
  },
  {
    icon: "🫁",
    name: "Лёгкие",
    text: "бронхи расширяются — больше кислорода",
    color: C.blue,
  },
  {
    icon: "👁️",
    name: "Глаза",
    text: "зрачки расширяются",
    color: C.yellow,
  },
  {
    icon: "💪",
    name: "Мышцы",
    text: "получают кровь и глюкозу — энергию",
    color: C.orange,
  },
];

const STEP = 75;

export const Scene4Effects: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background />
      <Sfx name="tick" at={0} />
      {/* one pitch per card, rising like a scale */}
      <Sfx name="note-c5" at={25} />
      <Sfx name="note-e5" at={25 + STEP} />
      <Sfx name="note-g5" at={25 + 2 * STEP} />
      <Sfx name="note-c6" at={25 + 3 * STEP} />
      <AbsoluteFill
        style={{ alignItems: "center", paddingTop: 150, paddingInline: 80 }}
      >
        <div style={{ ...title, fontSize: 84, ...rise(frame, 0) }}>
          Что происходит
          <br />
          <span style={{ color: C.red }}>в теле</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 34,
            marginTop: 70,
            width: "100%",
          }}
        >
          {EFFECTS.map((e, i) => {
            const start = 25 + i * STEP;
            const active = frame >= start && frame < start + STEP + 10;
            // heart icon keeps beating
            const beat =
              i === 0 ? Math.max(0, Math.sin(frame / 3.5)) ** 6 * 0.18 : 0;
            return (
              <div
                key={e.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 36,
                  padding: "30px 40px",
                  borderRadius: 36,
                  background: "rgba(255,255,255,0.06)",
                  border: `3px solid ${active ? e.color : "rgba(255,255,255,0.08)"}`,
                  boxShadow: active ? `0 0 40px ${e.color}55` : "none",
                  opacity: prog(frame, start, start + 18),
                  translate: `${interpolate(prog(frame, start, start + 18), [0, 1], [-120, 0])}px 0px`,
                }}
              >
                <div style={{ fontSize: 110, scale: 1 + beat }}>{e.icon}</div>
                <div>
                  <div
                    style={{
                      fontFamily,
                      fontWeight: 800,
                      fontSize: 60,
                      color: e.color,
                    }}
                  >
                    {e.name}
                  </div>
                  <div style={{ ...body, textAlign: "left", fontSize: 44 }}>
                    {e.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

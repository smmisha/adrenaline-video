import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "./Background";
import { Sfx } from "./audio";
import { C, body, prog, rise, title } from "./theme";

// Aftermath: adrenaline breaks down, shakiness and fatigue
export const Scene6After: React.FC = () => {
  const frame = useCurrentFrame();
  // level bar drains from 100% to ~5%
  const level = interpolate(prog(frame, 30, 120), [0, 1], [100, 5]);

  return (
    <AbsoluteFill>
      <Background intensity={interpolate(level, [5, 100], [0.3, 1])} />
      <Sfx name="tick" at={0} />
      <Sfx name="tick" at={15} />
      <Sfx name="fall" at={30} />
      <Sfx name="tick" at={40} />
      <Sfx name="tick" at={100} />
      <Sfx name="note-c5" at={150} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingInline: 90,
          gap: 50,
        }}
      >
        <div style={{ ...title, fontSize: 88, ...rise(frame, 0) }}>
          Опасность <span style={{ color: C.blue }}>позади</span>
        </div>
        <div style={{ width: 820, ...rise(frame, 15) }}>
          <div
            style={{ ...body, fontSize: 40, textAlign: "left", marginBottom: 16 }}
          >
            Уровень адреналина
          </div>
          <div
            style={{
              height: 60,
              borderRadius: 30,
              background: "rgba(255,255,255,0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${level}%`,
                height: "100%",
                borderRadius: 30,
                background: `linear-gradient(90deg, ${C.orange}, ${C.red})`,
              }}
            />
          </div>
        </div>
        <div style={{ ...body, ...rise(frame, 40) }}>
          Гормон распадается
          <br />
          за считанные <span style={{ color: C.text }}>минуты</span>
        </div>
        <div style={{ ...body, ...rise(frame, 100) }}>
          Остаются дрожь в руках
          <br />и внезапная усталость
        </div>
        <div
          style={{
            ...title,
            fontSize: 64,
            marginTop: 30,
            color: C.yellow,
            ...rise(frame, 150),
          }}
        >
          Так тело спасает тебя
          <br />
          за секунды ⚡
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "./Background";
import { Sfx } from "./audio";
import { C, body, prog, rise, title } from "./theme";

const FREEZE = 120; // frame where "ЗАМРИ" lands and all motion stops (synced to voice)

// "Fight, flight or freeze" punchline
export const Scene5FightFlight: React.FC = () => {
  const frame = useCurrentFrame();
  // words tremble until "ЗАМРИ" lands, then everything stops dead
  const shake = frame < FREEZE ? Math.sin(frame * 2.3) * 7 : 0;

  const word = (start: number): React.CSSProperties => ({
    ...title,
    fontSize: 140,
    opacity: prog(frame, start, start + 12),
    scale: interpolate(prog(frame, start, start + 12), [0, 1], [1.6, 1]),
  });

  return (
    <AbsoluteFill>
      <Background intensity={frame < FREEZE ? 1.6 : 0.8} />
      <Sfx name="tick" at={0} />
      <Sfx name="impact" at={63} />
      <Sfx name="impact" at={88} />
      <Sfx name="tick" at={110} />
      <Sfx name="note-c6" at={FREEZE} />
      <Sfx name="tick" at={138} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingInline: 90,
          gap: 20,
        }}
      >
        <div style={{ ...body, marginBottom: 20, ...rise(frame, 0) }}>
          Тело готово к реакции
        </div>
        <div
          style={{ ...word(63), color: C.red, translate: `${shake}px 0px` }}
        >
          БЕЙ
        </div>
        <div
          style={{ ...word(88), color: C.orange, translate: `${-shake}px 0px` }}
        >
          БЕГИ
        </div>
        <div style={{ ...title, fontSize: 64, ...rise(frame, 110) }}>или</div>
        <div
          style={{
            ...word(FREEZE),
            color: C.blue,
            textShadow: `0 0 ${interpolate(prog(frame, FREEZE, FREEZE + 20), [0, 1], [0, 40])}px ${C.blue}`,
          }}
        >
          ЗАМРИ
        </div>
        <div style={{ ...body, marginTop: 40, ...rise(frame, 138) }}>
          Всё лишнее — например, пищеварение —
          <br />
          ставится на паузу
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

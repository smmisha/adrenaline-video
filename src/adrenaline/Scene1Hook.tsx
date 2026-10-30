import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Background } from "./Background";
import { Sfx } from "./audio";
import { C, body, rise, title } from "./theme";

// Hook: heartbeat line + "Это — адреналин"
export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const beat = Math.max(0, Math.sin(frame / 4)) ** 8;

  // ECG path drawn left to right
  const ecg =
    "M0 100 L180 100 L210 60 L240 100 L300 100 L330 10 L370 190 L400 100 L470 100 L500 70 L530 100 L720 100";
  const draw = interpolate(frame, [0, 45], [1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background intensity={1 + beat} />
      {[6, 31, 56, 81, 106, 131].map((f) => (
        <Sfx key={f} name="thump" at={f} />
      ))}
      {[10, 28, 46].map((f) => (
        <Sfx key={f} name="tick" at={f} />
      ))}
      <Sfx name="note-c6" at={72} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 90px",
          gap: 50,
        }}
      >
        <svg width={860} height={200} viewBox="0 0 720 200">
          <path
            d={ecg}
            fill="none"
            stroke={C.red}
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={draw}
            style={{ filter: `drop-shadow(0 0 ${12 + beat * 20}px ${C.red})` }}
          />
        </svg>
        <div style={{ ...body, fontSize: 56, color: C.text, ...rise(frame, 10) }}>
          Сердце колотится.
        </div>
        <div style={{ ...body, fontSize: 56, color: C.text, ...rise(frame, 28) }}>
          Ладони потеют.
        </div>
        <div style={{ ...body, fontSize: 56, color: C.text, ...rise(frame, 46) }}>
          Время будто замедляется.
        </div>
        <div
          style={{
            ...title,
            marginTop: 40,
            ...rise(frame, 72),
            scale: 1 + beat * 0.04,
          }}
        >
          Это — <span style={{ color: C.red }}>адреналин</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

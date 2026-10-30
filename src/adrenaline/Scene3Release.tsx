import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { Background } from "./Background";
import { Sfx } from "./audio";
import { C, body, prog, rise, title } from "./theme";

// Adrenaline molecules flood the bloodstream
const PARTICLES = new Array(70).fill(0).map((_, i) => ({
  x: random(`x${i}`) * 1080,
  delay: random(`d${i}`) * 90,
  speed: 10 + random(`s${i}`) * 14,
  size: 14 + random(`r${i}`) * 26,
}));

export const Scene3Release: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Background intensity={1.4} />
      <Sfx name="tick" at={5} />
      <Sfx name="tick" at={45} />
      {/* blood vessel band */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(160,20,40,0.35) 20%, rgba(160,20,40,0.35) 80%, transparent 100%)`,
        }}
      />
      {PARTICLES.map((p, i) => {
        const t = frame - p.delay;
        if (t < 0) return null;
        const y = 1920 + 40 - t * p.speed;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x + Math.sin((t + i * 7) / 12) * 30,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: i % 3 === 0 ? C.yellow : C.orange,
              boxShadow: `0 0 ${p.size}px ${C.orange}`,
              opacity: 0.85,
            }}
          />
        );
      })}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingInline: 90,
          gap: 36,
        }}
      >
        <div
          style={{
            ...title,
            background: "rgba(13,10,18,0.75)",
            padding: "30px 40px",
            borderRadius: 32,
            ...rise(frame, 5),
          }}
        >
          Надпочечники выбрасывают{" "}
          <span style={{ color: C.orange }}>адреналин</span>{" в кровь"}
        </div>
        <div
          style={{
            ...body,
            color: C.text,
            background: "rgba(13,10,18,0.75)",
            padding: "20px 36px",
            borderRadius: 24,
            ...rise(frame, 45),
          }}
        >
          Эффект — уже через{" "}
          <span style={{ color: C.yellow, fontWeight: 800 }}>
            несколько секунд
          </span>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: 1 - prog(frame, 0, 12), background: C.bg }} />
    </AbsoluteFill>
  );
};

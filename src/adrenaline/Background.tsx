import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C } from "./theme";

// Slow pulsing red glow behind every scene
export const Background: React.FC<{ intensity?: number }> = ({
  intensity = 1,
}) => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame / 9), [-1, 1], [0.25, 0.45]);
  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        backgroundImage: `radial-gradient(circle at 50% 45%, rgba(255,59,59,${
          pulse * intensity
        }) 0%, ${C.bg2} 45%, ${C.bg} 80%)`,
      }}
    />
  );
};

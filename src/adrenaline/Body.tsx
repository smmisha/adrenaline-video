import { C } from "./theme";

// Simple stylised human silhouette with brain and adrenal glands.
// viewBox 0 0 400 800. Brain at (200,70); adrenal glands on top of kidneys ~ (160/240, 420).
export const BRAIN = { x: 200, y: 72 };
export const ADRENALS = [
  { x: 158, y: 408 },
  { x: 242, y: 408 },
];

export const Body: React.FC<{
  brainGlow: number;
  adrenalGlow: number;
  signal: number; // 0..1 progress of nerve signal brain → adrenals
}> = ({ brainGlow, adrenalGlow, signal }) => {
  const nerve = `M${BRAIN.x} ${BRAIN.y + 40} L200 380`;
  return (
    <svg width={560} height={1120} viewBox="0 0 400 800">
      {/* silhouette */}
      <g fill="#2a1a2c" stroke="#4a3150" strokeWidth={3}>
        <circle cx={200} cy={80} r={62} />
        <rect x={175} y={138} width={50} height={40} rx={10} />
        <path d="M110 180 Q200 160 290 180 L310 470 Q200 500 90 470 Z" />
        <path d="M110 185 L60 440 L85 450 L135 230 Z" />
        <path d="M290 185 L340 440 L315 450 L265 230 Z" />
        <path d="M110 470 L130 780 L180 780 L195 500 Z" />
        <path d="M290 470 L270 780 L220 780 L205 500 Z" />
      </g>
      {/* kidneys */}
      <g fill="#5a2d3a">
        <ellipse cx={158} cy={440} rx={20} ry={32} />
        <ellipse cx={242} cy={440} rx={20} ry={32} />
      </g>
      {/* brain */}
      <ellipse
        cx={BRAIN.x}
        cy={BRAIN.y}
        rx={42}
        ry={34}
        fill={C.blue}
        opacity={0.35 + brainGlow * 0.65}
        style={{ filter: `drop-shadow(0 0 ${brainGlow * 25}px ${C.blue})` }}
      />
      {/* nerve signal */}
      <path
        d={nerve}
        stroke={C.blue}
        strokeWidth={5}
        strokeDasharray="10 10"
        opacity={0.35}
        fill="none"
      />
      <path
        d={nerve}
        stroke={C.blue}
        strokeWidth={7}
        fill="none"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - signal}
        style={{ filter: `drop-shadow(0 0 10px ${C.blue})` }}
      />
      {/* adrenal glands: small triangles on top of kidneys */}
      {ADRENALS.map((a) => (
        <path
          key={a.x}
          d={`M${a.x - 18} ${a.y + 8} L${a.x} ${a.y - 14} L${a.x + 18} ${a.y + 8} Z`}
          fill={C.orange}
          opacity={0.45 + adrenalGlow * 0.55}
          style={{
            filter: `drop-shadow(0 0 ${adrenalGlow * 22}px ${C.orange})`,
          }}
        />
      ))}
    </svg>
  );
};

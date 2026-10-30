import { Easing, interpolate } from "remotion";
import { loadFont } from "@remotion/google-fonts/Montserrat";

export const { fontFamily } = loadFont("normal", {
  weights: ["500", "800", "900"],
  subsets: ["cyrillic", "latin"],
});

export const C = {
  bg: "#0d0a12",
  bg2: "#1a0f1c",
  red: "#ff3b3b",
  orange: "#ff8a3d",
  yellow: "#ffd166",
  blue: "#5ec8ff",
  text: "#fff4ec",
  muted: "#b9a8b8",
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

// 0 → 1 between two frames, eased and clamped
export const prog = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

// Style for a text line that slides up and fades in at `start`
export const rise = (frame: number, start: number, dur = 18) => ({
  opacity: prog(frame, start, start + dur),
  translate: `0px ${interpolate(prog(frame, start, start + dur), [0, 1], [60, 0])}px`,
});

export const title: React.CSSProperties = {
  fontFamily,
  fontWeight: 900,
  fontSize: 96,
  lineHeight: 1.05,
  color: C.text,
  textAlign: "center",
  letterSpacing: -2,
};

export const body: React.CSSProperties = {
  fontFamily,
  fontWeight: 500,
  fontSize: 50,
  lineHeight: 1.3,
  color: C.muted,
  textAlign: "center",
};

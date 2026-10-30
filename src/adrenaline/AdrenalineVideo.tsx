import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill, Sequence } from "remotion";
import {
  Music,
  SceneVoice,
  Sfx,
  type Lang,
  TRANSITION_FRAMES,
  sceneFrames,
} from "./audio";
import { Scene1Hook } from "./Scene1Hook";
import { Scene2Trigger } from "./Scene2Trigger";
import { Scene3Release } from "./Scene3Release";
import { Scene4Effects } from "./Scene4Effects";
import { Scene5FightFlight } from "./Scene5FightFlight";
import { Scene6After } from "./Scene6After";
import { C } from "./theme";

const T = TRANSITION_FRAMES;

export const AdrenalineVideo: React.FC<{ lang: Lang }> = ({ lang }) => {
  const d = sceneFrames();
  // absolute start frame of every scene (each transition overlaps by T)
  const starts = d.map((_, i) =>
    d.slice(0, i).reduce((a, b) => a + b, 0) - i * T,
  );

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Music />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={d[0]} name="Hook">
          <Scene1Hook />
          <SceneVoice index={0} lang={lang} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={d[1]} name="Trigger">
          <Scene2Trigger />
          <SceneVoice index={1} lang={lang} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={d[2]} name="Release">
          <Scene3Release />
          <SceneVoice index={2} lang={lang} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={d[3]} name="Effects">
          <Scene4Effects />
          <SceneVoice index={3} lang={lang} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={d[4]} name="FightFlight">
          <Scene5FightFlight />
          <SceneVoice index={4} lang={lang} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={d[5]} name="After">
          <Scene6After />
          <SceneVoice index={5} lang={lang} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      {/* whoosh on every scene change */}
      {starts.slice(1).map((s) => (
        <Sequence key={s} from={s} layout="none">
          <Sfx name="whoosh" at={0} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

import "./index.css";
import { Composition, Folder } from "remotion";
import { AdrenalineVideo } from "./adrenaline/AdrenalineVideo";
import { totalFrames } from "./adrenaline/audio";
import { Scene1Hook } from "./adrenaline/Scene1Hook";
import { Scene2Trigger } from "./adrenaline/Scene2Trigger";
import { Scene3Release } from "./adrenaline/Scene3Release";
import { Scene4Effects } from "./adrenaline/Scene4Effects";
import { Scene5FightFlight } from "./adrenaline/Scene5FightFlight";
import { Scene6After } from "./adrenaline/Scene6After";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Adrenaline"
        component={AdrenalineVideo}
        defaultProps={{ lang: "ru" as const }}
        durationInFrames={totalFrames()}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="Adrenaline-Scenes">
        <Composition id="Hook" component={Scene1Hook} durationInFrames={150} fps={30} width={1080} height={1920} />
        <Composition id="Trigger" component={Scene2Trigger} durationInFrames={210} fps={30} width={1080} height={1920} />
        <Composition id="Release" component={Scene3Release} durationInFrames={150} fps={30} width={1080} height={1920} />
        <Composition id="Effects" component={Scene4Effects} durationInFrames={360} fps={30} width={1080} height={1920} />
        <Composition id="FightFlight" component={Scene5FightFlight} durationInFrames={273} fps={30} width={1080} height={1920} />
        <Composition id="After" component={Scene6After} durationInFrames={240} fps={30} width={1080} height={1920} />
      </Folder>
    </>
  );
};

import {Composition, Still} from 'remotion';
import {Reel, Cover} from './Reel';
import data from './data.json';
export const RemotionRoot = () => (
  <>
    <Composition id="Reel" component={Reel} durationInFrames={Math.round(data.duration * 30)} fps={30} width={1080} height={1920} />
    <Still id="Cover" component={Cover} width={1080} height={1920} />
  </>
);

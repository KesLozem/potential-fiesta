import Playback from "./Playback";

export default function ClientPlayback() {
  const handlePlay = () => {
    // player.togglePlay();
    console.log("play button clicked");
  };

  const handleNext = () => {
    // player.nextTrack();
    console.log("next button clicked");
  };
  return <Playback handlePlay={handlePlay} handleNext={handleNext} paused={true}/>;
}

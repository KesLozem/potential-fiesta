import { useEffect, useState } from "react";
import Playback from "./Playback";
import PlayOptions from "./PlayOptions";
import socket from "../Socket";

export default function ClientPlayback() {
  const [state, setState] = useState(null);
  const [img, setImg] = useState(null);
  const [paused, setPaused] = useState(true);
  const [trackName, setTrackName] = useState(null);
  const [trackArtist, setTrackArtist] = useState(null);

  const handlePlay = () => {
    // player.togglePlay();
    console.log("play button clicked");
  };

  const handleNext = () => {
    // player.nextTrack();
    console.log("next button clicked");
  };

  const handleLatestPlaybackState = () => {
    socket.on("PlaybackState", (state) => {
      setState(state);
    });
  };

  useEffect(() => {
    if (!socket) {
      console.log("client socket is null", socket);
      return;
    }
    handleLatestPlaybackState();
    return () => {
      socket.off("PlaybackState");
    };
  }),
    [];

  useEffect(() => {
    if (!state) {
      return;
    }
    setImg(state.track_window.current_track.album.images[0].url);
    setPaused(state.paused);
    setTrackName(state.track_window.current_track.name);
    setTrackArtist(state.track_window.current_track.artists[0].name);
  }),
    [state];

  return (
    <>
      <Playback
        handlePlay={handlePlay}
        handleNext={handleNext}
        trackImg={img}
        paused={paused}
      />
      <PlayOptions trackName={trackName} trackArtist={trackArtist} />
    </>
  );
}

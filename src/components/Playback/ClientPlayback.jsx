import { useEffect, useState, useRef } from "react";
import Playback from "./Playback";
import PlayOptions from "./PlayOptions";
import socket from "../Socket";
import tickerjs from "./ticker.js"

export default function ClientPlayback() {
  const [state, setState] = useState(null);
  const [img, setImg] = useState(null);
  const [paused, setPaused] = useState(true);
  const [trackName, setTrackName] = useState(null);
  const [trackArtist, setTrackArtist] = useState(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [uri, setUri] = useState(null);
  const worker = useRef();

  const handlePlay = () => {
    // player.togglePlay();
    console.log("play button clicked");
  };

  const handleNext = () => {
    // player.nextTrack();
    console.log("next button clicked");
  };

  useEffect(() => {
    if (!socket) {
      console.log("client socket is null", socket);
      return;
    }
    // Retrieve current playback state
    socket.emit("PlaybackState:Request");
    socket.on("PlaybackState", (state) => {
      setState(state);
    });

    return () => {
      socket.off("PlaybackState");
    };
  }, []);

  useEffect(() => {
    if (!state) {
      return;
    }
    setImg(state.track_window.current_track.album.images[0].url);
    setPaused(state.paused);
    setTrackName(state.track_window.current_track.name);
    setTrackArtist(state.track_window.current_track.artists[0].name);
    setProgress(state.position);
    setDuration(state.duration);
    setUri(state.track_window.current_track.uri);
    setPercentage((progress/duration) * 100)
    console.log("state", state);

    // start ticker after state changes
    worker.current.postMessage("start");

    return () => {
      worker.current.postMessage("stop");
    }

  }, [state]);

  useEffect(() => {
    // create new web worker and terminate so that only 1 is active at a time
    worker.current = new Worker(tickerjs);
    return () => {
      worker.current.terminate();
    };
  }, []);

  useEffect(() => {
    if (paused) {
      // console.log("Sending stop message to worker...")
      worker.current.postMessage("stop");
      // setPercentage((progress/duration) * 100)
    } else {
      // console.log("Sending start message to worker...")
      worker.current.postMessage("start");
      worker.current.onmessage = ({ data: { time } }) => {
        // console.log("paused status", paused, "ticker time", time);
        setPercentage(((progress + time)/duration) * 100)
      };
    }
    return () => {
      worker.current.postMessage("stop");
    };
  }, [paused, progress]);

  useEffect(() => {
    // On new song reset the ticker
    worker.current.postMessage("next-song");
    return () => {
      worker.current.postMessage("stop");
    };
  }, [uri])

  return (
    <>
      <div
        className="absolute top-0 left-0 bg-zinc-900 min-h-full"
        style={{ width: `${percentage}%` }}
      ></div>
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

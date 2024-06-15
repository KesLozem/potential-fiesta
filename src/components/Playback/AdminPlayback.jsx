import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import Playback from "./Playback";
import PlayOptions from "./PlayOptions";
import socket from "../Socket";

async function fetchAuth() {
  const response = await fetch("/api/party/auth")
    .then((res) => res.json())
    .then((data) => data.auth_token);
  console.log(response);
  return response;
}

export async function loader() {
  const [auth_token] = await Promise.all([fetchAuth()]);
  return { auth_token };
}

export default function AdminPlayback() {
  const { auth_token } = useLoaderData();
  const [player, setPlayer] = useState(null);
  const [state, setState] = useState(null);
  const [trackName, setTrackName] = useState(null);
  const [trackArtist, setTrackArtist] = useState(null);
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [img, setImg] = useState(null);
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [durationms, setDurationms] = useState(0);

  const sendWebPlaybackState = (state) => {
    if (!socket) {
      console.log("admin socket NULL", socket)
      return;
    }
    socket.emit("PlaybackState:Latest", state);
  };

  const handlePlay = () => {
    player.togglePlay();
    console.log("play button clicked");
  };

  const handleNext = () => {
    player.nextTrack();
    console.log("next button clicked");
  };

  // Spotify SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Spotbot 👾",
        getOAuthToken: (cb) => {
          cb(auth_token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      // event listeners
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      // track change and updated events listener
      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        console.log(state);
        setState(state);

        player.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true);
          setIsLoading(false);
        });
      });

      player.connect();
    };
  }, []);

  // Manage state of the player with useEffect
  useEffect(() => {
    if (!state) {
      return;
    }
    setImg(state.track_window.current_track.album.images[0].url);
    setTrackName(state.track_window.current_track.name);
    setTrackArtist(state.track_window.current_track.artists[0].name);
    setPaused(state.paused);
    setProgress(parseInt(state.position));
    setDurationms(state.duration);
    sendWebPlaybackState(state);
  }, [state]);

  let loading = (
    <div>
      <p>Loading...</p>
    </div>
  );

  let notActive = (
    <>
      <div>
        <div>
          <b>
            Instance not active. Transfer your playback using your Spotify app{" "}
          </b>
        </div>
      </div>
    </>
  );

  // rendering logic
  if (isLoading) {
    return loading;
  }
  if (!active) {
    return notActive;
  } else {
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
}

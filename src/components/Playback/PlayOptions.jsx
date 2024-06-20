import SongQueue from "../Queue/SongQueue";

export default function PlayOptions({ trackName, trackArtist }) {
  return (
    <div className="z-10 flex flex-col h-full justify-start max-h-[480px] min-w-[250px]">
      <div className="w-full">
        <h1 className="text-white font-bold text-4xl text-pretty">
          {trackName ? trackName : "No song playing"}
        </h1>
        <h4 className="text-white text-2xl">
          {trackArtist ? trackArtist : "......"}
        </h4>
      </div>
      <div className="mb-10">
        <p>
          Added by{" "}
          <span className="text-green-500 font-bold">Paula Carbonell</span>
        </p>
      </div>
      <h3 className="text-white mb-3">Up next:</h3>
      <SongQueue />
    </div>
  );
}

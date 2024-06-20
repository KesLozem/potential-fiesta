import MusicControls from "./MusicControls";

{/* props have to be same name in Admin and Client Playbacks */}
export default function Playback({ handlePlay, handleNext, trackImg, paused}) {
  return (
    <div className="z-10 size-fit justify-around self-center">
      <div className="flex flex-col justify-start items-center">
        <div className="w-3/4 aspect-square">
          <img
            className="rounded-lg shadow-2xl h-full w-full max-h-fit max-w-fit"
            src={trackImg ? trackImg : "https://via.placeholder.com/300"}
          />
          
        </div>
        <MusicControls 
          handlePlay={handlePlay} 
          handleNext={handleNext}
          paused={paused}
        />
      </div>
    </div>
  );
}

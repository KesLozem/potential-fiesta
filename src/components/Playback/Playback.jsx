import MusicControls from "./MusicControls";

{/* props have to be same name in Admin and Client Playbacks */}
export default function Playback({ handlePlay, handleNext, trackImg, paused}) {
  return (
    <div className="size-fit justify-around self-center">
      <div className="flex flex-col justify-start items-center">
        <div className="w-3/4 aspect-square">
          <img
            className="rounded-lg shadow-2xl h-full w-full max-h-fit max-w-fit"
            src={trackImg}
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

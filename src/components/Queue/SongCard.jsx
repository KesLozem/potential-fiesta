import { useState } from "react";

export default function SongCard({ song }) {
  const [isLiked, setIsLiked] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setSkipped(false);
  };

  const handleSkip = () => {
    setSkipped(!skipped);
    setIsLiked(false);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-slate-600 bg-opacity-40 rounded-lg max-h-20 mb-1 lg:w-[450px]">
      <div className="flex items-center space-x-4 whitespace-nowrap w-10/12 pr-8 md:pr6">
        <div className="indicator">
          <span className="indicator-item badge badge-ghost scale-75 z-0">30</span>
          <div className="grid w-12 h-12 rounded-lg bg-base-300 place-items-center">
            <img
              className="rounded-lg"
              src={
                "https://i.scdn.co/image/ab67616d0000b273ba7c9946402feb80e664a9aa"
              }
              alt={song.name}
            />
          </div>
        </div>
        <div className="w-11/12">
          <h3 className="text-lg font-semibold text-white h-7 overflow-ellipsis overflow-hidden">
            Monsters, Inc.
          </h3>
          <p className="text-sm text-gray-300 overflow-ellipsis overflow-hidden">
            Randy Newman
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 ${isLiked ? "text-gray-100" : ""}`}
            fill={isLiked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="RGB(243, 244, 246)"
            onClick={handleLike}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z"
            />
          </svg>
        </button>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 ${skipped ? "text-transparent" : ""}`}
            fill={skipped ? "RGB(243, 244, 246)" : "none"}
            viewBox="0 0 24 24"
            onClick={handleSkip}
          >
            <path
            stroke="RGB(243, 244, 246)"
            fillRule="evenodd"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997"
            />
            <path
            fillRule="evenodd"
              strokeWidth={2}
              stroke={skipped ? "RGB(71, 85, 105)" : "RGB(243, 244, 246)"}
              d="m12.002 2.005 m4.253 9.25h-8.5c-.414 0-.75.336-.75.75s.336.75.75.75h8.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

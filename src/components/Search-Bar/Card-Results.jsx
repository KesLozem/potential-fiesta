import { useState, useEffect } from "react";

export default function CardResults() {
    const [isOverflowing, setIsOverflowing] = useState(false);

    function checkOverflow() {
        const el = document.getElementById("Song-Title");
        if (el) {
            setIsOverflowing(el.offsetWidth < el.scrollWidth);
        }
    }

    useEffect(() => {
        checkOverflow();
    }
    , []);


  return (
    <div className="flex flex-row rounded-lg justify-between w-full bg-gray-800 gap-x-2 overflow-hidden">
      <div className="grid place-items-center">
        <img
          className="rounded-lg h-20 w-20 max-h-fit max-w-fit"
          src="https://i.scdn.co/image/ab67616d0000b273b85f6d3142ef01d48b94480e"
        />
      </div>
      <div className="overflow-hidden flex flex-row grow">
        <div className="grid grid-cols-1 pt-2 pb-2 w-full grow">
        <div className={`text-white text-sm whitespace-nowrap ${isOverflowing ? "hover:animate-text-scroll" : ""} hover:-z-1`}>
          <h1 id="Song-Title">Mission: Impossible Theme</h1>
        </div>
        <div className="text-xs text-neutral-content whitespace-nowrap overflow-hidden text-ellipsis">Michael Giacchino</div>
      </div>
      <div className="z-[2000] flex flex-col p-4 justify-center bg-gradient-to-l via-gray-800 from-slate-800 to-transparent">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="hover:text-gray-300 text-green-500"
          >
            <path
              d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
              fillRule="nonzero"
            />
          </svg>
        </button>
      </div>
      </div>
      
    </div>
  );
}

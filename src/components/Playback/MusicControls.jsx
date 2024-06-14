import { useState } from "react";

export default function MusicControls({ handlePlay, handleNext, paused }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaying = () => {
    handlePlay();
    setIsPlaying(paused);
  };

  const handleSkipping = () => {
    handleNext();
  };

  return (
    <ul className="menu menu-horizontal">
      <li>
        <a onClick={handlePlaying}>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#ffffff"
            strokeWidth={2}
          >
            {isPlaying ? (
              // Pause Icon
              <path d="M5,21 h-4 v-20 h6 v20 m12,-20 h-4 v20 h6 v-20 Z" />
            ) : (
              // Play Icon
              <path d="M3 22v-20l18 10-18 10z" />
            )}
          </svg>
        </a>
      </li>
      <li>
        <a>
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#ffffff"
          >
            {/* History Icon */}
            <path
              d="m20.492 6.734c-1.765-2.836-4.911-4.726-8.495-4.726-5.518 0-9.997 4.48-9.997 9.997 0 5.519 4.479 9.999 9.997 9.999 5.245 0 9.553-4.048 9.966-9.188.024-.302-.189-.811-.749-.811-.391 0-.715.3-.747.69-.351 4.369-4.012 7.809-8.47 7.809-4.69 0-8.497-3.808-8.497-8.499 0-4.689 3.807-8.497 8.497-8.497 3.037 0 5.704 1.597 7.206 3.995l-1.991.005c-.414 0-.75.336-.75.75s.336.75.75.75h4.033c.414 0 .75-.336.75-.75v-4.049c0-.414-.336-.75-.75-.75s-.75.335-.75.75zm-9.502.021.007 5.563c0 .288.165.55.424.675l3.978 1.928c.373.18.821.024 1.001-.349s.024-.821-.349-1.001l-3.555-1.725s-.006-5.093-.006-5.093c0-.414-.337-.75-.75-.749-.414 0-.75.337-.75.751z"
              fillRule="nonzero"
            />
          </svg>
        </a>
      </li>
      <li>
        <a onClick={handleSkipping}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="#ffffff"
            viewBox="0 0 24 24"
            stroke="#ffffff"
            strokeWidth={2}
          >
            {/* Skip Icon */}
            <path d="M0 19v-14l12 7-12 7zm12 0v-14l12 7-12 7z" />
          </svg>
        </a>
      </li>
    </ul>
  );
}

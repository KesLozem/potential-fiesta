import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CardResults from "./Card-Results";

export default function SearchMain({ addSongRef, searchOpen }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]); // [ {title, artist, album, image, id}, ...
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef(null);

  const sendSearchRequest = () => {
          console.log(searchTerm);
    axios
      .get(`/api/player/search?q=${searchTerm}`)
      .then((res) => {
        console.log(res.data.results.tracks);
        setSearchResults(res.data.results.tracks);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    // Ensures that search bar is reset when add song button is clicked
    if (!addSongRef.current & !inputRef.current) return;
    addSongRef.current.addEventListener("click", () => {
      inputRef.current.value = null;
    });
    return () => {
      addSongRef.current.removeEventListener("click", () => {
        inputRef.current.value = null
      });
    };
  }, []);

  useEffect(() => {
    if (searchOpen) {
      // Allowing time for the drawer to open before focusing on the input
      setTimeout(() => inputRef.current.focus(), 250);
      inputRef.current.value = null
    }
  }, [searchOpen]);

  useEffect(() => {
    // Delay search request to prevent unnecessary API calls
    if (!searchTerm || searchTerm == '') return;
    const delayDebounceFn = setTimeout(() => {
      sendSearchRequest();
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="flex flex-col items-center gap-y-2">
      <label className="input input-bordered flex items-center w-full">
        <input
          ref={inputRef}
          type="text"
          className="grow"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
        {searchTerm !== '' ? (
          <p className="text-white text-sm">Search results for "{searchTerm}"</p>
        ) : "Start searching..."}
       {searchResults.map(track => (
        <CardResults
          key={track.id}
          title={track.name}
          artist={track.artist}
          album={track.album}
          image={track.image}
          id={track.id}
          duration={track.duration}
          popularity={track.popularity}
        />
       ))}
    </div>
  );
}

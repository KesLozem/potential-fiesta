import { useRef, useState, useEffect } from "react";
import { useLoaderData, Outlet } from "react-router-dom";
import SearchMain from "../components/Search-Bar/Search-Main";

// const loader = async () => {
//    const [section1, section2, section3] = await Promise.all([
//       fetchSection1(),
//       fetchSection2()
//       fetchSection3()
//    ]);
//    return json({ section1, section2, section3 });
// }

async function fetchVoterId() {
  const response = await fetch("/user/profile/", { method: "GET" })
    .then((res) => res.json())
    .then((data) => data.username);
  if (!response) {
    return await fetch("/user/profile/admin", { method: "GET" })
      .then((res) => res.json())
      .then((data) => data.username);
  }
  return response;
}

export async function loader() {
  const [voter_id] = await Promise.all([fetchVoterId()]);
  return { voter_id };
}

export default function Party() {
  const { voter_id } = useLoaderData();
  const [searchOpen, setSearchOpen] = useState(false)
  const addSongRef = useRef(null);

  const handleClick = () => setSearchOpen(!searchOpen)

  const handleSearchKeyDown = (e) => {
    if (e.key === "Escape") {
      setSearchOpen(false);
    }

    if (e.key === "Enter") {
      setSearchOpen(true);
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleSearchKeyDown)
    return () => window.removeEventListener("keydown", handleSearchKeyDown)
  }
  , [])

  return (
    <div className="drawer drawer-end">
      <input onClick={handleClick} id="my-drawer-4" type="checkbox" className="drawer-toggle" checked={searchOpen} readOnly/>
      <div className="drawer-content min-h-screen flex flex-col">
        <div className="z-10 flex flex-col sm:flex-row justify-between p-4 border-b-slate-700/50 ">
          <p className="font-extrabold bg-gradient-to-br from-purple-400 to-red-400 bg-clip-text text-transparent text-2xl">
            DEMOCRATIC SPOTIFY
          </p>
          <p className="text-xs">Voter ID: {voter_id}</p>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div className="flex flex-col lg:flex-row m-4 justify-center">
            <Outlet />
          </div>
        </div>
        <div className="z-20 fixed bottom-0 right-0 m-6">
          <label
            ref={addSongRef}
            htmlFor="my-drawer-4"
            className="drawer-button cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="hover:text-gray-300 text-green-500"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
            </svg>
          </label>
        </div>
      </div>
      <div className="z-20 drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <SearchMain addSongRef={addSongRef} searchOpen={searchOpen} />
        </div>
      </div>
    </div>
  );
}

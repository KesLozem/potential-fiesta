import SongCard from "./SongCard";

export default function SongQueue() {
  return (
    <div className="border-box block overflow-visible scrollbar-hide md:overflow-auto static bottom-0 h-96">
      <div className="h-[200px]">
        <SongCard
          song={{
            name: "Song 1",
            artists: [{ name: "Artist 1" }],
            album: { images: [{ url: "https://via.placeholder.com/150" }] },
          }}
        />
        <SongCard
          song={{
            name: "Song 2",
            artists: [{ name: "Artist 2" }],
            album: { images: [{ url: "https://via.placeholder.com/150" }] },
          }}
        />
      </div>
    </div>
  );
}

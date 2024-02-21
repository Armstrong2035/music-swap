import React, { useEffect, useState, useMemo } from "react";
import Spotify from "./Spotify/Spotify";
import YouTube from "./YouTube/YouTube";

function App() {
  const [albums, setAlbums] = useState(() => {
    const localData = localStorage.getItem("albums");
    return localData ? JSON.parse(localData) : [];
  });

  const filteredAlbums = useMemo(
    () =>
      albums
        .filter((album) => album.album.album_type === "album")
        .map((album) => ({
          id: album.album.id,
          name: album.album.name,
          artist: album.album.artists[0].name,
          image: album.album.images[2].url,
          tracks: album.album.tracks.items.map((track) => ({
            id: track.id,
            name: track.name,
          })),
        })),
    [albums]
  );

  console.log(filteredAlbums);

  return (
    <>
      <Spotify {...{ filteredAlbums, setAlbums }} />
      <YouTube filteredAlbums={filteredAlbums} />
    </>
  );
}

export default App;

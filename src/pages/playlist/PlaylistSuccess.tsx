import { useState } from "react";
import SpotifyPlayer from "react-spotify-player";

export default function PlaylistSuccess() {
  const [playlistOpened, setPlaylistOpened] = useState<boolean>(false);

  return (
    <div className="playlist-page-container">
      <div className="playlist-page-content">
        <h1>Interval Playlist Maker</h1>
        <section>
          <h3>Woohoo, your playlist was created!</h3>
          <p>A playlist fit for you has been generated!</p>
        </section>
        {playlistOpened ? (
          <div className="column-section">
            <SpotifyPlayer
              uri="spotify:album:1TIUsv8qmYLpBEhvmBmyBk"
              size={{
                width: "100%",
                height: 300,
              }}
              view={"list"}
              theme={"black"}
            />
            <button
              className="playlist-next-btn"
              onClick={() => setPlaylistOpened(!playlistOpened)}
            >
              Close Playlist
            </button>
          </div>
        ) : (
          <button
            className="playlist-back-btn"
            onClick={() => setPlaylistOpened(!playlistOpened)}
          >
            View Playlist
          </button>
        )}
      </div>
    </div>
  );
}

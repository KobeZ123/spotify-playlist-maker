import { useState } from "react";

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
            <></>
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

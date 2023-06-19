import { useEffect, useState } from "react";
import { usePlaylistFormStore } from "../../stores/usePlaylistFormStore";
import axios from "axios";
import useStore from "../../stores/useStore";

export default function PlaylistSuccess() {
  const token = useStore((state) => state.token);
  const [playlistOpened, setPlaylistOpened] = useState<boolean>(false);
  const playlistID = usePlaylistFormStore((state) => state.formData.playlistID);
  useEffect(() => {
    console.log("playlist id");
    console.log(playlistID);
  });
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
            <iframe
              style={{ borderRadius: "12px" }}
              src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator`}
              width="100%"
              height="600"
              allowFullScreen={false}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
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

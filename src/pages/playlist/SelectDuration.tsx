import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaylistFormStore } from "../../stores/usePlaylistFormStore";

export default function SelectDuration() {
  const navigate = useNavigate();
  const { updatePlaylistFormData } = usePlaylistFormStore();

  const [playlistName, setPlaylistName] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleNext = (event: any) => {
    event.preventDefault();
    console.log("next page");
  };

  const handleBack = (event: any) => {
    event.preventDefault();
    console.log("back page");
    navigate("/interval_playlist/select_genres");
  };

  const handleDurationChange = (event: any) => {
    setDuration(Math.min(9999, parseInt(event.target.value)).toString());
    console.log(event.target.value);
  };

  return (
    <div className="playlist-page-container">
      <div className="playlist-page-content">
        <h1>Name your Playlist</h1>
        <span className="adjustable-width-medium search-bar-span">
          <input
            className="input-bar"
            onChange={(event) => {
              setPlaylistName(event.target.value);
            }}
            value={playlistName}
            type="text"
            placeholder="name your playlist"
          />
        </span>

        <section className="adjustable-width-large">
          <div className="column-section-with-margins">
            <h4>How long is your playlist?</h4>
            <div className="row-section">
              <input
                className="duration-input"
                type="number"
                value={duration}
                onChange={handleDurationChange}
                min={0}
                max={9999}
              />
              <p className="min-text">MIN</p>
            </div>
          </div>
        </section>
        <section className="progress-btn-div">
          <button className="playlist-back-btn" onClick={handleBack}>
            Back
          </button>
          <button className="playlist-next-btn" onClick={handleNext}>
            Next
          </button>
        </section>
      </div>
    </div>
  );
}

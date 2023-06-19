import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlaylistFormStore } from "../../stores/usePlaylistFormStore";
import useStore from "../../stores/useStore";
import {
  createEmptyPlaylist,
  selectTracksForPlaylistAlgorithm,
} from "../../api/postData";
import { durationToMilliseconds } from "../../utils/utils";

export default function SelectDuration() {
  const token = useStore((state) => state.token);
  const selectedArtists = usePlaylistFormStore(
    (state) => state.formData.selectedArtists
  );
  const selectedTracks = usePlaylistFormStore(
    (state) => state.formData.selectedTracks
  );
  const selectedGenres = usePlaylistFormStore(
    (state) => state.formData.selectedGenres
  );
  const navigate = useNavigate();
  const { updatePlaylistFormData } = usePlaylistFormStore();

  const [playlistName, setPlaylistName] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isPlaylistCreated, setIsPlaylistCreated] = useState<boolean>(false);
  const [playlistID, setPlaylistID] = useState<string>("");

  useEffect(() => {
    console.log("set to true");
    
      console.log(selectedArtists);
      console.log(selectedTracks);
      console.log(selectedGenres);
      console.log(durationToMilliseconds(parseInt(duration), 0));
      console.log(playlistID);
    
    if (token != null && playlistID != "" && isPlaylistCreated) {
      updatePlaylistFormData("playlistID", playlistID);
      console.log("playlist created, time to populate");
      selectTracksForPlaylistAlgorithm(
        token,
        selectedArtists.map((artist: any) => {return artist.id}),
        selectedGenres,
        selectedTracks.map((track: any) => {return track.id}),
        playlistID,
        durationToMilliseconds(parseInt(duration), 0)
      );
      navigate("/interval_playlist/success");
    }
  }, [playlistID]);

  useEffect(() => {
    console.log(isPlaylistCreated);
  }, []);

  const handleNext = (event: any) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (playlistName.length >= 1 && parseInt(duration) >= 5) {
      console.log("next page");
      updatePlaylistFormData("playlistName", playlistName);
      updatePlaylistFormData("playlistDuration", parseInt(duration));
      console.log("creating empty playlist");
      if (token != null) {
        createEmptyPlaylist(token, playlistName, setPlaylistID);
        setIsPlaylistCreated(true);
      }
    }
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
        <div className="input-with-warning-div">
          {isSubmitted && playlistName === "" && (
            <p className="warning-text">Please enter a playlist name.</p>
          )}
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
        </div>

        <section className="adjustable-width-large">
          <div className="column-section-with-margins">
            <h4>How long is your playlist?</h4>
            <div className="column-section-centered">
              {isSubmitted && (duration === "" || parseInt(duration) < 5) && (
                <p className="warning-text">
                  Please enter a duration over 5 minutes.
                </p>
              )}
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

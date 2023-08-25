import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores/useStore";
import {
  createEmptyPlaylist,
  selectTracksForPlaylistAlgorithm,
} from "../../api/postData";
import { durationToMilliseconds } from "../../utils/utils";
import { FormDataContext } from "../../context/FormDataContext";

export default function SelectDuration() {
  const token = useStore((state) => state.token);

  const { formData, dispatch } = useContext(FormDataContext);
  const { selectedArtists, selectedTracks, selectedGenres, playlistID } = formData;
  
  const navigate = useNavigate();

  const [playlistName, setPlaylistName] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isPlaylistCreated, setIsPlaylistCreated] = useState<boolean>(false);

  // updates the playlist name
  const updatePlaylistName = (name: string) => {
    dispatch({ type: "SET_PLAYLIST_NAME", payload: name });
  }

  // updates the playlist duration
  const updatePlaylistDuration = (duration: string) => {
    dispatch({ type: "SET_PLAYLIST_DURATION", payload: parseInt(duration) });
  }

  // i[dates the playlist id
  const updatePlaylistID = (id: string) => {
    dispatch({ type: "SET_PLAYLIST_ID", payload: id });
  }

  // when the playlist ID is created, tracks can begin generating for the playlist
  useEffect(() => {
    console.log("set to true");
    
      console.log(selectedArtists);
      console.log(selectedTracks);
      console.log(selectedGenres);
      console.log(durationToMilliseconds(parseInt(duration), 0));
      console.log(playlistID);
    
    if (token != null && playlistID != "" && isPlaylistCreated) {
      updatePlaylistID(playlistID);
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
      updatePlaylistName(playlistName);
      updatePlaylistDuration(duration);
      console.log("creating empty playlist");
      if (token != null) {
        createEmptyPlaylist(token, playlistName, updatePlaylistID);
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

        
          <div className="column-section-with-margins">
            <h1>How long is your playlist?</h1>
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
                <p className="min-text">MINUTES</p>
              </div>
            </div>
          </div>
       
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

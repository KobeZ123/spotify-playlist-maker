import { useContext, useEffect, useState } from "react";
import { getTopItemsAndSelectRandom, searchTracks } from "../../api/loadData";
import {
  LONG_TERM,
  MEDIUM_TERM,
  SHORT_TERM,
  TRACKS,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores/useStore";
import { reduceArtistNamesToString } from "../../utils/utils";
import TrackSelectionRecommendation from "../../components/playlist/TrackSelectionRecommendation";
import TrackSelectedSlip from "../../components/playlist/TrackSelectedSlip";
import TrackSearchBar from "../../components/playlist/TrackSearchBar";
import { usePlaylistFormStore } from "../../stores/usePlaylistFormStore";
import { FormDataContext } from "../../context/FormDataContext";

export default function SelectTracks() {
  const navigate = useNavigate();
  const token = useStore((state) => state.token);

  const { formData, dispatch } = useContext(FormDataContext);
  const { selectedTracks } = formData;
  
  const { updatePlaylistFormData } = usePlaylistFormStore();

  // the user's top artists as a list of items
  const [topTracksList, setTopTracksList] = useState<any[]>([]);

  // loads top artists when
  useEffect(() => {
    if (token != null && topTracksList.length == 0) {
      getTopItemsAndSelectRandom(
        token,
        TRACKS,
        [SHORT_TERM, MEDIUM_TERM, LONG_TERM],
        8,
        setTopTracksList
      );
    }
  }, []);

  useEffect(() => {
    console.log("track results");
    selectedTracks.forEach((value) => {
      console.log("getting value");
      console.log(value);
      console.log(value["artists"]);
      value["artists"].reduce(
        (str: string, artist_data: any, index: number) => {
          if (index === 0) {
            console.log("finding artist data");
            console.log(artist_data);
            console.log("getting string data");
            console.log(str);
            return artist_data.name;
          } else {
            console.log("more artist data");
            console.log(str);
            return str + ", " + artist_data.name;
          }
        },
        ""
      );
    });
  });

  // handles the next button click
  const handleNext = (event: any) => {
    event.preventDefault();
    console.log("next page");
    updatePlaylistFormData("selectedTracks", selectedTracks);
    navigate("/interval_playlist/select_genres");
  };

  // handles the previous page back click
  const handleBack = (event: any) => {
    event.preventDefault();
    console.log("back page");
    navigate("/interval_playlist/select_artists");
  };

  // dispatches the add track action
  const handleAddTrack = (track: any) => {
    dispatch({ type: "ADD_TRACK", payload: track });
  }

  // dispatches the remove track action
  const handleRemoveTrack = (track: any) => {
    dispatch({ type: "REMOVE_TRACK", payload: track });
  }

  // handles the click of a track and determines whether to add or remove
  const handleGeneralArtistClick = (
    track_data: any
  ) => {
    if (selectedTracks.some((item) => item.id === track_data.id)) {
      handleRemoveTrack(track_data);
    } else {
      handleAddTrack(track_data);
    }
  };

  return (
    <div className="playlist-page-container">
      <div className="playlist-page-content">
        <h1>Select Some Tracks</h1>
        <div>
          <p className="how-it-works-p">
            Use the search feature or choose some of your favorite tracks to
            curate the playlist!
          </p>
        </div>
        <TrackSearchBar handleItemClick={handleAddTrack} />
        <section className="adjustable-width-large">
          <div className="column-section-with-margins">
            <h4>Here are the tracks you selected</h4>
            {selectedTracks.length > 0 && (
              <div className="selected-items-div">
                {selectedTracks.map((track) => (
                  <TrackSelectedSlip
                    data={track}
                    handleClick={handleRemoveTrack}
                    key={track.id}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        <TrackSelectionRecommendation
          topItemsList={topTracksList}
          selectedItems={selectedTracks}
          handleItemClick={handleGeneralArtistClick}
        />
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

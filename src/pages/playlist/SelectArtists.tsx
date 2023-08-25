import { useContext, useEffect, useState } from "react";
import {
  getTopItemsAndSelectRandom,
} from "../../api/loadData";
import useStore from "../../stores/useStore";
import "../../styles/playlist_maker.css";
import {
  ARTISTS,
  LONG_TERM,
  MEDIUM_TERM,
  SHORT_TERM,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import ArtistSelectedSlip from "../../components/playlist/ArtistSelectedSlip";
import ItemSelectionRecommendation from "../../components/playlist/ArtistSelectionRecommendation";
import ArtistSearchBar from "../../components/playlist/ArtistSearchBar";
import { FormDataContext } from "../../context/FormDataContext";

export default function SelectArtists() {
  const navigate = useNavigate();
  const token = useStore((state) => state.token);

  const { formData, dispatch } = useContext(FormDataContext);
  const { selectedArtists } = formData;

  // the user's top artists as a list of items
  const [topArtistsList, setTopArtistsList] = useState<any[]>([]);

  // loads top artists when
  useEffect(() => {
    if (token != null && topArtistsList.length == 0) {
      getTopItemsAndSelectRandom(
        token,
        ARTISTS,
        [SHORT_TERM, MEDIUM_TERM, LONG_TERM],
        8,
        setTopArtistsList
      );
    }
  }, []);

  // handles the next button click
  const handleNext = (event: any) => {
    event.preventDefault();
    console.log("next page");
    navigate("/interval_playlist/select_tracks");
  };

  // handles the previous page back click
  const handleBack = (event: any) => {
    event.preventDefault();
    console.log("back page");
    navigate("..");
  };

  // dispatches the add artist action
  const handleAddArtist = (artist: any) => {
    dispatch({ type: "ADD_ARTIST", payload: artist });
  }

  // dispatches the remove artist action
  const handleRemoveArtist = (artist: any) => {
    dispatch({ type: "REMOVE_ARTIST", payload: artist });
  }

  // handles the click of an artist and determines whether to add or remove
  const handleGeneralArtistClick = (
    artist_data: any
  ) => {
    if (selectedArtists.some((item) => item.id === artist_data.id)) {
      handleRemoveArtist(artist_data);
    } else {
      handleAddArtist(artist_data);
    }
  };

  return (
    <div className="playlist-page-container">
      <div className="playlist-page-content">
        <h1>Select Some Artists</h1>
        <p className="how-it-works-p">
          Use the search feature or choose some of your favorite artists to
          curate the playlist!
        </p>
        <ArtistSearchBar handleItemClick={handleAddArtist} />
        <section className="adjustable-width-large">
          <div className="column-section-with-margins">
            <h4>Here are the artists you selected</h4>
            {selectedArtists.length > 0 && (
              <div className="selected-items-div">
                {selectedArtists.map((artist) => (
                  <ArtistSelectedSlip
                    data={artist}
                    handleClick={handleRemoveArtist}
                    key={artist.id}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        <ItemSelectionRecommendation
          topItemsList={topArtistsList}
          selectedItems={selectedArtists}
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

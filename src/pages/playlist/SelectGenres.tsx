import { useContext, useEffect, useState } from "react";
import {
  COLOR_PALETTE,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores/useStore";
import GenreSearchBar from "../../components/playlist/GenreSearchBar";
import GenreSelectedSlip from "../../components/playlist/GenreSelectedSlip";
import { FormDataContext } from "../../context/FormDataContext";

export default function SelectGenres() {
  const navigate = useNavigate();

  const { formData, dispatch } = useContext(FormDataContext);
  const { selectedGenres } = formData;

  // handles the next button click
  const handleNext = (event: any) => {
    event.preventDefault();
    console.log("next page");
    navigate("/interval_playlist/select_duration");
  };

  // handles the previous page back click
  const handleBack = (event: any) => {
    event.preventDefault();
    console.log("back page");
    navigate("/interval_playlist/select_tracks");
  };

  // dispatches the add genre action
  const handleAddGenre = (genre: any) => {
    dispatch({ type: "ADD_GENRE", payload: genre });
  }

  // dispatches the remove genre action
  const handleRemoveGenre = (genre: any) => {
    dispatch({ type: "REMOVE_GENRE", payload: genre });
  }

  // handles the click of a genre and determines whether to add or remove
  const handleGeneralArtistClick = (
    genre_name: any
  ) => {
    if (selectedGenres.some((item) => item === genre_name)) {
      handleRemoveGenre(genre_name);
    } else {
      handleAddGenre(genre_name);
    }
  };

  return (
    <div className="playlist-page-container">
      <div className="playlist-page-content">
        <h1>Select Your Vibes</h1>
        <GenreSearchBar handleItemClick={handleAddGenre} />
        <section className="adjustable-width-large">
          <div className="column-section-with-margins">
            <h4>Here are the genres you selected</h4>
            {selectedGenres.length > 0 && (
              <div className="selected-items-div">
                {selectedGenres.map((genre, index) => (
                  <GenreSelectedSlip
                    data={genre}
                    handleClick={handleRemoveGenre}
                    color={COLOR_PALETTE[index % COLOR_PALETTE.length]}
                    key={genre}
                  />
                ))}
              </div>
            )}
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

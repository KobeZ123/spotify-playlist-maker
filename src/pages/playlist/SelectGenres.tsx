import { useEffect, useState } from "react";
import {
  COLOR_PALETTE,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores/useStore";
import GenreSearchBar from "../../components/playlist/GenreSearchBar";
import GenreSelectedSlip from "../../components/playlist/GenreSelectedSlip";
import { usePlaylistFormStore } from "../../stores/usePlaylistFormStore";

export default function SelectGenres() {
  const navigate = useNavigate();
  const { updatePlaylistFormData } = usePlaylistFormStore();

  // the selected artists as a list of data objects
  const [selectedGenres, setSelectedGenres] = useState<any[]>([]);

  const handleNext = (event: any) => {
    event.preventDefault();
    console.log("next page");
    updatePlaylistFormData("selectedGenres", selectedGenres);
    navigate("/interval_playlist/select_duration");
  };

  const handleBack = (event: any) => {
    event.preventDefault();
    console.log("back page");
    navigate("/interval_playlist/select_tracks");
  };

  const handleGenreClick = (
    event: React.MouseEvent<HTMLElement>,
    genre: any
  ) => {
    const hasDuplicate = selectedGenres.some(
      (item) => item === genre
    );
    // if artist is already selected, remove it
    if (hasDuplicate) {
      setSelectedGenres(
        selectedGenres.filter((element) => element != genre)
      );
    } else {
      // if the artist is not selected yet, add it
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div className="playlist-page-container">
      <div className="playlist-page-content">
        <h1>Select Your Vibes</h1>
        <GenreSearchBar handleItemClick={handleGenreClick} />
        <section className="adjustable-width-large">
          <div className="column-section-with-margins">
            <h4>Here are the genres you selected</h4>
            {selectedGenres.length > 0 && (
              <div className="selected-items-div">
                {selectedGenres.map((genre, index) => (
                  <GenreSelectedSlip
                    data={genre}
                    handleClick={handleGenreClick}
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

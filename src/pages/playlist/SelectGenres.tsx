import { useEffect, useState } from "react";
import { getTopItemsAndSelectRandom, searchTracks } from "../../api/loadData";
import {
  COLOR_PALETTE,
  LONG_TERM,
  MEDIUM_TERM,
  SHORT_TERM,
  TRACKS,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import useStore from "../../stores/useStore";
import TrackSelectionRecommendation from "../../components/playlist/TrackSelectionRecommendation";
import TrackSelectedSlip from "../../components/playlist/TrackSelectedSlip";
import TrackSearchBar from "../../components/playlist/TrackSearchBar";
import GenreSearchBar from "../../components/playlist/GenreSearchBar";
import GenreSelectedSlip from "../../components/playlist/GenreSelectedSlip";

export default function SelectGenres() {
  const navigate = useNavigate();
  const token = useStore((state) => state.token);

  // the selected artists as a list of data objects
  const [selectedGenres, setSelectedGenres] = useState<any[]>([]);

  useEffect(() => {
    
  }, []);

  useEffect(() => {
   
  });

  const handleNext = (event: any) => {
    event.preventDefault();
    console.log("next page");
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
    console.log(genre);
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
        <h1>Interval Playlist Maker</h1>
        <div>
          <h3>Select Vibes</h3>
        </div>  
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

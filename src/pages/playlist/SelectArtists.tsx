import { useEffect, useState } from "react";
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
import { usePlaylistFormStore } from "../../stores/usePlaylistFormStore";

export default function SelectArtists() {
  const navigate = useNavigate();
  const token = useStore((state) => state.token);
  const { updatePlaylistFormData } = usePlaylistFormStore();

  // the selected artists as a list of data objects
  const [selectedArtists, setSelectedArtists] = useState<any[]>([]);
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

  const handleNext = (event: any) => {
    event.preventDefault();
    console.log("next page");
    updatePlaylistFormData("selectedArtists", selectedArtists);
    navigate("/interval_playlist/select_tracks");
  };

  const handleBack = (event: any) => {
    event.preventDefault();
    console.log("back page");
    navigate("..");
  };

  const handleArtistClick = (
    event: React.MouseEvent<HTMLElement>,
    artist_data: any
  ) => {
    // const target = (event.target as HTMLElement).closest('.rec-card-container');
    // if (target) {
    //   target.classList.toggle('selected');
    // }
    let artist_id = (event.target as HTMLElement).id;
    let artist_key = (event.target as HTMLElement).getAttribute("key");
    console.log(artist_data);
    const hasDuplicate = selectedArtists.some(
      (item) => item.id === artist_data.id
    );
    // if artist is already selected, remove it
    if (hasDuplicate) {
      setSelectedArtists(
        selectedArtists.filter((element) => element.id != artist_data.id)
      );
    } else {
      // if the artist is not selected yet, add it
      setSelectedArtists([...selectedArtists, artist_data]);
    }
  };

  return (
    <div className="playlist-page-container">
      <div className="playlist-page-content">
        <h1>Select Some Artists</h1>
        <div>
          <p className="how-it-works-p">
            Use the search feature or choose some of your favorite artists to
            curate the playlist!
          </p>
        </div>
        <ArtistSearchBar handleItemClick={handleArtistClick} />
        <section className="adjustable-width-large">
          <div className="column-section-with-margins">
            <h4>Here are the artists you selected</h4>
            {selectedArtists.length > 0 && (
              <div className="selected-items-div">
                {selectedArtists.map((artist) => (
                  <ArtistSelectedSlip
                    data={artist}
                    handleClick={handleArtistClick}
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
          handleItemClick={handleArtistClick}
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

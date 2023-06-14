import { useEffect, useState } from "react";
import {
  getTopArtistsShortTerm,
  getTopItemsAndSelectRandom,
  searchArtists,
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

export default function SelectArtists() {
  const navigate = useNavigate();
  const token = useStore((state) => state.token);

  // the artist search query state
  const [artistQuery, setArtistQuery] = useState<string>("");
  // the artist search results as a list of items
  const [artistResults, setArtistResults] = useState<any[]>([]);
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
    navigate("/interval_playlist/select_tracks");
  };

  const handleBack = (event: any) => {
    event.preventDefault();
    console.log("back page");
    navigate("..");
  };

  const handleSearch = (query: string) => {
    console.log("searched " + query);
    setArtistQuery(query);
    if (query == "") {
      setArtistResults([]);
    }
    if (token != null && query != "") {
      searchArtists(token, query, setArtistResults);
    }
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
        <h1>Interval Playlist Maker</h1>
        <div>
          <h3>Select Artists</h3>
          {selectedArtists.length > 0 && (
            <div className="column-section">
              <h4>Here are the artists you selected</h4>
              {selectedArtists.map((artist) => (
                <p
                  className="selected-item-name-slip"
                  id={artist["id"]}
                  key={artist["id"]}
                  onClick={(event) => handleArtistClick(event, artist)}
                >
                  {artist["name"]}
                </p>
              ))}
            </div>
          )}
          <p className="how-it-works-p">
            Use the search feature or choose some of your favorite artists to
            curate the playlist!
          </p>
        </div>
        <section>
          {/* <span className="search-bar-span">
            <input
              className="search-bar-input"
              type="text"
              value={artistQuery}
              onChange={(event) => {
                setArtistQuery(event.target.value);
              }}
            />
            <button
              className="search-bar-btn"
              onClick={() => handleSearch(artistQuery)}
            >
              Search
            </button>
          </span> */}
          <span className="search-bar-span">
            <input
              className="search-bar-input"
              onChange={(event) => {
                handleSearch(event.target.value);
              }}
              type="search"
              placeholder="Search"
            />
          </span>
          <div className="column-section">
            {artistResults.map(
              (artist, index) =>
                index < 10 && (
                  <p
                    className="item-result-slip"
                    key={artist["id"]}
                    id={artist["id"]}
                    data-item={artist}
                    onClick={(event) => {
                      handleArtistClick(event, artist);
                    }}
                  >
                    {artist["name"]}
                  </p>
                )
            )}
          </div>
        </section>
        <section className="selection-recommendations">
          <h3>Some of your favorites</h3>
          <section className="rec-cards-container">
            {topArtistsList.length == 0 ? <h3>Loading...</h3> :
            topArtistsList.map(
              (artist, index) =>
                index < 8 && (
                  <span
                    className={
                      "rec-card-container" +
                      (selectedArtists.some((item) => item.id === artist.id)
                        ? " selected"
                        : "")
                    }
                    key={artist.name + "_card"}
                    onClick={(event) => {
                      handleArtistClick(event, artist);
                    }}
                  >
                    <img
                      className="item-img"
                      src={artist.images.length > 0 ? artist.images[0].url : ""}
                      alt={`${artist.name}`}
                    />
                    <p className="item-text">{artist.name}</p>
                  </span>
                )
            )}
          </section>
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

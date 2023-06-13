import { useEffect, useState } from "react";
import { getTopArtistsShortTerm, searchArtists } from "../../api/loadData";
import useStore from "../../stores/useStore";
import "../../styles/playlist_maker.css";

export default function SelectArtists() {
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
    if (token != null) {
      getTopArtistsShortTerm(token, setTopArtistsList);
    }
  }, []);

  const handleNext = (event: any) => {
    event.preventDefault();
    console.log("next page");
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
    let artist_id = (event.target as HTMLElement).id;
    let artist_key = (event.target as HTMLElement).getAttribute("key");
    console.log(artist_data);
    // if artist is already selected, remove it
    if (selectedArtists.includes(artist_data)) {
      setSelectedArtists(
        selectedArtists.filter((element) => element != artist_data)
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
            {topArtistsList.map(
              (artist, index) =>
                index < 8 && (
                  <span
                    className="rec-card-container"
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
      </div>
    </div>
  );
}

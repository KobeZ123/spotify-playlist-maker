import { useEffect, useState } from "react";
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

export default function SelectTracks() {
  const navigate = useNavigate();
  const token = useStore((state) => state.token);

  // the artist search query state
  const [trackQuery, setTrackQuery] = useState<string>("");
  // the artist search results as a list of items
  const [trackResults, setTrackResults] = useState<any[]>([]);
  // the selected artists as a list of data objects
  const [selectedTracks, setSelectedTracks] = useState<any[]>([]);
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

  const handleNext = (event: any) => {
    event.preventDefault();
    console.log("next page");
  };

  const handleBack = (event: any) => {
    event.preventDefault();
    console.log("back page");
    navigate("/interval_playlist/select_artists");
  };

  const handleSearch = (query: string) => {
    console.log("searched " + query);
    setTrackQuery(query);
    if (query == "") {
      setTrackResults([]);
    }
    if (token != null && query != "") {
      searchTracks(token, query, setTrackResults);
    }
  };

  const handleTrackClick = (
    event: React.MouseEvent<HTMLElement>,
    track_data: any
  ) => {
    // const target = (event.target as HTMLElement).closest('.rec-card-container');
    // if (target) {
    //   target.classList.toggle('selected');
    // }
    let artist_id = (event.target as HTMLElement).id;
    let artist_key = (event.target as HTMLElement).getAttribute("key");
    console.log(track_data);
    const hasDuplicate = selectedTracks.some(
      (item) => item.id === track_data.id
    );
    // if artist is already selected, remove it
    if (hasDuplicate) {
      setSelectedTracks(
        selectedTracks.filter((element) => element.id != track_data.id)
      );
    } else {
      // if the artist is not selected yet, add it
      setSelectedTracks([...selectedTracks, track_data]);
    }
  };

  return (
    <div className="playlist-page-container">
      <div className="playlist-page-content">
        <h1>Interval Playlist Maker</h1>
        <div>
          <h3>Select Tracks</h3>
          {selectedTracks.length > 0 && (
            <div className="column-section">
              <h4>Here are the tracks you selected</h4>
              {selectedTracks.map((track) => (
                <p
                  className="selected-item-name-slip"
                  id={track["id"]}
                  key={track["id"]}
                  onClick={(event) => handleTrackClick(event, track)}
                >
                  {track["name"] +
                    " - " +
                    reduceArtistNamesToString(track["artists"])}
                </p>
              ))}
            </div>
          )}
          <p className="how-it-works-p">
            Use the search feature or choose some of your favorite tracks to
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
            {trackResults.map(
              (track, index) =>
                index < 10 && (
                  <p
                    className="item-result-slip"
                    key={track["id"]}
                    id={track["id"]}
                    data-item={track}
                    onClick={(event) => {
                      handleTrackClick(event, track);
                    }}
                  >
                    {track["name"] +
                      " - " +
                      reduceArtistNamesToString(track["artists"])}
                  </p>
                )
            )}
          </div>
        </section>
        <section className="selection-recommendations">
          <h3>Some of your favorites</h3>
          <section className="rec-cards-container">
            {topTracksList.length == 0 ? (
              <h3>Loading...</h3>
            ) : (
              topTracksList.map(
                (track, index) =>
                  index < 8 && (
                    <span
                      className={
                        "rec-card-container" +
                        (selectedTracks.some((item) => item.id === track.id)
                          ? " selected"
                          : "")
                      }
                      key={track.name + "_card"}
                      onClick={(event) => {
                        handleTrackClick(event, track);
                      }}
                    >
                      <img
                        className="item-img"
                        src={
                          track.album.images.length > 0
                            ? track.album.images[0].url
                            : ""
                        }
                        alt={`${track.name}`}
                      />
                      <p className="item-text">{track.name}</p>
                    </span>
                  )
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

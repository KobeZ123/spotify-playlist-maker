import { useState } from "react";
import useStore from "../../stores/useStore";
import { searchArtists, searchTracks } from "../../api/loadData";
import { SearchBarProps } from "../../utils/types";
import { reduceArtistNamesToString } from "../../utils/utils";

export default function TrackSearchBar(props: SearchBarProps) {
  const token = useStore((state) => state.token);

  const [query, setQuery] = useState<string>("");
  const [trackResults, setTrackResults] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    console.log("searched " + query);
    setQuery(query);
    if (query == "") {
      setTrackResults([]);
    }
    if (token != null && query != "") {
      searchTracks(token, query, setTrackResults);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission or page reload
      if (trackResults.length > 0) {
        const selectedTracks = trackResults[0];
        props.handleItemClick(selectedTracks);
        setQuery(""); 
        setTrackResults([]);
      }
    } 
  };

  return (
    <section className="search-container">
      <span
        className={
          "adjustable-width-medium" +
          (trackResults.length > 0
            ? " search-bar-span-opened"
            : " search-bar-span")
        }
      >
        <input
          className="search-bar-input"
          onChange={(event) => {
            handleSearch(event.target.value);
            setQuery(event.target.value);
          }}
          onKeyDown={handleKeyDown}
          value={query}
          type="search"
          placeholder="Search"
          autoCorrect="false"
          spellCheck="false"
          autoFocus
        />
      </span>
      <div
        className={"column-section search-results"}
        style={
          trackResults.length > 0 ? { display: "block" } : { display: "none" }
        }
      >
        {trackResults.map(
          (track, index) =>
            index < 10 && (
              <p
                className="item-result-slip"
                key={track["id"]}
                id={track["id"]}
                data-item={track}
                onClick={(event) => {
                  props.handleItemClick(track);
                  setQuery("");
                  setTrackResults([]);
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
  );
}

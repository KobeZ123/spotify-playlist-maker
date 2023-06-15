import { useState } from "react";
import useStore from "../../stores/useStore";
import { searchArtists } from "../../api/loadData";
import { SearchBarProps } from "../../utils/types";

export default function ArtistSearchBar(props: SearchBarProps) {
  const token = useStore((state) => state.token);
  
  const [query, setQuery] = useState<string>("");  
  const [artistResults, setArtistResults] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    console.log("searched " + query);
    setQuery(query);
    if (query == "") {
      setArtistResults([]);
    }
    if (token != null && query != "") {
      searchArtists(token, query, setArtistResults);
    }
  };

  return (
    <section className="search-container">
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
      <span className={"adjustable-width-medium" + (
            artistResults.length > 0
              ? " search-bar-span-opened"
              : " search-bar-span"
          )}>
        <input
          className="search-bar-input"
          onChange={(event) => {
            handleSearch(event.target.value);
            setQuery(event.target.value);
          }}
          value={query}
          type="search"
          placeholder="Search"
        />
      </span>
      <div
        className={"column-section search-results"}
        style={
          artistResults.length > 0
            ? { display: "block" }
            : { display: "none" }
        }
      >
        {artistResults.map(
          (artist, index) =>
            index < 10 && (
              <p
                className="item-result-slip"
                key={artist["id"]}
                id={artist["id"]}
                data-item={artist}
                onClick={(event) => {
                  props.handleItemClick(event, artist);
                  setQuery("");
                  setArtistResults([]);
                }}
              >
                {artist["name"]}
              </p>
            )
        )}
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import useStore from "../../stores/useStore";
import { getAvailableGenres } from "../../api/loadData";
import { SearchBarProps } from "../../utils/types";
import { polishGenreName, searchWords } from "../../utils/utils";

export default function GenreSearchBar(props: SearchBarProps) {
  const token = useStore((state) => state.token);

  const [query, setQuery] = useState<string>("");
  const [allGenres, setAllGenres] = useState<any[]>([]);
  const [genreResults, setGenreResults] = useState<any[]>([]);

  useEffect(() => {
    if (token != null) {
      getAvailableGenres(token, setAllGenres);
    }
  }, []);

  const handleSearch = (query: string) => {
    if (query === "") {
      setGenreResults([]);
    } else {
      setGenreResults(searchWords(query, allGenres));
    }
  };

  return (
    <section className="search-container">
      <span
        className={
          "adjustable-width-medium" +
          (genreResults.length > 0
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
          value={query}
          type="search"
          placeholder="Search"
        />
      </span>
      <div
        className={"column-section search-results"}
        style={
          genreResults.length > 0 ? { display: "block" } : { display: "none" }
        }
      >
        {genreResults.map(
          (genre, index) =>
            index < 10 && (
              <p
                className="item-result-slip"
                key={genre["id"]}
                id={genre["id"]}
                data-item={genre}
                onClick={(event) => {
                  props.handleItemClick(event, genre);
                  setQuery("");
                  setGenreResults([]);
                }}
              >
                {polishGenreName(genre)}
              </p>
            )
        )}
      </div>
    </section>
  );
}

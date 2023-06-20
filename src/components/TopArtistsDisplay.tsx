import { useEffect, useState } from "react";
import useStore from "../stores/useStore";
import {
  getTopArtistsLongTerm,
  getTopArtistsMediumTerm,
  getTopArtistsShortTerm,
} from "../api/loadData";

export default function TopArtistsDisplay() {
  const token = useStore((state) => state.token);
  // the user's top artists as a list of items
  const [topArtistsList, setTopArtistsList] = useState<any[]>([]);
  // the selected term for top artists
  const [selectedTerm, setSelectedTerm] = useState<string>("short_term");

  // loads top artists when
  useEffect(() => {
    if (token != null) {
      if (selectedTerm === "short_term") {
        getTopArtistsShortTerm(token, setTopArtistsList);
      }
      if (selectedTerm === "medium_term") {
        getTopArtistsMediumTerm(token, setTopArtistsList);
      }
      if (selectedTerm === "long_term") {
        getTopArtistsLongTerm(token, setTopArtistsList);
      }
    }
  }, [selectedTerm]);

  return (
    <div className="top-items-display-container">
      <div className="term-tabs-container">
        <button
          className={
            selectedTerm === "short_term" ? "term-tab-selected" : "term-tab"
          }
          onClick={() => setSelectedTerm("short_term")}
        >
          Past Month
        </button>
        <button
          className={
            selectedTerm === "medium_term" ? "term-tab-selected" : "term-tab"
          }
          onClick={() => setSelectedTerm("medium_term")}
        >
          Last 6 Months
        </button>
        <button
          className={
            selectedTerm === "long_term" ? "term-tab-selected" : "term-tab"
          }
          onClick={() => setSelectedTerm("long_term")}
        >
          All Time
        </button>
      </div>
      <div className="items-container">
        <section className="item-cards-container">
          {topArtistsList.map((artist) => (
            <span className="item-card-container" key={artist.name + "_card"}>
              <img
                className="item-img"
                src={artist.images.length > 0 ? artist.images[0].url : ""}
                alt={`${artist.name}`}
              />
              <p className="item-text">{artist.name}</p>
            </span>
          ))}
        </section>
      </div>
    </div>
  );
}

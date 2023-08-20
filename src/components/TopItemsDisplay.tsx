import { useEffect, useState } from "react";
import useStore from "../stores/useStore";
import "../styles/top_items_display.css";

interface TopItemsDisplayProps {
  isArtist: boolean;
  getItemsShortTerm: (token: string, setTopItemsList: (result: any) => void) => void;
  getItemsMediumTerm: (token: string, setTopItemsList: (result: any) => void) => void;
  getItemsLongTerm: (token: string, setTopItemsList: (result: any) => void) => void;
}

export default function TopItemsDisplay({
  getItemsShortTerm, 
  getItemsMediumTerm, 
  getItemsLongTerm, 
  isArtist
}: TopItemsDisplayProps) {
  const token = useStore((state) => state.token);
  const [topArtistsList, setTopArtistsList] = useState<any[]>([]);
  const [topTracksList, setTopTracksList] = useState<any[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string>("short_term");

  // loads top artists when
  useEffect(() => {
    if (token != null) {
      if (selectedTerm === "short_term") {
        getItemsShortTerm(token, isArtist? setTopArtistsList: setTopTracksList);
      }
      if (selectedTerm === "medium_term") {
        getItemsMediumTerm(token, isArtist? setTopArtistsList: setTopTracksList);
      }
      if (selectedTerm === "long_term") {
        getItemsLongTerm(token, isArtist? setTopArtistsList: setTopTracksList);
      }
    }
  }, [selectedTerm, isArtist]);

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
          { isArtist ? topArtistsList.map((item) => (
            <span className="item-card-container" key={item.name + "_card"}>
              <img
                className="item-img"
                src={item.images.length > 0 ? item.images[0].url : "" }
                alt={`${item.name}_img`}
              />
              <p className="item-text">{item.name}</p>
            </span> 
          )): topTracksList.map((item) => (
            <span className="item-card-container" key={item.name + "_card"}>
              <img
                className="item-img"
                src={item.album.images.length > 0 ? item.album.images[0].url : ""}
                alt={`${item.name}_img`}
              />
              <p className="item-text">{item.name}</p>
            </span> ))}
        </section>
      </div>
    </div>
  );
}
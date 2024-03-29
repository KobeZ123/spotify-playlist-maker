import { useState } from "react";
import ReauthenticateWrapper from "../components/ReauthenticatePageWrapper";
import TopItemsDisplay from "../components/TopItemsDisplay";
import { getTopArtistsLongTerm, getTopArtistsMediumTerm, getTopArtistsShortTerm, getTopTracksLongTerm, getTopTracksMediumTerm, getTopTracksShortTerm } from "../api/loadData";

export default function TopItemsPage() {
  const [selectedItem, setSelectedItem] = useState<string>("artists");

  return (
    <ReauthenticateWrapper
      children={
        <div className="top-items-page">
          <h1 className="top-items-heading">Top Items</h1>
          <div className="item-selector-container">
            <button
              className={"item-selector-btn-first " +
                (selectedItem === "artists"
                  ? "item-selector-btn-selected"
                  : "item-selector-btn"
                )
              }
              onClick={() => setSelectedItem("artists")}
            >
              Artists
            </button>
            <button
              className={"item-selector-btn-second " +
                (selectedItem === "tracks"
                  ? "item-selector-btn-selected"
                  : "item-selector-btn"
                )
              }
              onClick={() => setSelectedItem("tracks")}
            >
              Tracks
            </button>
          </div>
          <h1 className="top-items-subheading">Here are your top {selectedItem}</h1>
          {selectedItem === "artists" ? (
            <TopItemsDisplay isArtist={true} 
              getItemsShortTerm={getTopArtistsShortTerm} 
              getItemsMediumTerm={getTopArtistsMediumTerm} 
              getItemsLongTerm={getTopArtistsLongTerm} />
          ) : (
            // <TopTracksDisplay />
            <TopItemsDisplay isArtist={false} 
              getItemsShortTerm={getTopTracksShortTerm} 
              getItemsMediumTerm={getTopTracksMediumTerm} 
              getItemsLongTerm={getTopTracksLongTerm} />
          )}
        </div>
      }
    />
  );
}

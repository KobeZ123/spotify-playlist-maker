import { useState } from "react";
import TopArtistsDisplay from "../components/TopArtistsDisplay";
import TopTracksDisplay from "../components/TopTracksDisplay";
import ReauthenticateWrapper from "../components/ReauthenticatePageWrapper";

export default function TopItemsPage() {
  const [selectedItem, setSelectedItem] = useState<string>("artists");

  return (
    <ReauthenticateWrapper
      children={
        <div className="top-items-page">
          <h1 className="top-items-heading">Top Items</h1>
          <div className="selector-container">
            <button
              className={"selector-btn-first " +
                (selectedItem === "artists"
                  ? "selector-btn-selected"
                  : "selector-btn"
                )
              }
              onClick={() => setSelectedItem("artists")}
            >
              Artists
            </button>
            <button
              className={"selector-btn-second " +
                (selectedItem === "tracks"
                  ? "selector-btn-selected"
                  : "selector-btn"
                )
              }
              onClick={() => setSelectedItem("tracks")}
            >
              Tracks
            </button>
          </div>
          <h1 className="top-items-subheading">Here are your top {selectedItem}</h1>
          {selectedItem === "artists" ? (
            <TopArtistsDisplay />
          ) : (
            <TopTracksDisplay />
          )}
        </div>
      }
    />
  );
}

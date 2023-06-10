import { useState } from "react";
import TopArtistsDisplay from "../components/TopArtistsDisplay";
import TopTracksDisplay from "../components/TopTracksDisplay";
import ReauthenticateWrapper from "../components/Reauthenticate";

export default function TopItemsPage() {
  const [selectedItem, setSelectedItem] = useState<string>("artists");

  return (
    <ReauthenticateWrapper
      children={
        <div className="top-items-page">
          <h1 className="top-items-heading">TOP ITEMS</h1>
          <div className="selector-container">
            <button
              className={
                selectedItem === "artists"
                  ? "selector-btn-selected"
                  : "selector-btn"
              }
              onClick={() => setSelectedItem("artists")}
            >
              Artists
            </button>
            <button
              className={
                selectedItem === "tracks"
                  ? "selector-btn-selected"
                  : "selector-btn"
              }
              onClick={() => setSelectedItem("tracks")}
            >
              Tracks
            </button>
          </div>
          <h1>HERE IS THE TOP ITEMS PAGE</h1>
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

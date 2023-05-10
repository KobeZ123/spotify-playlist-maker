import { useState } from "react";
import useStore from "../stores/useStore";
import { searchArtists, searchTracks } from "../api/loadData";

import "../styles/recommendation_page.css"

export default function RecommendationPage() {

    const token = useStore((state) => state.token);
    
    const [artistQuery, setArtistQuery] = useState("");
    const [trackQuery, setTrackQuery] = useState("");
    const [artistResults, setArtistResults] = useState([]);
    const [trackResults, setTrackResults] = useState([]);

    const renderArtistResults = () => {
        return ( 
            <div className="artist-result-container">
                {artistResults.map((artist) => 
                    <p className="artist-name" key={artist["id"]}>
                        {artist["name"]}
                    </p>
                )}
            </div>
            
        );
    }

    const renderTrackResults = () => {
        return ( 
            <div className="artist-result-container">
                {trackResults.map((track: any) => ( 
                    <span>
                        <p className="artist-name" key={track["id"]}>
                            {track["name"]}
                        </p>
                        <p>
                            {track["artists"].reduce((accumulator: string, artist: any) => (
                                accumulator + " " + artist["name"]
                            ), "")}
                        </p>
                    </span>
                    
                    
                ))}
            </div>
            
        );
    }

    const handleArtistSearchSubmit = async (query: string) => {
        if (token != null) {  
            searchArtists(token, query, setArtistResults);   
        }
    }

    const handleTrackSearchSubmit = async (query: string) => {
        if (token != null) {  
            searchTracks(token, query, setTrackResults);   
        }
    }

    return( 
        <div className="recommendation-div">
            <section className="search-bar">
                <input 
                    className="artist-input-text"
                    type="text" 
                    placeholder="enter artist"
                    value={artistQuery}
                    onChange={(event) => {setArtistQuery(event.target.value)}} />
                <button 
                    className="artist-submit-btn" 
                    type="button"
                    onClick={() => {handleArtistSearchSubmit(artistQuery)}}>
                        SEARCH ARTIST
                </button>
                
            </section>
            {renderArtistResults()}
            <section className="search-bar">
                <input 
                    className="artist-input-text"
                    type="text" 
                    placeholder="enter track"
                    value={trackQuery}
                    onChange={(event) => {setTrackQuery(event.target.value)}} />
                <button 
                    className="artist-submit-btn" 
                    type="button"
                    onClick={() => {handleTrackSearchSubmit(trackQuery)}}>
                        SEARCH TRACK
                </button>
                
            </section>
            {renderTrackResults()}
        </div>
    );
}
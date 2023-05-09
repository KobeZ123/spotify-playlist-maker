import { useState } from "react";
import useStore from "../stores/useStore";
import { searchArtists } from "../api/loadData";

import "../styles/recommendation_page.css"

export default function RecommendationPage() {

    const token = useStore((state) => state.token);
    
    const [artistQuery, setArtistQuery] = useState("");
    const [artistResults, setArtistResults] = useState([]);

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

    const handleArtistSearchSubmit = async (name: string) => {
        if (token != null) {  
            searchArtists(token, name, setArtistResults);   
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
        </div>
    );
}
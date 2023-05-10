import { useState } from "react";
import useStore from "../stores/useStore";
import { searchArtists, searchTracks } from "../api/loadData";

import "../styles/recommendation_page.css"

export default function RecommendationPage() {

    const token = useStore((state) => state.token);
    
    // the artist search query state
    const [artistQuery, setArtistQuery] = useState<string>("");
    // the track search query state
    const [trackQuery, setTrackQuery] = useState<string>("");
    // the artist search results as a list of items
    const [artistResults, setArtistResults] = useState<any[]>([]);
    // the track search results as a list of items
    const [trackResults, setTrackResults] = useState<any[]>([]); 
    // the selected artists as a list of ids
    const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
    // the selected tracks as a list of ids
    const [selectedTracks, setSelectedTracks] = useState<string[]>([]);

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

    const handleArtistClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log("clicked artist");
        let artist_id = (event.target as HTMLElement).id;
        let artist_key = (event.target as HTMLElement).getAttribute("key");
        // if artist is already selected, remove it 
        if (selectedArtists.includes(artist_id)) {
            setSelectedArtists(selectedArtists.filter((id) => id != artist_id));
        } else {
            // if the artist is not selected yet, add it 
            setSelectedArtists([...selectedArtists, artist_id]);
        }
    }

    const handleTrackClick = (event: React.MouseEvent<HTMLElement>) => {
        
        let track_id = (event.target as HTMLElement).id;
        let track_key = (event.target as HTMLElement).getAttribute("key");
        console.log("clicked track" + track_id);
        // if artist is already selected, remove it 
        if (selectedTracks.includes(track_id)) {
            setSelectedTracks(selectedTracks.filter((id) => id != track_id));
        } else {
            // if the artist is not selected yet, add it 
            setSelectedTracks([...selectedTracks, track_id]);
        }
    }

    const renderArtistResults = () => {
        return ( 
            <div className="artist-result-container">
                {artistResults.map((artist) => 
                    <p className="artist-name" 
                        key={artist["id"]}
                        id={artist["id"]}
                        onClick={handleArtistClick}>
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
                    <div onClick={handleTrackClick} key={track["id"]} id={track["id"]}>
                        <p id={track["id"]} key={track["id"] + "_name"} className="artist-name">
                            {track["name"]}
                        </p>
                        <p id={track["id"]} key={track["id"] + "_artist"}>
                            {track["artists"].reduce((accumulator: string, artist: any) => (
                                accumulator + " " + artist["name"]
                            ), "")}
                        </p>
                    </div>    
                ))}
            </div>
        );
    }

    const renderSelectedArtists = () => {
        return (
            <div>
                <h1>SELECTED ARTISTS</h1>
                {selectedArtists.map((artist) => (
                    <p key={artist + "_selected"}>{artist}</p>
                ))}
            </div>
        );
    }

    const renderSelectedTracks = () => {
        return (
            <div>
                <h1>SELECTED TRACKS</h1>
                {selectedTracks.map((track) => (
                    <p key={track + "_selected"}>{track}</p>
                ))}
            </div>
        );
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
            {renderSelectedArtists()}
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
            {renderSelectedTracks()}
        </div>
    );
}
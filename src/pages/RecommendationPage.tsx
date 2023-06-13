import { useState } from "react";
import useStore from "../stores/useStore";
import { getRecommendations, getRecommendationsByDuration, getRecommendationsWithOptionalParams, searchArtists, searchTracks } from "../api/loadData";

import "../styles/recommendation_page.css"
import PlaylistMaker from "../components/PlaylistMaker";
import { durationToMilliseconds, millisecondsLowerBound, millisecondsUpperBound } from "../utils/utils";
import { RecommendationParams, SpotifyRecommendationParams } from "../api/recommendationParams";
import AttributeSelector from "../components/AttributeSelector";
import { RECOMMENDATION_CONSTANTS } from "../utils/constants";

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
    // the list of recommendations 
    const [recommendedTracks, setRecommendedTracks] = useState<any[]>([]);
    // show the recommmended tracks 
    const [showTracks, setShowTracks] = useState<boolean>(false);
    // stores the list of optional parameters 
    const [optionalParams, setOptionalParams] = useState<RecommendationParams>(new RecommendationParams());

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

    const handleRecommendationsClick = () => {
        if (token != null) {  
            getRecommendationsWithOptionalParams(token, selectedArtists, [], selectedTracks,
                optionalParams, setRecommendedTracks);   
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

    const renderRecommendedTracks = () => {
        return (
            <div>
                <h1>RECOMMENDED TRACKS</h1>
                {recommendedTracks.map((track) => (
                    <p id={track["id"]} key={track["id"] + "_name"} className="artist-name">
                        {track["name"]}
                    </p>
                ))}
            </div>
        );
    }

    // clears all searches 
    const clearSearch = () => {
        setArtistQuery("");
        setTrackQuery("");
        setArtistResults([]);
        setTrackResults([]);
        setSelectedArtists([]);
        setSelectedTracks([]);
        setRecommendedTracks([]);
    }

    return( 
        <div className="recommendation-div">
            <button className="action-btn clear-btn" onClick={clearSearch}>CLEAR ALL</button>
            <section className="search-bar">
                <input 
                    className="artist-input-text"
                    type="text" 
                    placeholder="enter artist"
                    value={artistQuery}
                    onChange={(event) => {setArtistQuery(event.target.value)}} />
                <button 
                    className="action-btn search-btn" 
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
                    className="action-btn search-btn" 
                    type="button"
                    onClick={() => {handleTrackSearchSubmit(trackQuery)}}>
                        SEARCH TRACK
                </button>
                
            </section>
            {renderTrackResults()}
            {renderSelectedTracks()}
            
            <PlaylistMaker selectedArtists={selectedArtists} selectedGenres={[]} selectedTracks={selectedTracks} />
            <AttributeSelector name={RECOMMENDATION_CONSTANTS.ACOUSTICNESS} initialParams={optionalParams} updateParams={setOptionalParams} />
            <AttributeSelector name={RECOMMENDATION_CONSTANTS.DANCEABILITY} initialParams={optionalParams} updateParams={setOptionalParams} />
            <AttributeSelector name={RECOMMENDATION_CONSTANTS.ENERGY} initialParams={optionalParams} updateParams={setOptionalParams} />
            <AttributeSelector name={RECOMMENDATION_CONSTANTS.INSTRUMENTALNESS} initialParams={optionalParams} updateParams={setOptionalParams} />
            <AttributeSelector name={RECOMMENDATION_CONSTANTS.KEY} initialParams={optionalParams} updateParams={setOptionalParams} />
            <AttributeSelector name={RECOMMENDATION_CONSTANTS.LIVENESS} initialParams={optionalParams} updateParams={setOptionalParams} />
            <AttributeSelector name={RECOMMENDATION_CONSTANTS.LOUDNESS} initialParams={optionalParams} updateParams={setOptionalParams} />
            <AttributeSelector name={RECOMMENDATION_CONSTANTS.MODE} initialParams={optionalParams} updateParams={setOptionalParams} />
            <AttributeSelector name={RECOMMENDATION_CONSTANTS.POPULARITY} initialParams={optionalParams} updateParams={setOptionalParams} />
            <AttributeSelector name={RECOMMENDATION_CONSTANTS.SPEECHINESS} initialParams={optionalParams} updateParams={setOptionalParams} />
            <AttributeSelector name={RECOMMENDATION_CONSTANTS.TEMPO} initialParams={optionalParams} updateParams={setOptionalParams} />
            <AttributeSelector name={RECOMMENDATION_CONSTANTS.TIME_SIGNATURE} initialParams={optionalParams} updateParams={setOptionalParams} />
            <AttributeSelector name={RECOMMENDATION_CONSTANTS.VALENCE} initialParams={optionalParams} updateParams={setOptionalParams} />
            <section className="recommendation-section">
                <button 
                    className="action-btn recommendation-btn"
                    type="button"
                    onClick={handleRecommendationsClick}>
                    PROVIDE RECOMMENDATIONS
                </button>
            </section>
            <button
                className="action-btn recommendation-btn"
                type="button"
                onClick={() => {setShowTracks(!showTracks)}}>
                    SHOW RECOMMENDED TRACKS
            </button>
            {showTracks && renderRecommendedTracks()}
        </div>
    );
}
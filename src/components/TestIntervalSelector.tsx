import { useState } from "react";
import "../styles/interval_selector.css";
import { getRecommendationsByDuration } from "../api/loadData";
import useStore from "../stores/useStore";
import { durationToMilliseconds } from "../utils/utils";
import { createEmptyPlaylist, selectTracksForPlaylistAlgorithm } from "../api/postData";

export default function TestIntervalSelector() {

    const token = useStore((state) => state.token);

    const [lowBoundMinutes, setLowBoundMinutes] = useState<number>(0);
    const [upperBoundMinutes, setUpperBoundMinutes] = useState<number>(0);
    const [lowBoundSeconds, setLowBoundSeconds] = useState<number>(0);
    const [upperBoundSeconds, setUpperBoundSeconds] = useState<number>(0);

    const [playlistID, setPlaylistID] = useState<string>("");

    // handles if the seconds goes above 59 
    const handleSecondsChange = (seconds: number) => {
        if (seconds > 59) {
            return 0;
        }
        return seconds;
    }

    // handles the submission 
    const handleSubmit = () => {
        if (token != null) {
            console.log("creating empty playlist");
            createEmptyPlaylist(token, "playlist", setPlaylistID);
            let lowerBound = durationToMilliseconds(lowBoundMinutes, lowBoundSeconds);
            let upperBound = durationToMilliseconds(upperBoundMinutes, upperBoundSeconds);
            // getRecommendationsByDuration(token, [], ["pop"], [], lowerBound, upperBound);
            selectTracksForPlaylistAlgorithm(token, [], ["pop"], [], playlistID, lowerBound);
        }
    }

    return (
        <div className="interval-selector-container">
            <section className="bound-section-container">
                <p className="section-label">Lower bound duration (minutes and seconds)</p>
                <section className="bound-input-section"> 
                    <span className="bound-input-span">
                        <input 
                            className="input-number" 
                            type="number"
                            min={0}
                            value={lowBoundMinutes}
                            onChange={(event) => setLowBoundMinutes(+event.target.value)}/>
                        <p className="unit-label">minutes</p>
                    </span>
                    <span className="bound-input-span">
                        <input 
                            className="input-number" 
                            type="number"
                            min={0}
                            max={59}
                            value={lowBoundSeconds}
                            onChange={(event) => setLowBoundSeconds(handleSecondsChange(+event.target.value))}/>
                        <p className="unit-label">seconds</p>
                    </span>
                </section>
                
                
            </section>
            <section className="bound-section-container">
                <p className="section-label">Upper bound duration (minutes and seconds)</p>
                <section className="bound-input-section"> 
                    <span className="bound-input-span">
                        <input 
                            className="input-number" 
                            type="number"
                            min={0}
                            value={upperBoundMinutes}
                            onChange={(event) => setUpperBoundMinutes(+event.target.value)}/>
                        <p className="unit-label">minutes</p>
                    </span>
                    <span className="bound-input-span">
                        <input 
                            className="input-number" 
                            type="number"
                            min={0}
                            max={59}
                            value={upperBoundSeconds}
                            onChange={(event) => setUpperBoundSeconds(handleSecondsChange(+event.target.value))}/>
                        <p className="unit-label">seconds</p>
                    </span>
                </section>
                
            </section>
            <button className="interval-submit-btn" onClick={() => {handleSubmit()}}>SUBMIT</button>
            
        </div>
    );
}
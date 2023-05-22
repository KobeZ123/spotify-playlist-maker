import { useState } from "react";

import "../styles/attribute_selector.css";
import { RECOMMENDATION_CONSTANTS } from "../utils/constants";
import { RecommendationParams, SpotifyRecommendationParams, TrackAttribute } from "../api/recommendationParams";

export interface AttributeSelectorProps {
    name: string,
    initialParams: RecommendationParams,
    updateParams: (params: RecommendationParams) => void,
}

export default function AttributeSelector(props: AttributeSelectorProps) {
    const [targetSelected, setTargetSelected] = useState<boolean>(false);
    const [minValue, setMinValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(0);

    const handleSubmit = () => {
        if (targetSelected) {
            switch(props.name) {
                case RECOMMENDATION_CONSTANTS.ACOUSTICNESS:
                    props.updateParams(props.initialParams.addAcousticness(new TrackAttribute(minValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.DANCEABILITY:
                    props.updateParams(props.initialParams.addDancability(new TrackAttribute(minValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.ENERGY:
                    props.updateParams(props.initialParams.addEnergy(new TrackAttribute(minValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.INSTRUMENTALNESS:
                    props.updateParams(props.initialParams.addInstrumentalness(new TrackAttribute(minValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.KEY:
                    props.updateParams(props.initialParams.addKey(new TrackAttribute(minValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.LIVENESS:
                    props.updateParams(props.initialParams.addLiveness(new TrackAttribute(minValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.LOUDNESS:
                    props.updateParams(props.initialParams.addLoudness(new TrackAttribute(minValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.MODE:
                    props.updateParams(props.initialParams.addMode(new TrackAttribute(minValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.POPULARITY:
                    props.updateParams(props.initialParams.addPopularity(new TrackAttribute(minValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.SPEECHINESS:
                    props.updateParams(props.initialParams.addSpeechiness(new TrackAttribute(minValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.TEMPO:
                    props.updateParams(props.initialParams.addTempo(new TrackAttribute(minValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.TIME_SIGNATURE:
                    props.updateParams(props.initialParams.addTimeSignature(new TrackAttribute(minValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.VALENCE:
                    props.updateParams(props.initialParams.addValence(new TrackAttribute(minValue)));
                    break;
            }
        } else {
            switch(props.name) {
                case RECOMMENDATION_CONSTANTS.ACOUSTICNESS:
                    props.updateParams(props.initialParams.addAcousticness(new TrackAttribute(minValue, maxValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.DANCEABILITY:
                    props.updateParams(props.initialParams.addDancability(new TrackAttribute(minValue, maxValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.ENERGY:
                    props.updateParams(props.initialParams.addEnergy(new TrackAttribute(minValue, maxValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.INSTRUMENTALNESS:
                    props.updateParams(props.initialParams.addInstrumentalness(new TrackAttribute(minValue, maxValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.KEY:
                    props.updateParams(props.initialParams.addKey(new TrackAttribute(minValue, maxValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.LIVENESS:
                    props.updateParams(props.initialParams.addLiveness(new TrackAttribute(minValue, maxValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.LOUDNESS:
                    props.updateParams(props.initialParams.addLoudness(new TrackAttribute(minValue, maxValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.MODE:
                    props.updateParams(props.initialParams.addMode(new TrackAttribute(minValue, maxValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.POPULARITY:
                    props.updateParams(props.initialParams.addPopularity(new TrackAttribute(minValue, maxValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.SPEECHINESS:
                    props.updateParams(props.initialParams.addSpeechiness(new TrackAttribute(minValue, maxValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.TEMPO:
                    props.updateParams(props.initialParams.addTempo(new TrackAttribute(minValue, maxValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.TIME_SIGNATURE:
                    props.updateParams(props.initialParams.addTimeSignature(new TrackAttribute(minValue, maxValue)));
                    break;
                case RECOMMENDATION_CONSTANTS.VALENCE:
                    props.updateParams(props.initialParams.addValence(new TrackAttribute(minValue, maxValue)));
                    break;
            }
        }
        console.log(props.initialParams);
    }

    return (
        <div className="attribute-container">
            <h2 className="attribute-name">{props.name}</h2>
            <input 
                className="checkbox"
                type="checkbox"
                checked={targetSelected}
                onChange={() => {setTargetSelected(!targetSelected)}}/>
            {
                (targetSelected ? 
                    <section className="selection-section"> 
                        <span className="input-span">
                            <input 
                                className="bound-number" 
                                type="number"
                                min={0}
                                value={minValue}
                                onChange={(event) => setMinValue(+event.target.value)}/>
                            <p className="bound-label">target</p>
                        </span>
                    </section> :
                    <section className="selection-section"> 
                        <span className="input-span">
                            <input 
                                className="bound-number" 
                                type="number"
                                min={0}
                                value={minValue}
                                onChange={(event) => setMinValue(+event.target.value)}/>
                            <p className="bound-label">min</p>
                        </span>
                        <span className="input-span">
                            <input 
                                className="bound-number" 
                                type="number"
                                min={0}
                                value={maxValue}
                                onChange={(event) => setMaxValue(+event.target.value)}/>
                            <p className="bound-label">max</p>
                        </span>
                    </section>
                )
            }
            <button className="attribute-submit-btn" onClick={() => {handleSubmit()}}>SUBMIT</button>
            
        </div>
    );
}
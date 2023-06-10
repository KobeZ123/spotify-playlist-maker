import { useEffect, useState } from "react";
import useStore from "../stores/useStore";
import { getTopTracksLongTerm, getTopTracksMediumTerm, getTopTracksShortTerm } from "../api/loadData";

import "../styles/top_items_display.css";
import { TopItemDisplayProps } from "../utils/types";

export default function TopTracksDisplay(props: TopItemDisplayProps) {
    const token = useStore((state) => state.token);
    // the user's top artists as a list of items
    const [topTracksList, setTopTracksList] = useState<any[]>([]);
    // the selected term for top artists 
    const [selectedTerm, setSelectedTerm] = useState<string>("short_term");

    // loads top artists when 
    useEffect(() => {
        if (token != null) {
            if (selectedTerm === "short_term") {
                getTopTracksShortTerm(token, setTopTracksList);
            }
            if (selectedTerm === "medium_term") {
                getTopTracksMediumTerm(token, setTopTracksList);
            }
            if (selectedTerm === "long_term") {
                getTopTracksLongTerm(token, setTopTracksList);
            }
        }
    }, [selectedTerm]);

    return (
        <div className="top-items-display-container">
            <div className="term-tabs-container">
                <button className={(selectedTerm === "short_term") ? "term-tab-selected" : "term-tab"}
                    onClick={() => setSelectedTerm("short_term")}>Short Term</button>
                <button className={(selectedTerm === "medium_term") ? "term-tab-selected" : "term-tab"}
                    onClick={() => setSelectedTerm("medium_term")}>Medium Term</button>
                <button className={(selectedTerm === "long_term") ? "term-tab-selected" : "term-tab"}
                    onClick={() => setSelectedTerm("long_term")}>Long Term</button>
            </div>
            <div className="items-container">
                <section className="item-cards-container">
                    {topTracksList.map((track) => (
                        <span className="item-card-container" key={track.name + "_card"}> 
                            <p className="item-text">{track.name}</p>
                            <img className="item-img"
                                src={(track.album.images.length > 0) ? track.album.images[0].url : ""}
                                alt={`${track.name}`}/>
                        </span>
                    ))}
                </section>
            </div>
        </div>
    )
}
import { useEffect, useState } from "react";
import "../styles/playlist_maker.css";
import { createEmptyPlaylist, populatePlaylist } from "../api/postData";
import useStore from "../stores/useStore";

interface PlaylistMakerProps {
    tracks: any[]
}

export default function PlaylistMaker({tracks} : PlaylistMakerProps ) {
    // tracks if a playlist has been created yet
    const [isPlaylistCreated, setIsPlaylistCreated] = useState<boolean>(false);
    const [playlistID, setPlaylistID] = useState<string>("");

    const token = useStore((state) => state.token);

    useEffect(() => {
        console.log("refreshed playlist maker");
    }, [isPlaylistCreated]);

    useEffect(() => {
        if (token != null && playlistID != "" && isPlaylistCreated) {
            console.log("playlist created, time to populate");
            populatePlaylist(token, playlistID, tracks);
        }
    }, [playlistID]);

    const handleMakingPlaylist = async () => {
        if (token != null) {
            console.log("creating empty playlist");
            createEmptyPlaylist(token, "playlist", setPlaylistID);
            setIsPlaylistCreated(true)
        }
    }

    return (
        <div className="playlist-maker-container">
            {isPlaylistCreated ?
                <section>
                    <h1>RECOMMENDED TRACKS</h1>
                    {tracks.map((track) => (
                        <p id={track["id"]} key={track["id"] + "_name"} className="artist-name">
                            {track["name"]}
                        </p>
                    ))}
                </section> :
                <button 
                    className="make-playlist-btn"
                    onClick={() => {handleMakingPlaylist()}}>
                    CREATE PLAYLIST
                </button>
            }
        </div>
    )
}
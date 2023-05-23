import { useEffect, useState } from "react"

import '../styles/home.css'
import useStore from "../stores/useStore"

import { Link } from "react-router-dom"

export default function Home() {
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const setStateToken = useStore((state) => state.setToken);
    const reset = useStore((state) => state.reset);
    const [infoSelected, setInfoSelected] = useState<boolean>(false);

    useEffect(() => {
        console.log(`${process.env.REACT_APP_AUTH_ENDPOINT}?` +
        `client_id=${process.env.REACT_APP_CLIENT_ID}` +
        `&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}` + 
        `&response_type=${RESPONSE_TYPE}` +
        `&scope=${process.env.REACT_APP_SCOPE}`);
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"))!.split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
            
        }
        if (token != null) {
            setToken(token);
            setStateToken(token);
        }   
    }, [token])

    const logout = () => {
        setToken("");
        reset();
        window.localStorage.removeItem("token");
    }

    const onButtonClicking = async () => {
        // searchArtists(token, "izzy");
        
    }

    return (
        <div className="home-container">
            <h1>Spotify React</h1>
            {!token ?
                <a href={`${process.env.REACT_APP_AUTH_ENDPOINT}?` +
                    `client_id=${process.env.REACT_APP_CLIENT_ID}` +
                    `&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}` + 
                    `&response_type=${RESPONSE_TYPE}` +
                    `&scope=${process.env.REACT_APP_SCOPE}`} 
                    className="button-64">
                    Login to Spotify
                </a>
                : <div className="home-content">
                    <button 
                        className="info-button"
                        onClick={() => {setInfoSelected(!infoSelected)}}>i</button>
                    {infoSelected && 
                    <p>This web application is designed for users to view their favorite artists and tracks
                        as well as create interval playlists according to your favorite music!</p>}
                    <section className="home-btn-section">  
                        <button className="home-selection-btn-left">
                            See Top Artists
                        </button>
                        <button className="home-selection-btn-right">
                            Make Interval Playlist
                        </button>
                    </section>
                    <button className="button-64" onClick={logout}>Logout</button>
                    <button onClick={onButtonClicking}>ACTION</button>
                    <Link to="/recommendations">Recommendations</Link>
                    <Link to="/top_items">Top Items</Link>
                    <Link to="/test">Tester</Link>
                </div>}
        </div>
    );
}
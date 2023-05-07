import { useEffect, useState } from "react"

import '../styles/home.css'
import useStore from "../stores/useStore"
import axios from "axios"
import { searchArtists } from "../api/loadData"

export default function Home() {
    const REDIRECT_URI = "http://localhost:3000/callback"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const setStateToken = useStore((state) => state.setToken);
    const getStateToken = useStore((state) => state.getToken);
    const reset = useStore((state) => state.reset);

    useEffect(() => {
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
    }, [])

    const logout = () => {
        setToken("");
        reset();
        window.localStorage.removeItem("token");
    }

    const onButtonClicking = async () => {
        console.log(getStateToken());
        searchArtists(token, "izzy");
    }

    return (
        <div className="home-container">
            <h1>Spotify React</h1>
            {!token ?
                <a href={`${AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`} className="button-64">Login
                    to Spotify</a>
                : <div>
                    <button className="button-64" onClick={logout}>Logout</button>
                    <button onClick={onButtonClicking}></button>
                </div>}
        </div>
    );
}
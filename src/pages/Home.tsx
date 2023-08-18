import { useEffect, useState } from "react";

import "../styles/home.css";
import useStore from "../stores/useStore";

import { Link } from "react-router-dom";
import ReauthenticateChoiceWrapper from "../components/ReauthenticateChoiceWrapper";
import { TOKEN_STRING } from "../utils/constants";

export default function Home() {
  const [token, setToken] = useState<string>("");
  const setStateToken = useStore((state) => state.setToken);
  const reset = useStore((state) => state.reset);
  const [infoSelected, setInfoSelected] = useState<boolean>(false);

  useEffect(() => {
    console.log(
      `${process.env.REACT_APP_AUTH_ENDPOINT}?` +
        `client_id=${process.env.REACT_APP_CLIENT_ID}` +
        `&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}` +
        `&response_type=${TOKEN_STRING}` +
        `&scope=${process.env.REACT_APP_SCOPE}`
    );
    const hash = window.location.hash;
    let received_token = window.localStorage.getItem(TOKEN_STRING);

    if (hash) {
      console.log("getting hash");
      received_token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))!
        .split("=")[1];

      window.location.hash = "";
      window.location.href = "https://kobe-spotify-playlist-maker.vercel.app/";
      window.localStorage.setItem(TOKEN_STRING, received_token);
    }
    if (!received_token) {
      console.log("no token, go through login flow");
      reset();
      setToken("");
    }
    if (received_token != null) {
      console.log("we got the token");
      setStateToken(received_token);
      setToken(received_token);
    }
  }, []);

  const logout = () => {
    console.log("i wanna log out");
    reset();
    setToken("");
    window.localStorage.removeItem(TOKEN_STRING);
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">Spotify React</h1>
        <button
          className="info-button"
          onClick={() => {
            setInfoSelected(!infoSelected);
          }}
        >
          i
        </button>
        {
          <p
            className="info-paragraph"
            style={
              infoSelected
                ? { transform: "translateY(0)", opacity: "1", height: "auto" }
                : { transform: "translateY(-100%)", opacity: "0", height: "0" }
            }
          >
            This web application is designed for users to view their favorite
            artists and tracks as well as create interval playlists according to
            your favorite music!
          </p>
        }
        <ReauthenticateChoiceWrapper
          child_active={
            <>
              <section className="home-btn-section">
                <Link to="/top_items">
                  <button className="home-selection-btn-left">
                    See Top Artists
                  </button>
                </Link>
                <Link to="/interval_playlist">
                  <button className="home-selection-btn-right">
                    Make Interval Playlist
                  </button>
                </Link>
              </section>
              <button className="button-64" onClick={logout}>
                Logout
              </button>
            </>
          }
          child_error={
            <a
              href={
                `${process.env.REACT_APP_AUTH_ENDPOINT}?` +
                `client_id=${process.env.REACT_APP_CLIENT_ID}` +
                `&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}` +
                `&response_type=${TOKEN_STRING}` +
                `&scope=${process.env.REACT_APP_SCOPE}`
              }
              className="login-to-spotify-btn"
            >
              Login to Spotify
            </a>
          }
          token={token}
        />
      </div>
    </div>
  );
}

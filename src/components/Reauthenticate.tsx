import { useEffect, useState } from "react";
import { TOKEN_STRING } from "../utils/constants";
import useStore from "../stores/useStore";
import { getUserID } from "../api/loadData";
import "../styles/reauthenticate.css";
import "../styles/home.css"

interface ModalProps {
  children: JSX.Element;
}

// if there is an active session, display the children element
// otherwise, prompts the user to login again
export default function ReauthenticateWrapper(props: ModalProps) {
  const token = useStore((state) => state.token);

  const [sessionActive, setSessionActive] = useState<boolean>(false);

  // checks if the session is active
  useEffect(() => {
    if (token != null) {
      getUserID(token)
        .then(() => {
          setSessionActive(true);
        })
        .catch(() => {
          setSessionActive(false);
        });
    }
  }, []);

  return sessionActive ? (
    props.children
  ) : (
    <div
      className="reauthenticate-div"
    >
      <h2>Logged out of Spotify account.</h2>
      <h2>Please log in again!</h2>
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
    </div>
  );
}

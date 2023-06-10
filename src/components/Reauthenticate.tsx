import { useEffect, useState } from "react";
import { TOKEN_STRING } from "../utils/constants";
import useStore from "../stores/useStore";
import { getUserID } from "../api/loadData";

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
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        backgroundColor: "lightgrey",
        padding: "2rem",
        borderRadius: "4rem",
        margin: "2rem",
      }}
    >
      <h2 style={{ fontSize: "2rem" }}>Logged out of Spotify account.</h2>
      <h2 style={{ fontSize: "2rem" }}>Please log in again!</h2>
      <a
        href={
          `${process.env.REACT_APP_AUTH_ENDPOINT}?` +
          `client_id=${process.env.REACT_APP_CLIENT_ID}` +
          `&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}` +
          `&response_type=${TOKEN_STRING}` +
          `&scope=${process.env.REACT_APP_SCOPE}`
        }
        className="button-64"
      >
        Login to Spotify
      </a>
    </div>
  );
}

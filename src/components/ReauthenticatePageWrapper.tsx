import { TOKEN_STRING } from "../utils/constants";
import "../styles/reauthenticate.css";
import "../styles/home.css";
import ReauthenticateChoiceWrapper from "./ReauthenticateChoiceWrapper";

interface ModalProps {
  children: JSX.Element;
}

// if there is an active session, display the children element
// otherwise, prompts the user to login again
export default function ReauthenticatePageWrapper(props: ModalProps) {
  return (
    <ReauthenticateChoiceWrapper
      child_active={props.children}
      child_error={
        <div className="reauthenticate-div">
          <h2>Your Spotify session expired.</h2>
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
      }
      token=""
    />
  );
}

import { useEffect, useState } from "react";
import { TOKEN_STRING } from "../utils/constants";
import useStore from "../stores/useStore";
import { getUserID } from "../api/loadData";
import "../styles/reauthenticate.css";
import "../styles/home.css"

interface ChoiceWrapperProps {
  child_active: JSX.Element;
  child_error: JSX.Element;
}

// if there is an active session, display the children element
// otherwise, prompts the user to login again
export default function ReauthenticateChoiceWrapper(props: ChoiceWrapperProps) {
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
    props.child_active
  ) : (
    props.child_error
  );
}
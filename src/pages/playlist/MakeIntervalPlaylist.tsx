import { Outlet } from "react-router-dom";
import ReauthenticatePageWrapper from "../../components/ReauthenticatePageWrapper";

export default function MakeIntervalPlaylist () {
  return (
    <ReauthenticatePageWrapper children={<Outlet />} />
  )
}
import { Outlet } from "react-router-dom";
import ReauthenticatePageWrapper from "../../components/ReauthenticatePageWrapper";
import { FormDataProvider } from "../../context/FormDataContext";

export default function MakeIntervalPlaylist () {
  return (
    <ReauthenticatePageWrapper 
      children={
        <FormDataProvider>
          <Outlet />
        </FormDataProvider>
      } />
  )
}
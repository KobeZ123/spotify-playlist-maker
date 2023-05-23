import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

import "../styles/home.css";

export default function Layout() {
    return (
        <div className="home-container">
            <NavigationBar />
            <Outlet />
        </div>
    );
}

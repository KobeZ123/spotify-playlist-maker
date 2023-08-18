import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

import "../styles/home.css";
import Footer from "../components/Footer";

export default function Layout() {
    return (
        <div className="app-container">
            <NavigationBar />
            <div className="app-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

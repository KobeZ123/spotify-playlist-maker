import { Link } from "react-router-dom";
import "../styles/layout.css";
import spotify_logo from "../assets/spotify-logo.png";

export default function NavigationBar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={spotify_logo} alt="Spotify Logo" style={{ height: "64px", maxHeight: "100%" }} />
                <Link to="/" className="logo-link">Spotify Playlist Maker</Link>
            </div>
            <ul className="navbar-items">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link">About</Link>
                </li>
            </ul>
        </nav>
    )
}
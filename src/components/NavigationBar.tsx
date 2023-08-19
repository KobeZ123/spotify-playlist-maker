import { Link } from "react-router-dom";
import "../styles/layout.css";
import spotify_logo from "../assets/spotify-logo.png";
import hamburger_menu from "../assets/hamburger-menu.png";
import { useState } from "react";

export default function NavigationBar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    return (
        <nav className={menuOpen? "navbar-menu-active": "navbar"}>
            <div className="nav-responsive-block">
                <div className="navbar-logo">
                    <img src={spotify_logo} alt="Spotify Logo" className="spotify-icon" />
                    <Link to="/" className="logo-link">Spotify Playlist Maker</Link>
                </div>
                <img src={hamburger_menu} alt="Menu" 
                    className="hamburger-menu" 
                    onClick={() => {setMenuOpen(!menuOpen)}}/>
            </div>
            <ul className={menuOpen? "navbar-items-menu-active": "navbar-items"}>
                {menuOpen && <hr className="hr-divider"/>}
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